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
    roomInfoLayer.removeChildren();
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
        c.on('mouseover',function(evt){
            showPreviewPath(selectedChecker,evt.targetNode.attrs.point);
        });
        c.on('mouseout',function(){
            gameEffectLayer.find('#previewLine').remove();
            gameEffectLayer.clear().draw();
        })
        
        if(EzWebGame.isTurnSelf())
        {
            c.on('click',function(evt){
                var point = evt.targetNode.attrs.point;
                EzWebGame.doStep(JSON.stringify({"Method":"MoveTo", "Point":{x:point.x,y:point.y}}));
                moveCheckerTo(point);
    
                //判定獲勝
                if(isWin(EzWebGame.getUserId()))
                {//告知其他人 自己獲勝遊戲
                    EzWebGame.finishGame();
                }
                else
                {//結束回合
                    EzWebGame.finishStep();
                }
                
                
            });
        }
        gameEffectLayer.add(c);
        delete chessPoints[i].computed;
    }
    gameEffectLayer.clear();
    gameEffectLayer.draw();
}
function showPreviewPath(startPoint,finalPoint)
{
    var path = findPath(startPoint,finalPoint);
    var points = getLinePointsArray(path);
    for(var i =0;i<path.length;i++)
    {
        var p = gridXyToXy(path[i]);
        points.push(p.x);
        points.push(p.y);
    }
    var line = new Kinetic.Line({
        points: points,
        stroke: userCheckerColors[EzWebGame.getNowTurnUserOrder()],
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: [10, 10],
        id:'previewLine'
    });
    gameEffectLayer.find('#previewLine').remove();
    gameEffectLayer.add(line);
    gameEffectLayer.clear().draw();
}
function getLinePointsArray(arrayPoint)
{
    var points = [];
    for(var i =0;i<arrayPoint.length;i++)
    {
        var p = gridXyToXy(arrayPoint[i]);
        points.push(p.x);
        points.push(p.y);
    }
    return points;
}
function getBoardLine(fromPoint,toPoint)
{
    var from = gridXyToXy(fromPoint);
    var to = gridXyToXy(toPoint);
    
}
function displaySelectCheckerEffect(point)
{
    greyBackgroundEffect(gameEffectLayer,null,194);
    gameEffectLayer.add(new Kinetic.Circle(point.circle));
    gameEffectLayer.clear().draw();
}
function moveCheckerTo(point)
{
    gameEffectLayer.removeChildren();
    var path = findPath(selectedChecker,point);
    var points = getLinePointsArray(path);
    var line = new Kinetic.Line({
        points: points,
        //stroke: userCheckerColors[selectedChecker.player],
        stroke:'black',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
        id:'previewLine'
    });
    gameEffectLayer.add(line);
    var anim = new Kinetic.Animation(function(frame) {
        var period = 5000;
        if(frame.time>period)
        {
            anim.stop();
            point.player = selectedChecker.player;
            point.circle.setFill(selectedChecker.circle.attrs.fill);
            selectedChecker.player = -1;
            selectedChecker.circle.attrs.fill='';
            selectedChecker = null;
            gameLayer.clear().draw();
        }
    }, gameEffectLayer);
    anim.start();
    gameEffectLayer.clear().draw();        
}
function moveCheckerTo2(point)
{
    gameEffectLayer.removeChildren();
    var path = findPath(selectedChecker,point);
    var points = getLinePointsArray(path);
    points.shift();
    points.shift();
    var p = gridXyToXy(selectedChecker);
    var c = new Kinetic.Circle({
            x: p.x,
            y: p.y,
            radius: 15,
            fill: userCheckerColors[selectedChecker.player],
            stroke: 'black',
            //strokeWidth: 1,
    });
    gameEffectLayer.add(c);
    var anim = new Kinetic.Animation(function(frame) {
        var period = 5000;
        if(points.length<=1)
        {
            anim.stop();
            point.player = selectedChecker.player;
            point.circle.setFill(selectedChecker.circle.attrs.fill);
            selectedChecker.player = -1;
            selectedChecker.circle.attrs.fill='';
            selectedChecker = null;
            gameLayer.clear().draw();
            gameEffectLayer.clear().draw();        
        }
        else
        {
            var cx = c.getX();
            var cy = c.getY();
            var x = points[0];
            var y = points[1];
            var m = (y-cy)/(x-cx);
            var rate = frame /5000 * (y>cy?1:-1);
            var type = x>cx?"right":"left";
            c.setX(cx+rate);
            c.setY(cy+m*rate);
            if(type=="right" && cx>x || type=="left" && cx<=x)
            {
                x = points.shift();
                y = points.shift();
            }
        }
    }, gameEffectLayer);
    gameEffectLayer.clear().draw();
    anim.start();
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
    chessPoints = getInitChessPoint();
    test();
}

function displayTurns(player)
{
    showMessage(player.userName+"' turn.");
    stage.find('.playerZoneEffect').each(function(a){a.hide()});
    stage.find('#'+player.userId)[0].show();
    gameLayer.clear().draw();
}

function showMessage(message)
{
    var labelWidth = stage.getWidth();
    var turnLabel = newLabel(-labelWidth,stage.getHeight()/2,message,labelWidth,50);
    gameEffectLayer.add(turnLabel);
    gameEffectLayer.clear().draw();
    
    var anim = new Kinetic.Animation(function(frame) {
        var period = 5000;
        var scale = Math.cos(frame.time * 2 * Math.PI / period) * 10+1; 
        var x = turnLabel.getX()+scale;
        if(turnLabel.getX()+turnLabel.getWidth()<=10&&frame.time>period/2)
        {
            this.stop();
            gameEffectLayer.removeChildren();
            gameEffectLayer.clear();
        }
        turnLabel.setX(x);
    }, gameEffectLayer);
    anim.start();
}
function greyBackgroundEffect(layer,callBack,x)
{
    var selectEffectLayer = new Kinetic.Rect({
        x: x,
        y: 0,
        fill: 'black',
        width: stage.getWidth(),
        height: stage.getHeight(),
        opacity :0.3
    });
    selectEffectLayer.on('click',function(){
        layer.removeChildren();
        layer.clear().draw();
        if(callBack)callBack();
    });
    gameEffectLayer.add(selectEffectLayer);
}
function showCheckMessage(message,callBack)
{
    var textField = newButton(0,stage.getHeight()/2,message,stage.getWidth(),30);
    textField.on('click',function(){
        gameEffectLayer.removeChildren();
        gameEffectLayer.clear().draw();
        if(callBack)callBack();
    })
    greyBackgroundEffect(gameEffectLayer,callBack);
    gameEffectLayer.add(textField);
    gameEffectLayer.clear().draw();
}
function isWin(userId)
{
    var playerNumber = EzWebGame.getUserTurnOrder(userId);
    
    switch(playerNumber)
    {
        case 0:
            //定義紅色領地0,                     TipPoint{2,2}   move down & leftup
            return checkPlayer({x:2,y:2},  "down","leftup",-1,0);
        case 1:
            //定義黃色領地1,                     TipPoint{2,-4}  move leftup & right
            return checkPlayer({x:2,y:-4}, "leftup","right",-1,1);
        case 2:
            //定義綠色領地2,                     TipPoint{-4,-2} move right & down
            return checkPlayer({x:-4,y:2}, "right","down",-1,2);
    }
    
    function checkPlayer(TipPoint, leftDirection, rightDirection, playerNumber)
    {
        for(var i=0; i<3; i++)
        {
            for(var j=0; j<=i; j++)
            {
                var tempPoint = {x:TipPoint.x, y:TipPoint.y};
                //move leftDirection
                for(var k=0; k<i; k++)
                {
                    tempPoint = getMovePoint(leftDirection, tempPoint);
                }
                //move rightDirection
                for(var k=0; k<j; k++)
                {
                    tempPoint = getMovePoint(rightDirection, tempPoint);
                }
                if(tempPoint.player != playerNumber)
                    return false;
            }
        }
        return true;
    }
}