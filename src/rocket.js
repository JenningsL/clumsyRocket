//Rocket的构造函数
function Rocket(ww,hh,x,y,world,_ctx){
  this.world=world;
  this.ctx=_ctx;
  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;
  var bodyDef = new b2BodyDef;
  //创建一个刚体
  bodyDef.type = b2Body.b2_dynamicBody;

  var ph=0.161*canvasSize.width;
  var pw=0.1186*canvasSize.width;//单位px

  var mh=ph/worldscale;
  var mw=pw/worldscale;//单位m
  var vertices = [];

  vertices.push(new b2Vec2(-0.5*mw,0.364*mh));
  vertices.push(new b2Vec2(-0.2236*mw,-0.5*mh)); 
  vertices.push(new b2Vec2(0.2236*mw,-0.5*mh)); 
  vertices.push(new b2Vec2(0.5*mw,0.364*mh));
  vertices.push(new b2Vec2(0.289*mw,0.5*mh));
  vertices.push(new b2Vec2(-0.289*mw,0.5*mh));
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsArray(vertices,vertices.length);


     bodyDef.position.x = x;
     bodyDef.position.y = y;
     rocket=this.world.CreateBody(bodyDef);
     rocket.CreateFixture(fixDef);
     rocket.SetUserData({
       type:"rocket",
       pic:images.rocket,
       pHeight:ph,//原始尺寸103
       pWidth:pw//原始尺寸76
     });
  this.body=rocket;
  this.pwForFire=0.017*canvasSize.width;//11
  this.phForFire=0.031*canvasSize.width;//20
  this.maxSpeed=0.015*canvasSize.width;
}
Rocket.prototype={
  constructor:Rocket,
  drawFire:function(center,angle,offsetX,offsetY){
    this.ctx.save();
    this.ctx.translate(center.x*worldscale,center.y*worldscale);
    this.ctx.rotate(angle);//必须先旋转完
    this.ctx.drawImage(images.fire,offsetX,offsetY,this.pwForFire,this.phForFire);//绘制火
    this.ctx.restore();
  },
  acc:function(startTx){
     var m=this.body.GetMass();
     var c=this.body.GetPosition();
     var pH=this.body.GetUserData().pHeight;
     var pW=this.body.GetUserData().pWidth;
     var bottomLeft=new b2Vec2(c.x-pW/(4*worldscale),c.y+pH/(4*worldscale));
     var bottomRight=new b2Vec2(c.x+pW/(4*worldscale),c.y+pH/(4*worldscale));//获得左下角和右下角的坐标
     var angle=this.body.GetAngle();
     
     var force=new b2Vec2();
     force.x=Math.sin(angle)*0.047*canvasSize.width;//30
     force.y=-Math.cos(angle)*0.047*canvasSize.width;//计算反冲力

     if(startTx<canvasSize.width/2) 
    {
      this.drawFire(c,angle,-pW/4,pH/2);//左边喷火
      this.body.ApplyImpulse(force,bottomLeft);
       
    }
     else
    {
        this.drawFire(c,angle,pW/4,pH/2);//右边喷火
        this.body.ApplyImpulse(force,bottomRight);
       
    }
    //game.propulsionSound.play();
    game.begin=true;
  },
  limit:function(){
    //限制火箭的角速度
    if(this.body.GetAngularVelocity()>0.3)
    {
      this.body.SetAngularVelocity(0.3);
    }
    else if(this.body.GetAngularVelocity()<-0.3)
    {
      this.body.SetAngularVelocity(-0.3);
    }
    var LV=this.body.GetLinearVelocity();
    
    //限制火箭的线速度
    if(Math.abs(LV.Length())>this.maxSpeed)
    {
      
      LV.x=LV.x/LV.Length()*this.maxSpeed;
      LV.y=LV.y/LV.Length()*this.maxSpeed;
      this.body.SetLinearVelocity(LV);
    }

  },
  isOut:function(){
    var p=this.body.GetPosition();
    if(p.x<0||p.y<0||p.x*worldscale>canvasSize.width||p.y*worldscale>canvasSize.height) return true;
    else return false;
  }
}
/**************************************************************************/

