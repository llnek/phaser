// This library is distributed in  the hope that it will be useful but without
// any  warranty; without  even  the  implied  warranty of  merchantability or
// fitness for a particular purpose.
// The use and distribution terms for this software are covered by the Eclipse
// Public License 1.0  (http://opensource.org/licenses/eclipse-1.0.php)  which
// can be found in the file epl-v10.html at the root of this distribution.
// By using this software in any  fashion, you are agreeing to be bound by the
// terms of this license. You  must not remove this notice, or any other, from
// this software.
//
// Copyright (c) 2013 Cherimoia, LLC. All rights reserved.

(function (undef) { "use strict"; var global = this; var _ = global._ ;

// monkey-patch phaser to do some positional stuff with bitmaptext
Phaser.BitmapText.prototype.repos = function(x,y) {
  this.y= y;
  this.x= x;
  this.world = new Phaser.Point(x,y);
  this.position.set(x,y);
};

// monkey-patch phaser to do what we want with state management.

var orig = Phaser.StateManager.prototype.setCurrentState;

Phaser.StateManager.prototype.setCurrentState = function(key) {
var last= this.getCurrentState();
orig.call(this, key);
var cur= this.getCurrentState();
if (last && last.moniker === 'YesNoBox') {} else {
  cur.setPrevious(last);
}
};

Phaser.StateManager.prototype.resetHistory = function() {
  _.each(this.states, function(v) {
    v.setPrevious(null);
  });
};

Phaser.StateManager.prototype.getState = function(key) {
  return this.states[key];
};

}).call(this);


