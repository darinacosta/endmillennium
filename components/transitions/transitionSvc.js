define(['components/audio/soundtrackSvc'], transitionSvc);

function transitionSvc(soundtrackSvc) {
  var transitionSvc = {};

  transitionSvc.chapters = {
    1: {
      'id': 1,
      'title': 'The Highway',
      'clicked': false,
      'passage_name': 'The highway'
    },
    2: {
      'id': 2,
      'title': 'The Endless Aisles',
      'clicked': false,
      'passage_name': 'Enter Wal-Mart'
    }
  };

  transitionSvc.activateChapterEvents = function(){
      $("html").on('click', function(event){
         transitionSvc.triggerChapterEvent(event, transitionSvc.chapters[1]);
         transitionSvc.triggerChapterEvent(event, transitionSvc.chapters[2]);
      });
  };

  transitionSvc.triggerChapterEvent = function(event, chapter){
    if ($(event.target).is('[passage-name="' + chapter.passage_name + '"]') && !chapter.clicked) {
      chapter.clicked = true;
      $('tw-passage').fadeOut(0, function(){
        var chapterHtml = '<div class="text-section chapter" id="chapter' + chapter.id + '">' +
                            '<div class="inner-chapter">' +
                              '<div class="chapter-header">' +
                                'Chapter ' + chapter.id +
                              '</div>' +
                              '<br>' +
                              '<div class="chapter-title">' +
                                chapter.title +
                              '</div>' +
                            '</div>' +
                          '</div>';
        $('body').append(chapterHtml);
        $('#chapter' + chapter.id).css('visibility','visible')
        .hide().fadeIn('slow').delay(3000).fadeOut('slow', function(){
          $('tw-passage').fadeIn(1000);
        });
      });
    }
  };


  return transitionSvc;
}
