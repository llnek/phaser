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
var sh = asterix.Shell;
var loggr = global.ZotohLabs.logger;
var echt = global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// Main menu.
//////////////////////////////////////////////////////////////////////////////
asterix.MainMenu = asterix.XScreen.extends({

  start: function() {
    var c= sh.main.getCenter();
    var csts= sh.xcfg.csts;

    this.map = sh.main.add.tilemap('gui.mmenu');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border');
    this.map.addTilesetImage('BG', 'gui.mmenu.bg');
    this.map.createLayer('Back',undef, undef, this.group);
    this.map.createLayer('Front',undef, undef, this.group);

    this.title = sh.main.add.bitmapText( 0,0, 'font.TinyBoxBB', sh.l10n('%mmenu'), 24, this.group);
    this.title.repos( c.x - this.title.textWidth / 2,
                      (csts.TILE * 8 - this.title.textHeight) / 2);
    this.createSelections();
    this.ctrlBtns();
  },

  createSelections: function() {
    var b1= sh.main.cache.getImage('gui.mmenu.onep');
    var b2= sh.main.cache.getImage('gui.mmenu.twop');
    var b3= sh.main.cache.getImage('gui.mmenu.netp');
    var c = sh.main.getCenter();
    var s = sh.main.getSize();
    var topy = (s.y - b1.height  - b2.height - b3.height - (2 * 10)) / 2;
    var b, bw= _.max( [ b1.width, b2.width, b3.width ] );
    var topx = (s.x -  bw) / 2;

    b= sh.main.add.button( topx, topy, 'gui.mmenu.onep', function() {
      sh.xcfg.smac.play1();
    }, this, 0,0,0,0,this.group);
    this.btns.push(b);

    b= sh.main.add.button( topx, topy + b2.height + 10, 'gui.mmenu.twop', function() {
      sh.xcfg.smac.play2();
    }, this, 0,0,0,0,this.group);
    this.btns.push(b);

    b= sh.main.add.button( topx, topy + b1.height + b2.height + 20, 'gui.mmenu.netp', function() {
      sh.xcfg.smac.play3();
    }, this, 0,0,0,0,this.group);
    this.btns.push(b);
  },

  ctrlBtns: function() {
    var quitBtn= sh.main.cache.getImage('gui.xbxY');
    var backBtn= sh.main.cache.getImage('gui.xbxB');
    var sfxBtn= sh.main.cache.getImage('gui.audio');
    var b, csts= sh.xcfg.csts;
    var s= sh.main.getSize();
    var hx, hy = s.y - _.max([quitBtn.height, backBtn.height]) - csts.TILE - csts.S_OFF;

    hx = s.x - quitBtn.width - backBtn.width - csts.TILE - 10 - csts.S_OFF;
    b = sh.main.add.button( hx, hy, 'gui.xbxY', function() {
      sh.main.flyout(asterix.YesNoBox,{
        yes: function() { sh.xcfg.smac.quit(); }
      });
    }, this, 0,0,0,0,this.group);
    this.btns.push(b);

    hx = s.x - backBtn.width - csts.TILE - csts.S_OFF;
    b = sh.main.add.button( hx, hy, 'gui.xbxB', function() {
      this.goback();
    }, this, 0,0,0,0,this.group);
    this.btns.push(b);

    hx = csts.TILE + csts.S_OFF;
    this.audioBtn = sh.main.add.sprite( hx, hy, 'gui.audio', sh.xcfg.sound.open ? 1 : 0, this.group);
    this.audioBtn.inputEnabled=true;
    this.audioBtnListener = this.audioBtn.events.onInputDown.add(function() {
      sh.xcfg.toggleSfx();
      this.audioBtn.frame= sh.xcfg.sound.open ? 1 : 0;
    },this);

  },

  goback: function() {
    switch (this.prev.moniker) {

      case 'Arena':
        sh.xcfg.smac.back();
      break;

      case 'Splash':
        sh.xcfg.smac.quit();
      break;

    }
  },

  preDeathFinz: function() {
    if (this.audioBtnListener) { this.audioBtnListener.detach(); }
    if (this.audioBtn) { this.audioBtn.inputEnabled=false; }
    this.audioBtnListener=null;
    this.audioBtn=null;
  }


});



}).call(this);


