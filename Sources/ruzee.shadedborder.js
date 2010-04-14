/**
 * RUZEE.ShadedBorder 0.6.2
 * (c) 2006 Steffen Rusitschka
 *
 * RUZEE.ShadedBorder is freely distributable under the terms of an MIT-style license.
 * For details, see http://www.ruzee.com/
 */
var RUZEE=window.RUZEE||{};RUZEE.ShadedBorder={create:function(v){var o=/msie/i.test(navigator.userAgent)&&!window.opera;var F=o&&!window.XMLHttpRequest;function x(p,b){for(k in b){if(/ie_/.test(k)){if(o){p.style[k.substr(3)]=b[k]}}else{p.style[k]=b[k]}}}function A(p){var b=document.createElement("div");b.className="sb-gen";x(b,p);return b}function y(b){b=b<0?0:b;if(b>0.99999){return""}return o?" filter:alpha(opacity="+(b*100)+");":" opacity:"+b+";"}var j=v.shadow||0;var G=v.corner||0;var h=0;var g=v.border||0;var i=v.borderOpacity||1;var C=j!=0;var u=G>j?G:j;var w=u;var c=u;var M=u;if(g>0){h=G;G=G-g}var n=G!=0&&C?Math.round(u/3):0;var m=n;var s=Math.round(n/2);var q=G>0?"sb-inner":"sb-shadow";var z="sb-shadow";var J="sb-border";var l=v.edges||"trlb";if(!/t/i.test(l)){c=0}if(!/b/i.test(l)){M=0}if(!/l/i.test(l)){u=0}if(!/r/i.test(l)){w=0}var I={position:"absolute",left:"0",top:"0",width:u+"px",height:c+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"};var a=A(I);delete I.left;I.right="0";I.width=w+"px";var N=A(I);delete I.top;I.bottom="0";I.height=M+"px";var H=A(I);delete I.right;I.left="0";I.width=u+"px";var K=A(I);var L=A({position:"absolute",width:"100%",height:c+"px",ie_fontSize:"1px",top:"0",left:"0",overflow:"hidden",margin:"0",padding:"0"});var E=A({position:"relative",height:c+"px",ie_fontSize:"1px",margin:"0 "+w+"px 0 "+u+"px",overflow:"hidden",padding:"0"});L.appendChild(E);var D=A({position:"absolute",left:"0",bottom:"0",width:"100%",height:M+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"});var O=A({position:"relative",height:M+"px",ie_fontSize:"1px",margin:"0 "+w+"px 0 "+u+"px",overflow:"hidden",padding:"0"});D.appendChild(O);var f=A({position:"absolute",top:(-M)+"px",left:"0",width:"100%",height:"100%",overflow:"hidden",ie_fontSize:"1px",padding:"0",margin:"0"});function B(P,Y,ac){var V=ac?u:w;var af=Y?c:M;var Z=Y?s:-s;var S=[];var Q=[];var b=[];var W=0;var ad=1;if(ac){W=V-1;ad=-1}for(var U=0;U<V;++U){var ag=af-1;var p=-1;if(Y){ag=0;p=1}var R=false;for(var T=af-1;T>=0&&!R;--T){var aa='<div style="position:absolute; top:'+ag+"px; left:"+W+"px; width:1px; height:1px; overflow:hidden; margin:0; padding:0;";var ae=U-n;var r=T-m-Z;var ah=Math.sqrt(ae*ae+r*r);var X=false;if(G>0){if(ae<0&&r<h&&r>=G||r<0&&ae<h&&ae>=G){S.push(aa+y(i)+'" class="'+J+'"></div>')}else{if(ah<h&&ah>=G-1&&ae>=0&&r>=0){var ai=aa;if(ah>=h-1){ai+=y((h-ah)*i);X=true}else{ai+=y(i)}S.push(ai+'" class="'+J+'"></div>')}}var ai=aa+" z-index:2;"+(Y?"background-position:0 -"+(G-r-1)+"px;":"background-image:none;");var ab=function(){if(!Y){ai=ai.replace(/top\:\d+px/,"top:0px")}ai=ai.replace(/height\:1px/,"height:"+(T+1)+"px");Q.push(ai+'" class="'+q+'"></div>');R=true};if(ae<0&&r<G||r<0&&ae<G){ab()}else{if(ah<G&&ae>=0&&r>=0){if(ah>=G-1){ai+=y(G-ah);X=true;Q.push(ai+'" class="'+q+'"></div>')}else{ab()}}else{X=true}}}else{X=true}if(j>0&&X){ah=Math.sqrt(U*U+T*T);if(ah<j){b.push(aa+" z-index:0; "+y(1-(ah/j))+'" class="'+z+'"></div>')}}ag+=p}W+=ad}P.innerHTML=b.concat(S.concat(Q)).join("")}function d(P){var t=[];t.push('<div style="position:relative; top:'+(c+M)+"px; height:2048px;  margin:0 "+(w-G-n)+"px 0 "+(u-G-n)+"px;  padding:0; overflow:hidden; background-position:0 "+(c>0?-(G+m+s):"0")+'px;" class="'+q+'"></div>');var p='<div style="position:absolute; width:1px; top:'+(c+M)+"px; height:2048px; padding:0; margin:0;";if(j>0){for(var b=0;b<u-G-n;++b){t.push(p+" left:"+b+"px;"+y((b+1)/u)+'" class="'+z+'"></div>')}for(var b=0;b<w-G-n;++b){t.push(p+" right:"+b+"px;"+y((b+1)/w)+'" class="'+z+'"></div>')}}if(g>0){var r=" width:"+g+"px;"+y(i)+'" class="'+J+'"></div>';t.push(p+" left:"+(u-h-n)+"px;"+r);t.push(p+" right:"+(w-h-n)+"px;"+r)}P.innerHTML=t.join("")}function e(Q,p){var R=[];var P=p?c:M;var b='<div style="height:1px; overflow:hidden; position:absolute; margin:0; padding:0; width:100%; left:0px; ';var r=p?s:-s;for(var S=0;S<P-r-m-G;++S){if(j>0){R.push(b+(p?"top:":"bottom:")+S+"px;"+y((S+1)*1/P)+'" class="'+z+'"></div>')}}if(S>=g){R.push(b+(p?"top:":"bottom:")+(S-g)+"px;"+y(i)+" height:"+g+'px;" class="'+J+'"></div>')}R.push(b+(p?"background-position-y:0; top:":"background-image:none; bottom:")+S+"px; height:"+(G+m+r)+'px;" class="'+q+'"></div>');Q.innerHTML=R.join("")}B(a,true,true);B(N,true,false);B(K,false,true);B(H,false,false);d(f);e(E,true);e(O,false);needsCloning=false;return{render:function(p){if(typeof p=="string"){p=document.getElementById(p)}if(p.length!=undefined){for(var T=0;T<p.length;++T){this.render(p[T])}return}p.className+=" sb";x(p,{position:"relative",background:"transparent"});var t=p.firstChild;while(t){var R=t.nextSibling;if(t.nodeType==1&&t.className=="sb-gen"){p.removeChild(t)}t=R}var X=p.firstChild;var U=needsCloning?L.cloneNode(true):L;var W=needsCloning?f.cloneNode(true):f;var V=needsCloning?D.cloneNode(true):D;var Q=needsCloning?a.cloneNode(true):a;var r=needsCloning?N.cloneNode(true):N;var S=needsCloning?K.cloneNode(true):K;var P=needsCloning?H.cloneNode(true):H;p.insertBefore(Q,X);p.insertBefore(r,X);p.insertBefore(S,X);p.insertBefore(P,X);p.insertBefore(U,X);p.insertBefore(W,X);p.insertBefore(V,X);if(F){p.onmouseover=function(){this.className+=" hover"};p.onmouseout=function(){this.className=this.className.replace(/ hover/,"")}}if(o){function b(){U.style.width=V.style.width=W.style.width=p.offsetWidth+"px";if(F){W.firstChild.style.height=p.offsetHeight+"px"}else{for(var Y=0;Y<W.childNodes.length;++Y){W.childNodes[Y].style.height=(p.offsetHeight-M-c)+"px"}}r.style.right=P.style.right=null;r.style.left=P.style.left=(p.offsetWidth-w)+"px"}p.onresize=b;b()}needsCloning=true}}}};document.write('<style type="text/css">.sb,.sbi,.sb *,.sbi *{position:relative;z-index:1;}* html .sb,* html .sbi{height:1%;}.sbi{display:inline-block;}.sb-inner{background:#ddd;}.sb-shadow{background:#000;}.sb-border{background:#bbb;}</style>');