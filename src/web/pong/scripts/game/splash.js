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
var png= asterix.Pong;
var loggr = global.ZotohLabs.logger;
var echt = global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// splash screen for the game - make it look nice please.
//////////////////////////////////////////////////////////////////////////////
png.Splash = asterix.XScreen.extends({

  start: function() {
    var btnImg= sh.main.cache.getImage('splash.play-btn');
    var c= sh.main.getCenter();
    var s= sh.main.getSize();

    sh.main.add.tileSprite(0, 0, s.x, s.y, 'splash.splash',0, this.group);
    sh.main.add.button( c.x - btnImg.width / 2,
                        s.y - btnImg.height * 1.5 ,
                        'splash.play-btn',
                        function() { this.showMainMenu(); },
                        this,
                        0,0,0,0,
                        this.group);
  },

  update: function() {
    if (sh.main.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR) ||
        sh.main.input.keyboard.isDown( Phaser.Keyboard.ENTER)) {
      this.showMainMenu();
    }
  },

  showMainMenu: function() {
    sh.xcfg.smac.play0();
  }

});



}).call(this);


