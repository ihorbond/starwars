// $(document).ready(function() {
// console.log('view online');
window.onload = function() {
  mainTheme.play();
  $('#myCanvas').hide();
  $('.header').hide();
  $('.jumbotron').hide();
  $('.instructions').hide();
  $('.about').hide();
  $('.game-over').hide();
};
var isGameOn = false;
var musicVolumeOn = false;

function gameOver() {
  $('#myCanvas').show();
  $('.jumbotron').hide();
  $('.instructions').hide();
  $('.about').hide();
  $('.game-over').hide();
  $('#disclaimer').hide();
  $('.game-over').hide();
  $('#final-score').html(score);
  $('#highest-score').html(ships.length * 200);
  if (playerSide === 'rebellion' && shieldHealth > 0 || playerSide === 'sith' && shieldHealth < 0) {
    console.log('Empire won this battle!');
  }
  else {
    console.log('Alliance won this battle!');
  }
}

function launch() {
  $('.header').show();
  $('#myCanvas').show();
  $('#disclaimer').hide();
  $('.jumbotron').hide();
  $('.instructions').hide();
  $('about').hide();
  fillShipsArrayAndBaseSetup();
  // var animation = requestAnimationFrame(draw);
}
document.getElementById('new-game').onclick = function() {
  if (!isGameOn) {
    isGameOn = true;
    $('.jumbotron').show();
    $('.game-over').hide();
    $('#disclaimer').hide();
    $('.instructions').hide();
    $('.header').hide();
    $('#myCanvas').hide();
    $('.about').hide();

  } else {
    location.reload();
    score = 0;
  }
};
document.getElementById('sith-selected').onclick = function() {
  playerSide = 'sith';
  launch();
};
document.getElementById('sith-selected').onmouseover = function() {
  veider.play();
};
document.getElementById('rebellion-selected').onclick = function() {
  playerSide = 'rebellion';
  launch();
};
document.getElementById('rebellion-selected').onmouseover = function() {
  yoda.play();
};
document.getElementById('mute').onclick = function() {
  if (!musicVolumeOn) {
    musicVolumeOn = true;
    mainTheme.volume = 0;
  } else {
    musicVolumeOn = false;
    mainTheme.volume = 0.3;
  }
};
document.getElementById('instructions').onclick = function() {
  $('.instructions').show();
  $('#disclaimer').hide();
  $('.jumbotron').hide();
  $('.header').hide();
  $('#myCanvas').hide();
  $('.about').hide();
};
document.getElementById('about').onclick = function() {
  $('.about').show();
  $('#disclaimer').hide();
  $('.jumbotron').hide();
  $('.instructions').hide();
  $('.header').hide();
  $('#myCanvas').hide();
};

// });
