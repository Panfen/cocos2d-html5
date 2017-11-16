/*
	使用Chipmunk屋里引擎的步骤：
	1. 创建物理空间
	2. 指定空间的边界
	3. 创建空间中的物体
	4. 创建空间中的形状
	5. 连接精灵和物体
	6. 碰撞检测
*/

var SPRITE_WIDTH = 64;
var SPRITE_HEIGHT = 64;
var DEBUG_NODE_SHOW = true;
var COLLISION_TYPE = 1;

var Demo3Layer = cc.Layer.extend({

	space: null,

	init: function(){
		this._super();
		var size = cc.winSize;

		//背景
		var bg = new cc.Sprite(img_horse_background);
		bg.x = size.width / 2;
		bg.y = size.height / 2;
		this.addChild(bg);

		this.initPhysics();
		this.scheduleUpdate();
	},

	onEnter: function(){
		this._super();
		var _this = this;
		cc.eventManager.addListener({
			event: cc.EventListener.MOUSE,
			onMouseDown: function(event){
				var pos = event.getLocation();
				if(event.getButton() === cc.EventMouse.BUTTON_LEFT)
					_this.addNewSpriteAtPosition(pos);
			}
		}, this);
	},

	addNewSpriteAtPosition: function(pos){
		var body1 = this.createBody(img_chipmunk_boxA, pos);
		var body2 = this.createBody(img_chipmunk_boxB, cc.pAdd(pos, cc.p(100, -100)));
		//cp.PinJoint关节对象：物体1，物体2，物体1的锚点，物体2的锚点
		this.space.addConstraint(new cp.PinJoint(body1, body2, cp.v(0, 0), cp.v(0, SPRITE_WIDTH / 2)));

		// body.data = sprite;
	},

	createBody: function(fileName, pos){
		//创建动态物体：参数一是质量，参数二是惯性值
		var body = new cp.Body(1, cp.momentForBox(1, SPRITE_WIDTH, SPRITE_HEIGHT));  //惯性力矩，宽度，高度
		body.p = pos;
		this.space.addBody(body);

		var shape = new cp.BoxShape(body, SPRITE_WIDTH, SPRITE_HEIGHT);
		shape.e = 0.5;
		shape.u = 0.5;
		// shape.setCollisionType(COLLISION_TYPE);
		this.space.addShape(shape);

		//创建物理引擎精灵对象
		var sprite = new cc.PhysicsSprite(fileName);
		sprite.setBody(body);  //设置精灵关联的物体
		sprite.setPosition(pos);
		this.addChild(sprite);
		return body;
	},

	onExit: function(){
		this._super();
		cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
	},

	initPhysics: function(){
		var winSize = cc.winSize;
		//创建物理空间
		this.space = new cp.Space();
		this.setupDebugNode();

		//设置重力: 只有重力作用，-100表示沿着y轴向下，100是个经验值
		this.space.gravity = cp.v(0, -100);
		var staticBody = this.space.staticBody;

		//设置空间边界
		var walls = [new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(winSize.width, 0), 0),
								 new cp.SegmentShape(staticBody, cp.v(0, winSize.height), cp.v(winSize.width, winSize.height), 0),
								 new cp.SegmentShape(staticBody, cp.v(0, 0), cp.v(0, winSize.height), 0),
								 new cp.SegmentShape(staticBody, cp.v(winSize.width, 0), cp.v(winSize.width, winSize.height), 0)
								];
		for(var i = 0; i < walls.length; i++){
			var shape = walls[i];
			shape.setElasticity(1);
			shape.setFriction(1);
			this.space.addStaticShape(shape);
		}

		//设置碰撞检测
		this.space.addCollisionHandler(
			COLLISION_TYPE,
			COLLISION_TYPE,
			this.collisionBegin.bind(this),
			this.collisionPre.bind(this),
			this.collisionPost.bind(this),
			this.collisionSeparate.bind(this)
		);
	},

	setupDebugNode: function(){
		this._debugNode = new cc.PhysicsDebugNode(this.space);
		this._debugNode.visible = DEBUG_NODE_SHOW;
		this.addChild(this._debugNode);
	},

	update: function(dt){
		var timeStep = 0.03;
		this.space.step(timeStep);
	},

	collisionBegin: function(arbiter, space){
		var shapes = arbiter.getShapes();
		var bodyA = shapes[0].getBody();
		var bodyB = shapes[1].getBody();

		var spriteA = bodyA.data;
		var spriteB = bodyB.data;

		if(spriteA != null && spriteB != null){
			spriteA.setColor(new cc.Color(255, 255, 0, 255));
			spriteB.setColor(new cc.Color(255, 255, 0, 255));
		}
	},

	collisionPre: function(arbiter, space){
		cc.log('collision Pre');
	},

	collisionPost: function(arbiter, space){
		cc.log('collision Post');
	},

	collisionSeparate: function(arbiter, space){
		var shapes = arbiter.getShapes();
		var bodyA = shapes[0].getBody();
		var bodyB = shapes[1].getBody();

		var spriteA = bodyA.data;
		var spriteB = bodyB.data;

		if(spriteA != null && spriteB != null){
			spriteA.setColor(new cc.Color(255, 255, 255, 255));
			spriteB.setColor(new cc.Color(255, 255, 255, 255));
		}
	}
});

var Demo3Scene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new Demo3Layer();
		this.addChild(layer);
		layer.init();
	}
});