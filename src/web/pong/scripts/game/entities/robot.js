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

(function(undef) { "use strict"; var global= this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var pg= asterix.Pong;
var echt= global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
asterix.Pong.EntityRobot = asterix.Pong.EntityPaddle.extend({

  animSheet: new ig.AnimationSheet('media/pong/game/green_paddle.png', 14,48),
  typeiid: 'EntityRobot',

  update: function() {
    var b = ig.game.getEntitiesByType(pg.EntityBall)[0];
    if (echt(b)) {
      this.vel.y = (b.pos.y + b.size.y / 2) > (this.pos.y + this.size.y / 2) ? 150 : -150;
    }
    this.parent();
  },

  init: function(x, y, options) {
    this.parent(x, y, options);
    this.addAnim('show', 1, [0]);
  }

});




}).call(this);


