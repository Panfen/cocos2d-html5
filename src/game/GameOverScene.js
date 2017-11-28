var GameOverLayer = cc.Layer.extend({
	score: 0,
	touchListener: null,

	ctor: function(){
		this._super();

		this.score = score;

		var bg = new cc.TMXTiledMap(game_map_blueBg);
		this.addChild(bg);

		//设置发光粒子背景
		var ps = new cc.ParticleSystem(game_particle_light);
		ps.x = winSize.width / 2;
		ps.y = winSize.height / 2 - 100;
		this.addChild(ps);

		var page = new cc.Sprite('#gameover.page.png');
		//设置位置
		page.x = winSize.width / 2;
		page.y = winSize.height - 300
		this.addChild(page);

		var highScore = cc.sys.localStorage.getItem(HIGHSCORE_KEY);
		highScore = highScore == null ? 0 : highScore;
		if(highScore < this.score){
			highScore = this.score;
			cc.sys.localStorage.setItem(HIGHSCORE_KEY, highScore);
		}

		var hscore = new cc.Sprite('#Score.png');
		hscore.x = 223;
		hscore.y = winSize.height - 690;
		this.addChild(hscore);

		var highScoreLabel = new cc.LabelBMFont(highScore, game_fonts_BMFont_fnt);
		highScoreLabel.x = hscore.x;
		highScoreLabel.y = hscore.y - 80;
		this.addChild(highScoreLabel);

		var tap = new cc.Sprite('#Tap.png');
		tap.x = winSize.width / 2;
		tap.y = winSize.height - 860;
		this.addChild(tap);

		//创建触摸事件监听器
		this.touchListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,  //设置是否吞没事件
			onTouchBegan: function(touch, event){
				//播放音效
				if(effectStatus == BOOL.YES){
					cc.audioEngine.playEffect(game_sound_Blip_wav);
				}
				cc.director.popScene();
			}
		});
		cc.eventManager.addListener(this.touchListener, this);
		this.touchListener.retain();
	},

	onEnter: function(){
		this._super();
	},

	onEnterTransitionDidFinish: function(){
		//
	},
})