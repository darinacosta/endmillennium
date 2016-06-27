define(['components/transitions/transitionSvc'], transitionCtrl);

function transitionCtrl(transitionSvc) {
  var transitionCtrl = {};

  transitionCtrl.init = function(){
    transitionSvc.activateChapterEvents();
  };

  return transitionCtrl;
}
