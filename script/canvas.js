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
    if(point.player>=0 && EzWebGame.isTurnSelf() && EzWebGame.getUserTurnOrder() == point.player)
    {
        EzWebGame.doStep(JSON.stringify({"Method":"Select", "Point":{x:point.x,y:point.y}}));
        selectedChecker = point;
        displaySelectCheckerEffect(point);
        displayPlaceToMove(point);
    }
}

function displayPlaceToMove(point)
{
    findAndRecordOnBoard(point);
    showPlaceToMoveEffect();
}

function showPlaceToMoveEffect()
{
    var moveDirection = getMoveDirection();
    for(var i in chessPoints)
    {
        if(!chessPoints[i].computed)continue;
        var p = gridXyToXy(chessPoints[i]);
        var c = new Kinetic.Circle({
            x: p.x,
            y: p.y,
            radius: 15,
            fill: 'white',
            stroke: 'black',
            //strokeWidth: 1,
        });
        c.attrs.point = chessPoints[i];
        if(EzWebGame.isTurnSelf())
        {
            c.on('click',function(evt){
                var point = evt.targetNode.attrs.point;
                EzWebGame.doStep(JSON.stringify({"Method":"MoveTo", "Point":{x:point.x,y:point.y}}));
                moveCheckerTo(point);
    
                //判定獲勝
                //結束回合
                EzWebGame.finishStep();
            });
        }
        gameEffectLayer.add(c);
        delete chessPoints[i].computed;
    }
    gameEffectLayer.clear();
    gameEffectLayer.draw();
}
function displaySelectCheckerEffect(point)
{
    gameEffectLayer.removeChildren();
    var selectEffectLayer = new Kinetic.Rect({
        x: 194,
        y: 0,
        fill: 'black',
        width: stage.getWidth(),
        height: stage.getHeight(),
        opacity :0.3
    });
    if(EzWebGame.isTurnSelf())
    {
        selectEffectLayer.on('click',function(){
            EzWebGame.doStep(JSON.stringify({"Method":"CancelSelect"}));
            gameEffectLayer.removeChildren();
            gameEffectLayer.clear().draw();
        });
    }
    gameEffectLayer.add(selectEffectLayer);
    gameEffectLayer.add(new Kinetic.Circle(point.circle));
    gameEffectLayer.clear().draw();
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
}
function initGame(player)
{
    var pics = ['./red.jpg','./yellow.jpg','green.jpg'];
    var y = 20;
    gameLayer.removeChildren();
    for(var i=0;i<player.length;i++)
    {
        newPlayerZone(20,y,150,80,player[i].userName,pics[i],gameLayer);
        gameLayer.add(newNowPlayerEffect(20-2,y-4,150+4,110+4,'blue',player[i].userId));
        y+=130;
    }
    stage.find('.playerZoneEffect').each(function(a){a.hide()});
    chessPoints = getInitChessPoint(player.length);
    test();
}

function displayTurns(player)
{
    var labelWidth = stage.getWidth();
    var turnLabel = newLabel(-labelWidth,stage.getHeight()/2,player.userName+"' turn.",labelWidth,50);
    gameEffectLayer.add(turnLabel);
    gameEffectLayer.clear().draw();
    
    stage.find('.playerZoneEffect').each(function(a){a.hide()});
    stage.find('#'+player.userId)[0].show();
    gameLayer.clear().draw();
    
    var anim = new Kinetic.Animation(function(frame) {
        var period = 5000;
        if(frame.time >=period/2)
        {
            this.stop();
            gameEffectLayer.removeChildren();
            gameEffectLayer.clear();
        }
        var scale = Math.cos(frame.time * 2 * Math.PI / period) * 10; 
        var x = turnLabel.getX()+scale;
        turnLabel.setX(x);
    }, gameEffectLayer);
    anim.start();
}