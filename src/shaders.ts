export const vertex = `
varying vec2 v_uv;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
export const fragment = `
varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_time;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    gl_FragColor = vec4(1.0, 0.0, sin(u_time * 5.)*.5 + 0.5, 1.);
}
`;
