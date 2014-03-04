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

(function(undef) { "use strict"; var global=this; var _ = global._ ;
var asterix = global.ZotohLabs.Asterix;
var png = asterix.Pong;
var sh = asterix.Shell;
var loggr= global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
png.EntityHuman = png.EntityXXX.extends({

  update: function() {
    if (sh.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.sprite.body.velocity.x = -200;
    }
    else
    if (sh.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.sprite.body.velocity.x = 200;
    }
    if (sh.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      fireBullet();
    }
    if (ig.input.state('down')) {
      this.onDown();
    }
    if (ig.input.state('up')) {
      this.onUp();
    }
    this.parent();
  },

  onDown: function() {
    var py = (this.pos.y + this.size.y) - ig.game.screen.y;
    if (py < ig.system.height) {
      this.vel.y = 150;
    }
  },

  onUp: function() {
    var py = this.pos.y - ig.game.screen.y;
    if (py > 0) {
      this.vel.y = -150;
    }
  }

});




}).call(this);


