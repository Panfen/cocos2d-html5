var SettingLayer = cc.Layer.extend({

	ctor: function(){
		this._super();

		var winSize = cc.director.getWinSize();

		var bg = new cc.TMXTiledMap(game_map_redBg);
		this.addChild(bg);

		var settingPage = new cc.Sprite('#setting.page.png');
		settingPage.x = winSize.width / 2;
		settingPage.y = winSize.height / 2;
		this.addChild(settingPage);

		//音效
		var soundOnMenuItem = new cc.MenuItemImage('#check-on.png', '#check-on.png');
		var soundOffMenuItem = new cc.MenuItemImage('#check-off.png', '#check-off.png');
		var soundToggleMenuItem = new cc.MenuItemToggle(soundOnMenuItem, soundOffMenuItem, this.menuSoundToggleCallback, this);
		soundToggleMenuItem.x = winSize.width / 2 + 100;
		soundToggleMenuItem.y = winSize.height / 2 + 180;

		//音乐
		var musicOnMenuItem = new cc.MenuItemImage('#check-on.png', '#check-on.png');
		var musicOffMenuItem = new cc.MenuItemImage('#check-off.png', '#check-off.png');
		var musicToggleMenuItem = new cc.MenuItemToggle(musicOnMenuItem, musicOffMenuItem, this.menuMusicToggleCallback, this);
		musicToggleMenuItem.x = soundToggleMenuItem.x;
		musicToggleMenuItem.y = soundToggleMenuItem.y - 110;

		//OK菜单
		var okNormal = new cc.Sprite('#button.ok.png');
		var okSelected = new cc.Sprite('#button.ok-on.png');
		var okMenuItem = new cc.MenuItemSprite(okNormal, okSelected, this.menuOkCallback, this);
		okMenuItem.x = 410;
		okMenuItem.y = 75;

		var menu = new cc.Menu(soundToggleMenuItem, musicToggleMenuItem, okMenuItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu);

		//设置按钮选中状态
		if(musicStatus == BOOL.YES)
			musicToggleMenuItem.setSelectedIndex(0);
		else
			musicToggleMenuItem.setSelectedIndex(1);
		if(effectStatus == BOOL.YES)
			soundToggleMenuItem.setSelectedIndex(0);
		else
			soundToggleMenuItem.setSelectedIndex(1);
	},

	menuSoundToggleCallback: function(){
		if(effectStatus == BOOL.YES){
			cc.sys.localStorage.setItem(EFFECT_KEY, BOOL.NO);
			effectStatus = BOOL.ON;
		}else{
			cc.sys.localStorage.setItem(EFFECT_KEY, BOOL.YES);
			effectStatus = BOOL.YES;
		}
	},

	menuMusicToggleCallback: function(){
		if(musicStatus == BOOL.YES){
			cc.sys.localStorage.setItem(MUSIC_KEY, BOOL.NO);
			musicStatus = BOOL.ON;
			cc.audioEngine.stopMusic();
		}else{
			cc.sys.localStorage.setItem(MUSIC_KEY, BOOL.YES);
			musicStatus = BOOL.YES;
			cc.audioEngine.playMusic(game_sound_homeBg_mp3, true);
		}
	},

	menuOkCallback: function(){
		cc.director.popScene();
		if(effectStatus == BOOL.YES){
			cc.audioEngine.playEffect(game_sound_Blip_wav);
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
		cc.audioEngine.stopMusic()
	}
});

var SettingScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new SettingLayer();
		this.addChild(layer);
	}
});