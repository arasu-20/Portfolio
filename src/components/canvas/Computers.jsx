import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { ComputersCanvas } from ".";
const Computers = ({isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');
  return (
      <mesh>
        <hemisphereLight intensity={1.75} groundColor="blue" />
        <pointLight intensity={1} />
        <spotLight position={[-20,50,10]}
        angle={0.25}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
        />
        <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0,-3,-2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
        />
      </mesh>
  );
};
const ComputerCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
    const mediaQuery = window.matchMedia('(max-width: 5 00px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event)=>{
      setIsMobile(mediaQuery.matches);
    }

    mediaQuery.addEventListener('change',handleMediaQueryChange);

    return ()=>{
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  },[])
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
