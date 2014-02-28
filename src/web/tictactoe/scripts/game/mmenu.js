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
sh.protos['Main_Menu'] =  asterix.XScreen.extends({

  onCreate: function() {
    var csts= sh.xcfg.csts;
    var c= this.getCenter();
    this.map = this.add.tilemap('gui.mmenu');
    this.map.addTilesetImage('Borders', 'gui.mmenu.border8');
    this.map.addTilesetImage('BG', 'gui.mmenu.bg');
    this.map.createLayer('Back');
    this.map.createLayer('Front');
    // text => Main Menu => 198x26
    this.title = this.add.bitmapText( c.x-198/2, (csts.TILE * 8 - 26) / 2, 'gui.mmenu.title', '', 24);
  },

  onUpdate: function() {
    this.title.setText( sh.l10n('%mmenu'));
    if (this.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR) ||
        this.input.keyboard.isDown( Phaser.Keyboard.ENTER)) {
    }
  }

});



}).call(this);


