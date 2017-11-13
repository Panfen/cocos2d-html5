var IndexLayer = cc.Layer.extend({

  init: function () {

    this._super();
    var size = cc.director.getWinSize();

    var bg = new cc.Sprite(img_background);
    bg.x = size.width / 2;
    bg.y = size.height / 2;
    this.addChild(bg);

    var titleLabel = new cc.LabelTTF('Cocos2d-Html5 Demos', 'Arial', 20);
    titleLabel.x = size.width / 2;
    titleLabel.y = size.height - 60;
    this.addChild(titleLabel);

    /*

    cc.MenuItemFont.setFontName('Times New Roman');
    cc.MenuItemFont.setFontSize(28);

    var startMenuItem = new cc.MenuItemFont('开始游戏', this.menuStartCallback, this);
    startMenuItem.setAnchorPoint(0.5, 0.5);

    var menu = new cc.Menu(startMenuItem);
    menu.setPosition(0, 0);
    this.addChild(menu, 1);
    startMenuItem.setPosition(size.width / 2, 100);
    */
  }
});

var IndexScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new IndexLayer();
    this.addChild(layer);  //一个场景Scene对应一到多个层Layer
    layer.init();
  }
});