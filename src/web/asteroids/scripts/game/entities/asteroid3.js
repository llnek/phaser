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

(function(undef) { "use strict"; var global = this; _ = global._ ;

var asterix = global.ZotohLabs.Asterix;
var sh = asterix.Shell;
var ao = asterix.Asteroids;
var loggr= global.ZotohLabs.logger;
var echt= global.ZotohLabs.echt;


//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
asterix.Asteroids.EntityAsteroid3 = ao.EntityAster.extend({

  animSheet: new ig.AnimationSheet('media/asteroids/game/rock_small.png', 16,17),
  size: { x: 16, y: 17 },

  init: function(x,y,settings) {
    this.addAnim('show', 1,[0]);
    this.parent(x,y,settings);
    this.vel.x=asterix.fns.randomSign() * asterix.fns.rand(100);
    this.vel.y=asterix.fns.randomSign() * asterix.fns.rand(100);
  }

});




}).call(this);



