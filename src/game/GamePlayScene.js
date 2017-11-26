var GamePlayLayer = cc.Layer.extend({

	space: null,
	fighter: null,

	ctor: function(){
		this._super();
		this.initPhysics();
		this.initBG();
		this.scheduleUpdate();		
	},

	//初始化物理空间
	initPhysics: function(){
		this.space = new cp.Space();
		this.space.gravity = cp.v(0, 0);
		this.space.addCollisionHandler(
			CollisionType.Bullet,
			CollisionType.Enemy,
			this.collisionBegin.bind(this),
			null,
			null,
			null
		);
	},

	initBG: function(){
		//背景地图
		var bg = new cc.TMXTiledMap(game_map_blueBg);
		this.addChild(bg, 0, GameSceneNodeTag.BatchBackground);

		//放置发光粒子背景
		var ps = new cc.ParticleSystem(game_particle_light);
		ps.x = winSize.width / 2;
		ps.y = winSize.height / 2;
		this.addChild(ps, 0, GameSceneNodeTag.BatchBackground);

		//添加背景精灵1
		/*
		var sprite1 = new cc.Sprite('#gameplay.bg.sprite-1.png');
		sprite1.setPosition(cc.p(-50, -50));
		this.addChild(sprite1, 0, GameSceneNodeTag.BatchBackground);

		var ac1 = cc.moveBy(20, cc.p(500, 600));  // 相对移动
		var ac2 = ac1.reverse();
		var as1 = cc.sequence(ac1, ac2);
		sprite1.runAction(cc.repeatForever(new cc.EaseSineInOut(as1)));

		//添加背景精灵2
		/*
		var sprite2 = new cc.Sprite('#gameplay.bg.sprite-2.png');
		sprite2.setPosition(cc.p(winSize.width, 0));
		this.addChild(sprite2, 0, GameSceneNodeTag.BatchBackground);

		var ac3 = cc.moveBy(10, cc.p(-500, 600));  // 相对移动
		var ac4 = ac3.reverse();
		var as2 = cc.sequence(ac3, ac4);
		sprite2.runAction(cc.repeatForever(new cc.EaseExponentialInOut(as2)));
		*/

		//添加陨石
		var stone1 = new Enemy(EnemyTypes.Enemy_Stone, this.space);
		this.addChild(stone1, 10, GameSceneNodeTag.BatchBackground);

		//添加行星
		var planet = new Enemy(EnemyTypes.Enemy_Planet, this.space);
		this.addChild(planet, 10, GameSceneNodeTag.Enemy);

		//添加敌机1
		var enemy1 = new Enemy(EnemyTypes.Enemy_1, this.space);
		this.addChild(enemy1, 10, GameSceneNodeTag.Enemy);

		//添加敌机2
		var enemy2 = new Enemy(EnemyTypes.Enemy_2, this.space);
		this.addChild(enemy2, 10, GameSceneNodeTag.Enemy);

		//玩家飞机
		this.fighter = new Fighter('#gameplay.fighter.png', this.space);
		this.fighter.body.setPos(cc.p(winSize.width / 2, 100));
		this.addChild(this.fighter, 10, GameSceneNodeTag.Fighter);

		//创建触摸飞机事件监听器
		this.touchFighterListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
		});


	},

	//arbiter参数包含两个碰撞的形状和物体
	collisionBegin: function(arbiter, space){
		//
	},

	update: function(){
		var timeStep = 0.03;
    this.space.step(timeStep);
	},

});

var GamePlayScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new GamePlayLayer();
		this.addChild(layer);
	}
});