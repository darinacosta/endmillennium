define(['components/audio/audioHelperSvc',
        'components/audio/soundtrackSvc',
        'components/transitions/transitionSvc'], audioEventSvc);

function audioEventSvc(audioHelperSvc, soundtrackSvc, transitionSvc) {
  var audioEventSvc = {};
  var tracks = soundtrackSvc.tracks;
  var chapters = transitionSvc.chapters;

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

        for (chapter in chapters){
          if ($(event.target).is('[passage-name="' + chapters[chapter].passage_name + '"]') && !chapters[chapter].clicked){
            tracks.intro.audio.play();
            return;
          }
        }

        //Play click
        if ($(event.target).is('tw-link:not(.visited)')){
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
