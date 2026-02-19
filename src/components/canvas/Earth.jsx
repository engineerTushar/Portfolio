import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = () => {
    // Fallback since we don't have the model
    return (
        <mesh>
            <sphereGeometry args={[2.5, 32, 32]} />
            <meshStandardMaterial color="#444444" wireframe />
        </mesh>
    );
};

const EarthCanvas = () => {
    return (
        <Canvas
            shadows
            frameloop='demand'
            dpr={[1, 2]}
            gl={{ preserveDrawingBuffer: true }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [-4, 3, 6],
            }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    autoRotate
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Earth />
                <directionalLight position={[1, 1, 1]} intensity={1} />
                <ambientLight intensity={0.5} />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default EarthCanvas;
