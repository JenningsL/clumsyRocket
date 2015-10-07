var sources = {    
        rocket: "./res/rocket2.png",    
        rock:"./res/rock.png",
        fire:"./res/fire.png",
        blackHole:"./res/blackHole_2.png",
        star: "./res/star.png",
        logo: "./res/logo.png",
        beginRocket:"./res/beginRocket.png"

}; 
var images={};

/*star
 *loading模块
 *实现图片的预加载，并显示进度条
 *参数：图片数组对象，加载完成的回调函数
 */
function loadImages(sources,_game){    
    var loadedImages = 0;    
    var numImages = 0;  

    var clearWidth=_game.canvas.width;
    var clearHeight=_game.canvas.height;
    _game.ctx.font=clearWidth*0.07+'px bold';
    _game.ctx.lineWidth=clearWidth*0.07;
    // get num of sources    
    for (var src in sources) {    
        numImages++;    
    }    
    for (var src in sources) {    
        images[src] = new Image();
        //当一张图片加载完成时执行    
        images[src].onload = function(){ 
            //重绘一个进度条
            _game.ctx.clearRect(0,0,clearWidth,clearHeight);
            _game.ctx.textBaseline="middle";
            _game.ctx.textAlign="center";
            _game.ctx.fillText('Loading:'+loadedImages+'/'+numImages,clearHeight*0.4,clearWidth*0.5);
            _game.ctx.save();
            _game.ctx.strokeStyle='#555';
            _game.ctx.beginPath();
            _game.ctx.moveTo(clearWidth*0.2,clearHeight*0.5);
            _game.ctx.lineTo(clearWidth*0.8,clearHeight*0.5);
            _game.ctx.stroke();
            _game.ctx.beginPath();
            _game.ctx.restore();
            _game.ctx.moveTo(clearWidth*0.2,clearHeight*0.5);
            _game.ctx.lineTo(loadedImages/numImages*clearWidth*0.6+clearWidth*0.2,clearHeight*0.5);  
            _game.ctx.stroke();
            //当所有图片加载完成时，执行回调函数callback
            if (++loadedImages >= numImages) {    
                //_game.init();   
                _game.welcome(); 
            }    
        };  
        //把sources中的图片信息导入images数组  
        images[src].src = sources[src];    
    }    
}    
//定义预加载图片数组对象，执行loading模块
var game;
var   b2Vec2
,  b2AABB
,   b2BodyDef 
,   b2Body 
,   b2FixtureDef
,   b2Fixture 
,   b2World 
,   b2MassData 
,   b2PolygonShape 
,   b2CircleShape 
,   b2DebugDraw 
,  b2MouseJointDef 
,b2RevoluteJointDef,
b2DistanceJointDef,
b2Transform,
b2ContactListener,
b2Mat22;
var phone;
window.onload = function(){   

        function versions(){
                var u = navigator.userAgent, app = navigator.appVersion;
                return {         //移动终端浏览器版本信息
                    windowPhone: u.indexOf('Trident') > -1, //IE内核
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
                };
             };
    if(versions().android){
      phone="android";
      
    }else if(versions().ios)
    {
      phone="ios";
    }
    //alert(versions().android);
    //alert(versions().iPad);
    //初始化物理引擎
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    b2Transform=Box2D.Common.Math.b2Transform;
    b2Mat22=Box2D.Common.Math.b2Mat22;
    b2AABB = Box2D.Collision.b2AABB;
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    b2Body = Box2D.Dynamics.b2Body;
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    b2Fixture = Box2D.Dynamics.b2Fixture;
    b2World = Box2D.Dynamics.b2World;
    b2MassData = Box2D.Collision.Shapes.b2MassData;
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
    b2RevoluteJointDef=Box2D.Dynamics.Joints.b2RevoluteJointDef;
    b2DistanceJointDef=Box2D.Dynamics.Joints.b2DistanceJointDef;
    b2ContactListener=Box2D.Dynamics.b2ContactListener;
    
    //初始化
    game=new Game();
    if(game.wrongOrient) return;
    //执行图片预加载，加载完成后执行main
    loadImages(sources,game);
};   

var lastTime=0;
function update(){
    game.rocket.limit();
    if(game.rocket.isOut()) {
       game.end();//火箭冲出屏幕,结束
       return;
    }
    game.ctx.clearRect(0,0,canvasSize.width,canvasSize.height);//清屏
    game.bg.draw(game.rocket);//绘制背景
    game.pauseBt.draw();
    game.ground.draw();
    game.drawStatus();


    if(game.lauched)
    {
      if(game.level>=4)
      {
        if(game.blackhole==null) {
          var bhy=Math.random()*canvasSize.width;//黑洞的初始位置
          var gravity=0.004*canvasSize.width;
          game.blackhole= new BlackHole(bhy,0,gravity,0.01,game.ctx);  
        }
        else if(game.blackhole.isOut()) game.blackhole=null;
        else {
          game.blackhole.draw();//绘制黑洞
          game.blackhole.pullAndDetect(game.rocket);
        }
    
      }
      for(var i=0;i<game.aeros.length;i++)
        {
          if(game.aeros[i].isOut()){
            game.Gabages.push(game.aeros[i].body);
            game.aeros.splice(i,1);//删除该元素
          }
          else if(game.aeros[i].isComing()){
            game.aeros[i].showTips();
            game.aeros[i].run();
          }
          else game.aeros[i].run();
        }
        if(game.aeros.length<game.level)
        {
          game.aeros.push(randomCreateAero(game.world,game.ctx));
        }//检查陨石是否出界以及维持陨石的数量

      game.score++;
    }

    if(game.score-game.lastScore>500) {
      game.level++;
      if(game.level>5) game.level=5;//限制陨石的数量
      game.lastScore=game.score;
    }
    
    game.world.Step(1 / 60, 10, 10);
    //game.world.DrawDebugData();
    game.world.ClearForces(); 
    game.updateSprite();
    game.removeGabage();
    //game.runTime+=60;//粗略计算运行时间,ms

    /*var timeNow = new Date().getTime();
    showFps(game.ctx,1000/(timeNow-lastTime));
    lastTime=timeNow;*///显示帧率
  }
function showFps(ctx,f){
  ctx.font="40px Arial";
  ctx.fillStyle="#FFF";
  var fs=""+f;
  fs=fs.substr(0,2);
  ctx.fillText("FPS: "+fs,canvasSize.width/2,canvasSize.height/2);
}
//http://js-tut.aardon.de/js-tut/tutorial/position.html
function getElementPosition(element) {
   var elem=element, tagname="", x=0, y=0;
  
   while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
      y += elem.offsetTop;
      x += elem.offsetLeft;
      tagname = elem.tagName.toUpperCase();
      if(tagname == "BODY")
         elem=0;
      if(typeof(elem) == "object") {
         if(typeof(elem.offsetParent) == "object")
            elem = elem.offsetParent;
      }
   }
   return {x: x, y: y};
}





