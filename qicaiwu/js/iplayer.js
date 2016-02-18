
/**
 * !!!!这些代码一定要放在文档末尾，或者$.reay()函数里面
 * 缺少相应的事件API，放弃随机播放功能
 * image player for jquery 
 * 
 * rely on: jquery, jquery.cookie, Diaporama
 * todo: save image, add to collection, share code
 */




;(function($, Diaporama, undefined) {
    "use strict";

    /* 默认配置参数 */
    var defaults = {
            diaporama: {
                loop: true,
                autoplay: true,
                playbackRate: 1.0,
                networkTimeout: 5000
            },
            listCellTpl: '<div class="iplayer-list-cell"><img width="40px" height="40px"></div>',
            autoplay: true,
            shareCode: '',
            minPlaybackRate: 0.2,
            maxPlaybackRate: 5.0,
            showLogo: false,
            maxTransitionTime: 1800,
            minTransitionTime: 1200,
            maxSlideTime: 6000,
            minSlideTime: 4000,
            maxEasing: 0.8,
            minEasing: 0.2,
            minKenburnsRatio: 0.4
        },
        transitions = [
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from,to;uniform float progress;uniform vec2 resolution;uniform float persp;uniform float unzoom;uniform float reflection;uniform float floating;vec2 project(vec2 p){return p*vec2(1.0,-1.2)+vec2(0.0,-floating/100.);}bool inBounds(vec2 p){return all(lessThan(vec2(0.0),p))&&all(lessThan(p,vec2(1.0)));}vec4 bgColor(vec2 p,vec2 pfr,vec2 pto){vec4 c=vec4(0.0,0.0,0.0,1.0);pfr=project(pfr);if(inBounds(pfr)){c+=mix(vec4(0.0),texture2D(from,pfr),reflection*mix(1.0,0.0,pfr.y));}pto=project(pto);if(inBounds(pto)){c+=mix(vec4(0.0),texture2D(to,pto),reflection*mix(1.0,0.0,pto.y));}return c;}vec2 xskew(vec2 p,float persp,float center){float x=mix(p.x,1.0-p.x,center);return ((vec2(x,(p.y-0.5*(1.0-persp)*x)/(1.0+(persp-1.0)*x))-vec2(0.5-distance(center,0.5),0.0))*vec2(0.5/distance(center,0.5)*(center<0.5?1.0:-1.0),1.0)+vec2(center<0.5?0.0:1.0,0.0));}void main(){vec2 op=gl_FragCoord.xy/resolution.xy;float uz=unzoom*2.0*(0.5-distance(0.5,progress));vec2 p=-uz*0.5+(1.0+uz)*op;vec2 fromP=xskew((p-vec2(progress,0.0))/vec2(1.0-progress,1.0),1.0-mix(progress,0.0,persp),0.0);vec2 toP=xskew(p/vec2(progress,1.0),mix(pow(progress,2.0),1.0,persp),1.0);if(inBounds(fromP)){gl_FragColor=texture2D(from,fromP);}else if(inBounds(toP)){gl_FragColor=texture2D(to,toP);}else{gl_FragColor=bgColor(op,fromP,toP);}}",
              "uniforms": {
                "persp": 0.7,
                "unzoom": 0.3,
                "reflection": 0.4,
                "floating": 3
              },
              "name": "cube"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from,to;uniform float progress;uniform vec2 resolution;uniform float strength;const float PI=3.141592653589793;float Linear_ease(in float begin,in float change,in float duration,in float time){return change*time/duration+begin;}float Exponential_easeInOut(in float begin,in float change,in float duration,in float time){if(time==0.0) return begin;else if(time==duration) return begin+change;time=time/(duration/2.0);if(time<1.0) return change/2.0*pow(2.0,10.0*(time-1.0))+begin;return change/2.0*(-pow(2.0,-10.0*(time-1.0))+2.0)+begin;}float Sinusoidal_easeInOut(in float begin,in float change,in float duration,in float time){return -change/2.0*(cos(PI*time/duration)-1.0)+begin;}float random(in vec3 scale,in float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}vec3 crossFade(in vec2 uv,in float dissolve){return mix(texture2D(from,uv).rgb,texture2D(to,uv).rgb,dissolve);}void main(){vec2 texCoord=gl_FragCoord.xy/resolution.xy;vec2 center=vec2(Linear_ease(0.25,0.5,1.0,progress),0.5);float dissolve=Exponential_easeInOut(0.0,1.0,1.0,progress);float strength=Sinusoidal_easeInOut(0.0,strength,0.5,progress);vec3 color=vec3(0.0);float total=0.0;vec2 toCenter=center-texCoord;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);color+=crossFade(texCoord+toCenter*percent*strength,dissolve)*weight;total+=weight;}gl_FragColor=vec4(color/total,1.0);}",
              "uniforms": {
                "strength": 0.4
              },
              "name": "CrossZoom"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from,to;uniform float progress;uniform vec2 resolution;void main(void){vec2 p=gl_FragCoord.xy/resolution.xy;float T=progress;float S0=1.0;float S1=50.0;float S2=1.0;float Half=0.5;float PixelSize=(T<Half)?mix(S0,S1,T/Half):mix(S1,S2,(T-Half)/Half);vec2 D=PixelSize/resolution.xy;vec2 UV=(p+vec2(-0.5))/D;vec2 Coord=clamp(D*(ceil(UV+vec2(-0.5)))+vec2(0.5),vec2(0.0),vec2(1.0));vec4 C0=texture2D(from,Coord);vec4 C1=texture2D(to,Coord);gl_FragColor=mix(C0,C1,T);}",
              "uniforms": {},
              "name": "AdvancedMosaic"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;\nuniform float progress;\nuniform vec2 resolution;\nuniform vec3 color;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;gl_FragColor = mix(texture2D(from, p) + vec4(progress*color, 1.0),texture2D(to, p) + vec4((1.0-progress)*color, 1.0),progress);}",
                "uniforms": {
                    color: [0.9, 0.4, 0.2]
                },
                "name": "burn"
            },
            {
                "glsl": "\n#ifdef GL_ES \nprecision highp float;\n#endif\nuniform sampler2D from;\nuniform sampler2D to;\nuniform float progress;\nuniform vec2 resolution;\nuniform float smoothness;\nuniform bool opening;\nconst vec2 center = vec2(0.5, 0.5);\nconst float SQRT_2 = 1.414213562373;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;float x = opening ? progress : 1.-progress;float m = smoothstep(-smoothness, 0.0, SQRT_2*distance(center, p) - x*(1.+smoothness));gl_FragColor = mix(texture2D(from, p), texture2D(to, p), opening ? 1.-m : m);}",
                "uniforms": {
                    "smoothness": 0.3,
                    "opening": true
                },
                "name": "circleopen"
            },
            {
                "glsl": "\n#ifdef GL_ES \nprecision highp float;\n#endif\nuniform sampler2D from;\nuniform sampler2D to;\nuniform float progress;\nuniform vec2 resolution;\nuniform float smoothness;\nuniform bool opening;\nconst vec2 center = vec2(0.5, 0.5);\nconst float SQRT_2 = 1.414213562373;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;float x = opening ? progress : 1.-progress;float m = smoothstep(-smoothness, 0.0, SQRT_2*distance(center, p) - x*(1.+smoothness));gl_FragColor = mix(texture2D(from, p), texture2D(to, p), opening ? 1.-m : m);}",
                "uniforms": {
                    "smoothness": 0.3,
                    "opening": false
                },
                "name": "circleclose"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;\nuniform float progress;\nuniform vec2 resolution;\nuniform float interpolationPower;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec4 fTex = texture2D(from,p);vec4 tTex = texture2D(to,p);gl_FragColor = mix(distance(fTex,tTex)>progress?fTex:tTex,tTex,pow(progress,interpolationPower));}",
                "uniforms": {
                    "interpolationPower": 5
                },
                "name": "colourDistance"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;\nuniform sampler2D to;\nuniform float progress;\nuniform vec2 resolution;\nconst vec2 center = vec2(0.5, 0.5);float quadraticInOut(float t) {float p = 2.0 * t * t;return t < 0.5 ? p : -p + (4.0 * t) - 1.0;}float rand(vec2 co) {return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;if (progress == 0.0) {gl_FragColor = texture2D(from, p);} else if (progress == 1.0) {gl_FragColor = texture2D(to, p);} else {float x = progress;float dist = distance(center, p);float r = x - min(rand(vec2(p.y, 0.0)), rand(vec2(0.0, p.x)));float m = dist <= r ? 1.0 : 0.0;gl_FragColor = mix(texture2D(from, p), texture2D(to, p), m);}}",
                "uniforms": {},
                "name": "crosshatch"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform float progress;uniform vec2 resolution;uniform sampler2D from;uniform sampler2D to;void main(void){vec2 p = gl_FragCoord.xy / resolution.xy;float T = progress;float S0 = 1.0;float S1 = 50.0;float S2 = 1.0;float Half = 0.5;float PixelSize = ( T < Half ) ? mix( S0, S1, T / Half ) : mix( S1, S2, (T-Half) / Half );vec2 D = PixelSize / resolution.xy;vec2 UV = (gl_FragCoord.xy / resolution.xy);const int NumTaps = 12;vec2 Disk[NumTaps];Disk[0] = vec2(-.326,-.406);Disk[1] = vec2(-.840,-.074);Disk[2] = vec2(-.696, .457);Disk[3] = vec2(-.203, .621);Disk[4] = vec2( .962,-.195);Disk[5] = vec2( .473,-.480);Disk[6] = vec2( .519, .767);Disk[7] = vec2( .185,-.893);Disk[8] = vec2( .507, .064);Disk[9] = vec2( .896, .412);Disk[10] = vec2(-.322,-.933);Disk[11] = vec2(-.792,-.598);vec4 C0 = texture2D( from, UV );vec4 C1 = texture2D( to, UV );for ( int i = 0; i != NumTaps; i++ ){C0 += texture2D( from, Disk[i] * D + UV );C1 += texture2D( to, Disk[i] * D + UV );}C0 /= float(NumTaps+1);C1 /= float(NumTaps+1);gl_FragColor = mix( C0, C1, T );}",
                "uniforms": {},
                "name": "DefocusBlur"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform vec2 direction;uniform float smoothness;const vec2 center=vec2(0.5,0.5);void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 v=normalize(direction);v/=abs(v.x)+abs(v.y);float d=v.x*center.x+v.y*center.y;float m=smoothstep(-smoothness,0.0,v.x*p.x+v.y*p.y-(d-0.5+progress*(1.+smoothness)));gl_FragColor=mix(texture2D(to,p),texture2D(from,p),m);}",
              "uniforms": {
                "direction": [
                  1,
                  -1
                ],
                "smoothness": 0.5
              },
              "name": "directionalwipe"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform vec2 direction;uniform float smoothness;const vec2 center=vec2(0.5,0.5);void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 v=normalize(direction);v/=abs(v.x)+abs(v.y);float d=v.x*center.x+v.y*center.y;float m=smoothstep(-smoothness,0.0,v.x*p.x+v.y*p.y-(d-0.5+progress*(1.+smoothness)));gl_FragColor=mix(texture2D(to,p),texture2D(from,p),m);}",
              "uniforms": {
                "direction": [
                  1,
                  0
                ],
                "smoothness": 0.5
              },
              "name": "directionalwipe 1x0"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform vec2 direction;uniform float smoothness;const vec2 center=vec2(0.5,0.5);void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 v=normalize(direction);v/=abs(v.x)+abs(v.y);float d=v.x*center.x+v.y*center.y;float m=smoothstep(-smoothness,0.0,v.x*p.x+v.y*p.y-(d-0.5+progress*(1.+smoothness)));gl_FragColor=mix(texture2D(to,p),texture2D(from,p),m);}",
              "uniforms": {
                "direction": [
                  1,
                  1
                ],
                "smoothness": 0.5
              },
              "name": "directionalwipe 1x1"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform vec2 direction;uniform float smoothness;const vec2 center=vec2(0.5,0.5);void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 v=normalize(direction);v/=abs(v.x)+abs(v.y);float d=v.x*center.x+v.y*center.y;float m=smoothstep(-smoothness,0.0,v.x*p.x+v.y*p.y-(d-0.5+progress*(1.+smoothness)));gl_FragColor=mix(texture2D(to,p),texture2D(from,p),m);}",
              "uniforms": {
                "direction": [
                  -1,
                  -1
                ],
                "smoothness": 0.5
              },
              "name": "directionalwipe -1x-1"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform vec2 direction;uniform float smoothness;const vec2 center=vec2(0.5,0.5);void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 v=normalize(direction);v/=abs(v.x)+abs(v.y);float d=v.x*center.x+v.y*center.y;float m=smoothstep(-smoothness,0.0,v.x*p.x+v.y*p.y-(d-0.5+progress*(1.+smoothness)));gl_FragColor=mix(texture2D(to,p),texture2D(from,p),m);}",
              "uniforms": {
                "direction": [
                  -1,
                  0
                ],
                "smoothness": 0.5
              },
              "name": "directionalwipe -1x0"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform vec2 direction;uniform float smoothness;const vec2 center=vec2(0.5,0.5);void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 v=normalize(direction);v/=abs(v.x)+abs(v.y);float d=v.x*center.x+v.y*center.y;float m=smoothstep(-smoothness,0.0,v.x*p.x+v.y*p.y-(d-0.5+progress*(1.+smoothness)));gl_FragColor=mix(texture2D(to,p),texture2D(from,p),m);}",
              "uniforms": {
                "direction": [
                  -1,
                  1
                ],
                "smoothness": 0.5
              },
              "name": "directionalwipe -1x1"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\n#define QUALITY 32\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float size;const float GOLDEN_ANGLE = 2.399963229728653;vec4 blur(sampler2D t, vec2 c, float radius) {vec4 sum = vec4(0.0);float q = float(QUALITY);for (int i=0; i<QUALITY; ++i) {float fi = float(i);float a = fi * GOLDEN_ANGLE;float r = sqrt(fi / q) * radius;vec2 p = c + r * vec2(cos(a), sin(a));sum += texture2D(t, p);}return sum / q;}void main(){vec2 p = gl_FragCoord.xy / resolution.xy;float inv = 1.-progress;gl_FragColor = inv*blur(from, p, progress*size) + progress*blur(to, p, inv*size);}",
                "uniforms": {
                    "size": 0.6
                },
                "name": "dispersionblur"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;uniform int barWidth;uniform float amplitude;uniform float noise;uniform float frequency;float rand(int num) {return fract(mod(float(num) * 67123.313, 12.0) * sin(float(num) * 10.3) * cos(float(num)));}float wave(int num) {float fn = float(num) * frequency * 0.1  * float(barWidth);return cos(fn * 0.5) * cos(fn * 0.13) * sin((fn+10.0) * 0.3) / 2.0 + 0.5;}float pos(int num) {return noise == 0.0 ? wave(num) : mix(wave(num), rand(num), noise);}void main() {int bar = int(gl_FragCoord.x) / barWidth;float scale = 1.0 + pos(bar) * amplitude;float phase = progress * scale;float posY = gl_FragCoord.y / resolution.y;vec2 p;vec4 c;if (phase + posY < 1.0) {p = vec2(gl_FragCoord.x, gl_FragCoord.y + mix(0.0, resolution.y, phase)) / resolution.xy;c = texture2D(from, p);} else {p = gl_FragCoord.xy / resolution.xy;c = texture2D(to, p);}gl_FragColor = c;}",
                "uniforms": {
                    "barWidth": 10,
                    "amplitude": 2,
                    "noise": 0.2,
                    "frequency": 1
                },
                "name": "DoomScreenTransition"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float reflection;uniform float perspective;uniform float depth;const vec4 black=vec4(0.0,0.0,0.0,1.0);const vec2 boundMin=vec2(0.0,0.0);const vec2 boundMax=vec2(1.0,1.0);bool inBounds(vec2 p){return all(lessThan(boundMin,p))&&all(lessThan(p,boundMax));}vec2 project(vec2 p){return p*vec2(1.0,-1.2)+vec2(0.0,-0.02);}vec4 bgColor(vec2 p,vec2 pto){vec4 c=black;pto=project(pto);if(inBounds(pto)){c+=mix(black,texture2D(to,pto),reflection*mix(1.0,0.0,pto.y));}return c;}void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 pfr=vec2(-1.),pto=vec2(-1.);float middleSlit=2.0*abs(p.x-0.5)-progress;if(middleSlit>0.0){pfr=p+(p.x>0.5?-1.0:1.0)*vec2(0.5*progress,0.0);float d=1.0/(1.0+perspective*progress*(1.0-middleSlit));pfr.y-=d/2.;pfr.y*=d;pfr.y+=d/2.;}float size=mix(1.0,depth,1.-progress);pto=(p+vec2(-0.5,-0.5))*vec2(size,size)+vec2(0.5,0.5);if(inBounds(pfr)){gl_FragColor=texture2D(from,pfr);}else if(inBounds(pto)){gl_FragColor=texture2D(to,pto);}else{gl_FragColor=bgColor(p,pto);}}",
              "uniforms": {
                "reflection": 0.4,
                "perspective": 0.4,
                "depth": 3
              },
              "name": "doorway"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;vec2 offset(float progress, float x, float theta) {float phase = progress*progress + progress + theta;float shifty = 0.03*progress*cos(10.0*(progress+x));return vec2(0, shifty);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;gl_FragColor = mix(texture2D(from, p + offset(progress, p.x, 0.0)), texture2D(to, p + offset(1.0-progress, p.x, 3.14)), progress);}",
                "uniforms": {},
                "name": "Dreamy"
            },
            
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform vec3 color;uniform float colorPhase; void main() {vec2 p = gl_FragCoord.xy / resolution.xy;gl_FragColor = mix(mix(vec4(color, 1.0), texture2D(from, p), smoothstep(1.0-colorPhase, 0.0, progress)),mix(vec4(color, 1.0), texture2D(to,   p), smoothstep(    colorPhase, 1.0, progress)),progress);}",
                "uniforms": {
                    "color": [0, 0, 0],
                    "colorPhase": 0.4
                },
                "name": "fadecolor"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float grayPhase;vec3 grayscale (vec3 color) {return vec3(0.2126*color.r + 0.7152*color.g + 0.0722*color.b);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec4 fc = texture2D(from, p);vec4 tc = texture2D(to, p);gl_FragColor = mix(mix(vec4(grayscale(fc.rgb), 1.0), texture2D(from, p), smoothstep(1.0-grayPhase, 0.0, progress)),mix(vec4(grayscale(tc.rgb), 1.0), texture2D(to,   p), smoothstep(    grayPhase, 1.0, progress)),progress);}",
                "uniforms": {
                    "grayPhase": 0.3
                },
                "name": "fadegrayscale"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float flashPhase;uniform float flashIntensity;uniform float flashZoomEffect;const vec3 flashColor = vec3(1.0, 0.8, 0.3);const float flashVelocity = 3.0;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec4 fc = texture2D(from, p);vec4 tc = texture2D(to, p);float intensity = mix(1.0, 2.0*distance(p, vec2(0.5, 0.5)), flashZoomEffect) * flashIntensity * pow(smoothstep(flashPhase, 0.0, distance(0.5, progress)), flashVelocity);vec4 c = mix(texture2D(from, p), texture2D(to, p), smoothstep(0.5*(1.0-flashPhase), 0.5*(1.0+flashPhase), progress));c += intensity * vec4(flashColor, 1.0);gl_FragColor = c;}",
                "uniforms": {
                    "flashPhase": 0.3,
                    "flashIntensity": 3,
                    "flashZoomEffect": 0.5
                },
                "name": "flash"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float size;uniform float zoom;uniform float colorSeparation;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;float inv = 1. - progress;vec2 disp = size*vec2(cos(zoom*p.x), sin(zoom*p.y));vec4 texTo = texture2D(to, p + inv*disp);vec4 texFrom = vec4(texture2D(from, p + progress*disp*(1.0 - colorSeparation)).r,texture2D(from, p + progress*disp).g,texture2D(from, p + progress*disp*(1.0 + colorSeparation)).b,1.0);gl_FragColor = texTo*progress + texFrom*inv;}",
                "uniforms": {
                    "size": 0.04,
                    "zoom": 30,
                    "colorSeparation": 0.3
                },
                "name": "flyeye"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec4 a = texture2D(from, (p - vec2(progress, 0.0)) / vec2(1.0-progress, 1.0));vec4 b = texture2D(to, p / vec2(progress, 1.0));gl_FragColor = mix(a, b, step(p.x, progress));}",
                "uniforms": {},
                "name": "Fold"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;highp float random(vec2 co){highp float a = 12.9898;highp float b = 78.233;highp float c = 43758.5453;highp float dt= dot(co.xy ,vec2(a,b));highp float sn= mod(dt,3.14);return fract(sin(sn) * c);}float voronoi( in vec2 x ) {vec2 p = floor( x );vec2 f = fract( x );float res = 8.0;for( float j=-1.; j<=1.; j++ )for( float i=-1.; i<=1.; i++ ) {vec2  b = vec2( i, j );vec2  r = b - f + random( p + b );float d = dot( r, r );res = min( res, d );}return sqrt( res );}vec2 displace(vec4 tex, vec2 texCoord, float dotDepth, float textureDepth, float strength) {float b = voronoi(.003 * texCoord + 2.0);float g = voronoi(0.2 * texCoord);float r = voronoi(texCoord - 1.0);vec4 dt = tex * 1.0;vec4 dis = dt * dotDepth + 1.0 - tex * textureDepth;dis.x = dis.x - 1.0 + textureDepth*dotDepth;dis.y = dis.y - 1.0 + textureDepth*dotDepth;dis.x *= strength;dis.y *= strength;vec2 res_uv = texCoord ;res_uv.x = res_uv.x + dis.x - 0.0;res_uv.y = res_uv.y + dis.y;return res_uv;}float ease1(float t) {return t == 0.0 || t == 1.0? t: t < 0.5? +0.5 * pow(2.0, (20.0 * t) - 10.0): -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;}float ease2(float t) {return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec4 color1 = texture2D(from, p);vec4 color2 = texture2D(to, p);vec2 disp = displace(color1, p, 0.33, 0.7, 1.0-ease1(progress));vec2 disp2 = displace(color2, p, 0.33, 0.5, ease2(progress));vec4 dColor1 = texture2D(to, disp);vec4 dColor2 = texture2D(from, disp2);float val = ease1(progress);vec3 gray = vec3(dot(min(dColor2, dColor1).rgb, vec3(0.299, 0.587, 0.114)));dColor2 = vec4(gray, 1.0);dColor2 *= 2.0;color1 = mix(color1, dColor2, smoothstep(0.0, 0.5, progress));color2 = mix(color2, dColor1, smoothstep(1.0, 0.5, progress));gl_FragColor = mix(color1, color2, val);}",
                "uniforms": {},
                "name": "glitch displace"
            },
            
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;vec3 hsv2rgb(vec3 c) {const vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);}vec3 rgb2hsv(vec3 c) {const vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));float d = q.x - min(q.w, q.y);return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + 0.001)), d / (q.x + 0.001), q.x);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec3 a = rgb2hsv(texture2D(from, p).rgb);vec3 b = rgb2hsv(texture2D(to, p).rgb);vec3 m = mix(a, b, progress);gl_FragColor = vec4(hsv2rgb(m), 1.0);}",
                "uniforms": {},
                "name": "HSVfade"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;uniform float intensity;const int PASSES = 8;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec4 c1 = vec4(0.0), c2 = vec4(0.0);float disp = intensity*(0.5-distance(0.5, progress));for (int xi=0; xi<PASSES; ++xi) {float x = float(xi) / float(PASSES) - 0.5;for (int yi=0; yi<PASSES; ++yi) {float y = float(yi) / float(PASSES) - 0.5;vec2 v = vec2(x,y);float d = disp;c1 += texture2D(from, p + d*v);c2 += texture2D(to, p + d*v);}}c1 /= float(PASSES*PASSES);c2 /= float(PASSES*PASSES);gl_FragColor = mix(c1, c2, progress);}",
                "uniforms": {
                    "intensity": 0.1
                },
                "name": "linearblur"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;const float strength=0.1;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec4 ca = texture2D(from, p);vec4 cb = texture2D(to, p);vec2 oa = (((ca.rg+ca.b)*0.5)*2.0-1.0);vec2 ob = (((cb.rg+cb.b)*0.5)*2.0-1.0);vec2 oc = mix(oa,ob,0.5)*strength;float w0 = progress;float w1 = 1.0-w0;gl_FragColor = mix(texture2D(from, p+oc*w0), texture2D(to, p-oc*w1), progress);}",
                "uniforms": {},
                "name": "morph"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\n#define PI 3.14159265358979323\n#define POW2(X) X*X\n#define POW3(X) X*X*X\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;uniform int endx;uniform int endy;float Rand(vec2 v) {return fract(sin(dot(v.xy ,vec2(12.9898,78.233))) * 43758.5453);}vec2 Rotate(vec2 v, float a) {mat2 rm = mat2(cos(a), -sin(a),sin(a), cos(a));return rm*v;}float CosInterpolation(float x) {return -cos(x*PI)/2.+.5;}void main() {vec2 p = gl_FragCoord.xy / resolution.xy - .5;vec2 rp = p;float rpr = (progress*2.-1.);float z = -(rpr*rpr*2.) + 3.;float az = abs(z);rp *= az;rp += mix(vec2(.5, .5), vec2(float(endx) + .5, float(endy) + .5), POW2(CosInterpolation(progress)));vec2 mrp = mod(rp, 1.);vec2 crp = rp;bool onEnd = int(floor(crp.x))==endx&&int(floor(crp.y))==endy;if(!onEnd) {float ang = float(int(Rand(floor(crp))*4.))*.5*PI;mrp = vec2(.5) + Rotate(mrp-vec2(.5), ang);}if(onEnd || Rand(floor(crp))>.5) {gl_FragColor = texture2D(to, mrp);} else {gl_FragColor = texture2D(from, mrp);}}",
                "uniforms": {
                    "endx": 0,
                    "endy": -1
                },
                "name": "Mosaic"
            },
            
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from,to;uniform float progress;uniform vec2 resolution;const float MIN_AMOUNT=-0.16;const float MAX_AMOUNT=1.3;float amount=progress*(MAX_AMOUNT-MIN_AMOUNT)+MIN_AMOUNT;const float PI=3.141592653589793;const float scale=512.0;const float sharpness=3.0;float cylinderCenter=amount;float cylinderAngle=2.0*PI*amount;const float cylinderRadius=1.0/PI/2.0;vec3 hitPoint(float hitAngle,float yc,vec3 point,mat3 rrotation){float hitPoint=hitAngle/(2.0*PI);point.y=hitPoint;return rrotation*point;}vec4 antiAlias(vec4 color1,vec4 color2,float distanc){distanc*=scale;if(distanc<0.0) return color2;if(distanc>2.0) return color1;float dd=pow(1.0-distanc/2.0,sharpness);return ((color2-color1)*dd)+color1;}float distanceToEdge(vec3 point){float dx=abs(point.x>0.5?1.0-point.x:point.x);float dy=abs(point.y>0.5?1.0-point.y:point.y);if(point.x<0.0) dx=-point.x;if(point.x>1.0) dx=point.x-1.0;if(point.y<0.0) dy=-point.y;if(point.y>1.0) dy=point.y-1.0;if((point.x<0.0||point.x>1.0)&&(point.y<0.0||point.y>1.0)) return sqrt(dx*dx+dy*dy);return min(dx,dy);}vec4 seeThrough(float yc,vec2 p,mat3 rotation,mat3 rrotation){float hitAngle=PI-(acos(yc/cylinderRadius)-cylinderAngle);vec3 point=hitPoint(hitAngle,yc,rotation*vec3(p,1.0),rrotation);if(yc<=0.0&&(point.x<0.0||point.y<0.0||point.x>1.0||point.y>1.0)){vec2 texCoord=gl_FragCoord.xy/resolution.xy;return texture2D(to,texCoord);}if(yc>0.0) return texture2D(from,p);vec4 color=texture2D(from,point.xy);vec4 tcolor=vec4(0.0);return antiAlias(color,tcolor,distanceToEdge(point));}vec4 seeThroughWithShadow(float yc,vec2 p,vec3 point,mat3 rotation,mat3 rrotation){float shadow=distanceToEdge(point)*30.0;shadow=(1.0-shadow)/3.0;if(shadow<0.0) shadow=0.0;else shadow*=amount;vec4 shadowColor=seeThrough(yc,p,rotation,rrotation);shadowColor.r-=shadow;shadowColor.g-=shadow;shadowColor.b-=shadow;return shadowColor;}vec4 backside(float yc,vec3 point){vec4 color=texture2D(from,point.xy);float gray=(color.r+color.b+color.g)/15.0;gray+=(8.0/10.0)*(pow(1.0-abs(yc/cylinderRadius),2.0/10.0)/2.0+(5.0/10.0));color.rgb=vec3(gray);return color;}vec4 behindSurface(float yc,vec3 point,mat3 rrotation){float shado=(1.0-((-cylinderRadius-yc)/amount*7.0))/6.0;shado*=1.0-abs(point.x-0.5);yc=(-cylinderRadius-cylinderRadius-yc);float hitAngle=(acos(yc/cylinderRadius)+cylinderAngle)-PI;point=hitPoint(hitAngle,yc,point,rrotation);if(yc<0.0&&point.x>=0.0&&point.y>=0.0&&point.x<=1.0&&point.y<=1.0&&(hitAngle<PI||amount>0.5)){shado=1.0-(sqrt(pow(point.x-0.5,2.0)+pow(point.y-0.5,2.0))/(71.0/100.0));shado*=pow(-yc/cylinderRadius,3.0);shado*=0.5;}else{shado=0.0;}vec2 texCoord=gl_FragCoord.xy/resolution.xy;return vec4(texture2D(to,texCoord).rgb-shado,1.0);}void main(){vec2 texCoord=gl_FragCoord.xy/resolution.xy;const float angle=30.0*PI/180.0;float c=cos(-angle);float s=sin(-angle);mat3 rotation=mat3(c,s,0,-s,c,0,0.12,0.258,1);c=cos(angle);s=sin(angle);mat3 rrotation=mat3(c,s,0,-s,c,0,0.15,-0.5,1);vec3 point=rotation*vec3(texCoord,1.0);float yc=point.y-cylinderCenter;if(yc<-cylinderRadius){gl_FragColor=behindSurface(yc,point,rrotation);return;}if(yc>cylinderRadius){gl_FragColor=texture2D(from,texCoord);return;}float hitAngle=(acos(yc/cylinderRadius)+cylinderAngle)-PI;float hitAngleMod=mod(hitAngle,2.0*PI);if((hitAngleMod>PI&&amount<0.5)||(hitAngleMod>PI/2.0&&amount<0.0)){gl_FragColor=seeThrough(yc,texCoord,rotation,rrotation);return;}point=hitPoint(hitAngle,yc,point,rrotation);if(point.x<0.0||point.y<0.0||point.x>1.0||point.y>1.0){gl_FragColor=seeThroughWithShadow(yc,texCoord,point,rotation,rrotation);return;}vec4 color=backside(yc,point);vec4 otherColor;if(yc<0.0){float shado=1.0-(sqrt(pow(point.x-0.5,2.0)+pow(point.y-0.5,2.0))/0.71);shado*=pow(-yc/cylinderRadius,3.0);shado*=0.5;otherColor=vec4(0.0,0.0,0.0,shado);}else{otherColor=texture2D(from,texCoord);}color=antiAlias(color,otherColor,cylinderRadius-abs(yc));vec4 cl=seeThroughWithShadow(yc,texCoord,point,rotation,rrotation);float dist=distanceToEdge(point);gl_FragColor=antiAlias(color,cl,dist);}",
              "uniforms": {},
              "name": "PageCurl"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;void main() {  vec2 p = gl_FragCoord.xy / resolution.xy;  float circPos = atan(p.y - 0.5, p.x - 0.5) + progress;  float modPos = mod(circPos, 3.1415 / 4.);  float signed = sign(progress - modPos);  float smoothed = smoothstep(0., 1., signed);if (smoothed > 0.5){gl_FragColor = texture2D(to, p);} else {gl_FragColor = texture2D(from, p);}}",
                "uniforms": {},
                "name": "pinwheel"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform ivec2 size;uniform float smoothness;float rand (vec2 co) {return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;float r = rand(floor(vec2(size) * p));float m = smoothstep(0.0, -smoothness, r - (progress * (1.0 + smoothness)));gl_FragColor = mix(texture2D(from, p), texture2D(to, p), m);}",
                "uniforms": {
                    "size": [10, 10],
                    "smoothness": 0.5
                },
                "name": "randomSquares"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float amplitude;uniform float speed;void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 dir=p-vec2(.5);float dist=length(dir);vec2 offset=dir*(sin(progress*dist*amplitude-progress*speed)+.5)/30.;gl_FragColor=mix(texture2D(from,p+offset),texture2D(to,p),smoothstep(0.2,1.0,progress));}",
              "uniforms": {
                "amplitude": 100,
                "speed": 50
              },
              "name": "ripple"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;uniform float translateX;uniform float translateY;void main() {vec2 texCoord = gl_FragCoord.xy / resolution.xy;float x = progress * translateX;float y = progress * translateY;if (x >= 0.0 && y >= 0.0) {if (texCoord.x >= x && texCoord.y >= y) {gl_FragColor = texture2D(from, texCoord - vec2(x, y));}else {vec2 uv;if (x > 0.0)uv = vec2(x - 1.0, y);else if (y > 0.0)uv = vec2(x, y - 1.0);gl_FragColor = texture2D(to, texCoord - uv);}}else if (x <= 0.0 && y <= 0.0) {if (texCoord.x <= (1.0 + x) && texCoord.y <= (1.0 + y))gl_FragColor = texture2D(from, texCoord - vec2(x, y));else {vec2 uv;if (x < 0.0)uv = vec2(x + 1.0, y);else if (y < 0.0)uv = vec2(x, y + 1.0);gl_FragColor = texture2D(to, texCoord - uv);}}else\ngl_FragColor = vec4(0.0);}",
                "uniforms": {
                    "translateX": 1,
                    "translateY": 0
                },
                "name": "Slide"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;uniform float translateX;uniform float translateY;void main() {vec2 texCoord = gl_FragCoord.xy / resolution.xy;float x = progress * translateX;float y = progress * translateY;if (x >= 0.0 && y >= 0.0) {if (texCoord.x >= x && texCoord.y >= y) {gl_FragColor = texture2D(from, texCoord - vec2(x, y));}else {vec2 uv;if (x > 0.0)uv = vec2(x - 1.0, y);else if (y > 0.0)uv = vec2(x, y - 1.0);gl_FragColor = texture2D(to, texCoord - uv);}}else if (x <= 0.0 && y <= 0.0) {if (texCoord.x <= (1.0 + x) && texCoord.y <= (1.0 + y))gl_FragColor = texture2D(from, texCoord - vec2(x, y));else {vec2 uv;if (x < 0.0)uv = vec2(x + 1.0, y);else if (y < 0.0)uv = vec2(x, y + 1.0);gl_FragColor = texture2D(to, texCoord - uv);}}else\ngl_FragColor = vec4(0.0);}",
                "uniforms": {
                    "translateX": -1,
                    "translateY": 0
                },
                "name": "Slide -1x0"
            },
            {
                "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;uniform ivec2 squares;uniform vec2 direction;uniform float smoothness;const vec2 center = vec2(0.5, 0.5);void main() {vec2 p = gl_FragCoord.xy / resolution.xy;vec2 v = normalize(direction);if (v != vec2(0.0))v /= abs(v.x)+abs(v.y);float d = v.x * center.x + v.y * center.y;float offset = smoothness;float pr = smoothstep(-offset, 0.0, v.x * p.x + v.y * p.y - (d-0.5+progress*(1.+offset)));vec2 squarep = fract(p*vec2(squares));vec2 squaremin = vec2(pr/2.0);vec2 squaremax = vec2(1.0 - pr/2.0);float a = all(lessThan(squaremin, squarep)) && all(lessThan(squarep, squaremax)) ? 1.0 : 0.0;gl_FragColor = mix(texture2D(from, p), texture2D(to, p), a);}",
                "uniforms": {
                    "squares": [10, 10],
                    "direction": [1, -0.5],
                    "smoothness": 1.6
                },
                "name": "squareswipe"
            },
            {
                "glsl": "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float colorSeparation;float progressY (float y) {return 0.5 + (y-0.5) / (1.0-progress);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;float y = progressY(p.y);if (y < 0.0 || y > 1.0) {gl_FragColor = texture2D(to, p);}else {vec2 fp = vec2(p.x, y);vec3 c = vec3(texture2D(from, fp - progress*vec2(0.0, colorSeparation)).r,texture2D(from, fp).g,texture2D(from, fp + progress*vec2(0.0, colorSeparation)).b);gl_FragColor = vec4(c, 1.0);}}",
                "uniforms": {
                    "colorSeparation": 0.02
                },
                "name": "squeeze"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float reflection;uniform float perspective;uniform float depth;const vec4 black=vec4(0.0,0.0,0.0,1.0);const vec2 boundMin=vec2(0.0,0.0);const vec2 boundMax=vec2(1.0,1.0);bool inBounds(vec2 p){return all(lessThan(boundMin,p))&&all(lessThan(p,boundMax));}vec2 project(vec2 p){return p*vec2(1.0,-1.2)+vec2(0.0,-0.02);}vec4 bgColor(vec2 p,vec2 pfr,vec2 pto){vec4 c=black;pfr=project(pfr);if(inBounds(pfr)){c+=mix(black,texture2D(from,pfr),reflection*mix(1.0,0.0,pfr.y));}pto=project(pto);if(inBounds(pto)){c+=mix(black,texture2D(to,pto),reflection*mix(1.0,0.0,pto.y));}return c;}void main(){vec2 p=gl_FragCoord.xy/resolution.xy;vec2 pfr,pto=vec2(-1.);float size=mix(1.0,depth,progress);float persp=perspective*progress;pfr=(p+vec2(-0.0,-0.5))*vec2(size/(1.0-perspective*progress),size/(1.0-size*persp*p.x))+vec2(0.0,0.5);size=mix(1.0,depth,1.-progress);persp=perspective*(1.-progress);pto=(p+vec2(-1.0,-0.5))*vec2(size/(1.0-perspective*(1.0-progress)),size/(1.0-size*persp*(0.5-p.x)))+vec2(1.0,0.5);bool fromOver=progress<0.5;if(fromOver){if(inBounds(pfr)){gl_FragColor=texture2D(from,pfr);}else if(inBounds(pto)){gl_FragColor=texture2D(to,pto);}else{gl_FragColor=bgColor(p,pfr,pto);}}else{if(inBounds(pto)){gl_FragColor=texture2D(to,pto);}else if(inBounds(pfr)){gl_FragColor=texture2D(from,pfr);}else{gl_FragColor=bgColor(p,pfr,pto);}}}",
              "uniforms": {
                "reflection": 0.4,
                "perspective": 0.2,
                "depth": 3
              },
              "name": "swap"
            },
            {
                "glsl": "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;void main() {vec2 p = gl_FragCoord.xy / resolution.xy;gl_FragColor = mix(texture2D(from, p), texture2D(to, p), progress);}",
                "uniforms": {},
                "name": "test"
            },
            {
                "glsl": "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from, to;uniform float progress;uniform vec2 resolution;uniform vec2 tileSize;uniform float checkerDistance;uniform bool flipX;uniform bool flipY;uniform bool preTileSingleColor;uniform bool postTileSingleColor;vec2 tile2Global(vec2 tex, vec2 tileNum, bool tileSingleColor) {vec2 perTile = tileSize / resolution.xy;return tileNum * perTile + (tileSingleColor ? vec2(0) : tex*perTile);}void main(void){vec2 uv = gl_FragCoord.xy / resolution.xy;vec4 fragColor = vec4(1, 1, 0, 1);vec2 posInTile = mod(vec2(gl_FragCoord), tileSize);vec2 tileNum = floor(vec2(gl_FragCoord)/ tileSize);int num = int(tileNum.x);vec2 totalTiles = ceil(resolution.xy / tileSize);float countTiles = totalTiles.x * totalTiles.y;vec2 perTile = ceil(tileSize / resolution.xy);float offset = 0.0;offset = (tileNum.y + tileNum.x * perTile.y) / (sqrt(countTiles) * 2.0);float timeOffset = (progress - offset) * countTiles;timeOffset = clamp(timeOffset, 0.0, 0.5);float sinTime = 1.0 - abs(cos(fract(timeOffset) * 3.1415926));fragColor.rg = uv;fragColor.b = sinTime;vec2 texC = posInTile / tileSize;if (sinTime <= 0.5){if (flipX) {if ((texC.x < sinTime) || (texC.x > 1.0 - sinTime)){discard;}if (texC.x < 0.5) {texC.x = (texC.x - sinTime) * 0.5 / (0.5 - sinTime);} else {texC.x = (texC.x - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;}}if (flipY) {if ((texC.y < sinTime) || (texC.y > 1.0 - sinTime)){discard;}if (texC.y < 0.5) {texC.y = (texC.y - sinTime) * 0.5 / (0.5 - sinTime);} else {texC.y = (texC.y - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;}}fragColor = texture2D(from, tile2Global(texC, tileNum, preTileSingleColor));} else {if (flipX) {if ((texC.x > sinTime) || (texC.x < 1.0 - sinTime)){discard;}if (texC.x < 0.5) {texC.x = (texC.x - sinTime) * 0.5 / (0.5 - sinTime);} else {texC.x = (texC.x - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;}texC.x = 1.0 - texC.x;}if (flipY) {if ((texC.y > sinTime) || (texC.y < 1.0 - sinTime)){discard;}if (texC.y < 0.5) {texC.y = (texC.y - sinTime) * 0.5 / (0.5 - sinTime);} else {texC.y = (texC.y - 0.5) * 0.5 / (0.5 - sinTime) + 0.5;}texC.y = 1.0 - texC.y;}fragColor.rgb = texture2D(to, tile2Global(texC, tileNum, postTileSingleColor)).rgb;}gl_FragColor = fragColor;}",
                "uniforms": {
                    "tileSize": [64, 64], 
                    "checkerDistance": 0,
                    "flipX": false,
                    "flipY": false,
                    "preTileSingleColor": false,
                    "postTileSingleColor": false
                },
                "name": "TilesWaveBottomLeftToTopRight"
            },
            {
              "glsl": "\n#ifdef GL_ES\nprecision highp float;\n#endif\n\n#define \tM_PI   3.14159265358979323846\t\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float smoothness;const vec2 center=vec2(0.5,0.5);float quadraticInOut(float t){float p=2.0*t*t;return t<0.5?p:-p+(4.0*t)-1.0;}float linearInterp(vec2 range,vec2 domain,float x){return mix(range.x,range.y,smoothstep(domain.x,domain.y,clamp(x,domain.x,domain.y)));}float getGradient(float r,float dist){float grad=smoothstep(-smoothness,0.0,r-dist*(1.0+smoothness));if(r-dist<0.005&&r-dist>-0.005){return -1.0;}else if(r-dist<0.01&&r-dist>-0.005){return -2.0;}return grad;}float round(float a){return floor(a+0.5);}float getWave(vec2 p){vec2 _p=p-center;float rads=atan(_p.y,_p.x);float degs=degrees(rads)+180.0;vec2 range=vec2(0.0,M_PI*30.0);vec2 domain=vec2(0.0,360.0);float ratio=(M_PI*30.0)/360.0;degs=degs*ratio;float x=progress;float magnitude=mix(0.02,0.09,smoothstep(0.0,1.0,x));float offset=mix(40.0,30.0,smoothstep(0.0,1.0,x));float ease_degs=quadraticInOut(sin(degs));float deg_wave_pos=(ease_degs*magnitude)*sin(x*offset);return x+deg_wave_pos;}void main(){vec2 p=gl_FragCoord.xy/resolution.xy;if(progress==0.0){gl_FragColor=texture2D(from,p);}else if(progress==1.0){gl_FragColor=texture2D(to,p);}else{float dist=distance(center,p);float m=getGradient(getWave(p),dist);if(m==-2.0){gl_FragColor=mix(texture2D(from,p),vec4(0.0,0.0,0.0,1.0),0.75);}else{gl_FragColor=mix(texture2D(from,p),texture2D(to,p),m);}}}",
              "uniforms": {
                "smoothness": 0.02
              },
              "name": "undulating burn out"
            },
            {
                "glsl": "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D from;uniform sampler2D to;uniform float progress;uniform vec2 resolution;uniform float size;float rand (vec2 co) {return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}void main() {vec2 p = gl_FragCoord.xy / resolution.xy;float r = rand(vec2(0, p.y));float m = smoothstep(0.0, -size, p.x*(1.0-size) + size*r - (progress * (1.0 + size)));gl_FragColor = mix(texture2D(from, p), texture2D(to, p), m);}",
                "uniforms": {
                    "size": 0.2
                },
                "name": "wind"
            }
        ];

    var hideCursorProperties = {
            cursor: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAATSURBVHjaYvj//z8DAAAA//8DAAj8Av7TpXVhAAAAAElFTkSuQmCC) 25 25, no-drop'
        },
        showCursorProperties = {
            cursor: 'pointer'
        };

    var loadingGifSrc = './image/loading2-32.gif',
        ajaxLikeImageUrl = app.url.like_submit,
        ajaxUnlikeImageUrl = app.url.like_submit;


    function encodedIds(data) {
        var i = 0, 
            il = data.length, 
            ids = '';
        for (; i < il; i++) {
            ids += data[i].id + ',';
        }
        ids = ids.slice(0, -1);
        return encodeURIComponent(ids);
    }
    /**
     * data示例
     * [
     *     {
     *         "id": ,
     *         "width": ,
     *         "height": ,
     *         "imageSrc": ,
     *         "title": , "tilteSrc": ,
     *         "author": , "authorSrc": ,
     *         "thumbnailSrc": ,
     *         "liked": ,
     *     },
     *     {}
     * ]
     *
     */
    function iPlayer(data, options) {
        var self = this,
            options = options || {};
        self.options = $.extend(true, {}, defaults, options);
        self.state = {
            "fullscreen": !1,
            "listShowing": !1/*,
             0: order, 1: random 
            "playMode": 0*/
        };
        //没有使用cookie的这个必要
        self.state.playbackRate = /*$.cookie("iPlayerPlaybackRate") ||*/ 1.0;
        self.state.displayTransitions = /*$.cookie("iPlayerDisplayTransitions") ||*/ true;
        self.originTimelineData = $.extend([], data);//copy
        self.diaporamaData = {};
        self.diaporamaData.generator = {
            version: "0.2.2",
            url: "https://github.com/gre/diaporama-maker"
        };
        self.diaporamaData.transitions = transitions;
        
        self.fullscreen = self._fullscreen();
        self.storage = self._storage();
        self.browser = self._browserSniff();
        self.itemsCount = self.originTimelineData.length;//图片总数
        self.currentIndex = 0;//当前图片索引
        self._hideTimer = null;//隐藏定时器，用于隐藏控制面板

        self._init();
    }

    iPlayer.prototype = {
        constructor: iPlayer,

        /**
         * 获取timeline数据
         * @param Object originData
         * @param Number containerWidth
         * @param Number containerHeight
         * @param bool displayTransitions 是否使用特效
         */
        getDiaporamaTimelineData: function(originData, containerWidth, containerHeight, displayTransitions) {
            var self = this,
                timelineData = [],
                obj = {},
                WWRatio, 
                HHRatio, 
                kenburnsFirstRatio, //kenburns第一个比率(一共两个，另一个是 1 )
                /* 0: to = 1, 1: from = 1 */
                kenburnsType,
                kenburnsFromRatio,
                kenburnsToRatio,
                transitionsLength = transitions.length,
                maxTransitionTime = self.options.maxTransitionTime,
                minTransitionTime = self.options.minTransitionTime,
                maxSlideTime = self.options.maxSlideTime,
                minSlideTime = self.options.minSlideTime,
                transitionGap = maxTransitionTime - minTransitionTime,
                slideGap = maxSlideTime - minSlideTime,
                maxEasing = self.options.maxEasing,
                minEasing = self.options.minEasing,
                easingGap = maxEasing - minEasing,
                minKenburnsRatio = self.options.minKenburnsRatio;

            if (typeof(displayTransitions) === "undefined") displayTransitions = true;

            for (var i = 0, len = originData.length; i < len; i++) {
                WWRatio = containerWidth / originData[i].width;
                HHRatio = containerHeight / originData[i].height;
                kenburnsFirstRatio = Math.max(Math.min(Math.max(WWRatio, HHRatio), 0.9), minKenburnsRatio);//0.9代替1
                kenburnsType = Math.floor(Math.random() * 2);
                !kenburnsType ? (kenburnsFromRatio = kenburnsFirstRatio, kenburnsToRatio = 1) : (kenburnsFromRatio = 1, kenburnsToRatio = kenburnsFirstRatio);
                obj.kenburns = {
                    "easing": [
                        minEasing + (Math.random() * easingGap),
                        minEasing + (Math.random() * easingGap),
                        minEasing + (Math.random() * easingGap),
                        minEasing + (Math.random() * easingGap)
                    ],//0.2-0.8
                    "from": [
                        kenburnsFromRatio,
                        [Math.random(), Math.random()]
                    ],
                    "to": [
                        kenburnsToRatio,
                        [Math.random(), Math.random()]
                    ]
                };
                obj.image = originData[i].imageSrc;
                obj.duration = minSlideTime + Math.floor(Math.random() * slideGap);//4000-6000
                if (displayTransitions) {
                    obj.transitionNext = {
                        "name": transitions[Math.floor(Math.random() * transitionsLength)].name,//Math.floor(Math.random() * transitionsLength)
                        "duration": minTransitionTime + Math.floor(Math.random() * transitionGap)//1200-1800
                    };
                }
                timelineData.push(obj);
                obj = {};
            }
            return timelineData;
        },

        // Fullscreen API
        _fullscreen: function() {
            var fullscreen = {
                    supportsFullScreen: false,
                    isFullScreen: function() { return false; },
                    requestFullScreen: function() {},
                    cancelFullScreen: function() {},
                    fullScreenEventName: "",
                    element: null,
                    prefix: ""
                },
                browserPrefixes = "webkit moz o ms khtml".split(" ");

            // check for native support
            if (typeof document.cancelFullScreen != "undefined") {
                fullscreen.supportsFullScreen = true;
            }
            else {
                // check for fullscreen support by vendor prefix
                for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
                    fullscreen.prefix = browserPrefixes[i];

                    if (typeof document[fullscreen.prefix + "CancelFullScreen"] != "undefined") {
                        fullscreen.supportsFullScreen = true;
                        break;
                    }
                    // Special case for MS (when isn't it?)
                    else if (typeof document.msExitFullscreen != "undefined" && document.msFullscreenEnabled) {
                        fullscreen.prefix = "ms";
                        fullscreen.supportsFullScreen = true;
                        break;
                    }
                }
            }

            // Safari doesn't support the ALLOW_KEYBOARD_INPUT flag (for security) so set it to not supported
            // https://bugs.webkit.org/show_bug.cgi?id=121496
            if(fullscreen.prefix === "webkit" && !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
                 fullscreen.supportsFullScreen = false;
            }

            // Update methods to do something useful
            if (fullscreen.supportsFullScreen) {
                // Yet again Microsoft awesomeness, 
                // Sometimes the prefix is "ms", sometimes "MS" to keep you on your toes
                fullscreen.fullScreenEventName = (fullscreen.prefix == "ms" ? "MSFullscreenChange" : fullscreen.prefix + "fullscreenchange");

                fullscreen.isFullScreen = function(element) {
                    if(typeof element == "undefined") {
                        element = document;
                    }

                    switch (this.prefix) {
                        case "":
                            return document.fullscreenElement == element;
                        case "moz":
                            return document.mozFullScreenElement == element;
                        default:
                            return document[this.prefix + "FullscreenElement"] == element;
                    }
                };
                fullscreen.requestFullScreen = function(element) {
                    return (this.prefix === "") ? element.requestFullScreen() : element[this.prefix + (this.prefix == "ms" ? "RequestFullscreen" : "RequestFullScreen")](this.prefix === "webkit" ? element.ALLOW_KEYBOARD_INPUT : null);
                };
                fullscreen.cancelFullScreen = function() {
                    return (this.prefix === "") ? document.cancelFullScreen() : document[this.prefix + (this.prefix == "ms" ? "ExitFullscreen" : "CancelFullScreen")]();
                };
                fullscreen.element = function() { 
                    return (this.prefix === "") ? document.fullscreenElement : document[this.prefix + "FullscreenElement"];
                };
            }

            return fullscreen;
        },

        // Local storage
        _storage: function() {
            var storage = {
                supported: (function() {
                    try {
                        return "localStorage" in window && window.localStorage !== null;
                    } 
                    catch(e) {
                        return false;
                    }
                })()
            }
            return storage;
        },

        // Credits: http://paypal.github.io/accessible-html5-video-player/
        // Unfortunately, due to mixed support, UA sniffing is required
        _browserSniff: function() {
            var nAgt = navigator.userAgent,
                name = navigator.appName,
                fullVersion = "" + parseFloat(navigator.appVersion),
                majorVersion = parseInt(navigator.appVersion, 10),
                nameOffset,
                verOffset,
                ix;

            // MSIE 11
            if ((navigator.appVersion.indexOf("Windows NT") !== -1) && (navigator.appVersion.indexOf("rv:11") !== -1)) {
                name = "IE";
                fullVersion = "11;";
            }
            // MSIE
            else if ((verOffset=nAgt.indexOf("MSIE")) !== -1) {
                name = "IE";
                fullVersion = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if ((verOffset=nAgt.indexOf("Chrome")) !== -1) {
                name = "Chrome";
                fullVersion = nAgt.substring(verOffset + 7);
            }
            // Safari
            else if ((verOffset=nAgt.indexOf("Safari")) !== -1) {
                name = "Safari";
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset=nAgt.indexOf("Version")) !== -1) {
                    fullVersion = nAgt.substring(verOffset + 8);
                }
            }
            // Firefox
            else if ((verOffset=nAgt.indexOf("Firefox")) !== -1) {
                name = "Firefox";
                fullVersion = nAgt.substring(verOffset + 8);
            }
            // In most other browsers, "name/version" is at the end of userAgent 
            else if ((nameOffset=nAgt.lastIndexOf(" ") + 1) < (verOffset=nAgt.lastIndexOf("/"))) {
                name = nAgt.substring(nameOffset,verOffset);
                fullVersion = nAgt.substring(verOffset + 1);

                if (name.toLowerCase() == name.toUpperCase()) {
                    name = navigator.appName;
                }
            }
            // Trim the fullVersion string at semicolon/space if present
            if ((ix = fullVersion.indexOf(";")) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }
            if ((ix = fullVersion.indexOf(" ")) !== -1) {
                fullVersion = fullVersion.substring(0, ix);
            }
            // Get major version
            majorVersion = parseInt("" + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = "" + parseFloat(navigator.appVersion); 
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            // Return data
            return {
                name:       name, 
                version:    majorVersion, 
                ios:        /(iPad|iPhone|iPod)/g.test(navigator.platform)
            };
        },

        



        _init: function() {
            var self = this;
            self._initView();//初始化视图
            self._initContainer();//初始化容器
            self._initDiaporama();//初始化diaporama
            self._initInfoComponent();//初始化信息组件
            self._initRateComponent();//初始化速率组件
            self._initList();//初始化列表
            self._initActions();//初始化播放器操作
            self._initButtons();//初始化按钮
            self._initImageActions();//初始化图片操作 @todo
            self._addKeyboardEvent();
            self.$clickSection.on('click', function(event) {
                self._onClickPlayBtn(event)
            });
            self.$iplayer.on('mousemove.iplayer', function(event) {
                self._onMousemove(event)
            });
            //self._hideTimer = setTimeout(self._hideControlPanel, 4000);
            if (!self.options.diaporama.autoplay) {
                self.$playBtn.addClass('icon-iplayer-play'),
                self.$playBtn.removeClass('icon-iplayer-pause')
            }
        },

        
        
        _initView: function() {
            var self = this;
            self._initViewContainer();
            self._initViewInfo();
            self._initViewRate();
            self._initViewActions();
            self._initViewList();
        },
        _initViewContainer: function() {
            if (!$('#iplayer').length) $('body').append('<div id="iplayer"></div>');
            var self = this,
                tplStr = [
                '<div id="diaporama"></div>',
                '<div id="iplayer-handle">',
                    '<div id="iplayer-click-section"></div>',
                    '<a class="iplayer-close-btn" id="js-iplayer-close-btn"><span>X</span></a>',
                    '<a class="iplayer-prev-btn icon-iplayer icon-iplayer-prev-large" id="js-iplayer-prev-btn"></a>',
                    '<a class="iplayer-next-btn icon-iplayer icon-iplayer-next-large" id="js-iplayer-next-btn"></a>',
                    '<img id="iplayer-loading" src="' + loadingGifSrc + '" style="display: none;">',
                    '<div id="iplayer-share-code-section">',
                        '<textarea class="form-control" rows="3" id="js-iplayer-share-code-input"></textarea>',
                        /*'<a class="btn btn-success btn-sm" id="js-iplayer-share-code-copy" style="margin-top: 10px; float: right;">复制</a>',*/
                    '</div>'
                ];
            if (self.options.showLogo) tplStr.push('<a id="iplayer-logo" href="/" target="_blank"></a>');
            tplStr.push(
                    '<div id="iplayer-bottom">',
                        '<div id="iplayer-bottom-wrap"></div>',
                        '<div class="iplayer-progress">',
                            '<div class="iplayer-progress-inner" id="js-iplayer-progress">',
                                '<div class="iplayer-progress-playing" style="width: 0%;"></div>',
                            '</div>',
                            '<div class="iplayer-progress-panel" id="js-iplayer-panel">',
                                '<a class="iplayer-dot icon-iplayer icon-iplayer-dot-large" id="js-iplayer-dot" style="left: 0%;"></a>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            );
            $('#iplayer').html(tplStr.join(''));
        },
        _initViewInfo: function() {
            var self = this,
                tplStr = [
                '<div class="iplayer-controls">',
                    '<a id="js-iplayer-play-btn" class="iplayer-play-btn icon-iplayer icon-iplayer-pause"></a>',
                '</div>',
                '<div class="iplayer-info">',
                    '<div class="iplayer-length">',
                        '<span class="iplayer-position" id="js-iplayer-position-num">1</span>/<span class="iplayer-duration" id="js-iplayer-duration-num">{{itemsCount}}</span>',
                    '</div>',
                    '<div class="iplayer-image">',
                        '<div id="js-iplayer-image-info" class="iplayer-image-info">',
                            '<a id="js-iplayer-image-title" href="{{titleSrc}}" title="{{title}}" target="_blank">{{title}}</a>',
                            '-',
                            '<a id="js-iplayer-image-author" href="{{authorSrc}}" title="{{author}}" target="_blank">{{author}}</a>',
                        '</div>',
                    '</div>',
                    '<div class="iplayer-image-controls">',
                        '<a id="js-iplayer-like-btn" class="icon-iplayer icon-iplayer-like {{likeActiveClass}}" data-image-id="{{imageId}}" title="收藏"></a>',
                    '</div>',
                '</div>'
            ].join('');
            tplStr = tplStr.replace(/\{\{title\}\}/g, self.originTimelineData[0].title).replace(/\{\{titleSrc\}\}/g, self.originTimelineData[0].titleSrc).replace(/\{\{author\}\}/g, self.originTimelineData[0].author).replace(/\{\{authorSrc\}\}/g, self.originTimelineData[0].authorSrc).replace(/\{\{imageId\}\}/g, self.originTimelineData[0].id).replace(/\{\{itemsCount\}\}/g, self.originTimelineData.length);
            if (self.originTimelineData[0].liked) tplStr = tplStr.replace(/\{\{likeActiveClass\}\}/g, 'active');
            else tplStr = tplStr.replace(/\{\{likeActiveClass\}\}/g, '');
            $('#iplayer-bottom-wrap').html(tplStr);
        },
        _initViewRate: function() {
            var self = this,
                tplStr = [
                '<div class="iplayer-rate">',
                    
                    '<div id="iplayer-rate-info">',
                        '<div class="iplayer-rate-wrap" id="js-iplayer-rate-range">',
                            '<div id="iplayer-rate-value">',
                                '<span>1.0</span>',
                            '</div>',
                            '<div class="iplayer-rate-panel">',
                                '<div class="iplayer-rate-image" id="iplayer-rate-bar" style="width: 50%;">',
                                '</div>',
                            '</div>',
                            '<div class="iplayer-rate-control">',
                                '<a class="iplayer-rate-dot icon-iplayer icon-iplayer-dot" style="left: 50%;">',
                                '</a>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');
            //tplStr = tplStr.replace(/\{\{minRate\}\}/g, self.options.minPlaybackRate).replace(/\{\{maxRate\}\}/g, self.options.maxPlaybackRate);
            $('#iplayer-bottom-wrap').append(tplStr);
        },
        _initViewActions: function() {
            var tplStr = [
                '<div class="iplayer-actions">',
                    '<a title="全屏播放" id="js-iplayer-fullscreen" class="iplayer-fullscreen icon-iplayer icon-iplayer-fullscreen"></a>',
                    '<a title="显示播放列表" id="js-iplayer-show-list" class="iplayer-show-list icon-iplayer icon-iplayer-show-list"></a>',
                    '<a title="取消特效" id="js-iplayer-display-transitions" class="iplayer-display-transitions icon-iplayer icon-iplayer-display-transitions active"></a>',
                    '<a title="分享播放器代码" id="js-iplayer-share-code" class="iplayer-share-code icon-iplayer icon-iplayer-share"></a>',
                '</div>'
            ].join('');
            $('#iplayer-bottom-wrap').append(tplStr);
        },
        //注：去掉了下数第三行  style="display: none;" ,初始化时获取不到容器宽度
        _initViewList: function() {
            var tplStr = [
                '<div id="iplayer-list" >',
                    '<a class="iplayer-list-prev-btn icon-iplayer icon-iplayer-prev-medium" id="js-iplayer-list-prev-btn"></a>',
                    '<a class="iplayer-list-next-btn icon-iplayer icon-iplayer-next-medium" id="js-iplayer-list-next-btn"></a>',
                    '<div class="iplayer-list-content" id="js-iplayer-list-content">',
                        '<div class="iplayer-list-inner" id="js-iplayer-list-inner">',
                            '<div class="iplayer-list-container" id="js-iplayer-list-container"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join('');
            $('#iplayer-bottom').append(tplStr);
        },
        

        _initContainer: function() {
            var self = this;
            /* 去掉滚动条 */
            $(document.body).css({"overflow": "hidden"});
            self.$iplayer = $('#iplayer');
            self.$list = $('#iplayer-list');
            self.$diaporama = $('#diaporama');
            self.$handle = $('#iplayer-handle');
            self.$clickSection = $('#iplayer-click-section');
            self.$bottom = $('#iplayer-bottom');
            self.$loading = $('#iplayer-loading');
            self.$logo = $('#iplayer-logo');

        },


        _initDiaporama: function() {
            var self = this,
                div = document.getElementById("diaporama"),
                $win = $(window),
                winWidth = $win.width(),
                winHeight = $win.height();
    
            self.playByNoDiaporama = !1;//是否不由diaporama内核产生，用于去掉特效后的页面更新。去掉特效后不能监听transition事件，只能监听slide事件
            self.diaporamaData.timeline = self.getDiaporamaTimelineData(self.originTimelineData, winWidth, winHeight, self.state.displayTransitions);
            self.transitionTimelineData = self.diaporamaData.timeline;
            self.diaporama = Diaporama(div, self.diaporamaData, self.options.diaporama);
            self._addDiaporamaEvent();
        },
        
        
        /**  
         * diaporama事件监听
         */
        _addDiaporamaEvent: function() {
            var self = this;
            $(window).on("resize.iplayer", function(event) {
                self._onWindowResize(event);
            });
            self._onWindowResize();
            //start play
            self.diaporama.addListener('transition', function(event) {
                //self._hideLoading(event);
                self._onDiaporamaTransition(event);
            });
            /*loading image
            self.diaporama.addListener('progress', function(event) {
                self._showLoading(event);
            });*/
            //one image completed
            self.diaporama.addListener('slide', function(event) {
                self._onDiaporamaSlide(event);
            });
        },
        _removeDiaporamaEvent: function() {
            var self = this;
            $(window).off("resize.iplayer");
            self.diaporama.removeListener('transition');
            //self.diaporama.removeListener('progress');
            self.diaporama.removeListener('slide');
        },
        _onWindowResize: function() {
            var self = this,
                w = window.innerWidth,
                h = window.innerHeight,
                threshold = 1024 * 512;
            self.diaporama.width = w;
            self.diaporama.height = h;

            self.diaporama.resolution = Math.min(window.devicePixelRatio||1, Math.ceil((threshold) / (w * h))); 
        },
        _onDiaporamaTransition: function(event) {
            var self = this;
            //
            if (!self.playByNoDiaporama) {
                //self.currentIndex不在这里更新
                self._updatePlayPosition(self.currentIndex + 1);
            }
            self.playByNoDiaporama = !1;
        },
        _onDiaporamaSlide: function(event) {
            var self = this;
            
            if (!self.state.displayTransitions /*&& self.state.playMode === 0*/ && !self.playByNoDiaporama) {
                self._updatePlayPosition(self.currentIndex + 1);
            }
            /*random play
            else if (self.state.playMode === 1) {
                self.nextRandom();
            }*/
            self.playByNoDiaporama = !1;
        },
        
        _showLoading: function() {
            var self = this;
            self.$loading.show();
        },
        _hideLoading: function() {
            var self = this;
            self.$loading.hide();
        },

        
        //progress bar
        _initInfoComponent: function() {
            var self/*a*/ = this;
            self.$infoTitle = $('#js-iplayer-image-title'),
            self.$infoAuthor = $('#js-iplayer-image-author'),
            self.$positionNum = $('#js-iplayer-position-num'),//当前播放时间
            self.$durationNum = $('#js-iplayer-duration-num'),//总播放时间
            self.$infoProgress = $('#js-iplayer-progress'),//进度
            self.$infoPanel = $('#js-iplayer-panel'),//播放器控制板
            self.$infoSlider = $("#js-iplayer-dot"),//播放控制滑块
            self.$infoPlaying = self.$infoProgress.find(".iplayer-progress-playing"),//正在播放节点
            self.infoMouseOffset = null,//鼠标位移
            self.infoSliderDragging = !1,//正在拖拽滑块
            self.positionValue = 0,//位置(百分比),用来记录事件中的比率
            self._addInfoEvent()
        },
        
        //添加事件监听
        _addInfoEvent: function() {
            var self/*a*/ = this;
            //鼠标按下（滑块）
            self.$infoSlider.on("mousedown", function(event) {
                self._infoSliderMouseDown(event);
            }),
            //点击控制板
            self.$infoPanel.on("click", function(event) {
                event.target == event.currentTarget && self._infoPanelMouseClick(event);
            }),
            //鼠标弹起
            $(document).on("mouseup.iplayer", function(event) {
                self.infoSliderDragging && self._infoMouseUp(event);
            }),
            //鼠标滑动
            $(document).on("mousemove.iplayer", function(event) {
                self.infoSliderDragging && self._infoMouseDrag(event);
            })
        },
        _removeInfoEvent: function() {
            var self/*a*/ = this;
            self.$infoSlider.off("mousedown"),
            self.$infoPanel.off("click"),
            $(document).off("mouseup.iplayer"),
            $(document).off("mousemove.iplayer")
        },
        
        //鼠标按下 
        _infoSliderMouseDown: function(event/*a*/) {
            var self/*b*/ = this;
            return self.infoSliderDragging = true, 
                self.infoMouseOffset = {left: event.offsetX || event.pageX - self.$infoSlider.offset().left},
                !1
        },
        //鼠标点击 a->event
        _infoPanelMouseClick: function(event/*a*/) {
            var self/*b*/ = this,
                index;
            var eventOffset/*c*/ = {left: event.offsetX || event.pageX - self.$infoPanel.offset().left},
                rate/*d*/ = eventOffset.left / self.$infoPanel.width();
            return self.positionValue = rate,
            index = Math.floor(self.positionValue * (self.itemsCount - 1)),
            //self.setPosition(self.positionValue), 
            self.next(index),
            !1
        },
        //鼠标弹起
        _infoMouseUp: function(event) {
            var self/*a*/ = this,
                index;
            index = Math.floor(self.positionValue * (self.itemsCount - 1)),
            //self.setPosition(self.positionValue), 
            self.infoSliderDragging = !1,
            self.infoMouseOffset = null,
            self.next(index);
            return !1
        },
        //鼠标移动 a->event
        _infoMouseDrag: function(event/*a*/) {
            var self/*b*/ = this;
            return null !== self.infoMouseOffset ? void self._calcInfoWidthFromMouseX({left: event.pageX}) : !1
        },
        
        //计算鼠标位置，播放位置 a->pageX
        _calcInfoWidthFromMouseX: function(eventPage/*a*/) {
            var self/*b*/ = this,
                panelOffset/*c*/ = self.$infoPanel.offset(),
                panelWidth/*d*/ = self.$infoPanel.width(),
                validWidth/*e*/ = eventPage.left - panelOffset.left;
            0 > validWidth && (validWidth = 0),
            validWidth > panelWidth && (validWidth = panelWidth);
            var rate/*f*/ = validWidth / panelWidth,
                index = Math.floor(rate * (self.itemsCount - 1));
            self.positionValue = rate,
            /* 鼠标处于按下状态，只更新进度条界面，不更新逻辑 */
            self.setPosition(rate)
            //self._updatePlayPosition(index);
        },
        //设置播放位置
        setPosition: function(rate/*a*/) {
            var self/*b*/ = this;
            /* 这里只更新界面，不涉及逻辑 */
            self.$positionNum.text(self.currentIndex + 1),
            //self.diaporama.jump(curNum),
            self.$infoSlider.css("left", 100 * rate + "%"),
            self.$infoPlaying.width(100 * rate + "%")
        },
        //重置
        resetPosition: function() {
            var self/*b*/ = this;
            self.$infoSlider.css("left", "0%"),
            self.$infoPlaying.width("0%"),
            self.$positionNum.text(1),
            self.$durationNum.text(self.itemsCount);
        },

        
        


        _initRateComponent: function() {
            var self = this,
                $rateInfo = $("#iplayer-rate-info");
            self.curRateValue = 1.0,
            self.$rateWrap = $('#js-iplayer-rate-range'),
            self.$curRateValue = $("#iplayer-rate-value").find('span'),//当前播放速率元素
            self.$rateDot = $rateInfo.find('.iplayer-rate-dot'),//滑块
            self.$rateControl = $rateInfo.find(".iplayer-rate-control"),//轨道
            self.$rateProgressBar = $("#iplayer-rate-bar");//进度条
            self.rateSliderDragging = !1,//正在拖拽滑块
            self.rateMouseOffset = null,//鼠标位移
            self.rateTimer = null, 
            self._addRateEvent()
        },
        //添加事件监听
        _addRateEvent: function() {
            var self/*a*/ = this;
            //鼠标按下
            self.$rateDot.on("mousedown", function(event) {
                self._rateMouseDown(event)
            }),
            //鼠标点击
            self.$rateControl.on("click", function(event) {
                event.target == event.currentTarget && self._rateMouseClick(event)
            }),
            //鼠标弹起
            $(document).on("mouseup.iplayer", function(event) {
                self.rateSliderDragging && self._rateMouseUp(event)
            }),
            //鼠标移动
            $(document).on("mousemove.iplayer", function(event) {
                self.rateSliderDragging && self._rateMouseDrag(event)
            })
        },
        _removeRateEvent: function() {
            var self/*a*/ = this;
            self.$rateDot.off("mousedown"),
            self.$rateControl.off("click"),
            $(document).off("mouseup.iplayer"),
            $(document).off("mousemove.iplayer")
        },
        //鼠标点下(滑块上)
        _rateMouseDown: function(event/*a*/) {
            var self/*b*/ = this;
            return self.rateSliderDragging = true,
            self.rateMouseOffset = {left: event.offsetX || event.pageX - self.dot.offset().left},
            !1
        },
        //鼠标弹起
        _rateMouseUp: function(event) {
            var self/*a*/ = this;
            self.rateSliderDragging = !1,
            self.rateMouseOffset = null
        },
        //鼠标拖动音量滑块
        _rateMouseDrag: function(event) {
            var self/*b*/ = this;
            return null !== self.rateMouseOffset ? void self._calcRateWidthFromMouseX({left: event.pageX}) : !1
        },
        //鼠标点击音量控制板(而非滑块)，设置音量
        _rateMouseClick: function(event) {
            var self/*b*/ = this,
                offsetLeft/*c*/ = {left: event.offsetX || event.pageX - self.$rateControl.offset().left},
                tmpRate/*d*/ = offsetLeft.left / self.$rateControl.width(),
                rate = tmpRate >= 0.5 ? (1 + (tmpRate - 0.5) * (self.options.maxPlaybackRate - 1) * 2)
                    : (tmpRate * (1 - self.options.minPlaybackRate) * 2 + self.options.minPlaybackRate);
            return rate = Number(rate).toFixed(1),
                rate === self.curRateValue ? !1 : (self.setRate(rate), !1)
        },
        //通过鼠标坐标计算音量 b->pageX
        _calcRateWidthFromMouseX: function(eventPage/*b*/) {
            var self/*c*/ = this,
                rateWrapOffset/*d*/ = self.$rateWrap.offset(),
                rateWrapWidth/*e*/ = self.$rateWrap.width() - 8,
                mouseOffsetLeft/*f*/ = self.rateMouseOffset.left,
                validRateWidth/*g*/ = eventPage.left - mouseOffsetLeft - rateWrapOffset.left;
            0 > validRateWidth && (validRateWidth = 0),
            validRateWidth > rateWrapWidth && (validRateWidth = rateWrapWidth);
            var tmpRate = validRateWidth / rateWrapWidth,
                rate/*h*/ = tmpRate >= 0.5 ? (1 + (tmpRate - 0.5) * (self.options.maxPlaybackRate - 1) * 2)
                    : (tmpRate * (1 - self.options.minPlaybackRate) * 2 + self.options.minPlaybackRate);
            return rate = Number(rate.toFixed(1)),//保留两位小数
            rate === self.curRateValue ? !1 : (
                self.rateUI(rate), 
                self.rateTimer && clearTimeout(self.rateTimer), 
                void(self.rateTimer = setTimeout(function() {
                    self.setRate(rate)
                }, 200))
            )
        },
        //设置音量
        setRate: function(val/*a*/) {
            var self/*b*/ = this,
                val = Number(val).toFixed(1);
            return val === self.curRateValue ? !1 : (
                self.curRateValue = val, 
                self.diaporama.playbackRate = val,
                self.state.playbackRate = val,
                //$.cookie('iplayerPlaybackRate', val),
                void self.rateUI(val)//更新到页面显示
            )
        },
        //设置页面的音量显示，如果a<=0, 则置静音 a->number
        rateUI: function(val/*a*/) {
            var self/*b*/ = this,
                cssRate,
                containerW/*c*/ = self.$rateControl.width() - 8;
            val >= 1 ? (cssRate = 0.5 + (val - 1) * 0.5 / (self.options.maxPlaybackRate - 1) ) : (cssRate = (val - self.options.minPlaybackRate) * 0.5 / (1 - self.options.minPlaybackRate)),
            self.$rateDot.css("left", containerW * cssRate + "px"),
            self.$rateProgressBar.css("width", 100 * cssRate + "%"),
            self.$curRateValue.text(Number(val).toFixed(1));
        },
        //上箭头 *1.5
        rateUp: function() {
            var self/*b*/ = this,
                rateValue/*c*/ = self.$curRateValue.text();
            rateValue *= 1.5;
            var rateValue = rateValue > self.options.maxPlaybackRate ? self.options.maxPlaybackRate : rateValue;
            self.setRate(rateValue)
        },
        //下箭头 /1.5
        rateDown: function() {
            var self/*b*/ = this,
                rateValue/*c*/ = self.$curRateValue.text();
            rateValue /= 1.5;
            var rateValue = rateValue < self.options.minPlaybackRate ? self.options.minPlaybackRate : rateValue;
            self.setRate(rateValue)
        },


        _initList: function() {
            var self = this;
            //已显示过一次
            //self.listShowdedOnce = !1;
            //已获取src属性的最后一个单元
            self.listCellHasSrcLastIndex = 0;
            //是否所有的单元都获取了src属性
            self.listCellSrcCompleted = !1;
            self.$listContent = $('#js-iplayer-list-content');
            self.$listInner = $('#js-iplayer-list-inner');
            self.$listContainer = $('#js-iplayer-list-container');
            self.$listPrevBtn = $('#js-iplayer-list-prev-btn');
            self.$listNextBtn = $('#js-iplayer-list-next-btn');

            self.listPerNum = Math.floor(self.$listContent.width() / 50);
            self.listCurrentShowingFirstIndex = 0;
            self.listCurrentShowingLastIndex = 0;
            self.$listInner.width(Math.min(self.itemsCount, self.listPerNum) * 50);
            self.$listContainer.width(self.itemsCount * 50);
            self._initListContent();


            self._addListEvent();
            //default: list is hidden
            self.$list.hide();
        },
        
        _initListContent: function() {
            var self = this,
                i = 0, j = 0,
                il = self.originTimelineData.length,
                arr = [];
            for (; i < il; i++) arr.push(self.options.listCellTpl);
            self.$listContainer.html(arr.join(''));
            self.$listCells = self.$listContainer.find('.iplayer-list-cell');

            if (self.itemsCount <= self.listPerNum) {
                self.$listPrevBtn.hide();
                self.$listNextBtn.hide();
                self.listCurrentShowingFirstIndex = 0;
                self.listCurrentShowingLastIndex = self.itemsCount - 1;
                self.listCellHasSrcLastIndex = self.listCurrentShowingLastIndex;
                for (; j < il; j++) {
                    $(self.$listCells[j]).find('img').attr("src", self.originTimelineData[j].thumbnailSrc);
                }

            }
            else {
                self.$listPrevBtn.hide();
                self.$listNextBtn.show();
                self.listCurrentShowingFirstIndex = 0;
                self.listCurrentShowingLastIndex = self.listPerNum - 1;
                self.listCellHasSrcLastIndex = self.listCurrentShowingLastIndex;
                for (; j < self.listPerNum; j++) {
                    $(self.$listCells[j]).find('img').attr("src", self.originTimelineData[j].thumbnailSrc);
                }
            }
        },
        _addListEvent: function() {
            var self = this;
            self.$listPrevBtn.on('click', function(event) {
                self._onClickListPrevBtn(event)
            });
            self.$listNextBtn.on('click', function(event) {
                self._onClickListNextBtn(event)
            });
            self.$list.on('click', '.iplayer-list-cell', function(event) {
                self._onClickListCell(event)
            });
        },
        _removeListEvent: function() {
            var self = this;
            self.$listPrevBtn.off('click');
            self.$listNextBtn.off('click');
            self.$list.off('click', '.iplayer-list-cell');
        },
        _onClickListPrevBtn: function(event) {
            var self = this,
                originLeft = Math.abs(parseInt(self.$listContainer.css("left"))),
                newLeft,
                i, il;
            self.$listNextBtn.show();
            if (self.listCurrentShowingFirstIndex <= self.listPerNum) {
                self.$listPrevBtn.hide();
                newLeft = 0;
                self.$listContainer.css({"left": "-" + newLeft + "px"});
                self.listCurrentShowingFirstIndex = 0;
                self.listCurrentShowingLastIndex = self.listPerNum - 1;
                
            }
            else {
                newLeft = originLeft - self.listPerNum * 50;
                self.$listContainer.css({"left": "-" + newLeft + "px"});
                self.listCurrentShowingLastIndex = self.listCurrentShowingFirstIndex - 1;
                self.listCurrentShowingFirstIndex -= self.listPerNum;
                
            }
        },
        _onClickListNextBtn: function(event) {
            var self = this,
                remainItems = self.itemsCount - 1 - self.listCurrentShowingLastIndex,
                originLeft = Math.abs(parseInt(self.$listContainer.css("left"))), //取绝对值
                newLeft,
                i, il;
            self.$listPrevBtn.show();
            if (remainItems <= self.listPerNum) {
                self.$listNextBtn.hide();
                newLeft = originLeft + remainItems * 50;
                self.$listContainer.css({"left": "-" + newLeft + "px"});
                self.listCurrentShowingFirstIndex = self.itemsCount - self.listPerNum;
                self.listCurrentShowingLastIndex = self.itemsCount - 1;

                if (self.listCellHasSrcLastIndex < self.itemsCount - 1) {
                    for (i = self.listCellHasSrcLastIndex + 1, il = self.itemsCount; i < il; i++) {
                        $(self.$listCells[i]).find('img').attr("src", self.originTimelineData[i].thumbnailSrc);
                    }
                    self.listCellHasSrcLastIndex = self.listCurrentShowingLastIndex;
                }
                
            }
            else {
                newLeft = originLeft + self.listPerNum * 50;
                self.$listContainer.css({"left": "-" + newLeft + "px"});
                self.listCurrentShowingFirstIndex = self.listCurrentShowingLastIndex + 1;
                self.listCurrentShowingLastIndex += self.listPerNum;

                if (self.listCellHasSrcLastIndex < self.listCurrentShowingLastIndex) {
                    for (i = self.listCellHasSrcLastIndex + 1, il = self.listCurrentShowingLastIndex + 1; i < il; i++) {
                        $(self.$listCells[i]).find('img').attr("src", self.originTimelineData[i].thumbnailSrc);
                    }
                    self.listCellHasSrcLastIndex = self.listCurrentShowingLastIndex;
                }
                
            }
        },
        _onClickListCell: function(event) {
            var self = this,
                index = $(event.currentTarget).position().left / 50;
            index != self.currentIndex && self.next(index);
            

        },
        

        /* todo: share code */
        _initActions: function() {
            var self = this;
            self.onChangeDisplayTransitions = !1;
            self.$fullscreen = $('#js-iplayer-fullscreen');
            self.$showList = $('#js-iplayer-show-list');
            //self.$playMode = $('#js-iplayer-play-mode');
            self.$displayTransitions = $('#js-iplayer-display-transitions');
            self.$shareCode = $('#js-iplayer-share-code');

            self.$shareCodeSection = $('#iplayer-share-code-section');
            self.$shareCodeInput = $('#js-iplayer-share-code-input');
            //self.$shareCodeCopy = $('#js-iplayer-share-code-copy');

            self.shareCodeSectionShowing = !1;
            self._addActionsEvent();
            
        },
        _addActionsEvent: function() {
            var self =this;
            self.$fullscreen.on('click', function(event) {
                self._onClickFullscreen(event)
            });
            document.addEventListener(self.fullscreen.fullScreenEventName, function(event) {
                self._onFullscreenChange(event);
            });
            self.$showList.on('click', function(event) {
                self._onClickShowList(event)
            });
            /*self.$playMode.on('click', function(event) {
                self._onClickPlayMode(event)
            });*/
            self.$displayTransitions.on('click', function(event) {
                self._onClickDisplayTransitions(event)
            });
            self.$shareCode.on('click', function(event) {
                self._onClickShareCode(event)
            });
        },
        _removeActionsEvent: function() {
            var self = this;
            self.$fullscreen.off('click');
            self.$showList.off('click');
            //self.$playMode.off('click');
            self.$displayTransitions.off('click');
            self.$shareCode.off('click');
        },
        _onClickFullscreen: function(event) {
            var self = this;
            return !self.state.fullscreen && self.fullscreen.supportsFullScreen ? (self.enterFullscreen(), !1) : (
                    self.state.fullscreen ? (self.exitFullscreen(), !1) : !1
                )
        },
        _onFullscreenChange: function(event) {
            var self = this;
            //进入全屏
            if (self.fullscreen.isFullScreen(document.getElementById('iplayer'))) {
                self.state.fullscreen = true;
                self.$fullscreen.attr('title', '退出全屏播放');
                self.$fullscreen.removeClass('icon-iplayer-fullscreen').addClass('icon-iplayer-exit-fullscreen');
            }
            else {
                self.state.fullscreen = false;
                self.$fullscreen.attr('title', '全屏播放');
                self.$fullscreen.removeClass('icon-iplayer-exit-fullscreen').addClass('icon-iplayer-fullscreen');
            }
        },
        _onClickShowList: function(event) {
            var self = this;
            self.state.listShowing ? self.hideList() : self.showList();
            return !1    
        },
        /*_onClickPlayMode: function(event) {
            var self = this;
            !self.state.playMode ? self.changePlayMode(1) : self.changePlayMode(0);
            return !1    
        },*/
        _onClickDisplayTransitions: function(event) {
            var self = this;
            if (self.onChangeDisplayTransitions) return;
            self.onChangeDisplayTransitions = true;
            //self.$loading.show();
            //self.$displayTransitions.addClass('disabled');
            if (self.state.displayTransitions) {
                self.cancelTransitions(),
                self.$displayTransitions.removeClass('active')
            } else {
                self.displayTransitions(),
                self.$displayTransitions.addClass('active')
            }
            return !1
        },
        _onClickShareCode: function(event) {
            var self = this,
                shareCode = '<iframe width="854" height="480" src="' + self.options.shareCode + '" frameborder="0" allowfullscreen></iframe>';
            if (self.shareCodeSectionShowing) {
                self.shareCodeSectionShowing = !1;
                self.$shareCodeSection.hide();
                self.$shareCode.removeClass('active');
                if (self.diaporama.paused) {
                    self._onClickPlayBtn();
                }
            }
            else {
                self.shareCodeSectionShowing = true;
                self.$shareCodeInput.val(shareCode);

                self.$shareCodeSection.show();
                self.$shareCodeInput.focus();
                self.$shareCodeInput.select();
                self.$shareCode.addClass('active');
                if (!self.diaporama.paused) {
                    self._onClickPlayBtn();
                }
            }
        },
        enterFullscreen: function() {
            var self = this;
            if (self.state.fullscreen || !self.fullscreen.supportsFullScreen) return;
            self.state.fullscreen = true;
            self.$fullscreen.attr('title', '退出全屏播放');
            self.fullscreen.requestFullScreen(document.getElementById('iplayer'));
            self.$fullscreen.removeClass('icon-iplayer-fullscreen').addClass('icon-iplayer-exit-fullscreen');
        },
        exitFullscreen: function() {
            var self = this;
            if (!self.state.fullscreen) return;
            self.state.fullscreen = !1;
            self.$fullscreen.attr('title', '全屏播放');
            self.fullscreen.cancelFullScreen(document.getElementById('iplayer'));
            self.$fullscreen.removeClass('icon-iplayer-exit-fullscreen').addClass('icon-iplayer-fullscreen');
        },
        showList: function() {
            var self = this,
                i, il;
            if (self.state.listShowing) return;
            self.state.listShowing = true;
            self.$list.fadeIn();
            self.$showList.addClass('active');
            self.$showList.attr('title', '隐藏列表');
            //列表隐藏的时候，列表的位置会随着播放移动
            if (self.listCellHasSrcLastIndex < self.listCurrentShowingLastIndex) {
                for (i = self.listCellHasSrcLastIndex + 1, il = self.listCurrentShowingLastIndex + 1; i < il; i++) {
                    $(self.$listCells[i]).find('img').attr("src", self.originTimelineData[i].thumbnailSrc);
                }
                self.listCellHasSrcLastIndex = self.listCurrentShowingLastIndex;
            }
        },
        hideList: function() {
            var self = this;
            if (!self.state.listShowing) return;
            self.state.listShowing = !1;
            self.$list.fadeOut();
            self.$showList.removeClass('active');
            self.$showList.attr('title', '显示列表');
        },
        /*changePlayMode: function (modeNum) {
            var self = this;
            modeNum === 0 ? self._changeModeToOrder() : self._changeModeToRandom();
        },
        _changeModeToOrder: function() {
            var self = this;
            self.state.playMode = 0;
            self.$playMode.removeClass('icon-iplayer-mode-random').addClass('icon-iplayer-mode-order');
            //self.diaporama.removeListener('slideEnd', self.nextRandom);
            return !1
        },
        _changeModeToRandom: function() {
            var self = this;
            self.state.playMode = 1;
            self.$playMode.removeClass('icon-iplayer-mode-order').addClass('icon-iplayer-mode-random');
            //self.diaporama.addListener('slideEnd', self.nextRandom);
            return !1
        },*/
        displayTransitions: function() {
            var self = this,
                $win = $(window),
                winWidth = $win.width(),
                winHeight = $win.height();
            self.diaporama.pause();
            self.diaporama.loop = !1;
            if (self.transitionTimelineData) {
                self.diaporamaData.timeline = self.transitionTimelineData;
            }
            else {
                self.diaporamaData.timeline = self.getDiaporamaTimelineData(self.originTimelineData, winWidth, winHeight, true);
                self.transitionTimelineData = self.diaporamaData.timeline;
            }
            self.diaporama.data = self.diaporamaData;
            self.diaporama.loop = true;
            self.next(0);
            self.diaporama.play();
            self.onChangeDisplayTransitions = !1;
            //self.$displayTransitions.removeClass('disabled');
            self.state.displayTransitions = true;
            //$.cookie('iplayerDisplayTransitions', true);
            self.$displayTransitions.attr('title', '取消特效');
            //self.$loading.hide();
            return !1;
        },
        cancelTransitions: function() {
            var self = this,
                $win = $(window),
                winWidth = $win.width(),
                winHeight = $win.height();
            self.diaporama.pause();
            self.diaporama.loop = !1;
            if (self.noTransitionTimelineData) {
                self.diaporamaData.timeline = self.noTransitionTimelineData;
            }
            else {
                self.diaporamaData.timeline = self.getDiaporamaTimelineData(self.originTimelineData, winWidth, winHeight, false);
                self.noTransitionTimelineData = self.diaporamaData.timeline;
            }
            self.diaporama.data = self.diaporamaData;
            self.diaporama.loop = true;
            self.next(0);
            self.diaporama.play();
            self.onChangeDisplayTransitions = !1;
            //self.$displayTransitions.removeClass('disabled');
            self.state.displayTransitions = !1;
            //$.cookie('iplayerDisplayTransitions', !1);
            self.$displayTransitions.attr('title', '启用特效');
            //self.$loading.hide();
            return !1;
        },

        next: function(index) {
            var self = this;
            self.playByNoDiaporama = true;//用于去掉特效后的页面更新
            if (typeof index != 'undefined' && index != self.currentIndex) {
                if (index - self.currentIndex === 1) {
                    self.diaporama.next();
                }
                else if (index - self.currentIndex === -1) {
                    self.diaporama.prev();
                }
                else {
                    self.diaporama.jump(index);
                }
                self._updatePlayPosition(index);
            }
            else if (typeof index === 'undefined') {
                self.diaporama.next();
                self._updatePlayPosition(self.currentIndex + 1);
            }
            //self.currentIndex += 1;
            //self.currentIndex >= self.itemsCount && self.currentIndex = 0;
            
        },
        nextRandom: function() {
            var self = this,
                index = self._getRandomIndex();
            self.playByNoDiaporama = true;//用于去掉特效后的页面更新
            if (index - self.currentIndex === 1) {
                self.diaporama.next();
            }
            else if (index - self.currentIndex === -1) {
                self.diaporama.prev();
            }
            else {
                self.diaporama.jump(index);
            }
            self._updatePlayPosition(index);
        },
        _getRandomIndex: function() {
            var self = this,
                index = Math.floor(Math.random() * self.itemsCount);
            if (index === self.currentIndex) {
                index = self._getRandomIndex();
            }
            return index;
        },
        prev: function() {
            var self = this;
            //self.currentIndex -= 1;
            //self.currentIndex < 0 && self.currentIndex = self.itemsCount - 1;
            self.playByNoDiaporama = true;//用于去掉特效后的页面更新
            self.diaporama.prev();
            self._updatePlayPosition(self.currentIndex - 1);
        },


        /**
         * 更新界面显示
         * @param enforce 强制执行，就算 index === self.currentIndex 也执行
         */
        _updatePlayPosition: function(index, enforce) {
            var self = this, rate;
            if (index === self.currentIndex && !enforce) return;
            if (index >= self.itemsCount) index = 0;
            if (index < 0) index = self.itemsCount -1;
            rate = index / (self.itemsCount - 1);
            //if (rate > 1) rate = 0;
            //update current index
            self.currentIndex = index;
            
            
            //随机状态不更新进度条
            //if (self.state.playMode === 0) {
                self.setPosition(rate);
            //}
            //更新作者和标题信息
            self._updateAuthorInfo();
            //更新列表的索引项
            self._updateListCurrentIndex();
        },
        _updateAuthorInfo: function() {
            var self = this,
                data = self.originTimelineData[self.currentIndex];
            if (!self.$likeBtn) self.$likeBtn = $('#js-iplayer-like-btn');
                //titleHtml = '<a id="js-iplayer-image-title" href="' + data.titleSrc + '" title="' + data.title + '" target="_blank">' + data.title + '</a>',
                //authorHtml = '<a id="js-iplayer-image-author" href="' + data.authorSrc + '" title="' + data.author + '" target="_blank">' + data.author + '</a>';
            self.$infoTitle.attr("href", data.titleSrc).attr("title", data.title).text(data.title);
            self.$infoAuthor.attr("href", data.authorSrc).attr("title", data.author).text(data.author);
            self.$likeBtn.attr({'data-image-id': data.id});
            if (data.liked) {
                self.$likeBtn.addClass('active');
            }
            else {
                self.$likeBtn.removeClass('active');
            }
        },
        _updateListCurrentIndex: function() {
            var self = this;
            self.$listCells.removeClass('active');
            $(self.$listCells[self.currentIndex]).addClass('active');
            //列表隐藏的时候才更新位置
            if (!self.state.listShowing && self.itemsCount > self.listPerNum) self._centerListCurrentIndex();
        },
        _centerListCurrentIndex: function() {
            var self = this,
                newLeft;
            //靠左
            if (self.currentIndex <= Math.floor((self.listPerNum - 1) / 2)) {
                self.$listPrevBtn.hide();
                self.$listNextBtn.show();
                newLeft = 0;
                self.$listContainer.css({"left": "-" + newLeft + "px"});
                self.listCurrentShowingFirstIndex = 0;
                self.listCurrentShowingLastIndex = self.listPerNum - 1;
            }
            //靠右
            else if (self.currentIndex >= (self.itemsCount - Math.floor(self.listPerNum / 2) + 1)) {
                self.$listNextBtn.hide();
                self.$listPrevBtn.show();
                newLeft = (self.itemsCount - self.listPerNum) * 50;
                self.$listContainer.css({"left": "-" + newLeft + "px"});
                self.listCurrentShowingFirstIndex = self.itemsCount - self.listPerNum;
                self.listCurrentShowingLastIndex = self.itemsCount - 1;
            }
            //其他
            else {
                self.$listNextBtn.show();
                self.$listPrevBtn.show();
                newLeft = (self.currentIndex - Math.floor((self.listPerNum - 1) / 2)) * 50;
                self.$listContainer.css({"left": "-" + newLeft + "px"});
                self.listCurrentShowingFirstIndex = self.currentIndex - Math.floor((self.listPerNum - 1) / 2);
                self.listCurrentShowingLastIndex = self.currentIndex + Math.floor(self.listPerNum / 2);;
            }
        },
        



        _initButtons: function() {
            var self = this;
            self.$closeBtn = $('#js-iplayer-close-btn');
            self.$prevBtn = $('#js-iplayer-prev-btn');
            self.$nextBtn = $('#js-iplayer-next-btn');
            self.$playBtn = $('#js-iplayer-play-btn');
            self.$likeBtn = $('#js-iplayer-like-btn');
            self._addButtonsEvent();
        },
        _addButtonsEvent: function() {
            var self = this;
            self.$closeBtn.on('click', function(event) {
                self.hide()
            });
            self.$prevBtn.on('click', function(event) {
                self._onClickPrevBtn(event)
            });
            self.$nextBtn.on('click', function(event) {
                self._onClickNextBtn(event)
            });
            self.$playBtn.on('click', function(event) {
                self._onClickPlayBtn(event)
            });
            self.$likeBtn.on('click', function(event) {
                self._onClickLikeBtn(event)
            });
        },
        _removeButtonsEvent: function() {
            var self = this;
            self.$closeBtn.off('click'),
            self.$prevBtn.off('click'),
            self.$nextBtn.off('click'),
            self.$playBtn.off('click'),
            self.$likeBtn.off('click')
        },
        hide: function() {
            var self = this;
            self.diaporama.pause();
            self.diaporama.loop = false;
            //self._removeAllEvent();
            self._removeKeyboardEvent();
            $(document.body).css({"overflow": "auto"});
            if (self._hideTimer) clearTimeout(self._hideTimer);
            self.state.fullscreen && self.exitFullscreen();
            self.$iplayer.hide();
            return !1;
        },
        _addAllEvent: function() {
            var self = this;
            self._addDiaporamaEvent();
            self._addInfoEvent();
            self._addRateEvent();
            self._addListEvent();
            self._addActionsEvent();
            self._addButtonsEvent();
            self._addKeyboardEvent();
            self.$clickSection.on('click', function(event) {
                self._onClickPlayBtn(event)
            });
            $(document).on('mousemove.iplayer', function(event) {
                self._onMousemove(event)
            });
            self._onMousemove();
        },
        _removeAllEvent: function() {
            var self = this;
            self._removeDiaporamaEvent();
            self._removeInfoEvent();
            self._removeRateEvent();
            self._removeListEvent();
            self._removeActionsEvent();
            self._removeButtonsEvent();
            self.$handle.off('click');
            self._removeKeyboardEvent();
            $(document).off('mousemove.iplayer');
        },
        _onClickPrevBtn: function(event) {
            var self = this;
            //if (self.state.playMode === 0) {
                self.prev();
            //}
            /*else if (self.state.playMode === 1) {
                self.nextRandom();
            }
            else return !1;*/
        },
        _onClickNextBtn: function(event) {
            var self = this;
            //if (self.state.playMode === 0) {
                self.next();
            //}
            /*else if (self.state.playMode === 1) {
                self.nextRandom();
            }
            else return !1;*/
        },
        _onClickPlayBtn: function(event) {
            var self = this;
            if (self.diaporama.paused && self.shareCodeSectionShowing) {
                self.shareCodeSectionShowing = !1;
                self.$shareCodeSection.hide();
                self.$shareCode.removeClass('active');
            }
            
            self.diaporama.paused = !self.diaporama.paused,
            self.$playBtn.hasClass('icon-iplayer-play') ? (
                self.$playBtn.removeClass('icon-iplayer-play'),
                self.$playBtn.addClass('icon-iplayer-pause')
            ) : (
                self.$playBtn.removeClass('icon-iplayer-pause'),
                self.$playBtn.addClass('icon-iplayer-play')
            )
            
        },
        _onClickLikeBtn: function(event) {
            var self = this,
                $btn = $(event.target),
                id = parseInt($btn.attr('data-image-id')),
                data = self.originTimelineData[self.currentIndex];
            if (!$btn.hasClass('active')) {
                $.getJSON(ajaxLikeImageUrl, {
                    id: id
                }, function(res) {
                    if (res.success) {
                        data.liked = true;
                        if (parseInt(self.$likeBtn.attr('data-image-id')) === id) {
                            self.$likeBtn.addClass('active');
                        }
                    }    
                })
            }
            else {
                $.getJSON(ajaxUnlikeImageUrl, {
                    id: id
                }, function(res) {
                    if (res.success) {
                        data.liked = !1;
                        if (parseInt(self.$likeBtn.attr('data-image-id')) === id) {
                            self.$likeBtn.removeClass('active');
                        }
                    }    
                })
            }
        },
        _onMousemove: function(event) {
            var self = this;
            if (self._hideTimer) {
                clearTimeout(self._hideTimer), 
                self.$handle.css(showCursorProperties);
                self.$bottom.show();
                if (self.$logo.length) self.$logo.fadeIn();
            }
            //setTimeout里应该放函数名，会延迟执行这个函数，如果放函数之后打上(), 会立即执行
            //$handle的隐藏与显示会出发一次mousemove
            //暂停的时候不应该隐藏
            if ($('#iplayer').height() - event.pageY > 130 && !self.diaporama.paused) 
                self._hideTimer = setTimeout(function() {
                    self._hideControlPanel();
                    if (self.$logo.length) self.$logo.fadeOut();
                }, 2000);
            //return !1
        },
        _hideControlPanel: function() {
            var self = this;
            self.$handle.css(hideCursorProperties);
            self.$bottom.fadeOut()
        },

        _addKeyboardEvent: function() {
            var self = this;
            $(document.body).on("keyup.iplayer", function(event) {
                self._onKeyup(event)
            });
        },
        _removeKeyboardEvent: function() {
            var self = this;
            $(document.body).off("keyup.iplayer");
        },
        _onKeyup: function(event) {
            var self = this;
            switch (event.which) {
              case 38: // Up
                self.rateUp();
                break;
              case 40: // Down
                self.rateDown();
                break;
              case 37: // Left
                self.prev();
                break;
              case 39: // Right
                self.next();
                break;
              case 32: // Space
                self._onClickPlayBtn();
                break;
              /*case 27: //esc
                 !self.state.fullscreen ? (console.log(self.state.fullscreen),self.hide()) : self.exitFullscreen();
                 break;*/
              case 13: //enter
                  !self.state.fullscreen ? self.enterFullscreen() : self.exitFullscreen();
                  break;
            }
        },

        /* todo: like image, add to collection */
        _initImageActions: function() {
            var self = this;
        },

        prepend: function(data) {9
            var self = this,
                il = data.length - 1;
            self.diaporama.pause();
            self.diaporama.loop = false;
            for (; il > -1; il--) {
                self.originTimelineData.unshift(data[il]);
            }
            self._reinit();
        },
        append: function(data) {
            var self = this,
                i,
                il = data.length;
            self.diaporama.pause();
            self.diaporama.loop = false;
            for (i = 0; i < il; i++) {
                self.originTimelineData.push(data[i]);
            }
            self._reinit();
        },
        replace: function(data) {
            var self = this;
            self.originTimelineData = $.extend([], data);//copy
            self._reinit();
        },
        _reinit: function() {
            var self = this;
            self.$iplayer.show();
            self._reinitProperties();
            self._reinitContainer();
            self._reinitDiaporama();
            self._reinitInfoComponent();
            //self._addRateEvent();
            self._reinitList();
            //self._addActionsEvent();
            //self._addButtonsEvent();
            self._addKeyboardEvent();
            /*self.$clickSection.on('click', function(event) {
                self._onClickPlayBtn(event)
            });
            self.$iplayer.on('mousemove.iplayer', function(event) {
                self._onMousemove(event)
            });*/
            //self._hideTimer = setTimeout(self._hideControlPanel, 4000);
            //更新界面
            self._updatePlayPosition(0, true);

        },
        _reinitProperties: function() {
            var self = this;
            self.state.fullscreen = !1;
            self.state.listShowing = !1;
            //self.state.playMode = 0;//使用上次的
            self.itemsCount = self.originTimelineData.length;
            self.currentIndex = 0;//当前图片索引
            self._hideTimer = null;
            self.transitionTimelineData = null;
            self.noTransitionTimelineData = null;
            //防止初始化更新页面两次至索引1
            if (!self.state.displayTransitions) self.playByNoDiaporama = true;
        },
        _reinitContainer: function() {
            $(document.body).css({"overflow": "hidden"});
        },
        /* 已添加事件 */
        _reinitDiaporama: function() {
            var self = this,
                $win = $(window),
                winWidth = $win.width(),
                winHeight = $win.height();
    
            self.diaporamaData.timeline = self.getDiaporamaTimelineData(self.originTimelineData, winWidth, winHeight, self.state.displayTransitions);
            self.state.displayTransitions ? self.transitionTimelineData = self.diaporamaData.timeline : self.noTransitionTimelineData = self.diaporamaData.timeline;
            self.diaporama.loop = false;
            self.diaporama.data = self.diaporamaData;
            self.diaporama.loop = true;
            self.diaporama.jump(0);
            self.diaporama.play();
            self.$playBtn.removeClass('icon-iplayer-play');
            self.$playBtn.addClass('icon-iplayer-pause');
            self.$showList.removeClass('active');
            //self._addDiaporamaEvent();
        },
        /* 已添加事件 */
        _reinitInfoComponent: function() {
            var self = this;
            self.resetPosition();
            //self._addInfoEvent();
        },
        /* 已添加事件 */
        _reinitList: function() {
            var self = this;
            //已显示过一次
            //self.listShowdedOnce = !1;
            //已获取src属性的最后一个单元
            self.listCellHasSrcLastIndex = 0;
            //是否所有的单元都获取了src属性
            self.listCellSrcCompleted = !1;
            
            self.listCurrentShowingFirstIndex = 0;
            self.listCurrentShowingLastIndex = 0;
            self.$listInner.width(Math.min(self.itemsCount, self.listPerNum) * 50);
            self.$listContainer.width(self.itemsCount * 50);
            self._initListContent();


            //default: list is hidden
            self.$list.hide();
        }
    };
    
    
    var player = {};
    /**
     * @param array items
     */
    player.play = function(items, options, toReplace) {
        if (typeof toReplace === 'undefined') toReplace = true;
        if (typeof player.iPlayer === 'undefined') {
            player.iPlayer = new iPlayer(items, options);
        }
        else {
            $.extend(true, player.iPlayer.options, options);
            toReplace ? player.iPlayer.replace(items) : player.iPlayer.prepend(items);
        }
    };
    player.close = function() {
        if (typeof player.iPlayer === 'undefined') return;
        player.iPlayer.hide();
    };

    window.player = player;

}(jQuery, Diaporama));