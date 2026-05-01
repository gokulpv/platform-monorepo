export const initAR = async () => {
    if (typeof window === 'undefined') return;

    // Determine AR mode from environment variable
    const arMode = import.meta.env.VITE_AR_MODE || 'image';

    // Fetch target data (only needed if image tracking is active)
    let targetData = null;
    if (arMode !== 'slam') {
        targetData = await fetch('/image-targets/test.json').then(res => res.json());

        // FIX: Ensure paths are absolute to avoid 404s on nested routes like /dish/[id]
        if (targetData) {
            if (targetData.imagePath && !targetData.imagePath.startsWith('/')) {
                targetData.imagePath = '/' + targetData.imagePath;
            }
            if (targetData.resources) {
                for (const key in targetData.resources) {
                    const path = targetData.resources[key];
                    if (path && !path.startsWith('/') && !path.startsWith('http')) {
                        if (path.includes('/')) {
                            targetData.resources[key] = '/' + path;
                        } else {
                            targetData.resources[key] = '/image-targets/' + path;
                        }
                    }
                }
            }
        }
    }

    const imageTargetPipelineModule = () => {
        let model: any;
        let isImageVisible = false;
        const targetPose = {
            position: new (window as any).THREE.Vector3(),
            quaternion: new (window as any).THREE.Quaternion(),
            scale: new (window as any).THREE.Vector3(1, 1, 1)
        };

        let hasInitializedPose = false;
        const updateTargetPose = (detail: any) => {
            const { position, rotation, scale } = detail;
            const THREE = (window as any).THREE;

            const newPos = new THREE.Vector3(position.x, position.y, position.z);
            const newQuat = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
            const baseScale = typeof scale === 'number' ? scale : (scale.x || 1);
            const s = baseScale * 0.5;
            const newScale = new THREE.Vector3(s, s, s);

            if (!hasInitializedPose) {
                targetPose.position.copy(newPos);
                targetPose.quaternion.copy(newQuat);
                targetPose.scale.copy(newScale);
                hasInitializedPose = true;
                return;
            }

            // Advanced Method: Input Deadbanding
            // If the change is microscopic (sensor noise), ignore it to prevent vibration
            const posDiff = targetPose.position.distanceTo(newPos);
            const rotDiff = targetPose.quaternion.angleTo(newQuat);

            if (posDiff < 0.0005 && rotDiff < 0.0005) return;

            // Advanced Method: Input Pre-Filtering (Exponential Moving Average)
            // We smooth the raw tracking data slightly before it even reaches the renderer
            const alpha = 0.2;
            targetPose.position.lerp(newPos, alpha);
            targetPose.quaternion.slerp(newQuat, alpha);
            targetPose.scale.lerp(newScale, alpha);
        };

        return {
            name: 'image-target-logic',
            onStart: () => {
                const { scene } = (window as any).XR8.Threejs.xrScene();
                const THREE = (window as any).THREE;

                // Add a light if not already present (to ensure visibility)
                if (!scene.getObjectByName('ar-logic-light')) {
                    const light = new THREE.DirectionalLight(0xffffff, 1);
                    light.position.set(1, 10, 1);
                    light.name = 'ar-logic-light';
                    scene.add(light);
                    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
                }

                // Create a solid cube instead of loading a GLB model
                // Centered geometry (no translation) to ensure it sits in the middle
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshStandardMaterial({
                    color: 0x39FF14, // Vibrant green
                    emissive: 0x003300, // Subtle glow
                    roughness: 0.3,
                    metalness: 0.2
                });
                model = new THREE.Mesh(geometry, material);
                model.visible = false;

                // Rotate model -90 degrees on X to align with 8th Wall image target orientation (Z is out)
                model.rotation.set(-Math.PI / 2, 0, 0);

                scene.add(model);
            },
            onUpdate: () => {
                if (isImageVisible && model) {
                    const posDist = model.position.distanceTo(targetPose.position);
                    const rotDist = model.quaternion.angleTo(targetPose.quaternion);

                    // Advanced Method: Adaptive Smoothing Factor
                    // We use an even tighter smoothing factor for small distances to kill "micro-vibrations"
                    // but allow it to ramp up for deliberate movements to maintain responsiveness.
                    let factor = 0.05;
                    if (posDist < 0.005 && rotDist < 0.01) {
                        factor = 0.02; // Ultra-smooth for tiny jitters
                    } else if (posDist > 0.05 || rotDist > 0.1) {
                        factor = 0.15; // Faster follow for large movements
                    }

                    model.position.lerp(targetPose.position, factor);
                    model.quaternion.slerp(targetPose.quaternion, factor);
                    model.scale.lerp(targetPose.scale, factor);
                }
            },
            listeners: [
                {
                    event: 'reality.imagefound',
                    process: (e: any) => {
                        updateTargetPose(e.detail);
                        isImageVisible = true;

                        if (model && !model.visible) {
                            model.position.copy(targetPose.position);
                            model.quaternion.copy(targetPose.quaternion);
                            model.scale.copy(targetPose.scale);
                            model.visible = true;

                            (window as any).XR8.XrController.recenter();

                            window.dispatchEvent(new CustomEvent('ar-image-found'));
                            window.dispatchEvent(new CustomEvent('ar-handoff-complete'));

                            // Scale up animation
                            model.scale.set(0.01, 0.01, 0.01);
                            const start = Date.now();
                            const duration = 600;
                            const animate = () => {
                                const elapsed = Date.now() - start;
                                const progress = Math.min(elapsed / duration, 1);
                                const ease = 1 - Math.pow(1 - progress, 3) * (1 - progress * Math.sin(progress * Math.PI * 2.5));
                                const s = 0.01 + ease * 0.99;
                                if (model) {
                                    model.scale.set(targetPose.scale.x * s, targetPose.scale.y * s, targetPose.scale.z * s);
                                }
                                if (progress < 1) requestAnimationFrame(animate);
                            };
                            animate();
                        }
                    }
                },
                {
                    event: 'reality.imageupdated',
                    process: (e: any) => {
                        updateTargetPose(e.detail);
                        isImageVisible = true;
                    }
                },
                {
                    event: 'reality.imagelost',
                    process: () => {
                        isImageVisible = false;
                        window.dispatchEvent(new CustomEvent('ar-image-lost'));
                    }
                }
            ]
        };
    };

    const slamPipelineModule = () => {
        let surface: any;
        let THREE: any;
        let gridHelper: any;
        let isActive = false;
        const raycaster = new (window as any).THREE.Raycaster();
        const tapPosition = new (window as any).THREE.Vector2();

        return {
            name: 'slam-logic',
            onStart: ({ canvas }: { canvas: HTMLCanvasElement }) => {
                const XR8 = (window as any).XR8;
                const threejs = XR8.Threejs.xrScene();
                if (!threejs) return;

                const { scene, camera, renderer } = threejs;
                THREE = (window as any).THREE;
                renderer.shadowMap.enabled = true;

                scene.add(new THREE.AmbientLight(0xffffff, 0.7));
                const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
                dirLight.position.set(5, 10, 5);
                dirLight.castShadow = true;
                scene.add(dirLight);

                surface = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.ShadowMaterial({ opacity: 0.4 }));
                surface.rotateX(-Math.PI / 2);
                surface.receiveShadow = true;
                scene.add(surface);

                camera.position.set(0, 3, 0);
                XR8.XrController.updateCameraProjectionMatrix({ origin: camera.position, facing: camera.quaternion });

                window.addEventListener('ar-handoff-complete', () => {
                    isActive = true;
                });

                const onTouch = (e: TouchEvent) => {
                    if (!isActive) return;

                    if (e.touches.length === 2) { XR8.XrController.recenter(); return; }
                    if (e.touches.length > 1) return;
                    tapPosition.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                    tapPosition.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
                    raycaster.setFromCamera(tapPosition, camera);
                    const intersects = raycaster.intersectObject(surface);
                    if (intersects.length > 0) {
                        const { x, z } = intersects[0].point;
                        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshStandardMaterial({ color: 0x39FF14, roughness: 0.5, metalness: 0.2 }));
                        cube.position.set(x, 0.15, z);
                        cube.castShadow = true;
                        scene.add(cube);
                    }
                };
                canvas.addEventListener('touchstart', onTouch);
            }
        };
    };

    const onxrloaded = async () => {
        const XR8 = (window as any).XR8;
        const XRExtras = (window as any).XRExtras;
        if (!XR8) return;

        XR8.XrController.configure({
            imageTargetData: targetData ? [targetData] : [],
            imageTargets: targetData ? [(targetData as any).name] : [],
            // Thermal Optimization
            disableWorldTracking: false,
            scaleResolution: 0.75,
            maxResolution: 640,
            // Advanced Method: Engine-level smoothing
            enableSmoothing: true,
            smoothingPoints: 5,
        });

        const modules = [
            XR8.GlTextureRenderer.pipelineModule(),
            XR8.Threejs.pipelineModule(),
            XR8.XrController.pipelineModule(),
            XRExtras.AlmostThere.pipelineModule(),
            XRExtras.FullWindowCanvas.pipelineModule(),
            XRExtras.RuntimeError.pipelineModule(),
        ];

        const readinessModule = () => ({
            name: 'readiness-logic',
            onStart: () => {
                // Faster readiness: Signal as soon as the pipeline starts
                window.dispatchEvent(new CustomEvent('ar-loading-complete'));
            }
        });

        modules.push(readinessModule());
        modules.push(imageTargetPipelineModule());
        modules.push(slamPipelineModule());

        const canvas = document.getElementById('camerafeed') as HTMLCanvasElement;
        if (!canvas) return;

        XR8.addCameraPipelineModules(modules);
        XR8.run({
            canvas,
            fps: 30, // Reduced frame rate as requested
        });
    };

    return new Promise<void>((resolve) => {
        const checkReady = () => {
            window.removeEventListener('ar-loading-complete', checkReady);
            resolve();
        };
        window.addEventListener('ar-loading-complete', checkReady);

        // Safety timeout
        setTimeout(resolve, 5000);

        const win = window as any;
        if (win.XR8) {
            onxrloaded();
        } else {
            win.addEventListener('xrjsloaded', onxrloaded, { once: true });
        }
    });
};

export const stopAR = () => {
    if (typeof window !== 'undefined' && (window as any).XR8) {
        (window as any).XR8.stop();
        (window as any).XR8.removeCameraPipelineModules(['image-target-logic', 'slam-logic', 'xr3js', 'xrcontroller', 'gltexturerenderer', 'almostthere', 'fullwindowcanvas', 'runtimeerror']);
    }
};