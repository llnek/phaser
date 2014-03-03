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
    { name: 'genesis',  from: 'none',  to: 'StartScreen' },

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
    ongenesis: function(ev,fr,to) {
      sh.logstate("ongenesis",fr,to);
      sh.main.invoke('Splash');
    },
    onplay0: function(ev,fr,to,mainObj) {
      sh.logstate("onplay0",fr,to);
      sh.main.invoke('MMenu');
    },
    onquit: function(ev,fr,to) {
      sh.logstate("onquit",fr,to);
      sh.main.invoke('Splash');
    },
    onplay1: function(ev,fr,to) {
      sh.logstate("onplay1",fr,to);
      sh.main.invoke('Arena', { mode: 1 });
    },
    onplay2: function(ev,fr,to) {
      sh.logstate("onplay2",fr,to);
      sh.main.invoke('Arena', { mode: 2 });
    },
    onplay3: function(ev,fr,to) {
      sh.logstate("onplay3",fr,to);
      //sh.main.invoke('Arena', { mode: 3 });
    },
    onsettings: function(ev,fr,to) {
      sh.logstate("onsettings",fr,to);
      sh.main.invoke('MMenu');
    },
    onback: function(ev,fr,to) {
      sh.logstate("onback",fr,to);
      // zero means continue last game
      sh.main.invoke('Arena', { action: 'continue' });
    },
    onreplay: function(ev,fr,to) {
      sh.logstate("onreplay",fr,to);
      sh.main.invoke('Arena', { action: 'replay' });
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
    //COL: [10, 10, 10],
    //ROW: [11, 11, 11],
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
    HOLE: 10,
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
      "game.arena.menu" : 'media/phaserio/btns/settings-x32.png',
      "game.arena.replay" : 'media/phaserio/btns/replay-x32.png'
    },
    sounds: {
      game_end: 'media/phaserio/sfx/MineExplosion.mp3',
      x_pick: 'media/phaserio/sfx/ElevatorBeep.mp3',
      o_pick: 'media/phaserio/sfx/MineBeep.mp3',
      quit: 'media/phaserio/sfx/PlayerMonsterFall.mp3'
    },
    fonts: {
      'font.CrystalRadioKit' : [ 'media/phaserio/fon/{{lang}}/', 'CrystalRadioKit.png', 'CrystalRadioKit.xml' ],
      'font.SugarPie' : [ 'media/phaserio/fon/{{lang}}/', 'SugarPie.png', 'SugarPie.xml' ],
      'font.256Bytes' : [ 'media/phaserio/fon/{{lang}}/', '256Bytes.png', '256Bytes.xml' ],
      'font.Subito' : [ 'media/phaserio/fon/{{lang}}/', 'Subito.png', 'Subito.xml' ]
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

  smac: StateMachine.create({
    events: [
      { name: 'genesis',  from: 'none',  to: 'StartScreen' },
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
      ongenesis: function(ev,fr,to) { sh.main.invoke('Splash'); },
      onplay0: function(ev,fr,to,mainObj) { sh.main.invoke('MMenu'); },
      onquit: function(ev,fr,to) { sh.main.invoke('Splash'); },
      onplay1: function(ev,fr,to) { sh.main.invoke('Arena', 'new-1'); },
      onplay2: function(ev,fr,to) { sh.main.invoke('Arena', 'new-2'); },
      onplay3: function(ev,fr,to) {},
      onsettings: function(ev,fr,to) { sh.main.invoke('MMenu'); },
      onback: function(ev,fr,to) { sh.main.invoke('Arena', 'continue'); },
      onreplay: function(ev,fr,to) { sh.main.invoke('Arena', 'replay'); },
      onresetplay: function(ev,fr,to) {}
    }
  })


});

sh.xcfg.csts.CELLS = sh.xcfg.csts.GRID_SIZE * sh.xcfg.csts.GRID_SIZE ;


}).call(this);


