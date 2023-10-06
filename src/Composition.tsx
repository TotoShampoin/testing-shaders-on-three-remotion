import {useState} from 'react';
import {ShaderMaterialProps, useFrame} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import {useMemo, useRef} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {fragment, vertex} from './shaders';

const CanvasContent = (props: {
	width: number;
	height: number;
	time: number;
}) => {
	const {width, height, time} = props;
	const [initialTime] = useState(() => time);
	const timeRef = useRef(time);
	timeRef.current = time;
	const material = useRef();

	const uniforms = useMemo(() => {
		return {
			u_time: {value: initialTime},
			u_resolution: {value: {x: width, y: height}},
		};
	}, [height, initialTime, width]);

	useFrame(() => {
		if (!material.current) return;
		const mat = material.current as ShaderMaterialProps;
		mat.uniforms.u_time.value = time;
	});

	return (
		<mesh>
			<planeGeometry args={[width, height, 1]} />
			<shaderMaterial
				ref={material}
				vertexShader={vertex}
				fragmentShader={fragment}
				uniforms={uniforms}
			/>
		</mesh>
	);
};

export const MyComposition = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const time = frame / fps;

	return (
		<ThreeCanvas
			orthographic
			width={width}
			height={height}
			style={{
				backgroundColor: 'black',
			}}
			camera={{position: [0, 0, 1]}}
		>
			<CanvasContent {...{width, height, time}} />
		</ThreeCanvas>
	);
};
