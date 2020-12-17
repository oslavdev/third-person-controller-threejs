import * as THREE from 'three';

interface Degrees{
  x: number,
  y: number
}

export function getMouseDegrees(x:number, y:number, degreeLimit:number):Degrees {
  let dx = 0,
    dy = 0,
    xdiff,
    xPercentage,
    ydiff,
    yPercentage

  let w = { x: window.innerWidth, y: window.innerHeight }

  // Left (Rotates neck left between 0 and -degreeLimit)
  // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimit * xPercentage) / 100) * -1
  }

  // Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2
    xPercentage = (xdiff / (w.x / 2)) * 100
    dx = (degreeLimit * xPercentage) / 100
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y
    yPercentage = (ydiff / (w.y / 2)) * 100
    // Note that I cut degreeLimit in half when she looks up
    dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1
  }
  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2
    yPercentage = (ydiff / (w.y / 2)) * 100
    dy = (degreeLimit * yPercentage) / 100
  }
  return { x: dx, y: dy }
}

interface mouse{
  current: {
    y: number,
    x: number
  }
};
interface model{
  rotation:{
    xD: number,
    yD: number,
    x: number,
    y: number
  }
}
export function move(mouse:mouse, model:model, degreeLimit:number = 40):void {
  let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit)
  model.rotation.xD = THREE.MathUtils.lerp(model.rotation.xD || 0, degrees.y, 0.1)
  model.rotation.yD = THREE.MathUtils.lerp(model.rotation.yD || 0, degrees.x-25, 0.1)
  model.rotation.x = THREE.Math.degToRad(model.rotation.xD)
  model.rotation.y = THREE.Math.degToRad(model.rotation.yD)
}
