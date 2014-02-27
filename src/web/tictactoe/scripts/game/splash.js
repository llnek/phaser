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
/*
asterix.TicTacToe.MainMenu = asterix.XMainMenu.extend({
  appObj: ttt
});
*/

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
/*
var PlayBtnCtor= asterix.XButtonFactory.define({
  animSheet: new ig.AnimationSheet(sh.imgFile('tictactoe','gui','play_btn.png'), 194,58),
  size: { x: 194, y: 58 },
  clicker: function() { sh.xcfg.smac.play0(); }
});
*/
//////////////////////////////////////////////////////////////////////////////
// splash screen for the game - make it look nice please.
//////////////////////////////////////////////////////////////////////////////
sh.protos['Game'] =  asterix.XScreen.extends({

  noPreload: function() {
  },

  onCreate: function() {
    var btnImg= this.cache.getImage('splash.play-btn');
    var c= this.getCenter();
    var s= this.getSize();

    this.gui = this.add.group();
    this.add.tileSprite(0, 0, s.x, s.y, 'splash.splash',0, this.gui);
    this.btn= this.add.button( c.x, s.y - btnImg.height * 1.5 , 'splash.play-btn', function() {
      sh.xcfg.smac.play0();
    }, this, 0,0,0,0,this.gui);
    this.anchor(this.btn);
  },

  onUpdate: function() {
    if (this.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR) ||
        this.input.keyboard.isDown( Phaser.Keyboard.ENTER)) {
      sh.xcfg.smac.play0();
    }
  },

  moniker: 'startscreen'

});



}).call(this);


