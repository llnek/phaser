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
var loggr = global.ZotohLabs.logger;
var echt = global.ZotohLabs.echt;

//////////////////////////////////////////////////////////////////////////////
// module def
//////////////////////////////////////////////////////////////////////////////
asterix.YesNoBox =  asterix.XScreen.extends({

  doLayout: function() {
    var c= sh.main.getCenter();
    var s= sh.main.getSize();
    var csts= sh.xcfg.csts;

    if (this.layoutFunc) { this.map= this.layoutFunc.call(this, this.group); }
    if (this.map) {
      this.map.createLayer('Back',undef, undef, this.group);
      this.map.createLayer('Front',undef, undef, this.group);
    }

    this.question = sh.main.add.bitmapText( 0,0, 'font.Downlink', sh.l10n('%quit?'), 16, this.group);
    this.question.repos( c.x - this.question.textWidth / 2,
      c.y - this.question.textHeight / 2);

    var backBtn= sh.main.cache.getImage('gui.xbxB');
    var yesBtn= sh.main.cache.getImage('gui.xbxA');
    var b, hx, hy = s.y - _.max([yesBtn.height, backBtn.height]) - csts.TILE - csts.S_OFF;

    hx = s.x - yesBtn.width - backBtn.width - csts.TILE - 10 - csts.S_OFF;
    b = sh.main.add.button( hx, hy, 'gui.xbxA', function() {
      this.yesFunc();
    }, this, 0,0,0,0,this.group);
    this.btns.push(b);

    hx = s.x - backBtn.width - csts.TILE - csts.S_OFF;
    b = sh.main.add.button( hx, hy, 'gui.xbxB', function() {
      this.noFunc();
    }, this, 0,0,0,0,this.group);
    this.btns.push(b);

  },

  loseFocus: function() {
    this.parent();
    this.dtor();
  },

  focus: function(options) {
    options = options || {};
    this.parent(options);
    if (echt(options.layout)) { this.layoutFunc = options.layout; }
    if (echt(options.yes)) { this.yesCB= options.yes; }
    if (echt(options.no)) { this.noCB= options.no; }
    this.doLayout();
  },

  yesFunc: function() {
    sh.main.defly(this);
    if (this.yesCB) { this.yesCB(); }
  },

  noFunc: function() {
    sh.main.defly(this);
    if (this.noCB) { this.noCB(); }
  }


});



}).call(this);


