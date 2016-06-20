define(['components/audio/audioHelperSvc',
        'components/audio/audioEventSvc'], audioCtrl);

function audioCtrl(audioHelperSvc, audioEventSvc){
  var audioCtrl = {};

  audioCtrl.init = function(){
    audioHelperSvc.buildHtmlAudioElements();
    audioHelperSvc.applyAudioVolume();
    audioEventSvc.applyAudioHtmlTriggers();
  };

  return audioCtrl;
}
