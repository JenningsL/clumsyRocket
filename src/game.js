function Game(){
	this.ctx=null;
	this.runTime=0;
	this.score=0;
  this.lastScore=0;
	this.level=1;
  this.isPause=false;
  this.isEnd=false;
  this.lauched=false;//是否起飞成功
  this.first=true;//是否第一次打开
  this.canvas=document.getElementById("myCanvas");
  this.ctx=this.canvas.getContext("2d");
  this.canvasPosition = getElementPosition(document.getElementById("myCanvas"));
  this.begin=false;//用户是否开始操作
  this.wrongOrient=false;
  this.welcomeScene=null;//欢迎界面

   this.canvas.width=window.innerWidth;
   this.canvas.height=window.innerHeight ;

   canvasSize.width=this.canvas.width;
   canvasSize.height=this.canvas.height;

  if(this.canvas.width>this.canvas.height){
    this.ctx.clearRect(0,0,canvasSize.width,canvasSize.height);//清屏
    //绘制背景
    this.ctx.fillStyle="#3d4241";//背景颜色
    this.ctx.rect(0,0,canvasSize.width,canvasSize.height);
    this.ctx.fill();
    //错误信息
    this.ctx.font=canvasSize.width*0.04+"px 微软雅黑";
    this.ctx.fillStyle="white";
    this.ctx.textBaseline="middle";//顶部对齐
    this.ctx.textAlign="center";
    this.ctx.fillText("请保持设备垂直,然后重新打开网页",canvasSize.width*0.5,canvasSize.height*0.5);
    this.wrongOrient=true;
  }//方向不对,提示错误信息
  this.canvasPosition=getElementPosition(document.getElementById("myCanvas"));

  this.wInMeter=canvasSize.width/worldscale;
  this.hInMeter=canvasSize.height/worldscale;//换算成米的长宽

  /*this.propulsionSound=document.getElementById("propulsion");//火箭喷射声音
  this.propulsionSound.playbackRate=2;//4倍速播放
  this.propulsionSound.volume=0.5;
  this.confirmSound=document.getElementById("confirm");//确定按钮声
  this.confirmSound.volume=0.3;
  this.crashSound=document.getElementById("crash");//撞击
  this.crashSound.volume=0.3;
  this.bgmusic=document.getElementById("bgmusic");//背景音乐
  this.bgmusic.volume=0.3;*/
  //背景
  this.bg=null;
  //地面
  this.ground=null;
  //火箭
  this.rocket=null;
  //垃圾数组
  this.Gabages=[];
  //陨石数组
  this.aeros=new Array();
    
}
Game.prototype={
	constructor:Game,
	init:function(){

    //初始化世界
	  this.world= new b2World(
               new b2Vec2(0, 10)    //gravity
            ,  true                 //allow sleep
         );	
      var debugDraw = new b2DebugDraw();
         debugDraw.SetSprite(document.getElementById("myCanvas").getContext("2d"));
         debugDraw.SetDrawScale(30.0);
         debugDraw.SetFillAlpha(0.3);
         debugDraw.SetLineThickness(1.0);
         debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
         this.world.SetDebugDraw(debugDraw);//开启debug绘图
      //初始化状态变量
      this.lauched=false;
      this.isEnd=false;
      this.isPause=false;
      this.runTime=0;
      this.score=0;
      this.level=1;
      this.lastScore=0;
      this.begin=false;//用户是否开始操作
      //添加基本body
      this.bg=new Background(this.ctx);
      this.ground=new LauchGnd(this.world,this.ctx);
      this.rocket=new Rocket(76,103,this.wInMeter/2,this.hInMeter*0.75,this.world,this.ctx);
      this.aeros=[];
      //this.blackhole= new BlackHole(200,100,1,0.01,this.ctx);
      this.blackhole=null;
      //添加控件
      this.pauseBt=new Button("pause",canvasSize.width*0.8,canvasSize.width*0.08,canvasSize.width*0.07,"#FFF",this.ctx);
      if(this.first){
        showGameInstruction();
        this.first=false;
      }

      //添加碰撞监听
      var contactListener = new b2ContactListener();
          contactListener.BeginContact = this.beginContact;
          //contactListener.EndContact   = endContact;
          //contactListener.PreSolve     = preSolve;
          //contactListener.PostSolve    = postSolve;
          this.world.SetContactListener(contactListener);
      //添加事件监听
      this.canvas.addEventListener( 'touchstart', function( e ){
        
        var touches = e.touches[0];
        var startTx = touches.clientX-game.canvasPosition.x;
        var startTy = touches.clientY-game.canvasPosition.y;

        if(!game.isPause&&!game.isEnd){
          if(game.pauseBt.isClick(startTx,startTy)) {
            game.pauseBt.setSize(canvasSize.width*0.08); 
            return;    
          }
          game.rocket.acc(startTx); 
        }
        

      }, true );
      this.canvas.addEventListener( 'touchend', function( e ){
        if(!game.isPause&&!game.isEnd){
           game.pauseBt.setSize(canvasSize.width*0.07);    
        }        
        var touches = e.changedTouches[0];
        
        var endTx = touches.clientX-game.canvasPosition.x;
        var endTy = touches.clientY-game.canvasPosition.y;

        if(game.isEnd){
          if(game.gameOver.restart.isClick(endTx,endTy)) {
            game.init();//重新开始
            return;
          }
          if(game.gameOver.share.isClick(endTx,endTy)){

            //shareTimeline();
            return;
          }
        }
        else if(game.isPause){
          if(game.resumeBt.isClick(endTx,endTy)) {
            game.resume();
            return;
          }
        }
        else
        {
          if(game.pauseBt.isClick(endTx,endTy))
          {
            game.pause();
            return;
          }
        }

      }, true );

      if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", game.motionHandler, false);
      }//添加陀螺仪监听
      else alert("你的设备不支持陀螺仪");
      if(this.tick!=null) window.clearInterval(this.tick);
      this.tick=window.setInterval(update, 1000 / 60);
	},
  restart:function(){
    //初始化状态变量
    this.lauched=false;
    this.isEnd=false;
    this.isPause=false;
    this.runTime=0;
    this.score=0;
    this.level=1;
    this.lastScore=0;
    this.begin=false;//用户是否开始操作
    //添加基本body
    this.bg=new Background(this.ctx);
    this.ground=new LauchGnd(this.world,this.ctx);
    this.rocket=new Rocket(76,103,this.wInMeter/2,this.hInMeter*0.75,this.world,this.ctx);
    this.aeros=[];
    //this.blackhole= new BlackHole(200,100,1,0.01,this.ctx);
    this.blackhole=null;
    //添加控件
    this.pauseBt=new Button("pause",canvasSize.width*0.8,canvasSize.width*0.08,canvasSize.width*0.07,"#FFF",this.ctx);
    if(this.tick!=null) window.clearInterval(this.tick);
    this.tick=window.setInterval(update, 1000 / 60);
  },
	updateSprite:function(){
		var aBody=this.world.GetBodyList();
		if(aBody==null) return;
		for(var aBody=this.world.GetBodyList();aBody.GetNext()!=null;aBody=aBody.GetNext())
		{
		 
		 var position=aBody.GetPosition();
		 var angle=aBody.GetAngle();
		 var userData=aBody.GetUserData();
		 if(userData.type=="ground") continue;


		 this.ctx.save();
		 this.ctx.translate(position.x*worldscale,position.y*worldscale);
		 this.ctx.rotate(angle);//必须先旋转完
		 this.ctx.translate(-userData.pWidth/2,-userData.pHeight/2);
		 
		 this.ctx.drawImage(userData.pic,0,0,userData.pWidth,userData.pHeight);//body是以右下角为原点
		 this.ctx.restore();
		 
		}  
	},
	drawStatus:function(){
  var size=canvasSize.width*0.07;
	this.ctx.font=size+"px Arial";
	this.ctx.fillStyle="#FFF";
  this.ctx.textBaseline="middle";//中部对齐
  this.ctx.textAlign="center";
	this.ctx.fillText("Score: "+this.score,canvasSize.width*0.2,canvasSize.width*0.08);
    },
  removeGabage:function(){
    	for(var i=0;i<this.Gabages.length;i++)
    	{
    	 this.world.DestroyBody(this.Gabages[i]); 
    	 this.Gabages[i] = null; 
    	}
    	 this.Gabages=null;
    	 this.Gabages =new Array();
    },//清理垃圾
  end:function()//游戏结束
  {
    window.clearInterval(this.tick);

    this.gameOver=new GameOverScene(this.ctx);
    var that=this;
    this.tick=setInterval(function(){that.gameOver.draw();},1000/60);
    //this.gameOver.draw();
    for(var aBody=this.world.GetBodyList();aBody.GetNext()!=null;aBody=aBody.GetNext())
    {
      this.Gabages.push(aBody);
    }
    this.removeGabage();//清理垃圾
    this.aeros=null;
    //this.world=null;
    this.bg=null;
    this.ground=null;
    this.rocket=null;//清理
    this.isEnd=true;
    this.pauseBt=null;
  },
  pause:function(){
    window.clearInterval(this.tick);
    this.resumeBt=new ResumeButton("resume",canvasSize.width/2,canvasSize.height/2,canvasSize.width*0.1,"#fff",this.ctx);
    this.resumeBt.draw();
    this.isPause=true;
  },
  resume:function(){
    this.tick=window.setInterval(update,1000/60);
    this.isPause=false;
    this.resumeBt=null;
  },
  beginContact:function(contact){
    var t1=contact.GetFixtureA().GetBody().GetUserData().type;
    var t2=contact.GetFixtureB().GetBody().GetUserData().type;
    if((t1=="aero"&&t2=="rocket")||(t2=="aero"&&t1=="rocket"))
    {
      game.end();
    } 
  },
  motionHandler:function (event) {
  var acc = event.acceleration;
  var accGravity = event.accelerationIncludingGravity;
  var rotationRate = event.rotationRate;
  var rocketCenter=game.rocket.body.GetPosition();//获取火箭中心位置
  
  if(game.lauched){
    if(phone=="ios") var coefficient=-0.1*canvasSize.width;
    else if(phone=="android")  var coefficient=0.1*canvasSize.width;
    else var coefficient=0.1*canvasSize.width;
    game.rocket.body.ApplyForce(new b2Vec2(accGravity.x*(-coefficient),0),rocketCenter);
  }
  
  
  //game.drawAccInfo(acc);
  //console.log(acc,accGravity,rotationRate);
  },//允许用户用陀螺仪控制方向
  drawAccInfo:function(acc){
      this.ctx.save();
      this.ctx.font="70px Arial";
      this.ctx.fillStyle="#fff000";
      this.ctx.textBaseline="middle";//顶部对齐
      this.ctx.textAlign="center";
      this.ctx.fillText("x: "+acc.x+",y: "+acc.y+",z: "+acc.z,canvasSize.width/2,canvasSize.height/2);
      this.ctx.restore();
  },
  welcome:function(){
    this.welcomeScene=new WelcomeScene(this.ctx);
//    document.getElementById("bgmusic").play();
    var that =this;
    this.tick=setInterval(function(){that.welcomeScene.draw();},1000/60);
    this.canvas.addEventListener( 'touchstart', welcomeHandler, true );
  }
	
}
function welcomeHandler(e){
  var touches = e.touches[0];
  var startTx = touches.clientX-game.canvasPosition.x;
  var startTy = touches.clientY-game.canvasPosition.y;
  
    if(game.welcomeScene.beginBt.isClick(startTx,startTy)) {
      game.init();  
      game.welcomeScene=null;
      game.canvas.removeEventListener( 'touchstart', welcomeHandler, true );
      //game.bgmusic.pause();
    }

}