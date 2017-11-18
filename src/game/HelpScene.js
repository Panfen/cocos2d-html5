var HelpLayer = cc.Layer.extend({

	ctor: function(){
		this._super();

		var bg = new cc.TMXTiledMap(game_map_redBg);
		this.addChild(bg);

		//页面
		var page = new cc.Sprite('#help.page.png');
		page.x = winSize.width / 2;
		page.y = winSize.height / 2;
		this.addChild(page);

		//OK菜单
		var okNormal = new cc.Sprite('#button.ok.png');
		var okSelected = new cc.Sprite('#button.ok-on.png');
		var okMenuItem = new cc.MenuItemSprite(okNormal, okSelected, this.okMenuItemCallback, this);
		okMenuItem.x = 400;
		okMenuItem.y = 80;

		var menu = new cc.Menu(okMenuItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu);
	},

	okMenuItemCallback: function(sender){
		cc.director.popScene();
		if(effectStatus == BOOL.YES)
			cc.audioEngine.playEffect(game_sound_Blip_wav);
	},

	onEnterTransitionDidFinish: function(){
		this._super();
		if(musicStatus == BOOL.YES)
			cc.audioEngine.playMusic(game_sound_homeBg_mp3, true);
	},

	onExit: function(){
		this._super();
	},

	onExitTransitionDidStart: function(){
		this._super();
		cc.audioEngine.stopMusic(game_sound_homeBg_mp3);
	}
});

var HelpScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new HelpLayer();
		this.addChild(layer);
	}
});