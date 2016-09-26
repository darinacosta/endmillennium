define(['components/text-section/textSectionHelperSvc',
        'components/audio/audioHelperSvc'], menuHelperSvc);

function menuHelperSvc(textSectionHelperSvc, audioHelperSvc){
  var menuHelperSvc = {};

  function launchIntoFullscreen(element) {
    if (!element.fullscreenElement &&
        !element.msFullscreenElement &&
        !element.mozFullScreenElement &&
        !element.webkitFullscreenElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
  }

  menuHelperSvc.prependMenu = function(){
    $('html').prepend('<div class="gameplay-menu">' +
    '<form action=""><input type="checkbox" id="fullscreen"> fullscreen ' +
    '<input type="checkbox" id="staticSelect" checked> static ' +
    '<input type="checkbox" id="musicSelect" checked> music ' +
    '<input type="checkbox" id="soundfxSelect" checked> soundfx</form>' +
    '</div>');
    $('.gameplay-menu').on('click', function(){

      if (document.getElementById('fullscreen').checked){
        if (!document.fullscreenElement) {
          var html = document.getElementById("game")
          launchIntoFullscreen(html)
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }

      if (!document.getElementById('staticSelect').checked){
        textSectionHelperSvc.removeStatic();
      } else {
        textSectionHelperSvc.addStatic();
      }

      if (!document.getElementById('soundfxSelect').checked){
        audioHelperSvc.muteSoundFx();
      } else {
        audioHelperSvc.unmuteSoundFx();
      }

      if (!document.getElementById('musicSelect').checked){
        audioHelperSvc.muteMusic();
      } else {
        audioHelperSvc.unmuteMusic();
      }
    });
  };

  return menuHelperSvc;
}
