var GamePlayLayer = cc.Layer.extend({

	ctor: function(){
		this._super();

		var bg = new cc.TMXTiledMap(game_map_redBg);
		this.addChild(bg);
		
	},
});

var GamePlayScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new GamePlayLayer();
		this.addChild(layer);
	}
});