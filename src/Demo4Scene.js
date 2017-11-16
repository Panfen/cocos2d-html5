/*
适用于需要经常创建和销毁的对象
	对象池API
	1. cc.pool.putInPool(obj); 将对象放入缓冲池
	2. cc.pool.hasObject(objClass); 判断缓冲池是否存在可用的指定对象
	3. cc.pool.removeObject(obj); 删除指定对象
	4. cc.pool.getFromPool(objClass); 从缓冲池获取指定对象
	5. cc.pool.drainAllPools(); 清空缓冲池
*/
var Demo4Layer = cc.Layer.extend({

	hero: null,

	init: function(){
		this._super();
		var size = cc.winSize;

		//背景
		var bg = new cc.Sprite(img_fly_background);
		bg.x = size.width / 2;
		bg.y = size.height / 2;
		this.addChild(bg);

		//飞机精灵
		this.hero = new cc.Sprite(img_fly_hero);
		this.hero.x = size.width / 2;
		this.hero.y = 100;
		this.addChild(this.hero);

		//每0.2秒调用一次shootBullet，发射一颗子弹
		this.schedule(this.shootBullet, 0.2);
	},

	shootBullet: function(dt){
		var bullet = Bullet.create(img_fly_bullet, cc.p(0, 100));
		if(bullet.getParent() == null){
			this.addChild(bullet);
			cc.pool.putInPool(bullet);
			bullet.shootBulletFromFighter(cc.p(this.hero.x, this.hero.y + this.hero.getContentSize().height / 2));			
		}
	},

	onExit: function(){
		this._super();
		this.unschedule(this.shootBullet);
		cc.pool.drainAllPools();
	}

});

var Demo4Scene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new Demo4Layer();
		this.addChild(layer);
		layer.init();
	}
});