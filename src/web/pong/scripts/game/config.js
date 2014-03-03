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

(function (undef) { "use strict"; var global= this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var sh= asterix.Shell;
var loggr = global.ZotohLabs.logger;
asterix.Pong= {};

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

sh.xcfg = ig.merge( asterix.XConfig, {

  appid: 'pong',

  csts: {
    GRID_W: 60,
    GRID_H: 40,
    TILE: 8
  },

  assets: {
    tiles: {
    },
    images: {
      "game.arena.menu" : 'media/phaserio/btns/settings-x32.png',
      "game.arena.replay" : 'media/phaserio/btns/replay-x32.png'
    },
    sounds: {
      'game_end' : [ 'media/phaserio/sfx/MineExplosion.mp3', 'media/phaserio/sfx/MineExplosion.ogg'],
      'x_pick' : [ 'media/phaserio/sfx/ElevatorBeep.mp3', 'media/phaserio/sfx/ElevatorBeep.ogg'],
      'o_pick' : [ 'media/phaserio/sfx/MineBeep.mp3', 'media/phaserio/sfx/MineBeep.ogg'],
      'quit' : [ 'media/phaserio/sfx/PlayerMonsterFall.mp3', 'media/phaserio/sfx/PlayerMonsterFall.ogg' ]
    },
    fonts: {
    }
  },

  devices: {
    iphone:{height:320, width:480, scale:1},
    android:{height:320, width:480, scale:1},
    ipad:{height:320, width:480, scale:2},
    default:{height:320, width:480, scale:1}
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



}).call(this);


