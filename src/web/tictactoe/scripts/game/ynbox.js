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

  onCreate: function() {
    var csts= sh.xcfg.csts;
    var c= this.getCenter();

    this.gui = this.add.group();

    this.map = this.add.tilemap('gui.ynbox');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border8');
    this.map.addTilesetImage('BG', 'gui.mmenu.bg');
    this.map.createLayer('Back',undef, undef, this.gui);
    this.map.createLayer('Front',undef, undef, this.gui);

    this.question = this.add.bitmapText( 0,0, 'font.downlink', sh.l10n('%quit?'), 16, this.gui);
    this.question.y = c.y - this.question.textHeight / 2;
    this.question.x =  c.x - this.question.textWidth / 2;

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
      sh.toggleScreen('Start_Screen');
    }, this, 0,0,0,0,this.gui);

    hx = s.x - backBtn.width - csts.TILE - csts.S_OFF;
    this.backBtn = this.add.button( hx, hy, 'gui.xbxB', function() {
      sh.revertScreen();
    }, this, 0,0,0,0,this.gui);

  },

  onUpdate: function() {
    if (this.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR) ||
        this.input.keyboard.isDown( Phaser.Keyboard.ENTER)) {
    }
  }

});



}).call(this);


