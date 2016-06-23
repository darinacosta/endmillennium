require(['components/audio/audioCtrl',
         'components/text-section/textSectionCtrl',
         'components/transitions/transitionCtrl',
         'components/menu/menuCtrl'
], init);

function init(audioCtrl, textSectionCtrl, transitionCtrl, menuCtrl){
  $('body').append('<div id="loadscreen">_loading</div>');
  audioCtrl.init();
  textSectionCtrl.init();
  transitionCtrl.init();
  menuCtrl.init();
  $('#loadscreen').css('visibility', 'hidden');
};
