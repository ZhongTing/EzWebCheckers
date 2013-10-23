turnToLoginLayer();
//turnToRoomLayer();
//turnToGameLayer();

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
    if(point.player>=0 && EzWebGame.isTurnSelf())
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
    var moveDirection = getMoveDirection();
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
        delete chessPoints[i].computed;
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
    
    //判定獲勝
    //結束回合
    EzWebGame.finishStep();
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
/*
var player = [{name:'test'},{name:'test'},{name:'test'}];
initGame(player);
gameLayer.clear().draw()
*/
function displayTurns()
{
    var labelWidth = stage.getWidth();
    var turnLabel = newLabel(0,stage.getHeight()/2,'ani',100,50);
    gameEffectLayer.add(turnLabel);
    gameEffectLayer.clear().draw();
    
    var anim = new Kinetic.Animation(function(frame) {
        //turnLabel.setX(frame.time/100);
        var period = 5000;
        var scale = frame.time * 2 * Math.PI / period + 0.001;
        turnLabel.setScale(scale, 1);
    }, gameEffectLayer);
    anim.start();
}