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

(function(undef){ "use strict"; var global= this; var _ = global._ ;
var asterix= global.ZotohLabs.Asterix;
var png= asterix.Pong;
var loggr = global.ZotohLabs.logger;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////

png.EntityXXX = global.ZotohLabs.klass.extends({

  create: function() {
    this.sprite = sh.main.add.sprite(this.start.x, this.start.y, this.key);
    this.sprite.physicsEnabled = true;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
  },

  ctor: function(x,y,options) {
    this.picColor= options.color;
    this.key= options.key;
    this.start = { x: x, y: y };
  }

});

Object.defineProperty(png.EntityXXX.prototype, "color", {
  get: function() { return this.picColor; }
});



}).call(this);


