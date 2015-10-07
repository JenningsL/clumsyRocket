function Button(_text,_x,_y,_size,_color,_ctx){
	this.text=_text;
	this.x=_x;
	this.y=_y;
	this.size=_size;
	this.color=_color;
	this.ctx=_ctx;
	this.textWidth=0;
}
Button.prototype={
	constructor:Button,
	draw:function(){
		this.ctx.font=this.size+"px Arial";
		this.ctx.fillStyle=this.color;
		this.ctx.textBaseline="middle";//中部对齐
		this.ctx.textAlign="center";
		this.ctx.fillText(this.text,this.x,this.y);
        this.textWidth=this.ctx.measureText(this.text).width;
	},
	getTextWidth:function(){
        return this.textWidth;
	},
	isClick:function(x,y){
        if(x>=this.x&&x<=this.x+this.textWidth&&y>=this.y&&y<=this.y+this.size)
         {
         	return true;
         }
        else return false;
	},
	setSize:function(s){
		this.size=s;
	}
}
/*******************************************************************************/
//恢复按钮以及背景蒙层，继承自Button类
/*******************************************************************************/
function ResumeButton(text,x,y,size,color,ctx){
	//继承属性
	Button.call(this,text,x,y,size,color,ctx);
}
ResumeButton.prototype=new Button();
ResumeButton.prototype.draw=function(){

	//绘制背景
	this.ctx.fillStyle="rgba(0,0,0,0.4)";
	this.ctx.rect(0,0,canvasSize.width,canvasSize.height);
	this.ctx.fill();
	//绘制字体
	this.ctx.save();
	this.ctx.font=this.size+"px Arial";
	this.ctx.fillStyle=this.color;
	this.ctx.textBaseline="middle";//顶部对齐
	this.ctx.textAlign="center";
	this.ctx.fillText(this.text,this.x,this.y);
    this.textWidth=this.ctx.measureText(this.text).width;
    this.ctx.restore();
}
/*******************************************************************************/
//游戏结束画面
/*******************************************************************************/
function GameOverScene(ctx){
    this.ctx=ctx;
    //this.restart=new Button("Restart",canvasSize.width/2,canvasSize.height/2,canvasSize.width*0.07,"#fff",ctx);
    var csw=canvasSize.width;
    var csh=canvasSize.height;
    this.restart=new ButtonWithBg("Restart",csw*0.29,csh*0.6,
    	0.42*csw,0.12*csh,10,"white","#43b864",ctx);
    this.share=new ButtonWithBg("Share",csw*0.29,csh*0.73,
    	0.42*csw,0.12*csh,10,"white","#43b864",ctx);
    if(localStorage.record==undefined||localStorage.record<game.score)
    localStorage.setItem("record",game.score);
} 
GameOverScene.prototype={
	constructor:GameOverScene,
	draw:function(){
		this.ctx.clearRect(0,0,canvasSize.width,canvasSize.height);//清屏
        //绘制背景
        this.ctx.fillStyle="#3d4241";//背景颜色
        this.ctx.rect(0,0,canvasSize.width,canvasSize.height);
        this.ctx.fill();
		//绘制标题
		this.ctx.save();
		this.ctx.font=canvasSize.width*0.15+"px Arial";
		this.ctx.fillStyle="#f7ed49";//黄色
		this.ctx.fillStyle="#fff";//白色
		this.ctx.textBaseline="middle";//顶部对齐
		this.ctx.textAlign="center";
		this.ctx.fillText("Game Over",canvasSize.width*0.5,canvasSize.height*0.3);
		//绘制得分
		this.ctx.font=canvasSize.width*0.1+"px Arial";
		this.ctx.fillText("Score:"+game.score,canvasSize.width*0.5,canvasSize.height*0.43);
		this.ctx.fillText("Record:"+localStorage.record,canvasSize.width*0.5,canvasSize.height*0.5);//最高分
		this.ctx.restore();		
        this.restart.draw();
        this.share.draw();
	}
}
//*****************************************************************************//
//有背景的button定义
//*****************************************************************************//
function ButtonWithBg(text,x,y,w,h,radius,textcolor,bgcolor,ctx){
	this.text=text;
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.textcolor=textcolor;
	this.bgcolor=bgcolor;
    this.ctx=ctx;
    this.r=radius;
}
ButtonWithBg.prototype={
	constructor:ButtonWithBg,
	isClick:function(x,y){
		if(x>=this.x&&x<=this.x+this.w&&y>=this.y&&y<=this.y+this.h) return true;
		else return false; 
	},
	draw:function(){
		this.ctx.save();
		this.ctx.beginPath();  
		this.ctx.moveTo(this.x + this.r, this.y);  
		this.ctx.lineTo(this.x + this.w - this.r, this.y);  
		this.ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r);  
		this.ctx.lineTo(this.x + this.w, this.y + this.h - this.r);  
		this.ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y+ this.h);  
		this.ctx.lineTo(this.x + this.r, this.y + this.h);  
		this.ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.r);  
		this.ctx.lineTo(this.x, this.y + this.r);  
		this.ctx.quadraticCurveTo(this.x, this.y, this.x + this.r, this.y);  
		this.ctx.closePath();  
		this.ctx.fillStyle="#43b864";
		this.ctx.fill();
		this.ctx.restore();//绘制圆角矩形

		this.ctx.save();
		this.ctx.font=canvasSize.width*0.07+"px Arial";
		this.ctx.fillStyle="#fff";
		this.ctx.textBaseline="middle";//顶部对齐
		this.ctx.textAlign="center";
		this.ctx.fillText(this.text,this.x+this.w*0.5,this.y+this.h*0.5);
		this.ctx.restore();		
	}
}
//*****************************************************************************//
//游戏提示
//*****************************************************************************//
function showGameInstruction(ctx){

     var canvas=document.getElementById("myCanvas");
     var div=document.getElementById("content");
     var tipsBg=document.createElement("div");
     tipsBg.id="tips";
     var marginL=canvasSize.width*0.1;
     var marginT=canvasSize.height*0.15;
     
     tipsBg.style.cssText="width:80%;height:70%;margin-left:"+marginL+"px;margin-top:"+marginT+"px;background-color:white;z-index:100;position:absolute;border-radius:10px";
     div.insertBefore(tipsBg,canvas);
     var title=document.createElement("h3");
     var size=canvasSize.width*0.07;
     title.style.cssText="font-family:微软雅黑;font-size:"+size+"px;text-Align:center"
     title.innerHTML="游戏说明";
     tipsBg.appendChild(title);//标题
     var text=document.createElement("p");
     var size=canvasSize.width*0.05;
     if(size>35) size=35;
     var textMargin=canvasSize.width*0.05;
     text.style.cssText="font-family:微软雅黑;font-size:"+size+"px;margin:"+textMargin+"px"
     text.innerHTML="1.点击屏幕的左半边发动左引擎,点击屏幕的右半边发动右引擎。</br>2.控制左右引擎的喷射时间以保持火箭平衡。</br>3.起飞之后(超过屏幕一半以上)可以通过重力感应调整飞船方向。</br>4.躲避陨石和黑洞,争取最远的航行距离。</br>5.注意不要超出屏幕范围";
     tipsBg.appendChild(text);
     var closeBt=document.createElement("div");
     var BtHeight=0.125*canvasSize.width;
     closeBt.style.cssText="width:100%;height:"+BtHeight+";background-color:#32b6e7;position:absolute;bottom:0px;border-radius: 0px 0px 10px 10px;line-height:"+BtHeight+"px";
     tipsBg.appendChild(closeBt);
     var confirmsize=canvasSize.width*0.07;
     var confirm=document.createElement("p");
     confirm.style.cssText="font-family:Arial;font-size:"+confirmsize+"px;text-Align:center;margin:0px;color:white"
     confirm.innerHTML="Got it!";
     closeBt.appendChild(confirm);//确定按钮
     closeBt.addEventListener( 'touchend', function( e ){
        var tips=document.getElementById("tips");
        tips.style.display="none";
     }, true );
}
//欢迎页面
function WelcomeScene(ctx){
	this.starWidth=0.4146*canvasSize.width;
	this.starHeight=0.62814*this.starWidth;
    this.ctx=ctx;
    this.centerX=canvasSize.width*0.5;
    this.centerY=canvasSize.height*0.5;
   
    this.rocketWidth=0.09583*canvasSize.width;
    this.rocketHeight=this.rocketWidth*1.8043;
    this.rwo=this.rocketWidth;
    this.rho=this.rocketHeight;//火箭的原始尺寸
    this.a=0.3*canvasSize.width;//椭圆轨道长边
    this.b=0.15*canvasSize.width;//短边
    this.rocketPos={x:this.centerX,y:this.centerY};
    this.rocketAngle=0;
    this.rocketScale=1;

    this.logoWidth=0.6708*canvasSize.width;
    this.logoHeight=0.43789* this.logoWidth;

    this.beginBt=new ButtonWithBg("Start",this.centerX-canvasSize.width*0.2,canvasSize.height*0.85-canvasSize.width*0.0791,canvasSize.width*0.4,canvasSize.width*0.158,10,"white","#ee7845",this.ctx);
}
WelcomeScene.prototype={
	constructor:WelcomeScene,
	draw:function(){
		this.ctx.clearRect(0,0,canvasSize.width,canvasSize.height);//清屏
		//绘制背景
		this.ctx.fillStyle="#3d4241";//背景颜色
		this.ctx.rect(0,0,canvasSize.width,canvasSize.height);
		this.ctx.fill();
		//绘制火箭
		this.ctx.save();
		this.ctx.translate(this.centerX,this.centerY*0.6);
		this.ctx.rotate(-Math.PI*0.16);
		this.ctx.drawImage(images.beginRocket,this.rocketPos.x-this.rocketWidth/2,this.rocketPos.y-this.rocketHeight/2,this.rocketWidth,this.rocketHeight);
		this.updateRocketPos();
		this.ctx.restore();
		//绘制星球
		this.ctx.drawImage(images.star,this.centerX-this.starWidth/2,this.centerY*0.5-this.starHeight/2,this.starWidth,this.starHeight);
		//绘制标题
		this.ctx.drawImage(images.logo,this.centerX-this.logoWidth/2,canvasSize.height*0.6-this.logoHeight/2,this.logoWidth,this.logoHeight);
		//绘制按钮
		this.beginBt.draw();
		//脚注
		this.ctx.font=canvasSize.width*0.03+"px Arial";
		this.ctx.fillStyle="grey";
		this.ctx.textBaseline="middle";//顶部对齐
		this.ctx.textAlign="center";
		this.ctx.fillText("Created by Jennings",this.centerX,canvasSize.height*0.95);
	},
	updateRocketPos:function(){
        this.rocketAngle+=0.01;
        if(this.rocketAngle>2*Math.PI) this.rocketAngle=0;
		this.rocketPos.x=this.a*Math.cos(this.rocketAngle);
		this.rocketPos.y=this.b*Math.sin(this.rocketAngle);
		var cos=Math.cos(this.rocketAngle);
		if(this.rocketAngle>0&&this.rocketAngle<=Math.PI) this.rocketScale=1;
		else this.rocketScale=Math.abs(cos)*0.5+0.5;
        this.rocketWidth=this.rwo*this.rocketScale;
        this.rocketHeight=this.rho*this.rocketScale;
	}
}
