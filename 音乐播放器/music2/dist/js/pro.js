!function(r,t){var a,e,o,i=0;function m(t){t=Math.round(t);var n=Math.floor(t/60),e=t-60*n;return n<10&&(n="0"+n),e<10&&(n="0"+e),n+":"+e}t.pro={renderAllTime:function(t){t=m(a=t),r(".all-time").html(t)},start:function(t){o=(new Date).getTime(),function t(){var n=(new Date).getTime();!function(t){var n=t*a;n=m(n),r(".cur-time").html(n);var e=100*(t-1)+"%";r(".pro-top").css({transform:"translateX("+e+")"})}(i+(n-o)/(1e3*a)),e=requestAnimationFrame(t)}()},stop:function(){var t=(new Date).getTime();i+=(t-o)/(1e3*a),cancelAnimationFrame(e)}}}(window.Zepto,window.player||window.player=={});