// This library is distributed in  the hope that it will be useful but without
// any  warranty; without  even  the  implied  warranty of  merchantability or
// fitness for a particular purpose.
// The use and distribution terms for this software are covered by the Eclipse
// Public License 1.0  (http://opensource.org/licenses/eclipse-1.0.php)  which
// can be found in the file epl-v10.html at the root of this distribution.
// By using this software in any  fashion, you are agreeing to be bound by the
// terms of this license. You  must not remove this notice, or any other, from
// this software.
// Copyright (c) 2013-2014 Cherimoia, LLC. All rights reserved.

(function(undef) { "use strict"; var global= this; var _ = global._;
var asterix = global.ZotohLabs.Asterix;
var sh= asterix.Shell;
var loggr = global.ZotohLabs.logger;
var echt = global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

asterix.XConfig = {

  urlPrefix: '/public/ig/',
  appid: '',

  setGameSize: function(sz) {
    if (_.isString(sz)) {
      this.game.size = this.devices[sz];
    }
    else
    if (_.isObject(sz)) {
      this.game.size = sz;
    }
  },

  levels: {
  },

  assets: {
    sprites: {
      'gui.audio' : [ 'media/phaserio/btns/audio_onoff_white.png', 32,32, -1 ]
    },
    tiles: {
      'gui.ynbox' : 'lib/game/{{appid}}/levels/blankscreen.json',
      'gui.mmenu' : 'lib/game/{{appid}}/levels/mainmenu.json'
    },
    images: {
      'splash.play-btn' : 'media/{{appid}}/gui/{{lang}}/play_btn.png',
      'splash.splash' : 'media/{{appid}}/gui/splash.png',
      'gui.mmenu.border': 'media/phaserio/game/{{border-tiles}}',

      "game.arena.menu" : 'media/phaserio/btns/settings-x32.png',
      "game.arena.replay" : 'media/phaserio/btns/replay-x32.png',

      /*
      'gui.mmenu.border16': 'media/phaserio/game/cbox-borders_x16.png',
      'gui.mmenu.border8': 'media/phaserio/game/cbox-borders_x8.png',
      */
      'gui.mmenu.onep' : 'media/phaserio/btns/{{lang}}/onep_btn.png',
      'gui.mmenu.twop' : 'media/phaserio/btns/{{lang}}/twop_btn.png',
      'gui.mmenu.netp' : 'media/phaserio/btns/{{lang}}/netp_btn.png',
      'gui.mmenu.bg' : 'media/{{appid}}/gui/bg.png',

      'gui.xbxA' : 'media/phaserio/btns/{{lang}}/xbx-A-x32.png',
      'gui.xbxB' : 'media/phaserio/btns/{{lang}}/xbx-B-x32.png',
      'gui.xbxY' : 'media/phaserio/btns/{{lang}}/xbx-Y-x32.png'
    },
    sounds: {
    },
    fonts: {
      'font.TinyBoxBB' : [ 'media/phaserio/fon/{{lang}}/', 'TinyBoxBlackBitA8.png', 'TinyBoxBlackBitA8.xml' ],
      'font.Downlink' : [ 'media/phaserio/fon/{{lang}}/', 'Downlink.png', 'Downlink.xml' ]
    }
  },

  game: {
    borderTiles: 'cbox-borders_x8.png',
    canvasDiv: 'game-container',
    startState: 'Boot',
    landscape: false,
    size: null
  },

  preloadLevels: true,
  smac: null,

  l10n: {
    '%mobileStart' : 'Press Anywhere To Start!',
    '%webStart' : 'Press Spacebar To Start!'
  },

  devices: {
    iphone:{width:240, height:160, scale:2},
    android:{width:240, height:160, scale:2},
    ipad:{width:240, height:160, scale:4},
    default:{width:240, height:160, scale:3}
  },

  csts: {
    // 1 = single player
    // 2 = 2 players
    // 3 = network, multi players
    GAME_MODE : 1,
    S_OFF: 4
  },

  system: {

    trackingID: "",
    version: "",
    gravity: 0,

    debug: true
  },

  sound: {
    volume: 0.5,
    open: true,
    music: {
      volume: 0.5,
      track: null
    }
  },

  input: {
  },

  camera:{
  },

  setDeviceSizes: function (obj) {
    if (_.isObject(obj)) { this.devices= obj; }
  },

  toggleSfx: function(override) {
    this.sound.open = echt(override) ? override : !this.sound.open;
    sh.phaser.sound.mute = ! this.sound.open;
  },

  ctor: function() {
    this.game.size = this.devices['default'];
  }


};




}).call(this);


