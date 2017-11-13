var GameLayer = cc.Layer.extend({

	init: function(){
		
		this._super();
		var size = cc.winSize;

		var bg = new cc.Sprite(img_game_background)
    bg.x = size.width / 2;
    bg.y = size.height / 2;
    this.addChild(bg);

    var myfly = new cc.Sprite(img_myfly);
    myfly.x = size.width / 2;
    myfly.y = 100;
    this.addChild(myfly);
	}
});

var GameScene = cc.Scene.extend({
  onEnter: function () {
    this._super();
    var layer = new GameLayer();
    this.addChild(layer);
    layer.init();
  }
});