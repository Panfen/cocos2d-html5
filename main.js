cc.game.onStart = function(){

	//If referenced loading.js, please remove it
  if(!cc.sys.isNative && document.getElementById("cocosLoading"))
    document.body.removeChild(document.getElementById("cocosLoading"));

  var designSize = cc.size(320, 500);
  var screenSize = cc.view.getFrameSize();

  if(!cc.sys.isNative && screenSize.height < 800){
    designSize = cc.size(320, 500);
    cc.loader.resPath = "res/Normal";
  }else{
    cc.loader.resPath = "res/HD";
  }
  cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.SHOW_ALL);

  //load resources
  cc.LoaderScene.preload(g_resources, function () {
    cc.director.runScene(new IndexScene());
  }, this);
};
cc.game.run();