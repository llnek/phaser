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

asterix.XScreen = global.ZotohLabs.klass.extends({

  preload: function() {
    if (! this.created_ok) {
      this.load.baseURL = sh.xcfg.urlPrefix;
      this.onPreload();
    }
  },

  create: function() {
    if (! this.created_ok) {
      this.onCreate();
      this.created_ok=true;
    }
  },

  update: function() {
    this.onUpdate();
  },

  render: function() {
    this.onRender();
  },

  anchor: function(obj, deltaX, deltaY) {
    obj.anchor.y = deltaY || 0.5;
    obj.anchor.x = deltaX || 0.5;
  },

  getCenter: function() {
    return { x: this.game.world.centerX, y: this.game.world.centerY };
  },

  getSize: function() {
    return { x: this.game.world.width, y: this.game.world.height };
  },

  onPreload: function() {
  },

  onCreate: function() {
  },

  onUpdate: function() {
  },

  onRender: function() {
  },

  setPrevious: function (last) {
    this.previous_state_id = last;
  },

  getPrevious: function() {
    return previous_state_id;
  },

  ctor: function(g) {
    this.game=g;
  },

  previous_state_id: '',

  created_ok: false,

  moniker: ''

});




}).call(this);


