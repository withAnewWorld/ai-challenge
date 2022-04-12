var canvas = document.getElementById('canvas');
var ctx =canvas.getContext('2d');

canvas.width = window.innerWidth -100;
canvas.height = window.innerHeight -100;

var dino ={
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

dino.draw();

class Cactus{
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// var cactus = new Cactus();
// cactus.draw();

var timer = 0;
var cactuses = [];
var jumpTimer = 0;
var anim;
function animation(){
  anim=requestAnimationFrame(animation);
  timer ++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (timer % 90 === 0) {
    var cactus = new Cactus();
    cactuses.push(cactus);
  }
  cactuses.forEach((cactus, i, o)=>{
    if(cactus.x < 0){
      o.splice(i, 1);
    }

    isCollide(dino, cactus);

    cactus.x--;
    cactus.draw();
  })

  if(jump==true){
    dino.y-=3;
    jumpTimer ++;
  }
  if(jump==false){
    if(dino.y <200){
      dino.y+=3;
    }

  }
  if (jumpTimer > 60){
    jump = false;
    jumpTimer = 0;
  }
  dino.draw();
}

animation();

function isCollide(dino, cactus){
  var diffX= cactus.x-(dino.x+dino.width);
  var diffY= cactus.y-(dino.y+dino.height);
  if (diffX<0 && diffY<0){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(anim);
  }
}

var jump = false;
document.addEventListener('keydown', function(e){
  if(e.code ==='Space'){
    jump = true;
  }
})

