export const initAR = async () => {
    if (typeof window === 'undefined') return;

    // Determine AR mode from environment variable
    const arMode = import.meta.env.VITE_AR_MODE || 'image';

    // Fetch target data (only needed if image tracking is active)
    let targetData = null;
    if (arMode !== 'slam') {
        targetData = await fetch('/image-targets/test.json').then(res => res.json());
    }

    const imageTargetPipelineModule = () => {
        let frame: any;

        const updatePose = (detail: any, mesh: any) => {
            const { position, rotation, scale } = detail;
            mesh.position.set(position.x, position.y, position.z);
            mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);

            if (typeof scale === 'number') {
                mesh.scale.set(scale, scale, scale);
            } else {
                mesh.scale.set(scale.x || 1, scale.y || 1, scale.z || 1);
            }
        };

        return {
            name: 'image-target-logic',

            onStart: () => {
                const { scene } = (window as any).XR8.Threejs.xrScene();
                const THREE = (window as any).THREE;

                const shape = new THREE.Shape();
                const size = 0.5;
                const thickness = 0.05;

                shape.moveTo(-size, -size);
                shape.lineTo(size, -size);
                shape.lineTo(size, size);
                shape.lineTo(-size, size);
                shape.closePath();

                const hole = new THREE.Path();
                hole.moveTo(-size + thickness, -size + thickness);
                hole.lineTo(size - thickness, -size + thickness);
                hole.lineTo(size - thickness, size - thickness);
                hole.lineTo(-size + thickness, size - thickness);
                hole.closePath();
                shape.holes.push(hole);

                const geometry = new THREE.ShapeGeometry(shape);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x4fc3f7,
                    side: THREE.DoubleSide
                });

                frame = new THREE.Mesh(geometry, material);
                frame.visible = false;
                scene.add(frame);
            },

            listeners: [
                {
                    event: 'reality.imagefound',
                    process: (e: any) => {
                        updatePose(e.detail, frame);
                        frame.visible = true;
                    }
                },
                {
                    event: 'reality.imageupdated',
                    process: (e: any) => {
                        updatePose(e.detail, frame);
                    }
                },
                {
                    event: 'reality.imagelost',
                    process: () => {
                        frame.visible = false;
                    }
                }
            ]
        };
    };

    const slamPipelineModule = () => {
        let surface: any;
        let THREE: any;
        const raycaster = new (window as any).THREE.Raycaster();
        const tapPosition = new (window as any).THREE.Vector2();

        return {
            name: 'slam-logic',
            onStart: ({ canvas }: { canvas: HTMLCanvasElement }) => {
                const { scene, camera, renderer } = (window as any).XR8.Threejs.xrScene();
                THREE = (window as any).THREE;

                renderer.shadowMap.enabled = true;

                // 1. Lighting
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
                scene.add(ambientLight);
                
                const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
                dirLight.position.set(5, 10, 5);
                dirLight.castShadow = true;
                scene.add(dirLight);

                // 2. Invisible Surface for Raycasting (receives shadows)
                const surfaceGeometry = new THREE.PlaneGeometry(100, 100);
                const surfaceMaterial = new THREE.ShadowMaterial({ opacity: 0.4 });
                surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
                surface.rotateX(-Math.PI / 2);
                surface.receiveShadow = true;
                scene.add(surface);

                // 3. Ground Grid for spatial reference
                const gridHelper = new THREE.GridHelper(20, 20, 0x4fc3f7, 0x444444);
                scene.add(gridHelper);

                // 4. Initial Camera Setup (Crucial for SLAM stability)
                camera.position.set(0, 3, 0);

                // Sync the xr controller's 6DoF position and camera parameters with our scene.
                (window as any).XR8.XrController.updateCameraProjectionMatrix({
                    origin: camera.position,
                    facing: camera.quaternion,
                });

                // 5. Tap to Place Handler
                const onTouch = (e: TouchEvent) => {
                    if (e.touches.length === 2) {
                        (window as any).XR8.XrController.recenter();
                        return;
                    }
                    if (e.touches.length > 1) return;

                    tapPosition.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
                    tapPosition.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;

                    raycaster.setFromCamera(tapPosition, camera);
                    const intersects = raycaster.intersectObject(surface);

                    if (intersects.length > 0) {
                        const { x, z } = intersects[0].point;
                        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
                        const material = new THREE.MeshStandardMaterial({ 
                            color: 0x4fc3f7,
                            roughness: 0.5,
                            metalness: 0.2
                        });
                        const cube = new THREE.Mesh(geometry, material);
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
            disableWorldTracking: arMode === 'image',
        });

        const modules = [
            XR8.GlTextureRenderer.pipelineModule(),
            XR8.Threejs.pipelineModule(),
            XR8.XrController.pipelineModule(),
            XRExtras.AlmostThere.pipelineModule(),
            XRExtras.FullWindowCanvas.pipelineModule(),
            XRExtras.RuntimeError.pipelineModule(),
        ];

        if (arMode === 'slam') {
            modules.push(slamPipelineModule());
        } else if (arMode === 'image') {
            modules.push(imageTargetPipelineModule());
        } else {
            modules.push(imageTargetPipelineModule());
            modules.push(slamPipelineModule());
        }

        XR8.addCameraPipelineModules(modules);

        const canvas = document.getElementById('camerafeed') as HTMLCanvasElement;
        if (!canvas) return;

        XR8.run({ canvas });
    };

    const XR8 = (window as any).XR8;
    if (XR8) {
        onxrloaded();
    } else {
        window.addEventListener('xrjsloaded', onxrloaded, { once: true });
    }
};