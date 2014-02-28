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
var ig=sh;  //TODO
var smac = StateMachine.create({
  //initial: 'none',
  events: [
    { name: 'genesis',  from: 'none',  to: 'Boot' },
    { name: 'splash',  from: 'Boot',  to: 'Splash' },
    { name: 'preload',  from: 'Splash',  to: 'Preloader' },
    { name: 'ready',  from: 'Preloader',  to: 'Start_Screen' },

    { name: 'play0',  from: 'Start_Screen',  to: 'Main_Menu' },
    { name: 'quit',  from: 'Main_Menu',  to: 'Start_Screen' },

    { name: 'play1',  from: 'Main_Menu',  to: 'Play_Game' },
    { name: 'play2',  from: 'Main_Menu',  to: 'Play_Game' },
    { name: 'play3',  from: 'Main_Menu',  to: 'Play_Game' },

    { name: 'settings',  from: 'Play_Game',  to: 'Main_Menu' },
    { name: 'back',  from: 'Main_Menu',  to: 'Play_Game' },

    { name: 'replay',  from: 'Play_Game',  to: 'Replay_Game' },
    { name: 'resetplay',  from: 'Replay_Game',  to: 'Play_Game' }
  ],
  callbacks: {
    ongenesis: function(ev,fr,to,mainObj) {
      loggr.debug("ongenesis() called, moving to state [" + to + "]");
      mainObj.state.start(to);
    },
    onsplash: function(ev,fr,to,mainObj) {
      loggr.debug("onsplash() called, moving to state [" + to + "]");
      mainObj.state.start(to);
    },
    onpreload: function(ev,fr,to,mainObj) {
      loggr.debug("onpreload() called, moving to state [" + to + "]");
      mainObj.state.start(to);
    },
    onready: function(ev,fr,to,mainObj) {
      loggr.debug("onload() called, moving to state [" + to + "]");
      sh.setScreen(to);
    },
    onplay0: function(ev,fr,to,mainObj) {
      loggr.debug("onload() called, moving to state [" + to + "]");
      sh.toggleScreen(to);
    },
    onquit: function(ev,fr,to) {
      ig.system.setDelegateEx(asterix.TicTacToe.startScreen);
    },
    onplay1: function(ev,fr,to) {
      asterix.TicTacToe.mainGame = new (sh.xcfg.game.proto)(1);
      ig.system.setDelegateEx(asterix.TicTacToe.mainGame);
    },
    onplay2: function(ev,fr,to) {
      asterix.TicTacToe.mainGame = new (sh.xcfg.game.proto)(2);
      ig.system.setDelegateEx(asterix.TicTacToe.mainGame);
    },
    onplay3: function(ev,fr,to) {
    },
    onsettings: function(ev,fr,to) {
      ig.system.setDelegateEx(asterix.TicTacToe.mainMenu);
    },
    onback: function(ev,fr,to) {
      ig.system.setDelegateEx(asterix.TicTacToe.mainGame);
    },
    onreplay: function(ev,fr,to) {
      asterix.TicTacToe.mainGame.restart();
    },
    onresetplay: function(ev,fr,to) {
      loggr.debug("onresetplay() called.");
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
    }
  },

  levels: {
  },

  smac: smac

});

sh.xcfg.csts.CELLS = sh.xcfg.csts.GRID_SIZE * sh.xcfg.csts.GRID_SIZE ;


}).call(this);


