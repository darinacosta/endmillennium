define(['components/audio/audioHelperSvc',
        'components/audio/soundtrackSvc'], audioEventSvc);

function audioEventSvc(audioHelperSvc, soundtrackSvc) {
  var audioEventSvc = {};
  var tracks = soundtrackSvc.tracks;

  audioEventSvc.applyAudioHtmlTriggers = function(){
    $(document).ready(function(){

      //Play background theme
      var background = audioHelperSvc.returnBackgroundTheme();
      tracks[background].audio.play();

      $("html").on('click', function(event){

        //Replay from demo screen
        if ($(event.target).hasClass('replay')){
          location.reload();
        }

        //Play click
        if ($(event.target).is('tw-link:not(.visited)') && tracks.intro.played === 1){
          var clickTracks = audioHelperSvc.returnClickTracks();
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
  };

  return audioEventSvc;
}
