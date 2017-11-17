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


    cc.MenuItemFont.setFontName('Times New Roman');
    cc.MenuItemFont.setFontSize(18);

    var demo1MenuItem = new cc.MenuItemFont('1.帧动画', this.menuDemo1Callback, this);
    var demo2MenuItem = new cc.MenuItemFont('2.瓦片地图', this.menuDemo2Callback, this);
    var demo3MenuItem = new cc.MenuItemFont('3.物理引擎', this.menuDemo3Callback, this);
    var demo4MenuItem = new cc.MenuItemFont('4.对象池', this.menuDemo4Callback, this);
    var demo5MenuItem = new cc.MenuItemFont('5.综合项目：飞机大战', this.menuDemo5Callback, this);
    
    var menu = new cc.Menu(demo1MenuItem, demo2MenuItem, demo3MenuItem, demo4MenuItem, demo5MenuItem);
    menu.alignItemsVertically()
    this.addChild(menu, 1);
  },

  menuDemo1Callback: function(sender){
    var scene = new Demo1Scene();
    cc.director.pushScene(new cc.TransitionSlideInR(1, scene));  //动画持续时间，新场景对象
  },

  menuDemo2Callback: function(sender){
    var scene = new Demo2Scene();
    cc.director.pushScene(new cc.TransitionJumpZoom(1, scene));
  },

  menuDemo3Callback: function(sender){
    var scene = new Demo3Scene();
    cc.director.pushScene(new cc.TransitionMoveInL(1, scene));
  },

  menuDemo4Callback: function(sender){
    var scene = new Demo4Scene();
    cc.director.pushScene(new cc.TransitionCrossFade(1, scene));
  },

  menuDemo5Callback: function(sender){
    var scene = new HomeScene();
    cc.director.pushScene(new cc.TransitionSlideInL(1, scene));
  },
});

var IndexScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new IndexLayer();
    this.addChild(layer);  //一个场景Scene对应一到多个层Layer
    layer.init();
  }
});