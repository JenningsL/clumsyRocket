//创建一个崎岖不平的地面
function createLandingGround()
{
  var h=canvasSize.height/worldscale,w=canvasSize.width/worldscale;
  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;
  
  var bodyDef = new b2BodyDef;
  
  //create ground
  bodyDef.type = b2Body.b2_staticBody;
  //bodyDef.position.Set(w/2,h/2); 
  // Define the shape of ground.  
  var vertices = [];  

  var lastY=-Math.random();;
   for(var x=0;x<w;x++)
   {
    bodyDef.position.Set(x+0.5,h); 
    var nowY=-Math.random();
    vertices = [];
    vertices.push(new b2Vec2(-0.5,lastY));
    vertices.push(new b2Vec2(0.5,nowY));
    vertices.push(new b2Vec2(0.5,0));
    vertices.push(new b2Vec2(-0.5,0)); 
    lastY=nowY;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsArray(vertices,vertices.length);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
   }




}
//发射地面的构造函数
function LauchGnd(world,_ctx){
  this.world=world;
  this.ctx=_ctx;
  var h=canvasSize.height/worldscale,w=canvasSize.width/worldscale;
  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;
  
  var bodyDef = new b2BodyDef;
  
  //create ground
  bodyDef.type = b2Body.b2_staticBody;
  //bodyDef.position.Set(w/2,h/2); 
  // Define the shape of ground.  


  bodyDef.position.Set(w/2,4.94*h); 

  fixDef.shape = new b2CircleShape(4*h) ;
  
  this.body=this.world.CreateBody(bodyDef);
  this.fixture=this.body.CreateFixture(fixDef);
  this.body.SetUserData({
     type:"ground"
  });
  this.center={
    "x":canvasSize.width*0.5,
    "y":canvasSize.height*4.94
  };

  this.r=h*4*worldscale;
  this.ellipseInfo=[];//存储椭圆信息
  this.ellipseInfo.push({x:0.26*canvasSize.width,y:0.962*canvasSize.height,a:0.01*canvasSize.width,b:0.005*canvasSize.width});
  this.ellipseInfo.push({x:0.41*canvasSize.width,y:0.99*canvasSize.height,a:0.02*canvasSize.width,b:0.008*canvasSize.width});
  this.ellipseInfo.push({x:0.88*canvasSize.width,y:0.97*canvasSize.height,a:0.04*canvasSize.width,b:0.011*canvasSize.width});

  this.draw=function(){
    if(this.body==null) return;
    this.ctx.beginPath();
    //this.ctx.fillStyle="#aa58b3";//紫色
    this.ctx.fillStyle="#32b6e7";//蓝色
    this.ctx.arc(this.center.x,this.center.y,this.r,0,Math.PI*2);
    this.ctx.closePath();
    this.ctx.fill();
    for(var i=0;i<this.ellipseInfo.length;i++){
      EvenCompEllipse(this.ctx,this.ellipseInfo[i].x,this.ellipseInfo[i].y,this.ellipseInfo[i].a,this.ellipseInfo[i].b );
    }
    
  };
  this.follow=function(py){
    this.center.y-=py;
    for(var i=0;i<this.ellipseInfo.length;i++){
      this.ellipseInfo[i].y-=py;
    }
    
  }
}
//------------均匀压缩法绘制椭圆--------------------
//其方法是用arc方法绘制圆，结合scale进行
//横轴或纵轴方向缩放（均匀压缩）
//这种方法绘制的椭圆的边离长轴端越近越粗，长轴端点的线宽是正常值
//边离短轴越近、椭圆越扁越细，甚至产生间断，这是scale导致的结果
//这种缺点某些时候是优点，比如在表现环的立体效果（行星光环）时
//对于参数a或b为0的情况，这种方法不适用
function EvenCompEllipse(context, x, y, a, b)
{
   context.save();
   //context.fillStyle="#65136e";//深紫色
   context.fillStyle="#1d6b88";//深蓝色
   //选择a、b中的较大者作为arc方法的半径参数
   var r = (a > b) ? a : b; 
   var ratioX = a / r; //横轴缩放比率
   var ratioY = b / r; //纵轴缩放比率
   context.scale(ratioX, ratioY); //进行缩放（均匀压缩）
   context.beginPath();
   //从椭圆的左端点开始逆时针绘制
   context.moveTo((x + a) / ratioX, y / ratioY);
   context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
   context.closePath();
   context.fill();
   context.restore();
}
//创建围墙
function createwall(v1,v2,center)
{
  var fixDef = new b2FixtureDef;
  fixDef.density = 1.0;
  fixDef.friction = 0.5;
  fixDef.restitution = 0.2;
  //body definition
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.Set(center.x,center.y); 
  // Define the shape of ground.  

  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsEdge(v1,v2);
  world.CreateBody(bodyDef).CreateFixture(fixDef);
   

}