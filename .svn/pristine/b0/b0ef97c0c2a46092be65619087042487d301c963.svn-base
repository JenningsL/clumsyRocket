function Background(_ctx)
{
  this.ctx=_ctx;
	this.starsInfo=[];
    for(var i=0;i<20;i++)
    {
      var pos=new b2Vec2();
      pos.x=Math.random()*canvasSize.width;
      pos.y=Math.random()*canvasSize.height;
      var r=Math.random()*5;
      this.starsInfo.push({
      	"p":pos,
      	"r":r
      });
    }
  this.lastRoecketY=0;
  this.rolling=0;
  this.flag=1;//防止重复加入地面body
}
Background.prototype={
	constructor:Background,
	reconstruct:function(){
			this.starsInfo=[];
		    for(var i=0;i<20;i++)
		    {
		      var pos=new b2Vec2();
		      pos.x=Math.random()*canvasSize.width;
		      pos.y=Math.random()*canvasSize.height;
		      var r=Math.random()*5;
		      this.starsInfo.push({
		      	"p":pos,
		      	"r":r
		      });
		    }

		},
	getStarsInfo:function(){
		return this.starsInfo;
	},
	draw:function(rocket){
    this.follow(rocket);
    this.ctx.fillStyle="#3d4241";
    this.ctx.fillRect(0,0,canvasSize.width,canvasSize.height);
    for(var i=0;i<this.starsInfo.length; i++)
    {
    	this.ctx.beginPath();
        this.ctx.fillStyle="#fce580";
        this.ctx.arc(this.starsInfo[i].p.x,this.starsInfo[i].p.y,this.starsInfo[i].r,0,Math.PI*2);
        //this.ctx.arc(200,200,30,0,Math.PI*2);
        this.ctx.closePath();
        this.ctx.fill();
    }
   
    },
  follow:function(rocket){
    if(this.rolling==1)
    {
      for(var i=0;i<this.starsInfo.length; i++)
      {
        this.starsInfo[i].p.y+=2;
        if(this.starsInfo[i].p.y>canvasSize.height)
        {
          this.starsInfo[i].p.x=Math.random()*canvasSize.width;
          this.starsInfo[i].p.y=this.starsInfo[i].p.y%canvasSize.height;//重新生成坐标，使得无限显示
        }
      }
      if(this.flag==1){
        game.Gabages.push(game.ground.body);
        game.lauched=true;//表明飞船已经起飞
        flag=0;
      }
      return;
    }//进入自动滚动状态
    var rocketPos=rocket.body.GetPosition();
    if(rocketPos.y*worldscale>canvasSize.height/2&&rocketPos.y*worldscale<canvasSize.height*3/4)
    {
      var offsetY=(rocketPos.y-this.lastRoecketY)*worldscale;
      //rocketPos.x*=10;
      //rocketPos.y=rocketPos.y*10;
      //console.log(offsetY);
      for(var i=0;i<this.starsInfo.length; i++)
      {
        this.starsInfo[i].p.y-=offsetY;
        if(this.starsInfo[i].p.y>canvasSize.height)
        {
          this.starsInfo[i].p.x=Math.random()*canvasSize.width;
          this.starsInfo[i].p.y=this.starsInfo[i].p.y%canvasSize.height;//重新生成坐标，使得无限显示
        }
      }
      if(game.begin){
        game.ground.follow(offsetY);
      }

    }
    else if(rocketPos.y*worldscale<canvasSize.height/2)
    {
      this.rolling=1;
      return;
    }
    this.lastRoecketY=rocketPos.y;//更新上次的Y坐标
  }     
}