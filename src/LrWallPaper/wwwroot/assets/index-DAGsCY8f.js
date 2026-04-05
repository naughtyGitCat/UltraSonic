var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function ee(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function te(e,t){return ee(e.type,t,e.props)}function E(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function D(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ne=/\/+/g;function O(e,t){return typeof e==`object`&&e&&e.key!=null?D(``+e.key):t.toString(36)}function k(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function re(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,re(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+O(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ne,`$&/`)+`/`),re(o,r,i,``,function(e){return e})):o!=null&&(E(o)&&(o=te(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+O(a,u),c+=re(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+O(a,u++),c+=re(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return re(k(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ie(e,t,n){if(e==null)return e;var r=[],i=0;return re(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function A(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var j=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},M={map:ie,forEach:function(e,t,n){ie(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ie(e,function(){t++}),t},toArray:function(e){return ie(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=M,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return ee(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ee(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=E,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:A}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,j)}catch(e){j(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.4`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,E());else{var t=n(l);t!==null&&O(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function ee(){return g?!0:!(e.unstable_now()-T<w)}function te(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&ee());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&O(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?E():S=!1}}}var E;if(typeof y==`function`)E=function(){y(te)};else if(typeof MessageChannel<`u`){var D=new MessageChannel,ne=D.port2;D.port1.onmessage=te,E=function(){ne.postMessage(null)}}else E=function(){_(te,0)};function O(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,O(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,E()))),r},e.unstable_shouldYield=ee,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.4`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),ee=Symbol.for(`react.suspense_list`),te=Symbol.for(`react.memo`),E=Symbol.for(`react.lazy`),D=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),O=Symbol.iterator;function k(e){return typeof e!=`object`||!e?null:(e=O&&e[O]||e[`@@iterator`],typeof e==`function`?e:null)}var re=Symbol.for(`react.client.reference`);function ie(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===re?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case ee:return`SuspenseList`;case D:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case te:return t=e.displayName||null,t===null?ie(e.type)||`Memo`:t;case E:t=e._payload,e=e._init;try{return ie(e(t))}catch{}}return null}var A=Array.isArray,j=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,M=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,N={pending:!1,data:null,method:null,action:null},ae=[],P=-1;function oe(e){return{current:e}}function F(e){0>P||(e.current=ae[P],ae[P]=null,P--)}function I(e,t){P++,ae[P]=e.current,e.current=t}var se=oe(null),ce=oe(null),le=oe(null),ue=oe(null);function de(e,t){switch(I(le,t),I(ce,e),I(se,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}F(se),I(se,e)}function fe(){F(se),F(ce),F(le)}function pe(e){e.memoizedState!==null&&I(ue,e);var t=se.current,n=Hd(t,e.type);t!==n&&(I(ce,e),I(se,n))}function L(e){ce.current===e&&(F(se),F(ce)),ue.current===e&&(F(ue),Qf._currentValue=N)}var me,he;function ge(e){if(me===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);me=t&&t[1]||``,he=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+me+e+he}var _e=!1;function ve(e,t){if(!e||_e)return``;_e=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{_e=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?ge(n):``}function ye(e,t){switch(e.tag){case 26:case 27:case 5:return ge(e.type);case 16:return ge(`Lazy`);case 13:return e.child!==t&&t!==null?ge(`Suspense Fallback`):ge(`Suspense`);case 19:return ge(`SuspenseList`);case 0:case 15:return ve(e.type,!1);case 11:return ve(e.type.render,!1);case 1:return ve(e.type,!0);case 31:return ge(`Activity`);default:return``}}function be(e){try{var t=``,n=null;do t+=ye(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var xe=Object.prototype.hasOwnProperty,Se=t.unstable_scheduleCallback,Ce=t.unstable_cancelCallback,we=t.unstable_shouldYield,Te=t.unstable_requestPaint,Ee=t.unstable_now,De=t.unstable_getCurrentPriorityLevel,Oe=t.unstable_ImmediatePriority,ke=t.unstable_UserBlockingPriority,Ae=t.unstable_NormalPriority,je=t.unstable_LowPriority,Me=t.unstable_IdlePriority,Ne=t.log,Pe=t.unstable_setDisableYieldValue,Fe=null,Ie=null;function Le(e){if(typeof Ne==`function`&&Pe(e),Ie&&typeof Ie.setStrictMode==`function`)try{Ie.setStrictMode(Fe,e)}catch{}}var Re=Math.clz32?Math.clz32:Ve,ze=Math.log,Be=Math.LN2;function Ve(e){return e>>>=0,e===0?32:31-(ze(e)/Be|0)|0}var He=256,Ue=262144,We=4194304;function Ge(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ke(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ge(n))):i=Ge(o):i=Ge(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ge(n))):i=Ge(o)):i=Ge(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function qe(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Je(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ye(){var e=We;return We<<=1,!(We&62914560)&&(We=4194304),e}function Xe(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ze(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Qe(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Re(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&$e(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function $e(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Re(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function et(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Re(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function tt(e,t){var n=t&-t;return n=n&42?1:nt(n),(n&(e.suspendedLanes|t))===0?n:0}function nt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function rt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function it(){var e=M.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function at(e,t){var n=M.p;try{return M.p=e,t()}finally{M.p=n}}var ot=Math.random().toString(36).slice(2),st=`__reactFiber$`+ot,ct=`__reactProps$`+ot,lt=`__reactContainer$`+ot,ut=`__reactEvents$`+ot,dt=`__reactListeners$`+ot,ft=`__reactHandles$`+ot,pt=`__reactResources$`+ot,mt=`__reactMarker$`+ot;function ht(e){delete e[st],delete e[ct],delete e[ut],delete e[dt],delete e[ft]}function gt(e){var t=e[st];if(t)return t;for(var n=e.parentNode;n;){if(t=n[lt]||n[st]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[st])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function _t(e){if(e=e[st]||e[lt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function vt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function yt(e){var t=e[pt];return t||=e[pt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function bt(e){e[mt]=!0}var xt=new Set,St={};function Ct(e,t){wt(e,t),wt(e+`Capture`,t)}function wt(e,t){for(St[e]=t,e=0;e<t.length;e++)xt.add(t[e])}var Tt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Et={},Dt={};function Ot(e){return xe.call(Dt,e)?!0:xe.call(Et,e)?!1:Tt.test(e)?Dt[e]=!0:(Et[e]=!0,!1)}function kt(e,t,n){if(Ot(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function At(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function jt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Mt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Nt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Pt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ft(e){if(!e._valueTracker){var t=Nt(e)?`checked`:`value`;e._valueTracker=Pt(e,t,``+e[t])}}function It(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Nt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Lt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Rt=/[\n"\\]/g;function zt(e){return e.replace(Rt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Bt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Mt(t)):e.value!==``+Mt(t)&&(e.value=``+Mt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Ht(e,o,Mt(n)):Ht(e,o,Mt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Mt(s):e.removeAttribute(`name`)}function Vt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Ft(e);return}n=n==null?``:``+Mt(n),t=t==null?n:``+Mt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Ft(e)}function Ht(e,t,n){t===`number`&&Lt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Ut(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Mt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Wt(e,t,n){if(t!=null&&(t=``+Mt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Mt(n)}function Gt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(A(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Mt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Ft(e)}function Kt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var qt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Jt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||qt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Yt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Jt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Jt(e,o,t[o])}function Xt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Zt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Qt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function $t(e){return Qt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function en(){}var tn=null;function nn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var rn=null,an=null;function on(e){var t=_t(e);if(t&&(e=t.stateNode)){var n=e[ct]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Bt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+zt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[ct]||null;if(!a)throw Error(i(90));Bt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&It(r)}break a;case`textarea`:Wt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Ut(e,!!n.multiple,t,!1)}}}var sn=!1;function cn(e,t,n){if(sn)return e(t,n);sn=!0;try{return e(t)}finally{if(sn=!1,(rn!==null||an!==null)&&(bu(),rn&&(t=rn,e=an,an=rn=null,on(t),e)))for(t=0;t<e.length;t++)on(e[t])}}function ln(e,t){var n=e.stateNode;if(n===null)return null;var r=n[ct]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var un=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),dn=!1;if(un)try{var fn={};Object.defineProperty(fn,`passive`,{get:function(){dn=!0}}),window.addEventListener(`test`,fn,fn),window.removeEventListener(`test`,fn,fn)}catch{dn=!1}var pn=null,mn=null,hn=null;function gn(){if(hn)return hn;var e,t=mn,n=t.length,r,i=`value`in pn?pn.value:pn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return hn=i.slice(e,1<r?1-r:void 0)}function _n(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vn(){return!0}function yn(){return!1}function bn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?vn:yn,this.isPropagationStopped=yn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=vn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=vn)},persist:function(){},isPersistent:vn}),t}var xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sn=bn(xn),Cn=h({},xn,{view:0,detail:0}),wn=bn(Cn),Tn,En,Dn,On=h({},Cn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ln,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Dn&&(Dn&&e.type===`mousemove`?(Tn=e.screenX-Dn.screenX,En=e.screenY-Dn.screenY):En=Tn=0,Dn=e),Tn)},movementY:function(e){return`movementY`in e?e.movementY:En}}),kn=bn(On),An=bn(h({},On,{dataTransfer:0})),jn=bn(h({},Cn,{relatedTarget:0})),Mn=bn(h({},xn,{animationName:0,elapsedTime:0,pseudoElement:0})),Nn=bn(h({},xn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),R=bn(h({},xn,{data:0})),Pn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Fn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},z={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function In(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=z[e])?!!t[e]:!1}function Ln(){return In}var Rn=bn(h({},Cn,{key:function(e){if(e.key){var t=Pn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=_n(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Fn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ln,charCode:function(e){return e.type===`keypress`?_n(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?_n(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),zn=bn(h({},On,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Bn=bn(h({},Cn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ln})),Vn=bn(h({},xn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Hn=bn(h({},On,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Un=bn(h({},xn,{newState:0,oldState:0})),Wn=[9,13,27,32],Gn=un&&`CompositionEvent`in window,Kn=null;un&&`documentMode`in document&&(Kn=document.documentMode);var qn=un&&`TextEvent`in window&&!Kn,Jn=un&&(!Gn||Kn&&8<Kn&&11>=Kn),Yn=` `,Xn=!1;function Zn(e,t){switch(e){case`keyup`:return Wn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Qn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var $n=!1;function er(e,t){switch(e){case`compositionend`:return Qn(t);case`keypress`:return t.which===32?(Xn=!0,Yn):null;case`textInput`:return e=t.data,e===Yn&&Xn?null:e;default:return null}}function tr(e,t){if($n)return e===`compositionend`||!Gn&&Zn(e,t)?(e=gn(),hn=mn=pn=null,$n=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Jn&&t.locale!==`ko`?null:t.data;default:return null}}var nr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!nr[e.type]:t===`textarea`}function ir(e,t,n,r){rn?an?an.push(r):an=[r]:rn=r,t=Ed(t,`onChange`),0<t.length&&(n=new Sn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var ar=null,or=null;function sr(e){yd(e,0)}function cr(e){if(It(vt(e)))return e}function lr(e,t){if(e===`change`)return t}var ur=!1;if(un){var dr;if(un){var fr=`oninput`in document;if(!fr){var pr=document.createElement(`div`);pr.setAttribute(`oninput`,`return;`),fr=typeof pr.oninput==`function`}dr=fr}else dr=!1;ur=dr&&(!document.documentMode||9<document.documentMode)}function B(){ar&&(ar.detachEvent(`onpropertychange`,mr),or=ar=null)}function mr(e){if(e.propertyName===`value`&&cr(or)){var t=[];ir(t,or,e,nn(e)),cn(sr,t)}}function hr(e,t,n){e===`focusin`?(B(),ar=t,or=n,ar.attachEvent(`onpropertychange`,mr)):e===`focusout`&&B()}function gr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return cr(or)}function _r(e,t){if(e===`click`)return cr(t)}function vr(e,t){if(e===`input`||e===`change`)return cr(t)}function yr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var br=typeof Object.is==`function`?Object.is:yr;function xr(e,t){if(br(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!xe.call(t,i)||!br(e[i],t[i]))return!1}return!0}function Sr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Cr(e,t){var n=Sr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Sr(n)}}function wr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?wr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Tr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Lt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Lt(e.document)}return t}function Er(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Dr=un&&`documentMode`in document&&11>=document.documentMode,Or=null,kr=null,Ar=null,jr=!1;function Mr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;jr||Or==null||Or!==Lt(r)||(r=Or,`selectionStart`in r&&Er(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ar&&xr(Ar,r)||(Ar=r,r=Ed(kr,`onSelect`),0<r.length&&(t=new Sn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Or)))}function Nr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Pr={animationend:Nr(`Animation`,`AnimationEnd`),animationiteration:Nr(`Animation`,`AnimationIteration`),animationstart:Nr(`Animation`,`AnimationStart`),transitionrun:Nr(`Transition`,`TransitionRun`),transitionstart:Nr(`Transition`,`TransitionStart`),transitioncancel:Nr(`Transition`,`TransitionCancel`),transitionend:Nr(`Transition`,`TransitionEnd`)},Fr={},Ir={};un&&(Ir=document.createElement(`div`).style,`AnimationEvent`in window||(delete Pr.animationend.animation,delete Pr.animationiteration.animation,delete Pr.animationstart.animation),`TransitionEvent`in window||delete Pr.transitionend.transition);function Lr(e){if(Fr[e])return Fr[e];if(!Pr[e])return e;var t=Pr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ir)return Fr[e]=t[n];return e}var Rr=Lr(`animationend`),zr=Lr(`animationiteration`),Br=Lr(`animationstart`),Vr=Lr(`transitionrun`),Hr=Lr(`transitionstart`),Ur=Lr(`transitioncancel`),Wr=Lr(`transitionend`),Gr=new Map,Kr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Kr.push(`scrollEnd`);function qr(e,t){Gr.set(e,t),Ct(t,[e])}var Jr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Yr=[],Xr=0,Zr=0;function Qr(){for(var e=Xr,t=Zr=Xr=0;t<e;){var n=Yr[t];Yr[t++]=null;var r=Yr[t];Yr[t++]=null;var i=Yr[t];Yr[t++]=null;var a=Yr[t];if(Yr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ni(n,i,a)}}function $r(e,t,n,r){Yr[Xr++]=e,Yr[Xr++]=t,Yr[Xr++]=n,Yr[Xr++]=r,Zr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ei(e,t,n,r){return $r(e,t,n,r),ri(e)}function ti(e,t){return $r(e,null,null,t),ri(e)}function ni(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Re(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ri(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ii={};function ai(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function oi(e,t,n,r){return new ai(e,t,n,r)}function si(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ci(e,t){var n=e.alternate;return n===null?(n=oi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function li(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ui(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)si(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,se.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case D:return e=oi(31,n,t,a),e.elementType=D,e.lanes=o,e;case y:return di(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=oi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=oi(13,n,t,a),e.elementType=T,e.lanes=o,e;case ee:return e=oi(19,n,t,a),e.elementType=ee,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case te:s=14;break a;case E:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=oi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function di(e,t,n,r){return e=oi(7,e,r,t),e.lanes=n,e}function fi(e,t,n){return e=oi(6,e,null,t),e.lanes=n,e}function pi(e){var t=oi(18,null,null,0);return t.stateNode=e,t}function mi(e,t,n){return t=oi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var hi=new WeakMap;function gi(e,t){if(typeof e==`object`&&e){var n=hi.get(e);return n===void 0?(t={value:e,source:t,stack:be(t)},hi.set(e,t),t):n}return{value:e,source:t,stack:be(t)}}var _i=[],vi=0,yi=null,bi=0,xi=[],Si=0,Ci=null,wi=1,Ti=``;function Ei(e,t){_i[vi++]=bi,_i[vi++]=yi,yi=e,bi=t}function Di(e,t,n){xi[Si++]=wi,xi[Si++]=Ti,xi[Si++]=Ci,Ci=e;var r=wi;e=Ti;var i=32-Re(r)-1;r&=~(1<<i),n+=1;var a=32-Re(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,wi=1<<32-Re(t)+i|n<<i|r,Ti=a+e}else wi=1<<a|n<<i|r,Ti=e}function Oi(e){e.return!==null&&(Ei(e,1),Di(e,1,0))}function ki(e){for(;e===yi;)yi=_i[--vi],_i[vi]=null,bi=_i[--vi],_i[vi]=null;for(;e===Ci;)Ci=xi[--Si],xi[Si]=null,Ti=xi[--Si],xi[Si]=null,wi=xi[--Si],xi[Si]=null}function Ai(e,t){xi[Si++]=wi,xi[Si++]=Ti,xi[Si++]=Ci,wi=t.id,Ti=t.overflow,Ci=e}var ji=null,Mi=null,V=!1,Ni=null,Pi=!1,Fi=Error(i(519));function Ii(e){throw Hi(gi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Fi}function Li(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[st]=e,t[ct]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Vt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Gt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=en),t=!0):t=!1,t||Ii(e,!0)}function Ri(e){for(ji=e.return;ji;)switch(ji.tag){case 5:case 31:case 13:Pi=!1;return;case 27:case 3:Pi=!0;return;default:ji=ji.return}}function zi(e){if(e!==ji)return!1;if(!V)return Ri(e),V=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&Mi&&Ii(e),Ri(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Mi=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Mi=uf(e)}else t===27?(t=Mi,Zd(e.type)?(e=lf,lf=null,Mi=e):Mi=t):Mi=ji?cf(e.stateNode.nextSibling):null;return!0}function Bi(){Mi=ji=null,V=!1}function Vi(){var e=Ni;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Ni=null),e}function Hi(e){Ni===null?Ni=[e]:Ni.push(e)}var Ui=oe(null),Wi=null,Gi=null;function Ki(e,t,n){I(Ui,t._currentValue),t._currentValue=n}function qi(e){e._currentValue=Ui.current,F(Ui)}function Ji(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Yi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ji(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ji(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Xi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;br(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ue.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Yi(t,e,n,r),t.flags|=262144}function Zi(e){for(e=e.firstContext;e!==null;){if(!br(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Qi(e){Wi=e,Gi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function $i(e){return ta(Wi,e)}function ea(e,t){return Wi===null&&Qi(e),ta(e,t)}function ta(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Gi===null){if(e===null)throw Error(i(308));Gi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Gi=Gi.next=t;return n}var na=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ra=t.unstable_scheduleCallback,ia=t.unstable_NormalPriority,aa={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function oa(){return{controller:new na,data:new Map,refCount:0}}function sa(e){e.refCount--,e.refCount===0&&ra(ia,function(){e.controller.abort()})}var ca=null,la=0,ua=0,da=null;function fa(e,t){if(ca===null){var n=ca=[];la=0,ua=dd(),da={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return la++,t.then(pa,pa),t}function pa(){if(--la===0&&ca!==null){da!==null&&(da.status=`fulfilled`);var e=ca;ca=null,ua=0,da=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ma(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ha=j.S;j.S=function(e,t){eu=Ee(),typeof t==`object`&&t&&typeof t.then==`function`&&fa(e,t),ha!==null&&ha(e,t)};var ga=oe(null);function _a(){var e=ga.current;return e===null?q.pooledCache:e}function va(e,t){t===null?I(ga,ga.current):I(ga,t.pool)}function ya(){var e=_a();return e===null?null:{parent:aa._currentValue,pool:e}}var ba=Error(i(460)),xa=Error(i(474)),Sa=Error(i(542)),Ca={then:function(){}};function wa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ta(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(en,en),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ka(e),e;default:if(typeof t.status==`string`)t.then(en,en);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,ka(e),e}throw Da=t,ba}}function Ea(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Da=e,ba):e}}var Da=null;function Oa(){if(Da===null)throw Error(i(459));var e=Da;return Da=null,e}function ka(e){if(e===ba||e===Sa)throw Error(i(483))}var Aa=null,ja=0;function Ma(e){var t=ja;return ja+=1,Aa===null&&(Aa=[]),Ta(Aa,e,t)}function Na(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Pa(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Fa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=ci(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=fi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===E&&Ea(i)===t.type)?(t=a(t,n.props),Na(t,n),t.return=e,t):(t=ui(n.type,n.key,n.props,null,e.mode,r),Na(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=mi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=di(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=fi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=ui(t.type,t.key,t.props,null,e.mode,n),Na(n,t),n.return=e,n;case v:return t=mi(t,e.mode,n),t.return=e,t;case E:return t=Ea(t),f(e,t,n)}if(A(t)||k(t))return t=di(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ma(t),n);if(t.$$typeof===C)return f(e,ea(e,t),n);Pa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case E:return n=Ea(n),p(e,t,n,r)}if(A(n)||k(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ma(n),r);if(n.$$typeof===C)return p(e,t,ea(e,n),r);Pa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case E:return r=Ea(r),m(e,t,n,r,i)}if(A(r)||k(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ma(r),i);if(r.$$typeof===C)return m(e,t,n,ea(t,r),i);Pa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),V&&Ei(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return V&&Ei(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),V&&Ei(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),V&&Ei(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return V&&Ei(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),V&&Ei(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===E&&Ea(l)===r.type){n(e,r.sibling),c=a(r,o.props),Na(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=di(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=ui(o.type,o.key,o.props,null,e.mode,c),Na(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=mi(o,e.mode,c),c.return=e,e=c}return s(e);case E:return o=Ea(o),b(e,r,o,c)}if(A(o))return h(e,r,o,c);if(k(o)){if(l=k(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ma(o),c);if(o.$$typeof===C)return b(e,r,ea(e,o),c);Pa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=fi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ja=0;var i=b(e,t,n,r);return Aa=null,i}catch(t){if(t===ba||t===Sa)throw t;var a=oi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ia=Fa(!0),La=Fa(!1),Ra=!1;function za(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ba(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Va(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ha(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ri(e),ni(e,null,n),t}return $r(e,r,t,n),ri(e)}function Ua(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,et(e,n)}}function Wa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ga=!1;function Ka(){if(Ga){var e=da;if(e!==null)throw e}}function qa(e,t,n,r){Ga=!1;var i=e.updateQueue;Ra=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===ua&&(Ga=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ra=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Ja(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ya(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ja(n[e],t)}var Xa=oe(null),Za=oe(0);function Qa(e,t){e=Ul,I(Za,e),I(Xa,t),Ul=e|t.baseLanes}function $a(){I(Za,Ul),I(Xa,Xa.current)}function eo(){Ul=Za.current,F(Xa),F(Za)}var H=oe(null),to=null;function no(e){var t=e.alternate;I(so,so.current&1),I(H,e),to===null&&(t===null||Xa.current!==null||t.memoizedState!==null)&&(to=e)}function ro(e){I(so,so.current),I(H,e),to===null&&(to=e)}function io(e){e.tag===22?(I(so,so.current),I(H,e),to===null&&(to=e)):ao(e)}function ao(){I(so,so.current),I(H,H.current)}function oo(e){F(H),to===e&&(to=null),F(so)}var so=oe(0);function co(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var lo=0,U=null,W=null,uo=null,fo=!1,po=!1,mo=!1,ho=0,go=0,_o=null,vo=0;function yo(){throw Error(i(321))}function bo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!br(e[n],t[n]))return!1;return!0}function xo(e,t,n,r,i,a){return lo=a,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,j.H=e===null||e.memoizedState===null?Ls:Rs,mo=!1,a=n(r,i),mo=!1,po&&(a=Co(t,n,r,i)),So(e),a}function So(e){j.H=Is;var t=W!==null&&W.next!==null;if(lo=0,uo=W=U=null,fo=!1,go=0,_o=null,t)throw Error(i(300));e===null||tc||(e=e.dependencies,e!==null&&Zi(e)&&(tc=!0))}function Co(e,t,n,r){U=e;var a=0;do{if(po&&(_o=null),go=0,po=!1,25<=a)throw Error(i(301));if(a+=1,uo=W=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}j.H=zs,o=t(n,r)}while(po);return o}function wo(){var e=j.H,t=e.useState()[0];return t=typeof t.then==`function`?jo(t):t,e=e.useState()[0],(W===null?null:W.memoizedState)!==e&&(U.flags|=1024),t}function To(){var e=ho!==0;return ho=0,e}function Eo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Do(e){if(fo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}fo=!1}lo=0,uo=W=U=null,po=!1,go=ho=0,_o=null}function Oo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return uo===null?U.memoizedState=uo=e:uo=uo.next=e,uo}function ko(){if(W===null){var e=U.alternate;e=e===null?null:e.memoizedState}else e=W.next;var t=uo===null?U.memoizedState:uo.next;if(t!==null)uo=t,W=e;else{if(e===null)throw U.alternate===null?Error(i(467)):Error(i(310));W=e,e={memoizedState:W.memoizedState,baseState:W.baseState,baseQueue:W.baseQueue,queue:W.queue,next:null},uo===null?U.memoizedState=uo=e:uo=uo.next=e}return uo}function Ao(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function jo(e){var t=go;return go+=1,_o===null&&(_o=[]),e=Ta(_o,e,t),t=U,(uo===null?t.memoizedState:uo.next)===null&&(t=t.alternate,j.H=t===null||t.memoizedState===null?Ls:Rs),e}function Mo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return jo(e);if(e.$$typeof===C)return $i(e)}throw Error(i(438,String(e)))}function No(e){var t=null,n=U.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=U.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Ao(),U.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function Po(e,t){return typeof t==`function`?t(e):t}function Fo(e){return Io(ko(),W,e)}function Io(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(lo&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ua&&(d=!0);else if((lo&p)===p){u=u.next,p===ua&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,U.lanes|=p,Gl|=p;f=u.action,mo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,U.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!br(o,e.memoizedState)&&(tc=!0,d&&(n=da,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Lo(e){var t=ko(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);br(o,t.memoizedState)||(tc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ro(e,t,n){var r=U,a=ko(),o=V;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!br((W||a).memoizedState,n);if(s&&(a.memoizedState=n,tc=!0),a=a.queue,cs(Vo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||uo!==null&&uo.memoizedState.tag&1){if(r.flags|=2048,rs(9,{destroy:void 0},Bo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||lo&127||zo(r,t,n)}return n}function zo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t=Ao(),U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Bo(e,t,n,r){t.value=n,t.getSnapshot=r,G(t)&&Ho(e)}function Vo(e,t,n){return n(function(){G(t)&&Ho(e)})}function G(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!br(e,n)}catch{return!0}}function Ho(e){var t=ti(e,2);t!==null&&hu(t,e,2)}function Uo(e){var t=Oo();if(typeof e==`function`){var n=e;if(e=n(),mo){Le(!0);try{n()}finally{Le(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:e},t}function Wo(e,t,n,r){return e.baseState=n,Io(e,W,typeof r==`function`?r:Po)}function Go(e,t,n,r,a){if(Ns(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};j.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ko(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ko(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=j.T,o={};j.T=o;try{var s=n(i,r),c=j.S;c!==null&&c(o,s),qo(e,t,s)}catch(n){Yo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),j.T=a}}else try{a=n(i,r),qo(e,t,a)}catch(n){Yo(e,t,n)}}function qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Jo(e,t,n)},function(n){return Yo(e,t,n)}):Jo(e,t,n)}function Jo(e,t,n){t.status=`fulfilled`,t.value=n,Xo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ko(e,n)))}function Yo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Xo(t),t=t.next;while(t!==r)}e.action=null}function Xo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zo(e,t){return t}function Qo(e,t){if(V){var n=q.formState;if(n!==null){a:{var r=U;if(V){if(Mi){b:{for(var i=Mi,a=Pi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Mi=cf(i.nextSibling),r=i.data===`F!`;break a}}Ii(r)}r=!1}r&&(t=n[0])}}return n=Oo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:t},n.queue=r,n=As.bind(null,U,r),r.dispatch=n,r=Uo(!1),a=Ms.bind(null,U,!1,r.queue),r=Oo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Go.bind(null,U,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function $o(e){return es(ko(),W,e)}function es(e,t,n){if(t=Io(e,t,Zo)[0],e=Fo(Po)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=jo(t)}catch(e){throw e===ba?Sa:e}else r=t;t=ko();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(U.flags|=2048,rs(9,{destroy:void 0},ts.bind(null,i,n),null)),[r,a,e]}function ts(e,t){e.action=t}function ns(e){var t=ko(),n=W;if(n!==null)return es(t,n,e);ko(),t=t.memoizedState,n=ko();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=U.updateQueue,t===null&&(t=Ao(),U.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function is(){return ko().memoizedState}function as(e,t,n,r){var i=Oo();U.flags|=e,i.memoizedState=rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function os(e,t,n,r){var i=ko();r=r===void 0?null:r;var a=i.memoizedState.inst;W!==null&&r!==null&&bo(r,W.memoizedState.deps)?i.memoizedState=rs(t,a,n,r):(U.flags|=e,i.memoizedState=rs(1|t,a,n,r))}function ss(e,t){as(8390656,8,e,t)}function cs(e,t){os(2048,8,e,t)}function ls(e){U.flags|=4;var t=U.updateQueue;if(t===null)t=Ao(),U.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function us(e){var t=ko().memoizedState;return ls({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ds(e,t){return os(4,2,e,t)}function fs(e,t){return os(4,4,e,t)}function ps(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ms(e,t,n){n=n==null?null:n.concat([e]),os(4,4,ps.bind(null,t,e),n)}function hs(){}function gs(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&bo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _s(e,t){var n=ko();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&bo(t,r[1]))return r[0];if(r=e(),mo){Le(!0);try{e()}finally{Le(!1)}}return n.memoizedState=[r,t],r}function vs(e,t,n){return n===void 0||lo&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),U.lanes|=e,Gl|=e,n)}function ys(e,t,n,r){return br(n,t)?n:Xa.current===null?!(lo&42)||lo&1073741824&&!(Y&261930)?(tc=!0,e.memoizedState=n):(e=mu(),U.lanes|=e,Gl|=e,t):(e=vs(e,n,r),br(e,t)||(tc=!0),e)}function bs(e,t,n,r,i){var a=M.p;M.p=a!==0&&8>a?a:8;var o=j.T,s={};j.T=s,Ms(e,!1,t,n);try{var c=i(),l=j.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?js(e,t,ma(c,r),pu(e)):js(e,t,r,pu(e))}catch(n){js(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{M.p=a,o!==null&&s.types!==null&&(o.types=s.types),j.T=o}}function xs(){}function Ss(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Cs(e).queue;bs(e,a,t,N,n===null?xs:function(){return ws(e),n(r)})}function Cs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:N,baseState:N,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:N},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ws(e){var t=Cs(e);t.next===null&&(t=e.alternate.memoizedState),js(e,t.next.queue,{},pu())}function Ts(){return $i(Qf)}function Es(){return ko().memoizedState}function Ds(){return ko().memoizedState}function Os(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Va(n);var r=Ha(t,e,n);r!==null&&(hu(r,t,n),Ua(r,t,n)),t={cache:oa()},e.payload=t;return}t=t.return}}function ks(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ns(e)?Ps(t,n):(n=ei(e,t,n,r),n!==null&&(hu(n,e,r),Fs(n,t,r)))}function As(e,t,n){js(e,t,n,pu())}function js(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ns(e))Ps(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,br(s,o))return $r(e,t,i,0),q===null&&Qr(),!1}catch{}if(n=ei(e,t,i,r),n!==null)return hu(n,e,r),Fs(n,t,r),!0}return!1}function Ms(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ns(e)){if(t)throw Error(i(479))}else t=ei(e,n,r,2),t!==null&&hu(t,e,2)}function Ns(e){var t=e.alternate;return e===U||t!==null&&t===U}function Ps(e,t){po=fo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,et(e,n)}}var Is={readContext:$i,use:Mo,useCallback:yo,useContext:yo,useEffect:yo,useImperativeHandle:yo,useLayoutEffect:yo,useInsertionEffect:yo,useMemo:yo,useReducer:yo,useRef:yo,useState:yo,useDebugValue:yo,useDeferredValue:yo,useTransition:yo,useSyncExternalStore:yo,useId:yo,useHostTransitionStatus:yo,useFormState:yo,useActionState:yo,useOptimistic:yo,useMemoCache:yo,useCacheRefresh:yo};Is.useEffectEvent=yo;var Ls={readContext:$i,use:Mo,useCallback:function(e,t){return Oo().memoizedState=[e,t===void 0?null:t],e},useContext:$i,useEffect:ss,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),as(4194308,4,ps.bind(null,t,e),n)},useLayoutEffect:function(e,t){return as(4194308,4,e,t)},useInsertionEffect:function(e,t){as(4,2,e,t)},useMemo:function(e,t){var n=Oo();t=t===void 0?null:t;var r=e();if(mo){Le(!0);try{e()}finally{Le(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Oo();if(n!==void 0){var i=n(t);if(mo){Le(!0);try{n(t)}finally{Le(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ks.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=Oo();return e={current:e},t.memoizedState=e},useState:function(e){e=Uo(e);var t=e.queue,n=As.bind(null,U,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:hs,useDeferredValue:function(e,t){return vs(Oo(),e,t)},useTransition:function(){var e=Uo(!1);return e=bs.bind(null,U,e.queue,!0,!1),Oo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=U,a=Oo();if(V){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||zo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ss(Vo.bind(null,r,o,e),[e]),r.flags|=2048,rs(9,{destroy:void 0},Bo.bind(null,r,o,n,t),null),n},useId:function(){var e=Oo(),t=q.identifierPrefix;if(V){var n=Ti,r=wi;n=(r&~(1<<32-Re(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=ho++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=vo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ts,useFormState:Qo,useActionState:Qo,useOptimistic:function(e){var t=Oo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ms.bind(null,U,!0,n),n.dispatch=t,[e,t]},useMemoCache:No,useCacheRefresh:function(){return Oo().memoizedState=Os.bind(null,U)},useEffectEvent:function(e){var t=Oo(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Rs={readContext:$i,use:Mo,useCallback:gs,useContext:$i,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Fo,useRef:is,useState:function(){return Fo(Po)},useDebugValue:hs,useDeferredValue:function(e,t){return ys(ko(),W.memoizedState,e,t)},useTransition:function(){var e=Fo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Es,useHostTransitionStatus:Ts,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){return Wo(ko(),W,e,t)},useMemoCache:No,useCacheRefresh:Ds};Rs.useEffectEvent=us;var zs={readContext:$i,use:Mo,useCallback:gs,useContext:$i,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Lo,useRef:is,useState:function(){return Lo(Po)},useDebugValue:hs,useDeferredValue:function(e,t){var n=ko();return W===null?vs(n,e,t):ys(n,W.memoizedState,e,t)},useTransition:function(){var e=Lo(Po)[0],t=ko().memoizedState;return[typeof e==`boolean`?e:jo(e),t]},useSyncExternalStore:Ro,useId:Es,useHostTransitionStatus:Ts,useFormState:ns,useActionState:ns,useOptimistic:function(e,t){var n=ko();return W===null?(n.baseState=e,[e,n.queue.dispatch]):Wo(n,W,e,t)},useMemoCache:No,useCacheRefresh:Ds};zs.useEffectEvent=us;function Bs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Va(r);i.payload=t,n!=null&&(i.callback=n),t=Ha(e,i,r),t!==null&&(hu(t,e,r),Ua(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Va(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ha(e,i,r),t!==null&&(hu(t,e,r),Ua(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Va(n);r.tag=2,t!=null&&(r.callback=t),t=Ha(e,r,n),t!==null&&(hu(t,e,n),Ua(t,e,n))}};function Hs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!xr(n,r)||!xr(i,a):!0}function Us(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vs.enqueueReplaceState(t,t.state,null)}function Ws(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Gs(e){Jr(e)}function Ks(e){console.error(e)}function qs(e){Jr(e)}function Js(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ys(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Xs(e,t,n){return n=Va(n),n.tag=3,n.payload={element:null},n.callback=function(){Js(e,t)},n}function Zs(e){return e=Va(e),e.tag=3,e}function Qs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ys(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ys(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function $s(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Xi(t,n,a,!0),n=H.current,n!==null){switch(n.tag){case 31:case 13:return to===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ca?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Ca?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(V)return t=H.current,t===null?(r!==Fi&&(t=Error(i(423),{cause:r}),Hi(gi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=gi(r,n),a=Xs(e.stateNode,r,a),Wa(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Fi&&(e=Error(i(422),{cause:r}),Hi(gi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=gi(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=gi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Xs(n.stateNode,r,e),Wa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Zs(a),Qs(a,e,n,r),Wa(n,a),!1}n=n.return}while(n!==null);return!1}var ec=Error(i(461)),tc=!1;function nc(e,t,n,r){t.child=e===null?La(t,null,n,r):Ia(t,e.child,n,r)}function rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Qi(t),r=xo(e,t,n,o,a,i),s=To(),e!==null&&!tc?(Eo(e,t,i),Dc(e,t,i)):(V&&s&&Oi(t),t.flags|=1,nc(e,t,r,i),t.child)}function ic(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!si(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ac(e,t,a,r,i)):(e=ui(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Oc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?xr:n,n(o,r)&&e.ref===t.ref)return Dc(e,t,i)}return t.flags|=1,e=ci(a,r),e.ref=t.ref,e.return=t,t.child=e}function ac(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(xr(a,r)&&e.ref===t.ref)if(tc=!1,t.pendingProps=r=a,Oc(e,i))e.flags&131072&&(tc=!0);else return t.lanes=e.lanes,Dc(e,t,i)}return pc(e,t,n,r,i)}function oc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return cc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&va(t,a===null?null:a.cachePool),a===null?$a():Qa(t,a),io(t);else return r=t.lanes=536870912,cc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&va(t,null),$a(),ao(t)):(va(t,a.cachePool),Qa(t,a),ao(t),t.memoizedState=null);return nc(e,t,i,n),t.child}function sc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function cc(e,t,n,r,i){var a=_a();return a=a===null?null:{parent:aa._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&va(t,null),$a(),io(t),e!==null&&Xi(e,t,r,!0),t.childLanes=i,null}function lc(e,t){return t=Sc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function uc(e,t,n){return Ia(t,e.child,null,n),e=lc(t,t.pendingProps),e.flags|=2,oo(t),t.memoizedState=null,e}function dc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(V){if(r.mode===`hidden`)return e=lc(t,r),t.lanes=536870912,sc(null,e);if(ro(t),(e=Mi)?(e=rf(e,Pi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ci===null?null:{id:wi,overflow:Ti},retryLane:536870912,hydrationErrors:null},n=pi(e),n.return=t,t.child=n,ji=t,Mi=null)):e=null,e===null)throw Ii(t);return t.lanes=536870912,null}return lc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(ro(t),a)if(t.flags&256)t.flags&=-257,t=uc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(tc||Xi(e,t,n,!1),a=(n&e.childLanes)!==0,tc||a){if(r=q,r!==null&&(s=tt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ti(e,s),hu(r,e,s),ec;Du(),t=uc(e,t,n)}else e=o.treeContext,Mi=cf(s.nextSibling),ji=t,V=!0,Ni=null,Pi=!1,e!==null&&Ai(t,e),t=lc(t,r),t.flags|=4096;return t}return e=ci(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function fc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function pc(e,t,n,r,i){return Qi(t),n=xo(e,t,n,r,void 0,i),r=To(),e!==null&&!tc?(Eo(e,t,i),Dc(e,t,i)):(V&&r&&Oi(t),t.flags|=1,nc(e,t,n,i),t.child)}function mc(e,t,n,r,i,a){return Qi(t),t.updateQueue=null,n=Co(t,r,n,i),So(e),r=To(),e!==null&&!tc?(Eo(e,t,a),Dc(e,t,a)):(V&&r&&Oi(t),t.flags|=1,nc(e,t,n,a),t.child)}function hc(e,t,n,r,i){if(Qi(t),t.stateNode===null){var a=ii,o=n.contextType;typeof o==`object`&&o&&(a=$i(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Vs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},za(t),o=n.contextType,a.context=typeof o==`object`&&o?$i(o):ii,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Bs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Vs.enqueueReplaceState(a,a.state,null),qa(t,r,a,i),Ka(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ws(n,s);a.props=c;var l=a.context,u=n.contextType;o=ii,typeof u==`object`&&u&&(o=$i(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Us(t,a,r,o),Ra=!1;var f=t.memoizedState;a.state=f,qa(t,r,a,i),Ka(),l=t.memoizedState,s||f!==l||Ra?(typeof d==`function`&&(Bs(t,n,d,r),l=t.memoizedState),(c=Ra||Hs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ba(e,t),o=t.memoizedProps,u=Ws(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ii,typeof l==`object`&&l&&(c=$i(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Us(t,a,r,c),Ra=!1,f=t.memoizedState,a.state=f,qa(t,r,a,i),Ka();var p=t.memoizedState;o!==d||f!==p||Ra||e!==null&&e.dependencies!==null&&Zi(e.dependencies)?(typeof s==`function`&&(Bs(t,n,s,r),p=t.memoizedState),(u=Ra||Hs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Zi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,fc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ia(t,e.child,null,i),t.child=Ia(t,null,n,i)):nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Dc(e,t,i),e}function gc(e,t,n,r){return Bi(),t.flags|=256,nc(e,t,n,r),t.child}var _c={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vc(e){return{baseLanes:e,cachePool:ya()}}function yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function bc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(so.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(V){if(a?no(t):ao(t),(e=Mi)?(e=rf(e,Pi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Ci===null?null:{id:wi,overflow:Ti},retryLane:536870912,hydrationErrors:null},n=pi(e),n.return=t,t.child=n,ji=t,Mi=null)):e=null,e===null)throw Ii(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(ao(t),a=t.mode,c=Sc({mode:`hidden`,children:c},a),r=di(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(null,r)):(no(t),xc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(no(t),t.flags&=-257,t=Cc(e,t,n)):t.memoizedState===null?(ao(t),c=r.fallback,a=t.mode,r=Sc({mode:`visible`,children:r.children},a),c=di(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ia(t,e.child,null,n),r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,t=sc(null,r)):(ao(t),t.child=e.child,t.flags|=128,t=null);else if(no(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Hi({value:r,source:null,stack:null}),t=Cc(e,t,n)}else if(tc||Xi(e,t,n,!1),s=(n&e.childLanes)!==0,tc||s){if(s=q,s!==null&&(r=tt(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ti(e,r),hu(s,e,r),ec;af(c)||Du(),t=Cc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Mi=cf(c.nextSibling),ji=t,V=!0,Ni=null,Pi=!1,e!==null&&Ai(t,e),t=xc(t,r.children),t.flags|=4096);return t}return a?(ao(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=ci(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=di(c,a,n,null),c.flags|=2):c=ci(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,sc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=vc(n):(a=c.cachePool,a===null?a=ya():(l=aa._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(e.child,r)):(no(t),n=e.child,e=n.sibling,n=ci(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function xc(e,t){return t=Sc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Sc(e,t){return e=oi(22,e,null,t),e.lanes=0,e}function Cc(e,t,n){return Ia(t,e.child,null,n),e=xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ji(e.return,t,n)}function Tc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ec(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=so.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,I(so,o),nc(e,t,r,n),r=V?bi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wc(e,n,t);else if(e.tag===19)wc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&co(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Tc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&co(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Tc(t,!0,n,null,a,r);break;case`together`:Tc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Dc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Xi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=ci(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ci(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Zi(e))):!0}function kc(e,t,n){switch(t.tag){case 3:de(t,t.stateNode.containerInfo),Ki(t,aa,e.memoizedState.cache),Bi();break;case 27:case 5:pe(t);break;case 4:de(t,t.stateNode.containerInfo);break;case 10:Ki(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,ro(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(no(t),e=Dc(e,t,n),e===null?null:e.sibling):bc(e,t,n):(no(t),t.flags|=128,null);no(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Xi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ec(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),I(so,so.current),r)break;return null;case 22:return t.lanes=0,oc(e,t,n,t.pendingProps);case 24:Ki(t,aa,e.memoizedState.cache)}return Dc(e,t,n)}function Ac(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)tc=!0;else{if(!Oc(e,n)&&!(t.flags&128))return tc=!1,kc(e,t,n);tc=!!(e.flags&131072)}else tc=!1,V&&t.flags&1048576&&Di(t,bi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Ea(t.elementType),t.type=e,typeof e==`function`)si(e)?(r=Ws(e,r),t.tag=1,t=hc(null,t,e,r,n)):(t.tag=0,t=pc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=rc(null,t,e,r,n);break a}else if(a===te){t.tag=14,t=ic(null,t,e,r,n);break a}}throw t=ie(e)||e,Error(i(306,t,``))}}return t;case 0:return pc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ws(r,t.pendingProps),hc(e,t,r,a,n);case 3:a:{if(de(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ba(e,t),qa(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ki(t,aa,r),r!==o.cache&&Yi(t,[aa],n,!0),Ka(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=gc(e,t,r,n);break a}else if(r!==a){a=gi(Error(i(424)),t),Hi(a),t=gc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Mi=cf(e.firstChild),ji=t,V=!0,Ni=null,Pi=!0,n=La(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Bi(),r===a){t=Dc(e,t,n);break a}nc(e,t,r,n)}t=t.child}return t;case 26:return fc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:V||(n=t.type,e=t.pendingProps,r=Bd(le.current).createElement(n),r[st]=t,r[ct]=e,Pd(r,n,e),bt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return pe(t),e===null&&V&&(r=t.stateNode=ff(t.type,t.pendingProps,le.current),ji=t,Pi=!0,a=Mi,Zd(t.type)?(lf=a,Mi=cf(r.firstChild)):Mi=a),nc(e,t,t.pendingProps.children,n),fc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&V&&((a=r=Mi)&&(r=tf(r,t.type,t.pendingProps,Pi),r===null?a=!1:(t.stateNode=r,ji=t,Mi=cf(r.firstChild),Pi=!1,a=!0)),a||Ii(t)),pe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=xo(e,t,wo,null,null,n),Qf._currentValue=a),fc(e,t),nc(e,t,r,n),t.child;case 6:return e===null&&V&&((e=n=Mi)&&(n=nf(n,t.pendingProps,Pi),n===null?e=!1:(t.stateNode=n,ji=t,Mi=null,e=!0)),e||Ii(t)),null;case 13:return bc(e,t,n);case 4:return de(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ia(t,null,r,n):nc(e,t,r,n),t.child;case 11:return rc(e,t,t.type,t.pendingProps,n);case 7:return nc(e,t,t.pendingProps,n),t.child;case 8:return nc(e,t,t.pendingProps.children,n),t.child;case 12:return nc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ki(t,t.type,r.value),nc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Qi(t),a=$i(a),r=r(a),t.flags|=1,nc(e,t,r,n),t.child;case 14:return ic(e,t,t.type,t.pendingProps,n);case 15:return ac(e,t,t.type,t.pendingProps,n);case 19:return Ec(e,t,n);case 31:return dc(e,t,n);case 22:return oc(e,t,n,t.pendingProps);case 24:return Qi(t),r=$i(aa),e===null?(a=_a(),a===null&&(a=q,o=oa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},za(t),Ki(t,aa,a)):((e.lanes&n)!==0&&(Ba(e,t),qa(t,null,null,n),Ka()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ki(t,aa,r),r!==a.cache&&Yi(t,[aa],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ki(t,aa,r))),nc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function jc(e){e.flags|=4}function Mc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Da=Ca,xa}else e.flags&=-16777217}function Nc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Da=Ca,xa}function Pc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Ye(),e.lanes|=t,Yl|=t)}function Fc(e,t){if(!V)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ic(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lc(e,t,n){var r=t.pendingProps;switch(ki(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ic(t),null;case 1:return Ic(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),qi(aa),fe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(zi(t)?jc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Vi())),Ic(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(jc(t),o===null?(Ic(t),Mc(t,a,null,r,n)):(Ic(t),Nc(t,o))):o?o===e.memoizedState?(Ic(t),t.flags&=-16777217):(jc(t),Ic(t),Nc(t,o)):(e=e.memoizedProps,e!==r&&jc(t),Ic(t),Mc(t,a,e,r,n)),null;case 27:if(L(t),n=le.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}e=se.current,zi(t)?Li(t,e):(e=ff(a,r,n),t.stateNode=e,jc(t))}return Ic(t),null;case 5:if(L(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}if(o=se.current,zi(t))Li(t,o);else{var s=Bd(le.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[st]=t,o[ct]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&jc(t)}}return Ic(t),Mc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=le.current,zi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ji,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[st]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Ii(t,!0)}else e=Bd(e).createTextNode(r),e[st]=t,t.stateNode=e}return Ic(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=zi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[st]=t}else Bi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),e=!1}else n=Vi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(oo(t),t):(oo(t),null);if(t.flags&128)throw Error(i(558))}return Ic(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=zi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[st]=t}else Bi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),a=!1}else a=Vi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(oo(t),t):(oo(t),null)}return oo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Pc(t,t.updateQueue),Ic(t),null);case 4:return fe(),e===null&&Sd(t.stateNode.containerInfo),Ic(t),null;case 10:return qi(t.type),Ic(t),null;case 19:if(F(so),r=t.memoizedState,r===null)return Ic(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Fc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=co(e),o!==null){for(t.flags|=128,Fc(r,!1),e=o.updateQueue,t.updateQueue=e,Pc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)li(n,e),n=n.sibling;return I(so,so.current&1|2),V&&Ei(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ee()>tu&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304)}else{if(!a)if(e=co(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Pc(t,e),Fc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!V)return Ic(t),null}else 2*Ee()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Ic(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ee(),e.sibling=null,n=so.current,I(so,a?n&1|2:n&1),V&&Ei(t,r.treeForkCount),e);case 22:case 23:return oo(t),eo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Ic(t),t.subtreeFlags&6&&(t.flags|=8192)):Ic(t),n=t.updateQueue,n!==null&&Pc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&F(ga),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),qi(aa),Ic(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Rc(e,t){switch(ki(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return qi(aa),fe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return L(t),null;case 31:if(t.memoizedState!==null){if(oo(t),t.alternate===null)throw Error(i(340));Bi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(oo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Bi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return F(so),null;case 4:return fe(),null;case 10:return qi(t.type),null;case 22:case 23:return oo(t),eo(),e!==null&&F(ga),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return qi(aa),null;case 25:return null;default:return null}}function zc(e,t){switch(ki(t),t.tag){case 3:qi(aa),fe();break;case 26:case 27:case 5:L(t);break;case 4:fe();break;case 31:t.memoizedState!==null&&oo(t);break;case 13:oo(t);break;case 19:F(so);break;case 10:qi(t.type);break;case 22:case 23:oo(t),eo(),e!==null&&F(ga);break;case 24:qi(aa)}}function Bc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Vc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Hc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ya(t,n)}catch(t){Z(e,e.return,t)}}}function Uc(e,t,n){n.props=Ws(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Wc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Gc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Kc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[ct]=t}catch(t){Z(e,e.return,t)}}function Jc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Yc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=en));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Xc(e,t,n),e=e.sibling;e!==null;)Xc(e,t,n),e=e.sibling}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[st]=e,t[ct]=n}catch(t){Z(e,e.return,t)}}var $c=!1,el=!1,tl=!1,nl=typeof WeakSet==`function`?WeakSet:Set,rl=null;function il(e,t){if(e=e.containerInfo,Rd=sp,e=Tr(e),Er(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,rl=t;rl!==null;)if(t=rl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,rl=e;else for(;rl!==null;){switch(t=rl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ws(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,rl=e;break}rl=t.return}}function al(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Bc(5,n);break;case 1:if(bl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ws(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Hc(n),r&512&&Wc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ya(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Qc(n);case 26:case 5:bl(e,n),t===null&&r&4&&Kc(n),r&512&&Wc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||$c,!r){t=t!==null&&t.memoizedState!==null||el,i=$c;var a=el;$c=r,(el=t)&&!a?Sl(e,n,(n.subtreeFlags&8772)!=0):bl(e,n),$c=i,el=a}break;case 30:break;default:bl(e,n)}}function ol(e){var t=e.alternate;t!==null&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ht(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var sl=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(Ie&&typeof Ie.onCommitFiberUnmount==`function`)try{Ie.onCommitFiberUnmount(Fe,n)}catch{}switch(n.tag){case 26:el||Gc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:el||Gc(n,t);var r=sl,i=cl;Zd(n.type)&&(sl=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),sl=r,cl=i;break;case 5:el||Gc(n,t);case 6:if(r=sl,i=cl,sl=null,ll(e,t,n),sl=r,cl=i,sl!==null)if(cl)try{(sl.nodeType===9?sl.body:sl.nodeName===`HTML`?sl.ownerDocument.body:sl).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{sl.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:sl!==null&&(cl?(e=sl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(sl,n.stateNode));break;case 4:r=sl,i=cl,sl=n.stateNode.containerInfo,cl=!0,ll(e,t,n),sl=r,cl=i;break;case 0:case 11:case 14:case 15:Vc(2,n,t),el||Vc(4,n,t),ll(e,t,n);break;case 1:el||(Gc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Uc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:el=(r=el)||n.memoizedState!==null,ll(e,t,n),el=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new nl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new nl),t;default:throw Error(i(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){sl=c.stateNode,cl=!1;break a}break;case 5:sl=c.stateNode,cl=!1;break a;case 3:case 4:sl=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(sl===null)throw Error(i(160));ul(o,s,a),sl=null,cl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Vc(3,e,e.return),Bc(3,e),Vc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&64&&$c&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=gl;if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[mt]||o[st]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[st]=e,bt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[st]=e,bt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&qc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),n!==null&&r&4&&qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),e.flags&32){a=e.stateNode;try{Kt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,qc(e,a,n===null?a:n.memoizedProps)),r&1024&&(tl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=gl,gl=gf(t.containerInfo),hl(t,e),gl=a,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}tl&&(tl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Ee()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=$c,d=el;if($c=u||a,el=d||l,hl(t,e),el=d,$c=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||$c||el||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Jc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Zc(e,Yc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Kt(o,``),n.flags&=-33),Zc(e,Yc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Xc(e,Yc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)al(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Vc(4,t,t.return),xl(t);break;case 1:Gc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Uc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Gc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Bc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ja(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Hc(a),Wc(a,a.return);break;case 27:Qc(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&Kc(a),Wc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Wc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&sa(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&sa(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Bc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&sa(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Bc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Vc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Vc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;rl!==null;){var n=rl;switch(n.tag){case 0:case 11:case 15:Vc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:sa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,rl=r;else a:for(n=e;rl!==null;){r=rl;var i=r.sibling,a=r.return;if(ol(r),r===n){rl=null;break a}if(i!==null){i.return=a,rl=i;break a}rl=a}}}var Ll={getCacheForType:function(e){var t=$i(aa),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return $i(aa).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:j.T===null?it():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||V){var e=Ue;Ue<<=1,!(Ue&3932160)&&(Ue=262144),Jl=e}else Jl=536870912;return e=H.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),Ze(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||qe(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Ee(),10<a)){if(yu(r,t,Jl,!Bl),Ke(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:en},jl(t,a,d);var m=(a&62914560)===a?$l-Ee():(a&4194048)===a?eu-Ee():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!br(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Re(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&$e(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,Gi=Wi=null,Do(e),Aa=null,ja=0,e=J;for(;e!==null;)zc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=ci(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=qe(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Re(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,Qr(),n}function Cu(e,t){U=null,j.H=Is,t===ba||t===Sa?(t=Oa(),X=3):t===xa?(t=Oa(),X=4):X=t===ec?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Js(e,gi(t,e.current)))}function wu(){var e=H.current;return e===null?!0:(Y&4194048)===Y?to===null:(Y&62914560)===Y||Y&536870912?e===to:!1}function Tu(){var e=j.H;return j.H=Is,e===null?Is:e}function Eu(){var e=j.A;return j.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&H.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:H.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,Gi=Wi=null,K=r,j.H=i,j.A=a,J===null&&(q=null,Y=0,Qr()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=Ee()+500,Su(e,t)):Vl=qe(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(wa(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:wa(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return Gi=Wi=null,j.H=r,j.A=a,K=n,J===null?(q=null,Y=0,Qr(),Wl):0}function ju(){for(;J!==null&&!we();)Mu(J)}function Mu(e){var t=Ac(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=mc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=mc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Do(t);default:zc(n,t),t=J=li(t,Ul),t=Ac(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){Gi=Wi=null,Do(t),Aa=null,ja=0;var i=t.return;try{if($s(e,i,t,n,Y)){Wl=1,Js(e,gi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Js(e,gi(n,e.current)),J=null;return}t.flags&32768?(V||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=H.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Lc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Rc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Zr,Qe(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(Ae,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=j.T,j.T=null,a=M.p,M.p=2,s=K,K|=4;try{il(e,t,n)}finally{K=s,M.p=a,j.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=j.T,j.T=null;var r=M.p;M.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=Tr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&wr(s.ownerDocument.documentElement,s)){if(c!==null&&Er(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Cr(s,h),v=Cr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,M.p=r,j.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=j.T,j.T=null;var r=M.p;M.p=2;var i=K;K|=4;try{al(e,t.alternate,t)}finally{K=i,M.p=r,j.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Te();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),rt(n),t=t.stateNode,Ie&&typeof Ie.onCommitFiberRoot==`function`)try{Ie.onCommitFiberRoot(Fe,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=j.T,i=M.p,M.p=2,j.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{j.T=t,M.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,sa(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=rt(su),r=j.T,a=M.p;try{M.p=32>n?32:n,j.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),Ie&&typeof Ie.onPostCommitFiberRoot==`function`)try{Ie.onPostCommitFiberRoot(Fe,o)}catch{}return!0}finally{M.p=a,j.T=r,Vu(e,t)}}function Wu(e,t,n){t=gi(n,t),t=Xs(e.stateNode,t,2),e=Ha(e,t,2),e!==null&&(Ze(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=gi(n,e),n=Zs(2),r=Ha(t,n,2),r!==null&&(Qs(n,r,t,e),Ze(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>Ee()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=Ye()),e=ti(e,t),e!==null&&(Ze(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return Se(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Re(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=Ke(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||qe(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Ee(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Re(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Je(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Ke(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ce(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||qe(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ce(r),rt(n)){case 2:case 8:n=ke;break;case 32:n=Ae;break;case 268435456:n=Me;break;default:n=Ae}return r=cd.bind(null,e),n=Se(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ce(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=Ke(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Ee()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?Se(Oe,ad):od()})}function dd(){if(nd===0){var e=ua;e===0&&(e=He,He<<=1,!(He&261888)&&(He=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:$t(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[ct]||null).action),o=r.submitter;o&&(t=(t=o[ct]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Sn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ss(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ss(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<Kr.length;hd++){var gd=Kr[hd];qr(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}qr(Rr,`onAnimationEnd`),qr(zr,`onAnimationIteration`),qr(Br,`onAnimationStart`),qr(`dblclick`,`onDoubleClick`),qr(`focusin`,`onFocus`),qr(`focusout`,`onBlur`),qr(Vr,`onTransitionRun`),qr(Hr,`onTransitionStart`),qr(Ur,`onTransitionCancel`),qr(Wr,`onTransitionEnd`),wt(`onMouseEnter`,[`mouseout`,`mouseover`]),wt(`onMouseLeave`,[`mouseout`,`mouseover`]),wt(`onPointerEnter`,[`pointerout`,`pointerover`]),wt(`onPointerLeave`,[`pointerout`,`pointerover`]),Ct(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Ct(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Ct(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Ct(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Ct(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Ct(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Jr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Jr(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[ut];n===void 0&&(n=t[ut]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,xt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!dn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=gt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}cn(function(){var r=a,i=nn(n),s=[];a:{var c=Gr.get(e);if(c!==void 0){var l=Sn,u=e;switch(e){case`keypress`:if(_n(n)===0)break a;case`keydown`:case`keyup`:l=Rn;break;case`focusin`:u=`focus`,l=jn;break;case`focusout`:u=`blur`,l=jn;break;case`beforeblur`:case`afterblur`:l=jn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=kn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=An;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Bn;break;case Rr:case zr:case Br:l=Mn;break;case Wr:l=Vn;break;case`scroll`:case`scrollend`:l=wn;break;case`wheel`:l=Hn;break;case`copy`:case`cut`:case`paste`:l=Nn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=zn;break;case`toggle`:case`beforetoggle`:l=Un}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=ln(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==tn&&(u=n.relatedTarget||n.fromElement)&&(gt(u)||u[lt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?gt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=kn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=zn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:vt(l),h=u==null?c:vt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,gt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?vt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=lr;else if(rr(c))if(ur)v=vr;else{v=gr;var y=hr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Xt(r.elementType)&&(v=lr):v=_r;if(v&&=v(e,r)){ir(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Ht(c,`number`,c.value)}switch(y=r?vt(r):window,e){case`focusin`:(rr(y)||y.contentEditable===`true`)&&(Or=y,kr=r,Ar=null);break;case`focusout`:Ar=kr=Or=null;break;case`mousedown`:jr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:jr=!1,Mr(s,n,i);break;case`selectionchange`:if(Dr)break;case`keydown`:case`keyup`:Mr(s,n,i)}var b;if(Gn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else $n?Zn(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Jn&&n.locale!==`ko`&&($n||x!==`onCompositionStart`?x===`onCompositionEnd`&&$n&&(b=gn()):(pn=i,mn=`value`in pn?pn.value:pn.textContent,$n=!0)),y=Ed(r,x),0<y.length&&(x=new R(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Qn(n),b!==null&&(x.data=b)))),(b=qn?er(e,n):tr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new R(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=ln(e,n),i!=null&&r.unshift(Td(e,i,a)),i=ln(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=ln(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=ln(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Kt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Kt(e,``+r);break;case`className`:At(e,`class`,r);break;case`tabIndex`:At(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:At(e,n,r);break;case`style`:Yt(e,r,o);break;case`data`:if(t!==`object`){At(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=$t(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=$t(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=en);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=$t(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),kt(e,`popover`,r);break;case`xlinkActuate`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:kt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Zt.get(n)||n,kt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Yt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Kt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Kt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=en);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!St.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[ct]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):kt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Vt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Ut(e,!!r,n,!0):Ut(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Gt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(Xt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Bt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Ut(e,!!n,n?[]:``,!1):Ut(e,!!n,t,!0)):Ut(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Wt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Xt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[mt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),ht(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[mt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ht(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=M.d;M.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=_t(e);t!==null&&t.tag===5&&t.type===`form`?ws(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=zt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),bt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+zt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+zt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+zt(n.imageSizes)+`"]`)):i+=`[href="`+zt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),bt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+zt(r)+`"][href="`+zt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),bt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=yt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);bt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=yt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),bt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=yt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),bt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=le.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=yt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=yt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=yt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+zt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),bt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+zt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+zt(n.href)+`"]`);if(r)return t.instance=r,bt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),bt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,bt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),bt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,bt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),bt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[mt]||a[st]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,bt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),bt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:N,_currentValue2:N,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Xe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xe(0),this.hiddenUpdates=Xe(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=oi(3,null,null,t),e.current=a,a.stateNode=e,t=oa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},za(a),e}function tp(e){return e?(e=ii,e):ii}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Va(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ha(e,r,t),n!==null&&(hu(n,e,t),Ua(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ti(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=nt(t);var n=ti(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=2,up(e,t,n,r)}finally{M.p=a,j.T=i}}function lp(e,t,n,r){var i=j.T;j.T=null;var a=M.p;try{M.p=8,up(e,t,n,r)}finally{M.p=a,j.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=_t(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ge(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Re(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=Ee()+500,id(0,!1))}}break;case 31:case 13:s=ti(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=nn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=gt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(De()){case Oe:return 2;case ke:return 8;case Ae:case je:return 32;case Me:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=_t(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=gt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,at(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,at(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);tn=r,n.target.dispatchEvent(r),tn=null}else return t=_t(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=_t(n);a!==null&&(e.splice(t,3),t-=3,Ss(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[ct]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[ct]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[lt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=it();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.4`)throw Error(i(527,Lp,`19.2.4`));M.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.4`,rendererPackageName:`react-dom`,currentDispatcherRef:j,reconcilerVersion:`19.2.4`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Fe=zp.inject(Rp),Ie=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Gs,s=Ks,c=qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[lt]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u()),v=g(),y=function(){return y=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},y.apply(this,arguments)};function b(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var x={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},S=`-ms-`,C=`-moz-`,w=`-webkit-`,T=`comm`,ee=`rule`,te=`decl`,E=`@import`,D=`@namespace`,ne=`@keyframes`,O=`@layer`,k=Math.abs,re=String.fromCharCode,ie=Object.assign;function A(e,t){return P(e,0)^45?(((t<<2^P(e,0))<<2^P(e,1))<<2^P(e,2))<<2^P(e,3):0}function j(e){return e.trim()}function M(e,t){return(e=t.exec(e))?e[0]:e}function N(e,t,n){return e.replace(t,n)}function ae(e,t,n){return e.indexOf(t,n)}function P(e,t){return e.charCodeAt(t)|0}function oe(e,t,n){return e.slice(t,n)}function F(e){return e.length}function I(e){return e.length}function se(e,t){return t.push(e),e}function ce(e,t){return e.map(t).join(``)}function le(e,t){return e.filter(function(e){return!M(e,t)})}var ue=1,de=1,fe=0,pe=0,L=0,me=``;function he(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:ue,column:de,length:o,return:``,siblings:s}}function ge(e,t){return ie(he(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function _e(e){for(;e.root;)e=ge(e.root,{children:[e]});se(e,e.siblings)}function ve(){return L}function ye(){return L=pe>0?P(me,--pe):0,de--,L===10&&(de=1,ue--),L}function be(){return L=pe<fe?P(me,pe++):0,de++,L===10&&(de=1,ue++),L}function xe(){return P(me,pe)}function Se(){return pe}function Ce(e,t){return oe(me,e,t)}function we(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Te(e){return ue=de=1,fe=F(me=e),pe=0,[]}function Ee(e){return me=``,e}function De(e){return j(Ce(pe-1,Ae(e===91?e+2:e===40?e+1:e)))}function Oe(e){for(;(L=xe())&&L<33;)be();return we(e)>2||we(L)>3?``:` `}function ke(e,t){for(;--t&&be()&&!(L<48||L>102||L>57&&L<65||L>70&&L<97););return Ce(e,Se()+(t<6&&xe()==32&&be()==32))}function Ae(e){for(;be();)switch(L){case e:return pe;case 34:case 39:e!==34&&e!==39&&Ae(L);break;case 40:e===41&&Ae(e);break;case 92:be();break}return pe}function je(e,t){for(;be()&&e+L!==57&&!(e+L===84&&xe()===47););return`/*`+Ce(t,pe-1)+`*`+re(e===47?e:be())}function Me(e){for(;!we(xe());)be();return Ce(e,pe)}function Ne(e){return Ee(Pe(``,null,null,null,[``],e=Te(e),0,[0],e))}function Pe(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=be()){case 40:if(m!=108&&P(C,d-1)==58){ae(C+=N(De(v),`&`,`&\f`),`&\f`,k(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=De(v);break;case 9:case 10:case 13:case 32:C+=Oe(m);break;case 92:C+=ke(Se()-1,7);continue;case 47:switch(xe()){case 42:case 47:se(Ie(je(be(),Se()),t,n,c),c),(we(m||1)==5||we(xe()||1)==5)&&F(C)&&oe(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=F(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=N(C,/\f/g,``)),p>0&&(F(C)-d||h===0&&m===47)&&se(p>32?Le(C+`;`,r,n,d-1,c):Le(N(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(se(S=Fe(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123)if(u===0)Pe(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(P(C,3)===110)break;case 108:if(P(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?Pe(e,S,S,r&&se(Fe(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):Pe(C,S,S,S,[``],x,0,s,x)}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+F(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&ye()==125)continue}switch(C+=re(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(F(C)-1)*_,_=1;break;case 64:xe()===45&&(C+=De(be())),f=xe(),u=d=F(y=C+=Me(Se())),v++;break;case 45:m===45&&F(C)==2&&(h=0)}}return a}function Fe(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=I(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=oe(e,f+1,f=k(g=o[h])),b=e;v<m;++v)(b=j(g>0?p[v]+` `+y:N(y,/&\f/g,p[v])))&&(c[_++]=b);return he(e,t,n,i===0?ee:s,c,l,u,d)}function Ie(e,t,n,r){return he(e,t,n,T,re(ve()),oe(e,2,-2),0,r)}function Le(e,t,n,r,i){return he(e,t,n,te,oe(e,0,r),oe(e,r+1,-1),r,i)}function Re(e,t,n){switch(A(e,t)){case 5103:return w+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return w+e+e;case 4855:return w+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return C+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return w+e+C+e+S+e+e;case 5936:switch(P(e,t+11)){case 114:return w+e+S+N(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return w+e+S+N(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return w+e+S+N(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return w+e+S+e+e;case 6165:return w+e+S+`flex-`+e+e;case 5187:return w+e+N(e,/(\w+).+(:[^]+)/,w+`box-$1$2`+S+`flex-$1$2`)+e;case 5443:return w+e+S+`flex-item-`+N(e,/flex-|-self/g,``)+(M(e,/flex-|baseline/)?``:S+`grid-row-`+N(e,/flex-|-self/g,``))+e;case 4675:return w+e+S+`flex-line-pack`+N(e,/align-content|flex-|-self/g,``)+e;case 5548:return w+e+S+N(e,`shrink`,`negative`)+e;case 5292:return w+e+S+N(e,`basis`,`preferred-size`)+e;case 6060:return w+`box-`+N(e,`-grow`,``)+w+e+S+N(e,`grow`,`positive`)+e;case 4554:return w+N(e,/([^-])(transform)/g,`$1`+w+`$2`)+e;case 6187:return N(N(N(e,/(zoom-|grab)/,w+`$1`),/(image-set)/,w+`$1`),e,``)+e;case 5495:case 3959:return N(e,/(image-set\([^]*)/,w+"$1$`$1");case 4968:return N(N(e,/(.+:)(flex-)?(.*)/,w+`box-pack:$3`+S+`flex-pack:$3`),/space-between/,`justify`)+w+e+e;case 4200:if(!M(e,/flex-|baseline/))return S+`grid-column-align`+oe(e,t)+e;break;case 2592:case 3360:return S+N(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,M(e.props,/grid-\w+-end/)})?~ae(e+(n=n[t].value),`span`,0)?e:S+N(e,`-start`,``)+e+S+`grid-row-span:`+(~ae(n,`span`,0)?M(n,/\d+/):M(n,/\d+/)-+M(e,/\d+/))+`;`:S+N(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return M(e.props,/grid-\w+-start/)})?e:S+N(N(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return N(e,/(.+)-inline(.+)/,w+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(F(e)-1-t>6)switch(P(e,t+1)){case 109:if(P(e,t+4)!==45)break;case 102:return N(e,/(.+:)(.+)-([^]+)/,`$1`+w+`$2-$3$1`+C+(P(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~ae(e,`stretch`,0)?Re(N(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return N(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return S+n+`:`+r+s+(i?S+n+`-span:`+(a?o:o-+r)+s:``)+e});case 4949:if(P(e,t+6)===121)return N(e,`:`,`:`+w)+e;break;case 6444:switch(P(e,P(e,14)===45?18:11)){case 120:return N(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+w+(P(e,14)===45?`inline-`:``)+`box$3$1`+w+`$2$3$1`+S+`$2box$3`)+e;case 100:return N(e,`:`,`:`+S)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return N(e,`scroll-`,`scroll-snap-`)+e}return e}function ze(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function Be(e,t,n,r){switch(e.type){case O:if(e.children.length)break;case E:case D:case te:return e.return=e.return||e.value;case T:return``;case ne:return e.return=e.value+`{`+ze(e.children,r)+`}`;case ee:if(!F(e.value=e.props.join(`,`)))return``}return F(n=ze(e.children,r))?e.return=e.value+`{`+n+`}`:``}function Ve(e){var t=I(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function He(e){return function(t){t.root||(t=t.return)&&e(t)}}function Ue(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case te:e.return=Re(e.value,e.length,n);return;case ne:return ze([ge(e,{value:N(e.value,`@`,`@`+w)})],r);case ee:if(e.length)return ce(n=e.props,function(t){switch(M(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:_e(ge(e,{props:[N(t,/:(read-\w+)/,`:`+C+`$1`)]})),_e(ge(e,{props:[t]})),ie(e,{props:le(n,r)});break;case`::placeholder`:_e(ge(e,{props:[N(t,/:(plac\w+)/,`:`+w+`input-$1`)]})),_e(ge(e,{props:[N(t,/:(plac\w+)/,`:`+C+`$1`)]})),_e(ge(e,{props:[N(t,/:(plac\w+)/,S+`input-$1`)]})),_e(ge(e,{props:[t]})),ie(e,{props:le(n,r)});break}return``})}}var We=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,Ge=`active`,Ke=`data-styled-version`,qe=`6.3.12`,Je=`/*!sc*/
`,Ye=typeof window<`u`&&typeof document<`u`,Xe=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:typeof process<`u`&&{}.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&{}.REACT_APP_SC_DISABLE_SPEEDY!==``?{}.REACT_APP_SC_DISABLE_SPEEDY!==`false`&&{}.REACT_APP_SC_DISABLE_SPEEDY:typeof process<`u`&&{}.SC_DISABLE_SPEEDY!==void 0&&{}.SC_DISABLE_SPEEDY!==``&&{}.SC_DISABLE_SPEEDY!==`false`&&{}.SC_DISABLE_SPEEDY),Ze={};function Qe(e){var t=[...arguments].slice(1);return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var $e=new Map,et=new Map,tt=1,nt=function(e){if($e.has(e))return $e.get(e);for(;et.has(tt);)tt++;var t=tt++;return $e.set(e,t),et.set(t,e),t},rt=function(e,t){tt=t+1,$e.set(e,t),et.set(t,e)},it=Object.freeze([]),at=Object.freeze({});function ot(e,t,n){return n===void 0&&(n=at),e.theme!==n.theme&&e.theme||t||n.theme}var st=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`)),ct=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,lt=/(^-|-$)/g;function ut(e){return e.replace(ct,`-`).replace(lt,``)}var dt=/(a)(d)/gi,ft=function(e){return String.fromCharCode(e+(e>25?39:97))};function pt(e){var t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=ft(t%52)+n;return(ft(t%52)+n).replace(dt,`$1-$2`)}var mt,ht=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},gt=function(e){return ht(5381,e)};function _t(e){return pt(gt(e)>>>0)}function vt(e){return e.displayName||e.name||`Component`}function yt(e){return typeof e==`string`&&!0}var bt=typeof Symbol==`function`&&Symbol.for,xt=bt?Symbol.for(`react.memo`):60115,St=bt?Symbol.for(`react.forward_ref`):60112,Ct={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},wt={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Tt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Et=((mt={})[St]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},mt[xt]=Tt,mt);function Dt(e){return(`type`in(t=e)&&t.type.$$typeof)===xt?Tt:`$$typeof`in e?Et[e.$$typeof]:Ct;var t}var Ot=Object.defineProperty,kt=Object.getOwnPropertyNames,At=Object.getOwnPropertySymbols,jt=Object.getOwnPropertyDescriptor,Mt=Object.getPrototypeOf,Nt=Object.prototype;function Pt(e,t,n){if(typeof t!=`string`){if(Nt){var r=Mt(t);r&&r!==Nt&&Pt(e,r,n)}var i=kt(t);At&&(i=i.concat(At(t)));for(var a=Dt(e),o=Dt(t),s=0;s<i.length;++s){var c=i[s];if(!(c in wt||n&&n[c]||o&&c in o||a&&c in a)){var l=jt(t,c);try{Ot(e,c,l)}catch{}}}}return e}function Ft(e){return typeof e==`function`}function It(e){return typeof e==`object`&&`styledComponentId`in e}function Lt(e,t){return e&&t?`${e} ${t}`:e||t||``}function Rt(e,t){return e.join(t||``)}function zt(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function Bt(e,t,n){if(n===void 0&&(n=!1),!n&&!zt(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Bt(e[r],t[r]);else if(zt(t))for(var r in t)e[r]=Bt(e[r],t[r]);return e}function Vt(e,t){Object.defineProperty(e,`toString`,{value:t})}var Ht=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}return e.prototype.indexOfGroup=function(e){if(e===this._cGroup)return this._cIndex;var t=this._cIndex;if(e>this._cGroup)for(var n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t},e.prototype.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,i=r;e>=i;)if((i<<=1)<0)throw Qe(16,`${e}`);this.groupSizes=new Uint32Array(i),this.groupSizes.set(n),this.length=i;for(var a=r;a<i;a++)this.groupSizes[a]=0}for(var o=this.indexOfGroup(e+1),s=0,c=(a=0,t.length);a<c;a++)this.tag.insertRule(o,t[a])&&(this.groupSizes[e]++,o++,s++);s>0&&this._cGroup>e&&(this._cIndex+=s)},e.prototype.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var i=n;i<r;i++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}},e.prototype.getGroup=function(e){var t=``;if(e>=this.length||this.groupSizes[e]===0)return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n,a=r;a<i;a++)t+=this.tag.getRule(a)+Je;return t},e}(),Ut=`style[${We}][${Ke}="${qe}"]`,Wt=RegExp(`^${We}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Gt=function(e){return typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11},Kt=function(e){if(!e)return document;if(Gt(e))return e;if(`getRootNode`in e){var t=e.getRootNode();if(Gt(t))return t}return document},qt=function(e,t,n){for(var r,i=n.split(`,`),a=0,o=i.length;a<o;a++)(r=i[a])&&e.registerName(t,r)},Jt=function(e,t){for(var n=(t.textContent??``).split(Je),r=[],i=0,a=n.length;i<a;i++){var o=n[i].trim();if(o){var s=o.match(Wt);if(s){var c=0|parseInt(s[1],10),l=s[2];c!==0&&(rt(l,c),qt(e,l,s[3]),e.getTag().insertRules(c,r)),r.length=0}else r.push(o)}}},Yt=function(e){for(var t=Kt(e.options.target).querySelectorAll(Ut),n=0,r=t.length;n<r;n++){var i=t[n];i&&i.getAttribute(We)!==Ge&&(Jt(e,i),i.parentNode&&i.parentNode.removeChild(i))}};function Xt(){return typeof __webpack_nonce__<`u`?__webpack_nonce__:null}var Zt=function(e){var t=document.head,n=e||t,r=document.createElement(`style`),i=function(e){var t=Array.from(e.querySelectorAll(`style[${We}]`));return t[t.length-1]}(n),a=i===void 0?null:i.nextSibling;r.setAttribute(We,Ge),r.setAttribute(Ke,qe);var o=Xt();return o&&r.setAttribute(`nonce`,o),n.insertBefore(r,a),r},Qt=function(){function e(e){this.element=Zt(e),this.element.appendChild(document.createTextNode(``)),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=e.getRootNode().styleSheets??document.styleSheets,n=0,r=t.length;n<r;n++){var i=t[n];if(i.ownerNode===e)return i}throw Qe(17)}(this.element),this.length=0}return e.prototype.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},e.prototype.getRule=function(e){var t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``},e}(),$t=function(){function e(e){this.element=Zt(e),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},e.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:``},e}(),en=function(){function e(e){this.rules=[],this.length=0}return e.prototype.insertRule=function(e,t){return e<=this.length&&(e===this.length?this.rules.push(t):this.rules.splice(e,0,t),this.length++,!0)},e.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},e.prototype.getRule=function(e){return e<this.length?this.rules[e]:``},e}(),tn=Ye,nn={isServer:!Ye,useCSSOMInjection:!Xe},rn=function(){function e(e,t,n){e===void 0&&(e=at),t===void 0&&(t={});var r=this;this.options=y(y({},nn),e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Ye&&tn&&(tn=!1,Yt(this)),Vt(this,function(){return function(e){for(var t=e.getTag(),n=t.length,r=``,i=function(n){var i=function(e){return et.get(e)}(n);if(i===void 0)return`continue`;var a=e.names.get(i);if(a===void 0||!a.size)return`continue`;var o=t.getGroup(n);if(o.length===0)return`continue`;var s=We+`.g`+n+`[id="`+i+`"]`,c=``;a.forEach(function(e){e.length>0&&(c+=e+`,`)}),r+=o+s+`{content:"`+c+`"}`+Je},a=0;a<n;a++)i(a);return r}(r)})}return e.registerId=function(e){return nt(e)},e.prototype.rehydrate=function(){!this.server&&Ye&&Yt(this)},e.prototype.reconstructWithOptions=function(t,n){n===void 0&&(n=!0);var r=new e(y(y({},this.options),t),this.gs,n&&this.names||void 0);return!this.server&&Ye&&t.target!==this.options.target&&Kt(this.options.target)!==Kt(t.target)&&Yt(r),r},e.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},e.prototype.getTag=function(){return this.tag||=(e=function(e){var t=e.useCSSOMInjection,n=e.target;return e.isServer?new en(n):t?new Qt(n):new $t(n)}(this.options),new Ht(e));var e},e.prototype.hasNameForId=function(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n},e.prototype.registerName=function(e,t){nt(e);var n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))},e.prototype.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(nt(e),n)},e.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},e.prototype.clearRules=function(e){this.getTag().clearGroup(nt(e)),this.clearNames(e)},e.prototype.clearTag=function(){this.tag=void 0},e}();function an(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in x||e.startsWith(`--`)?String(t).trim():`${t}px`}var on=function(e){return e>=`A`&&e<=`Z`};function sn(e){for(var t=``,n=0;n<e.length;n++){var r=e[n];if(n===1&&r===`-`&&e[0]===`-`)return e;on(r)?t+=`-`+r.toLowerCase():t+=r}return t.startsWith(`ms-`)?`-`+t:t}var cn=Symbol.for(`sc-keyframes`);function ln(e){return typeof e==`object`&&!!e&&cn in e}var un=function(e){return e==null||!1===e||e===``},dn=function(e){var t=[];for(var n in e){var r=e[n];e.hasOwnProperty(n)&&!un(r)&&(Array.isArray(r)&&r.isCss||Ft(r)?t.push(`${sn(n)}:`,r,`;`):zt(r)?t.push.apply(t,b(b([`${n} {`],dn(r),!1),[`}`],!1)):t.push(`${sn(n)}: ${an(n,r)};`))}return t};function fn(e,t,n,r,i){if(i===void 0&&(i=[]),typeof e==`string`)return e&&i.push(e),i;if(un(e))return i;if(It(e))return i.push(`.${e.styledComponentId}`),i;if(Ft(e))return!Ft(a=e)||a.prototype&&a.prototype.isReactComponent||!t?(i.push(e),i):fn(e(t),t,n,r,i);var a;if(ln(e))return n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i;if(zt(e)){for(var o=dn(e),s=0;s<o.length;s++)i.push(o[s]);return i}if(!Array.isArray(e))return i.push(e.toString()),i;for(s=0;s<e.length;s++)fn(e[s],t,n,r,i);return i}function pn(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ft(n)&&!It(n))return!1}return!0}var mn=gt(qe),hn=function(){function e(e,t,n){this.rules=e,this.staticRulesId=``,this.isStatic=(n===void 0||n.isStatic)&&pn(e),this.componentId=t,this.baseHash=ht(mn,t),this.baseStyle=n,rn.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n).className:``;if(this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(this.componentId,this.staticRulesId))r=Lt(r,this.staticRulesId);else{var i=Rt(fn(this.rules,e,t,n)),a=pt(ht(this.baseHash,i)>>>0);if(!t.hasNameForId(this.componentId,a)){var o=n(i,`.${a}`,void 0,this.componentId);t.insertRules(this.componentId,a,o)}r=Lt(r,a),this.staticRulesId=a}else{for(var s=ht(this.baseHash,n.hash),c=``,l=0;l<this.rules.length;l++){var u=this.rules[l];if(typeof u==`string`)c+=u;else if(u){var d=Rt(fn(u,e,t,n));s=ht(ht(s,String(l)),d),c+=d}}if(c){var f=pt(s>>>0);if(!t.hasNameForId(this.componentId,f)){var p=n(c,`.${f}`,void 0,this.componentId);t.insertRules(this.componentId,f,p)}r=Lt(r,f)}}return{className:r,css:typeof window>`u`?t.getTag().getGroup(nt(this.componentId)):``}},e}(),gn=/&/g,_n=47,vn=42;function yn(e){if(e.indexOf(`}`)===-1)return!1;for(var t=e.length,n=0,r=0,i=!1,a=0;a<t;a++){var o=e.charCodeAt(a);if(r!==0||i||o!==_n||e.charCodeAt(a+1)!==vn)if(i)o===vn&&e.charCodeAt(a+1)===_n&&(i=!1,a++);else if(o!==34&&o!==39||a!==0&&e.charCodeAt(a-1)===92){if(r===0){if(o===123)n++;else if(o===125&&--n<0)return!0}}else r===0?r=o:r===o&&(r=0);else i=!0,a++}return n!==0||r!==0}function bn(e,t){return e.map(function(e){return e.type===`rule`&&(e.value=`${t} ${e.value}`,e.value=e.value.replaceAll(`,`,`,${t} `),e.props=e.props.map(function(e){return`${t} ${e}`})),Array.isArray(e.children)&&e.type!==`@keyframes`&&(e.children=bn(e.children,t)),e})}function xn(e){var t,n,r,i=e===void 0?at:e,a=i.options,o=a===void 0?at:a,s=i.plugins,c=s===void 0?it:s,l=function(e,r,i){return i.startsWith(n)&&i.endsWith(n)&&i.replaceAll(n,``).length>0?`.${t}`:e},u=c.slice();u.push(function(e){e.type===`rule`&&e.value.includes(`&`)&&(r||=RegExp(`\\${n}\\b`,`g`),e.props[0]=e.props[0].replace(gn,n).replace(r,l))}),o.prefix&&u.push(Ue),u.push(Be);var d=[],f=Ve(u.concat(He(function(e){return d.push(e)}))),p=function(e,i,a,s){i===void 0&&(i=``),a===void 0&&(a=``),s===void 0&&(s=`&`),t=s,n=i,r=void 0;var c=function(e){if(!yn(e))return e;for(var t=e.length,n=``,r=0,i=0,a=0,o=!1,s=0;s<t;s++){var c=e.charCodeAt(s);if(a!==0||o||c!==_n||e.charCodeAt(s+1)!==vn)if(o)c===vn&&e.charCodeAt(s+1)===_n&&(o=!1,s++);else if(c!==34&&c!==39||s!==0&&e.charCodeAt(s-1)===92){if(a===0)if(c===123)i++;else if(c===125){if(--i<0){for(var l=s+1;l<t;){var u=e.charCodeAt(l);if(u===59||u===10)break;l++}l<t&&e.charCodeAt(l)===59&&l++,i=0,s=l-1,r=l;continue}i===0&&(n+=e.substring(r,s+1),r=s+1)}else c===59&&i===0&&(n+=e.substring(r,s+1),r=s+1)}else a===0?a=c:a===c&&(a=0);else o=!0,s++}if(r<t){var d=e.substring(r);yn(d)||(n+=d)}return n}(function(e){if(e.indexOf(`//`)===-1)return e;for(var t=e.length,n=[],r=0,i=0,a=0,o=0;i<t;){var s=e.charCodeAt(i);if(s!==34&&s!==39||i!==0&&e.charCodeAt(i-1)===92)if(a===0)if(s===_n&&i+1<t&&e.charCodeAt(i+1)===vn){for(i+=2;i+1<t&&(e.charCodeAt(i)!==vn||e.charCodeAt(i+1)!==_n);)i++;i+=2}else if(s===40&&i>=3&&(32|e.charCodeAt(i-1))==108&&(32|e.charCodeAt(i-2))==114&&(32|e.charCodeAt(i-3))==117)o=1,i++;else if(o>0)s===41?o--:s===40&&o++,i++;else if(s===vn&&i+1<t&&e.charCodeAt(i+1)===_n)i>r&&n.push(e.substring(r,i)),r=i+=2;else if(s===_n&&i+1<t&&e.charCodeAt(i+1)===_n){for(i>r&&n.push(e.substring(r,i));i<t&&e.charCodeAt(i)!==10;)i++;r=i}else i++;else i++;else a===0?a=s:a===s&&(a=0),i++}return r===0?e:(r<t&&n.push(e.substring(r)),n.join(``))}(e)),l=Ne(a||i?`${a} ${i} { ${c} }`:c);return o.namespace&&(l=bn(l,o.namespace)),d=[],ze(l,f),d};return p.hash=c.length?c.reduce(function(e,t){return t.name||Qe(15),ht(e,t.name)},5381).toString():``,p}var Sn=new rn,Cn=xn(),wn=_.createContext({shouldForwardProp:void 0,styleSheet:Sn,stylis:Cn});wn.Consumer;var Tn=_.createContext(void 0);function En(){return _.useContext(wn)}function Dn(e){if(!_.useMemo)return e.children;var t=En().styleSheet,n=_.useMemo(function(){var n=t;return e.sheet?n=e.sheet:e.target&&(n=n.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(n=n.reconstructWithOptions({useCSSOMInjection:!1})),n},[e.disableCSSOMInjection,e.sheet,e.target,t]),r=_.useMemo(function(){return xn({options:{namespace:e.namespace,prefix:e.enableVendorPrefixes},plugins:e.stylisPlugins})},[e.enableVendorPrefixes,e.namespace,e.stylisPlugins]),i=_.useMemo(function(){return{shouldForwardProp:e.shouldForwardProp,styleSheet:n,stylis:r}},[e.shouldForwardProp,n,r]);return _.createElement(wn.Provider,{value:i},_.createElement(Tn.Provider,{value:r},e.children))}var On=_.createContext(void 0);On.Consumer;function kn(e){var t=_.useContext(On),n=_.useMemo(function(){return function(e,t){if(!e)throw Qe(14);if(Ft(e))return e(t);if(Array.isArray(e)||typeof e!=`object`)throw Qe(8);return t?y(y({},t),e):e}(e.theme,t)},[e.theme,t]);return e.children?_.createElement(On.Provider,{value:n},e.children):null}var An={};function jn(e,t,n){var r=It(e),i=e,a=!yt(e),o=t.attrs,s=o===void 0?it:o,c=t.componentId,l=c===void 0?function(e,t){var n=typeof e==`string`?ut(e):`sc`;An[n]=(An[n]||0)+1;var r=`${n}-${_t(qe+n+An[n])}`;return t?`${t}-${r}`:r}(t.displayName,t.parentComponentId):c,u=t.displayName,d=u===void 0?function(e){return yt(e)?`styled.${e}`:`Styled(${vt(e)})`}(e):u,f=t.displayName&&t.componentId?`${ut(t.displayName)}-${t.componentId}`:t.componentId||l,p=r&&i.attrs?i.attrs.concat(s).filter(Boolean):s,m=t.shouldForwardProp;if(r&&i.shouldForwardProp){var h=i.shouldForwardProp;if(t.shouldForwardProp){var g=t.shouldForwardProp;m=function(e,t){return h(e,t)&&g(e,t)}}else m=h}var v=new hn(n,f,r?i.componentStyle:void 0);function b(e,t){return function(e,t,n){var r=e.attrs,i=e.componentStyle,a=e.defaultProps,o=e.foldedComponentIds,s=e.styledComponentId,c=e.target,l=_.useContext(On),u=En(),d=e.shouldForwardProp||u.shouldForwardProp,f=ot(t,l,a)||at,p=function(e,t,n){for(var r,i=y(y({},t),{className:void 0,theme:n}),a=0;a<e.length;a+=1){var o=Ft(r=e[a])?r(i):r;for(var s in o)s===`className`?i.className=Lt(i.className,o[s]):s===`style`?i.style=y(y({},i.style),o[s]):s in t&&t[s]===void 0||(i[s]=o[s])}return`className`in t&&typeof t.className==`string`&&(i.className=Lt(i.className,t.className)),i}(r,t,f),m=p.as||c,h={};for(var g in p)p[g]===void 0||g[0]===`$`||g===`as`||g===`theme`&&p.theme===f||(g===`forwardedAs`?h.as=p.forwardedAs:d&&!d(g,m)||(h[g]=p[g]));var v=function(e,t){var n=En();return e.generateAndInjectStyles(t,n.styleSheet,n.stylis)}(i,p).className,b=Lt(o,s);return v&&(b+=` `+v),p.className&&(b+=` `+p.className),h[yt(m)&&!st.has(m)?`class`:`className`]=b,n&&(h.ref=n),(0,_.createElement)(m,h)}(x,e,t)}b.displayName=d;var x=_.forwardRef(b);return x.attrs=p,x.componentStyle=v,x.displayName=d,x.shouldForwardProp=m,x.foldedComponentIds=r?Lt(i.foldedComponentIds,i.styledComponentId):``,x.styledComponentId=f,x.target=r?i.target:e,Object.defineProperty(x,`defaultProps`,{get:function(){return this._foldedDefaultProps},set:function(e){this._foldedDefaultProps=r?function(e){for(var t=[...arguments].slice(1),n=0,r=t;n<r.length;n++)Bt(e,r[n],!0);return e}({},i.defaultProps,e):e}}),Vt(x,function(){return`.${x.styledComponentId}`}),a&&Pt(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function Mn(e,t){for(var n=[e[0]],r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var Nn=function(e){return Object.assign(e,{isCss:!0})};function R(e){var t=[...arguments].slice(1);if(Ft(e)||zt(e))return Nn(fn(Mn(it,b([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?fn(n):Nn(fn(Mn(n,t)))}function Pn(e,t,n){if(n===void 0&&(n=at),!t)throw Qe(1,t);var r=function(r){var i=[...arguments].slice(1);return e(t,n,R.apply(void 0,b([r],i,!1)))};return r.attrs=function(r){return Pn(e,t,y(y({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)}))},r.withConfig=function(r){return Pn(e,t,y(y({},n),r))},r}var Fn=function(e){return Pn(jn,e)},z=Fn;st.forEach(function(e){z[e]=Fn(e)});var In,Ln=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=pn(e),rn.registerId(this.componentId+1)}return e.prototype.createStyles=function(e,t,n,r){var i=r(Rt(fn(this.rules,t,n,r)),``),a=this.componentId+e;n.insertRules(a,a,i)},e.prototype.removeStyles=function(e,t){t.clearRules(this.componentId+e)},e.prototype.renderStyles=function(e,t,n,r){e>2&&rn.registerId(this.componentId+e);var i=this.componentId+e;this.isStatic?n.hasNameForId(i,i)||this.createStyles(e,t,n,r):(this.removeStyles(e,n),this.createStyles(e,t,n,r))},e}();function Rn(e){var t=[...arguments].slice(1),n=R.apply(void 0,b([e],t,!1)),r=`sc-global-${_t(JSON.stringify(n))}`,i=new Ln(n,r),a=new WeakMap,o=function(e){var t=En(),n=_.useContext(On),s=a.get(t.styleSheet);return s===void 0&&(s=t.styleSheet.allocateGSInstance(r),a.set(t.styleSheet,s)),_.useLayoutEffect(function(){return t.styleSheet.server||function(e,t,n,r,a){if(i.isStatic)i.renderStyles(e,Ze,n,a);else{var s=y(y({},t),{theme:ot(t,r,o.defaultProps)});i.renderStyles(e,s,n,a)}}(s,e,t.styleSheet,n,t.stylis),function(){i.removeStyles(s,t.styleSheet)}},[s,e,t.styleSheet,n,t.stylis]),null};return _.memo(o)}(function(){function e(e,t){var n=this;this[In]=!0,this.inject=function(e,t){t===void 0&&(t=Cn);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,`@keyframes`))},this.name=e,this.id=`sc-keyframes-${e}`,this.rules=t,Vt(this,function(){throw Qe(12,String(n.name))})}return e.prototype.getName=function(e){return e===void 0&&(e=Cn),this.name+e.hash},e})(),In=cn,function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return``;var n=Xt();return`<style ${Rt([n&&`nonce="${n}"`,`${We}="true"`,`${Ke}="${qe}"`].filter(Boolean),` `)}>${t}</style>`},this.getStyleTags=function(){if(e.sealed)throw Qe(2);return e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)throw Qe(2);var n=e.instance.toString();if(!n)return[];var r=((t={})[We]=``,t[Ke]=qe,t.dangerouslySetInnerHTML={__html:n},t),i=Xt();return i&&(r.nonce=i),[_.createElement(`style`,y({},r,{key:`sc-0-0`}))]},this.seal=function(){e.sealed=!0},this.instance=new rn({isServer:!0}),this.sealed=!1}return e.prototype.collectStyles=function(e){if(this.sealed)throw Qe(2);return _.createElement(Dn,{sheet:this.instance},e)},e.prototype.interleaveWithNodeStream=function(e){throw Qe(3)},e}(),`${We}`;var zn=`
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

`,Bn=`4px 4px 10px 0 rgba(0, 0, 0, 0.35)`,Vn=`inset 2px 2px 3px rgba(0,0,0,0.2)`,Hn=()=>R`
  -webkit-text-fill-color: ${({theme:e})=>e.materialTextDisabled};
  color: ${({theme:e})=>e.materialTextDisabled};
  text-shadow: 1px 1px ${({theme:e})=>e.materialTextDisabledShadow};
  /* filter: grayscale(100%); */
`,Un=({background:e=`material`,color:t=`materialText`}={})=>R`
  box-sizing: border-box;
  display: inline-block;
  background: ${({theme:t})=>t[e]};
  color: ${({theme:e})=>e[t]};
`,Wn=({mainColor:e=`black`,secondaryColor:t=`transparent`,pixelSize:n=2})=>R`
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
`,Gn=()=>R`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  color: ${({theme:e})=>e.materialText};
  background: ${({$disabled:e,theme:t})=>e?t.flatLight:t.canvas};
  border: 2px solid ${({theme:e})=>e.canvas};
  outline: 2px solid ${({theme:e})=>e.flatDark};
  outline-offset: -4px;
`,Kn={button:{topLeftOuter:`borderLightest`,topLeftInner:`borderLight`,bottomRightInner:`borderDark`,bottomRightOuter:`borderDarkest`},buttonPressed:{topLeftOuter:`borderDarkest`,topLeftInner:`borderDark`,bottomRightInner:`borderLight`,bottomRightOuter:`borderLightest`},buttonThin:{topLeftOuter:`borderLightest`,topLeftInner:null,bottomRightInner:null,bottomRightOuter:`borderDark`},buttonThinPressed:{topLeftOuter:`borderDark`,topLeftInner:null,bottomRightInner:null,bottomRightOuter:`borderLightest`},field:{topLeftOuter:`borderDark`,topLeftInner:`borderDarkest`,bottomRightInner:`borderLight`,bottomRightOuter:`borderLightest`},grouping:{topLeftOuter:`borderDark`,topLeftInner:`borderLightest`,bottomRightInner:`borderDark`,bottomRightOuter:`borderLightest`},status:{topLeftOuter:`borderDark`,topLeftInner:null,bottomRightInner:null,bottomRightOuter:`borderLightest`},window:{topLeftOuter:`borderLight`,topLeftInner:`borderLightest`,bottomRightInner:`borderDark`,bottomRightOuter:`borderDarkest`}},qn=({theme:e,topLeftInner:t,bottomRightInner:n,hasShadow:r=!1,hasInsetShadow:i=!1})=>[r?Bn:!1,i?Vn:!1,t===null?!1:`inset 1px 1px 0px 1px ${e[t]}`,n===null?!1:`inset -1px -1px 0 1px ${e[n]}`].filter(Boolean).join(`, `),Jn=({invert:e=!1,style:t=`button`}={})=>{let n={topLeftOuter:e?`bottomRightOuter`:`topLeftOuter`,topLeftInner:e?`bottomRightInner`:`topLeftInner`,bottomRightInner:e?`topLeftInner`:`bottomRightInner`,bottomRightOuter:e?`topLeftOuter`:`bottomRightOuter`};return R`
    border-style: solid;
    border-width: 2px;
    border-left-color: ${({theme:e})=>e[Kn[t][n.topLeftOuter]]};
    border-top-color: ${({theme:e})=>e[Kn[t][n.topLeftOuter]]};
    border-right-color: ${({theme:e})=>e[Kn[t][n.bottomRightOuter]]};
    border-bottom-color: ${({theme:e})=>e[Kn[t][n.bottomRightOuter]]};
    box-shadow: ${({theme:e,shadow:r})=>qn({theme:e,topLeftInner:Kn[t][n.topLeftInner],bottomRightInner:Kn[t][n.bottomRightInner],hasShadow:r})};
  `},Yn=()=>R`
  outline: 2px dotted ${({theme:e})=>e.materialText};
`,Xn=typeof btoa<`u`?btoa:e=>Buffer.from(e).toString(`base64`),Zn=(e,t=0)=>`url(data:image/svg+xml;base64,${Xn(`<svg height="26" width="26" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g transform="rotate(${t} 13 13)">
      <polygon fill="${e}" points="6,10 20,10 13,17"/>
    </g>
  </svg>`)})`,Qn=(e=`default`)=>R`
  ::-webkit-scrollbar {
    width: 26px;
    height: 26px;
  }
  ::-webkit-scrollbar-track {
    ${({theme:t})=>Wn({mainColor:e===`flat`?t.flatLight:t.material,secondaryColor:e===`flat`?t.canvas:t.borderLightest})}
  }
  ::-webkit-scrollbar-thumb {
    ${Un()}
    ${e===`flat`?Gn():Jn({style:`window`})}
      outline-offset: -2px;
  }

  ::-webkit-scrollbar-corner {
    background-color: ${({theme:e})=>e.material};
  }
  ::-webkit-scrollbar-button {
    ${Un()}
    ${e===`flat`?Gn():Jn({style:`window`})}
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
    ${e===`default`?Jn({style:`window`,invert:!0}):``}
  }

  ::-webkit-scrollbar-button:horizontal:increment:start,
  ::-webkit-scrollbar-button:horizontal:decrement:end,
  ::-webkit-scrollbar-button:vertical:increment:start,
  ::-webkit-scrollbar-button:vertical:decrement:end {
    display: none;
  }

  ::-webkit-scrollbar-button:horizontal:decrement {
    background-image: ${({theme:e})=>Zn(e.materialText,90)};
  }

  ::-webkit-scrollbar-button:horizontal:increment {
    background-image: ${({theme:e})=>Zn(e.materialText,270)};
  }

  ::-webkit-scrollbar-button:vertical:decrement {
    background-image: ${({theme:e})=>Zn(e.materialText,180)};
  }

  ::-webkit-scrollbar-button:vertical:increment {
    background-image: ${({theme:e})=>Zn(e.materialText,0)};
  }
`,$n=z.a`
  color: ${({theme:e})=>e.anchor};
  font-size: inherit;
  text-decoration: ${({underline:e})=>e?`underline`:`none`};
  &:visited {
    color: ${({theme:e})=>e.anchorVisited};
  }
`,er=(0,_.forwardRef)(({children:e,underline:t=!0,...n},r)=>_.createElement($n,{ref:r,underline:t,...n},e));er.displayName=`Anchor`;var tr=z.header`
  ${Jn()};
  ${Un()};

  position: ${e=>e.position??(e.fixed?`fixed`:`absolute`)};
  top: 0;
  right: 0;
  left: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`,nr=(0,_.forwardRef)(({children:e,fixed:t=!0,position:n=`fixed`,...r},i)=>_.createElement(tr,{fixed:t,position:t===!1?void 0:n,ref:i,...r},e));nr.displayName=`AppBar`;var rr=()=>{};function ir(e,t,n){return n!==null&&e>n?n:t!==null&&e<t?t:e}function ar(e){if(Math.abs(e)<1){let t=e.toExponential().split(`e-`),n=t[0].split(`.`)[1];return(n?n.length:0)+parseInt(t[1],10)}let t=e.toString().split(`.`)[1];return t?t.length:0}function or(e,t,n){let r=Math.round((e-n)/t)*t+n;return Number(r.toFixed(ar(t)))}function sr(e){return typeof e==`number`?`${e}px`:e}var cr=z.div`
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
`,lr=z.img`
  display: block;
  object-fit: contain;
  width: 100%;
  height: 100%;
`,ur=(0,_.forwardRef)(({alt:e=``,children:t,noBorder:n=!1,size:r=35,square:i=!1,src:a,...o},s)=>_.createElement(cr,{noBorder:n,ref:s,size:sr(r),square:i,src:a,...o},a?_.createElement(lr,{src:a,alt:e}):t));ur.displayName=`Avatar`;var dr={sm:`28px`,md:`36px`,lg:`44px`},fr=R`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${({size:e=`md`})=>dr[e]};
  width: ${({fullWidth:e,size:t=`md`,square:n})=>e?`100%`:n?dr[t]:`auto`};
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
`,pr=z.button`
  ${({active:e,disabled:t,primary:n,theme:r,variant:i})=>i===`flat`?R`
          ${Gn()}
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
            ${!e&&!t&&Yn}
            outline-offset: -4px;
          }
        `:i===`menu`||i===`thin`?R`
          ${Un()};
          border: 2px solid transparent;
          &:hover,
          &:focus {
            ${!t&&!e&&Jn({style:`buttonThin`})}
          }
          &:active {
            ${!t&&Jn({style:`buttonThinPressed`})}
          }
          ${e&&Jn({style:`buttonThinPressed`})}
          ${t&&Hn()}
        `:R`
          ${Un()};
          border: none;
          ${t&&Hn()}
          ${e?Wn({mainColor:r.material,secondaryColor:r.borderLightest}):``}
          &:before {
            box-sizing: border-box;
            content: '';
            position: absolute;
            ${n?R`
                  left: 2px;
                  top: 2px;
                  width: calc(100% - 4px);
                  height: calc(100% - 4px);
                  outline: 2px solid ${r.borderDarkest};
                `:R`
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                `}

            ${Jn(e?{style:i===`raised`?`window`:`button`,invert:!0}:{style:i===`raised`?`window`:`button`,invert:!1})}
          }
          &:active:before {
            ${!t&&Jn({style:i===`raised`?`window`:`button`,invert:!0})}
          }
          &:focus:after,
          &:active:after {
            ${!e&&!t&&Yn}
            outline-offset: -8px;
          }
          &:active:focus:after,
          &:active:after {
            top: ${e?`0`:`1px`};
          }
        `}
  ${fr}
`,B=(0,_.forwardRef)(({onClick:e,disabled:t=!1,children:n,type:r=`button`,fullWidth:i=!1,size:a=`md`,square:o=!1,active:s=!1,onTouchStart:c=rr,primary:l=!1,variant:u=`default`,...d},f)=>_.createElement(pr,{active:s,disabled:t,$disabled:t,fullWidth:i,onClick:t?void 0:e,onTouchStart:c,primary:l,ref:f,size:a,square:o,type:r,variant:u,...d},n));B.displayName=`Button`;function mr({defaultValue:e,onChange:t,onChangePropName:n=`onChange`,readOnly:r,value:i,valuePropName:a=`value`}){let o=i!==void 0,[s,c]=(0,_.useState)(e),l=(0,_.useCallback)(e=>{o||c(e)},[o]);if(o&&typeof t!=`function`&&!r){let e=`Warning: You provided a \`${a}\` prop to a component without an \`${n}\` handler.${a===`value`?`This will render a read-only field. If the field should be mutable use \`defaultValue\`. Otherwise, set either \`${n}\` or \`readOnly\`.`:`This breaks the component state. You must provide an \`${n}\` function that updates \`${a}\`.`}`;console.warn(e)}return[o?i:s,l]}var hr=z.li`
  box-sizing: border-box;

  display: flex;
  align-items: center;
  position: relative;
  height: ${e=>dr[e.size]};
  width: ${e=>e.square?dr[e.size]:`auto`};
  padding: 0 8px;
  font-size: 1rem;
  white-space: nowrap;
  justify-content: ${e=>e.square?`space-around`:`space-between`};
  text-align: center;
  line-height: ${e=>dr[e.size]};
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
  ${e=>e.$disabled&&Hn()}
`,gr=(0,_.forwardRef)(({size:e=`lg`,disabled:t,square:n,children:r,onClick:i,primary:a,...o},s)=>_.createElement(hr,{$disabled:t,size:e,square:n,onClick:t?void 0:i,primary:a,role:`menuitem`,ref:s,"aria-disabled":t,...o},r));gr.displayName=`MenuListItem`;var _r=z.ul.attrs(()=>({role:`menu`}))`
  box-sizing: border-box;
  width: ${e=>e.fullWidth?`100%`:`auto`};
  padding: 4px;
  ${Jn({style:`window`})}
  ${Un()}
  ${e=>e.inline&&`
    display: inline-flex;
    align-items: center;
  `}
  list-style: none;
  position: relative;
`;_r.displayName=`MenuList`;var vr=z.input`
  position: absolute;
  left: 0;
  margin: 0;
  width: ${20}px;
  height: ${20}px;
  opacity: 0;
  z-index: -1;
`,yr=z.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  margin: 8px 0;
  cursor: ${({$disabled:e})=>e?`auto`:`pointer`};
  user-select: none;
  font-size: 1rem;
  color: ${({theme:e})=>e.materialText};
  ${e=>e.$disabled&&Hn()}

  ${hr} & {
    margin: 0;
    height: 100%;
  }
  ${hr}:hover & {
    ${({$disabled:e,theme:t})=>!e&&R`
        color: ${t.materialTextInvert};
      `};
  }
`,br=z.span`
  display: inline-block;
  line-height: 1;
  padding: 2px;
  ${vr}:focus ~ & {
    ${Yn}
  }
  ${vr}:not(:disabled) ~ &:active {
    ${Yn}
  }
`,xr=z.div`
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
`,Sr=z.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 4px;
  overflow: auto;
  ${Qn()}
`,Cr=(0,_.forwardRef)(({children:e,shadow:t=!0,...n},r)=>_.createElement(xr,{ref:r,shadow:t,...n},_.createElement(Sr,null,e)));Cr.displayName=`ScrollView`;var wr=R`
  width: ${20}px;
  height: ${20}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 0.5rem;
`,Tr=z(xr)`
  ${wr}
  width: ${20}px;
  height: ${20}px;
  background: ${({$disabled:e,theme:t})=>e?t.material:t.canvas};
  &:before {
    box-shadow: none;
  }
`,Er=z.div`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  background: ${({$disabled:e,theme:t})=>e?t.flatLight:t.canvas};
  ${wr}
  width: ${16}px;
  height: ${16}px;
  outline: none;
  border: 2px solid ${({theme:e})=>e.flatDark};
  background: ${({$disabled:e,theme:t})=>e?t.flatLight:t.canvas};
`,Dr=z.span.attrs(()=>({"data-testid":`checkmarkIcon`}))`
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
`,Or=z.span.attrs(()=>({"data-testid":`indeterminateIcon`}))`
  display: inline-block;
  position: relative;

  width: 100%;
  height: 100%;

  &:after {
    content: '';
    display: block;

    width: 100%;
    height: 100%;

    ${({$disabled:e,theme:t})=>Wn({mainColor:e?t.checkmarkDisabled:t.checkmark})}
    background-position: 0px 0px, 2px 2px;
  }
`,kr={flat:Er,default:Tr},Ar=(0,_.forwardRef)(({checked:e,className:t=``,defaultChecked:n=!1,disabled:r=!1,indeterminate:i=!1,label:a=``,onChange:o=rr,style:s={},value:c,variant:l=`default`,...u},d)=>{let[f,p]=mr({defaultValue:n,onChange:o,readOnly:u.readOnly??r,value:e}),m=(0,_.useCallback)(e=>{let t=e.target.checked;p(t),o(e)},[o,p]),h=kr[l],g=null;return i?g=Or:f&&(g=Dr),_.createElement(yr,{$disabled:r,className:t,style:s},_.createElement(vr,{disabled:r,onChange:r?void 0:m,readOnly:r,type:`checkbox`,value:c,checked:f,"data-indeterminate":i,ref:d,...u}),_.createElement(h,{$disabled:r,role:`presentation`},g&&_.createElement(g,{$disabled:r,variant:l})),a&&_.createElement(br,null,a))});Ar.displayName=`Checkbox`;var jr=z.div`
  ${({orientation:e,theme:t,size:n=`100%`})=>e===`vertical`?`
    height: ${sr(n)};
    border-left: 2px solid ${t.borderDark};
    border-right: 2px solid ${t.borderLightest};
    margin: 0;
    `:`
    width: ${sr(n)};
    border-bottom: 2px solid ${t.borderLightest};
    border-top: 2px solid ${t.borderDark};
    margin: 0;
    `}
`;jr.displayName=`Separator`;var Mr=z(pr)`
  padding-left: 8px;
`,Nr=z(jr)`
  height: 21px;
  position: relative;
  top: 0;
`,Pr=z.input`
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
`,Fr=z.div`
  box-sizing: border-box;
  height: 19px;
  display: inline-block;
  width: 35px;
  margin-right: 5px;

  background: ${({color:e})=>e};

  ${({$disabled:e})=>e?R`
          border: 2px solid ${({theme:e})=>e.materialTextDisabled};
          filter: drop-shadow(
            1px 1px 0px ${({theme:e})=>e.materialTextDisabledShadow}
          );
        `:R`
          border: 2px solid ${({theme:e})=>e.materialText};
        `}
  ${Pr}:focus:not(:active) + &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    ${Yn}
    outline-offset: -8px;
  }
`,Ir=z.span`
  width: 0px;
  height: 0px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  display: inline-block;
  margin-left: 6px;

  ${({$disabled:e})=>e?R`
          border-top: 6px solid ${({theme:e})=>e.materialTextDisabled};
          filter: drop-shadow(
            1px 1px 0px ${({theme:e})=>e.materialTextDisabledShadow}
          );
        `:R`
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
`,Lr=(0,_.forwardRef)(({value:e,defaultValue:t,onChange:n=rr,disabled:r=!1,variant:i=`default`,...a},o)=>{let[s,c]=mr({defaultValue:t,onChange:n,readOnly:a.readOnly??r,value:e});return _.createElement(Mr,{disabled:r,as:`div`,variant:i,size:`md`},_.createElement(Pr,{onChange:e=>{let t=e.target.value;c(t),n(e)},readOnly:r,disabled:r,value:s??`#008080`,type:`color`,ref:o,...a}),_.createElement(Fr,{$disabled:r,color:s??`#008080`,role:`presentation`}),i===`default`&&_.createElement(Nr,{orientation:`vertical`}),_.createElement(Ir,{$disabled:r,variant:i}))});Lr.displayName=`ColorInput`;var Rr=z.div`
  position: relative;
  --react95-digit-primary-color: #ff0102;
  --react95-digit-secondary-color: #740201;
  --react95-digit-bg-color: #000000;

  ${({pixelSize:e})=>R`
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
      ${Wn({mainColor:`var(--react95-digit-bg-color)`,secondaryColor:`var(--react95-digit-secondary-color)`,pixelSize:e})}
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
`,zr=[`horizontal top`,`center`,`horizontal bottom`,`vertical top left`,`vertical top right`,`vertical bottom left`,`vertical bottom right`],Br=[[1,0,1,1,1,1,1],[0,0,0,0,1,0,1],[1,1,1,0,1,1,0],[1,1,1,0,1,0,1],[0,1,0,1,1,0,1],[1,1,1,1,0,0,1],[1,1,1,1,0,1,1],[1,0,0,0,1,0,1],[1,1,1,1,1,1,1],[1,1,1,1,1,0,1]];function Vr({digit:e=0,pixelSize:t=2,...n}){let r=Br[Number(e)].map((e,t)=>e?`${zr[t]} active`:zr[t]);return _.createElement(Rr,{pixelSize:t,...n},r.map((e,t)=>_.createElement(`span`,{className:e,key:t})))}var Hr=z.div`
  ${Jn({style:`status`})}
  display: inline-flex;
  background: #000000;
`,Ur={sm:1,md:2,lg:3,xl:4},Wr=(0,_.forwardRef)(({value:e=0,minLength:t=3,size:n=`md`,...r},i)=>{let a=(0,_.useMemo)(()=>e.toString().padStart(t,`0`).split(``),[t,e]);return _.createElement(Hr,{ref:i,...r},a.map((e,t)=>_.createElement(Vr,{digit:e,pixelSize:Ur[n],key:t})))});Wr.displayName=`Counter`;var Gr=R`
  display: flex;
  align-items: center;
  width: ${({fullWidth:e})=>e?`100%`:`auto`};
  min-height: ${dr.md};
`,Kr=z(xr).attrs({"data-testid":`variant-default`})`
  ${Gr}
  background: ${({$disabled:e,theme:t})=>e?t.material:t.canvas};
`,qr=z.div.attrs({"data-testid":`variant-flat`})`
  ${Gn()}
  ${Gr}
  position: relative;
`,Jr=R`
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
  ${({disabled:e,variant:t})=>t!==`flat`&&e&&Hn()}
`,Yr=z.input`
  ${Jr}
  padding: 0 8px;
`,Xr=z.textarea`
  ${Jr}
  padding: 8px;
  resize: none;
  ${({variant:e})=>Qn(e)}
`,Zr=(0,_.forwardRef)(({className:e,disabled:t=!1,fullWidth:n,onChange:r=rr,shadow:i=!0,style:a,variant:o=`default`,...s},c)=>{let l=o===`flat`?qr:Kr,u=(0,_.useMemo)(()=>s.multiline?_.createElement(Xr,{disabled:t,onChange:t?void 0:r,readOnly:t,ref:c,variant:o,...s}):_.createElement(Yr,{disabled:t,onChange:t?void 0:r,readOnly:t,ref:c,type:s.type??`text`,variant:o,...s}),[t,r,s,c,o]);return _.createElement(l,{className:e,fullWidth:n,$disabled:t,shadow:i,style:a},u)});Zr.displayName=`TextInput`;var Qr=z.div`
  display: inline-flex;
  align-items: center;
`,$r=z(B)`
  width: 30px;
  padding: 0;
  flex-shrink: 0;

  ${({variant:e})=>e===`flat`?R`
          height: calc(50% - 1px);
        `:R`
          height: 50%;
        `}
`,ei=z.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;

  ${({variant:e})=>e===`flat`?R`
          height: calc(${dr.md} - 4px);
        `:R`
          height: ${dr.md};
          margin-left: 2px;
        `}
`,ti=z.span`
  width: 0px;
  height: 0px;
  display: inline-block;
  ${({invert:e})=>e?R`
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid ${({theme:e})=>e.materialText};
        `:R`
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid ${({theme:e})=>e.materialText};
        `}
  ${$r}:disabled & {
    filter: drop-shadow(
      1px 1px 0px ${({theme:e})=>e.materialTextDisabledShadow}
    );
    ${({invert:e})=>e?R`
            border-bottom-color: ${({theme:e})=>e.materialTextDisabled};
          `:R`
            border-top-color: ${({theme:e})=>e.materialTextDisabled};
          `}
  }
`,ni=(0,_.forwardRef)(({className:e,defaultValue:t,disabled:n=!1,max:r,min:i,onChange:a,readOnly:o,step:s=1,style:c,value:l,variant:u=`default`,width:d,...f},p)=>{let[m,h]=mr({defaultValue:t,onChange:a,readOnly:o,value:l}),g=(0,_.useCallback)(e=>{h(parseFloat(e.target.value))},[h]),v=(0,_.useCallback)(e=>{let t=ir(parseFloat(((m??0)+e).toFixed(2)),i??null,r??null);h(t),a?.(t)},[r,i,a,h,m]),y=(0,_.useCallback)(()=>{m!==void 0&&a?.(m)},[a,m]),b=(0,_.useCallback)(()=>{v(s)},[v,s]),x=(0,_.useCallback)(()=>{v(-s)},[v,s]),S=u===`flat`?`flat`:`raised`;return _.createElement(Qr,{className:e,style:{...c,width:d===void 0?`auto`:sr(d)},...f},_.createElement(Zr,{value:m,variant:u,onChange:g,disabled:n,type:`number`,readOnly:o,ref:p,fullWidth:!0,onBlur:y}),_.createElement(ei,{variant:u},_.createElement($r,{"data-testid":`increment`,variant:S,disabled:n||o,onClick:b},_.createElement(ti,{invert:!0})),_.createElement($r,{"data-testid":`decrement`,variant:S,disabled:n||o,onClick:x},_.createElement(ti,null))))});ni.displayName=`NumberInput`;function ri(){let e=``;for(let t=0;t<10;t+=1)e+=`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`[Math.floor(Math.random()*62)];return e}var ii=e=>(0,_.useMemo)(()=>e??ri(),[e]),ai=R`
  box-sizing: border-box;
  padding-left: 4px;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  line-height: 100%;
`,oi=R`
  background: ${({theme:e})=>e.hoverBackground};
  color: ${({theme:e})=>e.canvasTextInvert};
`,si=z.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  &:focus {
    outline: none;
  }
`,ci=z.div`
  ${ai}
  padding-right: 8px;
  align-items: center;
  display: flex;
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  margin: 0 2px;
  border: 2px solid transparent;
  ${si}:focus & {
    ${oi}
    border: 2px dotted ${({theme:e})=>e.focusSecondary};
  }
`,li=R`
  height: ${dr.md};
  display: inline-block;
  color: ${({$disabled:e=!1,theme:t})=>e?Hn():t.canvasText};
  font-size: 1rem;
  cursor: ${({$disabled:e})=>e?`default`:`pointer`};
`,ui=z(xr)`
  ${li}
  background: ${({$disabled:e=!1,theme:t})=>e?t.material:t.canvas};
  &:focus {
    outline: 0;
  }
`,di=z.div`
  ${Gn()}
  ${li}
  background: ${({$disabled:e=!1,theme:t})=>e?t.flatLight:t.canvas};
`,fi=z.select`
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
  ${ai}
  cursor: pointer;
  &:disabled {
    ${Hn()};
    background: ${({theme:e})=>e.material};
    cursor: default;
  }
`,pi=z(pr).attrs(()=>({"aria-hidden":`true`}))`
  width: 30px;
  padding: 0;
  flex-shrink: 0;
  ${({variant:e=`default`})=>e===`flat`?R`
          height: 100%;
          margin-right: 0;
        `:R`
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
`,mi=z.span`
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
  ${pi}:active & {
    margin-top: 2px;
  }
`,hi=z.ul`
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
  box-shadow: ${Bn};
  ${({variant:e=`default`})=>e===`flat`?R`
          bottom: 2px;
          width: 100%;
          border: 2px solid ${({theme:e})=>e.flatDark};
        `:R`
          bottom: -2px;
          width: calc(100% - 2px);
          border: 2px solid ${({theme:e})=>e.borderDarkest};
        `}
  ${({variant:e=`default`})=>Qn(e)}
`,gi=z.li`
  box-sizing: border-box;

  width: 100%;
  padding-left: 8px;

  height: calc(${dr.md} - 4px);
  line-height: calc(${dr.md} - 4px);
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({theme:e})=>e.canvasText};
  &:focus {
    outline: 0;
  }
  ${({active:e})=>e?oi:``}
  user-select: none;
`,_i=[],vi=({className:e,defaultValue:t,disabled:n,native:r,onChange:i,options:a=_i,readOnly:o,style:s,value:c,variant:l,width:u})=>{let d=(0,_.useMemo)(()=>a.filter(Boolean),[a]),[f,p]=mr({defaultValue:t??d?.[0]?.value,onChange:i,readOnly:o,value:c}),m=!(n||o),h=(0,_.useMemo)(()=>({className:e,style:{...s,width:u}}),[e,s,u]),g=(0,_.useMemo)(()=>_.createElement(pi,{as:`div`,"data-testid":`select-button`,$disabled:n,native:r,tabIndex:-1,variant:l===`flat`?`flat`:`raised`},_.createElement(mi,{"data-testid":`select-icon`,$disabled:n})),[n,r,l]),v=(0,_.useMemo)(()=>l===`flat`?di:ui,[l]);return(0,_.useMemo)(()=>({isEnabled:m,options:d,value:f,setValue:p,wrapperProps:h,DropdownButton:g,Wrapper:v}),[g,v,m,d,p,f,h])},yi={ARROW_DOWN:`ArrowDown`,ARROW_LEFT:`ArrowLeft`,ARROW_RIGHT:`ArrowRight`,ARROW_UP:`ArrowUp`,END:`End`,ENTER:`Enter`,ESC:`Escape`,HOME:`Home`,SPACE:`Space`,TAB:`Tab`},bi=1e3,xi=({onBlur:e,onChange:t,onClose:n,onFocus:r,onKeyDown:i,onMouseDown:a,onOpen:o,open:s,options:c,readOnly:l,value:u,selectRef:d,setValue:f,wrapperRef:p})=>{let m=(0,_.useRef)(null),h=(0,_.useRef)([]),g=(0,_.useRef)(0),v=(0,_.useRef)(0),y=(0,_.useRef)(),b=(0,_.useRef)(`search`),x=(0,_.useRef)(``),S=(0,_.useRef)(),[C,w]=mr({defaultValue:!1,onChange:o,onChangePropName:`onOpen`,readOnly:l,value:s,valuePropName:`open`}),T=(0,_.useMemo)(()=>{let e=c.findIndex(e=>e.value===u);return g.current=ir(e,0,null),c[e]},[c,u]),[ee,te]=(0,_.useState)(c[0]),E=(0,_.useCallback)(e=>{let t=m.current,n=h.current[e];if(!n||!t){y.current=e;return}y.current=void 0;let r=t.clientHeight,i=t.scrollTop,a=t.scrollTop+r,o=n.offsetTop,s=n.offsetHeight,c=n.offsetTop+n.offsetHeight;o<i&&t.scrollTo(0,o),c>a&&t.scrollTo(0,o-r+s),n.focus({preventScroll:!0})},[m]),D=(0,_.useCallback)((e,{scroll:t}={})=>{let n=c.length-1,r;switch(e){case`first`:r=0;break;case`last`:r=n;break;case`next`:r=ir(v.current+1,0,n);break;case`previous`:r=ir(v.current-1,0,n);break;case`selected`:r=ir(g.current??0,0,n);break;default:r=e}v.current=r,te(c[r]),t&&E(r)},[v,c,E]),ne=(0,_.useCallback)(({fromEvent:e})=>{w(!0),D(`selected`,{scroll:!0}),o?.({fromEvent:e})},[D,o,w]),O=(0,_.useCallback)(()=>{b.current=`search`,x.current=``,clearTimeout(S.current)},[]),k=(0,_.useCallback)(({focusSelect:e,fromEvent:t})=>{var r;n?.({fromEvent:t}),w(!1),te(c[0]),O(),y.current=void 0,e&&((r=d.current)==null||r.focus())},[O,n,c,d,w]),re=(0,_.useCallback)(({fromEvent:e})=>{C?k({focusSelect:!1,fromEvent:e}):ne({fromEvent:e})},[k,ne,C]),ie=(0,_.useCallback)((e,{fromEvent:n})=>{g.current!==e&&(g.current=e,f(c[e].value),t?.(c[e],{fromEvent:n}))},[t,c,f]),A=(0,_.useCallback)(({focusSelect:e,fromEvent:t})=>{ie(v.current,{fromEvent:t}),k({focusSelect:e,fromEvent:t})},[k,ie]),j=(0,_.useCallback)((e,{fromEvent:t,select:n})=>{switch(b.current===`cycleFirstLetter`&&e!==x.current&&(b.current=`search`),e===x.current?b.current=`cycleFirstLetter`:x.current+=e,b.current){case`search`:{let r=c.findIndex(e=>e.label?.toLocaleUpperCase().indexOf(x.current)===0);r<0&&(r=c.findIndex(t=>t.label?.toLocaleUpperCase().indexOf(e)===0),x.current=e),r>=0&&(n?ie(r,{fromEvent:t}):D(r,{scroll:!0}));break}case`cycleFirstLetter`:{let r=n?g.current??-1:v.current,i=c.findIndex((t,n)=>n>r&&t.label?.toLocaleUpperCase().indexOf(e)===0);i<0&&(i=c.findIndex(t=>t.label?.toLocaleUpperCase().indexOf(e)===0)),i>=0&&(n?ie(i,{fromEvent:t}):D(i,{scroll:!0}));break}}clearTimeout(S.current),S.current=setTimeout(()=>{b.current===`search`&&(x.current=``)},bi)},[D,c,ie]),M=(0,_.useCallback)(e=>{var t;e.button===0&&(e.preventDefault(),(t=d.current)==null||t.focus(),re({fromEvent:e}),a?.(e))},[a,d,re]),N=(0,_.useCallback)(e=>{A({focusSelect:!0,fromEvent:e})},[A]),ae=(0,_.useCallback)(e=>{let{altKey:t,code:n,ctrlKey:r,metaKey:i,shiftKey:a}=e,{ARROW_DOWN:o,ARROW_UP:s,END:c,ENTER:l,ESC:u,HOME:d,SPACE:f,TAB:p}=yi,m=t||r||i||a;if(!(n===p&&(t||r||i)||n!==p&&m))switch(n){case o:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`next`,{scroll:!0});break;case s:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`previous`,{scroll:!0});break;case c:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`last`,{scroll:!0});break;case l:if(!C)return;e.preventDefault(),A({focusSelect:!0,fromEvent:e});break;case u:if(!C)return;e.preventDefault(),k({focusSelect:!0,fromEvent:e});break;case d:if(e.preventDefault(),!C){ne({fromEvent:e});return}D(`first`,{scroll:!0});break;case f:e.preventDefault(),C?A({focusSelect:!0,fromEvent:e}):ne({fromEvent:e});break;case p:if(!C)return;a||e.preventDefault(),A({focusSelect:!a,fromEvent:e});break;default:!m&&n.match(/^Key/)&&(e.preventDefault(),e.stopPropagation(),j(n.replace(/^Key/,``),{select:!C,fromEvent:e}))}},[D,k,C,ne,j,A]),P=(0,_.useCallback)(e=>{ae(e),i?.(e)},[ae,i]),oe=(0,_.useCallback)(e=>{D(e)},[D]),F=(0,_.useCallback)(t=>{C||(O(),e?.(t))},[O,e,C]),I=(0,_.useCallback)(e=>{O(),r?.(e)},[O,r]),se=(0,_.useCallback)(e=>{m.current=e,y.current!==void 0&&E(y.current)},[E]),ce=(0,_.useCallback)((e,t)=>{h.current[t]=e,y.current===t&&E(y.current)},[E]);return(0,_.useEffect)(()=>{if(!C)return()=>{};let e=e=>{let t=e.target;p.current?.contains(t)||(e.preventDefault(),k({focusSelect:!1,fromEvent:e}))};return document.addEventListener(`mousedown`,e),()=>{document.removeEventListener(`mousedown`,e)}},[k,C,p]),(0,_.useMemo)(()=>({activeOption:ee,handleActivateOptionIndex:oe,handleBlur:F,handleButtonKeyDown:P,handleDropdownKeyDown:ae,handleFocus:I,handleMouseDown:M,handleOptionClick:N,handleSetDropdownRef:se,handleSetOptionRef:ce,open:C,selectedOption:T}),[ee,oe,F,P,I,ae,M,N,se,ce,C,T])},Si=(0,_.forwardRef)(({className:e,defaultValue:t,disabled:n,onChange:r,options:i,readOnly:a,style:o,value:s,variant:c,width:l,...u},d)=>{let{isEnabled:f,options:p,setValue:m,value:h,DropdownButton:g,Wrapper:v}=vi({defaultValue:t,disabled:n,native:!0,onChange:r,options:i,readOnly:a,value:s,variant:c}),y=(0,_.useCallback)(e=>{let t=p.find(t=>t.value===e.target.value);t&&(m(t.value),r?.(t,{fromEvent:e}))},[r,p,m]);return _.createElement(v,{className:e,style:{...o,width:l}},_.createElement(si,null,_.createElement(fi,{...u,disabled:n,onChange:f?y:rr,ref:d,value:h},p.map((e,t)=>_.createElement(`option`,{key:`${e.value}-${t}`,value:e.value},e.label??e.value))),g))});Si.displayName=`SelectNative`;function Ci({activateOptionIndex:e,active:t,index:n,onClick:r,option:i,selected:a,setRef:o}){let s=(0,_.useCallback)(()=>{e(n)},[e,n]),c=(0,_.useCallback)(e=>{o(e,n)},[n,o]),l=ii();return _.createElement(gi,{active:t,"aria-selected":a?`true`:void 0,"data-value":i.value,id:l,onClick:r,onMouseEnter:s,ref:c,role:`option`,tabIndex:0},i.label)}function wi({"aria-label":e,"aria-labelledby":t,className:n,defaultValue:r,disabled:i=!1,formatDisplay:a,inputProps:o,labelId:s,menuMaxHeight:c,name:l,onBlur:u,onChange:d,onClose:f,onFocus:p,onKeyDown:m,onMouseDown:h,onOpen:g,open:v,options:y,readOnly:b,shadow:x=!0,style:S,variant:C=`default`,value:w,width:T=`auto`,...ee},te){let{isEnabled:E,options:D,setValue:ne,value:O,wrapperProps:k,DropdownButton:re,Wrapper:ie}=vi({className:n,defaultValue:r,disabled:i,native:!1,onChange:d,options:y,style:S,readOnly:b,value:w,variant:C,width:T}),A=(0,_.useRef)(null),j=(0,_.useRef)(null),M=(0,_.useRef)(null),{activeOption:N,handleActivateOptionIndex:ae,handleBlur:P,handleButtonKeyDown:oe,handleDropdownKeyDown:F,handleFocus:I,handleMouseDown:se,handleOptionClick:ce,handleSetDropdownRef:le,handleSetOptionRef:ue,open:de,selectedOption:fe}=xi({onBlur:u,onChange:d,onClose:f,onFocus:p,onKeyDown:m,onMouseDown:h,onOpen:g,open:v,options:D,value:O,selectRef:j,setValue:ne,wrapperRef:M});(0,_.useImperativeHandle)(te,()=>({focus:e=>{var t;(t=j.current)==null||t.focus(e)},node:A.current,value:String(O)}),[O]);let pe=(0,_.useMemo)(()=>fe?typeof a==`function`?a(fe):fe.label:``,[a,fe]),L=E?1:void 0,me=(0,_.useMemo)(()=>c?{overflow:`auto`,maxHeight:c}:void 0,[c]),he=ii(),ge=(0,_.useMemo)(()=>D.map((e,t)=>{let n=`${O}-${t}`,r=e===N,i=e===fe;return _.createElement(Ci,{activateOptionIndex:ae,active:r,index:t,key:n,onClick:ce,option:e,selected:i,setRef:ue})}),[N,ae,ce,ue,D,fe,O]);return _.createElement(ie,{...k,$disabled:i,ref:M,shadow:x,style:{...S,width:T}},_.createElement(`input`,{name:l,ref:A,type:`hidden`,value:String(O),...o}),_.createElement(si,{"aria-disabled":i,"aria-expanded":de,"aria-haspopup":`listbox`,"aria-label":e,"aria-labelledby":t??s,"aria-owns":E&&de?he:void 0,onBlur:P,onFocus:I,onKeyDown:oe,onMouseDown:E?se:h,ref:j,role:`button`,tabIndex:L,...ee},_.createElement(ci,null,pe),re),E&&de&&_.createElement(hi,{id:he,onKeyDown:F,ref:le,role:`listbox`,style:me,tabIndex:0,variant:C},ge))}var Ti=(0,_.forwardRef)(wi);Ti.displayName=`Select`;var Ei=z.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${e=>e.noPadding?`0`:`4px`};
`,Di=(0,_.forwardRef)(function({children:e,noPadding:t=!1,...n},r){return _.createElement(Ei,{noPadding:t,ref:r,...n},e)});Di.displayName=`Toolbar`;var Oi=z.div`
  padding: 16px;
`,ki=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(Oi,{ref:n,...t},e)});ki.displayName=`WindowContent`;var Ai=z.div`
  height: 33px;
  line-height: 33px;
  padding-left: 0.25rem;
  padding-right: 3px;
  font-weight: bold;
  border: 2px solid ${({theme:e})=>e.material};
  ${({active:e})=>e===!1?R`
          background: ${({theme:e})=>e.headerNotActiveBackground};
          color: ${({theme:e})=>e.headerNotActiveText};
        `:R`
          background: ${({theme:e})=>e.headerBackground};
          color: ${({theme:e})=>e.headerText};
        `}

  ${pr} {
    padding-left: 0;
    padding-right: 0;
    height: 27px;
    width: 31px;
  }
`,ji=(0,_.forwardRef)(function({active:e=!0,children:t,...n},r){return _.createElement(Ai,{active:e,ref:r,...n},t)});ji.displayName=`WindowHeader`;var Mi=z.div`
  position: relative;
  padding: 4px;
  font-size: 1rem;
  ${Jn({style:`window`})}
  ${Un()}
`,V=z.span`
  ${({theme:e})=>R`
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
`,Ni=(0,_.forwardRef)(({children:e,resizable:t=!1,resizeRef:n,shadow:r=!0,...i},a)=>_.createElement(Mi,{ref:a,shadow:r,...i},e,t&&_.createElement(V,{"data-testid":`resizeHandle`,ref:n})));Ni.displayName=`Window`;var Pi=z(Cr)`
  width: 234px;
  margin: 1rem 0;
  background: ${({theme:e})=>e.canvas};
`,Fi=z.div`
  display: flex;
  background: ${({theme:e})=>e.materialDark};
  color: #dfe0e3;
`,Ii=z.div`
  display: flex;
  flex-wrap: wrap;
`,Li=z.div`
  text-align: center;
  height: 1.5em;
  line-height: 1.5em;
  width: 14.28%;
`,Ri=z.span`
  cursor: pointer;

  background: ${({active:e,theme:t})=>e?t.hoverBackground:`transparent`};
  color: ${({active:e,theme:t})=>e?t.canvasTextInvert:t.canvasText};

  &:hover {
    border: 2px dashed
      ${({theme:e,active:t})=>t?`none`:e.materialDark};
  }
`,zi=[{value:0,label:`January`},{value:1,label:`February`},{value:2,label:`March`},{value:3,label:`April`},{value:4,label:`May`},{value:5,label:`June`},{value:6,label:`July`},{value:7,label:`August`},{value:8,label:`September`},{value:9,label:`October`},{value:10,label:`November`},{value:11,label:`December`}];function Bi(e,t){return new Date(e,t+1,0).getDate()}function Vi(e,t,n){return new Date(e,t,n).getDay()}function Hi(e){let t=new Date(Date.parse(e));return{day:t.getUTCDate(),month:t.getUTCMonth(),year:t.getUTCFullYear()}}var Ui=(0,_.forwardRef)(({className:e,date:t=new Date().toISOString(),onAccept:n,onCancel:r,shadow:i=!0},a)=>{let[o,s]=(0,_.useState)(()=>Hi(t)),{year:c,month:l,day:u}=o,d=(0,_.useCallback)(({value:e})=>{s(t=>({...t,month:e}))},[]),f=(0,_.useCallback)(e=>{s(t=>({...t,year:e}))},[]),p=(0,_.useCallback)(e=>{s(t=>({...t,day:e}))},[]),m=(0,_.useCallback)(()=>{let e=[o.year,o.month+1,o.day].map(e=>String(e).padStart(2,`0`)).join(`-`);n?.(e)},[o.day,o.month,o.year,n]),h=(0,_.useMemo)(()=>{let e=Array.from({length:42}),t=Vi(c,l,1),n=u,r=Bi(c,l);return n=n<r?n:r,e.forEach((i,a)=>{if(a>=t&&a<r+t){let r=a-t+1;e[a]=_.createElement(Li,{key:a,onClick:()=>{p(r)}},_.createElement(Ri,{active:r===n},r))}else e[a]=_.createElement(Li,{key:a})}),e},[u,p,l,c]);return _.createElement(Ni,{className:e,ref:a,shadow:i,style:{margin:20}},_.createElement(ji,null,_.createElement(`span`,{role:`img`,"aria-label":`📆`},`📆`),`Date`),_.createElement(ki,null,_.createElement(Di,{noPadding:!0,style:{justifyContent:`space-between`}},_.createElement(Ti,{options:zi,value:l,onChange:d,width:128,menuMaxHeight:200}),_.createElement(ni,{value:c,onChange:f,width:100})),_.createElement(Pi,null,_.createElement(Fi,null,_.createElement(Li,null,`S`),_.createElement(Li,null,`M`),_.createElement(Li,null,`T`),_.createElement(Li,null,`W`),_.createElement(Li,null,`T`),_.createElement(Li,null,`F`),_.createElement(Li,null,`S`)),_.createElement(Ii,null,h)),_.createElement(Di,{noPadding:!0,style:{justifyContent:`space-between`}},_.createElement(B,{fullWidth:!0,onClick:r,disabled:!r},`Cancel`),_.createElement(B,{fullWidth:!0,onClick:n?m:void 0,disabled:!n},`OK`))))});Ui.displayName=`DatePicker`;var Wi=e=>{switch(e){case`status`:case`well`:return R`
        ${Jn({style:`status`})}
      `;case`window`:case`outside`:return R`
        ${Jn({style:`window`})}
      `;case`field`:return R`
        ${Jn({style:`field`})}
      `;default:return R`
        ${Jn()}
      `}},Gi=z.div`
  position: relative;
  font-size: 1rem;
  ${({variant:e})=>Wi(e)}
  ${({variant:e})=>Un(e===`field`?{background:`canvas`,color:`canvasText`}:void 0)}
`,Ki=(0,_.forwardRef)(({children:e,shadow:t=!1,variant:n=`window`,...r},i)=>_.createElement(Gi,{ref:i,shadow:t,variant:n,...r},e));Ki.displayName=`Frame`;var qi=z.fieldset`
  position: relative;
  border: 2px solid
    ${({theme:e,variant:t})=>t===`flat`?e.flatDark:e.borderLightest};
  padding: 16px;
  margin-top: 8px;
  font-size: 1rem;
  color: ${({theme:e})=>e.materialText};
  ${({variant:e})=>e!==`flat`&&R`
      box-shadow: -1px -1px 0 1px ${({theme:e})=>e.borderDark},
        inset -1px -1px 0 1px ${({theme:e})=>e.borderDark};
    `}
  ${e=>e.$disabled&&Hn()}
`,Ji=z.legend`
  display: flex;
  position: absolute;
  top: 0;
  left: 8px;
  transform: translateY(calc(-50% - 2px));
  padding: 0 8px;

  font-size: 1rem;
  background: ${({theme:e,variant:t})=>t===`flat`?e.canvas:e.material};
`,Yi=(0,_.forwardRef)(({label:e,disabled:t=!1,variant:n=`default`,children:r,...i},a)=>_.createElement(qi,{"aria-disabled":t,$disabled:t,variant:n,ref:a,...i},e&&_.createElement(Ji,{variant:n},e),r));Yi.displayName=`GroupBox`;var Xi=z.div`
  ${({theme:e,size:t=`100%`})=>`
  display: inline-block;
  box-sizing: border-box;
  height: ${sr(t)};
  width: 5px;
  border-top: 2px solid ${e.borderLightest};
  border-left: 2px solid ${e.borderLightest};
  border-bottom: 2px solid ${e.borderDark};
  border-right: 2px solid ${e.borderDark};
  background: ${e.material};
`}
`;Xi.displayName=`Handle`;var Zi=`url('data:image/gif;base64,R0lGODlhPAA8APQAADc3N6+vr4+Pj05OTvn5+V1dXZ+fn29vby8vLw8PD/X19d/f37S0tJSUlLq6und3d39/f9XV1c/Pz+bm5qamphkZGWZmZsbGxr+/v+rq6tra2u/v7yIiIv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBAAfACH+I1Jlc2l6ZWQgb24gaHR0cHM6Ly9lemdpZi5jb20vcmVzaXplACwAAAAAPAA8AAAF/+AnjmRpnmiqrmzrvnAsz3Rt37jr7Xzv/8BebhQsGn1D0XFZTH6YUGQySvU4fYKAdsvtdi1Cp3In6ZjP6HTawBMTyWbFYk6v18/snXvsKXciUApmeVZ7PH6ATIIdhHtPcB0TDQ1gQBCTBINthpBnAUEaa5tuh2mfQKFojZx9aRMSEhA7FLAbonqsfmoUOxFqmriknWm8Hr6/q8IeCAAAx2cTERG2aBTNHMGOj8a/v8WF2m/c3cSj4SQ8C92n4Ocm6evm7ui9CosdBPbs8yo8E2YO5PE74Q+gwIElCnYImA3hux3/Fh50yCciw3YUt2GQtiiDtGQO4f3al1GkGpIDeXlg0KDhXpoMLBtMVPaMnJlv/HjUtIkzHA8HEya4tLkhqICGV4bZVAMyaaul3ZpOUQoVz8wbpaoyvWojq1ZVXGt4/QoM49SnZMs6GktW6hC2X93mgKtVbtceWbzo9VIJKdYqUJwCPiJ4cJOzhg+/TWwko+PHkCNLdhgCACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCACH5BAUEAB8ALBYADAAQAA0AAAVFYCeOZPmVaKqimeO+MPxFXv3d+F17Cm3nuJ1ic7lAdroapUjABZCfnQb4ef6k1OHGULtsNk3qjVKLiIFkj/mMIygU4VwIACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCACH5BAUEAB8ALBkAIwAKAAcAAAUp4CdehrGI6Ed5XpSKa4teguBoGlVPAXuJBpam5/l9gh7NZrFQiDJMRQgAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsFgAPABAAIQAABVBgJ45kaZ5oakZB67bZ+M10bd94ru987//AoHBILNYYAsGlR/F4IkwnlLeZTBQ9UlaWwzweERHjuzAKFZkMYYZWm4mOw0ETfdanO8Vms7aFAAAh+QQFBAAfACwAAAAAAQABAAAFA+AXAgAh+QQFBAAfACwZABIACgAeAAAFUGAnjmRpnij5rerqtu4Hx3Rt33iu758iZrUZa1TDCASLGsXjiSiZzmFnM5n4TNJSdmREElfL5lO8cgwGACbgrAkwPat3+x1naggKRS+f/4QAACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCACH5BAUEAB8ALBYAIwAQAA0AAAVE4CeOXdmNaGqeabu27SUIC5xSnifZKK7zl8djkCsIaylGziNaakaEzcbH/Cwl0k9kuWxyPYptzrZULA7otFpNIK1eoxAAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkEBQQAHwAsAAAAAAEAAQAABQPgFwIAIfkECQQAHwAsDgAEACAANAAABTHgJ45kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/Y7CoEACH5BAUEAB8ALAAAAAA8ADwAAAX/4CeOZGmeaKqubFt6biy3Xj3fuFjveU/vPJ/wBAQOj6RiEClUGpk9IMAJxQEdmQK1Grt2OhutkvurOb7f8JaM8qLT4iKbuDu/0erxfOS+4+NPex9mfn55coIfCAuFhoBLbDUAjI1vh4FkOxSVd5eQXB4GnI5rXAAbo6R6VTUFqKmWjzasNaKwsaVIHhAEt3cLTjBQA6++XwoHuUM1vMYdyMorwoN8wkC2t9A8s102204Wxana3DNAAQO1FjUCEDXhvuTT5nUdEwOiGxa8BBDwXxKaLTiAKoMFRvJy9CmmoFcHAgrQSEiwKwICDwU0pAMQIdmnboR8TfwWrJyMPrAiz1DkNs2aSRbe6hnr99LEvDJ9IB5DQ8Dhm36glNh5COGBAmQNHrbz+WXBFChOTqFx5+GBxwYCmL1ZcPHmMiWuvkTgECzBBUvrvH4tErbDWCcYDB2IBPbV2yJJ72SZ46TtXSB5v2RIp1ZXXbFkgWxCc68mk752E3tY/OZeIsiIaxi9o+BBokGH3SZ+4FPbZ8yiPQxNeDl0hNUeHWcKjYb1Zx20bd/GzRaV7t28gRSYELvw7pIfgVcLplwF8+bOo0Ffjmm6zerWrxvPzoe79w8hAAAh+QQJBAAfACwBAAEAOgA6AAAFRuAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9isdsvter/gsHhMLpvP6LR6zW673/D4MgQAIfkEBQQAHwAsAAAAADwAPAAABf/gJ45kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyJxnyTQym6nn0ilVSa9XGHY7jXKx2m/WK36Gy1CUVCBpu9+OtNqDeNslgip5Gej4/4ATcidLAICHHQF6c0x9iH+CXV6Gj36KZnsejgsREQSACp0Yg0ydEZWWi4RPjgdLG48apEuogJeDJVKtr7GzHrV/t5KrjX6uHhQMF4cKCwujTxHOwKmYjHzGTw+VEVIK1MGqJrrZTNuP3U/f4IniuazlSwMUFMugE/j47NW4JOQdx9bsoybMgxV4ALEIGAis4MFiCZkUaLPgUAYHGDF+Yucw0y5z3Lzt63hNUzwP5xCRpWOyDhxJYtgiStBQEVCGAAEM6MLp0p0/hMdgIZI17AOTntZgmowo9BBRgz9/EfQ54h8BBS39bKDXwBc9CrVejkNYKRLUSWGpivhXtt9PSpXEvmNiwYDdu3jzFB3LAa9fAxbUGkXjtmSZh4TPJM4kRgbhvVEL9xhTEongJJgza97MubPnz6BDix5NurTp0yJCAAAh+QQJBAAfACwEAA4ANAAgAAAFMeAnjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgsGo/IpHLJbDqf0Kh0Sq1ar9jsKgQAIfkEBQQAHwAsAAAAADwAPAAABf/gJ45kaZ5oqq5s6bVwLHu0bN8uXeM8rP+9YOoHFBpHRN1xmSwue02A82lrFjaOKbVl3XQ6WeWWm7x+v+HdeFj2ntHaNbL9jUAI5/RLTurWOR53eXFbfh0RgB4PCm9hfCKGiDSLb18Bjx+RiR4HjG8TA3trmkSdZxuhalSkRA2VBqpPrD+ulR0Go3SHmz8CeG8bFqJMupJNHr5nCsKxQccTg4oUNA0YCYG/HQQQYsSlnmCUFLUXgm8EAsPeP6Zf2baV2+rEmTrt8PDyzS7O9uD4b5YV2VGjGw52/wB+CaYjlQcpNBAQioHwy4QMCxe4i3BKGIQN3K7AArBATz8anUDADcgQDMGCbQkknDKAh4ABNxQ0gpnoQ8eDVAUO0ADAzUNMhbZMQiG4R4mOo0gb8eTCQgeEqJVM7juCDWvWJnI4ev2aZIwHl2PfZIBIZBXKtAsLgC1kJu0GuWXNaoB7d67ZlWP75jVLw4JXwW35PNSJFPFUrmIb402smFNCW44N5kJ5+dTkx+vuAfus+VHF0X4xzeHsObXq1ZY7ZN76mt0C0rRf1zuWW/du175PHAu+YjhxFcCPm6CsHHnv5kig6w4BACH5BAkEAB8ALAEAAQA6ADoAAAVG4CeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/otHrNbrvf8PgyBAAh+QQFBAAfACwAAAAAPAA8AAAF/+AnjmRpnmiqrmzrvnAsz3Rt37jr7Xzv/8BebhQsGn1D0XFZTH6YUGQySvU4fYKAdsvtdi1Cp3In6ZjP6HTawBMTyWbFYk6v18/snXvsKXciUApmeVZ7PH6ATIIdhHtPcB0TDQ1gQBCTBINthpBnAUEaa5tuh2mfQKFojZx9aRMSEhA7FLAbonqsfmoUOxFqmriknWm8Hr6/q8IeCAAAx2cTERG2aBTNHMGOj8a/v8WF2m/c3cSj4SQ8C92n4Ocm6evm7ui9CosdBPbs8yo8E2YO5PE74Q+gwIElCnYImA3hux3/Fh50yCciw3YUt2GQtiiDtGQO4f3al1GkGpIDeXlg0KDhXpoMLBtMVPaMnJlv/HjUtIkzHA8HEya4tLkhqICGV4bZVAMyaaul3ZpOUQoVz8wbpaoyvWojq1ZVXGt4/QoM49SnZMs6GktW6hC2X93mgKtVbtceWbzo9VIJKdYqUJwCPiJ4cJOzhg+/TWwko+PHkCNLdhgCACH5BAUEAB8ALAAAAAABAAEAAAUD4BcCADs=')`,Qi=z.div`
  display: inline-block;
  height: ${({size:e})=>sr(e)};
  width: ${({size:e})=>sr(e)};
`,$i=z.span`
  display: block;
  background: ${Zi};
  background-size: cover;
  width: 100%;
  height: 100%;
`,ea=(0,_.forwardRef)(({size:e=30,...t},n)=>_.createElement(Qi,{size:e,ref:n,...t},_.createElement($i,null)));ea.displayName=`Hourglass`;var ta=z.div`
  position: relative;
  display: inline-block;
  padding-bottom: 26px;
`,na=z.div`
  position: relative;
`,ra=z.div`
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
`,ia=z(xr).attrs(()=>({"data-testid":`background`}))`
  width: 100%;
  height: 100%;
`,aa=z.div`
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
`,oa=(0,_.forwardRef)(({backgroundStyles:e,children:t,...n},r)=>_.createElement(ta,{ref:r,...n},_.createElement(na,null,_.createElement(ra,null,_.createElement(ia,{style:e},t)),_.createElement(aa,null))));oa.displayName=`Monitor`;var sa=z.div`
  display: inline-block;
  height: ${dr.md};
  width: 100%;
`,ca=z(xr)`
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  padding: 0;
  overflow: hidden;
  &:before {
    z-index: 1;
  }
`,la=R`
  width: calc(100% - 4px);
  height: calc(100% - 4px);

  display: flex;
  align-items: center;
  justify-content: space-around;
`,ua=z.div`
  position: relative;
  top: 4px;
  ${la}
  background: ${({theme:e})=>e.canvas};
  color: #000;
  margin-left: 2px;
  margin-top: -2px;
  color: ${({theme:e})=>e.materialText};
`,da=z.div`
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
`,fa=z.div`
  width: calc(100% - 6px);
  height: calc(100% - 8px);
  position: absolute;
  left: 3px;
  top: 4px;
  box-sizing: border-box;
  display: inline-flex;
`,pa=17,ma=z.span`
  display: inline-block;
  width: ${pa}px;
  box-sizing: border-box;
  height: 100%;
  background: ${({theme:e})=>e.progress};
  border-color: ${({theme:e})=>e.material};
  border-width: 0px 1px;
  border-style: solid;
`,ha=(0,_.forwardRef)(({hideValue:e=!1,shadow:t=!0,value:n,variant:r=`default`,...i},a)=>{let o=e?null:`${n}%`,s=(0,_.useRef)(null),[c,l]=(0,_.useState)([]),u=(0,_.useCallback)(()=>{if(!s.current||n===void 0)return;let e=s.current.getBoundingClientRect().width,t=Math.round(n/100*e/pa);l(Array.from({length:t}))},[n]);return(0,_.useEffect)(()=>(u(),window.addEventListener(`resize`,u),()=>window.removeEventListener(`resize`,u)),[u]),_.createElement(sa,{"aria-valuenow":n===void 0?void 0:Math.round(n),ref:a,role:`progressbar`,variant:r,...i},_.createElement(ca,{variant:r,shadow:t},r===`default`?_.createElement(_.Fragment,null,_.createElement(ua,{"data-testid":`defaultProgress1`},o),_.createElement(da,{"data-testid":`defaultProgress2`,value:n},o)):_.createElement(fa,{ref:s,"data-testid":`tileProgress`},c.map((e,t)=>_.createElement(ma,{key:t})))))});ha.displayName=`ProgressBar`;var ga=R`
  width: ${20}px;
  height: ${20}px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 0.5rem;
`,_a=z(xr)`
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
`,va=z.div`
  ${Gn()}
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
`,ya=z.span.attrs(()=>({"data-testid":`checkmarkIcon`}))`
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
`,ba={flat:va,default:_a},xa=(0,_.forwardRef)(({checked:e,className:t=``,disabled:n=!1,label:r=``,onChange:i,style:a={},variant:o=`default`,...s},c)=>{let l=ba[o];return _.createElement(yr,{$disabled:n,className:t,style:a},_.createElement(l,{$disabled:n,role:`presentation`},e&&_.createElement(ya,{$disabled:n,variant:o})),_.createElement(vr,{disabled:n,onChange:n?void 0:i,readOnly:n,type:`radio`,checked:e,ref:c,...s}),r&&_.createElement(br,null,r))});xa.displayName=`Radio`;var Sa=typeof window<`u`?_.useLayoutEffect:_.useEffect;function Ca(e){let t=_.useRef(e);return Sa(()=>{t.current=e}),_.useCallback((...e)=>(0,t.current)(...e),[])}function wa(e,t){typeof e==`function`?e(t):e&&(e.current=t)}function Ta(e,t){return(0,_.useMemo)(()=>e==null&&t==null?null:n=>{wa(e,n),wa(t,n)},[e,t])}var Ea=m(),Da=!0,Oa=!1,ka,Aa={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function ja(e){if(`type`in e){let{type:t,tagName:n}=e;if(n===`INPUT`&&Aa[t]&&!e.readOnly||n===`TEXTAREA`&&!e.readOnly)return!0}return!!(`isContentEditable`in e&&e.isContentEditable)}function Ma(e){e.metaKey||e.altKey||e.ctrlKey||(Da=!0)}function Na(){Da=!1}function Pa(){this.visibilityState===`hidden`&&Oa&&(Da=!0)}function Fa(e){e.addEventListener(`keydown`,Ma,!0),e.addEventListener(`mousedown`,Na,!0),e.addEventListener(`pointerdown`,Na,!0),e.addEventListener(`touchstart`,Na,!0),e.addEventListener(`visibilitychange`,Pa,!0)}function Ia(e){let{target:t}=e;try{return t.matches(`:focus-visible`)}catch{}return Da||ja(t)}function La(){Oa=!0,window.clearTimeout(ka),ka=window.setTimeout(()=>{Oa=!1},100)}function Ra(){return{isFocusVisible:Ia,onBlurVisible:La,ref:(0,_.useCallback)(e=>{let t=(0,Ea.findDOMNode)(e);t!=null&&Fa(t.ownerDocument)},[])}}function za(e,t,n){return(n-t)*e+t}function Ba(e,t){if(t!==void 0&&`changedTouches`in e){for(let n=0;n<e.changedTouches.length;n+=1){let r=e.changedTouches[n];if(r.identifier===t)return{x:r.clientX,y:r.clientY}}return!1}return`clientX`in e?{x:e.clientX,y:e.clientY}:!1}function Va(e){return e&&e.ownerDocument||document}function Ha(e,t){let{index:n}=e.reduce((e,n,r)=>{let i=Math.abs(t-n);return e===null||i<e.distance||i===e.distance?{distance:i,index:r}:e},null)??{};return n??-1}var Ua=z.div`
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

  ${({orientation:e,size:t})=>e===`vertical`?R`
          height: ${t};
          margin-right: 1.5rem;
          &:before {
            left: -6px;
            top: -15px;
            height: calc(100% + 30px);
            width: ${({hasMarks:e})=>e?`41px`:`39px`};
          }
        `:R`
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
`,Wa=()=>R`
  position: absolute;
  ${({orientation:e})=>e===`vertical`?R`
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 100%;
          width: 8px;
        `:R`
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 8px;
          width: 100%;
        `}
`,Ga=z(xr)`
  ${Wa()}
`,Ka=z(xr)`
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
`,qa=z.span`
  position: relative;
  ${({orientation:e})=>e===`vertical`?R`
          width: 32px;
          height: 18px;
          right: 2px;
          transform: translateY(-50%);
        `:R`
          height: 32px;
          width: 18px;
          top: 2px;
          transform: translateX(-50%);
        `}
  ${({variant:e})=>e===`flat`?R`
          ${Gn()}
          outline: 2px solid ${({theme:e})=>e.flatDark};
          background: ${({theme:e})=>e.flatLight};
        `:R`
          ${Un()}
          ${Jn()}
          &:focus {
            outline: none;
          }
        `}
    ${({$disabled:e,theme:t})=>e&&Wn({mainColor:t.material,secondaryColor:t.borderLightest})}
`,Ja=6,Ya=z.span`
  display: inline-block;
  position: absolute;

  ${({orientation:e})=>e===`vertical`?R`
          right: ${-Ja-2}px;
          bottom: 0px;
          transform: translateY(1px);
          width: ${Ja}px;
          border-bottom: 2px solid ${({theme:e})=>e.materialText};
        `:R`
          bottom: ${-Ja}px;
          height: ${Ja}px;
          transform: translateX(-1px);
          border-left: 1px solid ${({theme:e})=>e.materialText};
          border-right: 1px solid ${({theme:e})=>e.materialText};
        `}

  color:  ${({theme:e})=>e.materialText};
  ${({$disabled:e,theme:t})=>e&&R`
      ${Hn()}
      box-shadow: 1px 1px 0px ${t.materialTextDisabledShadow};
      border-color: ${t.materialTextDisabled};
    `}
`,Xa=z.div`
  position: absolute;
  bottom: 0;
  left: 0;
  line-height: 1;
  font-size: 0.875rem;

  ${({orientation:e})=>e===`vertical`?R`
          transform: translate(${Ja+2}px, ${Ja+1}px);
        `:R`
          transform: translate(-0.5ch, calc(100% + 2px));
        `}
`,Za=(0,_.forwardRef)(({defaultValue:e,disabled:t=!1,marks:n=!1,max:r=100,min:i=0,name:a,onChange:o,onChangeCommitted:s,onMouseDown:c,orientation:l=`horizontal`,size:u=`100%`,step:d=1,value:f,variant:p=`default`,...m},h)=>{let g=p===`flat`?Ka:Ga,v=l===`vertical`,[y=i,b]=mr({defaultValue:e,onChange:o??s,value:f}),{isFocusVisible:x,onBlurVisible:S,ref:C}=Ra(),[w,T]=(0,_.useState)(!1),ee=(0,_.useRef)(),te=(0,_.useRef)(null),E=Ta(h,Ta(C,ee)),D=Ca(e=>{x(e)&&T(!0)}),ne=Ca(()=>{w!==!1&&(T(!1),S())}),O=(0,_.useRef)(),k=(0,_.useMemo)(()=>n===!0&&Number.isFinite(d)?[...Array(Math.round((r-i)/d)+1)].map((e,t)=>({label:void 0,value:i+d*t})):Array.isArray(n)?n:[],[n,r,i,d]),re=Ca(e=>{let t=(r-i)/10,n=k.map(e=>e.value),a=n.indexOf(y),c=0;switch(e.key){case`Home`:c=i;break;case`End`:c=r;break;case`PageUp`:d&&(c=y+t);break;case`PageDown`:d&&(c=y-t);break;case`ArrowRight`:case`ArrowUp`:c=d?y+d:n[a+1]||n[n.length-1];break;case`ArrowLeft`:case`ArrowDown`:c=d?y-d:n[a-1]||n[0];break;default:return}e.preventDefault(),d&&(c=or(c,d,i)),c=ir(c,i,r),b(c),T(!0),o?.(c),s?.(c)}),ie=(0,_.useCallback)(e=>{if(!ee.current)return 0;let t=ee.current.getBoundingClientRect(),n;n=v?(t.bottom-e.y)/t.height:(e.x-t.left)/t.width;let a;if(a=za(n,i,r),d)a=or(a,d,i);else{let e=k.map(e=>e.value);a=e[Ha(e,a)]}return a=ir(a,i,r),a},[k,r,i,d,v]),A=Ca(e=>{var t;let n=Ba(e,O.current);if(!n)return;let r=ie(n);(t=te.current)==null||t.focus(),b(r),T(!0),o?.(r)}),j=Ca(e=>{let t=Ba(e,O.current);if(!t)return;let n=ie(t);s?.(n),O.current=void 0;let r=Va(ee.current);r.removeEventListener(`mousemove`,A),r.removeEventListener(`mouseup`,j),r.removeEventListener(`touchmove`,A),r.removeEventListener(`touchend`,j)}),M=Ca(e=>{var t;c?.(e),e.preventDefault(),(t=te.current)==null||t.focus(),T(!0);let n=Ba(e,O.current);if(n){let e=ie(n);b(e),o?.(e)}let r=Va(ee.current);r.addEventListener(`mousemove`,A),r.addEventListener(`mouseup`,j)}),N=Ca(e=>{var t;e.preventDefault();let n=e.changedTouches[0];n!=null&&(O.current=n.identifier),(t=te.current)==null||t.focus(),T(!0);let r=Ba(e,O.current);if(r){let e=ie(r);b(e),o?.(e)}let i=Va(ee.current);i.addEventListener(`touchmove`,A),i.addEventListener(`touchend`,j)});return(0,_.useEffect)(()=>{let{current:e}=ee;e?.addEventListener(`touchstart`,N);let t=Va(e);return()=>{e?.removeEventListener(`touchstart`,N),t.removeEventListener(`mousemove`,A),t.removeEventListener(`mouseup`,j),t.removeEventListener(`touchmove`,A),t.removeEventListener(`touchend`,j)}},[j,A,N]),_.createElement(Ua,{$disabled:t,hasMarks:!!k.length,isFocused:w,onMouseDown:M,orientation:l,ref:E,size:sr(u),...m},_.createElement(`input`,{disabled:t,name:a,type:`hidden`,value:y??0}),k&&k.map(e=>_.createElement(Ya,{$disabled:t,"data-testid":`tick`,key:e.value/(r-i)*100,orientation:l,style:{[v?`bottom`:`left`]:`${(e.value-i)/(r-i)*100}%`}},e.label&&_.createElement(Xa,{"aria-hidden":!0,"data-testid":`mark`,orientation:l},e.label))),_.createElement(g,{orientation:l,variant:p}),_.createElement(qa,{$disabled:t,"aria-disabled":t?!0:void 0,"aria-orientation":l,"aria-valuemax":r,"aria-valuemin":i,"aria-valuenow":y,onBlur:ne,onFocus:D,onKeyDown:re,orientation:l,ref:te,role:`slider`,style:{[v?`bottom`:`left`]:`${(v?-100:0)+100*(y-i)/(r-i)}%`},tabIndex:t?void 0:0,variant:p}))});Za.displayName=`Slider`;var Qa=z.tbody`
  background: ${({theme:e})=>e.canvas};
  display: table-row-group;
  box-shadow: ${Vn};
  overflow-y: auto;
`,$a=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(Qa,{ref:n,...t},e)});$a.displayName=`TableBody`;var eo=z.td`
  padding: 0 8px;
`,H=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(eo,{ref:n,...t},e)});H.displayName=`TableDataCell`;var to=z.thead`
  display: table-header-group;
`,no=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(to,{ref:n,...t},e)});no.displayName=`TableHead`;var ro=z.th`
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
    ${Jn()}

    border-left: none;
    border-top: none;
  }
  ${({$disabled:e})=>!e&&R`
      &:active {
        &:before {
          ${Jn({invert:!0,style:`window`})}
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
  ${({$disabled:e})=>e&&Hn()}
  &:hover {
    color: ${({theme:e})=>e.materialText};
    ${({$disabled:e})=>e&&Hn()}
  }
`,io=(0,_.forwardRef)(function({disabled:e=!1,children:t,onClick:n,onTouchStart:r=rr,sort:i,...a},o){let s=i===`asc`?`ascending`:i===`desc`?`descending`:void 0;return _.createElement(ro,{$disabled:e,"aria-disabled":e,"aria-sort":s,onClick:e?void 0:n,onTouchStart:e?void 0:r,ref:o,...a},_.createElement(`div`,null,t))});io.displayName=`TableHeadCell`;var ao=z.tr`
  color: inherit;
  display: table-row;
  height: calc(${dr.md} - 2px);
  line-height: calc(${dr.md} - 2px);
  vertical-align: middle;
  outline: none;

  color: ${({theme:e})=>e.canvasText};
  &:hover {
    background: ${({theme:e})=>e.hoverBackground};
    color: ${({theme:e})=>e.canvasTextInvert};
  }
`,oo=(0,_.forwardRef)(function({children:e,...t},n){return _.createElement(ao,{ref:n,...t},e)});oo.displayName=`TableRow`;var so=z.table`
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1rem;
`,co=z(xr)`
  &:before {
    box-shadow: none;
  }
`,lo=(0,_.forwardRef)(({children:e,...t},n)=>_.createElement(co,null,_.createElement(so,{ref:n,...t},e)));lo.displayName=`Table`;var U=z.button`
  ${Un()}
  ${Jn()}
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: ${dr.md};
  line-height: ${dr.md};
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
    ${Yn}
    outline-offset: -6px;
  }
  ${e=>e.selected&&`
    z-index: 1;
    height: calc(${dr.md} + 4px);
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
`,W=(0,_.forwardRef)(({value:e,onClick:t,selected:n=!1,children:r,...i},a)=>_.createElement(U,{"aria-selected":n,selected:n,onClick:n=>t?.(e,n),ref:a,role:`tab`,...i},r));W.displayName=`Tab`;var uo=z.div`
  ${Un()}
  ${Jn()}
  position: relative;
  display: block;
  height: 100%;
  padding: 16px;
  font-size: 1rem;
`,fo=(0,_.forwardRef)(({children:e,...t},n)=>_.createElement(uo,{ref:n,...t},e));fo.displayName=`TabBody`;var po=z.div`
  position: relative;
  ${({isMultiRow:e,theme:t})=>e&&`
  button {
    flex-grow: 1;
  }
  button:last-child:before {
    border-right: 2px solid ${t.borderDark};
  }
  `}
`,mo=z.div.attrs(()=>({"data-testid":`tab-row`}))`
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
`;function ho(e,t){let n=[];for(let r=t;r>0;--r)n.push(e.splice(0,Math.ceil(e.length/r)));return n}var go=(0,_.forwardRef)(({value:e,onChange:t=rr,children:n,rows:r=1,...i},a)=>{let o=(0,_.useMemo)(()=>{let i=ho(_.Children.map(n,n=>{if(!_.isValidElement(n))return null;let r={selected:n.props.value===e,onClick:t};return _.cloneElement(n,r)})??[],r).map((e,t)=>({key:t,tabs:e})),a=i.findIndex(e=>e.tabs.some(e=>e.props.selected));return i.push(i.splice(a,1)[0]),i},[n,t,r,e]);return _.createElement(po,{...i,isMultiRow:r>1,role:`tablist`,ref:a},o.map(e=>_.createElement(mo,{key:e.key},e.tabs)))});go.displayName=`Tabs`;var _o=[`blur`,`focus`],vo=[`click`,`contextmenu`,`doubleclick`,`drag`,`dragend`,`dragenter`,`dragexit`,`dragleave`,`dragover`,`dragstart`,`drop`,`mousedown`,`mouseenter`,`mouseleave`,`mousemove`,`mouseout`,`mouseover`,`mouseup`];function yo(e){return`nativeEvent`in e&&_o.includes(e.type)}function bo(e){return`nativeEvent`in e&&vo.includes(e.type)}var xo={top:`top: -4px;
        left: 50%;
        transform: translate(-50%, -100%);`,bottom:`bottom: -4px;
           left: 50%;
           transform: translate(-50%, 100%);`,left:`left: -4px;
         top: 50%;
         transform: translate(-100%, -50%);`,right:`right: -4px;
          top: 50%;
          transform: translate(100%, -50%);`},So=z.span`
  position: absolute;

  z-index: 1;
  display: ${e=>e.show?`block`:`none`};
  padding: 4px;
  border: 2px solid ${({theme:e})=>e.borderDarkest};
  background: ${({theme:e})=>e.tooltip};
  box-shadow: ${Bn};
  text-align: center;
  font-size: 1rem;
  ${e=>xo[e.position]}
`,Co=z.div`
  position: relative;
  display: inline-block;
  white-space: nowrap;
`,wo=(0,_.forwardRef)(({className:e,children:t,disableFocusListener:n=!1,disableMouseListener:r=!1,enterDelay:i=1e3,leaveDelay:a=0,onBlur:o,onClose:s,onFocus:c,onMouseEnter:l,onMouseLeave:u,onOpen:d,style:f,text:p,position:m=`top`,...h},g)=>{let[v,y]=(0,_.useState)(!1),[b,x]=(0,_.useState)(),[S,C]=(0,_.useState)(),w=!n,T=!r,ee=e=>{window.clearTimeout(b),window.clearTimeout(S),x(window.setTimeout(()=>{y(!0),d?.(e)},i))},te=e=>{e.persist(),yo(e)?c?.(e):bo(e)&&l?.(e),ee(e)},E=e=>{window.clearTimeout(b),window.clearTimeout(S),C(window.setTimeout(()=>{y(!1),s?.(e)},a))},D=e=>{e.persist(),yo(e)?o?.(e):bo(e)&&u?.(e),E(e)},ne=w?D:void 0,O=w?te:void 0,k=T?te:void 0,re=T?D:void 0,ie=w?0:void 0;return _.createElement(Co,{"data-testid":`tooltip-wrapper`,onBlur:ne,onFocus:O,onMouseEnter:k,onMouseLeave:re,tabIndex:ie},_.createElement(So,{className:e,"data-testid":`tooltip`,position:m,ref:g,show:v,style:f,...h},p),t)});wo.displayName=`Tooltip`;var To=z(br)`
  white-space: nowrap;
`,Eo=R`
  :focus {
    outline: none;
  }

  ${({$disabled:e})=>e?`cursor: default;`:R`
          cursor: pointer;

          :focus {
            ${To} {
              background: ${({theme:e})=>e.hoverBackground};
              color: ${({theme:e})=>e.materialTextInvert};
              outline: 2px dotted ${({theme:e})=>e.focusSecondary};
            }
          }
        `}
`,Do=z.ul`
  position: relative;
  isolation: isolate;

  ${({isRootLevel:e})=>e&&R`
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
`,Oo=z.li`
  position: relative;
  padding-left: ${({hasItems:e})=>e?`0`:`13px`};

  ${({isRootLevel:e})=>e?R`
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
        `:R`
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
`,ko=z.details`
  position: relative;
  z-index: 2;

  &[open] > summary:before {
    content: '-';
  }
`,Ao=z.summary`
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
`,jo=z(yr)`
  position: relative;
  z-index: 1;
  background: none;
  border: 0;
  font-family: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0;
  ${Eo};
`,Mo=z.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;function No(e,t){return e.includes(t)?e.filter(e=>e!==t):[...e,t]}function Po(e){e.preventDefault()}function Fo({className:e,disabled:t,expanded:n,innerRef:r,level:i,select:a,selected:o,style:s,tree:c=[]}){let l=i===0,u=(0,_.useCallback)(r=>{let c=!!(r.items&&r.items.length>0),u=n.includes(r.id),d=(t||r.disabled)??!1,f=d?Po:e=>a(e,r),p=d?Po:e=>a(e,r),m=o===r.id,h=_.createElement(Mo,{"aria-hidden":!0},r.icon);return _.createElement(Oo,{key:r.label,isRootLevel:l,role:`treeitem`,"aria-expanded":u,"aria-selected":m,hasItems:c},c?_.createElement(ko,{open:u},_.createElement(Ao,{onClick:f,$disabled:d},_.createElement(jo,{$disabled:d},h,_.createElement(To,null,r.label))),u&&_.createElement(Fo,{className:e,disabled:d,expanded:n,level:i+1,select:a,selected:o,style:s,tree:r.items??[]})):_.createElement(jo,{as:`button`,$disabled:d,onClick:p},h,_.createElement(To,null,r.label)))},[e,t,n,l,i,a,o,s]);return _.createElement(Do,{className:l?e:void 0,style:l?s:void 0,ref:l?r:void 0,role:l?`tree`:`group`,isRootLevel:l},c.map(u))}function Io({className:e,defaultExpanded:t=[],defaultSelected:n,disabled:r=!1,expanded:i,onNodeSelect:a,onNodeToggle:o,selected:s,style:c,tree:l=[]},u){let[d,f]=mr({defaultValue:t,onChange:o,onChangePropName:`onNodeToggle`,value:i,valuePropName:`expanded`}),[p,m]=mr({defaultValue:n,onChange:a,onChangePropName:`onNodeSelect`,value:s,valuePropName:`selected`}),h=(0,_.useCallback)((e,t)=>{o&&o(e,No(d,t)),f(e=>No(e,t))},[d,o,f]),g=(0,_.useCallback)((e,t)=>{m(t),a&&a(e,t)},[a,m]),v=(0,_.useCallback)((e,t)=>{e.preventDefault(),g(e,t.id),t.items&&t.items.length&&h(e,t.id)},[g,h]);return _.createElement(Fo,{className:e,disabled:r,expanded:d,level:0,innerRef:u,select:v,selected:p,style:c,tree:l})}var Lo=(0,_.forwardRef)(Io);Lo.displayName=`TreeView`;var Ro=c(o(((e,t)=>{t.exports={name:`original`,anchor:`#1034a6`,anchorVisited:`#440381`,borderDark:`#848584`,borderDarkest:`#0a0a0a`,borderLight:`#dfdfdf`,borderLightest:`#fefefe`,canvas:`#ffffff`,canvasText:`#0a0a0a`,canvasTextDisabled:`#848584`,canvasTextDisabledShadow:`#fefefe`,canvasTextInvert:`#fefefe`,checkmark:`#0a0a0a`,checkmarkDisabled:`#848584`,desktopBackground:`#008080`,flatDark:`#9e9e9e`,flatLight:`#d8d8d8`,focusSecondary:`#fefe03`,headerBackground:`#060084`,headerNotActiveBackground:`#7f787f`,headerNotActiveText:`#c6c6c6`,headerText:`#fefefe`,hoverBackground:`#060084`,material:`#c6c6c6`,materialDark:`#9a9e9c`,materialText:`#0a0a0a`,materialTextDisabled:`#848584`,materialTextDisabledShadow:`#fefefe`,materialTextInvert:`#fefefe`,progress:`#060084`,tooltip:`#fefbcc`}}))(),1),zo=`/assets/ms_sans_serif-Du8rjN1q.woff2`,Bo=`/assets/ms_sans_serif_bold-D5dpRRHG.woff2`,Vo=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),G=o(((e,t)=>{t.exports=Vo()}))(),Ho=Rn`
  ${zn}
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
`;function Uo(e){return e?e<1024?e+` B`:e<1024*1024?(e/1024).toFixed(1)+` KB`:e<1024*1024*1024?(e/(1024*1024)).toFixed(1)+` MB`:(e/(1024*1024*1024)).toFixed(2)+` GB`:`-`}var Wo=[`.mp4`,`.mov`,`.avi`,`.mkv`,`.mts`];function Go(e){return e.toLowerCase().replace(/.*(\.\w+)$/,`$1`)}function Ko({src:e,alt:t,style:n}){return Wo.includes(Go(t))?(0,G.jsx)(`video`,{src:`${e}#t=0.5`,muted:!0,preload:`metadata`,style:n}):(0,G.jsx)(`img`,{src:e,alt:t,loading:`lazy`,style:n})}var qo={fontFamily:`ms_sans_serif`,border:`2px inset #dfdfdf`,padding:`2px 4px`,fontSize:`11px`,backgroundColor:`#fff`,height:`22px`};function Jo({capture:e,captures:t,index:n,onClose:r,onNavigate:i,onDelete:a,allTags:o,onTagsChanged:s}){let c=Go(e.fileName),l=Wo.includes(c),u=!l,d=e.fileFullPath||`${e.filePath}\\${e.fileName}`,f=`/api/image?path=${encodeURIComponent(d)}&agentId=${e.agentId||`local`}`,[p,m]=(0,_.useState)([]),[h,g]=(0,_.useState)(``),v=()=>{fetch(`/api/tag/file/${e.id}`).then(e=>e.json()).then(m).catch(()=>{})},[y,b]=(0,_.useState)(null),[x,S]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{v(),b(null),S(!1),u&&e.id&&[`.heic`,`.jpg`,`.jpeg`].includes(c)&&fetch(`/api/experiment/live-photo/${e.id}`).then(e=>e.ok?e.json():null).then(e=>b(e)).catch(()=>{})},[e.id]),(0,_.useEffect)(()=>{let e=e=>{e.key===`Escape`&&r(),e.key===`ArrowLeft`&&n>0&&i(n-1),e.key===`ArrowRight`&&n<t.length-1&&i(n+1)};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n,t.length,r,i]),(0,G.jsx)(`div`,{style:{position:`fixed`,inset:0,backgroundColor:`rgba(0,0,0,0.7)`,zIndex:1e3,display:`flex`,justifyContent:`center`,alignItems:`center`},onClick:r,children:(0,G.jsxs)(Ni,{style:{width:`90vw`,height:`90vh`,maxWidth:`1100px`,display:`flex`,flexDirection:`column`},onClick:e=>e.stopPropagation(),children:[(0,G.jsxs)(ji,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,G.jsx)(`span`,{children:e.fileName}),(0,G.jsx)(B,{size:`sm`,onClick:r,children:`X`})]}),(0,G.jsxs)(ki,{style:{flexGrow:1,display:`flex`,gap:`10px`,padding:`8px`,minHeight:0,overflow:`hidden`},children:[(0,G.jsxs)(`div`,{style:{flex:`1 1 70%`,display:`flex`,flexDirection:`column`,minHeight:0},children:[(0,G.jsxs)(`div`,{style:{flexGrow:1,minHeight:0,display:`flex`,alignItems:`center`,justifyContent:`center`,backgroundColor:`#000`,border:`2px inset #dfdfdf`,position:`relative`},children:[l?(0,G.jsx)(`video`,{src:f,controls:!0,style:{maxWidth:`100%`,maxHeight:`100%`}}):x&&y?(0,G.jsx)(`video`,{src:`/api/image?path=${encodeURIComponent(y.fileFullPath||`${y.filePath}\\${y.fileName}`)}&agentId=${y.agentId||`local`}`,autoPlay:!0,loop:!0,muted:!0,style:{maxWidth:`100%`,maxHeight:`100%`}}):(0,G.jsx)(`img`,{src:f,alt:e.fileName,style:{maxWidth:`100%`,maxHeight:`100%`,objectFit:`contain`}}),y&&(0,G.jsx)(`div`,{style:{position:`absolute`,top:`8px`,left:`8px`},children:(0,G.jsx)(B,{size:`sm`,active:x,onMouseDown:()=>S(!0),onMouseUp:()=>S(!1),onMouseLeave:()=>S(!1),onClick:()=>S(!x),children:`LIVE`})})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,justifyContent:`center`,gap:`8px`,marginTop:`6px`,flexShrink:0},children:[(0,G.jsx)(B,{disabled:n<=0,onClick:()=>i(n-1),children:`< Prev`}),(0,G.jsxs)(`span`,{style:{fontSize:`11px`,lineHeight:`28px`},children:[n+1,` / `,t.length]}),(0,G.jsx)(B,{disabled:n>=t.length-1,onClick:()=>i(n+1),children:`Next >`})]})]}),(0,G.jsxs)(`div`,{style:{flex:`0 0 200px`,overflow:`auto`,display:`flex`,flexDirection:`column`},children:[(0,G.jsx)(Yi,{label:`Properties`,style:{flexGrow:1},children:(0,G.jsx)(`table`,{style:{fontSize:`11px`,width:`100%`,borderCollapse:`collapse`},children:(0,G.jsx)(`tbody`,{children:[[`File`,e.fileName],[`Camera`,[e.cameraMaker,e.cameraModel].filter(Boolean).join(` `)||`-`],[`Lens`,e.lensModel||`-`],[`Time`,e.captureTime?new Date(e.captureTime).toLocaleString():`-`],[`Size`,Uo(e.fileSize)],[`GPS`,e.latitude!=null&&e.longitude!=null?`${e.latitude.toFixed(6)}, ${e.longitude.toFixed(6)}`:`-`],[`Source`,e.agentId===`local`?`Local`:e.agentId?.substring(0,8)||`-`],[`MD5`,e.fileMd5?.substring(0,12)||`-`]].map(([e,t])=>(0,G.jsxs)(`tr`,{children:[(0,G.jsx)(`td`,{style:{padding:`3px 4px`,fontWeight:`bold`,whiteSpace:`nowrap`,verticalAlign:`top`},children:e}),(0,G.jsx)(`td`,{style:{padding:`3px 4px`,wordBreak:`break-all`},children:t})]},e))})})}),(0,G.jsxs)(Yi,{label:`Tags`,style:{marginTop:`6px`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`3px`,marginBottom:`4px`},children:[p.map(t=>(0,G.jsxs)(`span`,{style:{fontSize:`10px`,backgroundColor:`#000080`,color:`#fff`,padding:`1px 6px`,borderRadius:`2px`,cursor:`pointer`},onClick:()=>{fetch(`/api/tag/file/${e.id}/${t.id}`,{method:`DELETE`}).then(v)},title:`Click to remove`,children:[t.name,` x`]},t.id)),p.length===0&&(0,G.jsx)(`span`,{style:{fontSize:`10px`,color:`#888`},children:`No tags`})]}),(0,G.jsx)(`div`,{style:{display:`flex`,gap:`2px`},children:(0,G.jsxs)(`select`,{style:{flex:1,fontSize:`10px`,border:`2px inset #dfdfdf`,fontFamily:`ms_sans_serif`},onChange:t=>{t.target.value&&fetch(`/api/tag/file/${e.id}/${t.target.value}`,{method:`POST`}).then(v),t.target.value=``},children:[(0,G.jsx)(`option`,{value:``,children:`+ Add tag...`}),o.filter(e=>!p.some(t=>t.id===e.id)).map(e=>(0,G.jsxs)(`option`,{value:e.id,children:[e.category?e.category+`/`:``,e.name]},e.id))]})}),(0,G.jsx)(`div`,{style:{display:`flex`,gap:`2px`,marginTop:`4px`},children:(0,G.jsx)(`input`,{type:`text`,placeholder:`New tag`,value:h,onChange:e=>g(e.target.value),style:{flex:1,fontSize:`10px`,border:`2px inset #dfdfdf`,padding:`1px 3px`,fontFamily:`ms_sans_serif`},onKeyDown:t=>{t.key===`Enter`&&h.trim()&&fetch(`/api/tag`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:h.trim(),category:``})}).then(e=>e.json()).then(t=>{fetch(`/api/tag/file/${e.id}/${t.id}`,{method:`POST`}).then(()=>{v(),s(),g(``)})})}})})]}),(0,G.jsx)(B,{style:{marginTop:`8px`,width:`100%`,color:`#ff0000`},onClick:()=>{window.confirm(`Delete "${e.fileName}"? This will remove the file from disk.`)&&a(e.id)},children:`Delete File`})]})]})]})})}function Yo(e){let t={name:``,fullPath:``,children:new Map};for(let n of e){let e=n.filePath.replace(/\\/g,`/`).split(`/`).filter(Boolean),r=t,i=``;for(let t of e)i=i?i+`/`+t:t,r.children.has(t)||r.children.set(t,{name:t,fullPath:i,children:new Map}),r=r.children.get(t);r.folder=n}return t}function Xo({folders:e,selectedFolder:t,onSelect:n}){let r=Yo(e);return r.children.size===0?(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`,color:`#666`},children:`No folders found`}):(0,G.jsx)(`div`,{style:{padding:`2px`},children:Array.from(r.children.values()).map(e=>(0,G.jsx)(Zo,{node:e,depth:0,selectedFolder:t,onSelect:n},e.fullPath))})}function Zo({node:e,depth:t,selectedFolder:n,onSelect:r}){let[i,a]=(0,_.useState)(t<2),o=e.children.size>0,s=n?.filePath===e.folder?.filePath&&n?.agentId===e.folder?.agentId,c=e.folder!=null;return(0,G.jsxs)(`div`,{children:[(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,padding:`1px 2px`,paddingLeft:t*16+2,cursor:c||o?`pointer`:`default`,backgroundColor:s?`#000080`:`transparent`,color:s?`#fff`:`#000`},onClick:()=>{c&&e.folder&&r(e.folder),o&&a(!i)},children:[(0,G.jsx)(`span`,{style:{width:`14px`,textAlign:`center`,fontSize:`10px`,flexShrink:0},children:o?i?`-`:`+`:` `}),(0,G.jsx)(`span`,{style:{marginRight:`4px`,fontSize:`12px`},children:c?`📁`:`📂`}),(0,G.jsx)(`span`,{style:{flexGrow:1,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},children:e.name}),c&&e.folder&&(0,G.jsx)(`span`,{style:{color:s?`#ccc`:`#888`,marginLeft:`4px`,flexShrink:0,fontSize:`10px`},children:e.folder.fileCount})]}),i&&Array.from(e.children.values()).map(e=>(0,G.jsx)(Zo,{node:e,depth:t+1,selectedFolder:n,onSelect:r},e.fullPath))]})}function Qo(e,t,n){let r=[],i=new Set([`Urls`,`Logging`,`AllowedHosts`,`EnableFullScan`,`MasterCluster`]);for(let[a,o]of Object.entries(e)){if(i.has(a))continue;let e=[...t,a],s=e.join(`.`);o&&typeof o==`object`&&!Array.isArray(o)?(r.push((0,G.jsx)(`div`,{style:{gridColumn:`1 / -1`,fontWeight:`bold`,marginTop:`6px`,borderBottom:`1px solid #808080`,paddingBottom:`2px`},children:s},s)),r.push(...Qo(o,e,n))):Array.isArray(o)?(r.push((0,G.jsxs)(`label`,{style:{textAlign:`right`},children:[a,`:`]},s+`_l`)),r.push((0,G.jsx)(`input`,{type:`text`,value:o.join(`, `),onChange:t=>n(e,t.target.value.split(`,`).map(e=>e.trim()).filter(Boolean)),style:{border:`2px inset #dfdfdf`,padding:`2px 4px`,fontSize:`11px`,fontFamily:`ms_sans_serif`}},s+`_v`))):(r.push((0,G.jsxs)(`label`,{style:{textAlign:`right`},children:[a,`:`]},s+`_l`)),a.toLowerCase()===`transfermode`?r.push((0,G.jsxs)(`select`,{value:String(o||`copy`),onChange:t=>n(e,t.target.value),style:{border:`2px inset #dfdfdf`,padding:`2px`,fontSize:`11px`,fontFamily:`ms_sans_serif`},children:[(0,G.jsx)(`option`,{value:`copy`,children:`copy`}),(0,G.jsx)(`option`,{value:`move`,children:`move`})]},s+`_v`)):r.push((0,G.jsx)(`input`,{type:typeof o==`number`?`number`:`text`,value:String(o??``),onChange:t=>n(e,typeof o==`number`?Number(t.target.value):t.target.value),style:{border:`2px inset #dfdfdf`,padding:`2px 4px`,fontSize:`11px`,fontFamily:`ms_sans_serif`}},s+`_v`)))}return r}function $o(){let[e,t]=(0,_.useState)(0),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(1),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(!0),[u,d]=(0,_.useState)({cameraMakers:[],cameraModels:[],fileTypes:[],agentIds:[]}),[f,p]=(0,_.useState)(``),[m,h]=(0,_.useState)(``),[g,v]=(0,_.useState)(``),[y,b]=(0,_.useState)(``),[x,S]=(0,_.useState)(``),[C,w]=(0,_.useState)(``),[T,ee]=(0,_.useState)(!1),[te,E]=(0,_.useState)(``),[D,ne]=(0,_.useState)([]),[O,k]=(0,_.useState)(``),[re,ie]=(0,_.useState)([]),[A,j]=(0,_.useState)(null),[M,N]=(0,_.useState)([]),[ae,P]=(0,_.useState)(``),[oe,F]=(0,_.useState)(``),[I,se]=(0,_.useState)(!1),[ce,le]=(0,_.useState)(new Set),[ue,de]=(0,_.useState)(null),[fe,pe]=(0,_.useState)(-1),[L,me]=(0,_.useState)([]),[he,ge]=(0,_.useState)(``),[_e,ve]=(0,_.useState)(`checking`),[ye,be]=(0,_.useState)({}),[xe,Se]=(0,_.useState)(``),[Ce,we]=(0,_.useState)(``),[Te,Ee]=(0,_.useState)(null),[De,Oe]=(0,_.useState)(null),[ke,Ae]=(0,_.useState)(!1),je=e=>{if(Te===e){Ee(null);return}Ee(e),Oe(null);let t=e===`local`?`/api/master/config`:`/api/agent/${e}/config`;fetch(t).then(e=>e.json()).then(Oe).catch(()=>Oe(null))},Me=()=>{if(!Te||!De)return;Ae(!0);let e=Te===`local`?`/api/master/config`:`/api/agent/${Te}/config`;fetch(e,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify(De)}).then(e=>{if(!e.ok)throw Error(`Save failed`);alert(`Config saved`)}).catch(e=>alert(`Failed: `+e.message)).finally(()=>Ae(!1))},Ne=(e,t)=>{if(!De)return;let n=JSON.parse(JSON.stringify(De)),r=n;for(let t=0;t<e.length-1;t++)r[e[t]]||(r[e[t]]={}),r=r[e[t]];r[e[e.length-1]]=t,Oe(n)},Pe=(0,_.useRef)(null),Fe=(0,_.useRef)(0),Ie=(0,_.useCallback)(e=>{o||(Pe.current&&Pe.current.disconnect(),Pe.current=new IntersectionObserver(e=>{e[0].isIntersecting&&c&&a(e=>e+1)}),e&&Pe.current.observe(e))},[o,c]);(0,_.useEffect)(()=>{fetch(`/api/experiment/filters`).then(e=>e.json()).then(d).catch(console.error),fetch(`/api/tag`).then(e=>e.json()).then(ne).catch(console.error)},[]),(0,_.useEffect)(()=>{Fe.current++,r([]),a(1),l(!0)},[f,m,g,y,x,C,T,te,O]),(0,_.useEffect)(()=>{if(!c)return;s(!0);let e=new URLSearchParams({page:String(i),pageSize:`30`});f&&e.set(`cameraMaker`,f),m&&e.set(`cameraModel`,m),g&&e.set(`fileType`,g),y&&e.set(`agentId`,y),x&&e.set(`dateFrom`,x),C&&e.set(`dateTo`,C),T&&e.set(`hasGps`,`true`),te&&e.set(`mediaType`,te),O&&e.set(`tagId`,String(O));let t=Fe.current;fetch(`/api/experiment/gallery?${e}`).then(e=>e.json()).then(e=>{t===Fe.current&&(!e||e.length===0?l(!1):(r(t=>{let n=new Map([...t,...e].map(e=>[e.id||e.fileName+e.captureTime,e]));return Array.from(n.values())}),e.length<30&&l(!1)),s(!1))}).catch(e=>{console.error(`Error fetching:`,e),s(!1)})},[i,f,m,g,y,x,C,T,te,O]),(0,_.useEffect)(()=>{e===1&&Le()},[e]);let Le=()=>{fetch(`/api/agent/status`).then(e=>e.json()).then(e=>{let t=e.find(e=>e.id===`local`);t&&(ge(t.version),ve(t.health===`healthy`?`healthy`:`unhealthy`));let n=e.filter(e=>e.id!==`local`);me(n.map(e=>({id:e.id,name:e.name,endpoint:e.endpoint,version:e.version,lastSeen:e.lastSeen,scanStatus:e.scanStatus})));let r={};n.forEach(e=>{r[e.id]=e.health===`healthy`?`healthy`:`unhealthy`}),be(r)}).catch(console.error)},Re=()=>{fetch(`/api/agent`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:xe,endpoint:Ce})}).then(()=>{Se(``),we(``),Le()})},ze=e=>{fetch(`/api/agent/${e}`,{method:`DELETE`}).then(()=>Le())},Be=()=>{p(``),h(``),v(``),b(``),S(``),w(``),ee(!1),E(``),k(``)},Ve=()=>{let e=ae?`?agentId=${encodeURIComponent(ae)}`:``;fetch(`/api/experiment/folders${e}`).then(e=>e.json()).then(ie).catch(console.error)},He=e=>{j(e),le(new Set);let t=new URLSearchParams({path:e.filePath});e.agentId&&t.set(`agentId`,e.agentId),fetch(`/api/experiment/folder-files?${t}`).then(e=>e.json()).then(N).catch(console.error)};(0,_.useEffect)(()=>{e===2&&Ve()},[e,ae]);let Ue=(e,t=`All`)=>[{label:t,value:``},...e.map(e=>({label:e,value:e}))];return(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(Ho,{}),(0,G.jsxs)(kn,{theme:Ro.default,children:[(0,G.jsxs)(Ni,{style:{width:`90vw`,height:`90vh`,maxWidth:`1200px`,display:`flex`,flexDirection:`column`},children:[(0,G.jsxs)(ji,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,G.jsx)(`span`,{children:`UltraSonic_Control_Panel.exe`}),(0,G.jsxs)(B,{children:[(0,G.jsx)(`span`,{className:`close-icon`}),`X`]})]}),(0,G.jsxs)(ki,{style:{flexGrow:1,padding:`0.5rem`,display:`flex`,flexDirection:`column`,minHeight:0,overflow:`hidden`},children:[(0,G.jsxs)(go,{value:e,onChange:e=>t(e),children:[(0,G.jsx)(W,{value:0,children:`Gallery`}),(0,G.jsx)(W,{value:1,children:`Node Config (Agents)`}),(0,G.jsx)(W,{value:2,children:`Folders`})]}),(0,G.jsxs)(fo,{style:{flexGrow:1,display:`flex`,flexDirection:`column`,padding:`10px`,minHeight:0,overflow:`hidden`},children:[e===0&&(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,flexGrow:1,minHeight:0,overflow:`hidden`},children:[(0,G.jsx)(Yi,{label:`Filters`,style:{flexShrink:0,marginBottom:`8px`},children:(0,G.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`8px`,alignItems:`center`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Brand:`}),(0,G.jsx)(Ti,{options:Ue(u.cameraMakers),value:f,onChange:e=>p(e.value),width:130,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Model:`}),(0,G.jsx)(Ti,{options:Ue(u.cameraModels),value:m,onChange:e=>h(e.value),width:160,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Type:`}),(0,G.jsx)(Ti,{options:Ue(u.fileTypes),value:g,onChange:e=>v(e.value),width:90,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Source:`}),(0,G.jsx)(Ti,{options:Ue(u.agentIds),value:y,onChange:e=>b(e.value),width:120,menuMaxHeight:200})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`From:`}),(0,G.jsx)(`input`,{type:`date`,value:x,onChange:e=>S(e.target.value),style:qo})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`To:`}),(0,G.jsx)(`input`,{type:`date`,value:C,onChange:e=>w(e.target.value),style:qo})]}),(0,G.jsx)(Ar,{label:`GPS`,checked:T,onChange:()=>ee(!T)}),(0,G.jsx)(`span`,{style:{borderLeft:`1px solid #808080`,height:`20px`,margin:`0 2px`}}),(0,G.jsx)(B,{size:`sm`,active:te===``,onClick:()=>E(``),children:`All`}),(0,G.jsx)(B,{size:`sm`,active:te===`photo`,onClick:()=>E(`photo`),children:`Photos`}),(0,G.jsx)(B,{size:`sm`,active:te===`video`,onClick:()=>E(`video`),children:`Videos`}),(0,G.jsx)(`span`,{style:{borderLeft:`1px solid #808080`,height:`20px`,margin:`0 2px`}}),D.length>0&&(0,G.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`4px`},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Tag:`}),(0,G.jsx)(Ti,{options:[{label:`All`,value:``},...D.map(e=>({label:`${e.category?e.category+`/`:``}${e.name}`,value:e.id}))],value:O,onChange:e=>k(e.value),width:140,menuMaxHeight:200})]}),(0,G.jsx)(B,{size:`sm`,onClick:Be,children:`Clear`})]})}),(0,G.jsxs)(`div`,{style:{marginBottom:`6px`,flexShrink:0,fontSize:`12px`},children:[`Showing `,n.length,` files`]}),(0,G.jsxs)(`div`,{style:{flexGrow:1,minHeight:0,width:`100%`,overflow:`auto`,backgroundColor:`#fff`,border:`2px inset #dfdfdf`,padding:`10px`},children:[(0,G.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(220px, 1fr))`,gap:`12px`},children:n.map((e,t)=>{let r=t===n.length-1,i=e.fileFullPath||`${e.filePath}\\${e.fileName}`,a=e.captureTime?new Date(e.captureTime).toLocaleString():``,o=`/api/image?path=${encodeURIComponent(i)}&agentId=${e.agentId||`local`}`;return(0,G.jsxs)(`div`,{ref:r?Ie:null,style:{border:`2px solid #dfdfdf`,borderBottomColor:`#808080`,borderRightColor:`#808080`,padding:`4px`,textAlign:`center`,backgroundColor:`#c0c0c0`,cursor:`pointer`},onClick:()=>{de(e),pe(t)},children:[(0,G.jsx)(Ko,{src:o,alt:e.fileName,style:{width:`100%`,height:`160px`,objectFit:`cover`,border:`2px inset #dfdfdf`,backgroundColor:`#000`}}),(0,G.jsx)(`div`,{style:{fontSize:`11px`,marginTop:`6px`,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`,padding:`2px`},children:e.fileName}),a&&(0,G.jsx)(`div`,{style:{fontSize:`10px`,color:`#666`,marginTop:`2px`},children:a}),e.agentId&&e.agentId!==`local`&&(0,G.jsxs)(`div`,{style:{fontSize:`10px`,color:`#000080`,marginTop:`2px`},children:[`Node: `,e.agentId.substring(0,8)]})]},e.id||`${e.fileName}_${t}`)})}),o&&(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`},children:`Loading please wait...`}),!c&&n.length>0&&(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`},children:`No more pictures found.`}),!o&&!c&&n.length===0&&(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`},children:`Your gallery is empty.`})]})]}),e===1&&(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`20px`},children:[(0,G.jsxs)(`fieldset`,{style:{border:`2px solid groove`,padding:`15px`},children:[(0,G.jsx)(`legend`,{children:`Register New Edge Node`}),(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`10px`,alignItems:`center`},children:[(0,G.jsx)(`label`,{children:`Name:`}),(0,G.jsx)(Zr,{placeholder:`e.g. Z690 Desktop`,value:xe,onChange:e=>Se(e.target.value)}),(0,G.jsx)(`label`,{children:`API Endpoint:`}),(0,G.jsx)(Zr,{placeholder:`e.g. http://192.168.1.100:5000`,value:Ce,onChange:e=>we(e.target.value),style:{width:`250px`}}),(0,G.jsx)(B,{onClick:Re,children:`Add Node`}),(0,G.jsx)(B,{onClick:Le,children:`Refresh`}),(0,G.jsx)(B,{onClick:()=>{window.confirm(`Clear image cache on Master and all Agents?`)&&fetch(`/api/cache`,{method:`DELETE`}).then(e=>e.json()).then(e=>alert(`Cache cleared: ${e.masterCleared} files, ${e.agentsNotified} agents notified`))},children:`Clear Cache`})]})]}),(0,G.jsx)(Cr,{style:{height:`300px`},children:(0,G.jsxs)(lo,{children:[(0,G.jsx)(no,{children:(0,G.jsxs)(oo,{children:[(0,G.jsx)(io,{children:`Name`}),(0,G.jsx)(io,{children:`IP`}),(0,G.jsx)(io,{children:`Port`}),(0,G.jsx)(io,{children:`Version`}),(0,G.jsx)(io,{children:`Health`}),(0,G.jsx)(io,{children:`Heartbeat`}),(0,G.jsx)(io,{children:`Actions`})]})}),(0,G.jsxs)($a,{children:[(0,G.jsxs)(oo,{style:{cursor:`pointer`,backgroundColor:Te===`local`?`#000080`:void 0,color:Te===`local`?`#fff`:void 0},onClick:()=>je(`local`),children:[(0,G.jsx)(H,{children:`Master Local`}),(0,G.jsx)(H,{children:window.location.hostname}),(0,G.jsx)(H,{children:`5281`}),(0,G.jsx)(H,{children:he}),(0,G.jsx)(H,{style:{color:_e===`healthy`?`green`:_e===`unhealthy`?`red`:`#666`},children:_e===`healthy`?`OK`:_e===`unhealthy`?`DOWN`:`...`}),(0,G.jsx)(H,{children:`-`}),(0,G.jsx)(H,{children:`Built-in`})]}),L.map(e=>{let t=`-`,n=`-`;try{let r=new URL(e.endpoint);t=r.hostname,n=r.port}catch{}return(0,G.jsxs)(oo,{style:{cursor:`pointer`,backgroundColor:Te===e.id?`#000080`:void 0,color:Te===e.id?`#fff`:void 0},onClick:()=>je(e.id),children:[(0,G.jsx)(H,{children:e.name}),(0,G.jsx)(H,{children:t}),(0,G.jsx)(H,{children:n}),(0,G.jsx)(H,{children:e.version||`-`}),(0,G.jsx)(H,{style:{color:ye[e.id]===`healthy`?`green`:ye[e.id]===`unhealthy`?`red`:`#666`},children:ye[e.id]===`healthy`?`OK`:ye[e.id]===`unhealthy`?`DOWN`:`...`}),(0,G.jsx)(H,{children:e.lastSeen?new Date(e.lastSeen).toLocaleString():`-`}),(0,G.jsxs)(H,{style:{display:`flex`,gap:`4px`},onClick:e=>e.stopPropagation(),children:[(0,G.jsx)(B,{size:`sm`,onClick:()=>{window.confirm(`Clear all records for "${e.name}" and trigger rescan?`)&&fetch(`/api/experiment/agent/${e.id}`,{method:`DELETE`}).then(()=>alert(`Rescan triggered`))},children:`Rescan`}),(0,G.jsx)(B,{size:`sm`,onClick:()=>ze(e.id),children:`Delete`})]})]},e.id)})]})]})}),Te&&Te!==`local`&&(()=>{let e=L.find(e=>e.id===Te)?.scanStatus;if(!e)return null;let t=e=>{if(!e)return`-`;let t=Math.floor(e/60),n=Math.floor(e%60);return t>0?`${t}m ${n}s`:`${n}s`},n=e=>e?new Date(e).toLocaleString():`-`;return(0,G.jsx)(Yi,{label:`Scan Status`,style:{marginTop:`10px`},children:(0,G.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`140px 1fr`,gap:`2px 8px`,fontSize:`11px`},children:[(0,G.jsx)(`b`,{children:`Status:`}),(0,G.jsx)(`span`,{style:{color:e.isScanning?`#008000`:`#666`},children:e.isScanning?`Scanning...`:`Idle`}),e.isScanning&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`b`,{children:`Current File:`}),(0,G.jsx)(`span`,{style:{wordBreak:`break-all`},children:e.currentFile||`-`})]}),e.isScanning&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`b`,{children:`Files Processed:`}),(0,G.jsx)(`span`,{children:e.filesProcessed??0})]}),(0,G.jsx)(`b`,{children:`Last Scan Start:`}),(0,G.jsx)(`span`,{children:n(e.lastScanStart)}),(0,G.jsx)(`b`,{children:`Last Scan End:`}),(0,G.jsx)(`span`,{children:n(e.lastScanEnd)}),(0,G.jsx)(`b`,{children:`Last Scan Duration:`}),(0,G.jsx)(`span`,{children:t(e.lastScanDurationSeconds)}),(0,G.jsx)(`b`,{children:`Next Scan:`}),(0,G.jsx)(`span`,{children:n(e.nextScanTime)}),e.lastError&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)(`b`,{style:{color:`red`},children:`Last Error:`}),(0,G.jsx)(`span`,{style:{color:`red`},children:e.lastError})]})]})})})(),Te&&De&&(0,G.jsxs)(Yi,{label:`Config: ${Te===`local`?`Master`:L.find(e=>e.id===Te)?.name||Te}`,style:{marginTop:`10px`,maxHeight:`300px`,overflow:`auto`},children:[(0,G.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`180px 1fr`,gap:`4px 8px`,fontSize:`11px`,alignItems:`center`},children:Qo(De,[],Ne)}),(0,G.jsxs)(`div`,{style:{marginTop:`8px`,display:`flex`,gap:`8px`},children:[(0,G.jsx)(B,{onClick:Me,disabled:ke,children:ke?`Saving...`:`Save`}),(0,G.jsx)(B,{onClick:()=>Ee(null),children:`Cancel`})]})]}),Te&&!De&&(0,G.jsx)(`div`,{style:{marginTop:`10px`,padding:`10px`,fontSize:`12px`,color:`#666`},children:`Loading config...`})]}),e===2&&(0,G.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,flexGrow:1,minHeight:0,overflow:`hidden`},children:[(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,alignItems:`center`,marginBottom:`8px`,flexShrink:0},children:[(0,G.jsx)(`label`,{style:{fontSize:`11px`},children:`Source:`}),(0,G.jsx)(Ti,{options:Ue(u.agentIds),value:ae,onChange:e=>P(e.value),width:150,menuMaxHeight:200}),(0,G.jsx)(B,{size:`sm`,onClick:Ve,children:`Refresh`}),A&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)(B,{size:`sm`,onClick:()=>se(!0),disabled:ce.size===0,children:[`Move (`,ce.size,`)`]}),(0,G.jsx)(B,{size:`sm`,style:{color:`red`},onClick:()=>{window.confirm(`Delete all ${A.fileCount} files in "${A.filePath}"?`)&&fetch(`/api/experiment/folder?path=${encodeURIComponent(A.filePath)}&agentId=${A.agentId||``}`,{method:`DELETE`}).then(()=>{Ve(),j(null),N([])})},children:`Delete Folder`})]})]}),(0,G.jsxs)(`div`,{style:{display:`flex`,flexGrow:1,minHeight:0,gap:`8px`},children:[(0,G.jsx)(`div`,{style:{flex:`0 0 350px`,overflow:`auto`,border:`2px inset #dfdfdf`,backgroundColor:`#fff`,fontSize:`11px`},children:(0,G.jsx)(Xo,{folders:re,selectedFolder:A,onSelect:He})}),(0,G.jsx)(`div`,{style:{flexGrow:1,overflow:`auto`,border:`2px inset #dfdfdf`,backgroundColor:`#fff`},children:A?(0,G.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(180px, 1fr))`,gap:`8px`,padding:`8px`},children:M.map(e=>{let t=e.fileFullPath||`${e.filePath}\\${e.fileName}`,n=`/api/image?path=${encodeURIComponent(t)}&agentId=${e.agentId||`local`}`,r=ce.has(e.id);return(0,G.jsxs)(`div`,{style:{border:r?`2px solid #000080`:`2px solid #dfdfdf`,borderBottomColor:r?`#000080`:`#808080`,borderRightColor:r?`#000080`:`#808080`,padding:`3px`,textAlign:`center`,backgroundColor:r?`#c0c0ff`:`#c0c0c0`,cursor:`pointer`},onClick:()=>le(t=>{let n=new Set(t);return n.has(e.id)?n.delete(e.id):n.add(e.id),n}),children:[(0,G.jsx)(Ko,{src:n,alt:e.fileName,style:{width:`100%`,height:`120px`,objectFit:`cover`,border:`2px inset #dfdfdf`,backgroundColor:`#000`}}),(0,G.jsx)(`div`,{style:{fontSize:`10px`,marginTop:`3px`,whiteSpace:`nowrap`,overflow:`hidden`,textOverflow:`ellipsis`},children:e.fileName})]},e.id)})}):(0,G.jsx)(`div`,{style:{padding:`20px`,textAlign:`center`,color:`#666`},children:`Select a folder`})})]}),I&&(0,G.jsx)(`div`,{style:{position:`fixed`,inset:0,backgroundColor:`rgba(0,0,0,0.5)`,zIndex:1e3,display:`flex`,justifyContent:`center`,alignItems:`center`},children:(0,G.jsxs)(Ni,{style:{width:`400px`},children:[(0,G.jsxs)(ji,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,G.jsx)(`span`,{children:`Move Files`}),(0,G.jsx)(B,{size:`sm`,onClick:()=>se(!1),children:`X`})]}),(0,G.jsxs)(ki,{children:[(0,G.jsxs)(`p`,{style:{fontSize:`12px`,marginBottom:`8px`},children:[`Move `,ce.size,` files to:`]}),(0,G.jsx)(Zr,{value:oe,onChange:e=>F(e.target.value),placeholder:`D:\\Photos\\Archive`,style:{width:`100%`,marginBottom:`8px`}}),(0,G.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,justifyContent:`flex-end`},children:[(0,G.jsx)(B,{onClick:()=>se(!1),children:`Cancel`}),(0,G.jsx)(B,{onClick:()=>{fetch(`/api/experiment/move`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({fileIds:Array.from(ce),targetPath:oe})}).then(e=>e.json()).then(e=>{alert(`Moved ${e.moved}/${e.total} files`),se(!1),A&&He(A),Ve()}).catch(e=>alert(`Move failed: `+e.message))},disabled:!oe,children:`Move`})]})]})]})})]})]})]})]}),ue&&(0,G.jsx)(Jo,{capture:ue,captures:n,index:fe,onClose:()=>de(null),onNavigate:e=>{pe(e),de(n[e])},onDelete:e=>{fetch(`/api/experiment/${e}`,{method:`DELETE`}).then(e=>{if(!e.ok)throw Error(`Delete failed`)}).then(()=>{r(t=>t.filter(t=>t.id!==e)),de(null)}).catch(e=>{alert(`Failed to delete: `+e.message)})},allTags:D,onTagsChanged:()=>fetch(`/api/tag`).then(e=>e.json()).then(ne).catch(()=>{})})]})]})}(0,v.createRoot)(document.getElementById(`root`)).render((0,G.jsx)(_.StrictMode,{children:(0,G.jsx)($o,{})}));