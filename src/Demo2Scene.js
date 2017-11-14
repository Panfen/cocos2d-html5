var _player;
var _tileMap;
var _collidable;

var Demo2Layer = cc.Layer.extend({

	init: function(){

		this._super();
		var size = cc.winSize;

		_tileMap = new cc.TMXTiledMap(img_ninja_MiddleMap);
		this.addChild(_tileMap, 0, 100);

		var group = _tileMap.getObjectGroup('objects');

		//获得ninja对象
		var array = group.getObjects();
		for(var i = 0, len = array.length; i < len; i++){
			var spawnPoint = array[i];
			if(spawnPoint.name == 'ninja'){
				_player = new cc.Sprite(img_ninja_ninja);
				_player.x = spawnPoint.x;
				_player.y = spawnPoint.y - 64;
				this.addChild(_player, 2, 200);  // 第2个参数是z轴绘制顺序，第3个参数是标签
				break;
			}
		}
		_collidable = _tileMap.getLayer('collidable');
		_collidable.setVisible(false);
	},

	onEnter: function(){
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
	},

	onTouchEnded: function(touch, event){
		cc.log('onTouchBegan');
	},

	onTouchMoved: function(touch, event){
		cc.log('onTouchMoved');
	},

	// onTouchBegan  onTouchEnded

	onTouchBegan: function(touch, event){
		var target = event.getCurrentTarget();
		//获得坐标
		var touchLocation = touch.getLocation();
		//转换为当前层的模型坐标系
		touchLocation = target.convertToNodeSpace(touchLocation);
		//获得精灵坐标
		var playerPos = _player.getPosition();
		//相减
		var diff = cc.pSub(touchLocation, playerPos);

		if(Math.abs(diff.x) > Math.abs(diff.y)){
			if(diff.x > 0){
				playerPos.x += _tileMap.getTileSize().width;
				_player.runAction(cc.flipX(true));
			}else{
				playerPos.x -= _tileMap.getTileSize().width;
				_player.runAction(cc.flipX(true));
			}
		}else{
			if(diff.y > 0){
				playerPos.y += _tileMap.getTileSize().height;
			}else{
				playerPos.y -= _tileMap.getTileSize().height;
			}
		}
		target.setPlayerPosition(playerPos);
	},

	setPlayerPosition: function(pos){
		//从像素点坐标转换成瓦片坐标
		var tileCoord = this.tileCoordPosition(pos);
		//获得瓦片GID
		var tileGid = _collidable.getTileGIDAt(tileCoord);

	},

	tileCoordPosition: function(pos){},

	onExit: function(){
		this._super();
		cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
	}


});

var Demo2Scene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new Demo2Layer();
		this.addChild(layer);
		layer.init();
	}
});