// This library is distributed in  the hope that it will be useful but without
// any  warranty; without  even  the  implied  warranty of  merchantability or
// fitness for a particular purpose.
// The use and distribution terms for this software are covered by the Eclipse
// Public License 1.0  (http://opensource.org/licenses/eclipse-1.0.php)  which
// can be found in the file epl-v10.html at the root of this distribution.
// By using this software in any  fashion, you are agreeing to be bound by the
// terms of this license. You  must not remove this notice, or any other, from
// this software.
// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.

(function (undef) { "use strict"; var global= this; var _ = global._ ; var Mustache=global.Mustache;
var loggr= global.ZotohLabs.logger;
var klass= global.ZotohLabs.klass;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////
// common functions
//////////////////////////////////////////////////
var Funcs= klass.extends({

  // tests if 2 rectangles intersect.
  isIntersect: function(a1,a2) {
    return ! (a1.left > a2.right  || a2.left > a1.right || a1.top > a2.bottom || a2.top > a1.bottom);
  },

  outOfBound: function(a,B) {
    return a.right > B.right || a.bottom > B.bottom || a.left < 0 || a.top < 0;
  },

  randomSign: function() {
    if (this.rand(10) % 2 === 0) {
      return -1;
    } else {
      return 1;
    }
  },

  rand: function(limit) {
    return Math.floor(Math.random() * limit);
  },

  calcXY: function(angle,hypot) {
  // quadrants =  3 | 4
  //             --------
  //              2 | 1
    var theta, q, x, y;
    if (angle >= 90 && angle <= 180) {
      theta= this.degToRad(180 - angle);
      x = - Math.cos(theta);
      y = Math.sin(theta);
      q=2;
    }
    else
    if (angle >= 180 && angle <= 270) {
      theta = this.degToRad(angle - 180);
      x = - Math.cos(theta);
      y = - Math.sin(theta);
      q=3;
    }
    else
    if (angle >= 270 && angle <= 360) {
      theta = this.degToRad(360 - angle);
      x = Math.cos(theta);
      y = - Math.sin(theta);
      q=4;
    } else {
      theta = this.degToRad(angle);
      x = Math.cos(theta);
      y = Math.sin(theta);
      q=1;
    }
    return [ x * hypot, y * hypot, q ];
  },

  normalizeDeg: function(deg) {
    if (deg > 360) { return deg % 360; }
    else if (deg < 0) { return 360 + deg % 360; }
    else { return deg; }
  },

  degToRad: function(deg) {
    return deg * Math.PI / 180;
  },

  ctor: function() {}

});

global.ZotohLabs.Asterix = {
  fns: new Funcs(),
  Shell: {

    l10nInit: function(table) {
      String.defaultLocale="en-US";
      String.toLocaleString(table);
      loggr.info("loaded l10n strings.  locale = " + String.locale);
    },

    pushState: function(s,options) {
      options= options || {};
      var p= this.main.state.getState(s);
      if (p) {
        p.bindStartOptions(options);
      }
      this.main.state.start(s);
    },

    popState: function() {
      var c= this.main.state.getCurrentState();
      var p= c.getPrevious();
      c.setPrevious();
      if (p) {
        this.main.state.start(p.moniker);
      } else {
        throw new Error("No state to pop back to!");
      }
    },

    currentStage: 1,
    protos: {},
    main: null,
    last: null,
    lang: 'en',

    sanitizeUrl: function(url) {
      var me=this;
      return Mustache.render( url || '', { lang: this.lang, appid:  me.xcfg.appid } );
    },

    l10n: function(s,pms) {
      var t= s.toLocaleString();
      return echt(pms) ? Mustache.render(t,pms) : t;
    }
  }
};


}).call(this);


