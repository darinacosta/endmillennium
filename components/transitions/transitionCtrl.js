define([], transitionCtrl);

function transitionCtrl() {
  var transitionCtrl = {};

  transitionCtrl.init = function(){
    transitionCtrl.activateTransitionEvents();
  };

  var chapters = {
    1: {
      'title': 'The Highway',
      'clicked': false,
      'passage-name': 'The highway'
    },
    2: {
      title: 'The Endless Aisles',
      clicked: false
    }
  };

  transitionCtrl.activateTransitionEvents = function(){
      $("html").on('click', function(event){
        if ($(event.target).is('[passage-name="The highway"]') && !chapters[1].clicked) {
          chapters[1].clicked = true;
          $('tw-passage').fadeOut(0, function(){
            $('body').append('<div class="text-section chapter" id="chapterone"><div class="inner-chapter"><div class="chapter-header">Chapter One</div><br><div class="chapter-title">The Highway</div></div></div>');
            $('#chapterone').css('visibility','visible').hide().fadeIn('slow').delay(3000).fadeOut('slow', function(){
              $('tw-passage').fadeIn(1000);
            });
          });
        }
      });
  };

  return transitionCtrl;
}
