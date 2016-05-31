define(['services/audioSvc'], audioCtrl);

function audioCtrl(audioSvc){
  var audioCtrl = {};
  var tracks = audioSvc.tracks;


  audioCtrl.init = function(){
    _buildHtmlAudioElements();
    _applyAudioVolume();
    _applyAudioHtmlTriggers();
  };

  function _buildHtmlAudioElements(){
    var $audioPreloadElement = $('#audio-preload');
    var audioPreloadHtml = '';

    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        var loop = tracks[track].loop ? " loop>" : " >";
        audioPreloadHtml += '<audio id="' + tracks[track].name + '"' + loop +
          '<source src="assets/audio/' + tracks[track].name + '.ogg"></source>' +
          '<source src="assets/audio/' + tracks[track].name + '.mp3"></source>' +
        '</audio>';
      }
    }

    $audioPreloadElement.html(audioPreloadHtml);
  }

  function _applyAudioVolume(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        tracks[track]['audio'] = document.getElementById(tracks[track].name);
        tracks[track].audio.volume = tracks[track].volume;
      }
    }
  }

  function _applyAudioHtmlTriggers(){
    $(document).ready(function(){

      tracks.gulfnight.audio.play();

      //Play intro
      $("html").on('click', function(event){
        if ($(event.target).hasClass('replay')){
          location.reload();
        }
        if ($(event.target).is('tw-link') && tracks.intro.played < 1){
          tracks.intro.played += 1;
          tracks.intro.audio.play();
        }
      });

      //Play crackle
      $("html").on("mouseover", "div", function() {
        tracks.crackle.audio.play();
        $("html").on('click', function(){
          setTimeout(function(){
            if ($('div:hover').length === 0) {
              tracks.crackle.audio.pause();
            }
          }, 200);
        });
      });

      //Pause crackle
      $("html").on("mouseout", "div", function() {
        crackle.pause();
      });
    });
  }

  return audioCtrl;
}
