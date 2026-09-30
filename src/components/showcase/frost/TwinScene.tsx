"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import { Eye, Map } from "lucide-react";
import type { WarehouseType } from "./frostData";

type CameraMode = "free" | "top";

function CameraRig({ mode }: { mode: CameraMode }) {
  const { camera, gl } = useThree();
  const keys = useRef(new Set<string>());

  useEffect(() => {
    const down = (event: KeyboardEvent) => keys.current.add(event.code);
    const up = (event: KeyboardEvent) => keys.current.delete(event.code);
    const wheel = (event: WheelEvent) => {
      if (mode !== "free") return;
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      camera.position.addScaledVector(direction.normalize(), Math.sign(event.deltaY) * -0.75);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    gl.domElement.addEventListener("wheel", wheel, { passive: true });
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); gl.domElement.removeEventListener("wheel", wheel); };
  }, [camera, gl, mode]);

  useEffect(() => {
    if (mode === "top") {
      camera.position.set(0, 26, 0.5);
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);
    } else {
      camera.up.set(0, 1, 0);
      camera.position.set(0, 1.7, 10.5);
      camera.lookAt(0, 1.7, 0);
    }
  }, [camera, mode]);

  /* eslint-disable react-hooks/immutability -- R3F camera controls update the scene camera every frame. */
  useFrame((_, delta) => {
    if (mode !== "free") return;
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
    const speed = 4.2 * delta;
    if (keys.current.has("KeyW")) camera.position.addScaledVector(forward, speed);
    if (keys.current.has("KeyS")) camera.position.addScaledVector(forward, -speed);
    if (keys.current.has("KeyA")) camera.position.addScaledVector(right, -speed);
    if (keys.current.has("KeyD")) camera.position.addScaledVector(right, speed);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -7.5, 7.5);
    camera.position.y = 1.7;
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -10.7, 11.2);
  });
  /* eslint-enable react-hooks/immutability */

  return mode === "free" ? <PointerLockControls /> : null;
}

const RackStructure = memo(function RackStructure() {
  const uprightRef = useRef<THREE.InstancedMesh>(null);
  const railRef = useRef<THREE.InstancedMesh>(null);
  const uprights = useMemo(() => {
    const values: THREE.Vector3[] = [];
    for (const side of [-1, 1]) for (let column = 0; column < 15; column++) for (const xOffset of [0, 3.25]) values.push(new THREE.Vector3(side * (4.55 + xOffset), 3.5, -10 + column * 1.4));
    return values;
  }, []);
  const rails = useMemo(() => {
    const values: THREE.Vector3[] = [];
    for (const side of [-1, 1]) for (let column = 0; column < 15; column++) for (let level = 0; level < 7; level++) values.push(new THREE.Vector3(side * 6.18, 0.55 + level * 0.92, -10 + column * 1.4));
    return values;
  }, []);
  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    uprights.forEach((position, index) => { matrix.makeTranslation(position.x, position.y, position.z); uprightRef.current?.setMatrixAt(index, matrix); });
    rails.forEach((position, index) => { matrix.makeTranslation(position.x, position.y, position.z); railRef.current?.setMatrixAt(index, matrix); });
    if (uprightRef.current) uprightRef.current.instanceMatrix.needsUpdate = true;
    if (railRef.current) railRef.current.instanceMatrix.needsUpdate = true;
  }, [rails, uprights]);
  return <>
    <instancedMesh ref={uprightRef} args={[undefined, undefined, uprights.length]} castShadow><boxGeometry args={[0.12, 7, 0.12]} /><meshStandardMaterial color="#2563a8" roughness={0.58} /></instancedMesh>
    <instancedMesh ref={railRef} args={[undefined, undefined, rails.length]} castShadow><boxGeometry args={[3.35, 0.1, 0.14]} /><meshStandardMaterial color="#e57a19" roughness={0.55} /></instancedMesh>
  </>;
});

const PalletLoads = memo(function PalletLoads({ warehouse }: { warehouse: WarehouseType }) {
  const baseRef = useRef<THREE.InstancedMesh>(null);
  const loadRef = useRef<THREE.InstancedMesh>(null);
  const loads = useMemo(() => {
    const list: { base: THREE.Vector3; load: THREE.Vector3; color: THREE.Color }[] = [];
    for (const side of [-1, 1]) for (let column = 0; column < 15; column++) for (let level = 0; level < 7; level++) for (let depth = 0; depth < 4; depth++) {
      const seed = column * 31 + level * 13 + depth * 7 + (side > 0 ? 19 : 0);
      if (seed % 6 === 0) continue;
      const x = side * (4.95 + depth * 0.78);
      const y = 0.32 + level * 0.92;
      const z = -10 + column * 1.4;
      const fill = seed % 11 === 0 ? 0 : (seed * 17) % 101;
      const color = new THREE.Color(
        fill === 0 ? "#111827" : fill < 20 ? "#f28b45" : fill < 60 ? "#e9c94c" : warehouse === "cold" ? "#76c89a" : "#9dce7d",
      );
      list.push({ base: new THREE.Vector3(x, y, z), load: new THREE.Vector3(x, y + 0.34, z), color });
    }
    return list;
  }, [warehouse]);
  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    loads.forEach((item, index) => {
      matrix.makeTranslation(...item.base.toArray()); baseRef.current?.setMatrixAt(index, matrix);
      matrix.makeTranslation(...item.load.toArray()); loadRef.current?.setMatrixAt(index, matrix);
      loadRef.current?.setColorAt(index, item.color);
    });
    if (baseRef.current) baseRef.current.instanceMatrix.needsUpdate = true;
    if (loadRef.current) { loadRef.current.instanceMatrix.needsUpdate = true; if (loadRef.current.instanceColor) loadRef.current.instanceColor.needsUpdate = true; }
  }, [loads]);
  return <>
    <instancedMesh ref={baseRef} args={[undefined, undefined, loads.length]} receiveShadow><boxGeometry args={[0.64, 0.1, 0.88]} /><meshStandardMaterial color="#171a20" roughness={0.8} /></instancedMesh>
    <instancedMesh ref={loadRef} args={[undefined, undefined, loads.length]} castShadow><boxGeometry args={[0.58, 0.56, 0.76]} /><meshStandardMaterial vertexColors roughness={0.68} /></instancedMesh>
  </>;
});

const Warehouse = memo(function Warehouse({ warehouse }: { warehouse: WarehouseType }) {
  return <>
    <color attach="background" args={[warehouse === "cold" ? "#eaf3f8" : "#f5f0e8"]} />
    <fog attach="fog" args={[warehouse === "cold" ? "#eaf3f8" : "#f5f0e8", 15, 38]} />
    <ambientLight intensity={1.45} />
    <hemisphereLight args={["#ffffff", "#8295a5", 1.2]} />
    <directionalLight position={[2, 12, 6]} intensity={2.25} castShadow />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[18, 25]} /><meshStandardMaterial color={warehouse === "cold" ? "#cad8df" : "#d8d1c4"} roughness={0.92} /></mesh>
    <mesh position={[-8.7, 4, 0]}><boxGeometry args={[0.25, 8, 25]} /><meshStandardMaterial color="#f9fbfc" /></mesh>
    <mesh position={[8.7, 4, 0]}><boxGeometry args={[0.25, 8, 25]} /><meshStandardMaterial color="#f9fbfc" /></mesh>
    <mesh position={[0, 4, -12.35]}><boxGeometry args={[17.5, 8, 0.3]} /><meshStandardMaterial color="#f9fbfc" /></mesh>
    {warehouse === "cold" && <group position={[0, 5.7, -12]}><mesh><boxGeometry args={[3.5, 1.5, 0.45]} /><meshStandardMaterial color="#eff5f7" /></mesh>{[-1.05, 0, 1.05].map((x) => <mesh key={x} position={[x, 0, 0.27]}><cylinderGeometry args={[0.48, 0.48, 0.08, 24]} /><meshStandardMaterial color="#6c7c89" /></mesh>)}</group>}
    <RackStructure />
    <PalletLoads warehouse={warehouse} />
  </>;
});

export function TwinScene({ warehouse }: { warehouse: WarehouseType }) {
  const [mode, setMode] = useState<CameraMode>("top");
  return <div className="frost-twin">
    <div className="frost-twin__controls" role="group" aria-label="3D camera controls">
      <button type="button" className={mode === "free" ? "is-active" : ""} onClick={() => setMode("free")}><Eye size={14} /> Free Explore</button>
      <button type="button" className={mode === "top" ? "is-active" : ""} onClick={() => setMode("top")}><Map size={14} /> Top Overview</button>
    </div>
    <div className="frost-canvas"><Canvas shadows camera={{ position: [0, 26, 0.5], fov: 58, near: 0.1, far: 100 }} dpr={[1, 1.5]}><Warehouse warehouse={warehouse} /><CameraRig mode={mode} /></Canvas></div>
    <div className="frost-twin__instructions"><b>{warehouse === "cold" ? "TWIN WMS · COLD STORAGE" : "TWIN WMS · DRY WAREHOUSE"}</b><span>{mode === "free" ? "Click scene for mouse look · WASD move · Wheel forward/back · Esc releases cursor" : "Full overhead warehouse view · choose Free Explore to walk the room"}</span></div>
  </div>;
}
