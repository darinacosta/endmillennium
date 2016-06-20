require(['components/audio/audioCtrl',
         'components/text-section/textSectionCtrl',
         'components/menu/menuCtrl'
], init);

function init(audioCtrl, textSectionCtrl, menuCtrl){
  $('body').append('<div id="loadscreen">_loading</div>');
  audioCtrl.init();
  textSectionCtrl.init();
  menuCtrl.init();
  $('#loadscreen').css('visibility', 'hidden');
};
