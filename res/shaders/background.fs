#version 430 core
out vec4 FragColor;
in vec3 WorldPos;

uniform samplerCube environmentMap;

uniform float exposure;

void main()
{		
    vec3 envColor = textureLod(environmentMap, WorldPos, 0.0).rgb;
    
    FragColor = vec4(envColor, 1.0);
}