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

(function(undef) { "use strict"; var global= this; var _ = global._;
var phaser = global.ZotohLabs.Phaser;
var loggr = global.ZotohLabs.logger;
var echt = global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

phaser.XConfig = ig.merge( phaser.XCfgBase, {

  setGameSize: function(sz) {
    if (_.isString(sz)) {
      this.game.size = this.devices[sz];
    }
    else
    if (_.isObject(sz)) {
      this.game.size = sz;
    }
  },

  fireFirstRun: function() {
    if ( ! this.game.firstRunSignaled) {
      this.game.firstRunSignaled= true;
      this.smac.genesis();
      //this.smac.setGame(ig.game);
    }
  },

  firstRun: function() {
    return this.game.firstRunSignaled;
  },

  levels: {
  },

  game: {
    mobileStart: 'Press Anywhere To Start!',
    webStart: 'Press Spacebar To Start!',
    firstRunSignaled: false,
    splash: null,
    proto: null,
    size: null
  },

  smac: null,

  l10n: {},

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
    fadeColor: 'rgb(255,255,255)',
    /*
    fadeToWhiteMillis: 200,
    fadeToGameMillis: 800,
    */
    fadeToWhiteMillis: 150,
    fadeToGameMillis: 300,

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
    keys: {
        RIGHT_ARROW:'right',
        LEFT_ARROW: 'left',
        DOWN_ARROW:'down',
        UP_ARROW: 'up',
        MOUSE1: 'clicked',
        X:'jump',
        C:'shoot',
        SPACE: 'continue',
        ENTER: 'continue',
        Q: 'quit',
        ESC: 'pause',
        Z: 'open'
    },
    touch: {
        '#buttonRight': 'right',
        '#buttonLeft': 'left',
        '#buttonJump': 'jump',
        '#buttonShoot': 'shoot',
        '#canvas': 'continue'
        //'#canvas': 'pause'
    }
  },

  camera:{
    lightMask:"media/phaserio/game/lighting.png",
    trapSizeScale:{x:3, y:3},
    lookAhead:{x:0, y:0}
  },

  text: {
    defaultCaption: ""
  },

  sounds: {
    death:"media/phaserio/sfx/Death.*",
    elevatorBeep:"media/phaserio/sfx/ElvatorBeep.*",
    outOfAmmo:"media/phaserio/sfx/Empty.*",
    grenadeBounce:"media/phaserio/sfx/GrenadeBounce.*",
    grenadeExplosion:"media/phaserio/sfx/GrenadeExplosion.*",
    gunFire:"media/phaserio/sfx/GunFire.*",
    hitHard:"media/phaserio/sfx/HitHard.*",
    hitSoft:"media/phaserio/sfx/HitSoft.*",
    jump:"media/phaserio/sfx/Jump.*",
    machineGunFire:"media/phaserio/sfx/MachineGunFire.*",
    mineBeep:"media/phaserio/sfx/MineBeep.*",
    mineExplosion:"media/phaserio/sfx/MineExplosion.*",
    openDoor:"media/phaserio/sfx/OpenDoor.*",
    fallToDeath:"media/phaserio/sfx/PlayerMonsterFall.*",
    powerUp:"media/phaserio/sfx/Powerup.*",
    powerUp2:"media/phaserio/sfx/Powerup2.*",
    shotgunFire:"media/phaserio/sfx/ShotgunFire.*",
    startGame:"media/phaserio/sfx/StartGame.*"
  },

  setDeviceSizes: function (obj) {
    if (_.isObject(obj)) { this.devices= obj; }
  },

  toggleSfx: function(override) {
    this.sound.open = echt(override) ? override : !this.sound.open;
    ig.Sound.enabled = this.sound.open;
  },

  sfxInit: function() {
    ig.music.volume = this.sound.music.volume;
    ig.Sound.volume = this.sound.volume;
    if (this.sound.music.track) {
      ig.music.add(this.sound.music.track);
      if (this.sound.open) {
        ig.music.play();
      }
    }
  },

  sfxPlay: function(p) {
    if (this.sound.open) {
      var s;
      if (_.isString(p)) {
        s= this.sounds[p];
      } else {
        s= p;
      }
      if (s) { s.play(); }
    }
  },

  ioFinz: function() {
    ig.input.unbindAll();
  },

  ioInit: function() {
    var ctx, sect;
    if (ig.ua.mobile) {
      ctx = ig.input['bindTouch'];
      sect= "touch";
    } else {
      ctx = ig.input['bind'];
      sect= "keys";
    }
    ig.input.unbindAll();
    _.each(_.pairs(this.input[sect]), function (z) {
      ctx.call(ig.input, ig.KEY[ z[0] ], z[1] );
    });
  },

  getStartInstruction: function() {
    return this.game[ ig.ua.mobile ? 'mobileStart' : 'webStart'];
  },

  init: function() {
    this.game.size = this.devices['default'];
  }


});




}).call(this);


