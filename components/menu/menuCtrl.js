define(['components/menu/menuHelperSvc'], menuCtrl);

function menuCtrl(menuHelperSvc){
  var menuCtrl = {};

  menuCtrl.init = function(){
    menuHelperSvc.prependMenu();
  };

  return menuCtrl;
}
