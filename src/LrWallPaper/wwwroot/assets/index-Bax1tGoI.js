var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function ee(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function te(e,t){return ee(e.type,t,e.props)}function E(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function D(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ne=/\/+/g;function O(e,t){return typeof e==`object`&&e&&e.key!=null?D(``+e.key):t.toString(36)}function k(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function re(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,re(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+O(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ne,`$&/`)+`/`),re(o,r,i,``,function(e){return e})):o!=null&&(E(o)&&(o=te(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+O(a,u),c+=re(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+O(a,u++),c+=re(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return re(k(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ie(e,t,n){if(e==null)return e;var r=[],i=0;return re(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function A(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var j=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},M={map:ie,forEach:function(e,t,n){ie(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ie(e,function(){t++}),t},toArray:function(e){return ie(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=M,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ee(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ee(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=E,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:A}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,j)}catch(e){j(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.4`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,E());else{var t=n(l);t!==null&&O(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function ee(){return g?!0:!(e.unstable_now()-T<w)}function te(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ee());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&O(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?E():S=!1}}}var E;if(typeof y==`function`)E=function(){y(te)};else if(typeof MessageChannel<`u`){var D=new MessageChannel,ne=D.port2;D.port1.onmessage=te,E=function(){ne.postMessage(null)}}else E=function(){_(te,0)};function O(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,O(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,E()))),r},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.4`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),ee=Symbol.for(`react.suspense_list`),te=Symbol.for(`react.memo`),E=Symbol.for(`react.lazy`),D=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),O=Symbol.iterator;function k(e){return typeof e!=`object`||!e?null:(e=O&&e[O]||e[`@@iterator`],typeof e==`function`?e:null)}var re=Symbol.for(`react.client.reference`);function ie(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===re?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case ee:return`SuspenseList`;case D:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case te:return t=e.displayName||null,t===null?ie(e.type)||`Memo`:t;case E:t=e._payload,e=e._init;try{return ie(e(t))}catch{}}return null}var A=Array.isArray,j=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,M=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,N={pending:!1,data:null,method:null,action:null},ae=[],P=-1;function oe(e){return{current:e}}function F(e){0>P||(e.current=ae[P],ae[P]=null,P--)}function I(e,t){P++,ae[P]=e.current,e.current=t}var se=oe(null),ce=oe(null),le=oe(null),ue=oe(null);function de(e,t){switch(I(le,t),I(ce,e),I(se,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}F(se),I(se,e)}function fe(){F(se),F(ce),F(le)}function pe(e){e.memoizedState!==null&&I(ue,e);var t=se.current,n=Hd(t,e.type);t!==n&&(I(ce,e),I(se,n))}function me(e){ce.current===e&&(F(se),F(ce)),ue.current===e&&(F(ue),Qf._currentValue=N)}var he,ge;function _e(e){if(he===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);he=t&&t[1]||``,ge=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+he+e+ge}var ve=!1;function ye(e,t){if(!e||ve)return``;ve=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{ve=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?_e(n):``}function be(e,t){switch(e.tag){case 26:case 27:case 5:return _e(e.type);case 16:return _e(`Lazy`);case 13:return e.child!==t&&t!==null?_e(`Suspense Fallback`):_e(`Suspense`);case 19:return _e(`SuspenseList`);case 0:case 15:return ye(e.type,!1);case 11:return ye(e.type.render,!1);case 1:return ye(e.type,!0);case 31:return _e(`Activity`);default:return``}}function xe(e){try{var t=``,n=null;do t+=be(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Se=Object.prototype.hasOwnProperty,Ce=t.unstable_scheduleCallback,we=t.unstable_cancelCallback,Te=t.unstable_shouldYield,Ee=t.unstable_requestPaint,De=t.unstable_now,Oe=t.unstable_getCurrentPriorityLevel,ke=t.unstable_ImmediatePriority,Ae=t.unstable_UserBlockingPriority,je=t.unstable_NormalPriority,Me=t.unstable_LowPriority,Ne=t.unstable_IdlePriority,Pe=t.log,Fe=t.unstable_setDisableYieldValue,Ie=null,Le=null;function Re(e){if(typeof Pe==`function`&&Fe(e),Le&&typeof Le.setStrictMode==`function`)try{Le.setStrictMode(Ie,e)}catch{}}var ze=Math.clz32?Math.clz32:He,Be=Math.log,Ve=Math.LN2;function He(e){return e>>>=0,e===0?32:31-(Be(e)/Ve|0)|0}var Ue=256,We=262144,Ge=4194304;function Ke(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function qe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ke(n))):i=Ke(o):i=Ke(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ke(n))):i=Ke(o)):i=Ke(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Je(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ye(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xe(){var e=Ge;return Ge<<=1,!(Ge&62914560)&&(Ge=4194304),e}function Ze(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Qe(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function $e(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-ze(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&et(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function et(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ze(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function tt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ze(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function nt(e,t){var n=t&-t;return n=n&42?1:rt(n),(n&(e.suspendedLanes|t))===0?n:0}function rt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function it(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function at(){var e=M.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function ot(e,t){var n=M.p;try{return M.p=e,t()}finally{M.p=n}}var st=Math.random().toString(36).slice(2),ct=`__reactFiber$`+st,lt=`__reactProps$`+st,ut=`__reactContainer$`+st,dt=`__reactEvents$`+st,ft=`__reactListeners$`+st,pt=`__reactHandles$`+st,mt=`__reactResources$`+st,ht=`__reactMarker$`+st;function gt(e){delete e[ct],delete e[lt],delete e[dt],delete e[ft],delete e[pt]}function _t(e){var t=e[ct];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ut]||n[ct]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ct])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function vt(e){if(e=e[ct]||e[ut]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function yt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function bt(e){var t=e[mt];return t||=e[mt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function xt(e){e[ht]=!0}var St=new Set,Ct={};function wt(e,t){Tt(e,t),Tt(e+`Capture`,t)}function Tt(e,t){for(Ct[e]=t,e=0;e<t.length;e++)St.add(t[e])}var Et=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Dt={},Ot={};function kt(e){return Se.call(Ot,e)?!0:Se.call(Dt,e)?!1:Et.test(e)?Ot[e]=!0:(Dt[e]=!0,!1)}function At(e,t,n){if(kt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function jt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Mt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Nt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Pt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ft(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function It(e){if(!e._valueTracker){var t=Pt(e)?`checked`:`value`;e._valueTracker=Ft(e,t,``+e[t])}}function Lt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Pt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Rt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var zt=/[\n"\\]/g;function Bt(e){return e.replace(zt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Vt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Nt(t)):e.value!==``+Nt(t)&&(e.value=``+Nt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Ut(e,o,Nt(n)):Ut(e,o,Nt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Nt(s):e.removeAttribute(`name`)}function Ht(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){It(e);return}n=n==null?``:``+Nt(n),t=t==null?n:``+Nt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),It(e)}function Ut(e,t,n){t===`number`&&Rt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Wt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Nt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Gt(e,t,n){if(t!=null&&(t=``+Nt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Nt(n)}function Kt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(A(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Nt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),It(e)}function qt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Jt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Yt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Jt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Xt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Yt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Yt(e,o,t[o])}function Zt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Qt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),$t=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function en(e){return $t.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function tn(){}var nn=null;function rn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var an=null,on=null;function sn(e){var t=vt(e);if(t&&(e=t.stateNode)){var n=e[lt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Vt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Bt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[lt]||null;if(!a)throw Error(i(90));Vt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Lt(r)}break a;case`textarea`:Gt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Wt(e,!!n.multiple,t,!1)}}}var cn=!1;function ln(e,t,n){if(cn)return e(t,n);cn=!0;try{return e(t)}finally{if(cn=!1,(an!==null||on!==null)&&(bu(),an&&(t=an,e=on,on=an=null,sn(t),e)))for(t=0;t<e.length;t++)sn(e[t])}}function un(e,t){var n=e.stateNode;if(n===null)return null;var r=n[lt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var dn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),fn=!1;if(dn)try{var pn={};Object.defineProperty(pn,`passive`,{get:function(){fn=!0}}),window.addEventListener(`test`,pn,pn),window.removeEventListener(`test`,pn,pn)}catch{fn=!1}var mn=null,hn=null,gn=null;function _n(){if(gn)return gn;var e,t=hn,n=t.length,r,i=`value`in mn?mn.value:mn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return gn=i.slice(e,1<r?1-r:void 0)}function vn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function yn(){return!0}function bn(){return!1}function xn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?yn:bn,this.isPropagationStopped=bn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=yn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=yn)},persist:function(){},isPersistent:yn}),t}var Sn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Cn=xn(Sn),wn=h({},Sn,{view:0,detail:0}),Tn=xn(wn),En,Dn,On,kn=h({},wn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==On&&(On&&e.type===`mousemove`?(En=e.screenX-On.screenX,Dn=e.screenY-On.screenY):Dn=En=0,On=e),En)},movementY:function(e){return`movementY`in e?e.movementY:Dn}}),An=xn(kn),jn=xn(h({},kn,{dataTransfer:0})),Mn=xn(h({},wn,{relatedTarget:0})),Nn=xn(h({},Sn,{animationName:0,elapsedTime:0,pseudoElement:0})),Pn=xn(h({},Sn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),L=xn(h({},Sn,{data:0})),Fn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},In={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},R={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Ln(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=R[e])?!!t[e]:!1}function Rn(){return Ln}var zn=xn(h({},wn,{key:function(e){if(e.key){var t=Fn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=vn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?In[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rn,charCode:function(e){return e.type===`keypress`?vn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?vn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Bn=xn(h({},kn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Vn=xn(h({},wn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rn})),Hn=xn(h({},Sn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Un=xn(h({},kn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Wn=xn(h({},Sn,{newState:0,oldState:0})),Gn=[9,13,27,32],Kn=dn&&`CompositionEvent`in window,qn=null;dn&&`documentMode`in document&&(qn=document.documentMode);var Jn=dn&&`TextEvent`in window&&!qn,Yn=dn&&(!Kn||qn&&8<qn&&11>=qn),Xn=` `,Zn=!1;function Qn(e,t){switch(e){case`keyup`:return Gn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function $n(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var er=!1;function tr(e,t){switch(e){case`compositionend`:return $n(t);case`keypress`:return t.which===32?(Zn=!0,Xn):null;case`textInput`:return e=t.data,e===Xn&&Zn?null:e;default:return null}}function nr(e,t){if(er)return e===`compositionend`||!Kn&&Qn(e,t)?(e=_n(),gn=hn=mn=null,er=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Yn&&t.locale!==`ko`?null:t.data;default:return null}}var rr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ir(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!rr[e.type]:t===`textarea`}function ar(e,t,n,r){an?on?on.push(r):on=[r]:an=r,t=Ed(t,`onChange`),0<t.length&&(n=new Cn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var or=null,sr=null;function cr(e){yd(e,0)}function lr(e){if(Lt(yt(e)))return e}function ur(e,t){if(e===`change`)return t}var dr=!1;if(dn){var fr;if(dn){var pr=`oninput`in document;if(!pr){var mr=document.createElement(`div`);mr.setAttribute(`oninput`,`return;`),pr=typeof mr.oninput==`function`}fr=pr}else fr=!1;dr=fr&&(!document.documentMode||9<document.documentMode)}function z(){or&&(or.detachEvent(`onpropertychange`,hr),sr=or=null)}function hr(e){if(e.propertyName===`value`&&lr(sr)){var t=[];ar(t,sr,e,rn(e)),ln(cr,t)}}function gr(e,t,n){e===`focusin`?(z(),or=t,sr=n,or.attachEvent(`onpropertychange`,hr)):e===`focusout`&&z()}function _r(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return lr(sr)}function vr(e,t){if(e===`click`)return lr(t)}function yr(e,t){if(e===`input`||e===`change`)return lr(t)}function br(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var xr=typeof Object.is==`function`?Object.is:br;function Sr(e,t){if(xr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Se.call(t,i)||!xr(e[i],t[i]))return!1}return!0}function Cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wr(e,t){var n=Cr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Cr(n)}}function Tr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Tr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Er(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Rt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Rt(e.document)}return t}function Dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Or=dn&&`documentMode`in document&&11>=document.documentMode,kr=null,Ar=null,jr=null,Mr=!1;function Nr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mr||kr==null||kr!==Rt(r)||(r=kr,`selectionStart`in r&&Dr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),jr&&Sr(jr,r)||(jr=r,r=Ed(Ar,`onSelect`),0<r.length&&(t=new Cn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=kr)))}function Pr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Fr={animationend:Pr(`Animation`,`AnimationEnd`),animationiteration:Pr(`Animation`,`AnimationIteration`),animationstart:Pr(`Animation`,`AnimationStart`),transitionrun:Pr(`Transition`,`TransitionRun`),transitionstart:Pr(`Transition`,`TransitionStart`),transitioncancel:Pr(`Transition`,`TransitionCancel`),transitionend:Pr(`Transition`,`TransitionEnd`)},Ir={},Lr={};dn&&(Lr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),`TransitionEvent`in window||delete Fr.transitionend.transition);function Rr(e){if(Ir[e])return Ir[e];if(!Fr[e])return e;var t=Fr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Lr)return Ir[e]=t[n];return e}var zr=Rr(`animationend`),Br=Rr(`animationiteration`),Vr=Rr(`animationstart`),Hr=Rr(`transitionrun`),Ur=Rr(`transitionstart`),Wr=Rr(`transitioncancel`),Gr=Rr(`transitionend`),Kr=new Map,qr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);qr.push(`scrollEnd`);function Jr(e,t){Kr.set(e,t),wt(t,[e])}var Yr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Xr=[],Zr=0,Qr=0;function $r(){for(var e=Zr,t=Qr=Zr=0;t<e;){var n=Xr[t];Xr[t++]=null;var r=Xr[t];Xr[t++]=null;var i=Xr[t];Xr[t++]=null;var a=Xr[t];if(Xr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ri(n,i,a)}}function ei(e,t,n,r){Xr[Zr++]=e,Xr[Zr++]=t,Xr[Zr++]=n,Xr[Zr++]=r,Qr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ti(e,t,n,r){return ei(e,t,n,r),ii(e)}function ni(e,t){return ei(e,null,null,t),ii(e)}function ri(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-ze(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ii(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ai={};function oi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function si(e,t,n,r){return new oi(e,t,n,r)}function ci(e){return e=e.prototype,!(!e||!e.isReactComponent)}function li(e,t){var n=e.alternate;return n===null?(n=si(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ui(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function di(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ci(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,se.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case D:return e=si(31,n,t,a),e.elementType=D,e.lanes=o,e;case y:return fi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=si(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=si(13,n,t,a),e.elementType=T,e.lanes=o,e;case ee:return e=si(19,n,t,a),e.elementType=ee,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case te:s=14;break a;case E:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=si(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function fi(e,t,n,r){return e=si(7,e,r,t),e.lanes=n,e}function pi(e,t,n){return e=si(6,e,null,t),e.lanes=n,e}function mi(e){var t=si(18,null,null,0);return t.stateNode=e,t}function hi(e,t,n){return t=si(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var gi=new WeakMap;function _i(e,t){if(typeof e==`object`&&e){var n=gi.get(e);return n===void 0?(t={value:e,source:t,stack:xe(t)},gi.set(e,t),t):n}return{value:e,source:t,stack:xe(t)}}var vi=[],yi=0,bi=null,xi=0,Si=[],Ci=0,wi=null,Ti=1,Ei=``;function Di(e,t){vi[yi++]=xi,vi[yi++]=bi,bi=e,xi=t}function Oi(e,t,n){Si[Ci++]=Ti,Si[Ci++]=Ei,Si[Ci++]=wi,wi=e;var r=Ti;e=Ei;var i=32-ze(r)-1;r&=~(1<<i),n+=1;var a=32-ze(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ti=1<<32-ze(t)+i|n<<i|r,Ei=a+e}else Ti=1<<a|n<<i|r,Ei=e}function ki(e){e.return!==null&&(Di(e,1),Oi(e,1,0))}function Ai(e){for(;e===bi;)bi=vi[--yi],vi[yi]=null,xi=vi[--yi],vi[yi]=null;for(;e===wi;)wi=Si[--Ci],Si[Ci]=null,Ei=Si[--Ci],Si[Ci]=null,Ti=Si[--Ci],Si[Ci]=null}function ji(e,t){Si[Ci++]=Ti,Si[Ci++]=Ei,Si[Ci++]=wi,Ti=t.id,Ei=t.overflow,wi=e}var Mi=null,B=null,V=!1,Ni=null,Pi=!1,Fi=Error(i(519));function Ii(e){throw Hi(_i(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Fi}function Li(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ct]=e,t[lt]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Ht(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Kt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=tn),t=!0):t=!1,t||Ii(e,!0)}function Ri(e){for(Mi=e.return;Mi;)switch(Mi.tag){case 5:case 31:case 13:Pi=!1;return;case 27:case 3:Pi=!0;return;default:Mi=Mi.return}}function zi(e){if(e!==Mi)return!1;if(!V)return Ri(e),V=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&B&&Ii(e),Ri(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));B=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));B=uf(e)}else t===27?(t=B,Zd(e.type)?(e=lf,lf=null,B=e):B=t):B=Mi?cf(e.stateNode.nextSibling):null;return!0}function Bi(){B=Mi=null,V=!1}function Vi(){var e=Ni;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Ni=null),e}function Hi(e){Ni===null?Ni=[e]:Ni.push(e)}var Ui=oe(null),Wi=null,Gi=null;function Ki(e,t,n){I(Ui,t._currentValue),t._currentValue=n}function qi(e){e._currentValue=Ui.current,F(Ui)}function Ji(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Yi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ji(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ji(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Xi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;xr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ue.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Yi(t,e,n,r),t.flags|=262144}function Zi(e){for(e=e.firstContext;e!==null;){if(!xr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Qi(e){Wi=e,Gi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function $i(e){return ta(Wi,e)}function ea(e,t){return Wi===null&&Qi(e),ta(e,t)}function ta(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Gi===null){if(e===null)throw Error(i(308));Gi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Gi=Gi.next=t;return n}var na=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ra=t.unstable_scheduleCallback,ia=t.unstable_NormalPriority,aa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function oa(){return{controller:new na,data:new Map,refCount:0}}function sa(e){e.refCount--,e.refCount===0&&ra(ia,function(){e.controller.abort()})}var ca=null,la=0,ua=0,da=null;function fa(e,t){if(ca===null){var n=ca=[];la=0,ua=dd(),da={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return la++,t.then(pa,pa),t}function pa(){if(--la===0&&ca!==null){da!==null&&(da.status=`fulfilled`);var e=ca;ca=null,ua=0,da=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ma(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ha=j.S;j.S=function(e,t){eu=De(),typeof t==`object`&&t&&typeof t.then==`function`&&fa(e,t),ha!==null&&ha(e,t)};var ga=oe(null);function _a(){var e=ga.current;return e===null?q.pooledCache:e}function va(e,t){t===null?I(ga,ga.current):I(ga,t.pool)}function ya(){var e=_a();return e===null?null:{parent:aa._currentValue,pool:e}}var ba=Error(i(460)),xa=Error(i(474)),Sa=Error(i(542)),Ca={then:function(){}};function wa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ta(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(tn,tn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ka(e),e;default:if(typeof t.status==`string`)t.then(tn,tn);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ka(e),e}throw Da=t,ba}}function Ea(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Da=e,ba):e}}var Da=null;function Oa(){if(Da===null)throw Error(i(459));var e=Da;return Da=null,e}function ka(e){if(e===ba||e===Sa)throw Error(i(483))}var Aa=null,ja=0;function Ma(e){var t=ja;return ja+=1,Aa===null&&(Aa=[]),Ta(Aa,e,t)}function Na(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Pa(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Fa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=li(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=pi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===E&&Ea(i)===t.type)?(t=a(t,n.props),Na(t,n),t.return=e,t):(t=di(n.type,n.key,n.props,null,e.mode,r),Na(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=hi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=fi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=pi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=di(t.type,t.key,t.props,null,e.mode,n),Na(n,t),n.return=e,n;case v:return t=hi(t,e.mode,n),t.return=e,t;case E:return t=Ea(t),f(e,t,n)}if(A(t)||k(t))return t=fi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ma(t),n);if(t.$$typeof===C)return f(e,ea(e,t),n);Pa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case E:return n=Ea(n),p(e,t,n,r)}if(A(n)||k(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ma(n),r);if(n.$$typeof===C)return p(e,t,ea(e,n),r);Pa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case E:return r=Ea(r),m(e,t,n,r,i)}if(A(r)||k(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ma(r),i);if(r.$$typeof===C)return m(e,t,n,ea(t,r),i);Pa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),V&&Di(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return V&&Di(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),V&&Di(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),V&&Di(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return V&&Di(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),V&&Di(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===E&&Ea(l)===r.type){n(e,r.sibling),c=a(r,o.props),Na(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=fi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=di(o.type,o.key,o.props,null,e.mode,c),Na(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=hi(o,e.mode,c),c.return=e,e=c}return s(e);case E:return o=Ea(o),b(e,r,o,c)}if(A(o))return h(e,r,o,c);if(k(o)){if(l=k(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ma(o),c);if(o.$$typeof===C)return b(e,r,ea(e,o),c);Pa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=pi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ja=0;var i=b(e,t,n,r);return Aa=null,i}catch(t){if(t===ba||t===Sa)throw t;var a=si(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ia=Fa(!0),La=Fa(!1),Ra=!1;function za(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ba(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Va(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ha(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ii(e),ri(e,null,n),t}return ei(e,r,t,n),ii(e)}function Ua(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tt(e,n)}}function Wa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ga=!1;function Ka(){if(Ga){var e=da;if(e!==null)throw e}}function qa(e,t,n,r){Ga=!1;var i=e.updateQueue;Ra=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===ua&&(Ga=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ra=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Ja(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ya(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ja(n[e],t)}var Xa=oe(null),Za=oe(0);function Qa(e,t){e=Ul,I(Za,e),I(Xa,t),Ul=e|t.baseLanes}function $a(){I(Za,Ul),I(Xa,Xa.current)}function eo(){Ul=Za.current,F(Xa),F(Za)}var H=oe(null),to=null;function no(e){var t=e.alternate;I(so,so.current&1),I(H,e),to===null&&(t===null||Xa.current!==null||t.memoizedState!==null)&&(to=e)}function ro(e){I(so,so.current),I(H,e),to===null&&(to=e)}function io(e){e.tag===22?(I(so,so.current),I(H,e),to===null&&(to=e)):ao(e)}function ao(){I(so,so.current),I(H,H.current)}function oo(e){F(H),to===e&&(to=null),F(so)}var so=oe(0);function co(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var lo=0,U=null,W=null,uo=null,fo=!1,po=!1,mo=!1,ho=0,go=0,_o=null,vo=0;function yo(){throw Error(i(321))}function bo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!xr(e[n],t[n]))return!1;return!0}function xo(e,t,n,r,i,a){return lo=a,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,j.H=e===null||e.memoizedState===null?Ls:Rs,mo=!1,a=n(r,i),mo=!1,po&&(a=Co(t,n,r,i)),So(e),a}function So(e){j.H=Is;var t=W!==null&&W.next!==null;if(lo=0,uo=W=U=null,fo=!1,go=0,_o=null,t)throw Error(i(300));e===null||tc||(e=e.dependencies,e!==null&&Zi(e)&&(tc=!0))}function Co(e,t,n,r){U=e;var a=0;do{if(po&&(_o=null),go=0,po=!1,25<=a)throw Error(i(301));if(a+=1,uo=W=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}j.H=zs,o=t(n,r)}while(po);return o}function wo(){var e=j.H,t=e.useState()[0];return t=typeof t.then==`function`?jo(t):t,e=e.useState()[0],(W===null?null:W.memoizedState)!==e&&(U.flags|=1024),t}function To(){var e=ho!==0;return ho=0,e}function Eo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Do(e){if(fo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}fo=!1}lo=0,uo=W=U=null,po=!1,go=ho=0,_o=null}function Oo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return uo===null?U.memoizedState=uo=e:uo=uo.next=e,uo}function ko(){if(W===null){var e=U.alternate;e=e===null?null:e.memoizedState}else e=W.next;var t=uo===null?U.memoizedState:uo.next;if(t!==null)uo=t,W=e;else{if(e===null)throw U.alternate===null?Error(i(467)):Error(i(310));W=e,e={memoizedState:W.memoizedState,baseState:W.baseState,baseQueue:W.baseQueue,queue:W.queue,next:null},uo===null?U.memoizedState=uo=e:uo=uo.next=e}return uo}function Ao(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function jo(e){var t=go;return go+=1,_o===null&&(_o=[]),e=Ta(_o,e,t),t=U,(uo===null?t.memoizedState:uo.next)===null&&(t=t.alternate,j.H=t===null||t.memoizedState===null?Ls:Rs),e}function Mo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return jo(e);if(e.$$typeof===C)return $i(e)}throw Error(i(438,String(e)))}function No(e){var t=null,n=U.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=U.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Ao(),U.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function Po(e,t){return typeof t==`function`?t(e):t}function Fo(e){return Io(ko(),W,e)}function Io(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(lo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ua&&(d=!0);else if((lo&p)===p){u=u.next,p===ua&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,U.lanes|=p,Gl|=p;f=u.action,mo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,U.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!xr(o,e.memoizedState)&&(tc=!0,d&&(n=da,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Lo(e){var t=ko(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);xr(o,t.memoizedState)||(tc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ro(e,t,n){var r=U,a=ko(),o=V;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!xr((W||a).memoizedState,n);if(s&&(a.memoizedState=n,tc=!0),a=a.queue,cs(Vo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||uo!==null&&uo.memoizedState.tag&1){if(r.flags|=2048,rs(9,{destroy:void 0},Bo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||lo&127||zo(r,t,n)}return n}function zo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t=Ao(),U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Bo(e,t,n,r){t.value=n,t.getSnapshot=r,G(t)&&Ho(e)}function Vo(e,t,n){return n(function(){G(t)&&Ho(e)})}function G(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!xr(e,n)}catch{return!0}}function Ho(e){var t=ni(e,2);t!==null&&hu(t,e,2)}function Uo(e){var t=Oo();if(typeof e==`function`){var n=e;if(e=n(),mo){Re(!0);try{n()}finally{Re(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:e},t}function Wo(e,t,n,r){return e.baseState=n,Io(e,W,typeof r==`function`?r:Po)}function Go(e,t,n,r,a){if(Ns(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};j.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ko(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ko(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=j.T,o={};j.T=o;try{var s=n(i,r),c=j.S;c!==null&&c(o,s),qo(e,t,s)}catch(n){Yo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),j.T=a}}else try{a=n(i,r),qo(e,t,a)}catch(n){Yo(e,t,n)}}function qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Jo(e,t,n)},function(n){return Yo(e,t,n)}):Jo(e,t,n)}function Jo(e,t,n){t.status=`fulfilled`,t.value=n,Xo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ko(e,n)))}function Yo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Xo(t),t=t.next;while(t!==r)}e.action=null}function Xo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zo(e,t){return t}function Qo(e,t){if(V){var n=q.formState;if(n!==null){a:{var r=U;if(V){if(B){b:{for(var i=B,a=Pi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){B=cf(i.nextSibling),r=i.data===`F!`;break a}}Ii(r)}r=!1}r&&(t=n[0])}}return n=Oo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:t},n.queue=r,n=As.bind(null,U,r),r.dispatch=n,r=Uo(!1),a=Ms.bind(null,U,!1,r.queue),r=Oo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Go.bind(null,U,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function $o(e){return es(ko(),W,e)}function es(e,t,n){if(t=Io(e,t,Zo)[0],e=Fo(Po)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=jo(t)}catch(e){throw e===ba?Sa:e}else r=t;t=ko();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(U.flags|=2048,rs(9,{destroy:void 0},ts.bind(null,i,n),null)),[r,a,e]}function ts(e,t){e.action=t}function ns(e){var t=ko(),n=W;if(n!==null)return es(t,n,e);ko(),t=t.memoizedState,n=ko();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=U.updateQueue,t===null&&(t=Ao(),U.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function is(){return ko().memoizedState}function as(e,t,n,r){var i=Oo();U.flags|=e,i.memoizedState=rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function os(e,t,n,r){var i=ko();r=r===void 0?null:r;var a=i.memoizedState.inst;W!==null&&r!==null&&bo(r,W.memoizedState.deps)?i.memoizedState=rs(t,a,n,r):(U.flags|=e,i.memoizedState=rs(1|t,a,n,r))}function ss(e,t){as(8390656,8,e,t)}function cs(e,t){os(2048,8,e,t)}function ls(e){U.flags|=4;var t=U.updateQueue;if(t===null)t=Ao(),U.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function us(e){var t=ko().memoizedState;return ls({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ds(e,t){return os(4,2,e,t)}function fs(e,t){return os(4,4,e,t)}function ps(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ms(e,t,n){n=n==null?null:n.concat([e]),os(4,4,ps.bind(null,t,e),n)}function hs(){}function gs(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&bo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _s(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&bo(t,r[1]))return r[0];if(r=e(),mo){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r}function vs(e,t,n){return n===void 0||lo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),U.lanes|=e,Gl|=e,n)}function ys(e,t,n,r){return xr(n,t)?n:Xa.current===null?!(lo&42)||lo&1073741824&&!(Y&261930)?(tc=!0,e.memoizedState=n):(e=mu(),U.lanes|=e,Gl|=e,t):(e=vs(e,n,r),xr(e,t)||(tc=!0),e)}function bs(e,t,n,r,i){var a=M.p;M.p=a!==0&&8>a?a:8;var o=j.T,s={};j.T=s,Ms(e,!1,t,n);try{var c=i(),l=j.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?js(e,t,ma(c,r),pu(e)):js(e,t,r,pu(e))}catch(n){js(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{M.p=a,o!==null&&s.types!==null&&(o.types=s.types),j.T=o}}function xs(){}function Ss(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Cs(e).queue;bs(e,a,t,N,n===null?xs:function(){return ws(e),n(r)})}function Cs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:N,baseState:N,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:N},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ws(e){var t=Cs(e);t.next===null&&(t=e.alternate.memoizedState),js(e,t.next.queue,{},pu())}function Ts(){return $i(Qf)}function Es(){return ko().memoizedState}function Ds(){return ko().memoizedState}function Os(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Va(n);var r=Ha(t,e,n);r!==null&&(hu(r,t,n),Ua(r,t,n)),t={cache:oa()},e.payload=t;return}t=t.return}}function ks(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ns(e)?Ps(t,n):(n=ti(e,t,n,r),n!==null&&(hu(n,e,r),Fs(n,t,r)))}function As(e,t,n){js(e,t,n,pu())}function js(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ns(e))Ps(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,xr(s,o))return ei(e,t,i,0),q===null&&$r(),!1}catch{}if(n=ti(e,t,i,r),n!==null)return hu(n,e,r),Fs(n,t,r),!0}return!1}function Ms(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ns(e)){if(t)throw Error(i(479))}else t=ti(e,n,r,2),t!==null&&hu(t,e,2)}function Ns(e){var t=e.alternate;return e===U||t!==null&&t===U}function Ps(e,t){po=fo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tt(e,n)}}var Is={readContext:$i,use:Mo,useCallback:yo,useContext:yo,useEffect:yo,useImperativeHandle:yo,useLayoutEffect:yo,useInsertionEffect:yo,useMemo:yo,useReducer:yo,useRef:yo,useState:yo,useDebugValue:yo,useDeferredValue:yo,useTransition:yo,useSyncExternalStore:yo,useId:yo,useHostTransitionStatus:yo,useFormState:yo,useActionState:yo,useOptimistic:yo,useMemoCache:yo,useCacheRefresh:yo};Is.useEffectEvent=yo;var Ls={readContext:$i,use:Mo,useCallback:function(e,t){return Oo().memoizedState=[e,t===void 0?null:t],e},useContext:$i,useEffect:ss,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),as(4194308,4,ps.bind(null,t,e),n)},useLayoutEffect:function(e,t){return as(4194308,4,e,t)},useInsertionEffect:function(e,t){as(4,2,e,t)},useMemo:function(e,t){var n=Oo();t=t===void 0?null:t;var r=e();if(mo){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Oo();if(n!==void 0){var i=n(t);if(mo){Re(!0);try{n(t)}finally{Re(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ks.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=Oo();return e={current:e},t.memoizedState=e},useState:function(e){e=Uo(e);var t=e.queue,n=As.bind(null,U,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:hs,useDeferredValue:function(e,t){return vs(Oo(),e,t)},useTransition:function(){var e=Uo(!1);return e=bs.bind(null,U,e.queue,!0,!1),Oo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=U,a=Oo();if(V){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||zo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ss(Vo.bind(null,r,o,e),[e]),r.flags|=2048,rs(9,{destroy:void 0},Bo.bind(null,r,o,n,t),null),n},useId:function(){var e=Oo(),t=q.identifierPrefix;if(V){var n=Ei,r=Ti;n=(r&~(1<<32-ze(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=ho++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=vo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ts,useFormState:Qo,useActionState:Qo,useOptimistic:function(e){var t=Oo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ms.bind(null,U,!0,n),n.dispatch=t,[e,t]},useMemoCache:No,useCacheRefresh:function(){return Oo().memoizedState=Os.bind(null,U)},useEffectEvent:function(e){var t=Oo(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Rs={readContext:$i,use:Mo,useCallback:gs,useContext:$i,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Fo,useRef:is,useState:function(){return Fo(Po)},useDebugValue:hs,useDeferredValue:function(e,t){return ys(ko(),W.memoizedState,e,t)},useTransition:function(){var e=Fo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Es,useHostTransitionStatus:Ts,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){return Wo(ko(),W,e,t)},useMemoCache:No,useCacheRefresh:Ds};Rs.useEffectEvent=us;var zs={readContext:$i,use:Mo,useCallback:gs,useContext:$i,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Lo,useRef:is,useState:function(){return Lo(Po)},useDebugValue:hs,useDeferredValue:function(e,t){var n=ko();return W===null?vs(n,e,t):ys(n,W.memoizedState,e,t)},useTransition:function(){var e=Lo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Es,useHostTransitionStatus:Ts,useFormState:ns,useActionState:ns,useOptimistic:function(e,t){var n=ko();return W===null?(n.baseState=e,[e,n.queue.dispatch]):Wo(n,W,e,t)},useMemoCache:No,useCacheRefresh:Ds};zs.useEffectEvent=us;function Bs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Va(r);i.payload=t,n!=null&&(i.callback=n),t=Ha(e,i,r),t!==null&&(hu(t,e,r),Ua(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Va(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ha(e,i,r),t!==null&&(hu(t,e,r),Ua(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Va(n);r.tag=2,t!=null&&(r.callback=t),t=Ha(e,r,n),t!==null&&(hu(t,e,n),Ua(t,e,n))}};function Hs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Sr(n,r)||!Sr(i,a):!0}function Us(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vs.enqueueReplaceState(t,t.state,null)}function Ws(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Gs(e){Yr(e)}function Ks(e){console.error(e)}function qs(e){Yr(e)}function Js(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ys(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Xs(e,t,n){return n=Va(n),n.tag=3,n.payload={element:null},n.callback=function(){Js(e,t)},n}function Zs(e){return e=Va(e),e.tag=3,e}function Qs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ys(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ys(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function $s(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Xi(t,n,a,!0),n=H.current,n!==null){switch(n.tag){case 31:case 13:return to===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ca?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ca?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(V)return t=H.current,t===null?(r!==Fi&&(t=Error(i(423),{cause:r}),Hi(_i(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=_i(r,n),a=Xs(e.stateNode,r,a),Wa(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Fi&&(e=Error(i(422),{cause:r}),Hi(_i(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=_i(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=_i(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Xs(n.stateNode,r,e),Wa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Zs(a),Qs(a,e,n,r),Wa(n,a),!1}n=n.return}while(n!==null);return!1}var ec=Error(i(461)),tc=!1;function nc(e,t,n,r){t.child=e===null?La(t,null,n,r):Ia(t,e.child,n,r)}function rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Qi(t),r=xo(e,t,n,o,a,i),s=To(),e!==null&&!tc?(Eo(e,t,i),Dc(e,t,i)):(V&&s&&ki(t),t.flags|=1,nc(e,t,r,i),t.child)}function ic(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ci(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ac(e,t,a,r,i)):(e=di(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Oc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Sr:n,n(o,r)&&e.ref===t.ref)return Dc(e,t,i)}return t.flags|=1,e=li(a,r),e.ref=t.ref,e.return=t,t.child=e}function ac(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Sr(a,r)&&e.ref===t.ref)if(tc=!1,t.pendingProps=r=a,Oc(e,i))e.flags&131072&&(tc=!0);else return t.lanes=e.lanes,Dc(e,t,i)}return pc(e,t,n,r,i)}function oc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return cc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&va(t,a===null?null:a.cachePool),a===null?$a():Qa(t,a),io(t);else return r=t.lanes=536870912,cc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&va(t,null),$a(),ao(t)):(va(t,a.cachePool),Qa(t,a),ao(t),t.memoizedState=null);return nc(e,t,i,n),t.child}function sc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function cc(e,t,n,r,i){var a=_a();return a=a===null?null:{parent:aa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&va(t,null),$a(),io(t),e!==null&&Xi(e,t,r,!0),t.childLanes=i,null}function lc(e,t){return t=Sc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function uc(e,t,n){return Ia(t,e.child,null,n),e=lc(t,t.pendingProps),e.flags|=2,oo(t),t.memoizedState=null,e}function dc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(V){if(r.mode===`hidden`)return e=lc(t,r),t.lanes=536870912,sc(null,e);if(ro(t),(e=B)?(e=rf(e,Pi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:wi===null?null:{id:Ti,overflow:Ei},retryLane:536870912,hydrationErrors:null},n=mi(e),n.return=t,t.child=n,Mi=t,B=null)):e=null,e===null)throw Ii(t);return t.lanes=536870912,null}return lc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(ro(t),a)if(t.flags&256)t.flags&=-257,t=uc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(tc||Xi(e,t,n,!1),a=(n&e.childLanes)!==0,tc||a){if(r=q,r!==null&&(s=nt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ni(e,s),hu(r,e,s),ec;Du(),t=uc(e,t,n)}else e=o.treeContext,B=cf(s.nextSibling),Mi=t,V=!0,Ni=null,Pi=!1,e!==null&&ji(t,e),t=lc(t,r),t.flags|=4096;return t}return e=li(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function fc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function pc(e,t,n,r,i){return Qi(t),n=xo(e,t,n,r,void 0,i),r=To(),e!==null&&!tc?(Eo(e,t,i),Dc(e,t,i)):(V&&r&&ki(t),t.flags|=1,nc(e,t,n,i),t.child)}function mc(e,t,n,r,i,a){return Qi(t),t.updateQueue=null,n=Co(t,r,n,i),So(e),r=To(),e!==null&&!tc?(Eo(e,t,a),Dc(e,t,a)):(V&&r&&ki(t),t.flags|=1,nc(e,t,n,a),t.child)}function hc(e,t,n,r,i){if(Qi(t),t.stateNode===null){var a=ai,o=n.contextType;typeof o==`object`&&o&&(a=$i(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Vs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},za(t),o=n.contextType,a.context=typeof o==`object`&&o?$i(o):ai,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Bs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Vs.enqueueReplaceState(a,a.state,null),qa(t,r,a,i),Ka(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ws(n,s);a.props=c;var l=a.context,u=n.contextType;o=ai,typeof u==`object`&&u&&(o=$i(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Us(t,a,r,o),Ra=!1;var f=t.memoizedState;a.state=f,qa(t,r,a,i),Ka(),l=t.memoizedState,s||f!==l||Ra?(typeof d==`function`&&(Bs(t,n,d,r),l=t.memoizedState),(c=Ra||Hs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ba(e,t),o=t.memoizedProps,u=Ws(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ai,typeof l==`object`&&l&&(c=$i(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Us(t,a,r,c),Ra=!1,f=t.memoizedState,a.state=f,qa(t,r,a,i),Ka();var p=t.memoizedState;o!==d||f!==p||Ra||e!==null&&e.dependencies!==null&&Zi(e.dependencies)?(typeof s==`function`&&(Bs(t,n,s,r),p=t.memoizedState),(u=Ra||Hs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Zi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,fc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ia(t,e.child,null,i),t.child=Ia(t,null,n,i)):nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Dc(e,t,i),e}function gc(e,t,n,r){return Bi(),t.flags|=256,nc(e,t,n,r),t.child}var _c={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vc(e){return{baseLanes:e,cachePool:ya()}}function yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function bc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(so.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(V){if(a?no(t):ao(t),(e=B)?(e=rf(e,Pi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:wi===null?null:{id:Ti,overflow:Ei},retryLane:536870912,hydrationErrors:null},n=mi(e),n.return=t,t.child=n,Mi=t,B=null)):e=null,e===null)throw Ii(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(ao(t),a=t.mode,c=Sc({mode:`hidden`,children:c},a),r=fi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(null,r)):(no(t),xc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(no(t),t.flags&=-257,t=Cc(e,t,n)):t.memoizedState===null?(ao(t),c=r.fallback,a=t.mode,r=Sc({mode:`visible`,children:r.children},a),c=fi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ia(t,e.child,null,n),r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,t=sc(null,r)):(ao(t),t.child=e.child,t.flags|=128,t=null);else if(no(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Hi({value:r,source:null,stack:null}),t=Cc(e,t,n)}else if(tc||Xi(e,t,n,!1),s=(n&e.childLanes)!==0,tc||s){if(s=q,s!==null&&(r=nt(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ni(e,r),hu(s,e,r),ec;af(c)||Du(),t=Cc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,B=cf(c.nextSibling),Mi=t,V=!0,Ni=null,Pi=!1,e!==null&&ji(t,e),t=xc(t,r.children),t.flags|=4096);return t}return a?(ao(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=li(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=fi(c,a,n,null),c.flags|=2):c=li(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,sc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=vc(n):(a=c.cachePool,a===null?a=ya():(l=aa._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(e.child,r)):(no(t),n=e.child,e=n.sibling,n=li(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function xc(e,t){return t=Sc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Sc(e,t){return e=si(22,e,null,t),e.lanes=0,e}function Cc(e,t,n){return Ia(t,e.child,null,n),e=xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ji(e.return,t,n)}function Tc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ec(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=so.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,I(so,o),nc(e,t,r,n),r=V?xi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wc(e,n,t);else if(e.tag===19)wc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&co(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Tc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&co(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Tc(t,!0,n,null,a,r);break;case`together`:Tc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Dc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Xi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=li(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=li(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Zi(e))):!0}function kc(e,t,n){switch(t.tag){case 3:de(t,t.stateNode.containerInfo),Ki(t,aa,e.memoizedState.cache),Bi();break;case 27:case 5:pe(t);break;case 4:de(t,t.stateNode.containerInfo);break;case 10:Ki(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,ro(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(no(t),e=Dc(e,t,n),e===null?null:e.sibling):bc(e,t,n):(no(t),t.flags|=128,null);no(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Xi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ec(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),I(so,so.current),r)break;return null;case 22:return t.lanes=0,oc(e,t,n,t.pendingProps);case 24:Ki(t,aa,e.memoizedState.cache)}return Dc(e,t,n)}function Ac(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)tc=!0;else{if(!Oc(e,n)&&!(t.flags&128))return tc=!1,kc(e,t,n);tc=!!(e.flags&131072)}else tc=!1,V&&t.flags&1048576&&Oi(t,xi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Ea(t.elementType),t.type=e,typeof e==`function`)ci(e)?(r=Ws(e,r),t.tag=1,t=hc(null,t,e,r,n)):(t.tag=0,t=pc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=rc(null,t,e,r,n);break a}else if(a===te){t.tag=14,t=ic(null,t,e,r,n);break a}}throw t=ie(e)||e,Error(i(306,t,``))}}return t;case 0:return pc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ws(r,t.pendingProps),hc(e,t,r,a,n);case 3:a:{if(de(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ba(e,t),qa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ki(t,aa,r),r!==o.cache&&Yi(t,[aa],n,!0),Ka(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=gc(e,t,r,n);break a}else if(r!==a){a=_i(Error(i(424)),t),Hi(a),t=gc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(B=cf(e.firstChild),Mi=t,V=!0,Ni=null,Pi=!0,n=La(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Bi(),r===a){t=Dc(e,t,n);break a}nc(e,t,r,n)}t=t.child}return t;case 26:return fc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:V||(n=t.type,e=t.pendingProps,r=Bd(le.current).createElement(n),r[ct]=t,r[lt]=e,Pd(r,n,e),xt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return pe(t),e===null&&V&&(r=t.stateNode=ff(t.type,t.pendingProps,le.current),Mi=t,Pi=!0,a=B,Zd(t.type)?(lf=a,B=cf(r.firstChild)):B=a),nc(e,t,t.pendingProps.children,n),fc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&V&&((a=r=B)&&(r=tf(r,t.type,t.pendingProps,Pi),r===null?a=!1:(t.stateNode=r,Mi=t,B=cf(r.firstChild),Pi=!1,a=!0)),a||Ii(t)),pe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=xo(e,t,wo,null,null,n),Qf._currentValue=a),fc(e,t),nc(e,t,r,n),t.child;case 6:return e===null&&V&&((e=n=B)&&(n=nf(n,t.pendingProps,Pi),n===null?e=!1:(t.stateNode=n,Mi=t,B=null,e=!0)),e||Ii(t)),null;case 13:return bc(e,t,n);case 4:return de(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ia(t,null,r,n):nc(e,t,r,n),t.child;case 11:return rc(e,t,t.type,t.pendingProps,n);case 7:return nc(e,t,t.pendingProps,n),t.child;case 8:return nc(e,t,t.pendingProps.children,n),t.child;case 12:return nc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ki(t,t.type,r.value),nc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Qi(t),a=$i(a),r=r(a),t.flags|=1,nc(e,t,r,n),t.child;case 14:return ic(e,t,t.type,t.pendingProps,n);case 15:return ac(e,t,t.type,t.pendingProps,n);case 19:return Ec(e,t,n);case 31:return dc(e,t,n);case 22:return oc(e,t,n,t.pendingProps);case 24:return Qi(t),r=$i(aa),e===null?(a=_a(),a===null&&(a=q,o=oa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},za(t),Ki(t,aa,a)):((e.lanes&n)!==0&&(Ba(e,t),qa(t,null,null,n),Ka()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ki(t,aa,r),r!==a.cache&&Yi(t,[aa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ki(t,aa,r))),nc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function jc(e){e.flags|=4}function Mc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Da=Ca,xa}else e.flags&=-16777217}function Nc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Da=Ca,xa}function Pc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Xe(),e.lanes|=t,Yl|=t)}function Fc(e,t){if(!V)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ic(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lc(e,t,n){var r=t.pendingProps;switch(Ai(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ic(t),null;case 1:return Ic(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),qi(aa),fe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(zi(t)?jc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Vi())),Ic(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(jc(t),o===null?(Ic(t),Mc(t,a,null,r,n)):(Ic(t),Nc(t,o))):o?o===e.memoizedState?(Ic(t),t.flags&=-16777217):(jc(t),Ic(t),Nc(t,o)):(e=e.memoizedProps,e!==r&&jc(t),Ic(t),Mc(t,a,e,r,n)),null;case 27:if(me(t),n=le.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}e=se.current,zi(t)?Li(t,e):(e=ff(a,r,n),t.stateNode=e,jc(t))}return Ic(t),null;case 5:if(me(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}if(o=se.current,zi(t))Li(t,o);else{var s=Bd(le.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ct]=t,o[lt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&jc(t)}}return Ic(t),Mc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=le.current,zi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Mi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ct]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Ii(t,!0)}else e=Bd(e).createTextNode(r),e[ct]=t,t.stateNode=e}return Ic(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=zi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ct]=t}else Bi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),e=!1}else n=Vi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(oo(t),t):(oo(t),null);if(t.flags&128)throw Error(i(558))}return Ic(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=zi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ct]=t}else Bi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),a=!1}else a=Vi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(oo(t),t):(oo(t),null)}return oo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Pc(t,t.updateQueue),Ic(t),null);case 4:return fe(),e===null&&Sd(t.stateNode.containerInfo),Ic(t),null;case 10:return qi(t.type),Ic(t),null;case 19:if(F(so),r=t.memoizedState,r===null)return Ic(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Fc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=co(e),o!==null){for(t.flags|=128,Fc(r,!1),e=o.updateQueue,t.updateQueue=e,Pc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ui(n,e),n=n.sibling;return I(so,so.current&1|2),V&&Di(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&De()>tu&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304)}else{if(!a)if(e=co(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Pc(t,e),Fc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!V)return Ic(t),null}else 2*De()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Ic(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=De(),e.sibling=null,n=so.current,I(so,a?n&1|2:n&1),V&&Di(t,r.treeForkCount),e);case 22:case 23:return oo(t),eo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Ic(t),t.subtreeFlags&6&&(t.flags|=8192)):Ic(t),n=t.updateQueue,n!==null&&Pc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&F(ga),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),qi(aa),Ic(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Rc(e,t){switch(Ai(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return qi(aa),fe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return me(t),null;case 31:if(t.memoizedState!==null){if(oo(t),t.alternate===null)throw Error(i(340));Bi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(oo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Bi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return F(so),null;case 4:return fe(),null;case 10:return qi(t.type),null;case 22:case 23:return oo(t),eo(),e!==null&&F(ga),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return qi(aa),null;case 25:return null;default:return null}}function zc(e,t){switch(Ai(t),t.tag){case 3:qi(aa),fe();break;case 26:case 27:case 5:me(t);break;case 4:fe();break;case 31:t.memoizedState!==null&&oo(t);break;case 13:oo(t);break;case 19:F(so);break;case 10:qi(t.type);break;case 22:case 23:oo(t),eo(),e!==null&&F(ga);break;case 24:qi(aa)}}function Bc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Vc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Hc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ya(t,n)}catch(t){Z(e,e.return,t)}}}function Uc(e,t,n){n.props=Ws(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Wc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Gc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Kc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[lt]=t}catch(t){Z(e,e.return,t)}}function Jc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Yc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=tn));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Xc(e,t,n),e=e.sibling;e!==null;)Xc(e,t,n),e=e.sibling}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ct]=e,t[lt]=n}catch(t){Z(e,e.return,t)}}var $c=!1,el=!1,tl=!1,nl=typeof WeakSet==`function`?WeakSet:Set,rl=null;function il(e,t){if(e=e.containerInfo,Rd=sp,e=Er(e),Dr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,rl=t;rl!==null;)if(t=rl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,rl=e;else for(;rl!==null;){switch(t=rl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ws(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,rl=e;break}rl=t.return}}function al(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Bc(5,n);break;case 1:if(bl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ws(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Hc(n),r&512&&Wc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ya(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Qc(n);case 26:case 5:bl(e,n),t===null&&r&4&&Kc(n),r&512&&Wc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||$c,!r){t=t!==null&&t.memoizedState!==null||el,i=$c;var a=el;$c=r,(el=t)&&!a?Sl(e,n,(n.subtreeFlags&8772)!=0):bl(e,n),$c=i,el=a}break;case 30:break;default:bl(e,n)}}function ol(e){var t=e.alternate;t!==null&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&gt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var sl=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(Le&&typeof Le.onCommitFiberUnmount==`function`)try{Le.onCommitFiberUnmount(Ie,n)}catch{}switch(n.tag){case 26:el||Gc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:el||Gc(n,t);var r=sl,i=cl;Zd(n.type)&&(sl=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),sl=r,cl=i;break;case 5:el||Gc(n,t);case 6:if(r=sl,i=cl,sl=null,ll(e,t,n),sl=r,cl=i,sl!==null)if(cl)try{(sl.nodeType===9?sl.body:sl.nodeName===`HTML`?sl.ownerDocument.body:sl).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{sl.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:sl!==null&&(cl?(e=sl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(sl,n.stateNode));break;case 4:r=sl,i=cl,sl=n.stateNode.containerInfo,cl=!0,ll(e,t,n),sl=r,cl=i;break;case 0:case 11:case 14:case 15:Vc(2,n,t),el||Vc(4,n,t),ll(e,t,n);break;case 1:el||(Gc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Uc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:el=(r=el)||n.memoizedState!==null,ll(e,t,n),el=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new nl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new nl),t;default:throw Error(i(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){sl=c.stateNode,cl=!1;break a}break;case 5:sl=c.stateNode,cl=!1;break a;case 3:case 4:sl=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(sl===null)throw Error(i(160));ul(o,s,a),sl=null,cl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Vc(3,e,e.return),Bc(3,e),Vc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&64&&$c&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=gl;if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[ht]||o[ct]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[ct]=e,xt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ct]=e,xt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&qc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),n!==null&&r&4&&qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),e.flags&32){a=e.stateNode;try{qt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,qc(e,a,n===null?a:n.memoizedProps)),r&1024&&(tl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=gl,gl=gf(t.containerInfo),hl(t,e),gl=a,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}tl&&(tl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=De()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=$c,d=el;if($c=u||a,el=d||l,hl(t,e),el=d,$c=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||$c||el||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Jc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Zc(e,Yc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(qt(o,``),n.flags&=-33),Zc(e,Yc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Xc(e,Yc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)al(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Vc(4,t,t.return),xl(t);break;case 1:Gc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Uc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Gc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Bc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ja(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Hc(a),Wc(a,a.return);break;case 27:Qc(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&Kc(a),Wc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Wc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&sa(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&sa(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Bc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&sa(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Bc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Vc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Vc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;rl!==null;){var n=rl;switch(n.tag){case 0:case 11:case 15:Vc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:sa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,rl=r;else a:for(n=e;rl!==null;){r=rl;var i=r.sibling,a=r.return;if(ol(r),r===n){rl=null;break a}if(i!==null){i.return=a,rl=i;break a}rl=a}}}var Ll={getCacheForType:function(e){var t=$i(aa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return $i(aa).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:j.T===null?at():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||V){var e=We;We<<=1,!(We&3932160)&&(We=262144),Jl=e}else Jl=536870912;return e=H.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),Qe(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Je(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-De(),10<a)){if(yu(r,t,Jl,!Bl),qe(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:tn},jl(t,a,d);var m=(a&62914560)===a?$l-De():(a&4194048)===a?eu-De():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!xr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-ze(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&et(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,Gi=Wi=null,Do(e),Aa=null,ja=0,e=J;for(;e!==null;)zc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=li(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=Je(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-ze(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,$r(),n}function Cu(e,t){U=null,j.H=Is,t===ba||t===Sa?(t=Oa(),X=3):t===xa?(t=Oa(),X=4):X=t===ec?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Js(e,_i(t,e.current)))}function wu(){var e=H.current;return e===null?!0:(Y&4194048)===Y?to===null:(Y&62914560)===Y||Y&536870912?e===to:!1}function Tu(){var e=j.H;return j.H=Is,e===null?Is:e}function Eu(){var e=j.A;return j.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&H.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:H.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,Gi=Wi=null,K=r,j.H=i,j.A=a,J===null&&(q=null,Y=0,$r()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=De()+500,Su(e,t)):Vl=Je(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(wa(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:wa(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return Gi=Wi=null,j.H=r,j.A=a,K=n,J===null?(q=null,Y=0,$r(),Wl):0}function ju(){for(;J!==null&&!Te();)Mu(J)}function Mu(e){var t=Ac(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=mc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=mc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Do(t);default:zc(n,t),t=J=ui(t,Ul),t=Ac(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){Gi=Wi=null,Do(t),Aa=null,ja=0;var i=t.return;try{if($s(e,i,t,n,Y)){Wl=1,Js(e,_i(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Js(e,_i(n,e.current)),J=null;return}t.flags&32768?(V||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=H.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Lc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Rc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Qr,$e(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(je,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=j.T,j.T=null,a=M.p,M.p=2,s=K,K|=4;try{il(e,t,n)}finally{K=s,M.p=a,j.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=j.T,j.T=null;var r=M.p;M.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=Er(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Tr(s.ownerDocument.documentElement,s)){if(c!==null&&Dr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=wr(s,h),v=wr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,M.p=r,j.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=j.T,j.T=null;var r=M.p;M.p=2;var i=K;K|=4;try{al(e,t.alternate,t)}finally{K=i,M.p=r,j.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Ee();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),it(n),t=t.stateNode,Le&&typeof Le.onCommitFiberRoot==`function`)try{Le.onCommitFiberRoot(Ie,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=j.T,i=M.p,M.p=2,j.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{j.T=t,M.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,sa(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=it(su),r=j.T,a=M.p;try{M.p=32>n?32:n,j.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),Le&&typeof Le.onPostCommitFiberRoot==`function`)try{Le.onPostCommitFiberRoot(Ie,o)}catch{}return!0}finally{M.p=a,j.T=r,Vu(e,t)}}function Wu(e,t,n){t=_i(n,t),t=Xs(e.stateNode,t,2),e=Ha(e,t,2),e!==null&&(Qe(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=_i(n,e),n=Zs(2),r=Ha(t,n,2),r!==null&&(Qs(n,r,t,e),Qe(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>De()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=Xe()),e=ni(e,t),e!==null&&(Qe(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Ce(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-ze(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=qe(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Je(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=De(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-ze(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ye(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=qe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&we(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Je(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&we(r),it(n)){case 2:case 8:n=Ae;break;case 32:n=je;break;case 268435456:n=Ne;break;default:n=je}return r=cd.bind(null,e),n=Ce(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&we(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=qe(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,De()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Ce(ke,ad):od()})}function dd(){if(nd===0){var e=ua;e===0&&(e=Ue,Ue<<=1,!(Ue&261888)&&(Ue=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:en(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[lt]||null).action),o=r.submitter;o&&(t=(t=o[lt]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Cn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ss(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ss(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<qr.length;hd++){var gd=qr[hd];Jr(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}Jr(zr,`onAnimationEnd`),Jr(Br,`onAnimationIteration`),Jr(Vr,`onAnimationStart`),Jr(`dblclick`,`onDoubleClick`),Jr(`focusin`,`onFocus`),Jr(`focusout`,`onBlur`),Jr(Hr,`onTransitionRun`),Jr(Ur,`onTransitionStart`),Jr(Wr,`onTransitionCancel`),Jr(Gr,`onTransitionEnd`),Tt(`onMouseEnter`,[`mouseout`,`mouseover`]),Tt(`onMouseLeave`,[`mouseout`,`mouseover`]),Tt(`onPointerEnter`,[`pointerout`,`pointerover`]),Tt(`onPointerLeave`,[`pointerout`,`pointerover`]),wt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),wt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),wt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),wt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),wt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),wt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Yr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Yr(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[dt];n===void 0&&(n=t[dt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,St.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!fn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=_t(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}ln(function(){var r=a,i=rn(n),s=[];a:{var c=Kr.get(e);if(c!==void 0){var l=Cn,u=e;switch(e){case`keypress`:if(vn(n)===0)break a;case`keydown`:case`keyup`:l=zn;break;case`focusin`:u=`focus`,l=Mn;break;case`focusout`:u=`blur`,l=Mn;break;case`beforeblur`:case`afterblur`:l=Mn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=An;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=jn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Vn;break;case zr:case Br:case Vr:l=Nn;break;case Gr:l=Hn;break;case`scroll`:case`scrollend`:l=Tn;break;case`wheel`:l=Un;break;case`copy`:case`cut`:case`paste`:l=Pn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Bn;break;case`toggle`:case`beforetoggle`:l=Wn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=un(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==nn&&(u=n.relatedTarget||n.fromElement)&&(_t(u)||u[ut]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?_t(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=An,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Bn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:yt(l),h=u==null?c:yt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,_t(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?yt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=ur;else if(ir(c))if(dr)v=yr;else{v=_r;var y=gr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Zt(r.elementType)&&(v=ur):v=vr;if(v&&=v(e,r)){ar(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Ut(c,`number`,c.value)}switch(y=r?yt(r):window,e){case`focusin`:(ir(y)||y.contentEditable===`true`)&&(kr=y,Ar=r,jr=null);break;case`focusout`:jr=Ar=kr=null;break;case`mousedown`:Mr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Mr=!1,Nr(s,n,i);break;case`selectionchange`:if(Or)break;case`keydown`:case`keyup`:Nr(s,n,i)}var b;if(Kn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else er?Qn(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Yn&&n.locale!==`ko`&&(er||x!==`onCompositionStart`?x===`onCompositionEnd`&&er&&(b=_n()):(mn=i,hn=`value`in mn?mn.value:mn.textContent,er=!0)),y=Ed(r,x),0<y.length&&(x=new L(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=$n(n),b!==null&&(x.data=b)))),(b=Jn?tr(e,n):nr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new L(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=un(e,n),i!=null&&r.unshift(Td(e,i,a)),i=un(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=un(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=un(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&qt(e,``+r);break;case`className`:jt(e,`class`,r);break;case`tabIndex`:jt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:jt(e,n,r);break;case`style`:Xt(e,r,o);break;case`data`:if(t!==`object`){jt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=en(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=en(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=en(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),At(e,`popover`,r);break;case`xlinkActuate`:Mt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Mt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Mt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Mt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Mt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Mt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Mt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Mt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Mt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:At(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Qt.get(n)||n,At(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Xt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?qt(e,r):(typeof r==`number`||typeof r==`bigint`)&&qt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=tn);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!Ct.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[lt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):At(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Ht(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Wt(e,!!r,n,!0):Wt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Kt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(Zt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Vt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Wt(e,!!n,n?[]:``,!1):Wt(e,!!n,t,!0)):Wt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Gt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Zt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[ht]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),gt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[ht])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);gt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=M.d;M.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=vt(e);t!==null&&t.tag===5&&t.type===`form`?ws(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Bt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),xt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Bt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Bt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Bt(n.imageSizes)+`"]`)):i+=`[href="`+Bt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),xt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Bt(r)+`"][href="`+Bt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),xt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=bt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);xt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=bt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),xt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=bt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),xt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=le.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=bt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=bt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=bt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Bt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),xt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Bt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Bt(n.href)+`"]`);if(r)return t.instance=r,xt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),xt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,xt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),xt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,xt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),xt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[ht]||a[ct]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,xt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),xt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:N,_currentValue2:N,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ze(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ze(0),this.hiddenUpdates=Ze(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=si(3,null,null,t),e.current=a,a.stateNode=e,t=oa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},za(a),e}function tp(e){return e?(e=ai,e):ai}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Va(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ha(e,r,t),n!==null&&(hu(n,e,t),Ua(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ni(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=rt(t);var n=ni(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=2,up(e,t,n,r)}finally{M.p=a,j.T=i}}function lp(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=8,up(e,t,n,r)}finally{M.p=a,j.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=vt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ke(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-ze(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=De()+500,id(0,!1))}}break;case 31:case 13:s=ni(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=rn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=_t(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Oe()){case ke:return 2;case Ae:return 8;case je:case Me:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=vt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=_t(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,ot(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,ot(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);nn=r,n.target.dispatchEvent(r),nn=null}else return t=vt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=vt(n);a!==null&&(e.splice(t,3),t-=3,Ss(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[lt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[lt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[ut]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=at();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.4`)throw Error(i(527,Lp,`19.2.4`));M.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.4`,rendererPackageName:`react-dom`,currentDispatcherRef:j,reconcilerVersion:`19.2.4`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ie=zp.inject(Rp),Le=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Gs,s=Ks,c=qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ut]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u()),v=g(),y=function(){return y=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},y.apply(this,arguments)};function b(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var x={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},S=`-ms-`,C=`-moz-`,w=`-webkit-`,T=`comm`,ee=`rule`,te=`decl`,E=`@import`,D=`@namespace`,ne=`@keyframes`,O=`@layer`,k=Math.abs,re=String.fromCharCode,ie=Object.assign;function A(e,t){return P(e,0)^45?(((t<<2^P(e,0))<<2^P(e,1))<<2^P(e,2))<<2^P(e,3):0}function j(e){return e.trim()}function M(e,t){return(e=t.exec(e))?e[0]:e}function N(e,t,n){return e.replace(t,n)}function ae(e,t,n){return e.indexOf(t,n)}function P(e,t){return e.charCodeAt(t)|0}function oe(e,t,n){return e.slice(t,n)}function F(e){return e.length}function I(e){return e.length}function se(e,t){return t.push(e),e}function ce(e,t){return e.map(t).join(``)}function le(e,t){return e.filter(function(e){return!M(e,t)})}var ue=1,de=1,fe=0,pe=0,me=0,he=``;function ge(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:ue,column:de,length:o,return:``,siblings:s}}function _e(e,t){return ie(ge(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function ve(e){for(;e.root;)e=_e(e.root,{children:[e]});se(e,e.siblings)}function ye(){return me}function be(){return me=pe>0?P(he,--pe):0,de--,me===10&&(de=1,ue--),me}function xe(){return me=pe<fe?P(he,pe++):0,de++,me===10&&(de=1,ue++),me}function Se(){return P(he,pe)}function Ce(){return pe}function we(e,t){return oe(he,e,t)}function Te(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ee(e){return ue=de=1,fe=F(he=e),pe=0,[]}function De(e){return he=``,e}function Oe(e){return j(we(pe-1,je(e===91?e+2:e===40?e+1:e)))}function ke(e){for(;(me=Se())&&me<33;)xe();return Te(e)>2||Te(me)>3?``:` `}function Ae(e,t){for(;--t&&xe()&&!(me<48||me>102||me>57&&me<65||me>70&&me<97););return we(e,Ce()+(t<6&&Se()==32&&xe()==32))}function je(e){for(;xe();)switch(me){case e:return pe;case 34:case 39:e!==34&&e!==39&&je(me);break;case 40:e===41&&je(e);break;case 92:xe();break}return pe}function Me(e,t){for(;xe()&&e+me!==57&&!(e+me===84&&Se()===47););return`/*`+we(t,pe-1)+`*`+re(e===47?e:xe())}function Ne(e){for(;!Te(Se());)xe();return we(e,pe)}function Pe(e){return De(Fe(``,null,null,null,[``],e=Ee(e),0,[0],e))}function Fe(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=xe()){case 40:if(m!=108&&P(C,d-1)==58){ae(C+=N(Oe(v),`&`,`&\f`),`&\f`,k(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Oe(v);break;case 9:case 10:case 13:case 32:C+=ke(m);break;case 92:C+=Ae(Ce()-1,7);continue;case 47:switch(Se()){case 42:case 47:se(Le(Me(xe(),Ce()),t,n,c),c),(Te(m||1)==5||Te(Se()||1)==5)&&F(C)&&oe(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=F(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=N(C,/\f/g,``)),p>0&&(F(C)-d||h===0&&m===47)&&se(p>32?Re(C+`;`,r,n,d-1,c):Re(N(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(se(S=Ie(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123)if(u===0)Fe(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(P(C,3)===110)break;case 108:if(P(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Fe(e,S,S,r&&se(Ie(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Fe(C,S,S,S,[``],x,0,s,x)}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+F(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&be()==125)continue}switch(C+=re(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(F(C)-1)*_,_=1;break;case 64:Se()===45&&(C+=Oe(xe())),f=Se(),u=d=F(y=C+=Ne(Ce())),v++;break;case 45:m===45&&F(C)==2&&(h=0)}}return a}function Ie(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=I(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=oe(e,f+1,f=k(g=o[h])),b=e;v<m;++v)(b=j(g>0?p[v]+` `+y:N(y,/&\f/g,p[v])))&&(c[_++]=b);return ge(e,t,n,i===0?ee:s,c,l,u,d)}function Le(e,t,n,r){return ge(e,t,n,T,re(ye()),oe(e,2,-2),0,r)}function Re(e,t,n,r,i){return ge(e,t,n,te,oe(e,0,r),oe(e,r+1,-1),r,i)}function ze(e,t,n){switch(A(e,t)){case 5103:return w+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return w+e+e;case 4855:return w+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return C+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return w+e+C+e+S+e+e;case 5936:switch(P(e,t+11)){case 114:return w+e+S+N(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return w+e+S+N(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return w+e+S+N(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return w+e+S+e+e;case 6165:return w+e+S+`flex-`+e+e;case 5187:return w+e+N(e,/(\w+).+(:[^]+)/,w+`box-$1$2`+S+`flex-$1$2`)+e;case 5443:return w+e+S+`flex-item-`+N(e,/flex-|-self/g,``)+(M(e,/flex-|baseline/)?``:S+`grid-row-`+N(e,/flex-|-self/g,``))+e;case 4675:return w+e+S+`flex-line-pack`+N(e,/align-content|flex-|-self/g,``)+e;case 5548:return w+e+S+N(e,`shrink`,`negative`)+e;case 5292:return w+e+S+N(e,`basis`,`preferred-size`)+e;case 6060:return w+`box-`+N(e,`-grow`,``)+w+e+S+N(e,`grow`,`positive`)+e;case 4554:return w+N(e,/([^-])(transform)/g,`$1`+w+`$2`)+e;case 6187:return N(N(N(e,/(zoom-|grab)/,w+`$1`),/(image-set)/,w+`$1`),e,``)+e;case 5495:case 3959:return N(e,/(image-set\([^]*)/,w+"$1$`$1");case 4968:return N(N(e,/(.+:)(flex-)?(.*)/,w+`box-pack:$3`+S+`flex-pack:$3`),/space-between/,`justify`)+w+e+e;case 4200:if(!M(e,/flex-|baseline/))return S+`grid-column-align`+oe(e,t)+e;break;case 2592:case 3360:return S+N(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,M(e.props,/grid-\w+-end/)})?~ae(e+(n=n[t].value),`span`,0)?e:S+N(e,`-start`,``)+e+S+`grid-row-span:`+(~ae(n,`span`,0)?M(n,/\d+/):M(n,/\d+/)-+M(e,/\d+/))+`;`:S+N(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return M(e.props,/grid-\w+-start/)})?e:S+N(N(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return N(e,/(.+)-inline(.+)/,w+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(F(e)-1-t>6)switch(P(e,t+1)){case 109:if(P(e,t+4)!==45)break;case 102:return N(e,/(.+:)(.+)-([^]+)/,`$1`+w+`$2-$3$1`+C+(P(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~ae(e,`stretch`,0)?ze(N(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return N(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return S+n+`:`+r+s+(i?S+n+`-span:`+(a?o:o-+r)+s:``)+e});case 4949:if(P(e,t+6)===121)return N(e,`:`,`:`+w)+e;break;case 6444:switch(P(e,P(e,14)===45?18:11)){case 120:return N(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+w+(P(e,14)===45?`inline-`:``)+`box$3$1`+w+`$2$3$1`+S+`$2box$3`)+e;case 100:return N(e,`:`,`:`+S)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return N(e,`scroll-`,`scroll-snap-`)+e}return e}function Be(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Ve(e,t,n,r){switch(e.type){case O:if(e.children.length)break;case E:case D:case te:return e.return=e.return||e.value;case T:return``;case ne:return e.return=e.value+`{`+Be(e.children,r)+`}`;case ee:if(!F(e.value=e.props.join(`,`)))return``}return F(n=Be(e.children,r))?e.return=e.value+`{`+n+`}`:``}function He(e){var t=I(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function Ue(e){return function(t){t.root||(t=t.return)&&e(t)}}function We(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case te:e.return=ze(e.value,e.length,n);return;case ne:return Be([_e(e,{value:N(e.value,`@`,`@`+w)})],r);case ee:if(e.length)return ce(n=e.props,function(t){switch(M(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:ve(_e(e,{props:[N(t,/:(read-\w+)/,`:`+C+`$1`)]})),ve(_e(e,{props:[t]})),ie(e,{props:le(n,r)});break;case`::placeholder`:ve(_e(e,{props:[N(t,/:(plac\w+)/,`:`+w+`input-$1`)]})),ve(_e(e,{props:[N(t,/:(plac\w+)/,`:`+C+`$1`)]})),ve(_e(e,{props:[N(t,/:(plac\w+)/,S+`input-$1`)]})),ve(_e(e,{props:[t]})),ie(e,{props:le(n,r)});break}return``})}}var Ge=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Ke=`active`,qe=`data-styled-version`,Je=`6.3.12`,Ye=`/*!sc*/
`,Xe=typeof window<`u`&&typeof document<`u`,Ze=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:typeof process<`u`&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==``?{}.REACT_APP_SC_DISABLE_SPEEDY!==`false`&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<`u`&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==``&&{}.SC_DISABLE_SPEEDY!==`false`&&{}.SC_DISABLE_SPEEDY),Qe={};function $e(e){var t=[...arguments].slice(1);return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var et=new Map,tt=new Map,nt=1,rt=function(e){if(et.has(e))return et.get(e);for(;tt.has(nt);)nt++;var t=nt++;return et.set(e,t),tt.set(t,e),t},it=function(e,t){nt=t+1,et.set(e,t),tt.set(t,e)},at=Object.freeze([]),ot=Object.freeze({});function st(e,t,n){return n===void 0&&(n=ot),e.theme!==n.theme&&e.theme||t||n.theme}var ct=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`)),lt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ut=/(^-|-$)/g;function dt(e){return e.replace(lt,`-`).replace(ut,``)}var ft=/(a)(d)/gi,pt=function(e){return String.fromCharCode(e+(e>25?39:97))};function mt(e){var t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=pt(t%52)+n;return(pt(t%52)+n).replace(ft,`$1-$2`)}var ht,gt=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},_t=function(e){return gt(5381,e)};function vt(e){return mt(_t(e)>>>0)}function yt(e){return e.displayName||e.name||`Component`}function bt(e){return typeof e==`string`&&!0}var xt=typeof Symbol==`function`&&Symbol.for,St=xt?Symbol.for(`react.memo`):60115,Ct=xt?Symbol.for(`react.forward_ref`):60112,wt={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Tt={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Et={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Dt=((ht={})[Ct]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ht[St]=Et,ht);function Ot(e){return(`type`in(t=e)&&t.type.$$typeof)===St?Et:`$$typeof`in e?Dt[e.$$typeof]:wt;var t}var kt=Object.defineProperty,At=Object.getOwnPropertyNames,jt=Object.getOwnPropertySymbols,Mt=Object.getOwnPropertyDescriptor,Nt=Object.getPrototypeOf,Pt=Object.prototype;function Ft(e,t,n){if(typeof t!=`string`){if(Pt){var r=Nt(t);r&&r!==Pt&&Ft(e,r,n)}var i=At(t);jt&&(i=i.concat(jt(t)));for(var a=Ot(e),o=Ot(t),s=0;s<i.length;++s){var c=i[s];if(!(c in Tt||n&&n[c]||o&&c in o||a&&c in a)){var l=Mt(t,c);try{kt(e,c,l)}catch{}}}}return e}function It(e){return typeof e==`function`}function Lt(e){return typeof e==`object`&&`styledComponentId`in e}function Rt(e,t){return e&&t?`${e} ${t}`:e||t||``}function zt(e,t){return e.join(t||``)}function Bt(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Vt(e,t,n){if(n===void 0&&(n=!1),!n&&!Bt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Vt(e[r],t[r]);else if(Bt(t))for(var r in t)e[r]=Vt(e[r],t[r]);return e}function Ht(e,t){Object.defineProperty(e,`toString`,{value:t})}var Ut=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)if((i<<=1)<0)throw $e(16,`${e}`);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var a=r;a<i;a++)this.groupSizes[a]=0}for(var o=this.indexOfGroup(e+1),s=0,c=(a=0,t.length);a<c;a++)this.tag.insertRule(o,t[a])&&(this.groupSizes[e]++,o++,s++);s>0&&this._cGroup>e&&(this._cIndex+=s)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t=``;if(e>=this.length||this.groupSizes[e]===0)return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,a=r;a<i;a++)t+=this.tag.getRule(a)+Ye;return t},e}(),Wt=`style[${Ge}][${qe}="${Je}"]`,Gt=RegExp(`^${Ge}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Kt=function(e){return typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11},qt=function(e){if(!e)return document;if(Kt(e))return e;if(`getRootNode`in e){var t=e.getRootNode();if(Kt(t))return t}return document},Jt=function(e,t,n){for(var r,i=n.split(`,`),a=0,o=i.length;a<o;a++)(r=i[a])&&e.registerName(t,r)},Yt=function(e,t){for(var n=(t.textContent??``).split(Ye),r=[],i=0,a=n.length;i<a;i++){var o=n[i].trim();if(o){var s=o.match(Gt);if(s){var c=0|parseInt(s[1],10),l=s[2];c!==0&&(it(l,c),Jt(e,l,s[3]),e.getTag().insertRules(c,r)),r.length=0}else r.push(o)}}},Xt=function(e){for(var t=qt(e.options.target).querySelectorAll(Wt),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(Ge)!==Ke&&(Yt(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function Zt(){return typeof __webpack_nonce__<`u`?__webpack_nonce__:null}var Qt=function(e){var t=document.head,n=e||t,r=document.createElement(`style`),i=function(e){var t=Array.from(e.querySelectorAll(`style[${Ge}]`));return t[t.length-1]}(n),a=i===void 0?null:i.nextSibling;r.setAttribute(Ge,Ke),r.setAttribute(qe,Je);var o=Zt();return o&&r.setAttribute(`nonce`,o),n.insertBefore(r,a),r},$t=function(){function e(e){this.element=Qt(e),this.element.appendChild(document.createTextNode(``)),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=e.getRootNode().styleSheets??document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}throw $e(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``},e}(),en=function(){function e(e){this.element=Qt(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:``},e}(),tn=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:``},e}(),nn=Xe,rn={isServer:!Xe,useCSSOMInjection:!Ze},an=function(){function e(e,t,n){e===void 0&&(e=ot),t===void 0&&(t={});var r=this;this.options=y(y({},rn),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Xe&&nn&&(nn=!1,Xt(this)),Ht(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r=``,i=function(n){var i=function(e){return tt.get(e)}(n);if(i===void 0)return`continue`;var a=e.names.get(i);if(a===void 0||!a.size)return`continue`;var o=t.getGroup(n);if(o.length===0)return`continue`;var s=Ge+`.g`+n+`[id="`+i+`"]`,c=``;a.forEach(function(e){e.length>0&&(c+=e+`,`)}),r+=o+s+`{content:"`+c+`"}`+Ye},a=0;a<n;a++)i(a);return r}(r)})}return e.registerId=function(e){return rt(e)},e.prototype.rehydrate=function(){!this.server&&Xe&&Xt(this)},e.prototype.reconstructWithOptions=function(t,n){n===void 0&&(n=!0);var r=new e(y(y({},this.options),t),this.gs,n&&this.names||void 0);return!this.server&&Xe&&t.target!==this.options.target&&qt(this.options.target)!==qt(t.target)&&Xt(r),r},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new tn(n):t?new $t(n):new en(n)}(this.options),new Ut(e));var e},e.prototype.hasNameForId=function(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n},e.prototype.registerName=function(e,t){rt(e);var n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(rt(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(rt(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function on(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in x||e.startsWith(`--`)?String(t).trim():`${t}px`}var sn=function(e){return e>=`A`&&e<=`Z`};function cn(e){for(var t=``,n=0;n<e.length;n++){var r=e[n];if(n===1&&r===`-`&&e[0]===`-`)return e;sn(r)?t+=`-`+r.toLowerCase():t+=r}return t.startsWith(`ms-`)?`-`+t:t}var ln=Symbol.for(`sc-keyframes`);function un(e){return typeof e==`object`&&!!e&&ln in e}var dn=function(e){return e==null||!1===e||e===``},fn=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!dn(r)&&(Array.isArray(r)&&r.isCss||It(r)?t.push(`${cn(n)}:`,r,`;`):Bt(r)?t.push.apply(t,b(b([`${n} {`],fn(r),!1),[`}`],!1)):t.push(`${cn(n)}: ${on(n,r)};`))}return t};function pn(e,t,n,r,i){if(i===void 0&&(i=[]),typeof e==`string`)return e&&i.push(e),i;if(dn(e))return i;if(Lt(e))return i.push(`.${e.styledComponentId}`),i;if(It(e))return!It(a=e)||a.prototype&&a.prototype.isReactComponent||!t?(i.push(e),i):pn(e(t),t,n,r,i);var a;if(un(e))return n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i;if(Bt(e)){for(var o=fn(e),s=0;s<o.length;s++)i.push(o[s]);return i}if(!Array.isArray(e))return i.push(e.toString()),i;for(s=0;s<e.length;s++)pn(e[s],t,n,r,i);return i}function mn(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(It(n)&&!Lt(n))return!1}return!0}var hn=_t(Je),gn=function(){function e(e,t,n){this.rules=e,this.staticRulesId=``,this.isStatic=(n===void 0||n.isStatic)&&mn(e),this.componentId=t,this.baseHash=gt(hn,t),this.baseStyle=n,an.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n).className:``;if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Rt(r,this.staticRulesId);else{var i=zt(pn(this.rules,e,t,n)),a=mt(gt(this.baseHash,i)>>>0);if(!t.hasNameForId(this.componentId,a)){var o=n(i,`.${a}`,void 0,this.componentId);t.insertRules(this.componentId,a,o)}r=Rt(r,a),this.staticRulesId=a}else{for(var s=gt(this.baseHash,n.hash),c=``,l=0;l<this.rules.length;l++){var u=this.rules[l];if(typeof u==`string`)c+=u;else if(u){var d=zt(pn(u,e,t,n));s=gt(gt(s,String(l)),d),c+=d}}if(c){var f=mt(s>>>0);if(!t.hasNameForId(this.componentId,f)){var p=n(c,`.${f}`,void 0,this.componentId);t.insertRules(this.componentId,f,p)}r=Rt(r,f)}}return{className:r,css:typeof window>`u`?t.getTag().getGroup(rt(this.componentId)):``}},e}(),_n=/&/g,vn=47,yn=42;function bn(e){if(e.indexOf(`}`)===-1)return!1;for(var t=e.length,n=0,r=0,i=!1,a=0;a<t;a++){var o=e.charCodeAt(a);if(r!==0||i||o!==vn||e.charCodeAt(a+1)!==yn)if(i)o===yn&&e.charCodeAt(a+1)===vn&&(i=!1,a++);else if(o!==34&&o!==39||a!==0&&e.charCodeAt(a-1)===92){if(r===0){if(o===123)n++;else if(o===125&&--n<0)return!0}}else r===0?r=o:r===o&&(r=0);else i=!0,a++}return n!==0||r!==0}function xn(e,t){return e.map(function(e){return e.type===`rule`&&(e.value=`${t} ${e.value}`,e.value=e.value.replaceAll(`,`,`,${t} `),e.props=e.props.map(function(e){return`${t} ${e}`})),Array.isArray(e.children)&&e.type!==`@keyframes`&&(e.children=xn(e.children,t)),e})}function Sn(e){var t,n,r,i=e===void 0?ot:e,a=i.options,o=a===void 0?ot:a,s=i.plugins,c=s===void 0?at:s,l=function(e,r,i){return i.startsWith(n)&&i.endsWith(n)&&i.replaceAll(n,``).length>0?`.${t}`:e},u=c.slice();u.push(function(e){e.type===`rule`&&e.value.includes(`&`)&&(r||=RegExp(`\\${n}\\b`,`g`),e.props[0]=e.props[0].replace(_n,n).replace(r,l))}),o.prefix&&u.push(We),u.push(Ve);var d=[],f=He(u.concat(Ue(function(e){return d.push(e)}))),p=function(e,i,a,s){i===void 0&&(i=``),a===void 0&&(a=``),s===void 0&&(s=`&`),t=s,n=i,r=void 0;var c=function(e){if(!bn(e))return e;for(var t=e.length,n=``,r=0,i=0,a=0,o=!1,s=0;s<t;s++){var c=e.charCodeAt(s);if(a!==0||o||c!==vn||e.charCodeAt(s+1)!==yn)if(o)c===yn&&e.charCodeAt(s+1)===vn&&(o=!1,s++);else if(c!==34&&c!==39||s!==0&&e.charCodeAt(s-1)===92){if(a===0)if(c===123)i++;else if(c===125){if(--i<0){for(var l=s+1;l<t;){var u=e.charCodeAt(l);if(u===59||u===10)break;l++}l<t&&e.charCodeAt(l)===59&&l++,i=0,s=l-1,r=l;continue}i===0&&(n+=e.substring(r,s+1),r=s+1)}else c===59&&i===0&&(n+=e.substring(r,s+1),r=s+1)}else a===0?a=c:a===c&&(a=0);else o=!0,s++}if(r<t){var d=e.substring(r);bn(d)||(n+=d)}return n}(function(e){if(e.indexOf(`//`)===-1)return e;for(var t=e.length,n=[],r=0,i=0,a=0,o=0;i<t;){var s=e.charCodeAt(i);if(s!==34&&s!==39||i!==0&&e.charCodeAt(i-1)===92)if(a===0)if(s===vn&&i+1<t&&e.charCodeAt(i+1)===yn){for(i+=2;i+1<t&&(e.charCodeAt(i)!==yn||e.charCodeAt(i+1)!==vn);)i++;i+=2}else if(s===40&&i>=3&&(32|e.charCodeAt(i-1))==108&&(32|e.charCodeAt(i-2))==114&&(32|e.charCodeAt(i-3))==117)o=1,i++;else if(o>0)s===41?o--:s===40&&o++,i++;else if(s===yn&&i+1<t&&e.charCodeAt(i+1)===vn)i>r&&n.push(e.substring(r,i)),r=i+=2;else if(s===vn&&i+1<t&&e.charCodeAt(i+1)===vn){for(i>r&&n.push(e.substring(r,i));i<t&&e.charCodeAt(i)!==10;)i++;r=i}else i++;else i++;else a===0?a=s:a===s&&(a=0),i++}return r===0?e:(r<t&&n.push(e.substring(r)),n.join(``))}(e)),l=Pe(a||i?`${a} ${i} { ${c} }`:c);return o.namespace&&(l=xn(l,o.namespace)),d=[],Be(l,f),d};return p.hash=c.length?c.reduce(function(e,t){return t.name||$e(15),gt(e,t.name)},5381).toString():``,p}var Cn=new an,wn=Sn(),Tn=_.createContext({shouldForwardProp:void 0,styleSheet:Cn,stylis:wn});Tn.Consumer;var En=_.createContext(void 0);function Dn(){return _.useContext(Tn)}function On(e){if(!_.useMemo)return e.children;var t=Dn().styleSheet,n=_.useMemo(function(){var n=t;return e.sheet?n=e.sheet:e.target&&(n=n.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(n=n.reconstructWithOptions({useCSSOMInjection:!1})),n},[e.disableCSSOMInjection,e.sheet,e.target,t]),r=_.useMemo(function(){return Sn({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=_.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:n,stylis:r}},[e.shouldForwardProp,n,r]);return _.createElement(Tn.Provider,{value:i},_.createElement(En.Provider,{value:r},e.children))}var kn=_.createContext(void 0);kn.Consumer;function An(e){var t=_.useContext(kn),n=_.useMemo(function(){return function(e,t){if(!e)throw $e(14);if(It(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw $e(8);return t?y(y({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?_.createElement(kn.Provider,{value:n},e.children):null}var jn={};function Mn(e,t,n){var r=Lt(e),i=e,a=!bt(e),o=t.attrs,s=o===void 0?at:o,c=t.componentId,l=c===void 0?function(e,t){var n=typeof e==`string`?dt(e):`sc`;jn[n]=(jn[n]||0)+1;var r=`${n}-${vt(Je+n+jn[n])}`;return t?`${t}-${r}`:r}(t.displayName,t.parentComponentId):c,u=t.displayName,d=u===void 0?function(e){return bt(e)?`styled.${e}`:`Styled(${yt(e)})`}(e):u,f=t.displayName&&t.componentId?`${dt(t.displayName)}-${t.componentId}`:t.componentId||l,p=r&&i.attrs?i.attrs.concat(s).filter(Boolean):s,m=t.shouldForwardProp;if(r&&i.shouldForwardProp){var h=i.shouldForwardProp;if(t.shouldForwardProp){var g=t.shouldForwardProp;m=function(e,t){return h(e,t)&&g(e,t)}}else m=h}var v=new gn(n,f,r?i.componentStyle:void 0);function b(e,t){return function(e,t,n){var r=e.attrs,i=e.componentStyle,a=e.defaultProps,o=e.foldedComponentIds,s=e.styledComponentId,c=e.target,l=_.useContext(kn),u=Dn(),d=e.shouldForwardProp||u.shouldForwardProp,f=st(t,l,a)||ot,p=function(e,t,n){for(var r,i=y(y({},t),{className:void 0,theme:n}),a=0;a<e.length;a+=1){var o=It(r=e[a])?r(i):r;for(var s in o)s===`className`?i.className=Rt(i.className,o[s]):s===`style`?i.style=y(y({},i.style),o[s]):s in t&&t[s]===void 0||(i[s]=o[s])}return`className`in t&&typeof t.className==`string`&&(i.className=Rt(i.className,t.className)),i}(r,t,f),m=p.as||c,h={};for(var g in p)p[g]===void 0||g[0]===`$`||g===`as`||g===`theme`&&p.theme===f||(g===`forwardedAs`?h.as=p.forwardedAs:d&&!d(g,m)||(h[g]=p[g]));var v=function(e,t){var n=Dn();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,p).className,b=Rt(o,s);return v&&(b+=` `+v),p.className&&(b+=` `+p.className),h[bt(m)&&!ct.has(m)?`class`:`className`]=b,n&&(h.ref=n),(0,_.createElement)(m,h)}(x,e,t)}b.displayName=d;var x=_.forwardRef(b);return x.attrs=p,x.componentStyle=v,x.displayName=d,x.shouldForwardProp=m,x.foldedComponentIds=r?Rt(i.foldedComponentIds,i.styledComponentId):``,x.styledComponentId=f,x.target=r?i.target:e,Object.defineProperty(x,`defaultProps`,{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=r?function(e){for(var t=[...arguments].slice(1),n=0,r=t;n<r.length;n++)Vt(e,r[n],!0);return e}({},i.defaultProps,e):e}}),Ht(x,function(){return`.${x.styledComponentId}`}),a&&Ft(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function Nn(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Pn=function(e){return Object.assign(e,{isCss:!0})};function L(e){var t=[...arguments].slice(1);if(It(e)||Bt(e))return Pn(pn(Nn(at,b([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?pn(n):Pn(pn(Nn(n,t)))}function Fn(e,t,n){if(n===void 0&&(n=ot),!t)throw $e(1,t);var r=function(r){var i=[...arguments].slice(1);return e(t,n,L.apply(void 0,b([r],i,!1)))};return r.attrs=function(r){return Fn(e,t,y(y({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return Fn(e,t,y(y({},n),r))},r}var In=function(e){return Fn(Mn,e)},R=In;ct.forEach(function(e){R[e]=In(e)});var Ln,Rn=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=mn(e),an.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var i=r(zt(pn(this.rules,t,n,r)),``),a=this.componentId+e;n.insertRules(a,a,i)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&an.registerId(this.componentId+e);var i=this.componentId+e;this.isStatic?n.hasNameForId(i,i)||this.createStyles(e,t,n,r):(this.removeStyles(e,n),this.createStyles(e,t,n,r))},e}();function zn(e){var t=[...arguments].slice(1),n=L.apply(void 0,b([e],t,!1)),r=`sc-global-${vt(JSON.stringify(n))}`,i=new Rn(n,r),a=new WeakMap,o=function(e){var t=Dn(),n=_.useContext(kn),s=a.get(t.styleSheet);return s===void 0&&(s=t.styleSheet.allocateGSInstance(r),a.set(t.styleSheet,s)),_.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,n,r,a){if(i.isStatic)i.renderStyles(e,Qe,n,a);else{var s=y(y({},t),{theme:st(t,r,o.defaultProps)});i.renderStyles(e,s,n,a)}}(s,e,t.styleSheet,n,t.stylis),function(){i.removeStyles(s,t.styleSheet)}},[s,e,t.styleSheet,n,t.stylis]),null};return _.memo(o)}(function(){function e(e,t){var n=this;this[Ln]=!0,this.inject=function(e,t){t===void 0&&(t=wn);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,`@keyframes`))},this.name=e,this.id=`sc-keyframes-${e}`,this.rules=t,Ht(this,function(){throw $e(12,String(n.name))})}return e.prototype.getName=function(e){return e===void 0&&(e=wn),this.name+e.hash},e})(),Ln=ln,function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return``;var n=Zt();return`<style ${zt([n&&`nonce="${n}"`,`${Ge}="true"`,`${qe}="${Je}"`].filter(Boolean),` `)}>${t}</style>`},this.getStyleTags=function(){if(e.sealed)throw $e(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw $e(2);var n=e.instance.toString();if(!n)return[];var r=((t={})[Ge]=``,t[qe]=Je,t.dangerouslySetInnerHTML={__html:n},t),i=Zt();return i&&(r.nonce=i),[_.createElement(`style`,y({},r,{key:`sc-0-0`}))]},this.seal=function(){e.sealed=!0},this.instance=new an({isServer:!0}),this.sealed=!1}return e.prototype.collectStyles=function(e){if(this.sealed)throw $e(2);return _.createElement(On,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw $e(3)},e}(),`${Ge}`;var Bn=`
  html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1.5;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
ul,
li {
  list-style-type: none;
}
button {
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: black;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

`,Vn=`4px 4px 10px 0 rgba(0, 0, 0, 0.35)`,Hn=`inset 2px 2px 3px rgba(0,0,0,0.2)`,Un=()=>L`
  -webkit-text-fill-color: ${({theme:e})=>e.materialTextDisabled};
  color: ${({theme:e})=>e.materialTextDisabled};
  text-shadow: 1px 1px ${({theme:e})=>e.materialTextDisabledShadow};
  /* filter: grayscale(100%); */
`,Wn=({background:e=`material`,color:t=`materialText`}={})=>L`
  box-sizing: border-box;
  display: inline-block;
  background: ${({theme:t})=>t[e]};
  color: ${({theme:e})=>e[t]};
`,Gn=({mainColor:e=`black`,secondaryColor:t=`transparent`,pixelSize:n=2})=>L`
  background-image: ${[`linear-gradient(
      45deg,
      ${e} 25%,
      transparent 25%,
      transparent 75%,
      ${e} 75%
    )`,`linear-gradient(
      45deg,
      ${e} 25%,
      transparent 25%,
      transparent 75%,
      ${e} 75%
    )`].join(`,`)};
  background-color: ${t};
  background-size: ${`${n*2}px ${n*2}px`};
  background-position: 0 0, ${`${n}px ${n}px`};
`,Kn=()=>L`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  color: ${({theme:e})=>e.materialText};
  background: ${({$disabled:e,theme:t})=>e?t.flatLight:t.canvas};
  border: 2px solid ${({theme:e})=>e.canvas};
  outline: 2px solid ${({theme:e})=>e.flatDark};
  outline-offset: -4px;
`,qn={button:{topLeftOuter:`borderLightest`,topLeftInner:`borderLight`,bottomRightInner:`borderDark`,bottomRightOuter:`borderDarkest`},buttonPressed:{topLeftOuter:`borderDarkest`,topLeftInner:`borderDark`,bottomRightInner:`borderLight`,bottomRightOuter:`borderLightest`},buttonThin:{topLeftOuter:`borderLightest`,topLeftInner:null,bottomRightInner:null,bottomRightOuter:`borderDark`},buttonThinPressed:{topLeftOuter:`borderDark`,topLeftInner:null,bottomRightInner:null,bottomRightOuter:`borderLightest`},field:{topLeftOuter:`borderDark`,topLeftInner:`borderDarkest`,bottomRightInner:`borderLight`,bottomRightOuter:`borderLightest`},grouping:{topLeftOuter:`borderDark`,topLeftInner:`borderLightest`,bottomRightInner:`borderDark`,bottomRightOuter:`borderLightest`},status:{topLeftOuter:`borderDark`,topLeftInner:null,bottomRightInner:null,bottomRightOuter:`borderLightest`},window:{topLeftOuter:`borderLight`,topLeftInner:`borderLightest`,bottomRightInner:`borderDark`,bottomRightOuter:`borderDarkest`}},Jn=({theme:e,topLeftInner:t,bottomRightInner:n,hasShadow:r=!1,hasInsetShadow:i=!1})=>[r?Vn:!1,i?Hn:!1,t===null?!1:`inset 1px 1px 0px 1px ${e[t]}`,n===null?!1:`inset -1px -1px 0 1px ${e[n]}`].filter(Boolean).join(`, `),Yn=({invert:e=!1,style:t=`button`}={})=>{let n={topLeftOuter:e?`bottomRightOuter`:`topLeftOuter`,topLeftInner:e?`bottomRightInner`:`topLeftInner`,bottomRightInner:e?`topLeftInner`:`bottomRightInner`,bottomRightOuter:e?`topLeftOuter`:`bottomRightOuter`};return L`
    border-style: solid;
    border-width: 2px;
    border-left-color: ${({theme:e})=>e[qn[t][n.topLeftOuter]]};
    border-top-color: ${({theme:e})=>e[qn[t][n.topLeftOuter]]};
    border-right-color: ${({theme:e})=>e[qn[t][n.bottomRightOuter]]};
    border-bottom-color: ${({theme:e})=>e[qn[t][n.bottomRightOuter]]};
    box-shadow: ${({theme:e,shadow:r})=>Jn({theme:e,topLeftInner:qn[t][n.topLeftInner],bottomRightInner:qn[t][n.bottomRightInner],hasShadow:r})};
  `},Xn=()=>L`
  outline: 2px dotted ${({theme:e})=>e.materialText};
`,Zn=typeof btoa<`u`?btoa:e=>Buffer.from(e).toString(`base64`),Qn=(e,t=0)=>`url(data:image/svg+xml;base64,${Zn(`<svg height="26" width="26" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g transform="rotate(${t} 13 13)">
      <polygon fill="${e}" points="6,10 20,10 13,17"/>
    </g>
  </svg>`)})`,$n=(e=`default`)=>L`
  ::-webkit-scrollbar {
    width: 26px;
    height: 26px;
  }
  ::-webkit-scrollbar-track {
    ${({theme:t})=>Gn({mainColor:e===`flat`?t.flatLight:t.material,secondaryColor:e===`flat`?t.canvas:t.borderLightest})}
  }
  ::-webkit-scrollbar-thumb {
    ${Wn()}
    ${e===`flat`?Kn():Yn({style:`window`})}
      outline-offset: -2px;
  }

  ::-webkit-scrollbar-corner {
    background-color: ${({theme:e})=>e.material};
  }
  ::-webkit-scrollbar-button {
    ${Wn()}
    ${e===`flat`?Kn():Yn({style:`window`})}
      display: block;
    outline-offset: -2px;
    height: 26px;
    width: 26px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 0;
  }
  ::-webkit-scrollbar-button:active,
  ::-webkit-scrollbar-button:active {
    background-position: 0 1px;
    ${e===`default`?Yn({style:`window`,invert:!0}):``}
  }

  ::-webkit-scrollbar-button:horizontal:increment:start,
  ::-webkit-scrollbar-button:horizontal:decrement:end,
  ::-webkit-scrollbar-button:vertical:increment:start,
  ::-webkit-scrollbar-button:vertical:decrement:end {
    display: none;
  }

  ::-webkit-scrollbar-button:horizontal:decrement {
    background-image: ${({theme:e})=>Qn(e.materialText,90)};
  }

  ::-webkit-scrollbar-button:horizontal:increment {
    background-image: ${({theme:e})=>Qn(e.materialText,270)};
  }

  ::-webkit-scrollbar-button:vertical:decrement {
    background-image: ${({theme:e})=>Qn(e.materialText,180)};
  }

  ::-webkit-scrollbar-button:vertical:increment {
    background-image: ${({theme:e})=>Qn(e.materialText,0)};
  }
`,er=R.a`
  color: ${({theme:e})=>e.anchor};
  font-size: inherit;
  text-decoration: ${({underline:e})=>e?`underline`:`none`};
  &:visited {
    color: ${({theme:e})=>e.anchorVisited};
  }
`,tr=(0,_.forwardRef)(({children:e,underline:t=!0,...n},r)=>_.createElement(er,{ref:r,underline:t,...n},e));tr.displayName=`Anchor`;var nr=R.header`
  ${Yn()};
  ${Wn()};

  position: ${e=>e.position??(e.fixed?`fixed`:`absolute`)};
  top: 0;
  right: 0;
  left: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`,rr=(0,_.forwardRef)(({children:e,fixed:t=!0,position:n=`fixed`,...r},i)=>_.createElement(nr,{fixed:t,position:t===!1?void 0:n,ref:i,...r},e));rr.displayName=`AppBar`;var ir=()=>{};function ar(e,t,n){return n!==null&&e>n?n:t!==null&&e<t?t:e}function or(e){if(Math.abs(e)<1){let t=e.toExponential().split(`e-`),n=t[0].split(`.`)[1];return(n?n.length:0)+parseInt(t[1],10)}let t=e.toString().split(`.`)[1];return t?t.length:0}function sr(e,t,n){let r=Math.round((e-n)/t)*t+n;return Number(r.toFixed(or(t)))}function cr(e){return typeof e==`number`?`${e}px`:e}var lr=R.div`
  display: inline-block;
  box-sizing: border-box;
  object-fit: contain;
  ${({size:e})=>`
    height: ${e};
    width: ${e};
    `}
  border-radius: ${({square:e})=>e?0:`50%`};
  overflow: hidden;
  ${({noBorder:e,theme:t})=>!e&&`
    border-top: 2px solid ${t.borderDark};
    border-left: 2px solid ${t.borderDark};
    border-bottom: 2px solid ${t.borderLightest};
    border-right: 2px solid ${t.borderLightest};
    background: ${t.material};
  `}
  ${({src:e})=>!e&&`
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: bold;
    font-size: 1rem;
  `}
`,ur=R.img`
  display: block;
  object-fit: contain;
  width: 100%;
  height: 100%;
`,dr=(0,_.forwardRef)(({alt:e=``,children:t,noBorder:n=!1,size:r=35,square:i=!1,src:a,...o},s)=>_.createElement(lr,{noBorder:n,ref:s,size:cr(r),square:i,src:a,...o},a?_.createElement(ur,{src:a,alt:e}):t));dr.displayName=`Avatar`;var fr={sm:`28px`,md:`36px`,lg:`44px`},pr=L`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${({size:e=`md`})=>fr[e]};
  width: ${({fullWidth:e,size:t=`md`,square:n})=>e?`100%`:n?fr[t]:`auto`};
  padding: ${({square:e})=>e?0:`0 10px`};
  font-size: 1rem;
  user-select: none;
  &:active {
    padding-top: ${({disabled:e})=>!e&&`2px`};
  }
  padding-top: ${({active:e,disabled:t})=>e&&!t&&`2px`};
  &:after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  &:not(:disabled) {
    cursor: pointer;
  }
  font-family: inherit;
`,mr=R.button`
  ${({active:e,disabled:t,primary:n,theme:r,variant:i})=>i===`flat`?L`
          ${Kn()}
          ${n?`
          border: 2px solid ${r.checkmark};
            outline: 2px solid ${r.flatDark};
            outline-offset: -4px;
          `:`
          border: 2px solid ${r.flatDark};
            outline: 2px solid transparent;
            outline-offset: -4px;
          `}
          &:focus:after, &:active:after {
            ${!e&&!t&&Xn}
            outline-offset: -4px;
          }
        `:i===`menu`||i===`thin`?L`
          ${Wn()};
          border: 2px solid transparent;
          &:hover,
          &:focus {
            ${!t&&!e&&Yn({style:`buttonThin`})}
          }
          &:active {
            ${!t&&Yn({style:`buttonThinPressed`})}
          }
          ${e&&Yn({style:`buttonThinPressed`})}
          ${t&&Un()}
        `:L`
          ${Wn()};
          border: none;
          ${t&&Un()}
          ${e?Gn({mainColor:r.material,secondaryColor:r.borderLightest}):``}
          &:before {
            box-sizing: border-box;
            content: '';
            position: absolute;
            ${n?L`
                  left: 2px;
                  top: 2px;
                  width: calc(100% - 4px);
                  height: calc(100% - 4px);
                  outline: 2px solid ${r.borderDarkest};
                `:L`
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                `}

            ${Yn(e?{style:i===`raised`?`window`:`button`,invert:!0}:{style:i===`raised`?`window`:`button`,invert:!1})}
          }
          &:active:before {
            ${!t&&Yn({style:i===`raised`?`window`:`button`,invert:!0})}
          }
          &:focus:after,
          &:active:after {
            ${!e&&!t&&Xn}
            outline-offset: -8px;
          }
          &:active:focus:after,
          &:active:after {
            top: ${e?`0`:`1px`};
          }
        `}
  ${pr}
`,z=(0,_.forwardRef)(({onClick:e,disabled:t=!1,children:n,type:r=`button`,fullWidth:i=!1,size:a=`md`,square:o=!1,active:s=!1,onTouchStart:c=ir,primary:l=!1,variant:u=`default`,...d},f)=>_.createElement(mr,{active:s,disabled:t,$disabled:t,fullWidth:i,onClick:t?void 0:e,onTouchStart:c,primary:l,ref:f,size:a,square:o,type:r,variant:u,...d},n));z.displayName=`Button`;function hr({defaultValue:e,onChange:t,onChangePropName:n=`onChange`,readOnly:r,value:i,valuePropName:a=`value`}){let o=i!==void 0,[s,c]=(0,_.useState)(e),l=(0,_.useCallback)(e=>{o||c(e)},[o]);if(o&&typeof t!=`function`&&!r){let e=`Warning: You provided a \`${a}\` prop to a component without an \`${n}\` handler.${a===`value`?`This will render a read-only field. If the field should be mutable use \`defaultValue\`. Otherwise, set either \`${n}\` or \`readOnly\`.`:`This breaks the component state. You must provide an \`${n}\` function that updates \`${a}\`.`}`;console.warn(e)}return[o?i:s,l]}var gr=R.li`
  box-sizing: border-box;

  display: flex;
  align-items: center;
  position: relative;
  height: ${e=>fr[e.size]};
  width: ${e=>e.square?fr[e.size]:`auto`};
  padding: 0 8px;
  font-size: 1rem;
  white-space: nowrap;
  justify-content: ${e=>e.square?`space-around`:`space-between`};
  text-align: center;
  line-height: ${e=>fr[e.size]};
  color: ${({theme:e})=>e.materialText};
  pointer-events: ${({$disabled:e})=>e?`none`:`auto`};
  font-weight: ${({primary:e})=>e?`bold`:`normal`};
  &:hover {
    ${({theme:e,$disabled:t})=>!t&&`
        color: ${e.materialTextInvert};
        background: ${e.hoverBackground};
      `}

    cursor: default;
  }
  ${e=>e.$disabled&&Un()}
`,_r=(0,_.forwardRef)(({size:e=`lg`,disabled:t,square:n,children:r,onClick:i,primary:a,...o},s)=>_.createElement(gr,{$disabled:t,size:e,square:n,onClick:t?void 0:i,primary:a,role:`menuitem`,ref:s,"aria-disabled":t,...o},r));_r.displayName=`MenuListItem`;var vr=R.ul.attrs(()=>({role:`menu`}))`
  box-sizing: border-box;
  width: ${e=>e.fullWidth?`100%`:`auto`};
  padding: 4px;
  ${Yn({style:`window`})}
  ${Wn()}
  ${e=>e.inline&&`
    display: inline-flex;
    align-items: center;
  `}
  list-style: none;
  position: relative;
`;vr.displayName=`MenuList`;var yr=R.input`
  position: absolute;
  left: 0;
  margin: 0;
  width: ${20}px;
  height: ${20}px;
  opacity: 0;
  z-index: -1;
`,br=R.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  margin: 8px 0;
  cursor: ${({$disabled:e})=>e?`auto`:`pointer`};
  user-select: none;
  font-size: 1rem;
  color: ${({theme:e})=>e.materialText};
  ${e=>e.$disabled&&Un()}

  ${gr} & {
    margin: 0;
    height: 100%;
  }
  ${gr}:hover & {
    ${({$disabled:e,theme:t})=>!e&&L`
        color: ${t.materialTextInvert};
      `};
  }
`,xr=R.span`
  display: inline-block;
  line-height: 1;
  padding: 2px;
  ${yr}:focus ~ & {
    ${Xn}
  }
  ${yr}:not(:disabled) ~ &:active {
    ${Xn}
  }
`,Sr=R.div`
  position: relative;
  box-sizing: border-box;
  padding: 2px;
  font-size: 1rem;
  border-style: solid;
  border-width: 2px;
  border-left-color: ${({theme:e})=>e.borderDark};
  border-top-color: ${({theme:e})=>e.borderDark};
  border-right-color: ${({theme:e})=>e.borderLightest};
  border-bottom-color: ${({theme:e})=>e.borderLightest};
  line-height: 1.5;
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: calc(100% - 4px);
    height: calc(100% - 4px);

    border-style: solid;
    border-width: 2px;
    border-left-color: ${({theme:e})=>e.borderDarkest};
    border-top-color: ${({theme:e})=>e.borderDarkest};
    border-right-color: ${({theme:e})=>e.borderLight};
    border-bottom-color: ${({theme:e})=>e.borderLight};

    pointer-events: none;
    ${e=>e.shadow&&`box-shadow:inset 2px 2px 3px rgba(0,0,0,0.2);`}
  }
`,Cr=R.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 4px;
  overflow: auto;
  ${$n()}
`,wr=(0,_.forwardRef)(({children:e,shadow:t=!0,...n},r)=>_.createElement(Sr,{ref:r,shadow:t,...n},_.createElement(Cr,null,e)));wr.displayName=`ScrollView`;var Tr=L`
  width: ${20}px;
  height: ${20}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 0.5rem;
`,Er=R(Sr)`
  ${Tr}
  width: ${20}px;
  height: ${20}px;
  background: ${({$disabled:e,theme:t})=>e?t.material:t.canvas};
  &:before {
    box-shadow: none;
  }
`,Dr=R.div`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  background: ${({$disabled:e,theme:t})=>e?t.flatLight:t.canvas};
  ${Tr}
  width: ${16}px;
  height: ${16}px;
  outline: none;
  border: 2px solid ${({theme:e})=>e.flatDark};
  background: ${({$disabled:e,theme:t})=>e?t.flatLight:t.canvas};
`,Or=R.span.attrs(()=>({"data-testid":`checkmarkIcon`}))`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: calc(50% - 1px);
    width: 3px;
    height: 7px;

    border: solid
      ${({$disabled:e,theme:t})=>e?t.checkmarkDisabled:t.checkmark};
    border-width: 0 3px 3px 0;
    transform: translate(-50%, -50%) rotate(45deg);

    border-color: ${e=>e.$disabled?e.theme.checkmarkDisabled:e.theme.checkmark};
  }
`,kr=R.span.attrs(()=>({"data-testid":`indeterminateIcon`}))`
  display: inline-block;
  position: relative;

  width: 100%;
  height: 100%;

  &:after {
    content: '';
    display: block;

    width: 100%;
    height: 100%;

    ${({$disabled:e,theme:t})=>Gn({mainColor:e?t.checkmarkDisabled:t.checkmark})}
    background-position: 0px 0px, 2px 2px;
  }
`,Ar={flat:Dr,default:Er},jr=(0,_.forwardRef)(({checked:e,className:t=``,defaultChecked:n=!1,disabled:r=!1,indeterminate:i=!1,label:a=``,onChange:o=ir,style:s={},value:c,variant:l=`default`,...u},d)=>{let[f,p]=hr({defaultValue:n,onChange:o,readOnly:u.readOnly??r,value:e}),m=(0,_.useCallback)(e=>{let t=e.target.checked;p(t),o(e)},[o,p]),h=Ar[l],g=null;return i?g=kr:f&&(g=Or),_.createElement(br,{$disabled:r,className:t,style:s},_.createElement(yr,{disabled:r,onChange:r?void 0:m,readOnly:r,type:`checkbox`,value:c,checked:f,"data-indeterminate":i,ref:d,...u}),_.createElement(h,{$disabled:r,role:`presentation`},g&&_.createElement(g,{$disabled:r,variant:l})),a&&_.createElement(xr,null,a))});jr.displayName=`Checkbox`;var Mr=R.div`
  ${({orientation:e,theme:t,size:n=`100%`})=>e===`vertical`?`
    height: ${cr(n)};
    border-left: 2px solid ${t.borderDark};
    border-right: 2px solid ${t.borderLightest};
    margin: 0;
    `:`
    width: ${cr(n)};
    border-bottom: 2px solid ${t.borderLightest};
    border-top: 2px solid ${t.borderDark};
    margin: 0;
    `}
`;Mr.displayName=`Separator`;var Nr=R(mr)`
  padding-left: 8px;
`,Pr=R(Mr)`
  height: 21px;
  position: relative;
  top: 0;
`,Fr=R.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`,Ir=R.div`
  box-sizing: border-box;
  height: 19px;
  display: inline-block;
  width: 35px;
  margin-right: 5px;

  background: ${({color:e})=>e};

  ${({$disabled:e})=>e?L`
          border: 2px solid ${({theme:e})=>e.materialTextDisabled};
          filter: drop-shadow(
            1px 1px 0px ${({theme:e})=>e.materialTextDisabledShadow}
          );
        `:L`
          border: 2px solid ${({theme:e})=>e.materialText};
        `}
  ${Fr}:focus:not(:active) + &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    ${Xn}
    outline-offset: -8px;
  }
`,Lr=R.span`
  width: 0px;
  height: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  display: inline-block;
  margin-left: 6px;

  ${({$disabled:e})=>e?L`
          border-top: 6px solid ${({theme:e})=>e.materialTextDisabled};
          filter: drop-shadow(
            1px 1px 0px ${({theme:e})=>e.materialTextDisabledShadow}
          );
        `:L`
          border-top: 6px solid ${({theme:e})=>e.materialText};
        `}
  &:after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: ${({variant:e})=>e===`flat`?`6px`:`8px`};
    right: 8px;
    width: 16px;
    height: 19px;
  }
`,Rr=(0,_.forwardRef)(({value:e,defaultValue:t,onChange:n=ir,disabled:r=!1,variant:i=`default`,...a},o)=>{let[s,c]=hr({defaultValue:t,onChange:n,readOnly:a.readOnly??r,value:e});return _.createElement(Nr,{disabled:r,as:`div`,variant:i,size:`md`},_.createElement(Fr,{onChange:e=>{let t=e.target.value;c(t),n(e)},readOnly:r,disabled:r,value:s??`#008080`,type:`color`,ref:o,...a}),_.createElement(Ir,{$disabled:r,color:s??`#008080`,role:`presentation`}),i===`default`&&_.createElement(Pr,{orientation:`vertical`}),_.createElement(Lr,{$disabled:r,variant:i}))});Rr.displayName=`ColorInput`;var zr=R.div`
  position: relative;
  --react95-digit-primary-color: #ff0102;
  --react95-digit-secondary-color: #740201;
  --react95-digit-bg-color: #000000;

  ${({pixelSize:e})=>L`
    width: ${11*e}px;
    height: ${21*e}px;
    margin: ${e}px;

    span,
    span:before,
    span:after {
      box-sizing: border-box;
      display: inline-block;
      position: absolute;
    }
    span.active,
    span.active:before,
    span.active:after {
      background: var(--react95-digit-primary-color);
    }
    span:not(.active),
    span:not(.active):before,
    span:not(.active):after {
      ${Gn({mainColor:`var(--react95-digit-bg-color)`,secondaryColor:`var(--react95-digit-secondary-color)`,pixelSize:e})}
    }

    span.horizontal,
    span.horizontal:before,
    span.horizontal:after {
      height: ${e}px;
      border-left: ${e}px solid var(--react95-digit-bg-color);
      border-right: ${e}px solid var(--react95-digit-bg-color);
    }
    span.horizontal.active,
    span.horizontal.active:before,
    span.horizontal.active:after {
      height: ${e}px;
      border-left: ${e}px solid var(--react95-digit-primary-color);
      border-right: ${e}px solid var(--react95-digit-primary-color);
    }
    span.horizontal {
      left: ${e}px;
      width: ${9*e}px;
    }
    span.horizontal:before {
      content: '';
      width: 100%;
      top: ${e}px;
      left: ${0}px;
    }
    span.horizontal:after {
      content: '';
      width: calc(100% - ${e*2}px);
      top: ${2*e}px;
      left: ${e}px;
    }
    span.horizontal.top {
      top: 0;
    }
    span.horizontal.bottom {
      bottom: 0;
      transform: rotateX(180deg);
    }

    span.center,
    span.center:before,
    span.center:after {
      height: ${e}px;
      border-left: ${e}px solid var(--react95-digit-bg-color);
      border-right: ${e}px solid var(--react95-digit-bg-color);
    }
    span.center.active,
    span.center.active:before,
    span.center.active:after {
      border-left: ${e}px solid var(--react95-digit-primary-color);
      border-right: ${e}px solid var(--react95-digit-primary-color);
    }
    span.center {
      top: 50%;
      transform: translateY(-50%);
      left: ${e}px;
      width: ${9*e}px;
    }
    span.center:before,
    span.center:after {
      content: '';
      width: 100%;
    }
    span.center:before {
      top: ${e}px;
    }
    span.center:after {
      bottom: ${e}px;
    }

    span.vertical,
    span.vertical:before,
    span.vertical:after {
      width: ${e}px;
      border-top: ${e}px solid var(--react95-digit-bg-color);
      border-bottom: ${e}px solid var(--react95-digit-bg-color);
    }
    span.vertical {
      height: ${11*e}px;
    }
    span.vertical.left {
      left: 0;
    }
    span.vertical.right {
      right: 0;
      transform: rotateY(180deg);
    }
    span.vertical.top {
      top: 0px;
    }
    span.vertical.bottom {
      bottom: 0px;
    }
    span.vertical:before {
      content: '';
      height: 100%;
      top: ${0}px;
      left: ${e}px;
    }
    span.vertical:after {
      content: '';
      height: calc(100% - ${e*2}px);
      top: ${e}px;
      left: ${e*2}px;
    }
  `}
`,Br=[`horizontal top`,`center`,`horizontal bottom`,`vertical top left`,`vertical top right`,`vertical bottom left`,`vertical bottom right`],Vr=[[1,0,1,1,1,1,1],[0,0,0,0,1,0,1],[1,1,1,0,1,1,0],[1,1,1,0,1,0,1],[0,1,0,1,1,0,1],[1,1,1,1,0,0,1],[1,1,1,1,0,1,1],[1,0,0,0,1,0,1],[1,1,1,1,1,1,1],[1,1,1,1,1,0,1]];function Hr({digit:e=0,pixelSize:t=2,...n}){let r=Vr[Number(e)].map((e,t)=>e?`${Br[t]} active`:Br[t]);return _.createElement(zr,{pixelSize:t,...n},r.map((e,t)=>_.createElement(`span`,{className:e,key:t})))}var Ur=R.div`
  ${Yn({style:`status`})}
  display: inline-flex;
  background: #000000;
`,Wr={sm:1,md:2,lg:3,xl:4},Gr=(0,_.forwardRef)(({value:e=0,minLength:t=3,size:n=`md`,...r},i)=>{let a=(0,_.useMemo)(()=>e.toString().padStart(t,`0`).split(``),[t,e]);return _.createElement(Ur,{ref:i,...r},a.map((e,t)=>_.createElement(Hr,{digit:e,pixelSize:Wr[n],key:t})))});Gr.displayName=`Counter`;var Kr=L`
  display: flex;
  align-items: center;
  width: ${({fullWidth:e})=>e?`100%`:`auto`};
  min-height: ${fr.md};
`,qr=R(Sr).attrs({"data-testid":`variant-default`})`
  ${Kr}
  background: ${({$disabled:e,theme:t})=>e?t.material:t.canvas};
`,Jr=R.div.attrs({"data-testid":`variant-flat`})`
  ${Kn()}
  ${Kr}
  position: relative;
`,Yr=L`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background: none;
  font-size: 1rem;
  min-height: 27px;
  font-family: inherit;
  color: ${({theme:e})=>e.canvasText};
  ${({disabled:e,variant:t})=>t!==`flat`&&e&&Un()}
`,Xr=R.input`
  ${Yr}
  padding: 0 8px;
`,Zr=R.textarea`
  ${Yr}
  padding: 8px;
  resize: none;
  ${({variant:e})=>$n(e)}
`,Qr=(0,_.forwardRef)(({className:e,disabled:t=!1,fullWidth:n,onChange:r=ir,shadow:i=!0,style:a,variant:o=`default`,...s},c)=>{let l=o===`flat`?Jr:qr,u=(0,_.useMemo)(()=>s.multiline?_.createElement(Zr,{disabled:t,onChange:t?void 0:r,readOnly:t,ref:c,variant:o,...s}):_.createElement(Xr,{disabled:t,onChange:t?void 0:r,readOnly:t,ref:c,type:s.type??`text`,variant:o,...s}),[t,r,s,c,o]);return _.createElement(l,{className:e,fullWidth:n,$disabled:t,shadow:i,style:a},u)});Qr.displayName=`TextInput`;var $r=R.div`
  display: inline-flex;
  align-items: center;
`,ei=R(z)`
  width: 30px;
  padding: 0;
  flex-shrink: 0;

  ${({variant:e})=>e===`flat`?L`
          height: calc(50% - 1px);
        `:L`
          height: 50%;
        `}
`,ti=R.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;

  ${({variant:e})=>e===`flat`?L`
          height: calc(${fr.md} - 4px);
        `:L`
          height: ${fr.md};
          margin-left: 2px;
        `}
`,ni=R.span`
  width: 0px;
  height: 0px;
  display: inline-block;
  ${({invert:e})=>e?L`
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid ${({theme:e})=>e.materialText};
        `:L`
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid ${({theme:e})=>e.materialText};
        `}
  ${ei}:disabled & {
    filter: drop-shadow(
      1px 1px 0px ${({theme:e})=>e.materialTextDisabledShadow}
    );
    ${({invert:e})=>e?L`
            border-bottom-color: ${({theme:e})=>e.materialTextDisabled};
          `:L`
            border-top-color: ${({theme:e})=>e.materialTextDisabled};
          `}
  }
`,ri=(0,_.forwardRef)(({className:e,defaultValue:t,disabled:n=!1,max:r,min:i,onChange:a,readOnly:o,step:s=1,style:c,value:l,variant:u=`default`,width:d,...f},p)=>{let[m,h]=hr({defaultValue:t,onChange:a,readOnly:o,value:l}),g=(0,_.useCallback)(e=>{h(parseFloat(e.target.value))},[h]),v=(0,_.useCallback)(e=>{let t=ar(parseFloat(((m??0)+e).toFixed(2)),i??null,r??null);h(t),a?.(t)},[r,i,a,h,m]),y=(0,_.useCallback)(()=>{m!==void 0&&a?.(m)},[a,m]),b=(0,_.useCallback)(()=>{v(s)},[v,s]),x=(0,_.useCallback)(()=>{v(-s)},[v,s]),S=u===`flat`?`flat`:`raised`;return _.createElement($r,{className:e,style:{...c,width:d===void 0?`auto`:cr(d)},...f},_.createElement(Qr,{value:m,variant:u,onChange:g,disabled:n,type:`number`,readOnly:o,ref:p,fullWidth:!0,onBlur:y}),_.createElement(ti,{variant:u},_.createElement(ei,{"data-testid":`increment`,variant:S,disabled:n||o,onClick:b},_.createElement(ni,{invert:!0})),_.createElement(ei,{"data-testid":`decrement`,variant:S,disabled:n||o,onClick:x},_.createElement(ni,null))))});ri.displayName=`NumberInput`;function ii(){let e=``;for(let t=0;t<10;t+=1)e+=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`[Math.floor(Math.random()*62)];return e}var ai=e=>(0,_.useMemo)(()=>e??ii(),[e]),oi=L`
  box-sizing: border-box;
  padding-left: 4px;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  line-height: 100%;
`,si=L`
  background: ${({theme:e})=>e.hoverBackground};
  color: ${({theme:e})=>e.canvasTextInvert};
`,ci=R.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  &:focus {
    outline: none;
  }
`,li=R.div`
  ${oi}
  padding-right: 8px;
  align-items: center;
  display: flex;
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  margin: 0 2px;
  border: 2px solid transparent;
  ${ci}:focus & {
    ${si}
    border: 2px dotted ${({theme:e})=>e.focusSecondary};
  }
`,ui=L`
  height: ${fr.md};
  display: inline-block;
  color: ${({$disabled:e=!1,theme:t})=>e?Un():t.canvasText};
  font-size: 1rem;
  cursor: ${({$disabled:e})=>e?`default`:`pointer`};
`,di=R(Sr)`
  ${ui}
  background: ${({$disabled:e=!1,theme:t})=>e?t.material:t.canvas};
  &:focus {
    outline: 0;
  }
`,fi=R.div`
  ${Kn()}
  ${ui}
  background: ${({$disabled:e=!1,theme:t})=>e?t.flatLight:t.canvas};
`,pi=R.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
  font-size: 1rem;
  border: 0;
  margin: 0;
  background: none;
  -webkit-tap-highlight-color: transparent;
  border-radius: 0;
  padding-right: 30px;
  ${oi}
  cursor: pointer;
  &:disabled {
    ${Un()};
    background: ${({theme:e})=>e.material};
    cursor: default;
  }
`,mi=R(mr).attrs(()=>({"aria-hidden":`true`}))`
  width: 30px;
  padding: 0;
  flex-shrink: 0;
  ${({variant:e=`default`})=>e===`flat`?L`
          height: 100%;
          margin-right: 0;
        `:L`
          height: 100%;
        `}
  ${({native:e=!1,variant:t=`default`})=>e&&(t===`flat`?`
      position: absolute;
      right: 0;
      height: 100%;
      `:`
    position: absolute;
    top: 2px;
    right: 2px;
    height: calc(100% - 4px);
    `)}
    pointer-events: ${({$disabled:e=!1,native:t=!1})=>e||t?`none`:`auto`}
`,hi=R.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  display: inline-block;
  border-top: 6px solid
    ${({$disabled:e=!1,theme:t})=>e?t.materialTextDisabled:t.materialText};
  ${({$disabled:e=!1,theme:t})=>e&&`
    filter: drop-shadow(1px 1px 0px ${t.materialTextDisabledShadow});
    border-top-color: ${t.materialTextDisabled};
    `}
  ${mi}:active & {
    margin-top: 2px;
  }
`,gi=R.ul`
  box-sizing: border-box;

  font-size: 1rem;
  position: absolute;
  transform: translateY(100%);
  left: 0;
  background: ${({theme:e})=>e.canvas};
  padding: 2px;
  border-top: none;
  cursor: default;
  z-index: 1;
  cursor: pointer;
  box-shadow: ${Vn};
  ${({variant:e=`default`})=>e===`flat`?L`
          bottom: 2px;
          width: 100%;
          border: 2px solid ${({theme:e})=>e.flatDark};
        `:L`
          bottom: -2px;
          width: calc(100% - 2px);
          border: 2px solid ${({theme:e})=>e.borderDarkest};
        `}
  ${({variant:e=`default`})=>$n(e)}
`,_i=R.li`
  box-sizing: border-box;

  width: 100%;
  padding-left: 8px;

  height: calc(${fr.md} - 4px);
  line-height: calc(${fr.md} - 4px);
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({theme:e})=>e.canvasText};
  &:focus {
    outline: 0;
  }
  ${({active:e})=>e?si:``}
  user-select: none;
`,vi=[],yi=({className:e,defaultValue:t,disabled:n,native:r,onChange:i,options:a=vi,readOnly:o,style:s,value:c,variant:l,width:u})=>{let d=(0,_.useMemo)(()=>a.filter(Boolean),[a]),[f,p]=hr({defaultValue:t??d?.[0]?.value,onChange:i,readOnly:o,value:c}),m=!(n||o),h=(0,_.useMemo)(()=>({className:e,style:{...s,width:u}}),[e,s,u]),g=(0,_.useMemo)(()=>_.createElement(mi,{as:`div`,"data-testid":`select-button`,$disabled:n,native:r,tabIndex:-1,variant:l===`flat`?`flat`:`raised`},_.createElement(hi,{"data-testid":`select-icon`,$disabled:n})),[n,r,l]),v=(0,_.useMemo)(()=>l===`flat`?fi:di,[l]);return(0,_.useMemo)(()=>({isEnabled:m,options:d,value:f,setValue:p,wrapperProps:h,DropdownButton:g,Wrapper:v}),[g,v,m,d,p,f,h])},bi={ARROW_DOWN:`ArrowDown`,ARROW_LEFT:`ArrowLeft`,ARROW_RIGHT:`ArrowRight`,ARROW_UP:`ArrowUp`,END:`End`,ENTER:`Enter`,ESC:`Escape`,HOME:`Home`,SPACE:`Space`,TAB:`Tab`},xi=1e3,Si=({onBlur:e,onChange:t,onClose:n,onFocus:r,onKeyDown:i,onMouseDown:a,onOpen:o,open:s,options:c,readOnly:l,value:u,selectRef:d,setValue:f,wrapperRef:p})=>{let m=(0,_.useRef)(null),h=(0,_.useRef)([]),g=(0,_.useRef)(0),v=(0,_.useRef)(0),y=(0,_.useRef)(),b=(0,_.useRef)(`search`),x=(0,_.useRef)(``),S=(0,_.useRef)(),[C,w]=hr({defaultValue:!1,onChange:o,onChangePropName:`onOpen`,readOnly:l,value:s,valuePropName:`open`}),T=(0,_.useMemo)(()=>{let e=c.findIndex(e=>e.value===u);return g.current=ar(e,0,null),c[e]},[c,u]),[ee,te]=(0,_.useState)(c[0]),E=(0,_.useCallback)(e=>{let t=m.current,n=h.current[e];if(!n||!t){y.current=e;return}y.current=void 0;let r=t.clientHeight,i=t.scrollTop,a=t.scrollTop+r,o=n.offsetTop,s=n.offsetHeight,c=n.offsetTop+n.offsetHeight;o<i&&t.scrollTo(0,o),c>a&&t.scrollTo(0,o-r+s),n.focus({preventScroll:!0})},[m]),D=(0,_.useCallback)((e,{scroll:t}={})=>{let n=c.length-1,r;switch(e){case`first`:r=0;break;case`last`:r=n;break;case`next`:r=ar(v.current+1,0,n);break;case`previous`:r=ar(v.current-1,0,n);break;case`selected`:r=ar(g.current??0,0,n);break;default:r=e}v.current=r,te(c[r]),t&&E(r)},[v,c,E]),ne=(0,_.useCallback)(({fromEvent:e})=>{w(!0),D(`selected`,{scroll:!0}),o?.({fromEvent:e})},[D,o,w]),O=(0,_.useCallback)(()=>{b.current=`search`,x.current=``,clearTimeout(S.current)},[]),k=(0,_.useCallback)(({focusSelect:e,fromEvent:t})=>{var r;n?.({fromEvent:t}),w(!1),te(c[0]),O(),y.current=void 0,e&&((r=d.current)==null||r.focus())},[O,n,c,d,w]),re=(0,_.useCallback)(({fromEvent:e})=>{C?k({focusSelect:!1,fromEvent:e}):ne({fromEvent:e})},[k,ne,C]),ie=(0,_.useCallback)((e,{fromEvent:n})=>{g.current!==e&&(g.current=e,f(c[e].value),t?.(c[e],{fromEvent:n}))},[t,c,f]),A=(0,_.useCallback)(({focusSelect:e,fromEvent:t})=>{ie(v.current,{fromEvent:t}),k({focusSelect:e,fromEvent:t})},[k,ie]),j=(0,_.useCallback)((e,{fromEvent:t,select:n})=>{switch(b.current===`cycleFirstLetter`&&e!==x.current&&(b.current=`search`),e===x.current?b.current=`cycleFirstLetter`:x.current+=e,b.current){case`search`:{let r=c.findIndex(e=>e.label?.toLocaleUpperCase().indexOf(x.current)===0);r<0&&(r=c.findIndex(t=>t.label?.toLocaleUpperCase().indexOf(e)===0),x.current=e),r>=0&&(n?ie(r,{fromEvent:t}):D(r,{scroll:!0}));break}case`cycleFirstLetter`:{let r=n?g.current??-1:v.current,i=c.findIndex((t,n)=>n>r&&t.label?.toLocaleUpperCase().indexOf(e)===0);i<0&&(i=c.findIndex(t=>t.label?.toLocaleUpperCase().indexOf(e)===0)),i>=0&&(n?ie(i,{fromEvent:t}):D(i,{scroll:!0}));break}}clearTimeout(S.current),S.current=setTimeout(()=>{b.current===`search`&&(x.current=``)},xi)},[D,c,ie]),M=(0,_.useCallback)(e=>{var t;e.button===0&&(e.preventDefault(),(t=d.current)==null||t.focus(),re({fromEvent:e}),a?.(e))},[a,d,re]),N=(0,_.useCallback)(e=>{A({focusSelect:!0,fromEvent:e})},[A]),ae=(0,_.useCallback)(e=>{let{altKey:t,code:n,ctrlKey:r,metaKey:i,shiftKey:a}=e,{ARROW_DOWN:o,ARROW_UP:s,END:c,ENTER:l,ESC:u,HOME:d,SPACE:f,TAB:p}=bi,m=t||r||i||a;if(!(n===p&&(t||r||i)||n!==p&&m))switch(n){case o:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`next`,{scroll:!0});break;case s:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`previous`,{scroll:!0});break;case c:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`last`,{scroll:!0});break;case l:if(!C)return;e.preventDefault(),A({focusSelect:!0,fromEvent:e});break;case u:if(!C)return;e.preventDefault(),k({focusSelect:!0,fromEvent:e});break;case d:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`first`,{scroll:!0});break;case f:e.preventDefault(),C?A({focusSelect:!0,fromEvent:e}):ne({fromEvent:e});break;case p:if(!C)return;a||e.preventDefault(),A({focusSelect:!a,fromEvent:e});break;default:!m&&n.match(/^Key/)&&(e.preventDefault(),e.stopPropagation(),j(n.replace(/^Key/,``),{select:!C,fromEvent:e}))}},[D,k,C,ne,j,A]),P=(0,_.useCallback)(e=>{ae(e),i?.(e)},[ae,i]),oe=(0,_.useCallback)(e=>{D(e)},[D]),F=(0,_.useCallback)(t=>{C||(O(),e?.(t))},[O,e,C]),I=(0,_.useCallback)(e=>{O(),r?.(e)},[O,r]),se=(0,_.useCallback)(e=>{m.current=e,y.current!==void 0&&E(y.current)},[E]),ce=(0,_.useCallback)((e,t)=>{h.current[t]=e,y.current===t&&E(y.current)},[E]);return(0,_.useEffect)(()=>{if(!C)return()=>{};let e=e=>{let t=e.target;p.current?.contains(t)||(e.preventDefault(),k({focusSelect:!1,fromEvent:e}))};return document.addEventListener(`mousedown`,e),()=>{document.removeEventListener(`mousedown`,e)}},[k,C,p]),(0,_.useMemo)(()=>({activeOption:ee,handleActivateOptionIndex:oe,handleBlur:F,handleButtonKeyDown:P,handleDropdownKeyDown:ae,handleFocus:I,handleMouseDown:M,handleOptionClick:N,handleSetDropdownRef:se,handleSetOptionRef:ce,open:C,selectedOption:T}),[ee,oe,F,P,I,ae,M,N,se,ce,C,T])},Ci=(0,_.forwardRef)(({className:e,defaultValue:t,disabled:n,onChange:r,options:i,readOnly:a,style:o,value:s,variant:c,width:l,...u},d)=>{let{isEnabled:f,options:p,setValue:m,value:h,DropdownButton:g,Wrapper:v}=yi({defaultValue:t,disabled:n,native:!0,onChange:r,options:i,readOnly:a,value:s,variant:c}),y=(0,_.useCallback)(e=>{let t=p.find(t=>t.value===e.target.value);t&&(m(t.value),r?.(t,{fromEvent:e}))},[r,p,m]);return _.createElement(v,{className:e,style:{...o,width:l}},_.createElement(ci,null,_.createElement(pi,{...u,disabled:n,onChange:f?y:ir,ref:d,value:h},p.map((e,t)=>_.createElement(`option`,{key:`${e.value}-${t}`,value:e.value},e.label??e.value))),g))});Ci.displayName=`SelectNative`;function wi({activateOptionIndex:e,active:t,index:n,onClick:r,option:i,selected:a,setRef:o}){let s=(0,_.useCallback)(()=>{e(n)},[e,n]),c=(0,_.useCallback)(e=>{o(e,n)},[n,o]),l=ai();return _.createElement(_i,{active:t,"aria-selected":a?`true`:void 0,"data-value":i.value,id:l,onClick:r,onMouseEnter:s,ref:c,role:`option`,tabIndex:0},i.label)}function Ti({"aria-label":e,"aria-labelledby":t,className:n,defaultValue:r,disabled:i=!1,formatDisplay:a,inputProps:o,labelId:s,menuMaxHeight:c,name:l,onBlur:u,onChange:d,onClose:f,onFocus:p,onKeyDown:m,onMouseDown:h,onOpen:g,open:v,options:y,readOnly:b,shadow:x=!0,style:S,variant:C=`default`,value:w,width:T=`auto`,...ee},te){let{isEnabled:E,options:D,setValue:ne,value:O,wrapperProps:k,DropdownButton:re,Wrapper:ie}=yi({className:n,defaultValue:r,disabled:i,native:!1,onChange:d,options:y,style:S,readOnly:b,value:w,variant:C,width:T}),A=(0,_.useRef)(null),j=(0,_.useRef)(null),M=(0,_.useRef)(null),{activeOption:N,handleActivateOptionIndex:ae,handleBlur:P,handleButtonKeyDown:oe,handleDropdownKeyDown:F,handleFocus:I,handleMouseDown:se,handleOptionClick:ce,handleSetDropdownRef:le,handleSetOptionRef:ue,open:de,selectedOption:fe}=Si({onBlur:u,onChange:d,onClose:f,onFocus:p,onKeyDown:m,onMouseDown:h,onOpen:g,open:v,options:D,value:O,selectRef:j,setValue:ne,wrapperRef:M});(0,_.useImperativeHandle)(te,()=>({focus:e=>{var t;(t=j.current)==null||t.focus(e)},node:A.current,value:String(O)}),[O]);let pe=(0,_.useMemo)(()=>fe?typeof a==`function`?a(fe):fe.label:``,[a,fe]),me=E?1:void 0,he=(0,_.useMemo)(()=>c?{overflow:`auto`,maxHeight:c}:void 0,[c]),ge=ai(),_e=(0,_.useMemo)(()=>D.map((e,t)=>{let n=`${O}-${t}`,r=e===N,i=e===fe;return _.createElement(wi,{activateOptionIndex:ae,active:r,index:t,key:n,onClick:ce,option:e,selected:i,setRef:ue})}),[N,ae,ce,ue,D,fe,O]);return _.createElement(ie,{...k,$disabled:i,ref:M,shadow:x,style:{...S,width:T}},_.createElement(`input`,{name:l,ref:A,type:`hidden`,value:String(O),...o}),_.createElement(ci,{"aria-disabled":i,"aria-expanded":de,"aria-haspopup":`listbox`,"aria-label":e,"aria-labelledby":t??s,"aria-owns":E&&de?ge:void 0,onBlur:P,onFocus:I,onKeyDown:oe,onMouseDown:E?se:h,ref:j,role:`button`,tabIndex:me,...ee},_.createElement(li,null,pe),re),E&&de&&_.createElement(gi,{id:ge,onKeyDown:F,ref:le,role:`listbox`,style:he,tabIndex:0,variant:C},_e))}var Ei=(0,_.forwardRef)(Ti);Ei.displayName=`Select`;var Di=R.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${e=>e.noPadding?`0`:`4px`};
`,Oi=(0,_.forwardRef)(function({children:e,noPadding:t=!1,...n},r){return _.createElement(Di,{noPadding:t,ref:r,...n},e)});Oi.displayName=`Toolbar`;var ki=R.div`
  padding: 16px;
`,Ai=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(ki,{ref:n,...t},e)});Ai.displayName=`WindowContent`;var ji=R.div`
  height: 33px;
  line-height: 33px;
  padding-left: 0.25rem;
  padding-right: 3px;
  font-weight: bold;
  border: 2px solid ${({theme:e})=>e.material};
  ${({active:e})=>e===!1?L`
          background: ${({theme:e})=>e.headerNotActiveBackground};
          color: ${({theme:e})=>e.headerNotActiveText};
        `:L`
          background: ${({theme:e})=>e.headerBackground};
          color: ${({theme:e})=>e.headerText};
        `}

  ${mr} {
    padding-left: 0;
    padding-right: 0;
    height: 27px;
    width: 31px;
  }
`,Mi=(0,_.forwardRef)(function({active:e=!0,children:t,...n},r){return _.createElement(ji,{active:e,ref:r,...n},t)});Mi.displayName=`WindowHeader`;var B=R.div`
  position: relative;
  padding: 4px;
  font-size: 1rem;
  ${Yn({style:`window`})}
  ${Wn()}
`,V=R.span`
  ${({theme:e})=>L`
    display: inline-block;
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    background-image: linear-gradient(
      135deg,
      ${e.borderLightest} 16.67%,
      ${e.material} 16.67%,
      ${e.material} 33.33%,
      ${e.borderDark} 33.33%,
      ${e.borderDark} 50%,
      ${e.borderLightest} 50%,
      ${e.borderLightest} 66.67%,
      ${e.material} 66.67%,
      ${e.material} 83.33%,
      ${e.borderDark} 83.33%,
      ${e.borderDark} 100%
    );
    background-size: 8.49px 8.49px;
    clip-path: polygon(100% 0px, 0px 100%, 100% 100%);
    cursor: nwse-resize;
  `}
`,Ni=(0,_.forwardRef)(({children:e,resizable:t=!1,resizeRef:n,shadow:r=!0,...i},a)=>_.createElement(B,{ref:a,shadow:r,...i},e,t&&_.createElement(V,{"data-testid":`resizeHandle`,ref:n})));Ni.displayName=`Window`;var Pi=R(wr)`
  width: 234px;
  margin: 1rem 0;
  background: ${({theme:e})=>e.canvas};
`,Fi=R.div`
  display: flex;
  background: ${({theme:e})=>e.materialDark};
  color: #dfe0e3;
`,Ii=R.div`
  display: flex;
  flex-wrap: wrap;
`,Li=R.div`
  text-align: center;
  height: 1.5em;
  line-height: 1.5em;
  width: 14.28%;
`,Ri=R.span`
  cursor: pointer;

  background: ${({active:e,theme:t})=>e?t.hoverBackground:`transparent`};
  color: ${({active:e,theme:t})=>e?t.canvasTextInvert:t.canvasText};

  &:hover {
    border: 2px dashed
      ${({theme:e,active:t})=>t?`none`:e.materialDark};
  }
`,zi=[{value:0,label:`January`},{value:1,label:`February`},{value:2,label:`March`},{value:3,label:`April`},{value:4,label:`May`},{value:5,label:`June`},{value:6,label:`July`},{value:7,label:`August`},{value:8,label:`September`},{value:9,label:`October`},{value:10,label:`November`},{value:11,label:`December`}];function Bi(e,t){return new Date(e,t+1,0).getDate()}function Vi(e,t,n){return new Date(e,t,n).getDay()}function Hi(e){let t=new Date(Date.parse(e));return{day:t.getUTCDate(),month:t.getUTCMonth(),year:t.getUTCFullYear()}}var Ui=(0,_.forwardRef)(({className:e,date:t=new Date().toISOString(),onAccept:n,onCancel:r,shadow:i=!0},a)=>{let[o,s]=(0,_.useState)(()=>Hi(t)),{year:c,month:l,day:u}=o,d=(0,_.useCallback)(({value:e})=>{s(t=>({...t,month:e}))},[]),f=(0,_.useCallback)(e=>{s(t=>({...t,year:e}))},[]),p=(0,_.useCallback)(e=>{s(t=>({...t,day:e}))},[]),m=(0,_.useCallback)(()=>{let e=[o.year,o.month+1,o.day].map(e=>String(e).padStart(2,`0`)).join(`-`);n?.(e)},[o.day,o.month,o.year,n]),h=(0,_.useMemo)(()=>{let e=Array.from({length:42}),t=Vi(c,l,1),n=u,r=Bi(c,l);return n=n<r?n:r,e.forEach((i,a)=>{if(a>=t&&a<r+t){let r=a-t+1;e[a]=_.createElement(Li,{key:a,onClick:()=>{p(r)}},_.createElement(Ri,{active:r===n},r))}else e[a]=_.createElement(Li,{key:a})}),e},[u,p,l,c]);return _.createElement(Ni,{className:e,ref:a,shadow:i,style:{margin:20}},_.createElement(Mi,null,_.createElement(`span`,{role:`img`,"aria-label":`📆`},`📆`),`Date`),_.createElement(Ai,null,_.createElement(Oi,{noPadding:!0,style:{justifyContent:`space-between`}},_.createElement(Ei,{options:zi,value:l,onChange:d,width:128,menuMaxHeight:200}),_.createElement(ri,{value:c,onChange:f,width:100})),_.createElement(Pi,null,_.createElement(Fi,null,_.createElement(Li,null,`S`),_.createElement(Li,null,`M`),_.createElement(Li,null,`T`),_.createElement(Li,null,`W`),_.createElement(Li,null,`T`),_.createElement(Li,null,`F`),_.createElement(Li,null,`S`)),_.createElement(Ii,null,h)),_.createElement(Oi,{noPadding:!0,style:{justifyContent:`space-between`}},_.createElement(z,{fullWidth:!0,onClick:r,disabled:!r},`Cancel`),_.createElement(z,{fullWidth:!0,onClick:n?m:void 0,disabled:!n},`OK`))))});Ui.displayName=`DatePicker`;var Wi=e=>{switch(e){case`status`:case`well`:return L`
        ${Yn({style:`status`})}
      `;case`window`:case`outside`:return L`
        ${Yn({style:`window`})}
      `;case`field`:return L`
        ${Yn({style:`field`})}
      `;default:return L`
        ${Yn()}
      `}},Gi=R.div`
  position: relative;
  font-size: 1rem;
  ${({variant:e})=>Wi(e)}
  ${({variant:e})=>Wn(e===`field`?{background:`canvas`,color:`canvasText`}:void 0)}
`,Ki=(0,_.forwardRef)(({children:e,shadow:t=!1,variant:n=`window`,...r},i)=>_.createElement(Gi,{ref:i,shadow:t,variant:n,...r},e));Ki.displayName=`Frame`;var qi=R.fieldset`
  position: relative;
  border: 2px solid
    ${({theme:e,variant:t})=>t===`flat`?e.flatDark:e.borderLightest};
  padding: 16px;
  margin-top: 8px;
  font-size: 1rem;
  color: ${({theme:e})=>e.materialText};
  ${({variant:e})=>e!==`flat`&&L`
      box-shadow: -1px -1px 0 1px ${({theme:e})=>e.borderDark},
        inset -1px -1px 0 1px ${({theme:e})=>e.borderDark};
    `}
  ${e=>e.$disabled&&Un()}
`,Ji=R.legend`
  display: flex;
  position: absolute;
  top: 0;
  left: 8px;
  transform: translateY(calc(-50% - 2px));
  padding: 0 8px;

  font-size: 1rem;
  background: ${({theme:e,variant:t})=>t===`flat`?e.canvas:e.material};
`,Yi=(0,_.forwardRef)(({label:e,disabled:t=!1,variant:n=`default`,children:r,...i},a)=>_.createElement(qi,{"aria-disabled":t,$disabled:t,variant:n,ref:a,...i},e&&_.createElement(Ji,{variant:n},e),r));Yi.displayName=`GroupBox`;var Xi=R.div`
  ${({theme:e,size:t=`100%`})=>`
  display: inline-block;
  box-sizing: border-box;
  height: ${cr(t)};
  width: 5px;
  border-top: 2px solid ${e.borderLightest};
  border-left: 2px solid ${e.borderLightest};
  border-bottom: 2px solid ${e.borderDark};
  border-right: 2px solid ${e.borderDark};
  background: ${e.material};
`}
`;Xi.displayName=`Handle`;var Zi=`url('data:image/gif;base64,R0lGODlhPAA8APQAADc3N6+vr4+Pj05OTvn5+V1dXZ+fn29vby8vLw8PD/X19d/f37S0tJSUlLq6und3d39/f9XV1c/Pz+bm5qamphkZGWZmZsbGxr+/v+rq6tra2u/v7yIiIv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBAAfACH+I1Jlc2l6ZWQgb24gaHR0cHM6Ly9lemdpZi5jb20vcmVzaXplACwAAAAAPAA8AAAF/+AnjmRpnmiqrmzrvnAsz3Rt37jr7Xzv/8BebhQsGn1D0XFZTH6YUGQySvU4fYKAdsvtdi1Cp3In6ZjP6HTawBMTyWbFYk6v18/snXvsKXciUApmeVZ7PH6ATIIdhHtPcB0TDQ1gQBCTBINthpBnAUEaa5tuh2mfQKFojZx9aRMSEhA7FLAbonqsfmoUOxFqmriknWm8Hr6/q8IeCAAAx2cTERG2aBTNHMGOj8a/v8WF2m/c3cSj4SQ8C92n4Ocm6evm7ui9CosdBPbs8yo8E2YO5PE74Q+gwIElCnYImA3hux3/Fh50yCciw3YUt2GQtiiDtGQO4f3al1GkGpIDeXlg0KDhXpoMLBtMVPaMnJlv/HjUtIkzHA8HEya4tLkhqICGV4bZVAMyaaul3ZpOUQoVz8wbpaoyvWojq1ZVXGt4/QoM49SnZMs6GktW6hC2X93mgKtVbtceWbzo9VIJKdYqUJwCPiJ4cJOzhg+/TWwko+PHkCNLdhgCACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCACH5BAUEAB8ALBYADAAQAA0AAAVFYCeOZPmVaKqimeO+MPxFXv3d+F17Cm3nuJ1ic7lAdroapUjABZCfnQb4ef6k1OHGULtsNk3qjVKLiIFkj/mMIygU4VwIACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCACH5BAUEAB8ALBkAIwAKAAcAAAUp4CdehrGI6Ed5XpSKa4teguBoGlVPAXuJBpam5/l9gh7NZrFQiDJMRQgAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsFgAPABAAIQAABVBgJ45kaZ5oakZB67bZ+M10bd94ru987//AoHBILNYYAsGlR/F4IkwnlLeZTBQ9UlaWwzweERHjuzAKFZkMYYZWm4mOw0ETfdanO8Vms7aFAAAh+QQFBAAfACwAAAAAAQABAAAFA+AXAgAh+QQFBAAfACwZABIACgAeAAAFUGAnjmRpnij5rerqtu4Hx3Rt33iu758iZrUZa1TDCASLGsXjiSiZzmFnM5n4TNJSdmREElfL5lO8cgwGACbgrAkwPat3+x1naggKRS+f/4QAACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCACH5BAUEAB8ALBYAIwAQAA0AAAVE4CeOXdmNaGqeabu27SUIC5xSnifZKK7zl8djkCsIaylGziNaakaEzcbH/Cwl0k9kuWxyPYptzrZULA7otFpNIK1eoxAAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkECQQAHwAsDgAEACAANAAABTHgJ45kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/Y7CoEACH5BAUEAB8ALAAAAAA8ADwAAAX/4CeOZGmeaKqubFt6biy3Xj3fuFjveU/vPJ/wBAQOj6RiEClUGpk9IMAJxQEdmQK1Grt2OhutkvurOb7f8JaM8qLT4iKbuDu/0erxfOS+4+NPex9mfn55coIfCAuFhoBLbDUAjI1vh4FkOxSVd5eQXB4GnI5rXAAbo6R6VTUFqKmWjzasNaKwsaVIHhAEt3cLTjBQA6++XwoHuUM1vMYdyMorwoN8wkC2t9A8s102204Wxana3DNAAQO1FjUCEDXhvuTT5nUdEwOiGxa8BBDwXxKaLTiAKoMFRvJy9CmmoFcHAgrQSEiwKwICDwU0pAMQIdmnboR8TfwWrJyMPrAiz1DkNs2aSRbe6hnr99LEvDJ9IB5DQ8Dhm36glNh5COGBAmQNHrbz+WXBFChOTqFx5+GBxwYCmL1ZcPHmMiWuvkTgECzBBUvrvH4tErbDWCcYDB2IBPbV2yJJ72SZ46TtXSB5v2RIp1ZXXbFkgWxCc68mk752E3tY/OZeIsiIaxi9o+BBokGH3SZ+4FPbZ8yiPQxNeDl0hNUeHWcKjYb1Zx20bd/GzRaV7t28gRSYELvw7pIfgVcLplwF8+bOo0Ffjmm6zerWrxvPzoe79w8hAAAh+QQJBAAfACwBAAEAOgA6AAAFRuAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/D4MgQAIfkEBQQAHwAsAAAAADwAPAAABf/gJ45kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyJxnyTQym6nn0ilVSa9XGHY7jXKx2m/WK36Gy1CUVCBpu9+OtNqDeNslgip5Gej4/4ATcidLAICHHQF6c0x9iH+CXV6Gj36KZnsejgsREQSACp0Yg0ydEZWWi4RPjgdLG48apEuogJeDJVKtr7GzHrV/t5KrjX6uHhQMF4cKCwujTxHOwKmYjHzGTw+VEVIK1MGqJrrZTNuP3U/f4IniuazlSwMUFMugE/j47NW4JOQdx9bsoybMgxV4ALEIGAis4MFiCZkUaLPgUAYHGDF+Yucw0y5z3Lzt63hNUzwP5xCRpWOyDhxJYtgiStBQEVCGAAEM6MLp0p0/hMdgIZI17AOTntZgmowo9BBRgz9/EfQ54h8BBS39bKDXwBc9CrVejkNYKRLUSWGpivhXtt9PSpXEvmNiwYDdu3jzFB3LAa9fAxbUGkXjtmSZh4TPJM4kRgbhvVEL9xhTEongJJgza97MubPnz6BDix5NurTp0yJCAAAh+QQJBAAfACwEAA4ANAAgAAAFMeAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9jsKgQAIfkEBQQAHwAsAAAAADwAPAAABf/gJ45kaZ5oqq5s6bVwLHu0bN8uXeM8rP+9YOoHFBpHRN1xmSwue02A82lrFjaOKbVl3XQ6WeWWm7x+v+HdeFj2ntHaNbL9jUAI5/RLTurWOR53eXFbfh0RgB4PCm9hfCKGiDSLb18Bjx+RiR4HjG8TA3trmkSdZxuhalSkRA2VBqpPrD+ulR0Go3SHmz8CeG8bFqJMupJNHr5nCsKxQccTg4oUNA0YCYG/HQQQYsSlnmCUFLUXgm8EAsPeP6Zf2baV2+rEmTrt8PDyzS7O9uD4b5YV2VGjGw52/wB+CaYjlQcpNBAQioHwy4QMCxe4i3BKGIQN3K7AArBATz8anUDADcgQDMGCbQkknDKAh4ABNxQ0gpnoQ8eDVAUO0ADAzUNMhbZMQiG4R4mOo0gb8eTCQgeEqJVM7juCDWvWJnI4ev2aZIwHl2PfZIBIZBXKtAsLgC1kJu0GuWXNaoB7d67ZlWP75jVLw4JXwW35PNSJFPFUrmIb402smFNCW44N5kJ5+dTkx+vuAfus+VHF0X4xzeHsObXq1ZY7ZN76mt0C0rRf1zuWW/du175PHAu+YjhxFcCPm6CsHHnv5kig6w4BACH5BAkEAB8ALAEAAQA6ADoAAAVG4CeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8PgyBAAh+QQFBAAfACwAAAAAPAA8AAAF/+AnjmRpnmiqrmzrvnAsz3Rt37jr7Xzv/8BebhQsGn1D0XFZTH6YUGQySvU4fYKAdsvtdi1Cp3In6ZjP6HTawBMTyWbFYk6v18/snXvsKXciUApmeVZ7PH6ATIIdhHtPcB0TDQ1gQBCTBINthpBnAUEaa5tuh2mfQKFojZx9aRMSEhA7FLAbonqsfmoUOxFqmriknWm8Hr6/q8IeCAAAx2cTERG2aBTNHMGOj8a/v8WF2m/c3cSj4SQ8C92n4Ocm6evm7ui9CosdBPbs8yo8E2YO5PE74Q+gwIElCnYImA3hux3/Fh50yCciw3YUt2GQtiiDtGQO4f3al1GkGpIDeXlg0KDhXpoMLBtMVPaMnJlv/HjUtIkzHA8HEya4tLkhqICGV4bZVAMyaaul3ZpOUQoVz8wbpaoyvWojq1ZVXGt4/QoM49SnZMs6GktW6hC2X93mgKtVbtceWbzo9VIJKdYqUJwCPiJ4cJOzhg+/TWwko+PHkCNLdhgCACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCADs=')`,Qi=R.div`
  display: inline-block;
  height: ${({size:e})=>cr(e)};
  width: ${({size:e})=>cr(e)};
`,$i=R.span`
  display: block;
  background: ${Zi};
  background-size: cover;
  width: 100%;
  height: 100%;
`,ea=(0,_.forwardRef)(({size:e=30,...t},n)=>_.createElement(Qi,{size:e,ref:n,...t},_.createElement($i,null)));ea.displayName=`Hourglass`;var ta=R.div`
  position: relative;
  display: inline-block;
  padding-bottom: 26px;
`,na=R.div`
  position: relative;
`,ra=R.div`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 195px;
  height: 155px;
  padding: 12px;
  background: ${({theme:e})=>e.material};
  border-top: 4px solid ${({theme:e})=>e.borderLightest};
  border-left: 4px solid ${({theme:e})=>e.borderLightest};
  border-bottom: 4px solid ${({theme:e})=>e.borderDark};
  border-right: 4px solid ${({theme:e})=>e.borderDark};

  outline: 1px dotted ${({theme:e})=>e.material};
  outline-offset: -3px;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    outline: 1px dotted ${({theme:e})=>e.material};
  }
  box-shadow: 1px 1px 0 1px ${({theme:e})=>e.borderDarkest};

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    bottom: 4px;
    right: 12px;
    width: 10px;
    border-top: 2px solid #4d9046;
    border-bottom: 2px solid #07ff00;
  }
`,ia=R(Sr).attrs(()=>({"data-testid":`background`}))`
  width: 100%;
  height: 100%;
`,aa=R.div`
  box-sizing: border-box;
  position: absolute;
  top: calc(100% + 2px);
  left: 50%;
  transform: translateX(-50%);
  height: 10px;
  width: 50%;
  background: ${({theme:e})=>e.material};
  border-left: 2px solid ${({theme:e})=>e.borderLightest};
  border-bottom: 2px solid ${({theme:e})=>e.borderDarkest};
  border-right: 2px solid ${({theme:e})=>e.borderDarkest};
  box-shadow: inset 0px 0px 0px 2px ${({theme:e})=>e.borderDark};

  &:before {
    content: '';
    position: absolute;
    top: calc(100% + 2px);
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 8px;
    background: ${({theme:e})=>e.material};
    border-left: 2px solid ${({theme:e})=>e.borderLightest};
    border-right: 2px solid ${({theme:e})=>e.borderDarkest};
    box-shadow: inset 0px 0px 0px 2px ${({theme:e})=>e.borderDark};
  }
  &:after {
    content: '';
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    width: 150%;
    height: 4px;
    background: ${({theme:e})=>e.material};
    border: 2px solid ${({theme:e})=>e.borderDark};
    border-bottom: none;
    box-shadow: inset 1px 1px 0px 1px ${({theme:e})=>e.borderLightest},
      1px 1px 0 1px ${({theme:e})=>e.borderDarkest};
  }
`,oa=(0,_.forwardRef)(({backgroundStyles:e,children:t,...n},r)=>_.createElement(ta,{ref:r,...n},_.createElement(na,null,_.createElement(ra,null,_.createElement(ia,{style:e},t)),_.createElement(aa,null))));oa.displayName=`Monitor`;var sa=R.div`
  display: inline-block;
  height: ${fr.md};
  width: 100%;
`,ca=R(Sr)`
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  padding: 0;
  overflow: hidden;
  &:before {
    z-index: 1;
  }
`,la=L`
  width: calc(100% - 4px);
  height: calc(100% - 4px);

  display: flex;
  align-items: center;
  justify-content: space-around;
`,ua=R.div`
  position: relative;
  top: 4px;
  ${la}
  background: ${({theme:e})=>e.canvas};
  color: #000;
  margin-left: 2px;
  margin-top: -2px;
  color: ${({theme:e})=>e.materialText};
`,da=R.div`
  position: absolute;
  top: 2px;
  left: 2px;
  ${la}
  color: ${({theme:e})=>e.materialTextInvert};
  background: ${({theme:e})=>e.progress};
  clip-path: polygon(
    0 0,
    ${({value:e=0})=>e}% 0,
    ${({value:e=0})=>e}% 100%,
    0 100%
  );
  transition: 0.4s linear clip-path;
`,fa=R.div`
  width: calc(100% - 6px);
  height: calc(100% - 8px);
  position: absolute;
  left: 3px;
  top: 4px;
  box-sizing: border-box;
  display: inline-flex;
`,pa=17,ma=R.span`
  display: inline-block;
  width: ${pa}px;
  box-sizing: border-box;
  height: 100%;
  background: ${({theme:e})=>e.progress};
  border-color: ${({theme:e})=>e.material};
  border-width: 0px 1px;
  border-style: solid;
`,ha=(0,_.forwardRef)(({hideValue:e=!1,shadow:t=!0,value:n,variant:r=`default`,...i},a)=>{let o=e?null:`${n}%`,s=(0,_.useRef)(null),[c,l]=(0,_.useState)([]),u=(0,_.useCallback)(()=>{if(!s.current||n===void 0)return;let e=s.current.getBoundingClientRect().width,t=Math.round(n/100*e/pa);l(Array.from({length:t}))},[n]);return(0,_.useEffect)(()=>(u(),window.addEventListener(`resize`,u),()=>window.removeEventListener(`resize`,u)),[u]),_.createElement(sa,{"aria-valuenow":n===void 0?void 0:Math.round(n),ref:a,role:`progressbar`,variant:r,...i},_.createElement(ca,{variant:r,shadow:t},r===`default`?_.createElement(_.Fragment,null,_.createElement(ua,{"data-testid":`defaultProgress1`},o),_.createElement(da,{"data-testid":`defaultProgress2`,value:n},o)):_.createElement(fa,{ref:s,"data-testid":`tileProgress`},c.map((e,t)=>_.createElement(ma,{key:t})))))});ha.displayName=`ProgressBar`;var ga=L`
  width: ${20}px;
  height: ${20}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 0.5rem;
`,_a=R(Sr)`
  ${ga}
  background: ${({$disabled:e,theme:t})=>e?t.material:t.canvas};

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 50%;
    box-shadow: none;
  }
`,va=R.div`
  ${Kn()}
  ${ga}
  outline: none;
  background: ${({$disabled:e,theme:t})=>e?t.flatLight:t.canvas};
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border: 2px solid ${({theme:e})=>e.flatDark};
    border-radius: 50%;
  }
`,ya=R.span.attrs(()=>({"data-testid":`checkmarkIcon`}))`
  position: absolute;
  content: '';
  display: inline-block;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: ${e=>e.$disabled?e.theme.checkmarkDisabled:e.theme.checkmark};
`,ba={flat:va,default:_a},xa=(0,_.forwardRef)(({checked:e,className:t=``,disabled:n=!1,label:r=``,onChange:i,style:a={},variant:o=`default`,...s},c)=>{let l=ba[o];return _.createElement(br,{$disabled:n,className:t,style:a},_.createElement(l,{$disabled:n,role:`presentation`},e&&_.createElement(ya,{$disabled:n,variant:o})),_.createElement(yr,{disabled:n,onChange:n?void 0:i,readOnly:n,type:`radio`,checked:e,ref:c,...s}),r&&_.createElement(xr,null,r))});xa.displayName=`Radio`;var Sa=typeof window<`u`?_.useLayoutEffect:_.useEffect;function Ca(e){let t=_.useRef(e);return Sa(()=>{t.current=e}),_.useCallback((...e)=>(0,t.current)(...e),[])}function wa(e,t){typeof e==`function`?e(t):e&&(e.current=t)}function Ta(e,t){return(0,_.useMemo)(()=>e==null&&t==null?null:n=>{wa(e,n),wa(t,n)},[e,t])}var Ea=m(),Da=!0,Oa=!1,ka,Aa={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function ja(e){if(`type`in e){let{type:t,tagName:n}=e;if(n===`INPUT`&&Aa[t]&&!e.readOnly||n===`TEXTAREA`&&!e.readOnly)return!0}return!!(`isContentEditable`in e&&e.isContentEditable)}function Ma(e){e.metaKey||e.altKey||e.ctrlKey||(Da=!0)}function Na(){Da=!1}function Pa(){this.visibilityState===`hidden`&&Oa&&(Da=!0)}function Fa(e){e.addEventListener(`keydown`,Ma,!0),e.addEventListener(`mousedown`,Na,!0),e.addEventListener(`pointerdown`,Na,!0),e.addEventListener(`touchstart`,Na,!0),e.addEventListener(`visibilitychange`,Pa,!0)}function Ia(e){let{target:t}=e;try{return t.matches(`:focus-visible`)}catch{}return Da||ja(t)}function La(){Oa=!0,window.clearTimeout(ka),ka=window.setTimeout(()=>{Oa=!1},100)}function Ra(){return{isFocusVisible:Ia,onBlurVisible:La,ref:(0,_.useCallback)(e=>{let t=(0,Ea.findDOMNode)(e);t!=null&&Fa(t.ownerDocument)},[])}}function za(e,t,n){return(n-t)*e+t}function Ba(e,t){if(t!==void 0&&`changedTouches`in e){for(let n=0;n<e.changedTouches.length;n+=1){let r=e.changedTouches[n];if(r.identifier===t)return{x:r.clientX,y:r.clientY}}return!1}return`clientX`in e?{x:e.clientX,y:e.clientY}:!1}function Va(e){return e&&e.ownerDocument||document}function Ha(e,t){let{index:n}=e.reduce((e,n,r)=>{let i=Math.abs(t-n);return e===null||i<e.distance||i===e.distance?{distance:i,index:r}:e},null)??{};return n??-1}var Ua=R.div`
  display: inline-block;
  position: relative;
  touch-action: none;
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: -2px;
    left: -15px;
    width: calc(100% + 30px);
    height: ${({hasMarks:e})=>e?`41px`:`39px`};
    ${({isFocused:e,theme:t})=>e&&`
        outline: 2px dotted ${t.materialText};
        `}
  }

  ${({orientation:e,size:t})=>e===`vertical`?L`
          height: ${t};
          margin-right: 1.5rem;
          &:before {
            left: -6px;
            top: -15px;
            height: calc(100% + 30px);
            width: ${({hasMarks:e})=>e?`41px`:`39px`};
          }
        `:L`
          width: ${t};
          margin-bottom: 1.5rem;
          &:before {
            top: -2px;
            left: -15px;
            width: calc(100% + 30px);
            height: ${({hasMarks:e})=>e?`41px`:`39px`};
          }
        `}

  pointer-events: ${({$disabled:e})=>e?`none`:`auto`};
`,Wa=()=>L`
  position: absolute;
  ${({orientation:e})=>e===`vertical`?L`
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 100%;
          width: 8px;
        `:L`
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 8px;
          width: 100%;
        `}
`,Ga=R(Sr)`
  ${Wa()}
`,Ka=R(Sr)`
  ${Wa()}

  border-left-color: ${({theme:e})=>e.flatLight};
  border-top-color: ${({theme:e})=>e.flatLight};
  border-right-color: ${({theme:e})=>e.canvas};
  border-bottom-color: ${({theme:e})=>e.canvas};
  &:before {
    border-left-color: ${({theme:e})=>e.flatDark};
    border-top-color: ${({theme:e})=>e.flatDark};
    border-right-color: ${({theme:e})=>e.flatLight};
    border-bottom-color: ${({theme:e})=>e.flatLight};
  }
`,qa=R.span`
  position: relative;
  ${({orientation:e})=>e===`vertical`?L`
          width: 32px;
          height: 18px;
          right: 2px;
          transform: translateY(-50%);
        `:L`
          height: 32px;
          width: 18px;
          top: 2px;
          transform: translateX(-50%);
        `}
  ${({variant:e})=>e===`flat`?L`
          ${Kn()}
          outline: 2px solid ${({theme:e})=>e.flatDark};
          background: ${({theme:e})=>e.flatLight};
        `:L`
          ${Wn()}
          ${Yn()}
          &:focus {
            outline: none;
          }
        `}
    ${({$disabled:e,theme:t})=>e&&Gn({mainColor:t.material,secondaryColor:t.borderLightest})}
`,Ja=6,Ya=R.span`
  display: inline-block;
  position: absolute;

  ${({orientation:e})=>e===`vertical`?L`
          right: ${-Ja-2}px;
          bottom: 0px;
          transform: translateY(1px);
          width: ${Ja}px;
          border-bottom: 2px solid ${({theme:e})=>e.materialText};
        `:L`
          bottom: ${-Ja}px;
          height: ${Ja}px;
          transform: translateX(-1px);
          border-left: 1px solid ${({theme:e})=>e.materialText};
          border-right: 1px solid ${({theme:e})=>e.materialText};
        `}

  color:  ${({theme:e})=>e.materialText};
  ${({$disabled:e,theme:t})=>e&&L`
      ${Un()}
      box-shadow: 1px 1px 0px ${t.materialTextDisabledShadow};
      border-color: ${t.materialTextDisabled};
    `}
`,Xa=R.div`
  position: absolute;
  bottom: 0;
  left: 0;
  line-height: 1;
  font-size: 0.875rem;

  ${({orientation:e})=>e===`vertical`?L`
          transform: translate(${Ja+2}px, ${Ja+1}px);
        `:L`
          transform: translate(-0.5ch, calc(100% + 2px));
        `}
`,Za=(0,_.forwardRef)(({defaultValue:e,disabled:t=!1,marks:n=!1,max:r=100,min:i=0,name:a,onChange:o,onChangeCommitted:s,onMouseDown:c,orientation:l=`horizontal`,size:u=`100%`,step:d=1,value:f,variant:p=`default`,...m},h)=>{let g=p===`flat`?Ka:Ga,v=l===`vertical`,[y=i,b]=hr({defaultValue:e,onChange:o??s,value:f}),{isFocusVisible:x,onBlurVisible:S,ref:C}=Ra(),[w,T]=(0,_.useState)(!1),ee=(0,_.useRef)(),te=(0,_.useRef)(null),E=Ta(h,Ta(C,ee)),D=Ca(e=>{x(e)&&T(!0)}),ne=Ca(()=>{w!==!1&&(T(!1),S())}),O=(0,_.useRef)(),k=(0,_.useMemo)(()=>n===!0&&Number.isFinite(d)?[...Array(Math.round((r-i)/d)+1)].map((e,t)=>({label:void 0,value:i+d*t})):Array.isArray(n)?n:[],[n,r,i,d]),re=Ca(e=>{let t=(r-i)/10,n=k.map(e=>e.value),a=n.indexOf(y),c=0;switch(e.key){case`Home`:c=i;break;case`End`:c=r;break;case`PageUp`:d&&(c=y+t);break;case`PageDown`:d&&(c=y-t);break;case`ArrowRight`:case`ArrowUp`:c=d?y+d:n[a+1]||n[n.length-1];break;case`ArrowLeft`:case`ArrowDown`:c=d?y-d:n[a-1]||n[0];break;default:return}e.preventDefault(),d&&(c=sr(c,d,i)),c=ar(c,i,r),b(c),T(!0),o?.(c),s?.(c)}),ie=(0,_.useCallback)(e=>{if(!ee.current)return 0;let t=ee.current.getBoundingClientRect(),n;n=v?(t.bottom-e.y)/t.height:(e.x-t.left)/t.width;let a;if(a=za(n,i,r),d)a=sr(a,d,i);else{let e=k.map(e=>e.value);a=e[Ha(e,a)]}return a=ar(a,i,r),a},[k,r,i,d,v]),A=Ca(e=>{var t;let n=Ba(e,O.current);if(!n)return;let r=ie(n);(t=te.current)==null||t.focus(),b(r),T(!0),o?.(r)}),j=Ca(e=>{let t=Ba(e,O.current);if(!t)return;let n=ie(t);s?.(n),O.current=void 0;let r=Va(ee.current);r.removeEventListener(`mousemove`,A),r.removeEventListener(`mouseup`,j),r.removeEventListener(`touchmove`,A),r.removeEventListener(`touchend`,j)}),M=Ca(e=>{var t;c?.(e),e.preventDefault(),(t=te.current)==null||t.focus(),T(!0);let n=Ba(e,O.current);if(n){let e=ie(n);b(e),o?.(e)}let r=Va(ee.current);r.addEventListener(`mousemove`,A),r.addEventListener(`mouseup`,j)}),N=Ca(e=>{var t;e.preventDefault();let n=e.changedTouches[0];n!=null&&(O.current=n.identifier),(t=te.current)==null||t.focus(),T(!0);let r=Ba(e,O.current);if(r){let e=ie(r);b(e),o?.(e)}let i=Va(ee.current);i.addEventListener(`touchmove`,A),i.addEventListener(`touchend`,j)});return(0,_.useEffect)(()=>{let{current:e}=ee;e?.addEventListener(`touchstart`,N);let t=Va(e);return()=>{e?.removeEventListener(`touchstart`,N),t.removeEventListener(`mousemove`,A),t.removeEventListener(`mouseup`,j),t.removeEventListener(`touchmove`,A),t.removeEventListener(`touchend`,j)}},[j,A,N]),_.createElement(Ua,{$disabled:t,hasMarks:!!k.length,isFocused:w,onMouseDown:M,orientation:l,ref:E,size:cr(u),...m},_.createElement(`input`,{disabled:t,name:a,type:`hidden`,value:y??0}),k&&k.map(e=>_.createElement(Ya,{$disabled:t,"data-testid":`tick`,key:e.value/(r-i)*100,orientation:l,style:{[v?`bottom`:`left`]:`${(e.value-i)/(r-i)*100}%`}},e.label&&_.createElement(Xa,{"aria-hidden":!0,"data-testid":`mark`,orientation:l},e.label))),_.createElement(g,{orientation:l,variant:p}),_.createElement(qa,{$disabled:t,"aria-disabled":t?!0:void 0,"aria-orientation":l,"aria-valuemax":r,"aria-valuemin":i,"aria-valuenow":y,onBlur:ne,onFocus:D,onKeyDown:re,orientation:l,ref:te,role:`slider`,style:{[v?`bottom`:`left`]:`${(v?-100:0)+100*(y-i)/(r-i)}%`},tabIndex:t?void 0:0,variant:p}))});Za.displayName=`Slider`;var Qa=R.tbody`
  background: ${({theme:e})=>e.canvas};
  display: table-row-group;
  box-shadow: ${Hn};
  overflow-y: auto;
`,$a=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(Qa,{ref:n,...t},e)});$a.displayName=`TableBody`;var eo=R.td`
  padding: 0 8px;
`,H=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(eo,{ref:n,...t},e)});H.displayName=`TableDataCell`;var to=R.thead`
  display: table-header-group;
`,no=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(to,{ref:n,...t},e)});no.displayName=`TableHead`;var ro=R.th`
  position: relative;
  padding: 0 8px;
  display: table-cell;
  vertical-align: inherit;
  background: ${({theme:e})=>e.material};
  cursor: default;
  user-select: none;
  &:before {
    box-sizing: border-box;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    ${Yn()}

    border-left: none;
    border-top: none;
  }
  ${({$disabled:e})=>!e&&L`
      &:active {
        &:before {
          ${Yn({invert:!0,style:`window`})}
          border-left: none;
          border-top: none;
          padding-top: 2px;
        }

        & > div {
          position: relative;
          top: 2px;
        }
      }
    `}

  color: ${({theme:e})=>e.materialText};
  ${({$disabled:e})=>e&&Un()}
  &:hover {
    color: ${({theme:e})=>e.materialText};
    ${({$disabled:e})=>e&&Un()}
  }
`,io=(0,_.forwardRef)(function({disabled:e=!1,children:t,onClick:n,onTouchStart:r=ir,sort:i,...a},o){let s=i===`asc`?`ascending`:i===`desc`?`descending`:void 0;return _.createElement(ro,{$disabled:e,"aria-disabled":e,"aria-sort":s,onClick:e?void 0:n,onTouchStart:e?void 0:r,ref:o,...a},_.createElement(`div`,null,t))});io.displayName=`TableHeadCell`;var ao=R.tr`
  color: inherit;
  display: table-row;
  height: calc(${fr.md} - 2px);
  line-height: calc(${fr.md} - 2px);
  vertical-align: middle;
  outline: none;

  color: ${({theme:e})=>e.canvasText};
  &:hover {
    background: ${({theme:e})=>e.hoverBackground};
    color: ${({theme:e})=>e.canvasTextInvert};
  }
`,oo=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(ao,{ref:n,...t},e)});oo.displayName=`TableRow`;var so=R.table`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1rem;
`,co=R(Sr)`
  &:before {
    box-shadow: none;
  }
`,lo=(0,_.forwardRef)(({children:e,...t},n)=>_.createElement(co,null,_.createElement(so,{ref:n,...t},e)));lo.displayName=`Table`;var U=R.button`
  ${Wn()}
  ${Yn()}
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: ${fr.md};
  line-height: ${fr.md};
  padding: 0 8px;
  border-bottom: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 0 0 -2px 0;
  cursor: default;
  color: ${({theme:e})=>e.materialText};
  user-select: none;
  font-family: inherit;
  &:focus:after,
  &:active:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    ${Xn}
    outline-offset: -6px;
  }
  ${e=>e.selected&&`
    z-index: 1;
    height: calc(${fr.md} + 4px);
    top: -4px;
    margin-bottom: -6px;
    padding: 0 16px;
    margin-left: -8px;
    &:not(:last-child) {
      margin-right: -8px;
    }
  `}
  &:before {
    content: '';
    position: absolute;
    width: calc(100% - 4px);
    height: 6px;
    background: ${({theme:e})=>e.material};
    bottom: -4px;
    left: 2px;
  }
`,W=(0,_.forwardRef)(({value:e,onClick:t,selected:n=!1,children:r,...i},a)=>_.createElement(U,{"aria-selected":n,selected:n,onClick:n=>t?.(e,n),ref:a,role:`tab`,...i},r));W.displayName=`Tab`;var uo=R.div`
  ${Wn()}
  ${Yn()}
  position: relative;
  display: block;
  height: 100%;
  padding: 16px;
  font-size: 1rem;
`,fo=(0,_.forwardRef)(({children:e,...t},n)=>_.createElement(uo,{ref:n,...t},e));fo.displayName=`TabBody`;var po=R.div`
  position: relative;
  ${({isMultiRow:e,theme:t})=>e&&`
  button {
    flex-grow: 1;
  }
  button:last-child:before {
    border-right: 2px solid ${t.borderDark};
  }
  `}
`,mo=R.div.attrs(()=>({"data-testid":`tab-row`}))`
  position: relative;
  display: flex;
  flex-wrap: no-wrap;
  text-align: left;
  left: 8px;
  width: calc(100% - 8px);

  &:not(:first-child):before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
    border-right: 2px solid ${({theme:e})=>e.borderDarkest};
    border-left: 2px solid ${({theme:e})=>e.borderLightest};
  }
`;function ho(e,t){let n=[];for(let r=t;r>0;--r)n.push(e.splice(0,Math.ceil(e.length/r)));return n}var go=(0,_.forwardRef)(({value:e,onChange:t=ir,children:n,rows:r=1,...i},a)=>{let o=(0,_.useMemo)(()=>{let i=ho(_.Children.map(n,n=>{if(!_.isValidElement(n))return null;let r={selected:n.props.value===e,onClick:t};return _.cloneElement(n,r)})??[],r).map((e,t)=>({key:t,tabs:e})),a=i.findIndex(e=>e.tabs.some(e=>e.props.selected));return i.push(i.splice(a,1)[0]),i},[n,t,r,e]);return _.createElement(po,{...i,isMultiRow:r>1,role:`tablist`,ref:a},o.map(e=>_.createElement(mo,{key:e.key},e.tabs)))});go.displayName=`Tabs`;var _o=[`blur`,`focus`],vo=[`click`,`contextmenu`,`doubleclick`,`drag`,`dragend`,`dragenter`,`dragexit`,`dragleave`,`dragover`,`dragstart`,`drop`,`mousedown`,`mouseenter`,`mouseleave`,`mousemove`,`mouseout`,`mouseover`,`mouseup`];function yo(e){return`nativeEvent`in e&&_o.includes(e.type)}function bo(e){return`nativeEvent`in e&&vo.includes(e.type)}var xo={top:`top: -4px;
        left: 50%;
        transform: translate(-50%, -100%);`,bottom:`bottom: -4px;
           left: 50%;
           transform: translate(-50%, 100%);`,left:`left: -4px;
         top: 50%;
         transform: translate(-100%, -50%);`,right:`right: -4px;
          top: 50%;
          transform: translate(100%, -50%);`},So=R.span`
  position: absolute;

  z-index: 1;
  display: ${e=>e.show?`block`:`none`};
  padding: 4px;
  border: 2px solid ${({theme:e})=>e.borderDarkest};
  background: ${({theme:e})=>e.tooltip};
  box-shadow: ${Vn};
  text-align: center;
  font-size: 1rem;
  ${e=>xo[e.position]}
`,Co=R.div`
  position: relative;
  display: inline-block;
  white-space: nowrap;
`,wo=(0,_.forwardRef)(({className:e,children:t,disableFocusListener:n=!1,disableMouseListener:r=!1,enterDelay:i=1e3,leaveDelay:a=0,onBlur:o,onClose:s,onFocus:c,onMouseEnter:l,onMouseLeave:u,onOpen:d,style:f,text:p,position:m=`top`,...h},g)=>{let[v,y]=(0,_.useState)(!1),[b,x]=(0,_.useState)(),[S,C]=(0,_.useState)(),w=!n,T=!r,ee=e=>{window.clearTimeout(b),window.clearTimeout(S),x(window.setTimeout(()=>{y(!0),d?.(e)},i))},te=e=>{e.persist(),yo(e)?c?.(e):bo(e)&&l?.(e),ee(e)},E=e=>{window.clearTimeout(b),window.clearTimeout(S),C(window.setTimeout(()=>{y(!1),s?.(e)},a))},D=e=>{e.persist(),yo(e)?o?.(e):bo(e)&&u?.(e),E(e)},ne=w?D:void 0,O=w?te:void 0,k=T?te:void 0,re=T?D:void 0,ie=w?0:void 0;return _.createElement(Co,{"data-testid":`tooltip-wrapper`,onBlur:ne,onFocus:O,onMouseEnter:k,onMouseLeave:re,tabIndex:ie},_.createElement(So,{className:e,"data-testid":`tooltip`,position:m,ref:g,show:v,style:f,...h},p),t)});wo.displayName=`Tooltip`;var To=R(xr)`
  white-space: nowrap;
`,Eo=L`
  :focus {
    outline: none;
  }

  ${({$disabled:e})=>e?`cursor: default;`:L`
          cursor: pointer;

          :focus {
            ${To} {
              background: ${({theme:e})=>e.hoverBackground};
              color: ${({theme:e})=>e.materialTextInvert};
              outline: 2px dotted ${({theme:e})=>e.focusSecondary};
            }
          }
        `}
`,Do=R.ul`
  position: relative;
  isolation: isolate;

  ${({isRootLevel:e})=>e&&L`
      &:before {
        content: '';
        position: absolute;
        top: 20px;
        bottom: 0;
        left: 5.5px;
        width: 1px;
        border-left: 2px dashed ${({theme:e})=>e.borderDark};
      }
    `}

  ul {
    padding-left: 19.5px;
  }

  li {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 17.5px;
      left: 5.5px;
      width: 22px;
      border-top: 2px dashed ${({theme:e})=>e.borderDark};
      font-size: 12px;
    }
  }
`,Oo=R.li`
  position: relative;
  padding-left: ${({hasItems:e})=>e?`0`:`13px`};

  ${({isRootLevel:e})=>e?L`
          &:last-child {
            &:after {
              content: '';
              position: absolute;
              top: 19.5px;
              left: 1px;
              bottom: 0;
              width: 10px;
              background: ${({theme:e})=>e.material};
            }
          }
        `:L`
          &:last-child {
            &:after {
              content: '';
              position: absolute;
              z-index: 1;
              top: 19.5px;
              bottom: 0;
              left: 1.5px;
              width: 10px;
              background: ${({theme:e})=>e.material};
            }
          }
        `}

  & > details > ul {
    &:after {
      content: '';
      position: absolute;
      top: -18px;
      bottom: 0;
      left: 25px;
      border-left: 2px dashed ${({theme:e})=>e.borderDark};
    }
  }
`,ko=R.details`
  position: relative;
  z-index: 2;

  &[open] > summary:before {
    content: '-';
  }
`,Ao=R.summary`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  color: ${({theme:e})=>e.materialText};
  user-select: none;
  padding-left: 18px;
  ${Eo};

  &::-webkit-details-marker {
    display: none;
  }

  &:before {
    content: '+';
    position: absolute;
    left: 0;
    display: block;
    width: 8px;
    height: 9px;
    border: 2px solid #808080;
    padding-left: 1px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
  }
`,jo=R(br)`
  position: relative;
  z-index: 1;
  background: none;
  border: 0;
  font-family: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0;
  ${Eo};
`,Mo=R.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;function No(e,t){return e.includes(t)?e.filter(e=>e!==t):[...e,t]}function Po(e){e.preventDefault()}function Fo({className:e,disabled:t,expanded:n,innerRef:r,level:i,select:a,selected:o,style:s,tree:c=[]}){let l=i===0,u=(0,_.useCallback)(r=>{let c=!!(r.items&&r.items.length>0),u=n.includes(r.id),d=(t||r.disabled)??!1,f=d?Po:e=>a(e,r),p=d?Po:e=>a(e,r),m=o===r.id,h=_.createElement(Mo,{"aria-hidden":!0},r.icon);return _.createElement(Oo,{key:r.label,isRootLevel:l,role:`treeitem`,"aria-expanded":u,"aria-selected":m,hasItems:c},c?_.createElement(ko,{open:u},_.createElement(Ao,{onClick:f,$disabled:d},_.createElement(jo,{$disabled:d},h,_.createElement(To,null,r.label))),u&&_.createElement(Fo,{className:e,disabled:d,expanded:n,level:i+1,select:a,selected:o,style:s,tree:r.items??[]})):_.createElement(jo,{as:`button`,$disabled:d,onClick:p},h,_.createElement(To,null,r.label)))},[e,t,n,l,i,a,o,s]);return _.createElement(Do,{className:l?e:void 0,style:l?s:void 0,ref:l?r:void 0,role:l?`tree`:`group`,isRootLevel:l},c.map(u))}function Io({className:e,defaultExpanded:t=[],defaultSelected:n,disabled:r=!1,expanded:i,onNodeSelect:a,onNodeToggle:o,selected:s,style:c,tree:l=[]},u){let[d,f]=hr({defaultValue:t,onChange:o,onChangePropName:`onNodeToggle`,value:i,valuePropName:`expanded`}),[p,m]=hr({defaultValue:n,onChange:a,onChangePropName:`onNodeSelect`,value:s,valuePropName:`selected`}),h=(0,_.useCallback)((e,t)=>{o&&o(e,No(d,t)),f(e=>No(e,t))},[d,o,f]),g=(0,_.useCallback)((e,t)=>{m(t),a&&a(e,t)},[a,m]),v=(0,_.useCallback)((e,t)=>{e.preventDefault(),g(e,t.id),t.items&&t.items.length&&h(e,t.id)},[g,h]);return _.createElement(Fo,{className:e,disabled:r,expanded:d,level:0,innerRef:u,select:v,selected:p,style:c,tree:l})}var Lo=(0,_.forwardRef)(Io);Lo.displayName=`TreeView`;var Ro=c(o(((e,t)=>{t.exports={name:`original`,anchor:`#1034a6`,anchorVisited:`#440381`,borderDark:`#848584`,borderDarkest:`#0a0a0a`,borderLight:`#dfdfdf`,borderLightest:`#fefefe`,canvas:`#ffffff`,canvasText:`#0a0a0a`,canvasTextDisabled:`#848584`,canvasTextDisabledShadow:`#fefefe`,canvasTextInvert:`#fefefe`,checkmark:`#0a0a0a`,checkmarkDisabled:`#848584`,desktopBackground:`#008080`,flatDark:`#9e9e9e`,flatLight:`#d8d8d8`,focusSecondary:`#fefe03`,headerBackground:`#060084`,headerNotActiveBackground:`#7f787f`,headerNotActiveText:`#c6c6c6`,headerText:`#fefefe`,hoverBackground:`#060084`,material:`#c6c6c6`,materialDark:`#9a9e9c`,materialText:`#0a0a0a`,materialTextDisabled:`#848584`,materialTextDisabledShadow:`#fefefe`,materialTextInvert:`#fefefe`,progress:`#060084`,tooltip:`#fefbcc`}}))(),1),zo=`/assets/ms_sans_serif-Du8rjN1q.woff2`,Bo=`/assets/ms_sans_serif_bold-D5dpRRHG.woff2`,Vo=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),G=o(((e,t)=>{t.exports=Vo()}))(),Ho=[`.mp4`,`.mov`,`.avi`,`.mkv`,`.mts`];function Uo(e){return e.toLowerCase().replace(/.*(\.\w+)$/,`$1`)}function Wo(e){return e?e<1024?e+` B`:e<1024*1024?(e/1024).toFixed(1)+` KB`:e<1024*1024*1024?(e/(1024*1024)).toFixed(1)+` MB`:(e/(1024*1024*1024)).toFixed(2)+` GB`:`-`}var Go={fontFamily:`ms_sans_serif`,border:`2px inset #dfdfdf`,padding:`2px 4px`,fontSize:`11px`,backgroundColor:`#fff`,height:`22px`};function Ko(e,t=`All`){return[{label:t,value:``},...e.map(e=>({label:e,value:e}))]}function qo({src:e,alt:t,style:n}){return Ho.includes(Uo(t))?(0,G.jsx)(`video`,{src:`${e}#t=0.5`,muted:!0,preload:`metadata`,style:n}):(0,G.jsx)(`img`,{src:e,alt:t,loading:`lazy`,style:n})}function Jo(e,t,n){let r=[],i=new Set([`Urls`,`Logging`,`AllowedHosts`,`EnableFullScan`,`MasterCluster`]);for(let[a,o]of Object.entries(e)){if(i.has(a))continue;let e=[...t,a],s=e.join(`.`);o&&typeof o==`object`&&!Array.isArray(o)?(r.push((0,G.jsx)(`div`,{style:{gridColumn:`1 / -1`,fontWeight:`bold`,marginTop:`6px`,borderBottom:`1px solid #808080`,paddingBottom:`2px`},children:s},s)),r.push(...Jo(o,e,n))):Array.isArray(o)?(r.push((0,G.jsxs)(`label`,{style:{textAlign:`right`},children:[a,`:`]},s+`_l`)),r.push((0,G.jsx)(`input`,{type:`text`,value:o.join(`, `),onChange:t=>n(e,t.target.value.split(`,`).map(e=>e.trim()).filter(Boolean)),style:{border:`2px inset #dfdfdf`,padding:`2px 4px`,fontSize:`11px`,fontFamily:`ms_sans_serif`}},s+`_v`))):(r.push((0,G.jsxs)(`label`,{style:{textAlign:`right`},children:[a,`:`]},s+`_l`)),a.toLowerCase()===`transfermode`?r.push((0,G.jsxs)(`select`,{value:String(o||`copy`),onChange:t=>n(e,t.target.value),style:{border:`2px inset #dfdfdf`,padding:`2px`,fontSize:`11px`,fontFamily:`ms_sans_serif`},children:[(0,G.jsx)(`option`,{value:`copy`,children:`copy`}),(0,G.jsx)(`option`,{value:`move`,children:`move`})]},s+`_v`)):r.push((0,G.jsx)(`input`,{type:typeof o==`number`?`number`:`text`,value:String(o??``),onChange:t=>n(e,typeof o==`number`?Number(t.target.value):t.target.value),style:{border:`2px inset #dfdfdf`,padding:`2px 4px`,fontSize:`11px`,fontFamily:`ms_sans_serif`}},s+`_v`)))}return r}function Yo({capture:e,captures:t,index:n,onClose:r,onNavigate:i,onDelete:a,allTags:o,onTagsChanged:s}){let c=Uo(e.fileName),l=Ho.includes(c),u=!l,d=e.fileFullPath||`${e.filePath}\\${e.fileName}`,f=`/api/image?path=${encodeURIComponent(d)}&agentId=${e.agentId||`local`}`,[p,m]=(0,_.useState)([]),[h,g]=(0,_.useState)(``),v=()=>{fetch(`/api/tag/file/${e.id}`).then(e=>e.json()).then(m).catch(()=>{})},[y,b]=(0,_.useState)(null),[x,S]=(0,_.useState)(!1),[C,w]=(0,_.useState)([]),[T,ee]=(0,_.useState)(!1),[te,E]=(0,_.useState)([]),D=()=>{fetch(`/api/face/file/${e.id}`).then(e=>e.json()).then(e=>{w(e),e.length>0&&ee(!0)}).catch(()=>{})},ne=()=>{fetch(`/api/face/persons`).then(e=>e.json()).then(E).catch(()=>{})};return(0,_.useEffect)(()=>{v(),D(),ne(),b(null),S(!1),u&&e.id&&[`.heic`,`.jpg`,`.jpeg`].includes(c)&&fetch(`/api/experiment/live-photo/${e.id}`).then(e=>e.ok?e.json():null).then(e=>b(e)).catch(()=>{})},[e.id]),(0,_.useEffect)(()=>{let e=e=>{e.key===`Escape`&&r(),e.key===`ArrowLeft`&&n>0&&i(n-1),e.key===`ArrowRight`&&n<t.length-1&&i(n+1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n,t.length,r,i]),(0,G.jsx)(`div`,{style:{position:`fixed`,inset:0,backgroundColor:`rgba(0,0,0,0.7)`,zIndex:1e3,display:`flex`,justifyContent:`center`,alignItems:`center`},onClick:r,children:(0,G.jsxs)(Ni,{style:{width:`90vw`,height:`90vh`,maxWidth:`1100px`,display:`flex`,flexDirection:`column`},onClick:e=>e.stopPropagation(),children:[(0,G.jsxs)(Mi,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,G.jsx)(`span`,{children:e.fileName}),(0,G.jsx)(z,{size:`sm`,onClick:r,children:`X`})]}),(0,G.jsxs)(Ai,{style:{flexGrow:1,display:`flex`,gap:`10px`,padding:`8px`,minHeight:0,overflow:`hidden`},children:[(0,G.jsxs)(`div`,{style:{flex:`1 1 70%`,display:`flex`,flexDirection:`column`,minHeight:0},children:[(0,G.jsxs)(`div`,{style:{flexGrow:1,minHeight:0,display:`flex`,alignItems:`center`,justifyContent:`center`,backgroundColor:`#000`,border:`2px inset #dfdfdf`,position:`relative`},children:[l?(0,G.jsx)(`video`,{src:f,controls:!0,style:{maxWidth:`100%`,maxHeight:`100%`}}):x&&y?(0,G.jsx)(`video`,{src:`/api/image?path=${encodeURIComponent(y.fileFullPath||`${y.filePath}\\${y.fileName}`)}&agentId=${y.agentId||`local`}`,autoPlay:!0,loop:!0,muted:!0,style:{maxWidth:`100%`,maxHeight:`100%`}}):(0,G.jsx)(`img`,{src:f,alt:e.fileName,style:{maxWidth:`100%`,maxHeight:`100%`,objectFit:`contain`}}),T&&C.map(e=>(0,G.jsx)(`div`,{style:{position:`absolute`,left:`${e.regionX*100}%`,top:`${e.regionY*100}%`,width:`${e.regionW*100}%`,height:`${e.regionH*100}%`,border:`2px solid #00ff00`,boxSizing:`border-box`,pointerEvents:`auto`,cursor:`pointer`},title:e.personName||`Unknown`,children:(0,G.jsx)(`span`,{style:{position:`absolute`,bottom:`-18px`,left:0,fontSize:`10px`,backgroundColor:`rgba(0,0,0,0.7)`,color:`#0f0`,padding:`1px 4px`,whiteSpace:`nowrap`},children:e.personName||`?`})},e.id)),y&&(0,G.jsx)(`div`,{style:{position:`absolute`,top:`8px`,left:`8px`},children:(0,G.jsx)(z,{size:`sm`,active:x,onMouseDown:()=>S(!0),onMouseUp:()=>S(!1),onMouseLeave:()=>S(!1),onClick:()=>S(!x),children:`LIVE`})})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`8px`,marginTop:`6px`,flexShrink:0},children:[(0,G.jsx)(z,{disabled:n<=0,onClick:()=>i(n-1),children:`< Prev`}),(0,G.jsxs)(`span`,{style:{fontSize:`11px`,lineHeight:`28px`},children:[n+1,` / `,t.length]}),(0,G.jsx)(z,{disabled:n>=t.length-1,onClick:()=>i(n+1),children:`Next >`})]})]}),(0,G.jsxs)(`div`,{style:{flex:`0 0 200px`,overflow:`auto`,display:`flex`,flexDirection:`column`},children:[(0,G.jsx)(Yi,{label:`Properties`,style:{flexGrow:1},children:(0,G.jsx)(`table`,{style:{fontSize:`11px`,width:`100%`,borderCollapse:`collapse`},children:(0,G.jsx)(`tbody`,{children:[[`File`,e.fileName],[`Camera`,[e.cameraMaker,e.cameraModel].filter(Boolean).join(` `)||`-`],[`Lens`,e.lensModel||`-`],[`Time`,e.captureTime?new Date(e.captureTime).toLocaleString():`-`],[`Size`,Wo(e.fileSize)],[`GPS`,e.latitude!=null&&e.longitude!=null?`${e.latitude.toFixed(6)}, ${e.longitude.toFixed(6)}`:`-`],[`Source`,e.agentId===`local`?`Local`:e.agentId?.substring(0,8)||`-`],[`MD5`,e.fileMd5?.substring(0,12)||`-`]].map(([e,t])=>(0,G.jsxs)(`tr`,{children:[(0,G.jsx)(`td`,{style:{padding:`3px 4px`,fontWeight:`bold`,whiteSpace:`nowrap`,verticalAlign:`top`},children:e}),(0,G.jsx)(`td`,{style:{padding:`3px 4px`,wordBreak:`break-all`},children:t})]},e))})})}),(0,G.jsxs)(Yi,{label:`Tags`,style:{marginTop:`6px`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`3px`,marginBottom:`4px`},children:[p.map(t=>(0,G.jsxs)(`span`,{style:{fontSize:`10px`,backgroundColor:`#000080`,color:`#fff`,padding:`1px 6px`,borderRadius:`2px`,cursor:`pointer`},onClick:()=>{fetch(`/api/tag/file/${e.id}/${t.id}`,{method:`DELETE`}).then(v)},title:`Click to remove`,children:[t.name,` x`]},t.id)),p.length===0&&(0,G.jsx)(`span`,{style:{fontSize:`10px`,color:`#888`},children:`No tags`})]}),(0,G.jsx)(`div`,{style:{display:`flex`,gap:`2px`},children:(0,G.jsxs)(`select`,{style:{flex:1,fontSize:`10px`,border:`2px inset #dfdfdf`,fontFamily:`ms_sans_serif`},onChange:t=>{t.target.value&&fetch(`/api/tag/file/${e.id}/${t.target.value}`,{method:`POST`}).then(v),t.target.value=``},children:[(0,G.jsx)(`option`,{value:``,children:`+ Add tag...`}),o.filter(e=>!p.some(t=>t.id===e.id)).map(e=>(0,G.jsxs)(`option`,{value:e.id,children:[e.category?e.category+`/`:``,e.name]},e.id))]})}),(0,G.jsx)(`div`,{style:{display:`flex`,gap:`2px`,marginTop:`4px`},children:(0,G.jsx)(`input`,{type:`text`,placeholder:`New tag`,value:h,onChange:e=>g(e.target.value),style:{flex:1,fontSize:`10px`,border:`2px inset #dfdfdf`,padding:`1px 3px`,fontFamily:`ms_sans_serif`},onKeyDown:t=>{t.key===`Enter`&&h.trim()&&fetch(`/api/tag`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:h.trim(),category:``})}).then(e=>e.json()).then(t=>{fetch(`/api/tag/file/${e.id}/${t.id}`,{method:`POST`}).then(()=>{v(),s(),g(``)})})}})})]}),(0,G.jsxs)(Yi,{label:`Faces`,style:{marginTop:`6px`},children:[(0,G.jsxs)(`div`,{style:{fontSize:`10px`,marginBottom:`4px`},children:[C.length>0?`${C.length} face(s) detected`:`No faces detected`,C.length>0&&(0,G.jsxs)(`span`,{style:{cursor:`pointer`,marginLeft:`6px`,color:`#000080`},onClick:()=>ee(e=>!e),children:[`[`,T?`Hide`:`Show`,`]`]})]}),C.map(e=>(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`3px`,marginBottom:`3px`},children:[(0,G.jsx)(`div`,{style:{width:`8px`,height:`8px`,backgroundColor:`#00ff00`,borderRadius:`50%`,flexShrink:0}}),(0,G.jsxs)(`select`,{style:{flex:1,fontSize:`10px`,border:`2px inset #dfdfdf`,fontFamily:`ms_sans_serif`},value:e.personId||``,onChange:t=>{let n=t.target.value;if(n===`__new__`){let t=window.prompt(`Enter person name:`);t&&fetch(`/api/face/${e.id}/assign`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({personName:t})}).then(()=>{D(),ne()})}else n&&fetch(`/api/face/${e.id}/assign`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({personId:parseInt(n)})}).then(D)},children:[(0,G.jsx)(`option`,{value:``,children:`Unknown`}),te.map(e=>(0,G.jsx)(`option`,{value:e.id,children:e.name},e.id)),(0,G.jsx)(`option`,{value:`__new__`,children:`+ New person...`})]})]},e.id))]}),(0,G.jsx)(z,{style:{marginTop:`6px`,width:`100%`},onClick:()=>{fetch(`/api/recognition/providers`).then(e=>e.json()).then(t=>{let n=t.providers.filter(e=>e.configured);if(n.length===0){alert(`No API keys configured. Go to Node Config > Image Recognition to set up.`);return}let r=n.find(e=>e.name===t.defaultProvider)?.name||n[0].name;fetch(`/api/recognition/analyze`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({fileIds:[e.id],provider:r})}).then(e=>e.json()).then(()=>{v(),s(),alert(`Recognition complete`)}).catch(e=>alert(`Recognition failed: `+e.message))})},children:`AI Recognize`}),(0,G.jsx)(z,{style:{marginTop:`4px`,width:`100%`},onClick:()=>{fetch(`/api/recognition/providers`).then(e=>e.json()).then(t=>{let n=t.providers.filter(e=>e.configured);if(n.length===0){alert(`No API keys configured.`);return}let r=n.find(e=>e.name===t.defaultProvider)?.name||n[0].name;fetch(`/api/face/detect`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({fileIds:[e.id],provider:r})}).then(e=>e.json()).then(()=>{D(),alert(`Face detection complete`)}).catch(e=>alert(`Face detection failed: `+e.message))})},children:`Face Detect`}),(0,G.jsx)(z,{style:{marginTop:`4px`,width:`100%`,color:`#ff0000`},onClick:()=>{window.confirm(`Delete "${e.fileName}"? This will remove the file from disk.`)&&a(e.id)},children:`Delete File`})]})]})]})})}function Xo(){let[e,t]=(0,_.useState)(null),[n,r]=(0,_.useState)(-1),[i,a]=(0,_.useState)([]),[o,s]=(0,_.useState)([]),[c,l]=(0,_.useState)(1),[u,d]=(0,_.useState)(!1),[f,p]=(0,_.useState)(!0),[m,h]=(0,_.useState)({cameraMakers:[],cameraModels:[],fileTypes:[],agentIds:[]}),[g,v]=(0,_.useState)(``),[y,b]=(0,_.useState)(``),[x,S]=(0,_.useState)(``),[C,w]=(0,_.useState)(``),[T,ee]=(0,_.useState)(``),[te,E]=(0,_.useState)(``),[D,ne]=(0,_.useState)(!1),[O,k]=(0,_.useState)(``),[re,ie]=(0,_.useState)(``),A=(0,_.useRef)(null),j=(0,_.useRef)(0),M=(0,_.useCallback)(e=>{u||(A.current&&A.current.disconnect(),A.current=new IntersectionObserver(e=>{e[0].isIntersecting&&f&&l(e=>e+1)}),e&&A.current.observe(e))},[u,f]);(0,_.useEffect)(()=>{fetch(`/api/experiment/filters`).then(e=>e.json()).then(h).catch(console.error),fetch(`/api/tag`).then(e=>e.json()).then(a).catch(console.error)},[]),(0,_.useEffect)(()=>{j.current++,s([]),l(1),p(!0)},[g,y,x,C,T,te,D,O,re]),(0,_.useEffect)(()=>{if(!f)return;d(!0);let e=new URLSearchParams({page:String(c),pageSize:`30`});g&&e.set(`cameraMaker`,g),y&&e.set(`cameraModel`,y),x&&e.set(`fileType`,x),C&&e.set(`agentId`,C),T&&e.set(`dateFrom`,T),te&&e.set(`dateTo`,te),D&&e.set(`hasGps`,`true`),O&&e.set(`mediaType`,O),re&&e.set(`tagId`,String(re));let t=j.current;fetch(`/api/experiment/gallery?${e}`).then(e=>e.json()).then(e=>{t===j.current&&(!e||e.length===0?p(!1):(s(t=>{let n=new Map([...t,...e].map(e=>[e.id||e.fileName+e.captureTime,e]));return Array.from(n.values())}),e.length<30&&p(!1)),d(!1))}).catch(e=>{console.error(`Error fetching:`,e),d(!1)})},[c,g,y,x,C,T,te,D,O,re]);let N=()=>{v(``),b(``),S(``),w(``),ee(``),E(``),ne(!1),k(``),ie(``)};return(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,flexGrow:1,minHeight:0,overflow:`hidden`},children:[(0,G.jsx)(Yi,{label:`Filters`,style:{flexShrink:0,marginBottom:`8px`},children:(0,G.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px`,alignItems:`center`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Brand:`}),(0,G.jsx)(Ei,{options:Ko(m.cameraMakers),value:g,onChange:e=>v(e.value),width:130,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Model:`}),(0,G.jsx)(Ei,{options:Ko(m.cameraModels),value:y,onChange:e=>b(e.value),width:160,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Type:`}),(0,G.jsx)(Ei,{options:Ko(m.fileTypes),value:x,onChange:e=>S(e.value),width:90,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Source:`}),(0,G.jsx)(Ei,{options:Ko(m.agentIds),value:C,onChange:e=>w(e.value),width:120,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`From:`}),(0,G.jsx)(`input`,{type:`date`,value:T,onChange:e=>ee(e.target.value),style:Go})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`To:`}),(0,G.jsx)(`input`,{type:`date`,value:te,onChange:e=>E(e.target.value),style:Go})]}),(0,G.jsx)(jr,{label:`GPS`,checked:D,onChange:()=>ne(!D)}),(0,G.jsx)(`span`,{style:{borderLeft:`1px solid #808080`,height:`20px`,margin:`0 2px`}}),(0,G.jsx)(z,{size:`sm`,active:O===``,onClick:()=>k(``),children:`All`}),(0,G.jsx)(z,{size:`sm`,active:O===`photo`,onClick:()=>k(`photo`),children:`Photos`}),(0,G.jsx)(z,{size:`sm`,active:O===`video`,onClick:()=>k(`video`),children:`Videos`}),(0,G.jsx)(`span`,{style:{borderLeft:`1px solid #808080`,height:`20px`,margin:`0 2px`}}),i.length>0&&(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Tag:`}),(0,G.jsx)(Ei,{options:[{label:`All`,value:``},...i.map(e=>({label:`${e.category?e.category+`/`:``}${e.name}`,value:e.id}))],value:re,onChange:e=>ie(e.value),width:140,menuMaxHeight:200})]}),(0,G.jsx)(z,{size:`sm`,onClick:N,children:`Clear`})]})}),(0,G.jsxs)(`div`,{style:{marginBottom:`6px`,flexShrink:0,fontSize:`12px`},children:[`Showing `,o.length,` files`]}),(0,G.jsxs)(`div`,{style:{flexGrow:1,minHeight:0,width:`100%`,overflow:`auto`,backgroundColor:`#fff`,border:`2px inset #dfdfdf`,padding:`10px`},children:[(0,G.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:`12px`},children:o.map((e,n)=>{let i=n===o.length-1,a=e.fileFullPath||`${e.filePath}\\${e.fileName}`,s=e.captureTime?new Date(e.captureTime).toLocaleString():``,c=`/api/image?path=${encodeURIComponent(a)}&agentId=${e.agentId||`local`}`;return(0,G.jsxs)(`div`,{ref:i?M:null,style:{border:`2px solid #dfdfdf`,borderBottomColor:`#808080`,borderRightColor:`#808080`,padding:`4px`,textAlign:`center`,backgroundColor:`#c0c0c0`,cursor:`pointer`},onClick:()=>{t(e),r(n)},children:[(0,G.jsx)(qo,{src:c,alt:e.fileName,style:{width:`100%`,height:`160px`,objectFit:`cover`,border:`2px inset #dfdfdf`,backgroundColor:`#000`}}),(0,G.jsx)(`div`,{style:{fontSize:`11px`,marginTop:`6px`,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`,padding:`2px`},children:e.fileName}),s&&(0,G.jsx)(`div`,{style:{fontSize:`10px`,color:`#666`,marginTop:`2px`},children:s}),e.agentId&&e.agentId!==`local`&&(0,G.jsxs)(`div`,{style:{fontSize:`10px`,color:`#000080`,marginTop:`2px`},children:[`Node: `,e.agentId.substring(0,8)]})]},e.id||`${e.fileName}_${n}`)})}),u&&(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`},children:`Loading please wait...`}),!f&&o.length>0&&(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`},children:`No more pictures found.`}),!u&&!f&&o.length===0&&(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`},children:`Your gallery is empty.`})]}),e&&(0,G.jsx)(Yo,{capture:e,captures:o,index:n,onClose:()=>t(null),onNavigate:e=>{r(e),t(o[e])},onDelete:e=>{fetch(`/api/experiment/${e}`,{method:`DELETE`}).then(e=>{if(!e.ok)throw Error(`Delete failed`)}).then(()=>{s(t=>t.filter(t=>t.id!==e)),t(null)}).catch(e=>{alert(`Failed to delete: `+e.message)})},allTags:i,onTagsChanged:()=>fetch(`/api/tag`).then(e=>e.json()).then(a).catch(()=>{})})]})}function Zo(){let[e,t]=(0,_.useState)([]),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(`checking`),[o,s]=(0,_.useState)({}),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)(``),[f,p]=(0,_.useState)(null),[m,h]=(0,_.useState)(null),[g,v]=(0,_.useState)(!1),y=()=>{fetch(`/api/agent/status`).then(e=>e.json()).then(e=>{let n=e.find(e=>e.id===`local`);n&&(r(n.version),a(n.health===`healthy`?`healthy`:`unhealthy`));let i=e.filter(e=>e.id!==`local`);t(i.map(e=>({id:e.id,name:e.name,endpoint:e.endpoint,version:e.version,lastSeen:e.lastSeen,scanStatus:e.scanStatus})));let o={};i.forEach(e=>{o[e.id]=e.health===`healthy`?`healthy`:`unhealthy`}),s(o)}).catch(console.error)};(0,_.useEffect)(()=>{y()},[]);let b=e=>{if(f===e){p(null);return}p(e),h(null);let t=e===`local`?`/api/master/config`:`/api/agent/${e}/config`;fetch(t).then(e=>e.json()).then(h).catch(()=>h(null))},x=()=>{if(!f||!m)return;v(!0);let e=f===`local`?`/api/master/config`:`/api/agent/${f}/config`;fetch(e,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(m)}).then(e=>{if(!e.ok)throw Error(`Save failed`);alert(`Config saved`)}).catch(e=>alert(`Failed: `+e.message)).finally(()=>v(!1))},S=(e,t)=>{if(!m)return;let n=JSON.parse(JSON.stringify(m)),r=n;for(let t=0;t<e.length-1;t++)r[e[t]]||(r[e[t]]={}),r=r[e[t]];r[e[e.length-1]]=t,h(n)},C=()=>{fetch(`/api/agent`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:c,endpoint:u})}).then(()=>{l(``),d(``),y()})},w=e=>{fetch(`/api/agent/${e}`,{method:`DELETE`}).then(()=>y())};return(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,G.jsxs)(`fieldset`,{style:{border:`2px solid groove`,padding:`15px`},children:[(0,G.jsx)(`legend`,{children:`Register New Edge Node`}),(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,alignItems:`center`},children:[(0,G.jsx)(`label`,{children:`Name:`}),(0,G.jsx)(Qr,{placeholder:`e.g. Z690 Desktop`,value:c,onChange:e=>l(e.target.value)}),(0,G.jsx)(`label`,{children:`API Endpoint:`}),(0,G.jsx)(Qr,{placeholder:`e.g. http://192.168.1.100:5000`,value:u,onChange:e=>d(e.target.value),style:{width:`250px`}}),(0,G.jsx)(z,{onClick:C,children:`Add Node`}),(0,G.jsx)(z,{onClick:y,children:`Refresh`}),(0,G.jsx)(z,{onClick:()=>{window.confirm(`Clear image cache on Master and all Agents?`)&&fetch(`/api/cache`,{method:`DELETE`}).then(e=>e.json()).then(e=>alert(`Cache cleared: ${e.masterCleared} files, ${e.agentsNotified} agents notified`))},children:`Clear Cache`})]})]}),(0,G.jsx)(wr,{style:{height:`300px`},children:(0,G.jsxs)(lo,{children:[(0,G.jsx)(no,{children:(0,G.jsxs)(oo,{children:[(0,G.jsx)(io,{children:`Name`}),(0,G.jsx)(io,{children:`IP`}),(0,G.jsx)(io,{children:`Port`}),(0,G.jsx)(io,{children:`Version`}),(0,G.jsx)(io,{children:`Health`}),(0,G.jsx)(io,{children:`Heartbeat`}),(0,G.jsx)(io,{children:`Actions`})]})}),(0,G.jsxs)($a,{children:[(0,G.jsxs)(oo,{style:{cursor:`pointer`,backgroundColor:f===`local`?`#000080`:void 0,color:f===`local`?`#fff`:void 0},onClick:()=>b(`local`),children:[(0,G.jsx)(H,{children:`Master Local`}),(0,G.jsx)(H,{children:window.location.hostname}),(0,G.jsx)(H,{children:`5281`}),(0,G.jsx)(H,{children:n}),(0,G.jsx)(H,{style:{color:i===`healthy`?`green`:i===`unhealthy`?`red`:`#666`},children:i===`healthy`?`OK`:i===`unhealthy`?`DOWN`:`...`}),(0,G.jsx)(H,{children:`-`}),(0,G.jsx)(H,{children:`Built-in`})]}),e.map(e=>{let t=`-`,n=`-`;try{let r=new URL(e.endpoint);t=r.hostname,n=r.port}catch{}return(0,G.jsxs)(oo,{style:{cursor:`pointer`,backgroundColor:f===e.id?`#000080`:void 0,color:f===e.id?`#fff`:void 0},onClick:()=>b(e.id),children:[(0,G.jsx)(H,{children:e.name}),(0,G.jsx)(H,{children:t}),(0,G.jsx)(H,{children:n}),(0,G.jsx)(H,{children:e.version||`-`}),(0,G.jsx)(H,{style:{color:o[e.id]===`healthy`?`green`:o[e.id]===`unhealthy`?`red`:`#666`},children:o[e.id]===`healthy`?`OK`:o[e.id]===`unhealthy`?`DOWN`:`...`}),(0,G.jsx)(H,{children:e.lastSeen?new Date(e.lastSeen).toLocaleString():`-`}),(0,G.jsxs)(H,{style:{display:`flex`,gap:`4px`},onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(z,{size:`sm`,onClick:()=>{window.confirm(`Clear all records for "${e.name}" and trigger rescan?`)&&fetch(`/api/experiment/agent/${e.id}`,{method:`DELETE`}).then(()=>alert(`Rescan triggered`))},children:`Rescan`}),(0,G.jsx)(z,{size:`sm`,onClick:()=>w(e.id),children:`Delete`})]})]},e.id)})]})]})}),f&&f!==`local`&&(()=>{let t=e.find(e=>e.id===f)?.scanStatus;if(!t)return null;let n=e=>{if(!e)return`-`;let t=Math.floor(e/60),n=Math.floor(e%60);return t>0?`${t}m ${n}s`:`${n}s`},r=e=>e?new Date(e).toLocaleString():`-`;return(0,G.jsx)(Yi,{label:`Scan Status`,style:{marginTop:`10px`},children:(0,G.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`140px 1fr`,gap:`2px 8px`,fontSize:`11px`},children:[(0,G.jsx)(`b`,{children:`Status:`}),(0,G.jsx)(`span`,{style:{color:t.isScanning?`#008000`:`#666`},children:t.isScanning?`Scanning...`:`Idle`}),t.isScanning&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`b`,{children:`Current File:`}),(0,G.jsx)(`span`,{style:{wordBreak:`break-all`},children:t.currentFile||`-`})]}),t.isScanning&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`b`,{children:`Files Processed:`}),(0,G.jsx)(`span`,{children:t.filesProcessed??0})]}),(0,G.jsx)(`b`,{children:`Last Scan Start:`}),(0,G.jsx)(`span`,{children:r(t.lastScanStart)}),(0,G.jsx)(`b`,{children:`Last Scan End:`}),(0,G.jsx)(`span`,{children:r(t.lastScanEnd)}),(0,G.jsx)(`b`,{children:`Last Scan Duration:`}),(0,G.jsx)(`span`,{children:n(t.lastScanDurationSeconds)}),(0,G.jsx)(`b`,{children:`Next Scan:`}),(0,G.jsx)(`span`,{children:r(t.nextScanTime)}),t.lastError&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`b`,{style:{color:`red`},children:`Last Error:`}),(0,G.jsx)(`span`,{style:{color:`red`},children:t.lastError})]})]})})})(),f===`local`&&(0,G.jsx)(Yi,{label:`Image Recognition`,style:{marginTop:`10px`},children:(0,G.jsx)(`div`,{style:{fontSize:`11px`},children:[`Claude`,`OpenAI`,`Gemini`].map(e=>(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`6px`,alignItems:`center`,marginBottom:`4px`},children:[(0,G.jsxs)(`b`,{style:{width:`50px`},children:[e,`:`]}),(0,G.jsx)(`input`,{type:`password`,placeholder:`API Key`,style:{flex:1,border:`2px inset #dfdfdf`,padding:`2px 4px`,fontSize:`11px`,fontFamily:`ms_sans_serif`},defaultValue:(()=>{try{return m?.UltraSonic?.Recognition?.ApiKeys?.[e]||``}catch{return``}})(),onChange:t=>{if(!m)return;let n=JSON.parse(JSON.stringify(m));n.UltraSonic||={},n.UltraSonic.Recognition||(n.UltraSonic.Recognition={}),n.UltraSonic.Recognition.ApiKeys||(n.UltraSonic.Recognition.ApiKeys={}),n.UltraSonic.Recognition.ApiKeys[e]=t.target.value,h(n)}}),(0,G.jsx)(z,{size:`sm`,onClick:()=>{fetch(`/api/recognition/test`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({provider:e})}).then(e=>e.json()).then(t=>alert(`${e}: ${t.ok?`OK`:`Failed`} - ${t.message}`))},children:`Test`})]},e))})}),f&&m&&(0,G.jsxs)(Yi,{label:`Config: ${f===`local`?`Master`:e.find(e=>e.id===f)?.name||f}`,style:{marginTop:`10px`,maxHeight:`300px`,overflow:`auto`},children:[(0,G.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`180px 1fr`,gap:`4px 8px`,fontSize:`11px`,alignItems:`center`},children:Jo(m,[],S)}),(0,G.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,gap:`8px`},children:[(0,G.jsx)(z,{onClick:x,disabled:g,children:g?`Saving...`:`Save`}),(0,G.jsx)(z,{onClick:()=>p(null),children:`Cancel`})]})]}),f&&!m&&(0,G.jsx)(`div`,{style:{marginTop:`10px`,padding:`10px`,fontSize:`12px`,color:`#666`},children:`Loading config...`})]})}function Qo(e){let t={name:``,fullPath:``,children:new Map};for(let n of e){let e=n.filePath.replace(/\\/g,`/`).split(`/`).filter(Boolean),r=t,i=``;for(let t of e)i=i?i+`/`+t:t,r.children.has(t)||r.children.set(t,{name:t,fullPath:i,children:new Map}),r=r.children.get(t);r.folder=n}return t}function $o({node:e,depth:t,selectedFolder:n,onSelect:r}){let[i,a]=(0,_.useState)(t<2),o=e.children.size>0,s=n?.filePath===e.folder?.filePath&&n?.agentId===e.folder?.agentId,c=e.folder!=null;return(0,G.jsxs)(`div`,{children:[(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,padding:`1px 2px`,paddingLeft:t*16+2,cursor:c||o?`pointer`:`default`,backgroundColor:s?`#000080`:`transparent`,color:s?`#fff`:`#000`},onClick:()=>{c&&e.folder&&r(e.folder),o&&a(!i)},children:[(0,G.jsx)(`span`,{style:{width:`14px`,textAlign:`center`,fontSize:`10px`,flexShrink:0},children:o?i?`-`:`+`:` `}),(0,G.jsx)(`span`,{style:{marginRight:`4px`,fontSize:`12px`},children:c?`📁`:`📂`}),(0,G.jsx)(`span`,{style:{flexGrow:1,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},children:e.name}),c&&e.folder&&(0,G.jsx)(`span`,{style:{color:s?`#ccc`:`#888`,marginLeft:`4px`,flexShrink:0,fontSize:`10px`},children:e.folder.fileCount})]}),i&&Array.from(e.children.values()).map(e=>(0,G.jsx)($o,{node:e,depth:t+1,selectedFolder:n,onSelect:r},e.fullPath))]})}function es({folders:e,selectedFolder:t,onSelect:n}){let r=Qo(e);return r.children.size===0?(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`,color:`#666`},children:`No folders found`}):(0,G.jsx)(`div`,{style:{padding:`2px`},children:Array.from(r.children.values()).map(e=>(0,G.jsx)($o,{node:e,depth:0,selectedFolder:t,onSelect:n},e.fullPath))})}function ts({filterOptions:e}){let[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(new Set),h=()=>{let e=s?`?agentId=${encodeURIComponent(s)}`:``;fetch(`/api/experiment/folders${e}`).then(e=>e.json()).then(n).catch(console.error)},g=e=>{i(e),m(new Set);let t=new URLSearchParams({path:e.filePath});e.agentId&&t.set(`agentId`,e.agentId),fetch(`/api/experiment/folder-files?${t}`).then(e=>e.json()).then(o).catch(console.error)};return(0,_.useEffect)(()=>{h()},[s]),(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,flexGrow:1,minHeight:0,overflow:`hidden`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`,marginBottom:`8px`,flexShrink:0},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Source:`}),(0,G.jsx)(Ei,{options:Ko(e.agentIds),value:s,onChange:e=>c(e.value),width:150,menuMaxHeight:200}),(0,G.jsx)(z,{size:`sm`,onClick:h,children:`Refresh`}),r&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)(z,{size:`sm`,onClick:()=>f(!0),disabled:p.size===0,children:[`Move (`,p.size,`)`]}),(0,G.jsx)(z,{size:`sm`,style:{color:`red`},onClick:()=>{window.confirm(`Delete all ${r.fileCount} files in "${r.filePath}"?`)&&fetch(`/api/experiment/folder?path=${encodeURIComponent(r.filePath)}&agentId=${r.agentId||``}`,{method:`DELETE`}).then(()=>{h(),i(null),o([])})},children:`Delete Folder`})]})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,flexGrow:1,minHeight:0,gap:`8px`},children:[(0,G.jsx)(`div`,{style:{flex:`0 0 350px`,overflow:`auto`,border:`2px inset #dfdfdf`,backgroundColor:`#fff`,fontSize:`11px`},children:(0,G.jsx)(es,{folders:t,selectedFolder:r,onSelect:g})}),(0,G.jsx)(`div`,{style:{flexGrow:1,overflow:`auto`,border:`2px inset #dfdfdf`,backgroundColor:`#fff`},children:r?(0,G.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`,gap:`8px`,padding:`8px`},children:a.map(e=>{let t=e.fileFullPath||`${e.filePath}\\${e.fileName}`,n=`/api/image?path=${encodeURIComponent(t)}&agentId=${e.agentId||`local`}`,r=p.has(e.id);return(0,G.jsxs)(`div`,{style:{border:r?`2px solid #000080`:`2px solid #dfdfdf`,borderBottomColor:r?`#000080`:`#808080`,borderRightColor:r?`#000080`:`#808080`,padding:`3px`,textAlign:`center`,backgroundColor:r?`#c0c0ff`:`#c0c0c0`,cursor:`pointer`},onClick:()=>m(t=>{let n=new Set(t);return n.has(e.id)?n.delete(e.id):n.add(e.id),n}),children:[(0,G.jsx)(qo,{src:n,alt:e.fileName,style:{width:`100%`,height:`120px`,objectFit:`cover`,border:`2px inset #dfdfdf`,backgroundColor:`#000`}}),(0,G.jsx)(`div`,{style:{fontSize:`10px`,marginTop:`3px`,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},children:e.fileName})]},e.id)})}):(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`,color:`#666`},children:`Select a folder`})})]}),d&&(0,G.jsx)(`div`,{style:{position:`fixed`,inset:0,backgroundColor:`rgba(0,0,0,0.5)`,zIndex:1e3,display:`flex`,justifyContent:`center`,alignItems:`center`},children:(0,G.jsxs)(Ni,{style:{width:`400px`},children:[(0,G.jsxs)(Mi,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,G.jsx)(`span`,{children:`Move Files`}),(0,G.jsx)(z,{size:`sm`,onClick:()=>f(!1),children:`X`})]}),(0,G.jsxs)(Ai,{children:[(0,G.jsxs)(`p`,{style:{fontSize:`12px`,marginBottom:`8px`},children:[`Move `,p.size,` files to:`]}),(0,G.jsx)(Qr,{value:l,onChange:e=>u(e.target.value),placeholder:`D:\\Photos\\Archive`,style:{width:`100%`,marginBottom:`8px`}}),(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,justifyContent:`flex-end`},children:[(0,G.jsx)(z,{onClick:()=>f(!1),children:`Cancel`}),(0,G.jsx)(z,{onClick:()=>{fetch(`/api/experiment/move`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({fileIds:Array.from(p),targetPath:l})}).then(e=>e.json()).then(e=>{alert(`Moved ${e.moved}/${e.total} files`),f(!1),r&&g(r),h()}).catch(e=>alert(`Move failed: `+e.message))},disabled:!l,children:`Move`})]})]})]})})]})}function ns({agents:e}){let[t,n]=(0,_.useState)(`local`),[r,i]=(0,_.useState)(`all`),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(!1),p=(0,_.useRef)(null),m=(0,_.useCallback)((e,n)=>{let i=e??t,a=n??r;u(!0),fetch(`/api/agent/${i}/logs?type=${a}&lines=500`).then(e=>e.json()).then(e=>{o(e.lines||[]),c(e.file||``),setTimeout(()=>p.current?.scrollIntoView({behavior:`smooth`}),100)}).catch(()=>o([`Failed to load logs`])).finally(()=>u(!1))},[t,r]);return(0,_.useEffect)(()=>{m()},[]),(0,_.useEffect)(()=>{if(!d)return;let e=setInterval(()=>m(),5e3);return()=>clearInterval(e)},[d,m]),(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,flexGrow:1,minHeight:0,overflow:`hidden`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`,marginBottom:`8px`,flexShrink:0,flexWrap:`wrap`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Node:`}),(0,G.jsx)(Ei,{options:[{label:`Master (local)`,value:`local`},...e.map(e=>({label:`${e.name||e.id} (${e.endpoint})`,value:e.id}))],value:t,onChange:e=>{n(e.value),m(e.value)},width:200,menuMaxHeight:200}),(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Type:`}),(0,G.jsx)(Ei,{options:[{label:`All Logs`,value:`all`},{label:`Errors Only`,value:`error`},...t===`local`?[]:[{label:`Scan Only`,value:`scan`}]],value:r,onChange:e=>{i(e.value),m(void 0,e.value)},width:140,menuMaxHeight:200}),(0,G.jsx)(z,{size:`sm`,onClick:()=>m(),disabled:l,children:l?`Loading...`:`Refresh`}),(0,G.jsx)(jr,{label:`Auto-refresh (5s)`,checked:d,onChange:()=>f(e=>!e)}),s&&(0,G.jsxs)(`span`,{style:{fontSize:`10px`,color:`#666`},children:[`File: `,s,` (`,a.length,` lines)`]})]}),(0,G.jsxs)(`div`,{style:{flexGrow:1,overflow:`auto`,border:`2px inset #dfdfdf`,backgroundColor:`#000`,color:`#0f0`,fontFamily:`Consolas, "Courier New", monospace`,fontSize:`11px`,padding:`6px`,whiteSpace:`pre`,lineHeight:`1.4`},children:[a.map((e,t)=>{let n=/\[ERR\]|\[FTL\]/.test(e),r=/\[WRN\]/.test(e);return(0,G.jsx)(`div`,{style:{color:n?`#ff4444`:r?`#ffaa00`:`#00ff00`,fontWeight:n?`bold`:`normal`},children:e},t)}),(0,G.jsx)(`div`,{ref:p})]})]})}function rs(){let[e,t]=(0,_.useState)(null),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(!1),[o,s]=(0,_.useState)(null),c=()=>{fetch(`/api/backup/stats`).then(e=>e.json()).then(t).catch(()=>{}),fetch(`/api/backup/recent?limit=30`).then(e=>e.json()).then(r).catch(()=>{})};return(0,_.useEffect)(()=>{c()},[]),(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,flexGrow:1,minHeight:0,overflow:`auto`},children:[(0,G.jsx)(Yi,{label:`115 Cloud Backup Status`,children:e?(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`16px`,flexWrap:`wrap`,fontSize:`12px`},children:[(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`strong`,{children:`Total Files:`}),` `,e.totalFiles]}),(0,G.jsxs)(`div`,{style:{color:`#008000`},children:[(0,G.jsx)(`strong`,{children:`Backed Up:`}),` `,e.backedUp]}),(0,G.jsxs)(`div`,{style:{color:`#808000`},children:[(0,G.jsx)(`strong`,{children:`Pending:`}),` `,e.pending]}),(0,G.jsxs)(`div`,{style:{color:`#000080`},children:[(0,G.jsx)(`strong`,{children:`Uploading:`}),` `,e.uploading]}),(0,G.jsxs)(`div`,{style:{color:`#ff0000`},children:[(0,G.jsx)(`strong`,{children:`Failed:`}),` `,e.failed]}),(0,G.jsxs)(`div`,{style:{color:`#666`},children:[(0,G.jsx)(`strong`,{children:`Not Queued:`}),` `,e.notQueued]}),e.totalFiles>0&&(0,G.jsxs)(`div`,{children:[(0,G.jsx)(`strong`,{children:`Progress:`}),` `,(e.backedUp/e.totalFiles*100).toFixed(1),`%`]})]}):(0,G.jsx)(`span`,{style:{fontSize:`11px`,color:`#888`},children:`Loading...`})}),(0,G.jsxs)(Yi,{label:`Actions`,style:{marginTop:`8px`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,flexWrap:`wrap`},children:[(0,G.jsx)(z,{size:`sm`,onClick:()=>{a(!0),s(null),fetch(`/api/backup/test`,{method:`POST`}).then(e=>e.json()).then(e=>s(e)).catch(e=>s({ok:!1,message:e.message})).finally(()=>a(!1))},disabled:i,children:i?`Testing...`:`Test Connection`}),(0,G.jsx)(z,{size:`sm`,onClick:()=>{fetch(`/api/backup/queue-all?limit=100`,{method:`POST`}).then(e=>e.json()).then(e=>{alert(`Queued ${e.queued} files for backup`),c()})},children:`Queue Unbackup Files`}),(0,G.jsx)(z,{size:`sm`,onClick:()=>{fetch(`/api/backup/process?limit=10`,{method:`POST`}).then(e=>e.json()).then(e=>{alert(`Processed: ${e.processed}, Succeeded: ${e.succeeded}, Failed: ${e.failed}`),c()})},children:`Process Queue (10)`}),(0,G.jsx)(z,{size:`sm`,onClick:()=>{fetch(`/api/backup/retry-failed`,{method:`POST`}).then(()=>{alert(`Failed tasks reset`),c()})},children:`Retry Failed`}),(0,G.jsx)(z,{size:`sm`,onClick:c,children:`Refresh`})]}),o&&(0,G.jsxs)(`div`,{style:{marginTop:`6px`,fontSize:`11px`,color:o.ok?`#008000`:`#ff0000`},children:[o.ok?`OK`:`FAILED`,` - `,o.message]})]}),(0,G.jsx)(Yi,{label:`Recent Backup Tasks`,style:{marginTop:`8px`,flexGrow:1,overflow:`hidden`,display:`flex`,flexDirection:`column`},children:(0,G.jsx)(`div`,{style:{overflow:`auto`,flexGrow:1},children:(0,G.jsxs)(lo,{children:[(0,G.jsx)(no,{children:(0,G.jsxs)(oo,{children:[(0,G.jsx)(io,{style:{fontSize:`10px`},children:`File`}),(0,G.jsx)(io,{style:{fontSize:`10px`},children:`Status`}),(0,G.jsx)(io,{style:{fontSize:`10px`},children:`Remote Path`}),(0,G.jsx)(io,{style:{fontSize:`10px`},children:`Last Attempt`}),(0,G.jsx)(io,{style:{fontSize:`10px`},children:`Error`})]})}),(0,G.jsxs)($a,{children:[n.map(e=>(0,G.jsxs)(oo,{children:[(0,G.jsx)(H,{style:{fontSize:`10px`},children:e.fileName||`#${e.fileId}`}),(0,G.jsx)(H,{style:{fontSize:`10px`,color:e.status===`completed`?`#008000`:e.status===`failed`?`#ff0000`:e.status===`uploading`?`#000080`:`#808000`},children:e.status}),(0,G.jsx)(H,{style:{fontSize:`10px`},children:e.remotePath||`-`}),(0,G.jsx)(H,{style:{fontSize:`10px`},children:e.lastAttempt?new Date(e.lastAttempt).toLocaleString():`-`}),(0,G.jsx)(H,{style:{fontSize:`10px`,color:`#ff0000`},children:e.errorMessage||``})]},e.id)),n.length===0&&(0,G.jsx)(oo,{children:(0,G.jsx)(`td`,{colSpan:5,style:{fontSize:`11px`,textAlign:`center`,color:`#888`,padding:`8px`},children:`No backup tasks yet`})})]})]})})}),(0,G.jsx)(`div`,{style:{marginTop:`8px`,fontSize:`10px`,color:`#666`},children:`Configure 115 Cookie and backup settings in Node Config tab → master config → Backup section.`})]})}var is=zn`
  ${Bn}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${zo}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${Bo}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea, button {
    font-family: 'ms_sans_serif';
  }
  body {
    background: #008080;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;function as(){let[e,t]=(0,_.useState)(0),[n,r]=(0,_.useState)({cameraMakers:[],cameraModels:[],fileTypes:[],agentIds:[]}),[i,a]=(0,_.useState)([]);return(0,_.useEffect)(()=>{fetch(`/api/experiment/filters`).then(e=>e.json()).then(r).catch(console.error)},[]),(0,_.useEffect)(()=>{e===3&&fetch(`/api/agent/status`).then(e=>e.json()).then(e=>{a(e.filter(e=>e.id!==`local`).map(e=>({id:e.id,name:e.name,endpoint:e.endpoint,version:e.version,lastSeen:e.lastSeen,scanStatus:e.scanStatus})))}).catch(console.error)},[e]),(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(is,{}),(0,G.jsx)(An,{theme:Ro.default,children:(0,G.jsxs)(Ni,{style:{width:`90vw`,height:`90vh`,maxWidth:`1200px`,display:`flex`,flexDirection:`column`},children:[(0,G.jsxs)(Mi,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,G.jsx)(`span`,{children:`UltraSonic_Control_Panel.exe`}),(0,G.jsxs)(z,{children:[(0,G.jsx)(`span`,{className:`close-icon`}),`X`]})]}),(0,G.jsxs)(Ai,{style:{flexGrow:1,padding:`0.5rem`,display:`flex`,flexDirection:`column`,minHeight:0,overflow:`hidden`},children:[(0,G.jsxs)(go,{value:e,onChange:e=>t(e),children:[(0,G.jsx)(W,{value:0,children:`Gallery`}),(0,G.jsx)(W,{value:1,children:`Node Config`}),(0,G.jsx)(W,{value:2,children:`Folders`}),(0,G.jsx)(W,{value:3,children:`Logs`}),(0,G.jsx)(W,{value:4,children:`Backup`})]}),(0,G.jsxs)(fo,{style:{flexGrow:1,display:`flex`,flexDirection:`column`,padding:`10px`,minHeight:0,overflow:`hidden`},children:[e===0&&(0,G.jsx)(Xo,{}),e===1&&(0,G.jsx)(Zo,{}),e===2&&(0,G.jsx)(ts,{filterOptions:n}),e===3&&(0,G.jsx)(ns,{agents:i}),e===4&&(0,G.jsx)(rs,{})]})]})]})})]})}(0,v.createRoot)(document.getElementById(`root`)).render((0,G.jsx)(_.StrictMode,{children:(0,G.jsx)(as,{})}));