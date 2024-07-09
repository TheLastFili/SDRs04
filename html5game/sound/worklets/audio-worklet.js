﻿AudioWorkletProcessor.prototype._I=function(){this._J=true;this.port.onmessage=(_K)=>{if(_K.data==="kill")this._J=false;};};class _L extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._I();}process(_M,_N,parameters){const input=_M[0];const bypass=parameters.bypass;for(let c=0;c<input.length;++c){const _O=input[c];for(let _P=0;_P<_O.length;++_P){const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];
_N[_Q][c][_P]=_O[_P];}}return this._J;}}class _R extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"gain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(){super();this._I();}process(_M,_N,parameters){const _S=_M[0];const _T=_M[1];const output=_N[0];const gain=parameters.gain;for(let c=0;c<_T.length;++c){const _O=_T[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P)_U[_P]=_O[_P];}for(let c=0;c<_S.length;++c){const _O=_S[c];const _U=output[c];for(let _P=0;_P<_O.length;
++_P){const _V=(gain[_P]!==undefined)?gain[_P]:gain[0];_U[_P]+=_O[_P]*_V;}}return this._J;}}registerProcessor("audio-bus-input",_L);registerProcessor("audio-bus-output",_R);class _W extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:1.0,minValue:0.0},{name:"factor",automationRate:"a-rate",defaultValue:20,minValue:1,maxValue:100},{name:"resolution",automationRate:"a-rate",
defaultValue:8,minValue:2,maxValue:16},{name:"mix",automationRate:"a-rate",defaultValue:0.8,minValue:0.0,maxValue:1.0}];}static _X=[undefined,undefined,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];constructor(_Y){super();this._I();const _Z=_Y.outputChannelCount[0];this.__=new Float32Array(_Z);this._01=new Uint32Array(_Z);}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const gain=parameters.gain;const factor=parameters.factor;const resolution=parameters.resolution;
const mix=parameters.mix;for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){_U[_P]=_O[_P];if(this._01[c]===0)this.__[c]=_O[_P];const _11=(factor[_P]!==undefined)?factor[_P]:factor[0];++this._01[c];this._01[c]%=_11;const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];if(_Q>0.0){continue;}let _21=this.__[c];const _V=(gain[_P]!==undefined)?gain[_P]:gain[0];_21*=_V;_21=Math.max(Math.min(_21,1.0),-1.0);const _31=(resolution[_P]!==undefined)?resolution[_P]:resolution[0];
const max=(_21>0.0)?_W._X[_31]-1:_W._X[_31];_21=Math.round(_21*max)/max;const _41=(mix[_P]!==undefined)?mix[_P]:mix[0];_U[_P]*=(1.0-_41);_U[_P]+=(_21*_41);}}return this._J;}}registerProcessor("bitcrusher-processor",_W);class _51{constructor(_61=1e-3){this.setTime(_61);}setTime(_61){this._71=Math.exp(-1/(_61*sampleRate));}process(_81,_91){return _81+this._71*(_91-_81);}}class _a1{constructor(_b1,_c1){this._d1=new _51(_b1);this._e1=new _51(_c1);this._f1=_b1;this._g1=_c1;}_h1(_61){if(_61===this._f1)return;
this._d1.setTime(_61);this._f1=_61;}_i1(_61){if(_61===this._g1)return;this._e1.setTime(_61);this._g1=_61;}process(_81,_91){if(_81>_91)return this._d1.process(_81,_91);else return this._e1.process(_81,_91);}}class _j1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"ingain",automationRate:"a-rate",defaultValue:1,minValue:0},{name:"threshold",automationRate:"a-rate",defaultValue:0.125,minValue:1e-3,maxValue:1}
,{name:"ratio",automationRate:"a-rate",defaultValue:4,minValue:1},{name:"attack",automationRate:"a-rate",defaultValue:0.05,minValue:1e-3,maxValue:1e-1},{name:"release",automationRate:"a-rate",defaultValue:0.25,minValue:1e-2,maxValue:1},{name:"outgain",automationRate:"a-rate",defaultValue:1,minValue:0}];}constructor(_k1){super();this._I();const _d1=_j1.parameterDescriptors.find(_l1=>_l1.name==="attack");const _e1=_j1.parameterDescriptors.find(_l1=>_l1.name==="release");this._m1=new _a1(_d1.defaultValue,
_e1.defaultValue);this._n1=0;}process(_o1,_p1,_q1){const input=_o1[0];const output=_p1[0];const bypass=_q1.bypass;const ingain=_q1.ingain;const outgain=_q1.outgain;const threshold=_q1.threshold;const ratio=_q1.ratio;const attack=_q1.attack;const release=_q1.release;if(input.length===0)return this._J;for(let _P=0;_P<input[0].length;++_P){let frame=input.map(_r1=>_r1[_P]);output.forEach((_r1,_s1)=>{_r1[_P]=frame[_s1];});const _t1=(ingain[_P]!==undefined)?ingain[_P]:ingain[0];frame=frame.map(_u1=>_u1*=_t1);const rect=frame.map(_u1=>Math.abs(_u1));
const max=Math.max(...rect);const _v1=_w1(max);const _x1=(threshold[_P]!==undefined)?threshold[_P]:threshold[0];const _y1=_w1(_x1);const _z1=Math.max(0,_v1-_y1);const _d1=(attack[_P]!==undefined)?attack[_P]:attack[0];const _e1=(release[_P]!==undefined)?release[_P]:release[0];this._m1._h1(_d1);this._m1._i1(_e1);this._n1=this._m1.process(_z1,this._n1);const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];if(_Q>0)continue;const _31=(ratio[_P]!==undefined)?ratio[_P]:ratio[0];const _A1=(this._n1/_31)-this._n1;
const _V=_B1(_A1);frame=frame.map(_u1=>_u1*=_V);const _C1=(outgain[_P]!==undefined)?outgain[_P]:outgain[0];frame=frame.map(_u1=>_u1*=_C1);output.forEach((_r1,_s1)=>{_r1[_P]=frame[_s1];});}return this._J;}}function _w1(_D1){return 20*Math.log10(_D1);}function _B1(_D1){return Math.pow(10,_D1/20);}registerProcessor("compressor-processor",_j1);class _E1 extends AudioWorkletProcessor{static _F1=5.0;static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}
,{name:"time",automationRate:"a-rate",defaultValue:0.2,minValue:0.0,maxValue:_E1._F1},{name:"feedback",automationRate:"a-rate",defaultValue:0.5,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_Y){super();this._I();const _Z=_Y.outputChannelCount[0];const _G1=(_E1._F1*sampleRate)+1;this.buffer=new Array(_Z);this._H1=new Uint32Array(_Z);for(let c=0;c<_Z;++c)this.buffer[c]=new Float32Array(_G1);}process(_M,_N,parameters){const input=_M[0];
const output=_N[0];const bypass=parameters.bypass;const time=parameters.time;const feedback=parameters.feedback;const mix=parameters.mix;for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){_U[_P]=_O[_P];const _x1=(time[_P]!==undefined)?time[_P]:time[0];const _I1=this._J1(c,_x1);const _11=(feedback[_P]!==undefined)?feedback[_P]:feedback[0];const _K1=_O[_P]+(_I1*_11);this.write(c,_K1);const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];if(_Q>0.0){continue;}const _41=(mix[_P]!==undefined)?mix[_P]:mix[0];
_U[_P]*=(1-_41);_U[_P]+=(_I1*_41);}}return this._J;}_J1(_L1,_61){const _M1=_61*sampleRate;let _N1=(this._H1[_L1]-~~_M1);let _O1=(_N1-1);while(_N1<0)_N1+=this.buffer[_L1].length;while(_O1<0)_O1+=this.buffer[_L1].length;const frac=_M1-~~_M1;const _P1=this.buffer[_L1][_N1];const _Q1=this.buffer[_L1][_O1];return _P1+(_Q1-_P1)*frac;}write(_L1,_R1){++this._H1[_L1];this._H1[_L1]%=this.buffer[_L1].length;this.buffer[_L1][this._H1[_L1]]=_R1;}}registerProcessor("delay-processor",_E1);class _S1 extends AudioWorkletProcessor{
static get parameterDescriptors(){return [];}constructor(){super();this._I();}process(_T1,_U1,_V1){const input=_T1[0];const _W1=_U1[0];const _X1=_U1[1];for(let c=0;c<input.length;++c){const _O=input[c];const _Y1=_W1[c];const _Z1=_X1[c];for(let _P=0;_P<_O.length;++_P){_Y1[_P]=_O[_P];_Z1[_P]=_O[_P];}}return this._J;}}class __1 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1}];}constructor(){super();this._I();}process(_T1,
_U1,_V1){const _S=_T1[0];const _T=_T1[1];const output=_U1[0];const bypass=_V1.bypass;for(let c=0;c<_T.length;++c){const _02=_S[c];const _12=_T[c];const _U=output[c];for(let _P=0;_P<_02.length;++_P){const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];if(_Q>0){_U[_P]=_12[_P];}else {_U[_P]=_02[_P];}}}return this._J;}}registerProcessor("eq-input",_S1);registerProcessor("eq-output",__1);class _22 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",automationRate:"a-rate",defaultValue:0,
minValue:0,maxValue:1},{name:"gain",automationRate:"a-rate",defaultValue:0.5,minValue:0.0}];}constructor(){super();this._I();}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const gain=parameters.gain;for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){_U[_P]=_O[_P];const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];if(_Q>0.0){continue;}const _V=(gain[_P]!==undefined)?gain[_P]:gain[0];_U[_P]*=_V;}}return this._J;
}}registerProcessor("gain-processor",_22);class _32 extends AudioWorkletProcessor{static get parameterDescriptors(){const _42=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(5000.0,_42),minValue:10.0,maxValue:_42},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_Y){super();this._I();
const _Z=_Y.outputChannelCount[0];this._52=0;this._62=0;this._72=0;this._82=0;this._92=0;this._a2=new Float32Array(_Z);this._b2=new Float32Array(_Z);this._c2=new Float32Array(_Z);this._d2=new Float32Array(_Z);this._e2=-1;this._f2=-1;this._g2=-1;}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _h2=(freq.length===1&&q.length===1&&gain.length===1);if(_h2)this._i2(freq[0],q[0],gain[0]);
for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){if(_h2===false){const _11=(freq[_P]!==undefined)?freq[_P]:freq[0];const _j2=(q[_P]!==undefined)?q[_P]:q[0];const _V=(gain[_P]!==undefined)?gain[_P]:gain[0];this._i2(_11,_j2,_V);}const _k2=this._72*_O[_P]+this._82*this._a2[c]+this._92*this._b2[c]-this._52*this._c2[c]-this._62*this._d2[c];this._b2[c]=this._a2[c];this._a2[c]=_O[_P];this._d2[c]=this._c2[c];this._c2[c]=_k2;const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];
_U[_P]=(_Q>0)?_O[_P]:_k2;}}return this._J;}_i2(_l2,_m2,_n2){if(_l2===this._e2&&_m2===this._f2&&_n2===this._g2)return;const _o2=2*Math.PI*_l2/sampleRate;const _p2=Math.cos(_o2);const _q2=Math.sqrt(_n2);const _r2=_q2+1;const _s2=_q2-1;const _t2=_r2*_p2;const _u2=_s2*_p2;const _v2=_r2-_u2;const _w2=_r2+_u2;const alpha=Math.sin(_o2)/(2*_m2);const _x2=(2*Math.sqrt(_q2)*alpha);const _y2=_v2+_x2;const _52=2*(_s2-_t2);const _62=_v2-_x2;const _72=_q2*(_w2+_x2);const _82=-2*_q2*(_s2+_t2);const _92=_q2*(_w2-_x2);this._52=_52/_y2;
this._62=_62/_y2;this._72=_72/_y2;this._82=_82/_y2;this._92=_92/_y2;this._e2=_l2;this._f2=_m2;this._g2=_n2;}}registerProcessor("hi-shelf-processor",_32);class _z2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _A2=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(1500.0,_A2),minValue:10.0,maxValue:_A2},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}
];}constructor(_Y){super();this._I();const _Z=_Y.outputChannelCount[0];this._52=0;this._62=0;this._72=0;this._82=0;this._92=0;this._a2=new Float32Array(_Z);this._b2=new Float32Array(_Z);this._c2=new Float32Array(_Z);this._d2=new Float32Array(_Z);this._B2=-1;this._f2=-1;}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _h2=(cutoff.length===1&&q.length===1);if(_h2)this._i2(cutoff[0],q[0]);for(let c=0;c<input.length;
++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){if(_h2===false){const c=(cutoff[_P]!==undefined)?cutoff[_P]:cutoff[0];const _j2=(q[_P]!==undefined)?q[_P]:q[0];this._i2(c,_j2);}const _k2=this._72*_O[_P]+this._82*this._a2[c]+this._92*this._b2[c]-this._52*this._c2[c]-this._62*this._d2[c];this._b2[c]=this._a2[c];this._a2[c]=_O[_P];this._d2[c]=this._c2[c];this._c2[c]=_k2;const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];_U[_P]=(_Q>0)?_O[_P]:_k2;}}return this._J;}_i2(_C2,_m2){if(_C2===this._B2&&_m2===this._f2)return;
const _o2=2*Math.PI*_C2/sampleRate;const alpha=Math.sin(_o2)/(2*_m2);const _p2=Math.cos(_o2);const _y2=1+alpha;const _52=-2*_p2;const _62=1-alpha;const _72=(1+_p2)/2;const _82=-1-_p2;const _92=(1+_p2)/2;this._52=_52/_y2;this._62=_62/_y2;this._72=_72/_y2;this._82=_82/_y2;this._92=_92/_y2;this._B2=_C2;this._f2=_m2;}}registerProcessor("hpf2-processor",_z2);class _D2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _42=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,
minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(500.0,_42),minValue:10.0,maxValue:_42},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_Y){super();this._I();const _Z=_Y.outputChannelCount[0];this._52=0;this._62=0;this._72=0;this._82=0;this._92=0;this._a2=new Float32Array(_Z);this._b2=new Float32Array(_Z);this._c2=new Float32Array(_Z);this._d2=new Float32Array(_Z);
this._e2=-1;this._f2=-1;this._g2=-1;}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _h2=(freq.length===1&&q.length===1&&gain.length===1);if(_h2)this._i2(freq[0],q[0],gain[0]);for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){if(_h2===false){const _11=(freq[_P]!==undefined)?freq[_P]:freq[0];const _j2=(q[_P]!==undefined)?q[_P]:q[0];const _V=(gain[_P]!==undefined)?gain[_P]:gain[0];
this._i2(_11,_j2,_V);}const _k2=this._72*_O[_P]+this._82*this._a2[c]+this._92*this._b2[c]-this._52*this._c2[c]-this._62*this._d2[c];this._b2[c]=this._a2[c];this._a2[c]=_O[_P];this._d2[c]=this._c2[c];this._c2[c]=_k2;const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];_U[_P]=(_Q>0)?_O[_P]:_k2;}}return this._J;}_i2(_l2,_m2,_n2){if(_l2===this._e2&&_m2===this._f2&&_n2===this._g2)return;const _o2=2*Math.PI*_l2/sampleRate;const _p2=Math.cos(_o2);const _q2=Math.sqrt(_n2);const _r2=_q2+1;const _s2=_q2-1;const _t2=_r2*_p2;
const _u2=_s2*_p2;const _v2=_r2-_u2;const _w2=_r2+_u2;const alpha=Math.sin(_o2)/(2*_m2);const _x2=(2*Math.sqrt(_q2)*alpha);const _y2=_w2+_x2;const _52=-2*(_s2+_t2);const _62=_w2-_x2;const _72=_q2*(_v2+_x2);const _82=2*_q2*(_s2-_t2);const _92=_q2*(_v2-_x2);this._52=_52/_y2;this._62=_62/_y2;this._72=_72/_y2;this._82=_82/_y2;this._92=_92/_y2;this._e2=_l2;this._f2=_m2;this._g2=_n2;}}registerProcessor("lo-shelf-processor",_D2);class _E2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _A2=sampleRate*0.45;
return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"cutoff",automationRate:"a-rate",defaultValue:Math.min(500.0,_A2),minValue:10.0,maxValue:_A2},{name:"q",automationRate:"a-rate",defaultValue:1.5,minValue:1.0,maxValue:100.0}];}constructor(_Y){super();this._I();const _Z=_Y.outputChannelCount[0];this._52=0;this._62=0;this._72=0;this._82=0;this._92=0;this._a2=new Float32Array(_Z);this._b2=new Float32Array(_Z);this._c2=new Float32Array(_Z);this._d2=new Float32Array(_Z);
this._B2=-1;this._f2=-1;}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const cutoff=parameters.cutoff;const q=parameters.q;const _h2=(cutoff.length===1&&q.length===1);if(_h2)this._i2(cutoff[0],q[0]);for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){if(_h2===false){const c=(cutoff[_P]!==undefined)?cutoff[_P]:cutoff[0];const _j2=(q[_P]!==undefined)?q[_P]:q[0];this._i2(c,_j2);}const _k2=this._72*_O[_P]+this._82*this._a2[c]+this._92*this._b2[c]-this._52*this._c2[c]-this._62*this._d2[c];
this._b2[c]=this._a2[c];this._a2[c]=_O[_P];this._d2[c]=this._c2[c];this._c2[c]=_k2;const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];_U[_P]=(_Q>0)?_O[_P]:_k2;}}return this._J;}_i2(_C2,_m2){if(_C2===this._B2&&_m2===this._f2)return;const _o2=2*Math.PI*_C2/sampleRate;const alpha=Math.sin(_o2)/(2*_m2);const _p2=Math.cos(_o2);const _y2=1+alpha;const _52=-2*_p2;const _62=1-alpha;const _72=(1-_p2)/2;const _82=1-_p2;const _92=(1-_p2)/2;this._52=_52/_y2;this._62=_62/_y2;this._72=_72/_y2;this._82=_82/_y2;this._92=_92/_y2;
this._B2=_C2;this._f2=_m2;}}registerProcessor("lpf2-processor",_E2);class _F2 extends AudioWorkletProcessor{static get parameterDescriptors(){const _42=sampleRate*0.45;return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"freq",automationRate:"a-rate",defaultValue:Math.min(1500.0,_42),minValue:10.0,maxValue:_42},{name:"q",automationRate:"a-rate",defaultValue:1.0,minValue:1.0,maxValue:100.0},{name:"gain",automationRate:"a-rate",defaultValue:1e-2,minValue:1e-6}];}constructor(_Y){
super();this._I();const _Z=_Y.outputChannelCount[0];this._52=0;this._62=0;this._72=0;this._82=0;this._92=0;this._a2=new Float32Array(_Z);this._b2=new Float32Array(_Z);this._c2=new Float32Array(_Z);this._d2=new Float32Array(_Z);this._e2=-1;this._f2=-1;this._g2=-1;}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const freq=parameters.freq;const q=parameters.q;const gain=parameters.gain;const _h2=(freq.length===1&&q.length===1&&gain.length===1);if(_h2)this._i2(freq[0],
q[0],gain[0]);for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];for(let _P=0;_P<_O.length;++_P){if(_h2===false){const _11=(freq[_P]!==undefined)?freq[_P]:freq[0];const _j2=(q[_P]!==undefined)?q[_P]:q[0];const _V=(gain[_P]!==undefined)?gain[_P]:gain[0];this._i2(_11,_j2,_V);}const _k2=this._72*_O[_P]+this._82*this._a2[c]+this._92*this._b2[c]-this._52*this._c2[c]-this._62*this._d2[c];this._b2[c]=this._a2[c];this._a2[c]=_O[_P];this._d2[c]=this._c2[c];this._c2[c]=_k2;const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];
_U[_P]=(_Q>0)?_O[_P]:_k2;}}return this._J;}_i2(_l2,_m2,_n2){if(_l2===this._e2&&_m2===this._f2&&_n2===this._g2)return;const _o2=2*Math.PI*_l2/sampleRate;const _p2=Math.cos(_o2);const _q2=Math.sqrt(_n2);const alpha=Math.sin(_o2)/(2*_m2);const _G2=alpha/_q2;const _H2=alpha*_q2;const _y2=1+_G2;const _52=-2*_p2;const _62=1-_G2;const _72=1+_H2;const _82=_52;const _92=1-_H2;this._52=_52/_y2;this._62=_62/_y2;this._72=_72/_y2;this._82=_82/_y2;this._92=_92/_y2;this._e2=_l2;this._f2=_m2;this._g2=_n2;}}registerProcessor("peak-eq-processor",
_F2);class _I2{constructor(_J2){this._K2=0;this._L2=0;this.feedback=0;this._M2=0;this.buffer=new Float32Array(_J2);this._N2=0;}process(_R1){const out=this.buffer[this._N2];this._M2=(this._M2*this._K2)+(out*this._L2);this.buffer[this._N2]=_R1+(this._M2*this.feedback);++this._N2;this._N2%=this.buffer.length;return out;}_O2(_P2){this.feedback=Math.min(Math.max(0,_P2),1);}_Q2(_R2){this._K2=Math.min(Math.max(0,_R2),1);this._L2=1-this._K2;}}class _S2{constructor(_J2){this.feedback=0;this.buffer=new Float32Array(_J2);
this._N2=0;}process(_R1){const out=this.buffer[this._N2];this.buffer[this._N2]=_R1+(out*this.feedback);++this._N2;this._N2%=this.buffer.length;return(out-_R1);}_O2(_P2){this.feedback=Math.min(Math.max(0,_P2),1);}}class _T2 extends AudioWorkletProcessor{static _U2=8;static _V2=4;static _W2=0.015;static _X2=0.4;static _Y2=0.28;static _Z2=0.7;static __2=[1116,1188,1277,1356,1422,1491,1557,1617];static _03=[1139,1211,1300,1379,1445,1514,1580,1640];static _13=[556,441,341,225];static _23=[579,464,364,248];static get parameterDescriptors(){
return [{name:"bypass",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"size",automationRate:"a-rate",defaultValue:0.7,minValue:0.0,maxValue:1.0},{name:"damp",automationRate:"a-rate",defaultValue:0.1,minValue:0.0,maxValue:1.0},{name:"mix",automationRate:"a-rate",defaultValue:0.35,minValue:0.0,maxValue:1.0}];}constructor(_Y){super();this._I();const _Z=_Y.outputChannelCount[0];this._33=-1;this._43=-1;this._53=new Array(_Z);this._63=new Array(_Z);const _73=[_T2.__2,_T2._03];const _83=[_T2._13,
_T2._23];for(let c=0;c<_Z;++c){this._53[c]=new Array(_T2._U2);this._63[c]=new Array(_T2._V2);for(let i=0;i<_T2._U2;++i)this._53[c][i]=new _I2(_73[c%_73.length][i]);for(let i=0;i<_T2._V2;++i)this._63[c][i]=new _S2(_83[c%_83.length][i]);}this._93(0.5);this._Q2(0.5);for(let c=0;c<_Z;++c)for(let i=0;i<_T2._V2;++i)this._63[c][i]._O2(0.5);}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const size=parameters.size;const damp=parameters.damp;const mix=parameters.mix;for(let c=0;
c<input.length;++c){const _O=input[c];const _U=output[c];for(let _a3=0;_a3<_O.length;++_a3){const _P=(size[_a3]!==undefined)?size[_a3]:size[0];const _b3=(damp[_a3]!==undefined)?damp[_a3]:damp[0];this._93(_P);this._Q2(_b3);_U[_a3]=_O[_a3];let out=0;const _21=_O[_a3]*_T2._W2;for(let i=0;i<_T2._U2;++i)out+=this._53[c][i].process(_21);for(let i=0;i<_T2._V2;++i)out=this._63[c][i].process(out);const _Q=(bypass[_a3]!==undefined)?bypass[_a3]:bypass[0];if(_Q>0.0){continue;}const _41=(mix[_a3]!==undefined)?mix[_a3]:mix[0];
_U[_a3]*=(1-_41);_U[_a3]+=(out*_41);}}return this._J;}_93(_J2){if(_J2===this._33)return;const size=(_J2*_T2._Y2)+_T2._Z2;for(let c=0;c<this._53.length;++c)for(let i=0;i<_T2._U2;++i)this._53[c][i]._O2(size);this._33=_J2;}_Q2(_R2){if(_R2===this._43)return;const damp=_R2*_T2._X2;for(let c=0;c<this._53.length;++c)for(let i=0;i<_T2._U2;++i)this._53[c][i]._Q2(damp);this._43=_R2;}}registerProcessor("reverb1-processor",_T2);class _c3 extends AudioWorkletProcessor{static get parameterDescriptors(){return [{name:"bypass",
automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"rate",automationRate:"a-rate",defaultValue:5.0,minValue:0.0,maxValue:20.0},{name:"intensity",automationRate:"a-rate",defaultValue:1.0,minValue:0.0,maxValue:1.0},{name:"offset",automationRate:"a-rate",defaultValue:0.0,minValue:0.0,maxValue:1.0},{name:"shape",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:4}];}constructor(_Y){super();this._I();const _Z=_Y.outputChannelCount[0];this._d3=new Array(_Z).fill(1.0);this._e3=new Array(_Z).fill(0.0);
this._f3=new Array(_Z).fill(_g3._h3._i3);this._j3=new Array(_Z);for(let c=0;c<_Z;++c){this._j3[c]=new _k3();this._j3[c]._l3(sampleRate);this._j3[c]._m3(this._d3[c]);this._j3[c]._n3(this._f3[c]);if(c%2===1){this._j3[c]._o3(this._e3[c]);}}}process(_M,_N,parameters){const input=_M[0];const output=_N[0];const bypass=parameters.bypass;const rate=parameters.rate;const intensity=parameters.intensity;const offset=parameters.offset;const shape=parameters.shape;for(let c=0;c<input.length;++c){const _O=input[c];const _U=output[c];
for(let _P=0;_P<_O.length;++_P){_U[_P]=_O[_P];const _31=(rate[_P]!==undefined)?rate[_P]:rate[0];const _p3=(offset[_P]!==undefined)?offset[_P]:offset[0];const _q3=(shape[_P]!==undefined)?shape[_P]:shape[0];this._r3(c,_31,_p3,_q3);const _s3=this._j3[c]._J1();const _Q=(bypass[_P]!==undefined)?bypass[_P]:bypass[0];if(_Q>0.0){continue;}const i=(intensity[_P]!==undefined)?intensity[_P]:intensity[0];const out=_O[_P]*_s3*i;_U[_P]*=(1.0-i);_U[_P]+=out;}}return this._J;}_r3(_L1,_t3,_u3,_v3){if(_t3!==this._d3[_L1]){
this._j3[_L1]._m3(_t3);this._d3[_L1]=_t3;}if(_u3!==this._e3[_L1]){if(_L1%2===1){this._j3[_L1]._o3(_u3);}this._e3[_L1]=_u3;}if(_v3!==this._f3[_L1]){this._j3[_L1]._n3(_v3);this._f3[_L1]=_v3;}}}registerProcessor("tremolo-processor",_c3);function _g3(){}_g3._h3={_i3:0,_w3:1,_x3:2,_y3:3,_z3:4,_A3:5};_g3._B3=function(_C3){return 1.0-_C3;};_g3._D3=function(_C3){return _C3;};_g3._E3=function(_C3){return 0.5*(Math.sin((_C3*2.0*Math.PI)-(Math.PI/2.0))+1.0);};_g3._F3=function(_C3){if(_C3<0.5){return 0.0;}return 1.0;
};_g3._G3=function(_C3){if(_C3<0.5){return 2.0*_C3;}return 2.0-(2.0*_C3);};_g3._H3=[_g3._B3,_g3._D3,_g3._E3,_g3._F3,_g3._G3];_I3._J3=512;_I3._K3=1.0/_I3._J3;function _I3(_L3){this.data=new Float32Array(_I3._J3);for(let i=0;i<_I3._J3;++i){this.data[i]=_L3(i*_I3._K3);}}_I3.prototype._J1=function(_C3){_C3=Math.max(0.0,_C3);_C3=Math.min(_C3,1.0);const _M3=_C3*_I3._J3;const _N3=~~_M3;const _O3=_M3-_N3;let _N1=_N3;let _O1=_N1+1;if(_N1>=_I3._J3){_N1-=_I3._J3;}if(_O1>=_I3._J3){_O1-=_I3._J3;}const _P1=this.data[_N1];
const _Q1=this.data[_O1];return _P1+(_Q1-_P1)*_O3;};_k3._P3=[];_k3._Q3=false;_k3._R3=0.0;_k3._42=20.0;function _k3(){this._S3=48000;this.shape=_g3._h3._x3;this.freq=1.0;this._T3=0.0;this._K3=0.0;this._U3=0.0;if(_k3._Q3==true){return;}for(let i=0;i<_g3._h3._A3;++i){_k3._P3[i]=new _I3(_g3._H3[i]);}_k3._Q3=true;}_k3._V3=function(){return(_k3._Q3==true);};_k3.prototype._l3=function(_W3){this._S3=_W3;this._X3();};_k3.prototype._m3=function(_l2){_l2=Math.max(_k3._R3,_l2);_l2=Math.min(_l2,_k3._42);this.freq=_l2;
this._X3();};_k3.prototype._o3=function(_u3){_u3=Math.max(0.0,_u3);_u3=Math.min(_u3,1.0);const _Y3=_u3-this._U3;this._U3=_u3;this._T3+=_Y3;while(this._T3>=1.0){this._T3-=1.0;}while(this._T3<0.0){this._T3+=1.0;}};_k3.prototype._n3=function(_v3){_v3=Math.max(0,_v3);_v3=Math.min(_v3,_g3._h3._A3-1);this.shape=_v3;};_k3.prototype._J1=function(){const result=_k3._P3[this.shape]._J1(this._T3);this._T3+=this._K3;while(this._T3>=1.0){this._T3-=1.0;}return result;};_k3.prototype._X3=function(){this._K3=this.freq/this._S3;
};