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
ttt.YesNoBox =  asterix.XScreen.extends({

  start: function() {
    var c= sh.main.getCenter();
    var s= sh.main.getSize();
    var csts= sh.xcfg.csts;

    this.map = sh.main.add.tilemap('gui.ynbox');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border8');
    this.map.addTilesetImage('BG', 'gui.mmenu.bg');
    this.map.createLayer('Back',undef, undef, this.group);
    this.map.createLayer('Front',undef, undef, this.group);

    this.question = sh.main.add.bitmapText( 0,0, 'font.Downlink', sh.l10n('%quit?'), 16, this.group);
    this.question.repos( c.x - this.question.textWidth / 2,
      c.y - this.question.textHeight / 2);

    var backBtn= sh.main.cache.getImage('gui.xbxB');
    var yesBtn= sh.main.cache.getImage('gui.xbxA');
    var hx, hy = s.y - _.max([yesBtn.height, backBtn.height]) - csts.TILE - csts.S_OFF;

    hx = s.x - yesBtn.width - backBtn.width - csts.TILE - 10 - csts.S_OFF;
    this.yesBtn = sh.main.add.button( hx, hy, 'gui.xbxA', function() {
      this.yesFunc();
    }, this, 0,0,0,0,this.group);

    hx = s.x - backBtn.width - csts.TILE - csts.S_OFF;
    this.backBtn = sh.main.add.button( hx, hy, 'gui.xbxB', function() {
      this.noFunc();
    }, this, 0,0,0,0,this.group);

  },

  loseFocus: function() {
    this.parent();
    // if we don't do this, the whole thing messes up
    // that is, looks like we need to clean out all the input handlers from 
    // the buttons
    this.backBtn.destroy();
    this.yesBtn.destroy();
    this.group.removeAll();
  },

  focus: function(options) {
    options = options || {};
    this.parent(options);
    if (echt(options.yes)) { this.yesCB= options.yes; }
    if (echt(options.no)) { this.noCB= options.no; }
  },

  yesFunc: function() {
    sh.main.defly(this);
    if (this.yesCB) { this.yesCB(); }
  },

  noFunc: function() {
    sh.main.defly(this);
    if (this.noCB) { this.noCB(); }
  },

  bindYes: function(cb) {
    this.yesCB = cb;
  },

  bindNo: function(cb) {
    this.noCB = cb;
  }


});



}).call(this);


