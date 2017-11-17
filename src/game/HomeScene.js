var winSize;
var musicStatus;
var effectStatus;

var HomeLayer = cc.Layer.extend({

	ctor: function(){
		this._super();
		winSize = cc.director.getWinSize();
		cc.spriteFrameCache.addSpriteFrames(game_texture_plist, game_texture_png);

		musicStatus = cc.sys.localStorage.getItem(MUSIC_KEY);
		effectStatus = cc.sys.localStorage.getItem(EFFECT_KEY);

		//背景
		var bg = new cc.TMXTiledMap(game_map_redBg);
		this.addChild(bg);

		//上面logo
		var top = new cc.Sprite('#home-top.png');
		top.x = winSize.width / 2;
		top.y = winSize.height - top.getContentSize().height / 2;
		this.addChild(top);

		//下面logo
		var end = new cc.Sprite('#home-end.png');
		end.x = winSize.width / 2;
		end.y = end.getContentSize().height / 2;
		this.addChild(end);

		//开始菜单
		var startSpriteNormal = new cc.Sprite('#button.start.png');
		var startSpriteSelected = new cc.Sprite('#button.start-on.png');
		var startMenuItem = new cc.MenuItemSprite(startSpriteNormal, startSpriteSelected, this.menuItemCallback, this);
		startMenuItem.setTag(HomeMenuActionTypes.MenuItemStart);

		//设置菜单
		var settingSpriteNormal = new cc.Sprite('#button.setting.png');
		var settingSpriteSelected = new cc.Sprite('#button.setting-on.png');
		var settingMenuItem = new cc.MenuItemSprite(settingSpriteNormal, settingSpriteSelected, this.menuItemCallback, this);
		settingMenuItem.setTag(HomeMenuActionTypes.MenuItemSetting);

		//帮助菜单
		var helpSpriteNormal = new cc.Sprite('#button.help.png');
		var helpSpriteSelected = new cc.Sprite('#button.help-on.png');
		var helpMenuItem = new cc.MenuItemSprite(helpSpriteNormal, helpSpriteSelected, this.menuItemCallback, this);
		helpMenuItem.setTag(HomeMenuActionTypes.MenuItemHelp);

		var menu = new cc.Menu(startMenuItem, settingMenuItem, helpMenuItem);
		menu.x = winSize.width / 2;
		menu.y = winSize.height / 2;
		menu.alignItemsVerticallyWithPadding(10);
		this.addChild(menu);
	},

	menuItemCallback: function(sender){
		if(effectStatus == BOOL.YES){
			cc.audioEngine.playMusic(game_sound_Blip_wav, true);
		}
		var tsc = null;
		switch(sender.tag){
			case HomeMenuActionTypes.MenuItemStart:
					tsc = new cc.TransitionFade(1.0, new GamePlayScene());
					break;
			case HomeMenuActionTypes.MenuItemSetting:
					tsc = new cc.TransitionFade(1.0, new SettingScene());
					break;
			case HomeMenuActionTypes.MenuItemHelp:
					tsc = new cc.TransitionFade(1.0, new HelpScene());
					break;
		}
		if(tsc){
			cc.director.pushScene(tsc);
		}
	},

	onEnterTransitionDidFinish: function(){
		this._super();
		if(musicStatus == BOOL.YES){
			cc.audioEngine.playMusic(game_sound_homeBg_mp3, true);
		}
	},

	onExit: function(){
		this._super();
	},

	onExitTransitionDidStart: function(){
		this._super();
		cc.audioEngine.stopMusic(game_sound_homeBg_mp3);
	},

});

var HomeScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new HomeLayer();
		this.addChild(layer);
	}
});