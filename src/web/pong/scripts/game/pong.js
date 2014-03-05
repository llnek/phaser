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

(function(undef) { "use strict"; var global=this; var _ = global._;
var asterix = global.ZotohLabs.Asterix;
var sh= asterix.Shell;
var png= asterix.Pong;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

png.GameArena = asterix.XScreen.extends({

  //fontScore: sh.newFonFile('impact', 'ocr_white_16_font.png'),

  scores : { 'O': 0, 'X': 0 },
  MAX_SCORE: 1, //11,

  players: [],
  ball: null,

  play: function() {
    var paddImg= sh.main.cache.getImage('gamelevel1.images.paddle2');
    var ballImg= sh.main.cache.getImage('gamelevel1.images.ball');
    var csts= sh.xcfg.csts;
    var c= sh.main.getCenter();
    var z= sh.main.getSize();
    this.maybeReset();
    this.doLayout();

    var p1 = new png.EntityHuman( csts.TILE + ballImg.width + 4,
                                  c.y - paddImg.height / 2 , { color: 'X' });
    var p2= null;
    switch (csts.GAME_MODE) {
    case 1:
    p2 = new png.EntityRobot( z.x - ballImg.width - paddImg.width - 4,
                              c.y - paddImg.height / 2,
                              { color: 'O' });
    break;
    case 2:
    p2 = new png.EntityHuman( z.x - ballImg.width - paddImg.width - 4,
                              c.y - paddImg.height / 2,
                              { color: 'O' });
    case 3:
    break;
    };

    //sh.phaser.physics.setBoundsToWorld(true,true,true,true);
    /*
    sh.phaser.physics.setBounds(csts.TILE, z.y - csts.TILE, 
                                s.x - csts.TILE*2, s.y- csts.TILE*2, 
                                false,false,true,true);
                                */

    this.players= [ null, p1, p2];
    p2.create(this.group);
    p1.create(this.group);
    this.spawnBall();
  },

  spawnBall: function() {
    var ballImg= sh.main.cache.getImage('gamelevel1.images.ball');
    var c= sh.main.getCenter();
    this.ball = new png.EntityBall( c.x - ballImg.width / 2,
                                c.y - ballImg.height / 2, {});
    this.ball.create(this.group);
  },

  doLayout: function() {
    var ml, c= sh.main.getCenter();
    var s= sh.main.getSize();
    var csts= sh.xcfg.csts;
    // background
    this.map = sh.main.add.tilemap('gamelevel1.tiles.arena');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border');
    this.map.addTilesetImage('BG', 'gamelevel1.images.arena');
    ml= this.map.createLayer('Back',undef, undef, this.group);
    ml= this.map.createLayer('Front',undef, undef, this.group);
  },

  loseFocus: function() {
  },

  focus: function(options) {
    options= options || {};
    switch (options.action) {

      case 'new-2':
        this.newGame(2);
      break;

      case 'new-1':
        this.newGame(1);
      break;

      case 'continue':
      break;

      case 'replay':
        this.replay();
      break;

    }

  },

  newGame: function(mode) {
    sh.main.sfxPlay('start_game');
    this.setGameMode(mode);
    this.resetScores();
    this.play();
  },

  resetScores: function() {
    this.scores= { 'X' : 0, 'O' : 0 };
  },

  maybeReset: function() {
    this.players=[];
  },

  update: function() {
    if (this.ball) {
      this.checkWinner();
    }
  },

  checkWinner: function() {
    if ( this.ball.x + this.ball.width < this.players[1].x) {
      return this.onWinner(this.players[2]);
    } else if (this.ball.x > this.players[2].x + this.players[2].x) {
      return this.onWinner(this.players[1]);
    } else {
      return false;
    }
  },

  onWinner: function(p) {
    var s = this.scores[p.color];
    this.scores[p.color] = s + 1;
    this.ball.kill();
    this.ball=null;
    if (s+1 >= this.MAX_SCORE) {
      this.onDone(p);
    } else {
      this.spawnBall();
    }
  },

  onDone: function(p) {
    //sh.xcfg.sfxPlay(this.sfx.game_end);
    this.replayBtn.visible = true;
    this.lastWinner = p;
  },

  guiBtns: function() {
  },

  gui: function() {
  },

  setGameMode: function(mode) {
    this.parent(mode);
    this.p2ID= sh.l10n("%p2");
    this.p1ID= sh.l10n("%p1");
    if (mode === 1) {
      this.p2Long= sh.l10n('%computer');
      this.p2ID= sh.l10n('%cpu');
    }
  }


});






}).call(this);





