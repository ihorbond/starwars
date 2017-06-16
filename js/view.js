// $(document).ready(function() {
// console.log('view online');
var isGameOn = false;
var musicVolumeOn = false;
var animation;
window.onload = function() {
  $('#myCanvas').hide();
  $('.header').hide();
  $('.pick-side').hide();
  $('.instructions').hide();
  $('.about').hide();
  $('.game-over').hide();
  intro.play();
  setTimeout(function(){
    mainTheme.play();
  },4400);
};

function removeVideo(){
  $('#intro').fadeOut(3000);
  // $('#intro').remove();
}

function gameOver() {
  cancelAnimationFrame(animation);
  $('.game-over').show();
  $('#myCanvas').hide();
  $('.header').hide();
  $('.pick-side').hide();
  $('.instructions').hide();
  $('.about').hide();
  $('#disclaimer').hide();
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
  $('.header').show();
  $('#myCanvas').show();
  $('#disclaimer').hide();
  $('.pick-side').hide();
  $('.instructions').hide();
  $('about').hide();
  fillShipsArrayAndBaseSetup();
  animation = requestAnimationFrame(draw);
  // animation = requestAnimationFrame(draw); //starts drawing
}
document.getElementById('new-game').onclick = function() {
  if (!isGameOn) {
    isGameOn = true;
    $('.pick-side').show();
    $('.game-over').hide();
    $('#disclaimer').hide();
    $('.instructions').hide();
    $('.header').hide();
    $('#myCanvas').hide();
    $('.about').hide();
    intro.pause();
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
  $('.pick-side').css('color', 'red');
};
document.getElementById('rebellion-selected').onclick = function() {
  playerSide = 'rebellion';
  launch();
};
document.getElementById('rebellion-selected').onmouseover = function() {
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
  $('.instructions').show();
  $('#disclaimer').hide();
  $('.pick-side').hide();
  $('.header').hide();
  $('#myCanvas').hide();
  $('.about').hide();
  $('.game-over').hide();
  intro.pause();
  cancelAnimationFrame(animation);
};
document.getElementById('about').onclick = function() {
  $('.about').show();
  $('#disclaimer').hide();
  $('.pick-side').hide();
  $('.instructions').hide();
  $('.header').hide();
  $('#myCanvas').hide();
  $('.game-over').hide();
  intro.pause();
  cancelAnimationFrame(animation);
};
// });
