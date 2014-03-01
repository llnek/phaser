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
// splash screen for the game - make it look nice please.
//////////////////////////////////////////////////////////////////////////////
sh.protos['MainMenu'] =  asterix.XScreen.extends({

  moniker: 'MainMenu',

  onCreate: function() {
    var csts= sh.xcfg.csts;
    var c= this.getCenter();

    this.gui = this.add.group();

    this.map = this.add.tilemap('gui.mmenu');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border8');
    this.map.addTilesetImage('BG', 'gui.mmenu.bg');
    this.map.createLayer('Back',undef, undef, this.gui);
    this.map.createLayer('Front',undef, undef, this.gui);

    //this.title = this.add.bitmapText( c.x-198/2, (csts.TILE * 8 - 24) / 2, 'gui.mmenu.title', '', 24);
    // this is rather a round about way, need to figure out the width/height of text
    // then reset the anchor point.
    this.title = this.add.bitmapText( 0,0, 'font.tinyBoxBB', sh.l10n('%mmenu'), 24, this.gui);
    this.title.y = (csts.TILE * 8 - this.title.textHeight) / 2;
    this.title.x =  c.x - this.title.textWidth / 2;

    this.createSelections();
    this.ctrlBtns();
  },

  createSelections: function() {
    var b1= this.cache.getImage('gui.mmenu.onep');
    var b2= this.cache.getImage('gui.mmenu.twop');
    var b3= this.cache.getImage('gui.mmenu.netp');
    var c = this.getCenter();
    var s = this.getSize();
    var topy = (s.y - b1.height  - b2.height - b3.height - (2 * 10)) / 2;
    var bw= _.max( [ b1.width, b2.width, b3.width ] );
    var topx = (s.x -  bw) / 2;

    this.onep= this.add.button( topx, topy, 'gui.mmenu.onep', function() {
    }, this, 0,0,0,0,this.gui);

    this.twop= this.add.button( topx, topy + b2.height + 10, 'gui.mmenu.twop', function() {
    }, this, 0,0,0,0,this.gui);

    this.netp= this.add.button( topx, topy + b1.height + b2.height + 20, 'gui.mmenu.netp', function() {
    }, this, 0,0,0,0,this.gui);
  },

  ctrlBtns: function() {
    var quitBtn= this.cache.getImage('gui.xbxY');
    var backBtn= this.cache.getImage('gui.xbxB');
    var sfxBtn= this.cache.getImage('gui.audio');
    var csts= sh.xcfg.csts;
    var s= this.getSize();
    var hx, hy = s.y - _.max([quitBtn.height, backBtn.height]) - csts.TILE - csts.S_OFF;

    hx = s.x - quitBtn.width - backBtn.width - csts.TILE - 10 - csts.S_OFF;
    this.quitBtn = this.add.button( hx, hy, 'gui.xbxY', function() {
      sh.pushState('YesNoBox', { yes: function() {
        sh.xcfg.smac.quit();
      } });
    }, this, 0,0,0,0,this.gui);

    hx = s.x - backBtn.width - csts.TILE - csts.S_OFF;
    this.backBtn = this.add.button( hx, hy, 'gui.xbxB', function() {
      switch (this.getPrevious().moniker) {
      case 'StartScreen': sh.xcfg.smac.quit(); break;
      case 'PlayGame': sh.xcfg.smac.back(); break;
      default: throw new Error("No valid state to go back to!");
      }
    }, this, 0,0,0,0,this.gui);

    hx = csts.TILE + csts.S_OFF;
    this.audioBtn = this.add.sprite( hx, hy, 'gui.audio',
      sh.xcfg.sound.open ? 1 : 0, this.gui);
    this.audioBtn.inputEnabled=true;
    this.audioBtn.events.onInputDown.add(function() {
      sh.xcfg.sound.open = ! sh.xcfg.sound.open;
      this.audioBtn.frame= sh.xcfg.sound.open ? 1 : 0;
    },this);

  },

  onUpdate: function() {
    if (this.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR) ||
        this.input.keyboard.isDown( Phaser.Keyboard.ENTER)) {
    }
  }


});



}).call(this);


