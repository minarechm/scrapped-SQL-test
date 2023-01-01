import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, MeshDistortMaterial, ContactShadows, Environment } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from "react"
import { a } from '@react-spring/three' //animated
import { useSpring } from '@react-spring/core'

const AnimatedMaterial = a(MeshDistortMaterial)

export const ThreeJsSection = () => {
    const [hovered, setHovered] = useState(false)
    const light = useRef()
    const meshRef = useRef(null)
    const [mode, setMode] = useState(false)
    const [down, setDown] = useState(false)
    const [wireframeToggle, setWireframeToggle] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? "none" : "auto"
    },[hovered])

    const [{ wobble, color, coat, ambient, env }] = useSpring({
        wobble: down ? 1.2 : hovered ? 1.25 : 1,
        color: hovered ? "black" : "white",
        coat: mode && !hovered ? 0.04 : 1,
        ambient: mode && !hovered ? 1.5 : 0.5,
        env: mode && !hovered ? 0.4 : 1,
    }, [hovered, mode, down])

    const Cube = () => {
        useFrame((state) => {
            //meshRef.current.rotation.x += 0.001
            light.current.position.x = state.mouse.x * 20
            light.current.position.y = state.mouse.y * 20
            if (meshRef.current) {
                meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, hovered ? state.mouse.x / 2 : 0, 0.2)
                meshRef.current.position.y = THREE.MathUtils.lerp(
                    meshRef.current.position.y,
                  Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
                  0.2
                )
              }
        }, [])

        return (
            <a.mesh 
                ref={meshRef} 
                onPointerOver={() => {
                    setHovered(true)
                    setWireframeToggle(true)
                    
                }}
                onPointerOut={() => {
                    setHovered(false)
                    setWireframeToggle(false)
                }}
                onPointerDown={() => {
                    setDown(true)
                    
                }}
                onPointerUp={() => {
                    setDown(false)
                    setMode(!mode)
                    
                }}
                scale={wobble}
            >
                <torusKnotGeometry args={[5, 4, 300, 30, 5, 3]} />
                {/*<tetrahedronGeometry args={[0.5,1]}/>*/}
                {/*<meshStandardMaterial color="blue"/>*/}
                <AnimatedMaterial color={color} clearcoat={coat} clearcoatRoughness={0} envMapIntensity={env} metalness={0.1} wireframe={wireframeToggle}/>
            </a.mesh>
        )
    }
    return (
     <>
     <Canvas camera={{ position: [5,0, 15], fov: 20 }} style={{height: "100vh"}} >
        <ambientLight/>
        <a.pointLight position={[10, 10, 10]} ref={light} intensity={env}/>
        <Suspense fallback={null}>
            <Cube/>
            <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
            <Environment preset="warehouse" />
        {/*<ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={mode ? 0.8 : 0.4}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
    />*/}
        </Suspense>
     </Canvas>
     </>   
    )
}