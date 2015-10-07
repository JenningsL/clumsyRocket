//陨石的构造函数
function Aero(x,y,type,dx,world,_ctx){
  this.world=world;
  this.ctx=_ctx;
  this.originX=x;
  this.originY=y;//记录原点坐标
  var h=canvasSize.height/worldscale,w=canvasSize.width/worldscale;
  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;
  
  var bodyDef = new b2BodyDef;
  //创建一个刚体
  bodyDef.type = b2Body.b2_dynamicBody;

  var pw=0.12*canvasSize.width;//0.161
  var ph=0.0967*canvasSize.width;//0.1297
  fixDef.shape = new b2PolygonShape;
     fixDef.shape.SetAsBox(
           pw/(worldscale*2) //half width
        ,  ph/(worldscale*2) //half height
     );
  
  bodyDef.position.x = x;
  bodyDef.position.y = y;

  var aerolite;
  aerolite=this.world.CreateBody(bodyDef);
  aerolite.CreateFixture(fixDef);
  aerolite.SetUserData({
    type:"aero",
    pic:images.rock,
    pHeight:ph,//83
    pWidth:pw//103
  });
  bodyDef.position.x = x;
  bodyDef.position.y = y;
  if(type==1)
  {
  bodyDef.type = b2Body.b2_staticBody;
  fixDef.shape = new b2CircleShape(0.1);
  var anchor=this.world.CreateBody(bodyDef);
  anchor.CreateFixture(fixDef);
  var revoluteJointDef = new b2RevoluteJointDef();
  //设置最大角度和最小角度！并enableLimit，如果enableLimit为false则最大角度和最小角度没有意义
  revoluteJointDef.lowerAngle = -5.0; // -90 degrees
  revoluteJointDef.upperAngle = 2.5;// 45 degrees
  revoluteJointDef.enableLimit = false;//
  
  revoluteJointDef.maxMotorTorque = 2.0;//就当是力量的象征吧！
  revoluteJointDef.motorSpeed = 1.0;//速度你懂得！
  revoluteJointDef.enableMotor = true;
  revoluteJointDef.Initialize(aerolite, anchor, anchor.GetWorldCenter());//并以中间的ball的中心作为锚点
  
  this.revoluteJoint=this.world.CreateJoint(revoluteJointDef);
  }
  this.body=aerolite;
  this.direction=new b2Vec2(dx*this.body.GetMass(),-10*this.body.GetMass());//陨石的运动方向,垂直方向的力与重力抵消
}
Aero.prototype={
  constructor:Aero,
  run:function(){
    var c=this.body.GetWorldCenter();
    this.body.ApplyForce(this.direction,c);
    //this.showTips();
  },
  isOut:function(){
    var c=this.body.GetWorldCenter();
    if(c.x<-10||(c.x-10)*worldscale>canvasSize.width||c.y<0||c.y*worldscale>canvasSize.height) return true;
    //这里减5是因为生成位置是屏幕外的5米
    else return false;

  },
  isComing:function(){
    var c=this.body.GetWorldCenter();
    if(c.x>=-10&&c.x<0||c.x*worldscale>canvasSize.width&&(c.x-10)*worldscale<canvasSize.width) return true;
    else return false;
  },
  showTips:function(){
    //var tan=Math.abs(10/this.direction.x);
    //var dy=5*30*tan;
    var pos=this.body.GetPosition();
    var tx,ty;
    var xOffset;
    if(this.originX>0) {tx=canvasSize.width;xOffset=-10}
    else {tx=0;xOffset=10}
    //ty=this.originY*30+dy;
    ty=pos.y*worldscale;
    this.ctx.fillStyle="#fff";
    this.ctx.beginPath(); 
    this.ctx.moveTo(tx,ty); 
    this.ctx.lineTo(tx+xOffset,ty-xOffset); 
    this.ctx.lineTo(tx+xOffset,ty+xOffset); 
    this.ctx.closePath();
    this.ctx.fill();
  }//显示提示
}
function randomCreateAero(_world,_ctx)
{
  var w=canvasSize.width/worldscale;
  var h=canvasSize.height/worldscale;
  if(Math.random()>0.5) var x=w+10;
  else var x=-10;
  

  var y=Math.random()*h;
  var dx=Math.random()*20*(-x);
  var maxForce=0.003*canvasSize.width;
  var minForce=0.001*canvasSize.width;


  if(Math.abs(dx)>maxForce) {
    dx=dx/Math.abs(dx)*maxForce;
  }
  else if(Math.abs(dx)<minForce) {
    dx=dx/Math.abs(dx)*minForce;
  }//限制一下
  var a=new Aero(x,y,0,dx,_world,_ctx);
  return a;
}