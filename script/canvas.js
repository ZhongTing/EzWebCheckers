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
    gameEffectLayer.show().draw();
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
    if(roomPlayerLayer)roomPlayerLayer.clear();
    roomPlayerLayer = new Kinetic.Layer();
    for(var i=0; i < players.length; i++)
    {
        newPlayerZone(posX[i],150,150,150,players[i].userName,pics[i],roomPlayerLayer);
    }
    //roomPlayerLayer.show().draw();
    stage.add(roomPlayerLayer);
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
function clickChecker(point)
{
    //是否輪到我
    if(point.player>=0)
    {
        selectedChecker = point;
        displayPlaceToMove(event.targetNode.attrs.point);    
    }
}
function displayPlaceToMove(point)
{
    gameEffectLayer.removeChildren();
    findAndRecordOnBoard(point);
    showEffect();
}
function showEffect()
{
    gameEffectLayer.removeChildren();
    for(var i in chessPoints)
    {
        if(!chessPoints[i].computed)continue;
        var p = gridXyToXy(chessPoints[i]);
        var c = new Kinetic.Circle({
            x: p.x,
            y: p.y,
            radius: 15,
            fill: 'black',
            stroke: 'black',
            //strokeWidth: 1,
        });
        c.attrs.point = chessPoints[i];
        c.on('click',function(evt){moveCheckerTo(evt.targetNode.attrs.point)});
        gameEffectLayer.add(c);
        chessPoints[i].computed = false;
    }
    gameEffectLayer.clear();
    gameEffectLayer.draw();
}
function moveCheckerTo(point)
{
    gameEffectLayer.removeChildren();
    gameEffectLayer.clear();
    gameEffectLayer.draw();
    point.player = selectedChecker.player;
    point.circle.setFill(selectedChecker.circle.attrs.fill);
    selectedChecker.player = -1;
    selectedChecker.circle.attrs.fill='';
    selectedChecker = null;
    gameLayer.clear();
    gameLayer.draw();
    
    //結束回合
}
function initGame(player)
{
    var pics = ['./red.jpg','./yellow.jpg','green.jpg'];
    var y = 20;
    gameLayer.removeChildren();
    for(var i=0;i<player.length;i++)
    {
        newPlayerZone(20,y,150,80,'test',pics[i],gameLayer);
        y+=130;
    }
    chessPoints = getInitChessPoint();
    test();
}