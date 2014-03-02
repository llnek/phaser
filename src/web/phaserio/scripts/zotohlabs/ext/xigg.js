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

  create: function(root,id) {
    this.group= root.game.add.group(root,id);
    this.moniker= id;
    this.start();
  },

  start: function() {
  },

  update: function() {
  },

  draw: function() {
  },

  loseFocus: function() {
    this.group.visible=false;
  },

  focus: function(options) {
    this.group.visible=true;
  },

  popout: function() {
    var p = this.prev;
    if (p) {
      sh.main.invoke(p.moniker);
    }
    p=null;
  },

  setPrev: function(p) {
    this.prev= p;
  },

  getPrev: function() {
    return this.prev;
  },

  setGameMode: function(mode) {
    loggr.info("game is running in mode = " + mode);
    sh.xcfg.csts.GAME_MODE=mode;
  },

  ctor: function() {
    this.moniker = '';
    this.prev = null;
  }

});




}).call(this);


