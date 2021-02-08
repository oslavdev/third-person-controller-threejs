import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import Light from '@/components/Three/Light';
import {  Sky, Html } from "drei";
import useCharacterControllerInputs from '@/hooks/useCharacterControllerInputs';
import Terrain from '@/components/Three/Terrain';
import { PLAYER__MODEL__URL } from '@/config/constants';
import Player from "@/components/Three/Player";
import { Physics } from 'use-cannon';

export default function Test() {



  return (
   
    <Canvas gl={{ antialias: true }} camera={{ near: 0.01, far: 100, fov: 70, aspect: window.innerWidth / window.innerHeight }} className="main" shadowMap >
       <Sky sunPosition={[7, 5, 1]} />
         
      <Light />
      <Suspense fallback={null}>
        {/* <Physics gravity={[0, -30, 0]}> */}
        <Player url={PLAYER__MODEL__URL} />
          <Terrain />
          {/* </Physics> */}
      </Suspense>
   
      
    
    
      
 
    </Canvas>
  )
}
