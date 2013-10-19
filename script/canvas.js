var stage = new Kinetic.Stage({
    container: 'container',
    width: 700,
    height: 200
});
var backgroundLayer;
var loginLayer;
var lobbyLayer;
var roomLayer;
var roomInfoLayer;

turnToLoginLayer();

function turnToLoginLayer()
{
    stage.removeChildren('.layer');
    loginLayer = new Kinetic.Layer();
    var loginLabel = newButton(stage.getWidth()/2,stage.getHeight()/2,'login');
    var ezWebCheckerLabel = newText(stage.getWidth()/2,10,'EzWebCheck!~~',50);
    loginLabel.on('click',function(){login()});
    loginLayer.add(loginLabel).add(ezWebCheckerLabel);
    stage.add(getBackgroundLayer()).add(loginLayer);
}
function turnToLobbyLayer()
{
    lobbyLayer = new Kinetic.Layer();
    var logoutLabel = newButton(0,0,'logout').on('click',function(){logout();});
    var refreshRoomListLabel = newButton(0,50,'refresh room list').on('click',function(){listRoomInfos();});
    var createRoomLabel = newButton(0,100,'CreateRoom').on('click',function(){c_createGameRoom();});
    lobbyLayer.add(logoutLabel).add(refreshRoomListLabel).add(createRoomLabel);
    stage.removeChildren('.layer');
    stage.add(lobbyLayer);
}
function turnToRoomLayer()
{
    roomLayer = new Kinetic.Layer();
    var leaveRoomLabel = newButton(0,0,'Leave').on('click',function(){leaveGameRoom();});
    roomLayer.add(leaveRoomLabel);
    stage.removeChildren('.layer');
    stage.add(roomLayer);
}
function refleshRoomInfoLayer(room)
{
    //room.title,room.max,room.min
    var title = newText(100,50,'test');
    roomLayer.add(title);
}
function refleshPlayersInRoomInfoLayer(player)
{
    
}