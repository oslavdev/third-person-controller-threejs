import React, {useState} from 'react';
import { useRef, useEffect } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "react-three-fiber";
import {Controls} from "@/types/Controls";
import { useSphere } from 'use-cannon';

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

interface actions {
  current: {
    idle: {
      play: () => void;
    };
    run?: {
      play: () => void;
    };
    walk?: {
      play: () => void;
    };
  };
};

var keyboard:any = {};

function keyDown(event) {
 
  keyboard[event.keyCode] = true;

}

function keyUp(event){
	keyboard[event.keyCode] = false;
}


interface PlayerProps{
  url: string;
  controls?: Controls;
};

const Player:React.FC<PlayerProps> = ({
  url,
  controls
}) => {

  
  
  let temp = new THREE.Vector3;
  let dir = new THREE.Vector3;
  let a = new THREE.Vector3;
  let b = new THREE.Vector3;
  const distance = 3.3;
  let velocity = 0.0;
  let speed = 0.0;
  let goal = new THREE.Object3D;
  let follow = new THREE.Object3D;
  follow.position.z = -distance;

  const {nodes, animations} = useLoader<any>(GLTFLoader, url)
  const model:any = useRef();
  const actions: any = useRef()

  const [mixer] = useState(() => new THREE.AnimationMixer(null))
  const [animationState, setAnimationState] = useState(null);

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
   }));

  const velocity_new = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity_new.current = v));
  }, [api.velocity]);


  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set( 0, 5, 0 );
    camera.lookAt(new THREE.Vector3(0,0,0));
  }, [])

  useEffect(() => {
    if (model.current) {
      model.current.add(follow);
      camera.lookAt(model.current.position);


    }
  }, [model.current])

  goal.add( camera );
  

  useEffect(() => {
    
    console.log(animations)
    actions.current = {
      idle: mixer.clipAction(animations[0], model.current),
      running: mixer.clipAction(animations[1], model.current),
      walking: mixer.clipAction(animations[2], model.current),
      walking_backwards: mixer.clipAction(animations[3], model.current),
      wave: mixer.clipAction(animations[4], model.current),
    }

    actions.current.idle.play();
  

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])


  const animation_controller = (animations, action, prevAction) => {
    console.log("Animation controlelr")
    console.log(action)
    console.log(prevAction)
    for (const property in animations) {
      if (prevAction === null && property === action && prevAction !== action) {
        animations[property].play();
      }
      if (prevAction === null && property != action) {
        animations[property].stop();
      }
      if (prevAction && property === action && prevAction !== action) {
        console.log("cross fade")
        animations[property]
        .crossFadeTo(animations[property], 0.1, true)
         .play()
      }
      if (prevAction && property !== action) {
        if (property === prevAction) {
          // animations[property].fadeOut(0.01);
        } else {
          animations[property].stop();
        }
      }
    }
  }

  useFrame((state, delta) => {

    mixer.update(delta);


    const character: any = model.current;
    const animations = actions.current;

    if (character) {

      let prevAction = null;
     
      // Running
      if (keyboard[87] && keyboard[16]) {
          console.warn("Button pressed")
        speed = 0.2;
        animation_controller(animations, "running", prevAction);
        prevAction = "running";
        }
        
      if (keyboard[87] && !keyboard[16]) {
          speed = 0.09;
          animation_controller(animations, "walking", prevAction);
          prevAction = "walking";
      }
      
      if (!keyboard[87] && !keyboard[83]) {
        speed = 0;
        animation_controller(animations, "idle", prevAction);
        prevAction = "idle";
      }
         
      if (keyboard[83]) {
        speed = -0.09;
        animation_controller(animations, "walking_backwards", prevAction);
        prevAction = "walking_backwards";
      }

      if (keyboard[70]) {
        animation_controller(animations, "wave", prevAction);
        prevAction = "wave";
      } 

      if (!keyboard[70]) {
        actions.current.wave.stop();
      }
   

      
      velocity += (speed - velocity) * .3;
      // character.position = [character.position.x, character.position.y, velocity]
      character.translateZ( velocity );

        /* Turns */
        if (keyboard[65]) {
          character.rotateY(0.05);
        }
        if (keyboard[68]) {
          character.rotateY(-0.05);
        }
    }


      a.lerp(character.position, 0.4);
      b.copy(goal.position);
      
      dir.copy( a ).sub( b ).normalize();
      const dis = a.distanceTo( b ) - distance;
      goal.position.addScaledVector( dir, dis );
      goal.position.lerp(temp, 0.02);
      temp.setFromMatrixPosition(follow.matrixWorld);

   
     const position = new THREE.Vector3(character.position.x, 4.2, character.position.z)
     camera.lookAt( position );
     
    

     


  })

  document.addEventListener('mousemove', onMouseUpdate, false);
 
  var x = null;
 var y = null;
 
  function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;

  //   console.log(x)
  //   console.log(y)
  //  const d = new THREE.Vector3( Math.sin( x.toFixed(1)/650 ), camera.position.y, camera.position.z)
  //  camera.position.lerp(d, 0.1) 
  //  camera.position.z =  Math.sin( y/950 );

  }

  
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);

  console.log("Player start")
  return (
    <group ref={model} position={[0, 1, 0]} dispose={null}>
      <primitive
        scale={[0.02, 0.02, 0.02]}
        name="Object_0"
        object={nodes["Character"]}
      />
    </group>
  )
}

export default Player;