var stage = new Kinetic.Stage({
    container: 'container',
    width: 600,
    height: 410
});

var backgroundLayer = new Kinetic.Layer();
var loginLayer = new Kinetic.Layer();
var lobbyLayer = new Kinetic.Layer();
var roomLayer = new Kinetic.Layer();
var roomInfoLayer = new Kinetic.Layer();
var roomPlayerLayer = new Kinetic.Layer();
var gameLayer = new Kinetic.Layer();
var lobbyRoomsLayer;

//BcakgroundLayer
backgroundLayer.add(new Kinetic.Rect({
    x: 0,
    y: 0,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: stage.getWidth(),
    height: stage.getHeight(),
}));

//Login Layer
var loginLabel = newButton(200,stage.getHeight()/2+25,'login',200);
var registerLabel = newButton(200,stage.getHeight()/2+75,'register',200);
var ezWebCheckerLabel = newText(160,100,'EzWebChecker',50);
loginLabel.on('click',function(){EzWebGame.login()});
registerLabel.on('click',function(){window.open('http://127.0.0.1/GameRound/Member')})
loginLayer.add(loginLabel).add(ezWebCheckerLabel).add(registerLabel);

//LobbyLayer
var logoutLabel = newButton(0,0,'logout',80).on('click',function(){EzWebGame.logout();});
var refreshRoomListLabel = newButton(0,50,'refresh',80).on('click',function(){EzWebGame.listRoomInfos();});
var createRoomLabel = newButton(0,100,'Create',80).on('click',function(){c_createGameRoom();});
lobbyLayer.add(logoutLabel).add(refreshRoomListLabel).add(createRoomLabel);

//RoomLayer
var leaveRoomLabel = newButton(0,100,'Leave',80).on('click',function(){EzWebGame.leaveGameRoom();});
var startLabel = newButton(0,150,'Start',80).on('click',function(){alert('coming soon');});
roomLayer.add(leaveRoomLabel).add(startLabel);

//GameLayer
newImage(195,5,400,400,'./chess.jpg',gameLayer);

//Add layer to stage
stage.add(backgroundLayer).add(loginLayer).add(lobbyLayer).add(roomLayer).add(gameLayer);
stage.add(roomInfoLayer).add(roomPlayerLayer);