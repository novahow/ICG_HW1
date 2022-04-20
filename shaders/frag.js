export default `
#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec4 fragcolor;
varying vec3 normal;
varying vec3 mvVertex;
varying vec3 frontColor;
varying float shadeMode; // 1: flat, 2: gouraud, 3: phong, 4: cel
varying float ka, kd, ks;
varying vec3 lightPosition1;
varying vec3 lightcolor1;
varying vec3 lightPosition2;
varying vec3 lightcolor2;
varying vec3 lightPosition3;
varying vec3 lightcolor3;

void main(void) {
    vec3 final_color = vec3(0.0,0.0,0.0);

    if(shadeMode == 1.0){
        vec3 dx = dFdx(mvVertex);
        vec3 dy = dFdy(mvVertex);
        vec3 V = -normalize(mvVertex);
        vec3 N = normalize(cross(dx, dy));
        vec3 lightDirection1 = normalize(lightPosition1 - mvVertex);
        vec3 H1 = normalize(lightDirection1+V);
        vec3 lightDirection2 = normalize(lightPosition2 - mvVertex);
        vec3 H2 = normalize(lightDirection2+V);
        vec3 lightDirection3 = normalize(lightPosition3 - mvVertex);
        vec3 H3 = normalize(lightDirection3+V);

        vec3 ambient = lightcolor1 * ka * frontColor +
                        lightcolor2 * ka * frontColor +
                        lightcolor3 * ka * frontColor;

        float cos1 = max(dot(lightDirection1,N),0.0);
        float cos2 = max(dot(lightDirection2,N),0.0);
        float cos3 = max(dot(lightDirection3,N),0.0);
        vec3 diffuse = lightcolor1 * kd * frontColor * cos1 +
                        lightcolor2 * kd * frontColor * cos2 +
                        lightcolor3 * kd * frontColor * cos3;

        float cosAlpha1 = max(dot(N,H1),0.0);
        float cosAlpha2 = max(dot(N,H2),0.0);
        float cosAlpha3 = max(dot(N,H3),0.0);
        vec3 specular = lightcolor1 * ks * pow(cosAlpha1,20.0) +
                        lightcolor2 * ks * pow(cosAlpha2,20.0) +
                        lightcolor3 * ks * pow(cosAlpha3,20.0);

        final_color = ambient + diffuse + specular;
        gl_FragColor = vec4(final_color, 1.0);
    }

    if(shadeMode == 2.0)
        gl_FragColor = fragcolor;

        // phong shading
    if(shadeMode == 3.0){
        vec3 V = -normalize(mvVertex);
        vec3 N = normalize(normal);
        vec3 lightDirection1 = normalize(lightPosition1 - mvVertex);
        vec3 H1 = normalize(lightDirection1+V);
        vec3 lightDirection2 = normalize(lightPosition2 - mvVertex);
        vec3 H2 = normalize(lightDirection2+V);
        vec3 lightDirection3 = normalize(lightPosition3 - mvVertex);
        vec3 H3 = normalize(lightDirection3+V);

        vec3 ambient = lightcolor1 * ka * frontColor +
                        lightcolor2 * ka * frontColor +
                        lightcolor3 * ka * frontColor;

        float cos1 = max(dot(lightDirection1,N),0.0);
        float cos2 = max(dot(lightDirection2,N),0.0);
        float cos3 = max(dot(lightDirection3,N),0.0);
        vec3 diffuse = lightcolor1 * kd * frontColor * cos1 +
                        lightcolor2 * kd * frontColor * cos2 +
                        lightcolor3 * kd * frontColor * cos3;

        float cosAlpha1 = max(dot(N,H1),0.0);
        float cosAlpha2 = max(dot(N,H2),0.0);
        float cosAlpha3 = max(dot(N,H3),0.0);
        vec3 specular = lightcolor1 * ks * pow(cosAlpha1,20.0) +
                        lightcolor2 * ks * pow(cosAlpha2,20.0) +
                        lightcolor3 * ks * pow(cosAlpha3,20.0);

        final_color = ambient + diffuse + specular;
        gl_FragColor = vec4(final_color, 1.0);
    }
    
    if(shadeMode == 4.0){
        vec3 V = -normalize(mvVertex);
        vec3 N = normalize(normal);
        vec3 lightDirection1 = normalize(lightPosition1 - mvVertex);
        vec3 H1 = normalize(lightDirection1+V);
        vec3 lightDirection2 = normalize(lightPosition2 - mvVertex);
        vec3 H2 = normalize(lightDirection2+V);
        vec3 lightDirection3 = normalize(lightPosition3 - mvVertex);
        vec3 H3 = normalize(lightDirection3+V);

        float ambient_intensity = ka;

        float cos1 = max(dot(lightDirection1,N),0.0);
        float cos2 = max(dot(lightDirection2,N),0.0);
        float cos3 = max(dot(lightDirection3,N),0.0);
        float diffuseIntensity1 = kd * cos1;
        float diffuseIntensity2 = kd * cos2;
        float diffuseIntensity3 = kd * cos3;
        vec3 diffuse = lightcolor1 * kd * frontColor * cos1 +
                        lightcolor2 * kd * frontColor * cos2 +
                        lightcolor3 * kd * frontColor * cos3;

        float cosAlpha1 = pow(max(dot(N,H1),0.0), 4.0);
        float cosAlpha2 = pow(max(dot(N,H2),0.0), 4.0);
        float cosAlpha3 = pow(max(dot(N,H3),0.0), 4.0);

        float specularIntensity1 = ks * cosAlpha1;
        float specularIntensity2 = ks * cosAlpha2;
        float specularIntensity3 = ks * cosAlpha3;

        final_color = ceil(ambient_intensity * 4.0) / 4.0 * vec3(frontColor) +
        (
            ceil((diffuseIntensity1 + specularIntensity1) * 4.0) / 4.0 * lightcolor1 +
            ceil((diffuseIntensity2 + specularIntensity2) * 4.0) / 4.0 * lightcolor2 +
            ceil((diffuseIntensity3 + specularIntensity3) * 4.0) / 4.0 * lightcolor3
        ) * vec3(frontColor);
        gl_FragColor = vec4(final_color, 1.0);
    }
}
`