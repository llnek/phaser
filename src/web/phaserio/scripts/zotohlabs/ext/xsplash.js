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

(function (undef) { "use strict"; var global=this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var sh = asterix.Shell;
var loggr = global.ZotohLabs.logger;
//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

asterix.XSplashScreen = asterix.XGame.extend({

  instructFont: new ig.Font('media/impact/fon/en/04b03.font.png'),

  update: function () {
    if (this.pressed('continue')) {
      ig.system.setGame( sh.xcfg.game.proto);
    }
    this.parent();
  },

  draw: function () {
    this.parent();
    //this.drawScreen();
  },

  drawScreen: function() {
    this.instructFont.draw( sh.xcfg.getStartInstruction(),
      ig.system.width * 0.5, ig.system.height * 0.5, ig.Font.ALIGN.CENTER);
  },

  init: function () {
    this.parent();
  }

});




}).call(this);


