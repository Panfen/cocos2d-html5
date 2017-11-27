var GamePlayLayer = cc.Layer.extend({

	space: null,
	fighter: null,
	score: 0,
	scorePlaceholder: 0,

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

		//初始化暂停按钮
		var pauseMenuItem = new cc.MenuItemImage('#button.pause.png', '#button.pause.png', this.menuPauseCallback, this);
		var pauseMenu = new cc.Menu(pauseMenuItem);
		pauseMenu.setPosition(cc.p(30, winSize.height - 28))
		this.addChild(pauseMenu, 200, 999);

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
			swallowTouches: true,
			onTouchBegan: function(touch, event){
				return true;
			},
			onTouchMoved: function(touch, event){
				var target = event.getCurrentTarget();
				var delta = touch.getDelta();  //获取事件数据
				var pos_x = target.body.getPos().x + delta.x;
				var pos_y = target.body.getPos().y + delta.y;
				target.body.setPos(cc.p(pos_x, pos_y));
			}
		});

		//飞机发射炮弹
		this.schedule(this.shootBullet, 0.2);

		//注册触摸飞机事件监听器
		cc.eventManager.addListener(this.touchFighterListener, this.fighter);
		this.touchFighterListener.retain();

		//显示状态栏

		//显示得分
	},

	menuPauseCallback: function(sender){
		//播放音效
		if(effectStatus == BOOL.YES){
			cc.audioEngine.playEffect(game_sound_Blip_wav);
		}
		var nodes = this.getChildren();
		for(var i = 0; i < nodes.length; i++){
			var node = nodes[i];
			node.unscheduleUpdate();
			// this.unschedule(this.shootBullet);
		}

		//暂停触摸事件
		cc.eventManager.pauseTarget(this.fighter);

		//返回主菜单
		var backNormal = new cc.Sprite('#button.back.png');
		var backSelected = new cc.Sprite('#button.back-on.png');
		var backMenuItem = new cc.MenuItemSprite(backNormal, backSelected, function(sender){
			//播放音效
			if(effectStatus == BOOL.YES){
				cc.audioEngine.playEffect(game_sound_Blip_wav);
			}
			cc.director.popScene();
		}, this);

		//继续游戏菜单
		var resumeNormal = new cc.Sprite('#button.resume.png');
		var resumeSelected = new cc.Sprite('#button.resume-on.png');
		var resumeMenuItem = new cc.MenuItemSprite(resumeNormal, resumeSelected, function(sender){
			//播放音效
			if(effectStatus == BOOL.YES){
				cc.audioEngine.playEffect(game_sound_Blip_wav);
			}
			var nodes = this.getChildren();
			for(var i = 0; i < nodes.length; i++){
				var node = nodes[i];
				node.scheduleUpdate();
				// this.scheduleUpdate(this.shootBullet, 0.2);
			}
			//继续触摸事件
			cc.eventManager.resumeTarget(this.fighter);
			this.removeChild(this.menu);

		}, this);

		this.menu = new cc.Menu(backMenuItem, resumeMenuItem);
		this.menu.alignItemsVertically();
		this.menu.x = winSize.width / 2;
		this.menu.y = winSize.height / 2;

		this.addChild(this.menu, 20, 1000);
	},

	shootBullet: function(dt){
		if(this.fighter && this.fighter.isVisible()){
			//
			var bullet = Bullet.create('#gameplay.bullet.png', this.space);
			bullet.velocity = SpriteVelocity.Bullet;
			if(bullet.getParent() == null){
				this.addChild(bullet, 0, GameSceneNodeTag.Bullet);
				cc.pool.putInPool(bullet);
			}
			bullet.shootBulletFromFighter(cc.p(this.fighter.x, this.fighter.y + this.fighter.getContentSize().height / 2));
		}
	},

	//arbiter仲裁者：参数包含两个碰撞的形状和物体
	collisionBegin: function(arbiter, space){
		var shapes = arbiter.getShapes();
		var bodyA = shapes[0].getBody();
		var bodyB = shapes[1].getBody();

		var spriteA = bodyA.data;
		var spriteB = bodyB.data;

		//检查到炮弹击中敌机
		if(spriteA instanceof Bullet && spriteB instanceof Enemy && spriteB.isVisible()){
			//使得炮弹消失
			spriteB.setVisible(false);
			this.handleBulletCollidingWithEnemy(spriteA);
		}
	},

	handleBulletCollidingWithEnemy: function(enemy){
		enemy.hitPoints--;
		if(enemy.hitPoints == 0){
			var node = this.getChildByTag(GameSceneNodeTag.ExplosionParticleSystem);
			if(node){
				this.removeChild(node);
			}
			//爆炸粒子效果
			var explosion = new cc.ParticleSystem(game_particle_explosion);
			explosion.x = enemy.x;
			explosion.y = enemy.y;
			this.addChild(explosion, 2, GameSceneNodeTag.ExplosionParticleSystem);

			//爆炸音效
			if(effectStatus == BOOL.YES){
				cc.audioEngine.playEffect(game_sound_Explosion_wav);
			}

			switch(enemy.enemyType){
				case EnemyTypes.Enemy_Stone:
					this.score += EnemyScores.Enemy_Stone;
					this.scorePlaceholder += EnemyScores.Enemy_Stone;
					break;
				case EnemyTypes.Enemy_1:
					this.score += EnemyScores.Enemy_1;
					this.scorePlaceholder += EnemyScores.Enemy_1;
					break;
				case EnemyTypes.Enemy_2:
					this.score += EnemyScores.Enemy_2;
					this.scorePlaceholder += EnemyScores.Enemy_2;
					break;
				case EnemyTypes.Enemy_Planet:
					this.score += EnemyScores.Enemy_Planet;
					this.scorePlaceholder += EnemyScores.Enemy_Planet;
					break;
			}

			//每次获得1000分，生命值+1，scorePlaceholder恢复0
			if(this.scorePlaceholder >= 1000){
				this.fighter.hitPoints++;
				// this.updateStatusBarFighter();
				this.scorePlaceholder -= 1000;
			}

			// this.updateStatusBarScore();
			enemy.setVisible(false);
			enemy.spawn();
		}
	},

	//显示飞机生命值
	updateStatusBarFighter: function(){
		//先移除上次的精灵
		var node = this.getChildByTag(GameSceneNodeTag.StatusBarFighterNode);
		if(node){
			this.removeChild(node);
		}
	},

	update: function(){
		var timeStep = 0.03;
    this.space.step(timeStep);
	},

	onEnterTransitionDidFinish: function(){
		this._super();
		if(musicStatus == BOOL.YES){
			cc.audioEngine.playMusic(game_sound_gameBg_mp3, true);
		}
	},

	onExit: function(){
		this._super();
		this.unscheduleUpdate();
		//注销事件监听
		if(this.touchFighterListener != null){
			cc.eventManager.removeListener(this.touchFighterListener);
			this.touchFighterListener.release();
			this.touchFighterListener = null;
		}
		this.removeAllChildren(true);
		cc.pool.drainAllPools();
	},
});

var GamePlayScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new GamePlayLayer();
		this.addChild(layer);
	}
});