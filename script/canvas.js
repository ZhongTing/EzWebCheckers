var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 200  
});

turnToLoginLayer();

function turnToLoginLayer()
{
    stage.removeChildren('.layer');
    var loginLayer = new Kinetic.Layer();
    var loginLabel = newLabel(stage.getWidth()/2,stage.getHeight()/2,'login');
    var ezWebCheckerLabel = newLabel(stage.getWidth()/2,10,'EzWebCheck!~~');
    loginLabel.on('click',function(){login()});
    loginLayer.add(loginLabel).add(ezWebCheckerLabel);
    stage.add(loginLayer);
}
function turnToLobbyLayer()
{
    var lobbyLayer = new Kinetic.Layer();
    var logoutLabel = newLabel(0,0,'logout').on('click',function(){logout();});
    var refreshRoomListLabel = newLabel(0,100,'refresh room list').on('click',function(){listRoomInfos();});
    lobbyLayer.add(logoutLabel).add(refreshRoomListLabel);
    stage.removeChildren('.layer');
    stage.add(lobbyLayer);
}