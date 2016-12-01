(function (root, factory) {
  //Environment Detection
  if (typeof define === 'function' && define.amd) {
    //AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    //CommonJS
    module.exports = factory();
  } else {
    // Script tag import i.e., IIFE
    root.roundmeIosGyroPatch = factory();
  }
}(this, function () {
  /**
   * Workaround for WebKit bug 152299
   * https://bugs.webkit.org/show_bug.cgi?id=152299
   * With iOS 9.2 WebKit now blocks deviceorientation and devicemotion event access
   * from cross-origin iframes
   **/
  function roundmeIosGyroPatch (h) {
    var host = h || 'roundme.com';
    var iframes;

    function iOSversion () {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return parseFloat(parseInt(v[1], 10) + '.' + parseInt(v[2], 10));
      }
    }

    function getIframes () {
      var res = [];
      var iframes = document.querySelectorAll('iframe');
      iframes.forEach(function (frame) {
        var src = frame.getAttribute('src');
        var isPatched = frame.hasAttribute('data-patched');
        if ( src && src.includes(host) && !isPatched ) {
          frame.dataset.patched = true;
          res.push(frame);
        }
      });
      return res;
    }

    function handleMotionEvent (e, iframes) {
      var evData = JSON.stringify({
        roundmemotion: {
          acceleration: e.acceleration,
          accelerationIncludingGravity: e.accelerationIncludingGravity,
          rotationRate: e.rotationRate
        }
      });
      iframes.forEach(function (frame) {
        frame.contentWindow.postMessage(evData, "*");
      });
    }

    if (iOSversion() >= 9.2) {
      iframes = getIframes();
      window.addEventListener("devicemotion", function (e) {
        handleMotionEvent(e, iframes);
      }, true);
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    roundmeIosGyroPatch();
  });

  return roundmeIosGyroPatch;
}));
