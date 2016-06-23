define(['components/text-section/textSectionBackgroundSvc'], textSectionHelperSvc);

function textSectionHelperSvc(textSectionBackgroundSvc){
  var textSectionHelperSvc = {};
  var backgrounds = textSectionBackgroundSvc.backgrounds;

  textSectionHelperSvc.applyBackgroundImages = function(args){
    var statics = ['static', 'static2', 'static3'];
    var styleText = "";
    if (!args['static']){
      styleText += '.text-section{background-image: url(assets/images/dark.png)}';
    }
    for (var background in backgrounds) {
      if (backgrounds.hasOwnProperty(background)) {
        if (backgrounds[background]["img"]){
          var backgroundName = '.text-section.' + background;
          styleText += backgroundName + '{background-image: '
            + 'url(assets/images/' + backgrounds[background]["img"] +'.png)';
          if (args['static']){
            var rand = Math.floor((Math.random() * statics.length));
            styleText += ', url(assets/images/' +  statics[rand] + '.gif)' + '} ';
          } else {
            styleText += '} ';
          }
        }
      }
    }
    return styleText;
  };

  textSectionHelperSvc.applyBackgroundImagesWithStatic = function(){
    var styleText = textSectionHelperSvc.applyBackgroundImages({static:true});
    $("<style id='text-section-background'>").text(styleText).appendTo("head");
  };

  textSectionHelperSvc.removeStatic = function(){
    var styleText = textSectionHelperSvc.applyBackgroundImages({static:false});
    $("#text-section-background").text(styleText);
  };

  textSectionHelperSvc.addStatic = function(){
    var styleText = textSectionHelperSvc.applyBackgroundImages({static:true});
    $("#text-section-background").text(styleText);
  };

  return textSectionHelperSvc;
}
