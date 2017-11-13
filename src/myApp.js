var MyLayer = cc.Layer.extend({

	sprite: null,
	isPlaying: false,

  init: function () {

    this._super();
    var size = cc.director.getWinSize();

    /*
    var bg = new cc.Sprite(img_home_background)
    bg.x = size.width / 2;
    bg.y = size.height / 2;
    this.addChild(bg);

    cc.MenuItemFont.setFontName('Times New Roman');
    cc.MenuItemFont.setFontSize(28);

    var startMenuItem = new cc.MenuItemFont('开始游戏', this.menuStartCallback, this);
    startMenuItem.setAnchorPoint(0.5, 0.5);

    var menu = new cc.Menu(startMenuItem);
    menu.setPosition(0, 0);
    this.addChild(menu, 1);
    startMenuItem.setPosition(size.width / 2, 100);
    */


    var bg = new cc.Sprite(img_h_background);
    bg.x = size.width / 2;
    bg.y = size.height / 2;
    this.addChild(bg);

    var frameCache = cc.spriteFrameCache;
    frameCache.addSpriteFrames(img_run_plist, img_run);

    this.sprite = new cc.Sprite(img_h1);
    this.sprite.x = size.width / 2;
    this.sprite.y = size.height - 160;
    this.addChild(this.sprite);

    //enter menu
    cc.MenuItemFont.setFontName('Times New Roman');
    cc.MenuItemFont.setFontSize(40);
    var enterMenuItem = new cc.MenuItemFont('Enter', this.menuEnterCallback, this);
    enterMenuItem.tag = ActionTypes.kSpeed;
    var menu = new cc.Menu(enterMenuItem);
    menu.setPosition(0, 0);
    this.addChild(menu, 1);
    enterMenuItem.setPosition(size.width / 2, 240); 


    //toggle menu
    var goNormalSprite = new cc.Sprite(img_go);
    var goSelectedSprite = new cc.Sprite(img_go);
    var stopNormalSprite = new cc.Sprite(img_stop);
    var stopSelectedSprite = new cc.Sprite(img_stop);

    var goToggleMenuItem = new cc.MenuItemSprite(goNormalSprite, goSelectedSprite);
    var stopToggleMenuItem = new cc.MenuItemSprite(stopNormalSprite, stopSelectedSprite);

    var toggleMenuItem = new cc.MenuItemToggle(goToggleMenuItem, stopToggleMenuItem, this.onAction, this);
    toggleMenuItem.x = size.width / 2;
    toggleMenuItem.y = 100;

    var mn = new cc.Menu(toggleMenuItem);
    mn.x = 0;
    mn.y = 0;
    this.addChild(mn);


  },

  menuStartCallback: function(sender){
  	cc.log(sender);
  	cc.director.pushScene(new GameScene());
  },

  menuEnterCallback: function(sender){
    cc.log(sender.tag);
    var scene = new GameScene()
    cc.director.pushScene(new cc.TransitionSlideInR(1, scene));  //动画持续时间，新场景对象
  },

  onAction: function(sender){

  	if(this.isPlaying != true){
  		//动画开始
  		var animation = new cc.Animation();
  		for(var i = 1; i <= 4; i++){
  			var  frameName = 'h' + i + '.png';
  			var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
  			animation.addSpriteFrame(spriteFrame);
  		}
  		animation.setDelayPerUnit(0.15);  //设置两个帧播放时间
  		animation.setRestoreOriginalFrame(true);  //动画执行后还原初始状态

  		var action = cc.animate(animation);
  		this.sprite.runAction(action);

  		this.isPlaying = true;
  	}else{
  		this.sprite.stopAllActions();
  		this.isPlaying = false;
  	}
  }
});

var MyScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new MyLayer();
    this.addChild(layer);  //一个场景Scene对应一到多个层Layer
    layer.init();
  }
});