var _player;
var _tileMap;

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