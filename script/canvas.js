//turnToLoginLayer();
//turnToRoomLayer();
turnToGameLayer();

function turnToLoginLayer()
{
    initLayer();
    loginLayer.show().draw();
}
function initLayer()
{
    stage.getLayers().each(function(layer){layer.hide()});
    backgroundLayer.show();
}
function turnToLobbyLayer()
{
    initLayer();
    lobbyLayer.show().draw();
}
function turnToRoomLayer()
{
    initLayer();
    roomLayer.show().draw();
}
function turnToGameLayer()
{
    initLayer();
    chessBoardLayer.show().draw();
    gameLayer.show().draw();
}
function refreshRoomInfoLayer(room)
{
    roomInfoLayer.add(newLabel(0,10,room.title,stage.getWidth()-10,30));
    roomInfoLayer.add(newLabel(stage.getWidth()-210,60,'MaxPlayer: '+room.max,200,20));
    roomInfoLayer.show().draw();
}
function refreshPlayersInRoomInfoLayer(players)
{
    var posX = [100,260,420];
    var pics = ['./red.jpg','./yellow.jpg','green.jpg'];
    for(var i=0; i < players.length; i++)
    {
        newPlayerZone(posX[i],150,150,150,players[i].userName,pics[i],roomPlayerLayer);
    }
    roomPlayerLayer.show().draw();
}
function refreshLobbyRooms(roomInfos)
{
    var x = 100,y=100,width=stage.getWidth()-y-10,height=30;
    if(lobbyRoomsLayer)lobbyRoomsLayer.clear();
    lobbyRoomsLayer = new Kinetic.Layer();
    for(var i =0;i<roomInfos.length;i++)
    {
        newLobbyRoomZone(x,y,width,height,roomInfos[i],lobbyRoomsLayer);
        y+=50;
    }
    stage.add(lobbyRoomsLayer);
}