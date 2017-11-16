/*
	自定义Bullet精灵类
*/

var Bullet = cc.Sprite.extend({
	velocity: 0,

	ctor: function(spriteFrameName, velocity){
		this._super(spriteFrameName);
		this.velocity = velocity;
	},

	shootBulletFromFighter: function(pos){
		this.setPosition(pos);
		this.scheduleUpdate();
	},

	update: function(dt){
		var size = cc.winSize;
		//计算移动位置
		this.x += this.velocity.x * dt;
		this.y += this.velocity.y * dt;
		if(this.y > size.height){
			this.unscheduleUpdate();
			this.removeFromParent();
		}
	},

	unuse: function(){
		this.retain();
		this.setVisible(false);
	},

	reuse: function(spriteFrameName, velocity){
		this.spriteFrameName = spriteFrameName;
		this.velocity = velocity;
		this.setVisible(true);
	},
});

Bullet.create = function(spriteFrameName, velocity){
	return cc.pool.hasObject(Bullet) ? cc.pool.getFromPool(Bullet, spriteFrameName, velocity) : new Bullet(spriteFrameName, velocity);
}