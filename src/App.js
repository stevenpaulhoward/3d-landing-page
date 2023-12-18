import React, { Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, ContactShadows, ScrollControls, useScroll, Preload } from '@react-three/drei'
import { a as three } from '@react-spring/three'

const duck = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf'
const lumaModel1 = '/lumaModel1.glb'
const lumaModel2 = '/lumaModel2.glb'


function Model({ url, clicked, setClicked, scale = 1, scaleFocus, name = " ", selectedModel, setSelectedModel, ...props }) {
  const { scene } = useGLTF(url)

  const scroll = useScroll()
  const isMobile = window.innerWidth <= 590;

  // camera rotation around model, need to fix the scrolling reset check accessing through css check out https://discourse.threejs.org/t/possiblity-to-set-scrollbar-programmaticaly-with-dreis-scrollcontrols/39254/2 
  useFrame((state) => {
    if (clicked) {
      scene.scale.set(scaleFocus, scaleFocus, scaleFocus)
      // scroll.el.scrollLeft
      const offset = 1 - scroll.offset
      const radius = 10;
      const angle = offset * 2 * Math.PI;

      state.camera.position.set(
        Math.cos(angle) * radius, 
        state.camera.position.y, 
        Math.sin(angle) * radius 
      );

      state.camera.lookAt(0, 0, 0)
    } else {
      scene.scale.set(scale, scale, scale)
      const offset = 0
      const radius = isMobile ? 15 : 10;
      const angle = offset * 2 * Math.PI;

      state.camera.position.set(
        Math.cos(angle) * radius, 
        1.5,  
        Math.sin(angle) * radius  
      );
      
      state.camera.lookAt(0, 0, 0)
    }
  })

  if (name !== selectedModel && selectedModel !== null) {
    return null;
  }

  return ( 
    <primitive 
      name={name} 
      onClick={(event) => {
        setClicked(!clicked);
        setSelectedModel(selectedModel === name ? null : name);
      }}
      object={scene} 
      ContactShadows
      {...props} />
   )
}

export default function App() {

  const [clicked, setClicked] = useState(false)
  const [selectedModel, setSelectedModel] = useState(null);

  return (
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -30], fov: 35 }} shadows>
        <three.pointLight position={[10, 10, 10]} intensity={1.5} color={'#f0f0f0'} />
        <Suspense fallback={null}>
          <ScrollControls pages={clicked ? 3 : 0} infinite horizontal>
            <group rotation={[0, Math.PI/2, 0]}>
              <Model url={lumaModel2} clicked={clicked} setClicked={setClicked} scale={70} scaleFocus={100} position={selectedModel ? [0, 0.2, 0] : [0, 0, 0]} name={"candy"} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
              <Model url={duck} clicked={clicked} setClicked={setClicked} scale={1} scaleFocus={1.7} position={selectedModel ? [0, -0.75, 0] : [2, -0.1, -2]} name={"duck"} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
              <Model url={lumaModel1} clicked={clicked} setClicked={setClicked} scale={7} scaleFocus={10} position={selectedModel ? [0, 0.5, 0] : [-2, 0.75, -2]} name={"target"} selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
            </group>
          </ScrollControls>
          <Environment preset="warehouse" background={clicked ? true : false} blur={0.8}/>
          <Preload all />
        </Suspense>
        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
      </Canvas>
  )
}