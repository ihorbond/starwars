// $(document).ready(function() {
// console.log('view online');
var isGameOn = false;
var musicVolumeOn = false;
var animation;
var delay = 0;
var pageStartTime = 0;
window.onload = function() {
  setTimeout(function() {
    mainTheme.play();
  }, 4000);
  pageStartTime = Date.now();
};

function gameOver() {
  cancelAnimationFrame(animation);
  $('.game-over').removeClass('hidden');
  $('#myCanvas').addClass('hidden');
  $('.header').addClass('hidden');
  $('.pick-side').addClass('hidden');
  $('.instructions').addClass('hidden');
  $('.about').addClass('hidden');
  $('#final-score').html(score);
  if (playerSide === 'rebellion' && shieldHealth >= 0 || playerSide === 'sith' && shieldHealth < 0) {
    $('.game-over').append('<h1 style=\"color:green\">Alliance won this battle!</h1>');
    $('.game-over').append('<img height=\"300px\" src=\"./img/rebellion_win.gif\">');
  } else {
    $('.game-over').append('<h1 style=\"color:red\">Empire won this battle!</h1>');
    $('.game-over').append('<img height=\"300px\" src=\"./img/empire_win.gif\">');
  }
}

function launch() {
  $('.header').removeClass('hidden');
  $('#myCanvas').removeClass('hidden');
  $('.pick-side').addClass('hidden');
  $('.instructions').addClass('hidden');
  $('about').addClass('hidden');
  fillShipsArrayAndBaseSetup();
  animation = requestAnimationFrame(draw);
  delay = Date.now() - pageStartTime;
}
document.getElementById('new-game').onclick = function() {
  if (!isGameOn) {
    isGameOn = true;
    $('.pick-side').removeClass('hidden');
    $('.game-over').addClass('hidden');
    $('#crawltext').addClass('hidden');
    $('.instructions').addClass('hidden');
    $('.header').addClass('hidden');
    $('#myCanvas').addClass('hidden');
    $('.about').addClass('hidden');
  } else {
    location.reload();
    score = 0;
  }
};
document.getElementById('veider').onclick = function() {
  playerSide = 'sith';
  launch();
};
document.getElementById('veider').onmouseover = function() {
  veider.play();
  $('.pick-side').css('color', 'red');
};
document.getElementById('yoda').onclick = function() {
  playerSide = 'rebellion';
  launch();
};
document.getElementById('yoda').onmouseover = function() {
  yoda.play();
  $('.pick-side').css('color', 'green');
};
document.getElementById('mute').onclick = function() {
  if (!musicVolumeOn) {
    musicVolumeOn = true;
    mainTheme.volume = 0;
  } else {
    musicVolumeOn = false;
    mainTheme.volume = 0.5;
  }
};
document.getElementById('instructions').onclick = function() {
  $('.instructions').removeClass('hidden');
  $('#crawltext').addClass('hidden');
  $('.pick-side').addClass('hidden');
  $('.header').addClass('hidden');
  $('#myCanvas').addClass('hidden');
  $('.about').addClass('hidden');
  $('.game-over').addClass('hidden');
  cancelAnimationFrame(animation);
};
document.getElementById('about').onclick = function() {
  $('.about').removeClass('hidden');
  $('#crawltext').addClass('hidden');
  $('.pick-side').addClass('hidden');
  $('.instructions').addClass('hidden');
  $('.header').addClass('hidden');
  $('#myCanvas').addClass('hidden');
  $('.game-over').addClass('hidden');
  cancelAnimationFrame(animation);
};
// });
