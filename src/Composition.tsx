import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { fragment, vertex } from "./shaders";

export const MyComposition: React.FC = () => {
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
      <mesh>
        <planeGeometry args={[width, height, 1]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={{
            u_time: { value: time },
            u_resolution: { value: { x: width, y: height } }
          }}
        />
      </mesh>
    </ThreeCanvas>
  );
};