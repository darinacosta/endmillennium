define(['components/audio/soundtrackSvc'], audioHelperSvc);

function audioHelperSvc(soundtrackSvc) {
  var audioHelperSvc = {};
  var tracks = soundtrackSvc.tracks;

  audioHelperSvc.applyAudioVolume = function(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        tracks[track]['audio'] = document.getElementById(tracks[track].name);
        tracks[track].audio.volume = tracks[track].volume;
      }
    }
  };

  audioHelperSvc.buildHtmlAudioElements = function(){
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
  };

  audioHelperSvc.muteBackgroundMusic = function(){
    //TODO
  };

  audioHelperSvc.muteSoundFx = function(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (!tracks[track]['background']){
          tracks[track]['audio'] = document.getElementById(tracks[track].name);
          tracks[track].audio.volume = 0;
        }
      }
    }
  };

  audioHelperSvc.unmuteSoundFx = function(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (!tracks[track]['background']){
          tracks[track]['audio'] = document.getElementById(tracks[track].name);
          tracks[track].audio.volume =  tracks[track].volume;
        }
      }
    }
  };

  audioHelperSvc.muteMusic = function(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (tracks[track]['background']){
          tracks[track]['audio'] = document.getElementById(tracks[track].name);
          tracks[track].audio.volume = 0;
        }
      }
    }
  };

  audioHelperSvc.unmuteMusic = function(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (tracks[track]['background']){
          tracks[track]['audio'] = document.getElementById(tracks[track].name);
          tracks[track].audio.volume =  tracks[track].volume;
        }
      }
    }
  };

  audioHelperSvc.returnBackgroundTheme = function(){
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (tracks[track]['background']){
          return tracks[track].name;
        }
      }
    }
  };

  audioHelperSvc.returnClickTracks = function(){
    var clickTracks = [];
    for (var track in tracks) {
      if (tracks.hasOwnProperty(track)) {
        if (tracks[track].name.substring(0, 5) == "click"){
          clickTracks.push(tracks[track].name);
        }
      }
    }
    return clickTracks;
  };

  return audioHelperSvc;
}
