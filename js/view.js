// $(document).ready(function() {
console.log('view online');
  window.onload = function () {
    mainTheme.play();
    $('#myCanvas').hide();
    $('.header').hide();
    $('.jumbotron').hide();
    $('.instructions').hide();
    $('.about').hide();
  };
  var isGameOn = false;
  var musicVolumeOn = false;

  function launch() {
    $('#disclaimer').hide();
    $('.jumbotron').hide();
    $('.instructions').hide();
    $('about').hide();
    $('.header').show();
    $('#myCanvas').show();
    requestAnimationFrame(draw);
  }
  document.getElementById('new-game').onclick = function() {
    if (!isGameOn) {
      isGameOn = true;
      $('#disclaimer').hide();
      $('.jumbotron').show();
      $('.instructions').hide();
      $('.header').hide();
      $('#myCanvas').hide();
      $('.about').hide();
    } else {
      location.reload();
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
  document.getElementById('mute').onclick = function () {
    if (!musicVolumeOn) {
      musicVolumeOn = true;
      mainTheme.volume = 0;
    }
    else {
      musicVolumeOn = false;
    mainTheme.volume = 0.3;
  }
    };
    document.getElementById('instructions').onclick = function() {
      $('#disclaimer').hide();
      $('.jumbotron').hide();
      $('.instructions').show();
      $('.header').hide();
      $('#myCanvas').hide();
      $('.about').hide();
    };
document.getElementById('about').onclick = function() {
  $('#disclaimer').hide();
  $('.jumbotron').hide();
  $('.instructions').hide();
  $('.header').hide();
  $('#myCanvas').hide();
  $('.about').show();
};



// });
