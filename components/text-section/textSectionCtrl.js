define(['components/text-section/textSectionBackgroundSvc',
        'components/text-section/textSectionHelperSvc'], textSectionCtrl);

function textSectionCtrl(textSectionBackgroundSvc, textSectionHelperSvc){
  var textSectionCtrl = {};
  var backgrounds = textSectionBackgroundSvc.backgrounds;

  textSectionCtrl.init = function(){
    textSectionHelperSvc.applyBackgroundImagesWithStatic();
  };

  return textSectionCtrl;
}
