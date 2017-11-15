var SPRITE_WIDTH = 64;
var SPRITE_HEIGHT = 64;
var DEBUG_NODE_SHOW = true;

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
		var body = new cp.Body(1, cp.momentForBox(1, SPRITE_WIDTH, SPRITE_HEIGHT));
		body.setPos(pos);
		this.space.addBody(body);

		var shape = new cp.BoxShape(body, SPRITE_WIDTH, SPRITE_HEIGHT);
		shape.setElasticity(0.5);
		shape.setFriction(0.5);
		this.space.addShape(shape);

		//创建物理引擎精灵对象
		var sprite = new cc.PhysicsSprite(img_chipmunk_box);
		sprite.setBody(body);
		sprite.setPosition(cc.p(pos.x, pos.y));
		this.addChild(sprite);
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
	},

	setupDebugNode: function(){
		this._debugNode = new cc.PhysicsDebugNode(this.space);
		this._debugNode.visible = DEBUG_NODE_SHOW;
		this.addChild(this._debugNode);
	},

	update: function(dt){
		var timeStep = 0.03;
		this.space.step(timeStep);
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