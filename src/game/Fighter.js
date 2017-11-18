var Fighter = cc.PhysicsSprite.extend({

	hitPoints: true,
	space: null,

	ctor: function(spriteFrameName, space){
		this._super(spriteFrameName);
		this.space = space;
		var verts = [
			-94, 31.5,
			-52, 64.5,
			57, 66.5,
			96, 33.5,
			0, -80.5
		];
		this.body = new cp.Body(1, cp.momentForBody(1, verts, cp.vzero));
		this.body.data = this;
		this.space.addBody(this.body);

		var shape = new cp.PolyShape(this.body, verts, cp.vzero);
		shape.setElasticity(0.5);
		shape.setFriction(0.5);
		shape.setCollisionType(CollisionType.Fighter);
		this.space.addShape(shape);

		this.hitPoints = SpriteIniticalHP.hero;

		var ps = new cc.ParticleSystem(game_particle_fire);
		//在飞机下面
		ps.x = this.getContentSize().width / 2;
		ps.y = 0;
		ps.setScale(0.5);
		this.addChild(ps);
	},

	setPosition: function(newPosition){
		var halfWidth = this.getContentSize().width / 2;
		var halfHeight = this.getContentSize().height / 2;
		var pos_x = newPosition.x;
		var pos_y = newPosition.y;

		//防止超出边界
		if(pos_x < halfWidth){
			pos_x = halfWidth;
		}else if(pos_x > (winSize.width - halfWidth)){
			pos_x = winSize.width - halfWidth;
		}
		
		if(pos_y < halfHeight){
			pos_y = halfHeight;
		}else if(pos_y > (winSize.height - halfHeight)){
			pos_y = winSize.height - halfHeight;
		}

		this.body.setPos(cc.p(pos_x, pos_y));
	}
});