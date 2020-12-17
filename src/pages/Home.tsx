import React from 'react'
import { Canvas } from "react-three-fiber";
import Lights from "@/components/Three/Light";
import Model from "@/components/Three/Model";

export default function Home() {
  return (
    <Canvas colorManagement camera={{ position: [0, 0, 300] }}>
      <Lights />
      <Model/>
    </Canvas>
  )
}
