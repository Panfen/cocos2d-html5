var HelpLayer = cc.Layer.extend({

	ctor: function(){
		this._super();

		var bg = new cc.TMXTiledMap(game_map_redBg);
		this.addChild(bg);
		
	},
});

var HelpScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new HelpLayer();
		this.addChild(layer);
	}
});