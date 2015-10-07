//黑洞的定义
function BlackHole(x,y,gravity,angleV,ctx){
	this.x=x;
	this.y=y;
	this.gravity=gravity;//引力系数
	this.angleV=angleV;//角速度
	this.angle=0;
	this.ctx=ctx;
	this.w=0.1843*canvasSize.width;
	this.h=0.1936*canvasSize.width;//118*124
	this.g=null;//引力

}
BlackHole.prototype={
	constructor:BlackHole,
	draw:function(){
		this.y++;
        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        //this.ctx.translate(100,50);
        this.angle+=this.angleV;
        this.ctx.rotate(this.angle);//必须先旋转完
        this.ctx.translate(-this.w/2,-this.h/2);
        //alert(this.w);
        this.ctx.drawImage(images.blackHole,0,0,this.w,this.h);
        this.ctx.restore();
	},
	pullAndDetect:function(rocket){
        var rPos=rocket.body.GetPosition();
        var disInPx=new b2Vec2(rPos.x*worldscale-this.x,rPos.y*worldscale-this.y);
        if(disInPx.Length()<this.w/2) game.end();//距离太近
        else{
        	this.g=new b2Vec2(this.x/worldscale-rPos.x,this.y/worldscale-rPos.y);
        	this.g.Multiply(this.gravity);
        	rocket.body.ApplyForce(this.g,rPos);
        }

	},//将火箭拉向黑洞
    isOut:function(){
    	if(this.x<0||this.x>canvasSize.width||this.y<0||this.y>canvasSize.height) return true;
    	else return false;
    }
}