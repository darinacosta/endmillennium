define(['components/text-section/textSectionHelperSvc',
        'components/audio/audioHelperSvc'], menuHelperSvc);

function menuHelperSvc(textSectionHelperSvc, audioHelperSvc){
  var menuHelperSvc = {};

  menuHelperSvc.prependMenu = function(){
    $('html').prepend('<div class="gameplay-menu">' +
    '<form action=""><input type="checkbox" id="staticSelect" checked> static ' +
    '<input type="checkbox" id="musicSelect" checked> music ' +
    '<input type="checkbox" id="soundfxSelect" checked> soundfx</form>' +
    '</div>');
    $('.gameplay-menu').on('click', function(){
      if (!document.getElementById('staticSelect').checked){
        textSectionHelperSvc.removeStatic();
      } else {
        textSectionHelperSvc.addStatic();
      }

      if (!document.getElementById('soundfxSelect').checked){
        audioHelperSvc.muteSoundFx();
      } else {
        audioHelperSvc.unmuteSoundFx();
      }

      if (!document.getElementById('musicSelect').checked){
        audioHelperSvc.muteMusic();
      } else {
        audioHelperSvc.unmuteMusic();
      }
    });
  };

  return menuHelperSvc;
}
