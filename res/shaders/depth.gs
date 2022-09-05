#version 430 core
layout (triangles) in;
layout (triangle_strip, max_vertices=18) out;

out vec4 FragPos; // FragPos from GS (output per emitvertex)

uniform mat4 shadowMatrices[6];

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

void main()
{
    vec3 normal = GetNormal();

    for(int face = 0; face < 6; ++face)
    {
        gl_Layer = face; // built-in variable that specifies to which face we render.
        for(int i = 0; i < 3; ++i) // for each triangle's vertices
        {
            FragPos = explode(gl_in[i].gl_Position, normal);
            gl_Position = shadowMatrices[face] * FragPos;
            EmitVertex();
        }    
        EndPrimitive();
    }
} 