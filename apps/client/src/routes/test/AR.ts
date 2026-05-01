import * as THREE from 'three'

export const initAR = async () => {
    if (typeof window === 'undefined') return;

    // Fetch target data from static location
    const targetData = await fetch('/image-targets/test.json').then(res => res.json());

    const imageTargetPipelineModule = () => {
        let frame: THREE.Mesh;

        const updatePose = (detail: any, mesh: THREE.Object3D) => {
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

    const onxrloaded = async () => {
        const XR8 = (window as any).XR8;
        const XRExtras = (window as any).XRExtras;
        if (!XR8) return;

        XR8.XrController.configure({
            imageTargetData: [targetData],
            imageTargets: [(targetData as any).name],
            disableWorldTracking: true,
        });

        XR8.addCameraPipelineModules([
            XR8.GlTextureRenderer.pipelineModule(),
            XR8.Threejs.pipelineModule(),
            XR8.XrController.pipelineModule(),
            XRExtras.AlmostThere.pipelineModule(),
            XRExtras.FullWindowCanvas.pipelineModule(),
            XRExtras.RuntimeError.pipelineModule(),
            imageTargetPipelineModule(),
        ]);

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