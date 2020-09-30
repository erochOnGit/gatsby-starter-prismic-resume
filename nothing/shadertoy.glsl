precision highp float; 
vec4 get(sampler2D inputTexture, float x,float y){
	vec2 uv = gl_FragCoord.xy/iResolution.xy;
    vec2 oneRes = uv.xy/gl_FragCoord.xy;
    return texture(inputTexture,
      (gl_FragCoord.xy+vec2(x,y))/iResolution.xy).rgba;
  }

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 m = iMouse.xy / iResolution.xy;
    

    float current =(get(iChannel0,-1.,0.).r+
      get(iChannel0,1.,0.).r+
      get(iChannel0,0.,-1.).r+
      get(iChannel0,0.,1.).r)/2.-
      get(iChannel0,0.,0.).g; 	
//float current = 0.;
    vec2 dist = iMouse.zw/iResolution.xy - uv.xy;
    dist.x *= iResolution.x/iResolution.y;
    
    float mouse_pct = 1. - step(0.01, length(dist));

    if(mouse_pct > 0.5){
    	current = 1.;
    }

    if(current < 0.01){
		current = 0.;    
    }
    fragColor = vec4(current,get(iChannel0,0.,0.).r,0.,1.0);
}




void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(texture(iChannel0,uv.xy).rgb,1.0);
}