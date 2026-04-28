<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
        WebGLRenderer,
        Scene,
        PerspectiveCamera,
        CylinderGeometry,
        MeshBasicMaterial,
        Mesh,
        Quaternion,
        TextureLoader,
        DoubleSide,
    } from "three";
    import { browser } from "$app/environment";
    import { resolveImagePath } from "$lib/utils/image";

    interface Props {
        dishImage: string;
        dishName: string;
        triggerImage?: string;
        isVisible?: boolean;
        onClose: () => void;
        onReady?: () => void;
    }

    let {
        dishImage,
        dishName,
        triggerImage = "/assets/logos/koi.png",
        isVisible = false,
        onClose,
        onReady,
    }: Props = $props();

    let container: HTMLDivElement;
    let wasInstance: any = null;
    let renderer: WebGLRenderer;
    let scene: Scene;
    let camera: PerspectiveCamera;
    let model: Mesh;

    const CAMERA_FOV = 45;
    const CAMERA_NEAR = 1;
    const CAMERA_FAR = 100000;

    let hasError = $state(false);
    let errorMessage = $state("");
    let isTracking = $state(false);

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

            wasInstance = new WAS();

            // We must use a valid api key from env. If not found, it will fail gracefully now.
            const configData = {
                apiKey: import.meta.env.VITE_WEBAR_API_KEY || "52f80541de1715ba47f43522d648d0800c6e514d8b5e91b9b6e13ef9e1348cb8",
                mode: PROJECT_MODE_IMAGE,
                cameraMode: CAMERA_MODE_ENVIRONMENT,
                container: container,
                fov: CAMERA_FOV,
                triggers: [
                    { id: 1, mode: TRIGGER_MODE_IMAGE, source: triggerImage },
                ],
                isMultiTracking: false,
                anchor: ANCHOR_TYPE_CENTER,
            };

            const { canvas, context, viewportSizes } =
                await wasInstance.init(configData);

            renderer = new WebGLRenderer({
                canvas: canvas,
                context: context || undefined,
                antialias: false, // Turned off for massive GPU saving
                alpha: true,
                powerPreference: "high-performance",
            });

            renderer.setPixelRatio(window.devicePixelRatio); // Restored for maximum camera sharpness
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

            // Lighting completely removed to save GPU fragment shader processing!
            // We now use MeshBasicMaterial which does not require lighting.

            // Create a realistic "plate" using a cylinder
            // Map the dish image as a texture onto the top face
            const textureLoader = new TextureLoader();
            const texturePath = resolveImagePath(dishImage);
            
            // Ultra-cheap generic material for the bottom and sides
            const plateMaterial = new MeshBasicMaterial({ 
                color: 0xf5f5f5
            });

            // Geometry: radiusTop, radiusBottom, height, radialSegments
            // Reduced segments from 64 to 32 to halve vertex processing
            const geometry = new CylinderGeometry(240, 225, 15, 32);
            // Rotate geometry so the flat top face points along Z-axis (flat on the marker)
            geometry.rotateX(Math.PI / 2);
            
            textureLoader.load(
                texturePath,
                (texture) => {
                    // Create unshaded material for the top face so the image is fully bright
                    const topMaterial = new MeshBasicMaterial({
                        map: texture
                    });
                    
                    // Materials array for Cylinder: [side, top, bottom]
                    model = new Mesh(geometry, [plateMaterial, topMaterial, plateMaterial]);
                    model.visible = false;
                    
                    scene.add(model);
                },
                undefined,
                (err) => {
                    console.error("Failed to load texture", err);
                    // Fallback to a plain cylinder if image fails
                    model = new Mesh(geometry, plateMaterial);
                    model.visible = false;
                    scene.add(model);
                }
            );

            const applySdkCamera = (data: any) => {
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
                    left, right, top, bottom, near, far,
                );
                camera.projectionMatrixInverse
                    .copy(camera.projectionMatrix)
                    .invert();
            };

            wasInstance.on(EVENT_DETECTED, (detectedData: any[]) => {
                isTracking = true;
                if (navigator.vibrate) navigator.vibrate([20, 50, 20]); // Premium haptic success pop
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

            wasInstance.on(EVENT_LOST, (lostData: any[]) => {
                isTracking = false;
                for (const data of lostData) {
                    if (model) {
                        model.visible = false;
                    }
                }
            });

            wasInstance.on(EVENT_POSE, (poseData: any[]) => {
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

            let hasCalledReady = false;
            wasInstance.on(EVENT_FRAME, () => {
                renderer.render(scene, camera);
                if (!hasCalledReady) {
                    hasCalledReady = true;
                    if (onReady) onReady();
                    if (navigator.vibrate) navigator.vibrate(40); // Soft click when camera opens
                }
            });
        } catch (error: any) {
            console.error("AR Initialization Error:", error);
            hasError = true;
            errorMessage = error.message || String(error);
            if (onReady) onReady(); // Prevent infinite loading if it fails
        }
    });

    $effect(() => {
        // Track dishImage reactively
        const currentImage = dishImage;
        if (model && currentImage) {
            const textureLoader = new TextureLoader();
            const texturePath = resolveImagePath(currentImage);
            
            textureLoader.load(
                texturePath,
                (texture) => {
                    const topMaterial = new MeshBasicMaterial({
                        map: texture
                    });
                    
                    if (Array.isArray(model.material)) {
                        // Dispose old material map to prevent memory leaks
                        if (model.material[1].map) {
                            model.material[1].map.dispose();
                        }
                        model.material[1].dispose();
                        
                        // Create a new array to trigger Three.js update
                        const newMaterials = [...model.material];
                        newMaterials[1] = topMaterial;
                        model.material = newMaterials;
                    }
                },
                undefined,
                (err) => {
                    console.error("Failed to update texture dynamically", err);
                }
            );
        }
    });

    onDestroy(() => {
        if (wasInstance) {
            try {
                if (typeof wasInstance.destroy === "function") {
                    wasInstance.destroy();
                }
            } catch (e) {
                console.error("Cleanup error:", e);
            }
        }
        
        // Strict memory cleanup to prevent WebGL context leaks & overheating
        if (model) {
            if (model.geometry) model.geometry.dispose();
            if (Array.isArray(model.material)) {
                model.material.forEach(m => {
                    if (m.map) m.map.dispose();
                    m.dispose();
                });
            } else if (model.material) {
                if (model.material.map) model.material.map.dispose();
                model.material.dispose();
            }
        }
        if (renderer) renderer.dispose();
    });
</script>

<div class="ar-viewer-background" class:visible={isVisible} role="region" aria-label="AR Viewer">
    <div class="ar-wrapper">
        <div class="ar-container" bind:this={container}></div>

        {#if hasError}
            <div class="error-overlay">
                <h3>Failed to initialize AR</h3>
                <p>{errorMessage}</p>
                <button class="retry-btn" onclick={onClose}>Go Back</button>
            </div>
        {/if}

        {#if !isTracking}
            <div class="instructions-overlay">
                <div class="scan-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M4 7V4h3M17 4h3v3M4 17v3h3M17 20h3v-3"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    </svg>
                </div>
                <p>Point your camera at the QR</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .ar-viewer-background {
        position: fixed;
        inset: 0;
        z-index: 0;
        background: #000;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: scale(1.05);
        pointer-events: none;
        transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .ar-viewer-background.visible {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.45);
        padding: 0.85rem 1.5rem;
        border-radius: 100px;
        text-align: center;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        white-space: nowrap;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
        animation: float 4s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translate(-50%, -50%); }
        50% { transform: translate(-50%, -55%); }
    }

    .instructions-overlay p {
        margin: 0;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    .scan-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        animation: scan-pulse 2s infinite ease-in-out;
    }

    @keyframes scan-pulse {
        0%, 100% { opacity: 0.6; scale: 0.9; }
        50% { opacity: 1; scale: 1.1; color: #4ade80; }
    }

    .error-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(220, 38, 38, 0.95);
        z-index: 20;
        padding: 2rem;
        text-align: center;
        color: white;
        backdrop-filter: blur(8px);
    }

    .error-overlay h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
    }

    .error-overlay p {
        margin: 0 0 2rem 0;
        opacity: 0.9;
        max-width: 80%;
    }

    .retry-btn {
        background: white;
        color: #dc2626;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 100px;
        font-weight: 600;
        cursor: pointer;
        font-size: 1rem;
        transition: transform 0.2s;
    }

    .retry-btn:active {
        transform: scale(0.95);
    }
</style>
