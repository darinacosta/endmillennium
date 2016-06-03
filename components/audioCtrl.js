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

  function _returnBackgroundTheme(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (tracks[track]['background']){
          return tracks[track].name;
        }
      }
    }
  }

  function _returnClickTracks(){
    var clickTracks = [];
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (tracks[track].name.substring(0, 5) == "click"){
          clickTracks.push(tracks[track].name);
        }
      }
    }
    return clickTracks;
  }

  function _applyAudioHtmlTriggers(){
    $(document).ready(function(){

      //Play background theme
      var background = _returnBackgroundTheme();
      tracks[background].audio.play();

      $("html").on('click', function(event){

        //Replay from demo screen
        if ($(event.target).hasClass('replay')){
          location.reload();
        }

        //Play click
        if ($(event.target).is('tw-link:not(.visited)') && tracks.intro.played === 1){
          var clickTracks = _returnClickTracks();
          var i = Math.floor(Math.random() * clickTracks.length);
          var clickTrack = clickTracks[i];
          tracks[clickTrack].audio.play();
        }

        //Play unclick
        if ($(event.target).is('.visited')){
          tracks.unclick1.audio.play();
        }

        if ($(event.target).is('.undo')){
          tracks.unclick1.audio.play();
        }

        //Play intro
        if ($(event.target).is('[passage-name="The highway"]') && tracks.intro.played < 1){
          tracks.intro.played += 1;
          tracks.intro.audio.play();
        }

        //Play save
        if ($(event.target).is('.save:not(.clicked)')) {
          $(event.target).addClass('clicked');
          tracks.save.audio.play();
        }

        //Play load
        if ($(event.target).is('.load')) {
          if (endmillennium.saveData){
            tracks.intro.played += 1;
            tracks.intro.audio.play();
          }
        }

      });

      //Play crackle
//      $("html").on("mouseover", "div", function() {
//        tracks.crackle.audio.play().then(function(){}, function(e){
//          //prevent promise error from being logged
//        });
//      });

      //Pause crackle
//      $("html").on("mouseout", "div", function() {
//        tracks.crackle.audio.pause();
//      });
    });
  }

  return audioCtrl;
}
