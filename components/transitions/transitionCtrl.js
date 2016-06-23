define([], transitionCtrl);

function transitionCtrl() {
  var transitionCtrl = {};

  transitionCtrl.init = function(){
    transitionCtrl.activateTransitionEvents();
  };

  var chaptersClicked = {
    one: false,
    two: false
  };

  transitionCtrl.activateTransitionEvents = function(){
      $("html").on('click', function(event){
        if ($(event.target).is('[passage-name="The highway"]') && !chaptersClicked.one) {
          chaptersClicked.one = true;
          $('tw-passage').fadeOut(0, function(){
            $('body').append('<div class="chapter text-section" id="chapterone"><div class="inner-chapter"><div class="chapter-header">Chapter One</div><br><div class="chapter-title">The Highway</div></div></div>');
            $('#chapterone').css('visibility','visible').hide().fadeIn('slow').delay(3000).fadeOut('slow', function(){
              $('tw-passage').fadeIn(1000);
            });
          });
        }
      });
  };

  return transitionCtrl;
}
