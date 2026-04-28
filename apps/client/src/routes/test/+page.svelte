<script>
    import { onMount, onDestroy } from "svelte";
    import {
        WebGLRenderer,
        Scene,
        PerspectiveCamera,
        BoxGeometry,
        MeshStandardMaterial,
        Mesh,
        Quaternion,
        AmbientLight,
        DirectionalLight,
    } from "three";
    import { browser } from "$app/environment";

    let container;
    let wasInstance = null;
    let renderer, scene, camera, model;

    const CAMERA_FOV = 45;
    const CAMERA_NEAR = 1;
    const CAMERA_FAR = 100000;

    let hasError = $state(false);
    let errorMessage = $state("");

    onMount(async () => {
        if (!browser) return;

        try {
            const WASMod = await import("@web-ar-studio/webar-engine-sdk");
            const WAS = WASMod.default;
            const {
                ANCHOR_TYPE_CENTER,
                PROJECT_MODE_IMAGE,
                TRIGGER_MODE_IMAGE,
                CAMERA_MODE_ENVIRONMENT,
                EVENT_DETECTED,
                EVENT_LOST,
                EVENT_POSE,
                EVENT_RESIZE,
                EVENT_FRAME,
            } = WASMod;

            const triggerSource = "/assets/logos/koi.png";

            wasInstance = new WAS();

            const configData = {
                apiKey: "52f80541de1715ba47f43522d648d0800c6e514d8b5e91b9b6e13ef9e1348cb8",
                mode: PROJECT_MODE_IMAGE,
                cameraMode: CAMERA_MODE_ENVIRONMENT,
                container: container,
                fov: CAMERA_FOV,
                triggers: [
                    { id: 1, mode: TRIGGER_MODE_IMAGE, source: triggerSource },
                ],
                isMultiTracking: false,
                anchor: ANCHOR_TYPE_CENTER,
            };

            const { canvas, context, viewportSizes } =
                await wasInstance.init(configData);

            renderer = new WebGLRenderer({
                canvas: canvas,
                context: context || undefined,
                antialias: true,
                alpha: true,
                logarithmicDepthBuffer: true,
            });

            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setViewport(
                -(viewportSizes.width / 2 - container.clientWidth / 2),
                -(viewportSizes.height / 2 - container.clientHeight / 2),
                viewportSizes.width,
                viewportSizes.height,
            );
            renderer.setClearColor(0xffffff, 0);

            scene = new Scene();

            camera = new PerspectiveCamera(
                CAMERA_FOV,
                viewportSizes.width / viewportSizes.height,
                CAMERA_NEAR,
                CAMERA_FAR,
            );
            scene.add(camera);

            const ambientLight = new AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const dirLight = new DirectionalLight(0xffffff, 1);
            dirLight.position.set(5, 10, 5);
            scene.add(dirLight);

            // Simple cube for testing
            const geometry = new BoxGeometry(100, 100, 100);
            const material = new MeshStandardMaterial({ color: 0xff0000 });
            model = new Mesh(geometry, material);
            model.visible = false;
            scene.add(model);

            const applySdkCamera = (data) => {
                if (
                    data.projectionMatrix &&
                    data.projectionMatrix.length === 16
                ) {
                    camera.projectionMatrix.fromArray(data.projectionMatrix);
                    camera.projectionMatrixInverse
                        .copy(camera.projectionMatrix)
                        .invert();
                    return;
                }
                const params = data.cameraParams;
                if (!params) return;
                const { fx, fy, cx, cy, width, height } = params;
                if (!(fx > 0 && fy > 0 && width > 0 && height > 0)) return;
                const near = camera.near;
                const far = camera.far;
                const left = (-cx * near) / fx;
                const right = ((width - cx) * near) / fx;
                const top = (cy * near) / fy;
                const bottom = (-(height - cy) * near) / fy;
                camera.projectionMatrix.makePerspective(
                    left,
                    right,
                    top,
                    bottom,
                    near,
                    far,
                );
                camera.projectionMatrixInverse
                    .copy(camera.projectionMatrix)
                    .invert();
            };

            wasInstance.on(EVENT_DETECTED, (detectedData) => {
                for (const data of detectedData) {
                    applySdkCamera(data);
                    if (model) {
                        model.visible = true;
                        model.position.set(
                            data.positionVector.x,
                            data.positionVector.y,
                            data.positionVector.z,
                        );
                        model.rotation.setFromQuaternion(
                            new Quaternion(
                                data.rotationQuaternion.x,
                                data.rotationQuaternion.y,
                                data.rotationQuaternion.z,
                                data.rotationQuaternion.w,
                            ),
                        );
                    }
                }
            });

            wasInstance.on(EVENT_LOST, (lostData) => {
                for (const data of lostData) {
                    if (model) {
                        model.visible = false;
                    }
                }
            });

            wasInstance.on(EVENT_POSE, (poseData) => {
                for (const data of poseData) {
                    applySdkCamera(data);
                    if (model) {
                        model.position.set(
                            data.positionVector.x,
                            data.positionVector.y,
                            data.positionVector.z,
                        );
                        model.rotation.setFromQuaternion(
                            new Quaternion(
                                data.rotationQuaternion.x,
                                data.rotationQuaternion.y,
                                data.rotationQuaternion.z,
                                data.rotationQuaternion.w,
                            ),
                        );
                    }
                }
            });

            wasInstance.on(EVENT_RESIZE, () => {
                const viewportSizes = wasInstance.getViewportSizes();
                renderer.setSize(container.clientWidth, container.clientHeight);
                renderer.setViewport(
                    -(viewportSizes.width / 2 - container.clientWidth / 2),
                    -(viewportSizes.height / 2 - container.clientHeight / 2),
                    viewportSizes.width,
                    viewportSizes.height,
                );
                camera.aspect = viewportSizes.width / viewportSizes.height;
                camera.updateProjectionMatrix();
            });

            wasInstance.on(EVENT_FRAME, () => {
                renderer.render(scene, camera);
            });
        } catch (error) {
            console.error("AR Initialization Error:", error);
            hasError = true;
            errorMessage = error.message || String(error);
        }
    });

    onDestroy(() => {
        if (wasInstance) {
            try {
                // webar sdk instances sometimes don't have destroy out of the box, handle gracefully
                if (typeof wasInstance.destroy === "function") {
                    wasInstance.destroy();
                }
            } catch (e) {
                console.error("Cleanup error:", e);
            }
        }
        if (renderer) renderer.dispose();
    });
</script>

<div class="ar-page">
    <header class="header">
        <a href="/" class="back-btn">← Back</a>
        <h1>AR Integration Test</h1>
    </header>

    <div class="ar-wrapper">
        <div class="ar-container" bind:this={container}></div>

        {#if hasError}
            <div class="error-overlay">
                <h2>Failed to initialize AR</h2>
                <p>{errorMessage}</p>
            </div>
        {/if}
        <div class="instructions-overlay">
            Point camera at the Koi logo to see the AR cube
            <div class="target-img">
                <img src="/assets/logos/koi.png" alt="Koi logo" />
            </div>
        </div>
    </div>
</div>

<style>
    .ar-page {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        background: transparent;
        color: white;
    }

    .header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
    }

    .back-btn {
        color: white;
        text-decoration: none;
        font-weight: 500;
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        backdrop-filter: blur(4px);
    }

    h1 {
        margin: 0;
        font-size: 1.25rem;
        font-family: sans-serif;
    }

    .ar-wrapper {
        flex: 1;
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .ar-container {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .instructions-overlay {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        text-align: center;
        font-family: sans-serif;
        font-size: 0.9rem;
        backdrop-filter: blur(8px);
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        white-space: nowrap;
    }

    .target-img {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        background: white;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .target-img img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .error-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(200, 0, 0, 0.9);
        z-index: 20;
        padding: 2rem;
        text-align: center;
    }
</style>
