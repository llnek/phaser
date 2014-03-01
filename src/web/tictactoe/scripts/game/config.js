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

(function (undef) { "use strict"; var global= this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var sh= asterix.Shell;
var loggr = global.ZotohLabs.logger;
asterix.TicTacToe= {};

var smac = StateMachine.create({
  //initial: 'none',
  events: [
    { name: 'genesis',  from: 'none',  to: 'Boot' },
    { name: 'splash',  from: 'Boot',  to: 'Splash' },
    { name: 'preload',  from: 'Splash',  to: 'Preloader' },
    { name: 'ready',  from: 'Preloader',  to: 'StartScreen' },

    { name: 'play0',  from: 'StartScreen',  to: 'MainMenu' },
    { name: 'quit',  from: 'MainMenu',  to: 'StartScreen' },

    { name: 'play1',  from: 'MainMenu',  to: 'PlayGame' },
    { name: 'play2',  from: 'MainMenu',  to: 'PlayGame' },
    { name: 'play3',  from: 'MainMenu',  to: 'PlayGame' },

    { name: 'settings',  from: 'PlayGame',  to: 'MainMenu' },
    { name: 'back',  from: 'MainMenu',  to: 'PlayGame' },

    { name: 'replay',  from: 'PlayGame',  to: 'ReplayGame' },
    { name: 'resetplay',  from: 'ReplayGame',  to: 'PlayGame' }
  ],
  callbacks: {
    ongenesis: function(ev,fr,to,mainObj) {
      sh.logstate("ongenesis",fr,to);
      mainObj.state.start(to);
    },
    onsplash: function(ev,fr,to,mainObj) {
      sh.logstate("onsplash",fr,to);
      mainObj.state.start(to);
    },
    onpreload: function(ev,fr,to,mainObj) {
      sh.logstate("onpreload",fr,to);
      mainObj.state.start(to);
    },
    onready: function(ev,fr,to,mainObj) {
      loggr.debug("onload() called, moving to state [" + to + "]");
      sh.pushState(to);
    },
    onplay0: function(ev,fr,to,mainObj) {
      sh.logstate("onplay0",fr,to);
      sh.pushState(to);
    },
    onquit: function(ev,fr,to) {
      sh.logstate("onquit",fr,to);
      sh.pushState(to);
    },
    onplay1: function(ev,fr,to) {
      sh.logstate("onplay1",fr,to);
      sh.pushState(to, { mode: 1 });
    },
    onplay2: function(ev,fr,to) {
      sh.logstate("onplay2",fr,to);
      sh.pushState(to, { mode: 2 });
    },
    onplay3: function(ev,fr,to) {
      sh.logstate("onplay3",fr,to);
      //sh.pushState(to, { mode: 3 });
    },
    onsettings: function(ev,fr,to) {
      sh.logstate("onsettings",fr,to);
      sh.pushState(to);
    },
    onback: function(ev,fr,to) {
      sh.logstate("onback",fr,to);
      sh.pushState(to);
    },
    onreplay: function(ev,fr,to) {
      sh.logstate("onreplay",fr,to);
      sh.pushState(to);
    },
    onresetplay: function(ev,fr,to) {
      sh.logstate("onresetplay",fr,to);
    }
  }
});

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

sh.xcfg = global.ZotohLabs.klass.merge( asterix.XConfig, {

  appid: 'tictactoe',

  csts: {
    CV_X: 'X'.charCodeAt(0),
    CV_O: 'O'.charCodeAt(0),
    COL: [10, 10, 10],
    ROW: [11, 11, 11],
    GRID_SIZE: 3,
    PIC_SIZE: 72,
    BTN_SIZE: 32,
    GRID_W: 40,
    GRID_H: 60,
    TILE: 8,
    SIDE: 1,
    C_GAP: 1,
    R_GAP: 1,
    LEFT: 4,
    TOP: 11,
    GAP: 10
  },

  devices: {
    iphone:{width:320, height:480, scale:1},
    android:{width:320, height:480, scale:1},
    ipad:{width:320, height:480, scale:2},
    default:{width:320, height:480, scale:1}
  },

  assets: {
    tiles: {
    },
    images: {
    },
    sounds: {
      game_end: 'media/phaserio/sfx/MineExplosion.mp3',
      x_pick: 'media/phaserio/sfx/ElevatorBeep.mp3',
      o_pick: 'media/phaserio/sfx/MineBeep.mp3',
      quit: 'media/phaserio/sfx/PlayerMonsterFall.mp3'
    },
    fonts: {
      'font.CrystalRadioKit' : [ 'media/phaserio/fon/{{lang}}/', 'CrystalRadioKit.png', 'CrystalRadioKit.xml' ]
    }
  },

  levels: {
    "gamelevel1" : {
      tiles: {
        'arena' : 'lib/game/{{appid}}/levels/arena.json'
      },
      images: {
        'arena' : 'media/{{appid}}/game/arena.png'
      },
      sprites: {
        'markers' : [ 'media/{{appid}}/game/markers.png', 72,72, -1]
      }
    }
  },

  preloadLevels: true,
  smac: smac

});

sh.xcfg.csts.CELLS = sh.xcfg.csts.GRID_SIZE * sh.xcfg.csts.GRID_SIZE ;


}).call(this);


