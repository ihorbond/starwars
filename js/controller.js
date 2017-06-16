// $(document).ready(function (){
// console.log('controller online');
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var rebellionShip = new Image();
rebellionShip.src = './img/rebellion_ship.png';
var sithShip = new Image();
sithShip.src = './img/empire_ship.png';
var background = new Image();
background.src = './img/background.png';
var explosion2 = new Image();
explosion2.src = './img/explosion2.png';
var planet = new Image();
var ships = new Array(120);
var mainTheme = new Audio('./audio/maintheme.mp3');
var yoda = new Audio('./audio/yoda.mp3');
var veider = new Audio('./audio/veider.mp3');
var intro = document.getElementById('intro');
var playerSide;
var baseR = 100; //base radius
var score = 0;
var nextMoveX;
var nextMoveY;
var shieldHealth = 2;
var showCollision = false;
var showExplosion = false;
var currentShip; //global variable for current ship object used to determine where to draw explosion
mainTheme.volume = 0.5;
mainTheme.loop = true;
intro.volume = 0;
document.addEventListener("mousedown", destroyShip);
document.addEventListener("touchstart", destroyShip);
document.getElementById('score').innerHTML = score;

function ShipBuilder(shipType) {
  this.shipImage = shipType;
  this.radius = 50; //length of one side since ship's pic size is 50px x 50px
  this.x = this.radius / 2;
  this.y = Math.floor((Math.random() * canvas.height - this.radius / 2) + this.radius / 2);
  this.dx = Math.floor((Math.random() * 8) + 4);
  this.dy = Math.floor((Math.random() * 8) + 4);
  this.edgeDetection = function() {
    if (this.y + this.dy + 1.5 * this.radius > canvas.height || this.y + this.dy - this.radius / 2 < 0) {
      this.dy = -this.dy;
    } else if (this.x + this.dx + 1.5 * this.radius > canvas.width || this.x + this.dx - this.radius / 2 < 0) {
      this.dx = -this.dx;
    }
  };
  this.checkCollision = function(index, oneShip) {
    // d = distance from ship to base
    var d = Math.sqrt(Math.pow((this.x + this.dx + this.radius / 2 - canvas.width / 2), 2) + Math.pow((this.y + this.dy + this.radius / 2 - canvas.height / 2), 2));
    if (d < baseR * 1.5) {
      showCollision = true;
      shieldHealth -= 0.25;
      ships.splice(index, 1);
    }
  };
}

function fillShipsArrayAndBaseSetup() {
  var i = 0;
  var intervalId = setInterval(function() {
    if (i < ships.length) {
      if (playerSide === 'rebellion') {
        planet.src = '../starwars/img/rebellion_base.png';
        ships[i] = new ShipBuilder(sithShip);
      } else {
        planet.src = '../starwars/img/death_star.png';
        ships[i] = new ShipBuilder(rebellionShip);
      }
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}

function destroyShip(e) { //both mouse and touch event handler
  var rect = e.target.getBoundingClientRect(); //tie mouse coordinates to canvas
  var x = e.pageX - rect.left;
  var y = e.pageY - rect.top;
  ships.forEach(function(ship, index) {
    var d = Math.sqrt(Math.pow((ship.x + ship.dx + ship.radius / 2 - x), 2) + Math.pow((ship.y + ship.dy + ship.radius / 2 - y), 2));
    if (d < ship.radius * 1.5) {
      currentShip = ship;
      ships.splice(index, 1);
      showExplosion = true;
      score += 300;
      document.getElementById('score').innerHTML = score;
    }
  });
}

function draw(timer) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(planet, 500, 300);
  ctx.beginPath();
  //painting base shield
  ctx.arc(600, 400, baseR + 2, 0, shieldHealth * Math.PI);
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
    //painting circles around ships
    ctx.beginPath();
    ctx.arc(nextMoveX + oneShip.radius / 2, nextMoveY + oneShip.radius / 2, oneShip.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
    oneShip.edgeDetection();
    oneShip.checkCollision(index, oneShip);
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
  var countdown = -(Math.floor(timer / 1000) - 62); //62 not 60 because of a 2 sec delay in fillArray function
  console.log(timer);
  document.getElementById('timer').innerHTML = countdown;
  if (countdown === 0 || ships.length === 0 || shieldHealth < 0) {
    gameOver(); //this function is described in view.js file
  } else {
    requestAnimationFrame(draw);
  }
}
