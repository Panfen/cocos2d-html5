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

	}

})