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

function turnToLoginLayer()
{
    stage.removeChildren('.layer');
    loginLayer = new Kinetic.Layer();
    var loginLabel = newButton(200,stage.getHeight()/2+25,'login',200);
    var registerLabel = newButton(200,stage.getHeight()/2+75,'register',200);
    var ezWebCheckerLabel = newText(160,100,'EzWebChecker',50);
    loginLabel.on('click',function(){login()});
    registerLabel.on('click',function(){window.open('http://127.0.0.1/GameRound/Member')})
    loginLayer.add(loginLabel).add(ezWebCheckerLabel).add(registerLabel);
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
    stage.add(getBackgroundLayer()).add(lobbyLayer);
}
function turnToRoomLayer()
{
    roomLayer = new Kinetic.Layer();
    var leaveRoomLabel = newButton(0,0,'Leave').on('click',function(){leaveGameRoom();});
    roomLayer.add(leaveRoomLabel);
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
    var imageObj = new Image();
    imageObj.onload = function() {
        var chessboard = new Kinetic.Image({
            x: 195,
            y: 5,
            image: imageObj,
            width: 400,
            height: 400
        });
        gameLayer.add(chessboard);
        stage.add(gameLayer);
    };
    imageObj.src = './chess.jpg';
    stage.removeChildren('.layer');
    stage.add(getBackgroundLayer()).add(gameLayer);
}