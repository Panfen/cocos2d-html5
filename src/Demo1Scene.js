var Demo1Layer = cc.Layer.extend({

	sprite: null,
	isPalying: false,

	init: function(){

		this._super();
		var size = cc.winSize;

    //背景
		var bg = new cc.Sprite(img_horse_background);
		bg.x = size.width / 2;
		bg.y = size.height / 2;
		this.addChild(bg);

		//精灵
		var frameCache = cc.spriteFrameCache;
		frameCache.addSpriteFrames(img_horse_run_plist, img_horse_run);
		this.sprite = new cc.Sprite(img_horse_h1);
		this.sprite.x = size.width / 2;
		this.sprite.y = size.height - 160;
		this.addChild(this.sprite);

		//toggle菜单
		var goNormalSprite = new cc.Sprite(img_horse_go);
		var goSelectedSprite = new cc.Sprite(img_horse_go);
		var stopNormalSprite = new cc.Sprite(img_horse_stop);
		var stopSelectedSprite = new cc.Sprite(img_horse_stop);

		var goToggleMenuItem = new cc.MenuItemSprite(goNormalSprite, goSelectedSprite);
		var stopToggleMenuItem = new cc.MenuItemSprite(stopNormalSprite, stopSelectedSprite);

		var toggleMenuItem = new cc.MenuItemToggle(goToggleMenuItem, stopToggleMenuItem, this.onAction, this);
		toggleMenuItem.x = size.width / 2;
		toggleMenuItem.y = 120;

		var menu = new cc.Menu(toggleMenuItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu);
	},

	onAction: function(sender){
		if(this.isPalying == false){
			var animation = new cc.Animation();
			for(var i = 1; i <= 4; i++){
				var frameName = 'h' + i + '.png';
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
				animation.addSpriteFrame(spriteFrame);
			}
			animation.setDelayPerUnit(0.15);
			animation.setRestoreOriginalFrame(true);
			var action = cc.animate(animation);
			this.sprite.runAction(cc.repeatForever(action));

			this.isPalying = true;
		}else{
			this.sprite.stopAllActions();
			this.isPalying = false;
		}
	}
});

var Demo1Scene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new Demo1Layer();
		this.addChild(layer);
		layer.init();
	}
});