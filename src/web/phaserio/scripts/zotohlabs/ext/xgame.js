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

(function(undef) { "use strict"; var global = this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var sh= asterix.Shell;
var loggr= global.ZotohLabs.logger;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

asterix.XGame = asterix.XState.extends({

  onCreate: function() {
    this.root= this.add.group(undef, 'root');
    var fs= this.preStart();
    var me=this;
    _.each(this.screens, function(v,k) {
      v.create(me.root,k);
    });
    this.floatTop(fs);
  },

  onUpdate: function() {
    if (! this.startFired) {
      this.startFired = true;
      this.doStart();
    } else {
      this.doFrame();
    }
  },

  onRender: function() {
    if (this.startFired) {
      this.doDraw();
    }
  },

  doFrame: function() {
    if (this.cur) {
      this.cur.update();
    }
  },

  doDraw: function() {
    if (this.cur) {
      this.cur.draw();
    }
  },

  doStart: function() {
    sh.xcfg.smac.genesis();
  },

  preStart: function() {
  },

  invoke: function(screen, options) {
    loggr.debug('invoking screen: ' + screen);
    var x= this.screens[screen];
    if (x) {
      if (this.cur) {
        this.cur.loseFocus();
        x.setPrev(this.cur);
      }
      this.cur=x;
      this.floatTop(this.cur, options);
    }
  },

  flyout: function(scr, options) {
    var p= new (scr)();
    p.create(this.root,'flyout');
    if (this.cur) {
      this.cur.loseFocus();
    }
    this.floatTop(p,options);
  },

  defly: function(s) {
    this.root.remove(s.group);
    s.loseFocus();
    if (this.cur) {
      this.floatTop(this.cur);
    }
  },

  floatTop: function(c, options) {
    this.root.bringToTop(c.group);
    c.focus(options || {});
  },

  ctor: function(g) {
    this.startFired = false;
    this.screens = {};
    this.root = null;
    this.cur = null;
    this.parent(g);
    sh.main = this;
  }

});




}).call(this);


