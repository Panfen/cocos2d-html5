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
				this.addChild(_player, 2, 200);
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

		//碰撞规则：忍者的头部碰到障碍物视为发生碰撞
		if(tileGid > 0){
			cc.log('发生碰撞！');
			cc.audioEngine.playEffect(wav_ninja_empty);
		}else{
		_player.setPosition(pos);
			this.setViewpointCenter(_player.getPosition());
		}
	},

	//像素点转换成瓦片坐标
	tileCoordPosition: function(pos){
		var x = pos.x / _tileMap.getTileSize().width;
		x = parseInt(x, 10);
		var y = ((_tileMap.getMapSize().height * _tileMap.getTileSize().height) - pos.y) / _tileMap.getTileSize().height;
		y = parseInt(y, 10);
		return cc.p(x, y);
	},

	setViewpointCenter: function(pos){
		var size = cc.director.getWinSize();

		//防止视图左边超出屏幕之外
		var x = Math.max(pos.x, size.width / 2);
		var y = Math.max(pos.y, size.height / 2);

		//防止视图右边超出屏幕之外
		x = Math.min(x, (_tileMap.getMapSize().width * _tileMap.getTileSize().width) - size.width / 2);
		y = Math.min(x, (_tileMap.getMapSize().height * _tileMap.getTileSize().height) - size.height / 2);

		//屏幕中心点
		var pointA = cc.p(size.width / 2, size.height / 2);
		//使精灵处于屏幕中心，移动地图位置
		var pointB = cc.p(x, y);

		var offset = cc.pSub(pointA, pointB);
		this.setPosition(offset);
	},

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