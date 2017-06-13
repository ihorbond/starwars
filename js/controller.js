// $(document).ready(function (){
  console.log('controller online');

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var baseR = 100;
var score = 0;
var baseStatus = 'unshielded';
var round = 1;
var playerSide = 'sith';
var rebellionShip = new Image();
rebellionShip.src = './img/alliance_ship_resized.png';
var sithShip = new Image();
sithShip.src = './img/sith_ship_resized.png';
var planet = new Image();
var background = new Image();
var ships = [new ShipBuilder(rebellionShip, 0), new ShipBuilder(sithShip, 1), new ShipBuilder(rebellionShip, 2), new ShipBuilder(sithShip, 3)];
var time = 0;
background.src = '../starwars/img/background.png';
var mainTheme = new Audio('./audio/maintheme.mp3');
var yoda = new Audio('./audio/yoda.mp3');
var veider = new Audio('./audio/veider.mp3');
mainTheme.volume = 0.3;
mainTheme.loop = true;
document.addEventListener("click", mouseHandler);
document.addEventListener("touchstart", touchHandlerStart);
document.addEventListener("touchend", touchHandlerEnd);
document.getElementById('score').innerHTML = score;



function ShipBuilder(shipType, index) {
  this.shipImage = shipType;
  this.index = index;
  this.radius = 50;
  this.x = 0;
  this.y = Math.floor((Math.random() * 800));
  this.dx = Math.floor((Math.random() * 5) + 1);
  this.dy = Math.floor((Math.random() * 5) + 1);
  this.edgeDetection = function() {
   if (this.y + this.dy + this.radius > canvas.height || this.y + this.dy < 0) {
      // console.log('bottom or top edge detected');
     this.dy = -this.dy;
  }
    else if (this.x + this.dx + this.radius > canvas.width || this.x + this.dx < 0){
      // console.log('left or right edge detected');
     this.dx = -this.dx;
   }
 };
 this.checkCollision = function () {
   var d = Math.sqrt(Math.pow((this.x - canvas.width / 2), 2) + Math.pow((this.y - canvas.height / 2), 2));
   if (d < baseR) {
     console.log('collision detected');
     ships.splice(index,1);
     score += 200;
     document.getElementById('score').innerHTML = score;
   }
 };
}

function baseSelector() {
  if (playerSide === 'rebellion') {
    planet.src = '../starwars/img/earth.png';
  } else {
    planet.src = '../starwars/img/death_star.png';
  }
  return planet;
}

function mouseHandler(e) {
  var relativeX = e.clientX;
  var relativeY = e.clientY;
  if (relativeX > 450 - baseR && relativeY > 300 - baseR && baseStatus === 'unshielded' || relativeX > 450 + baseR && relativeY > 300 + baseR && baseStatus === 'unshielded') {
    console.log('base shielded');
    baseStatus = 'shielded';
  } else {
    console.log('base unshielded');
    baseStatus = 'unshielded';
  }
}

function touchHandlerStart(e) {
  var relativeX = e.clientX;
  var relativeY = e.clientY;
  if (relativeX > 450 - baseR && relativeY > 300 - baseR && baseStatus === 'unshielded' || relativeX > 450 + baseR && relativeY > 300 + baseR && baseStatus === 'unshielded') {
    console.log('base shielded');
    baseStatus = 'shielded';
  }
}

function touchHandlerEnd(e) {
  var relativeX = e.clientX;
  var relativeY = e.clientY;
  if (relativeX > 450 - baseR && relativeY > 300 - baseR && baseStatus === 'unshielded' || relativeX > 450 + baseR && relativeY > 300 + baseR && baseStatus === 'unshielded') {
    console.log('base unshielded');
    baseStatus = 'unshielded';
  }
}



  // if (d < baseR && baseStatus === 'sheilded' && playerSide === 'rebellion' && ship === 'rebellion') {
  //   console.log("lost rebellion ship!");
  //   score -= 200;
  //   clearInterval(intervalID);
  // } else if (d < baseR && baseStatus === 'unshielded' && playerSide === 'rebellion' && ship === 'rebellion') {
  //   console.log("rebellion ship made it home!");
  //   score += 200;
  //   clearInterval(intervalID);
  // } else if (d < baseR && baseStatus === 'shieded' && playerSide === 'rebellion' && ship === 'sith') {
  //   console.log("destroyed sith ship!");
  //   score += 200;
  //   clearInterval(intervalID);
  // } else if (d < baseR && baseStatus === 'unshilded' && playerSide === 'rebellion' && ship === 'sith') {
  //   console.log("sith ship got thru!");
  //   score -= 200;
  //   clearInterval(intervalID);
  // }
  //

function draw(timer) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(baseSelector(), 500, 300);
  ships.forEach(function (oneShip, index) {
    ctx.drawImage(oneShip.shipImage, oneShip.x, oneShip.y);
    oneShip.x += oneShip.dx;
    oneShip.y += oneShip.dy;
    oneShip.edgeDetection();
    oneShip.checkCollision();
  });
  var countdown = Math.floor(timer/1000);
  document.getElementById('timer').innerHTML = countdown;
if (timer > 600000) {
console.log('game over');
}
else {
requestAnimationFrame(draw);
}
// console.log(timestamp);
}
draw();
// document.getElementById('')
// });
