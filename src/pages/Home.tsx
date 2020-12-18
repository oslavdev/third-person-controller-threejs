import React, {useRef} from 'react'
import { Canvas } from "react-three-fiber";
import Lights from "@/components/Three/Light";
import Model from "@/components/Three/Model";
import { getMousePos } from "@/utils/mouse";


export default function Home() {
  const mouse = useRef({ x: 0, y: 0 })
  return (
    <Canvas
      onMouseMove={(e) => (mouse.current = getMousePos(e))}
      concurrent
      colorManagement
      camera={{ position: [0, 0, 300] }}
    >
      <Lights />
      <Model url={"/public/model/scene.gltf"} mouse={mouse}/>
    </Canvas>
  )
}
