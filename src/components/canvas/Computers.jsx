import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Float, PresentationControls } from "@react-three/drei";
import CanvasLoader from "../Loader";
import * as THREE from 'three';

const Spaceship = ({ isMobile }) => {
    const shipRef = useRef();

    useFrame((state) => {
        if (!shipRef.current) return;
        const t = state.clock.getElapsedTime();

        // Idle Animation: Left to Right (X axis)
        const idleX = Math.sin(t * 0.5) * 1.5;
        const idleY = Math.cos(t * 0.5) * 0.2;

        // Mouse Interaction
        const mouseX = state.mouse.x * 2;
        const mouseY = state.mouse.y * 1;

        // Target Position
        const targetX = idleX + mouseX;
        const targetY = idleY + mouseY;

        // Smoothly interpolate position (Lerp)
        shipRef.current.position.x = THREE.MathUtils.lerp(shipRef.current.position.x, targetX, 0.05);
        shipRef.current.position.y = THREE.MathUtils.lerp(shipRef.current.position.y, targetY, 0.05);

        // Rotation / Banking
        const targetRotationZ = -state.mouse.x * 0.5; // Roll
        const targetRotationX = -state.mouse.y * 0.3; // Pitch
        const targetYaw = -Math.PI / 2 - (state.mouse.x * 0.2); // Face right + yaw

        shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, targetRotationZ, 0.1);
        shipRef.current.rotation.x = THREE.MathUtils.lerp(shipRef.current.rotation.x, targetRotationX, 0.1);
        shipRef.current.rotation.y = THREE.MathUtils.lerp(shipRef.current.rotation.y, targetYaw, 0.1);
    });

    return (
        <group ref={shipRef} scale={isMobile ? 0.7 : 1} rotation={[0, -Math.PI / 2, 0]}>
            {/* Prometheus-style Procedural Ship */}

            {/* Main Hull (Long) */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[4.5, 0.8, 0.8]} />
                <meshStandardMaterial color="#888" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Front Bridge / nose */}
            <mesh position={[2.5, 0.2, 0]}>
                <boxGeometry args={[1, 0.6, 0.6]} />
                <meshStandardMaterial color="#444" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Cockpit Window */}
            <mesh position={[2.6, 0.4, 0]}>
                <boxGeometry args={[0.5, 0.3, 0.5]} />
                <meshStandardMaterial color="#0ff" emissive="#0ff" emissiveIntensity={0.5} metalness={1} roughness={0} />
            </mesh>

            {/* Rear Engine Block */}
            <mesh position={[-2, 0, 0]}>
                <boxGeometry args={[1, 1.2, 1.2]} />
                <meshStandardMaterial color="#555" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* 4 Engine Pods */}
            {[
                [0.5, 0.5], [0.5, -0.5], [-0.5, 0.5], [-0.5, -0.5]
            ].map((pos, i) => (
                <group key={i} position={[-2.5, pos[0], pos[1]]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.3, 0.4, 1.5, 16]} />
                        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
                    </mesh>
                    {/* Engine Glow */}
                    <mesh position={[0, -0.8, 0]} rotation={[Math.PI, 0, 0]}>
                        <cylinderGeometry args={[0.2, 0.1, 0.1, 16]} />
                        <meshStandardMaterial color="#0af" emissive="#0af" emissiveIntensity={5} toneMapped={false} />
                    </mesh>
                </group>
            ))}

            {/* Side Wings / Panels */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[2, 0.1, 2.5]} />
                <meshStandardMaterial color="#666" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Glow Light for Engines */}
            <pointLight position={[-4, 0, 0]} intensity={3} color="#0af" distance={5} />
        </group>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)");
        setIsMobile(mediaQuery.matches);
        const handleMediaQueryChange = (event) => setIsMobile(event.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }, []);

    return (
        <Canvas
            frameloop='always'
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0, 10], fov: 45 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                {/* Lights */}
                <hemisphereLight intensity={0.5} groundColor='black' />
                <pointLight intensity={2} position={[5, 5, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[-10, 10, 10]}
                    angle={0.5}
                    penumbra={1}
                    intensity={2}
                    castShadow
                />

                {/* Presentation Controls allow user to rotate the model */}
                <PresentationControls
                    global
                    config={{ mass: 1, tension: 170, friction: 26 }}
                    zoom={false}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]} // Limit vertical rotation
                    azimuth={[-Math.PI / 4, Math.PI / 4]} // Limit horizontal rotation
                >
                    <Spaceship isMobile={isMobile} />
                </PresentationControls>
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;
