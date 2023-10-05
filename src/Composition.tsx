import { render, ShaderMaterialProps, useFrame } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import { useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fragment, vertex } from "./shaders";

const CanvasContent = (props: {
  width: number,
  height: number,
  time: number
}) => {
  const {width, height, time} = props;
	const material = useRef();
  useFrame(() => {
    if(!material.current) return;
    const mat = material.current as ShaderMaterialProps;
    mat.uniforms.u_time.value = time;
    mat.needsUpdate = true;
  });

  return <mesh>
    <planeGeometry args={[width, height, 1]} />
    <shaderMaterial
      vertexShader={vertex}
      fragmentShader={fragment}
      uniforms={{
        u_time: { value: time },
        u_resolution: { value: { x: width, y: height } }
      }}
      ref={material}
    />
  </mesh>
}

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;

  return (
    <ThreeCanvas
      orthographic={true}
      width={width}
      height={height}
      style={{
        backgroundColor: "black",
      }}
      camera={{ position: [0, 0, 1] }}
    >
      <CanvasContent {...{width, height, time}} />
    </ThreeCanvas>
  );
};
