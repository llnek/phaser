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

(function(undef) { "use stricts"; var global = this ; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var sh = asterix.Shell;
var loggr= global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

sh.protos['Boot']  = asterix.XScreen.extends({

  onPreload: function () {
    this.load.image('loadingBar', 'media/phaserio/game/preloader_bar.png');
    this.load.image('zLogo', 'media/main/logos/ZotohLabs_x200.png');
  },

  onCreate: function () {
    // unless you expect multi-touch, stick to 1
    this.input.maxPointers = 1;

    // Phaser will automatically pause if the browser tab the game is in loses focus. 
    // You can disable that here:
    //this.stage.disableVisibilityChange = true;

    this.stage.scale.pageAlignHorizontally = true;
    if (this.game.device.desktop) {
      // any desktop specific settings
      // they can go in here
    } else {
      this.stage.scale.forceLandscape = sh.xcfg.game.landscape;
      this.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      this.stage.scale.minHeight = sh.xcfg.game.size.height;
      this.stage.scale.minWidth = sh.xcfg.game.size.width;
      this.stage.scale.maxHeight = sh.xcfg.game.size.height * sh.xcfg.game.size.scale;
      this.stage.scale.maxWidth = sh.xcfg.game.size.width * sh.xcfg.game.size.scale;
      this.stage.scale.setScreenSize(true);
    }
  },

  onUpdate: function() {
    sh.xcfg.smac.splash(sh.main);
  }


});



}).call(this);


