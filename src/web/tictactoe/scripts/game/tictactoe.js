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

(function (undef){ "use strict"; var global = this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var klass = global.ZotohLabs.klass;
var loggr= global.ZotohLabs.logger;
var echt= global.ZotohLabs.echt;
var ttt= asterix.TicTacToe;
var sh = asterix.Shell;
var Cmd= klass.extends({
  ctor: function(a,pos) {
    this.cell=pos;
    this.actor=a;
  }
});

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
sh.protos['PlayGame'] = asterix.XScreen.extends({

  moniker: 'PlayGame',

  /*
  fontHead16_Amber: sh.newFonFile('impact','tinybox_white_16_font.png', { fontColor: '#ff6600'}),
  fontHead16_Red: sh.newFonFile('impact', 'tinybox_white_16_font.png', { fontColor: '#ee1d05'}),
  fontHead8: sh.newFonFile('impact','256_white_16_font.png'),
  fontScore: sh.newFonFile('impact','crystal_radio_kit_white_16_font.png'),
  fontResult: sh.newFonFile('impact','tinybox_white_16_font.png'),
  */

  p2Long: sh.l10n('%player2'),
  p1Long: sh.l10n('%player1'),

  p2ID: '',
  p1ID: '',

  actions: [],
  board: null,
  actor: null,
  players: [],

  scores:  { 'O': 0, 'X': 0 },

  // map of the screen co-ords of each cell in the grid
  gridMap: [],

  // holds references to entities
  cells: [],

  onCreate: function(options) {

    this.setGameMode(options.mode);
    this.mapGridPos();

    // initialize the board and create the 2 players.
    sh.xcfg.sfxPlay('start_game');
    this.maybeReset();

    var p1= new ttt.Human(sh.xcfg.csts.CV_X, 0, 'X');
    var p2= null;
    switch (sh.xcfg.csts.GAME_MODE) {
      case 1:
        p2= new ttt.AlgoBot(sh.xcfg.csts.CV_O, 1, 'O');
      break;
      case 2:
        p2= new ttt.Human(sh.xcfg.csts.CV_O, 1, 'O');
      break;
      case 3:
      break;
    }

    this.board = new ttt.Board(sh.xcfg.csts.GRID_SIZE);
    this.board.registerPlayers(p1, p2);
    this.players= [null,p1,p2];
    this.actions = [];

  },

  onRestart: function() {
  // stop and restarts the game, score is NOT cleared.
    sh.xcfg.smac.resetplay();
    this.stop();
    this.start();
  },

  fzCreate: function() {
  // randomly decide who goes first, if robot, then randomly pick a start cell.
    this.cells= global.ZotohLabs.makeArray( this.board.getBoardSize() * this.board.getBoardSize(), null);
  },

  preStart: function() {
    this.input.onDown.add(function() { this.processInputs(); }, this);
    this.actor = this.board.getCurActor();
    if (this.actor.isRobot()) {
      this.move( new Cmd(this.actor, asterix.fns.rand(sh.xcfg.csts.CELLS)));
    }
    loggr.debug("game started, initor = " + this.actor.getColor());
  },

  maybeReset: function() {
  // clean up
    this.actor=null;
    this.players=[];
    this.cells=[];
  },

  move: function(cmd) {
  // given a command object, make a move
  // if the move is valid, then a corresponding action is added to the
  // queue, such as drawing the icon , playing a sound...etc
    loggr.debug("actor = " + cmd.actor.getColor() + ", pos = " + cmd.cell);
    var me= this;
    this.board.enqueue(cmd, function(cmd, status, np) {
      // crap move, is ignored for now.
      if (status !== 'bogus') {
        me.actions.push([cmd, status]);
      }
      if (status === 'next') {
        // there is a next, so move was valid and game has not ended.
        // switch the players.
        me.actor= np;
        if (np.isRobot()) {
          // fake some thinking time...
          setTimeout(function() {
            me.move( new Cmd(np, np.takeTurn()));
          }, 1000);
        }
      }
    });
  },

  onclicked: function(mx,my) {
  // handle user input.
    if (this.board && this.board.isActive() ) {
      var cell= this.clickToCell(mx, my);
      if (cell >= 0) {
        this.move( new Cmd(this.actor, cell));
      }
    }
  },

  processInputs: function() {
    this.onclicked(this.input.activePointer.x, this.input.activePointer.y);
  },

  onUpdate: function() {
  // null board => game over
    if (this.board) {
      if (this.actions.length > 0) {
      // update the board.
          var _ref = this.actions.pop();
          var status = _ref[1];
          var cmd= _ref[0];
          var c = this.cellToGrid(cmd.cell);
          if (c) {
            switch (cmd.actor.getValue()) {
              case sh.xcfg.csts.CV_X:
                sh.xcfg.sfxPlay('x_pick');
              break;
              case sh.xcfg.csts.CV_O:
                sh.xcfg.sfxPlay('o_pick');
              break;
            }
            this.cells[cmd.cell] = this.add.sprite(c[0],c[1], 'gamelevel1.sprites.markers', cmd.actor.getPic() );
          }
      } else {
        this.checkEnding();
      }
    }
  },

  checkEnding: function() {
    if (this.board &&  !this.board.isActive()) {
      if (this.board.isStalemate()) {
        this.doStalemate();
      } else {
        var rc= this.board.checkWinner();
        if (rc[0]) {
          this.doWin(rc);
        }
      }
    }
  },

  doStalemate: function() {
    this.doDone(null, []);
  },

  doWin: function(info) {
    var combo= info[1];
    var p= info[0];
    var s = this.scores[p.getColor()];
    this.scores[p.getColor()] = s + 1;
    this.doDone(p,info[1]);
  },

  showWinningIcons: function(combo) {
  // flip all other icons except for the winning ones.
    var c, me= this;
    _.each(this.cells, function(z,n) {
      if (! _.contains(combo,n)) { if (z) { z.flip=true; } }
    });
  },

  doDone: function(p,combo) {
    //this.replayBtn.toggleVisible(true);
    //this.showWinningIcons(combo);
    sh.xcfg.sfxPlay('game_end');
    this.lastWinner = p;
    this.board.finz();
    this.board=null;
  },

  drawGui: function() {
    if (this.board) {
      if (this.board.isActive()) {
        this.drawStatus();
      }
    } else {
      this.drawResult();
    }
  },

  clickToCell: function(px,py) {
  // which cell did he click on?
    var gg, n;
    for (n=0; n < sh.xcfg.csts.CELLS; ++n) {
      gg = this.gridMap[n];
      if (px >= gg[0] && px <= gg[2] && py >= gg[1] && py <= gg[3]) {
        return n;
      }
    }
    return -1;
  },

  mapGridPos: function() {
  // memorize the co-ordinates of each cell on the board, so
  // we know which cell the user has clicked on.
    var csts= sh.xcfg.csts;
    var x2, x1 = csts.LEFT;
    var y2, y1 = (csts.GRID_H - (3 * csts.HOLE + 2 * csts.R_GAP)) / 2;
    var r,c,n, _results = [];

    for (n=0; n < csts.CELLS; ++n) {
      this.gridMap[n] = [];
    }
    for (r=0; r < csts.GRID_SIZE; ++r) {
      for (c= 0; c < csts.GRID_SIZE; ++c) {
        x2 = x1 + csts.HOLE;
        y2 = y1 + csts.HOLE;
        this.gridMap[r * csts.GRID_SIZE + c] = [x1 * csts.TILE,
                                                y1 * csts.TILE,
                                                x2 * csts.TILE, y2 * csts.TILE];
        x1 = x2 + csts.C_GAP;
      }
      y1 = y1 + csts.HOLE + csts.R_GAP;
      x1 = csts.LEFT;
      _results.push(x1);
    }
  },

  cellToGrid: function(pos) {
  // given a cell, find the screen co-ordinates for that cell.
    var gg, x, y, csts= sh.xcfg.csts;
    if (pos >= 0 && pos < csts.CELLS) {
      gg = this.gridMap[pos];
      x = gg[0] + (gg[2] - gg[0]  - csts.PIC_SIZE) / 2;
      y = gg[1] + (gg[3] - gg[1] - csts.PIC_SIZE) / 2;
      return [x, y];
    } else {
      return null;
    }
  },

  drawStatus: function() {
  /*
    var pfx, msg, x, y, csts= sh.xcfg.csts;
    y = (csts.GRID_H - csts.GAP) * csts.TILE;
    x = ig.system.width / 2;
    if (this.actor.isRobot()) {
      pfx = sh.l10n('%computer');
    }
    else if (this.actor.getColor() === 'X') {
      pfx = sh.l10n('%player1');
    } else {
      pfx = sh.l10n('%player2');
    }
    msg = sh.l10n('%whosturn', {who: pfx});
    this.fontHead8.draw(msg, x, y, ig.Font.ALIGN.CENTER);
    */
  },

  drawResult: function() {
  // report game result please.
    /*
    var msg, p1, p2, x, y, csts= sh.xcfg.csts;
    y = (csts.GRID_H - csts.GAP) * csts.TILE;
    x = ig.system.width / 2;
    p2= this.players[2];
    p1= this.players[1];
    switch (this.lastWinner) {
      case p2: msg= sh.l10n('%whowin', { who: this.p2Long}); break;
      case p1: msg= sh.l10n('%whowin', { who: this.p1Long}); break;
      default: msg= sh.l10n('%whodraw'); break;
    }
    this.fontResult.draw(msg, x, y, ig.Font.ALIGN.CENTER);
    */
  },

  drawScores: function() {
    var s2 = 1; //this.scores[this.players[2].getColor()];
    var s1 = 653;//this.scores[this.players[1].getColor()];
    var csts= sh.xcfg.csts;
    var s = this.getSize();
    var n2 = global.ZotohLabs.prettyNumber(s2,3);
    var n1 = global.ZotohLabs.prettyNumber(s1,3);

    this.score1.setText(n1);
    this.score1.updateText();
    //this.score1.repos( csts.TILE + csts.GAP, csts.TILE + csts.GAP + (3 * csts.TILE));
    this.score1.repos( csts.TILE + csts.GAP, csts.TILE + csts.GAP );

    this.score2.setText(n2);
    this.score2.updateText();
    this.score2.repos( s.x - csts.TILE - csts.GAP - this.score2.textWidth ,
      //csts.TILE + csts.GAP + (3 * csts.TILE));
      csts.TILE + csts.GAP);
  },

  guiBtns: function() {
    var img2= this.cache.getImage('game.arena.replay');
    var img1= this.cache.getImage('game.arena.menu');
    var csts = sh.xcfg.csts;
    var s= this.getSize();
    var x,y;

    y = s.y - csts.TILE - img2.height - csts.S_OFF;
    x = csts.TILE + csts.S_OFF;
    this.replayBtn = this.add.button( x, y, 'game.arena.replay', function() {
    }, this, 0,0,0,0,this.gui);
    this.replayBtn.visible=false;

    y = s.y - csts.TILE - img1.height - csts.S_OFF;
    x = s.x - csts.TILE - img1.width - csts.S_OFF;
    this.menuBtn = this.add.button( x, y, 'game.arena.menu', function() {
    }, this, 0,0,0,0,this.gui);

  },

  doLayout: function() {
    this.gui = this.add.group();
    var csts= sh.xcfg.csts;
    var c= this.getCenter();
    var s= this.getSize();
    // background
    this.map = this.add.tilemap('gamelevel1.tiles.arena');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border8');
    this.map.addTilesetImage('BG', 'gamelevel1.images.arena');
    this.map.createLayer('Back',undef, undef, this.gui);
    this.map.createLayer('Grid',undef, undef, this.gui);
    this.map.createLayer('Front',undef, undef, this.gui);

    /*
    this.p1Hdr = this.add.bitmapText( 0,0, 'font.TinyBoxBB', this.p1ID, 16, this.gui);
    this.p1Hdr.repos(csts.TILE + csts.GAP, csts.TILE + csts.GAP);

    this.p2Hdr = this.add.bitmapText( 0,0, 'font.TinyBoxBB', this.p2ID, 16, this.gui);
    this.p2Hdr.repos( s.x - csts.TILE - csts.GAP - this.p2Hdr.textWidth, csts.TILE + csts.GAP);
    */

    var xxx= this.p1ID + " / " + this.p2ID;
    this.scoreHdr = this.add.bitmapText( 0,0, 'font.TinyBoxBB', xxx, 12, this.gui);
    this.scoreHdr.repos( (s.x - this.scoreHdr.textWidth) / 2, csts.TILE + csts.GAP);

    //s1 = me.scores[me.players[1].getColor()];
      //this.text = global.ZotohLabs.prettyNumber(s2,3);
    this.score1 = this.add.bitmapText( 0,0, 'font.TinyBoxBB', '888', 20, this.gui);
    this.score1.tint= 0xee1d05;
    this.score2 = this.add.bitmapText( 0,0, 'font.TinyBoxBB', '888', 20, this.gui);
    this.score2.tint= 0xff6600;

    this.drawScores();
    this.guiBtns();
  },

  setGameMode: function(mode) {
    this.parent(mode);
    this.p2ID= sh.l10n('%p2');
    this.p1ID= sh.l10n('%p1');
    if (mode === 1) {
      this.p2Long= sh.l10n('%computer');
      this.p2ID= sh.l10n('%cpu');
    }
  }


});






}).call(this);



