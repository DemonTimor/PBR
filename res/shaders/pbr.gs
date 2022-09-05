#version 430 core
layout (triangles) in;
layout (triangle_strip, max_vertices = 3) out;

in VS_OUT {
    vec2 texCoords;
    vec3 normal;
} gs_in[];

out vec2 TexCoords;
out vec3 WorldPos;
out vec3 Normal;

uniform mat4 projection;
uniform mat4 view;

uniform float explodeDegree;

vec4 explode(vec4 position, vec3 normal)
{
    vec3 direction = normal * explodeDegree; 
    return position + vec4(direction, 0.0);
}

vec3 GetNormal()
{
    vec3 a = vec3(gl_in[1].gl_Position) - vec3(gl_in[0].gl_Position);
    vec3 b = vec3(gl_in[2].gl_Position) - vec3(gl_in[0].gl_Position);
    return normalize(cross(a, b));
}

void main() {    
    vec3 normal = GetNormal();

    for (int i = 0; i < 3; i ++) {
        WorldPos = explode(gl_in[i].gl_Position, normal).xyz;
        gl_Position = projection * view * vec4(WorldPos, 1.0);
        TexCoords = gs_in[i].texCoords;
        Normal = gs_in[i].normal;
        EmitVertex();
    }
    EndPrimitive();
}