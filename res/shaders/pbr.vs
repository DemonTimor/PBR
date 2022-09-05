#version 430 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;

out VS_OUT {
    vec2 texCoords;
    vec3 normal;
} vs_out;

uniform mat4 view;
uniform mat4 model;

void main()
{
    vs_out.texCoords = aTexCoords;
    vs_out.normal = normalize(transpose(inverse(mat3(model))) * aNormal);

    gl_Position = model * vec4(aPos, 1.0);
}