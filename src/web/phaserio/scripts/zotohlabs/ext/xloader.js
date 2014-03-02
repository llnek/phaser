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

sh.protos['Preloader']  = asterix.XState.extends({

  onPreload: function () {
    var imgLogo= this.cache.getImage('zLogo');
    var p, vv, c= this.getCenter();
    var me= this;

    this.gui = this.add.group();

    this.logo = this.add.sprite( c.x, c.y, 'zLogo', this.gui);
    this.anchor(this.logo);

    this.bar = this.add.sprite( c.x, c.y +  imgLogo.height/2 + 4, 'loadingBar', this.gui);
    this.anchor(this.bar);

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.
    this.load.setPreloadSprite(this.bar);

    _.each(sh.xcfg.assets.sprites, function(v,k) {
      me.doLoadSprite(k,v);
    });

    _.each(sh.xcfg.assets.images, function(v,k) {
      me.doLoadImage(k,v);
    });

    _.each(sh.xcfg.assets.sounds, function(v,k) {
      me.load.audio(k, (vv=sh.sanitizeUrl(v)));
      loggr.debug("loaded sfx [" + k + "] = " + vv);
    });

    _.each(sh.xcfg.assets.fonts, function(v,k) {
      // value is array of [ path, image , xml ]
      p= sh.sanitizeUrl(v[0]);
      vv = p + v[1];
      me.load.bitmapFont(k, vv, p + v[2]);
      loggr.debug("loaded bitmap-font [" + k + "] = " + vv);
    });

    _.each(sh.xcfg.assets.tiles, function(v,k) {
      me.doLoadTile(k,v);
    });

    if (sh.xcfg.preloadLevels) {
      this.doLoadLevels();
    }
  },

  doLoadLevels: function() {
    var z, me=this; _.each(sh.xcfg.levels, function(v,k) {
      _.each(v,function(obj,n){
        _.each(obj, function(item, x) {
          z=  k + '.' + n + '.' + x;
          switch (n) {
            case 'sprites': me.doLoadSprite( z,item); break;
            case 'images': me.doLoadImage( z, item); break;
            case 'tiles': me.doLoadTile( z, item); break;
          }
        });
      });
    });
  },

  doLoadSprite: function(k, v) {
    var vv= sh.sanitizeUrl(v[0]);
    if (v[3] === -1) {
      this.load.spritesheet(k, vv, v[1], v[2]);
    } else {
      this.load.spritesheet(k, vv, v[1], v[2], v[3]);
    }
    loggr.debug("loaded sprite [" + k + "] = " + vv);
  },

  doLoadImage: function(k,v) {
    this.load.image(k, (vv=sh.sanitizeUrl(v)));
    loggr.debug("loaded image [" + k + "] = " + vv);
  },

  doLoadTile: function(k,v) {
    this.load.tilemap(k, (vv=sh.sanitizeUrl(v)), null, Phaser.Tilemap.TILED_JSON);
    loggr.debug("loaded tiles [" + k + "] = " + vv);
  },

  onCreate: function () {
    this.bar.cropEnabled = false;
  },

  onUpdate: function () {
    tween = this.add.tween(this.logo);
    tween.onComplete.add(function() {
       this.state.start('Game');
    }, this);
    tween.to( { alpha: 0 }, 800, Phaser.Easing.Linear.None).start();
  }


});



}).call(this);


