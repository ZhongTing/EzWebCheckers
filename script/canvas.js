var stage = new Kinetic.Stage({
    container: 'container',
    width: 600,
    height: 410
});
var backgroundLayer;
var loginLayer;
var lobbyLayer;
var roomLayer;
var roomInfoLayer;
var gameLayer;

turnToLoginLayer();
//turnToRoomLayer();
//turnToGameLayer();

function turnToLoginLayer()
{
    stage.removeChildren('.layer');
    loginLayer = new Kinetic.Layer();
    var loginLabel = newButton(200,stage.getHeight()/2+25,'login',200);
    var registerLabel = newButton(200,stage.getHeight()/2+75,'register',200);
    var ezWebCheckerLabel = newText(160,100,'EzWebChecker',50);
    loginLabel.on('click',function(){EzWebGame.login()});
    registerLabel.on('click',function(){window.open('http://127.0.0.1/GameRound/Member')})
    loginLayer.add(loginLabel).add(ezWebCheckerLabel).add(registerLabel);
    stage.add(getBackgroundLayer()).add(loginLayer);
}
function turnToLobbyLayer()
{
    lobbyLayer = new Kinetic.Layer();
    var logoutLabel = newButton(0,0,'logout').on('click',function(){EzWebGame.logout();});
    var refreshRoomListLabel = newButton(0,50,'refresh room list').on('click',function(){EzWebGame.listRoomInfos();});
    var createRoomLabel = newButton(0,100,'CreateRoom').on('click',function(){c_createGameRoom();});
    lobbyLayer.add(logoutLabel).add(refreshRoomListLabel).add(createRoomLabel);
    stage.removeChildren('.layer');
    stage.add(getBackgroundLayer()).add(lobbyLayer);
}
function turnToRoomLayer()
{
    roomLayer = new Kinetic.Layer();
    var leaveRoomLabel = newButton(0,100,'Leave',80).on('click',function(){EzWebGame.leaveGameRoom();});
    var startLabel = newButton(0,150,'Start',80).on('click',function(){alert('coming soon');});
    roomLayer.add(leaveRoomLabel).add(startLabel);
    
    roomLayer.add(newLabel(0,10,'RoomTitle',stage.getWidth()-10,30));
    roomLayer.add(newLabel(stage.getWidth()-210,60,'MaxPlayer:3',200,20));
    newPlayerZone(100,150,150,150,'PlayerName','./red.jpg',roomLayer);
    newPlayerZone(260,150,150,150,'PlayerName','./yellow.jpg',roomLayer);
    newPlayerZone(420,150,150,150,'PlayerName','./green.jpg',roomLayer);
    stage.removeChildren('.layer');
    stage.add(getBackgroundLayer()).add(roomLayer);
}
function refleshRoomInfoLayer(room)
{
    var title = newText(100,50,room.title);
    var maxPlayer = newText(100,50,'maxPlayer: '+room.min);
    roomLayer.add(title).add(maxPlayer);
}
function refleshPlayersInRoomInfoLayer(player)
{
    
}
function turnToGameLayer()
{
    gameLayer = new Kinetic.Layer();
    newImage(195,5,400,400,'./chess.jpg',gameLayer);
    stage.removeChildren('.layer');
    stage.add(getBackgroundLayer()).add(gameLayer);
}