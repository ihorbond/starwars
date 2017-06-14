// $(document).ready(function (){
// console.log('controller online');
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var rebellionShip = new Image();
rebellionShip.src = './img/rebellion_ship.png';
var sithShip = new Image();
sithShip.src = './img/empire_ship.png';
var background = new Image();
background.src = '../starwars/img/background.png';
var explosion2 = new Image();
explosion2.src = './img/explosion2.png';
var planet = new Image();
var ships = new Array(200);
var mainTheme = new Audio('./audio/maintheme.mp3');
var yoda = new Audio('./audio/yoda.mp3');
var veider = new Audio('./audio/veider.mp3');
var playerSide;
var baseR = 100;
var score = 0;
var time = 0;
var nextMoveX;
var nextMoveY;
var shieldHealth = 2;
var showCollision = false;
var showExplosion = false;
var currentShip; //global variable for current ship object
mainTheme.volume = 0.3;
mainTheme.loop = true;
document.addEventListener("mousedown", mouseHandler);
document.addEventListener("touchstart", touchHandlerStart);
document.getElementById('score').innerHTML = score;

function ShipBuilder(shipType) {
  this.shipImage = shipType;
  this.radius = 50;
  this.x = 1;
  this.y = Math.floor((Math.random() * 799) + 1);
  this.dx = Math.floor((Math.random() * 8) + 2);
  this.dy = Math.floor((Math.random() * 8) + 2);
  this.edgeDetection = function() {
    if (this.y + this.dy + this.radius + this.radius / 2 > canvas.height || this.y + this.dy < 0) {
      this.dy = -this.dy;
    } else if (this.x + this.dx + this.radius + this.radius / 2 > canvas.width || this.x + this.dx < 0) {
      this.dx = -this.dx;
    }
  };
  this.checkCollision = function(index, oneShip) {
    // d = distance from ship's center to the center of canvas aka base
    var d = Math.sqrt(Math.pow((this.x + this.radius - canvas.width / 2), 2) + Math.pow((this.y + this.radius - canvas.height / 2), 2));
    if (d < baseR + this.radius/2 ) {
      //shield health will depend on the total amount of ships on canvas
      showCollision = true;
      score -= 100;
      shieldHealth = 2 - 2 / ships.length;
      ships.splice(index, 1);
      document.getElementById('score').innerHTML = score;
    }
  };
}

function fillShipsArrayAndBaseSetup() {
  var i = 0;
  var intervalId = setInterval(function () {
    if ( i < ships.length) {
      if (playerSide === 'rebellion') {
        planet.src = '../starwars/img/death_star.png';
        ships[i] = new ShipBuilder(rebellionShip);
      } else {
        planet.src = '../starwars/img/rebellion_base.png';
        ships[i] = new ShipBuilder(sithShip);
      }
      i++;
    }
    else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function mouseHandler(e) {
destroyShip(e);
}

function touchHandlerStart(e) {
  destroyShip(e);
}

function destroyShip(e) {
  var rect = e.target.getBoundingClientRect(); //tie mouse coordinates to canvas
  var x = e.pageX - rect.left;
  var y = e.pageY - rect.top;
  ships.forEach(function (ship, index) {
  var d = Math.sqrt(Math.pow((ship.x + ship.radius - x), 2) + Math.pow((ship.y + ship.radius - y), 2));
  if (d < ship.radius) {
    currentShip = ship;
    showExplosion = true;
    score += 300;
    document.getElementById('score').innerHTML = score;
    ships.splice(index, 1);
  }
  });
}

var animation = requestAnimationFrame(draw);
function draw(timer) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(planet, 500, 300);
  ctx.beginPath();
  //painting base shield
  ctx.arc(600, 400, baseR+3, 0, shieldHealth * Math.PI);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 5;
  ctx.stroke();
  //painting ships taken from ships array
  ships.forEach(function(oneShip, index) {
    ctx.drawImage(oneShip.shipImage, oneShip.x, oneShip.y);
    nextMoveX = oneShip.dx + oneShip.x;
    nextMoveY = oneShip.dy + oneShip.y;
    oneShip.x += oneShip.dx;
    oneShip.y += oneShip.dy;
    oneShip.edgeDetection();
    oneShip.checkCollision(index, oneShip);
    //painting circles around ships
    ctx.beginPath();
    ctx.arc(nextMoveX + oneShip.radius / 2, nextMoveY + oneShip.radius / 2, oneShip.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
    setTimeout(function() {
    }, 2000);
  });
  if (showCollision) {
    setTimeout(function() {
      showCollision = false;
    }, 100);
    ctx.beginPath();
    ctx.arc(600, 400, baseR + 1, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  if (showExplosion) {
    setTimeout(function() {
      showExplosion = false;
    }, 100);
    ctx.drawImage(explosion2, currentShip.x, currentShip.y);
  }
  //implementing countdown timer
  var countdown = -(Math.floor(timer / 1000) - 60);
  document.getElementById('timer').innerHTML = countdown;
  if (countdown === 0 || ships.length === 0 || shieldHealth < 0) {
    console.log('game over');
    gameOver();
    cancelAnimationFrame(animation);
  } else {
    requestAnimationFrame(draw);
  }
}
