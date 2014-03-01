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
var ttt= asterix.TicTacToe;
var sh = asterix.Shell;
var loggr = global.ZotohLabs.logger;
var echt = global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
sh.protos['YesNoBox'] =  asterix.XScreen.extends({

  moniker: 'YesNoBox',

  onCreate: function(options) {
    var csts= sh.xcfg.csts;
    var c= this.getCenter();
    var fc= function() {
      sh.popState();
    }

    this.gui = this.add.group();
    this.yesFunc= fc;
    this.noFunc= fc;

    if (echt(options.yes)) { this.yesFunc= options.yes; }
    if (echt(options.no)) { this.noFunc= options.no; }

    this.map = this.add.tilemap('gui.ynbox');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border8');
    this.map.addTilesetImage('BG', 'gui.mmenu.bg');
    this.map.createLayer('Back',undef, undef, this.gui);
    this.map.createLayer('Front',undef, undef, this.gui);

    this.question = this.add.bitmapText( 0,0, 'font.Downlink', sh.l10n('%quit?'), 16, this.gui);
    this.question.repos( c.x - this.question.textWidth / 2, c.y - this.question.textHeight / 2);
    //this.question.y = c.y - this.question.textHeight / 2;
    //this.question.x =  c.x - this.question.textWidth / 2;

    this.ctrlBtns();
  },

  ctrlBtns: function() {
    var backBtn= this.cache.getImage('gui.xbxB');
    var yesBtn= this.cache.getImage('gui.xbxA');
    var csts= sh.xcfg.csts;
    var s= this.getSize();
    var hx, hy = s.y - _.max([yesBtn.height, backBtn.height]) - csts.TILE - csts.S_OFF;

    hx = s.x - yesBtn.width - backBtn.width - csts.TILE - 10 - csts.S_OFF;
    this.yesBtn = this.add.button( hx, hy, 'gui.xbxA', function() {
      this.yesFunc();
    }, this, 0,0,0,0,this.gui);

    hx = s.x - backBtn.width - csts.TILE - csts.S_OFF;
    this.backBtn = this.add.button( hx, hy, 'gui.xbxB', function() {
      this.noFunc();
    }, this, 0,0,0,0,this.gui);

  },

  onUpdate: function() {
    if (this.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR) ||
        this.input.keyboard.isDown( Phaser.Keyboard.ENTER)) {
    }
  },

  bindYes: function(cb) {
    this.yesFunc = cb;
  },

  bindNo: function(cb) {
    this.noFunc = cb;
  }


});



}).call(this);


