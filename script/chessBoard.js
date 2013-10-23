var chessBoardCenter = {x:393.5,y:207};
var chessBoardGridEdge = 45;
var chessPoints;
var userCheckerColors = ["red","yellow","green"];
var selectedChecker;

function getInitChessPoint(number)
{
    console.log("PlayerNum: " + number);
    var point = {};
    var moveDirection = getMoveDirection();
    
    //定義紅色領地0 & player 0 所在之地, TipPoint{-2,-2} move up & rightdown
    setPlayerAndDomain({x:-2,y:-2},"up","rightdown",0,0);
    
    //定義綠色領地2,                     TipPoint{-4,-2} move right & down
    setPlayerAndDomain({x:-4,y:2}, "right","down",-1,2);
    
    //定義黃色領地1 & player 1 所在之地, TipPoint{-2,4}  move rightdown & left
    setPlayerAndDomain({x:-2,y:4}, "rightdown","left",1,1);
    
    //定義紅色領地0,                     TipPoint{2,2}   move down & leftup
    setPlayerAndDomain({x:2,y:2},  "down","leftup",-1,0);
    
    //定義綠色領地2 & player 2 所在之地, TipPoint{4,-2}  move left & up
    setPlayerAndDomain({x:4,y:-2}, "left","up",number==3?2:-1,2);
    
    //定義黃色領地1,                     TipPoint{2,-4}  move leftup & right
    setPlayerAndDomain({x:2,y:-4}, "leftup","right",-1,1);
    
    //定義中間無人區塊
    var CenterPoint = {x:0,y:0};
    for(var i=0; i<6; i++)
    {
        tempPoint = getMovePoint(moveDirection[i],CenterPoint);
        tempPoint.player=-1;
        tempPoint.domain=[-1];
        point[tempPoint.x+","+tempPoint.y] = tempPoint;
    }
    CenterPoint.player=-1;
    CenterPoint.domain=[-1];
    point[CenterPoint.x+","+CenterPoint.y] = CenterPoint;
    
    return point;
    
    function setPlayerAndDomain(TipPoint, leftDirection, rightDirection, playerNumber, domain)
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
                tempPoint = point[tempPoint.x+","+tempPoint.y] == undefined ? tempPoint : point[tempPoint.x+","+tempPoint.y];
                tempPoint.player = tempPoint.player == undefined || tempPoint.player == -1 ? playerNumber : tempPoint.player;
                //tempPoint.domain = tempPoint.domain == undefined ? {x:domain} : {x:tempPoint.domain.x,y:domain}; 
                if(tempPoint.domain)
                    tempPoint.domain.push(domain);
                else
                    tempPoint.domain = [domain];
                //console.log(i + ", " + j + ": ");console.log(tempPoint);
                point[tempPoint.x+","+tempPoint.y] = tempPoint;
            }
        }
    }
}

function getPoint(point, points)
{
    return points[point.x+","+point.y];
}

function gridXyToXy(point)
{
    var x = (point.x+(point.y)/2) *chessBoardGridEdge + chessBoardCenter.x;;
    var y = -(point.y*Math.sqrt(3)/2)*chessBoardGridEdge + chessBoardCenter.y;
    return {x:x,y:y};
}

function findAndRecordOnBoard(point)
{
    var jumpStack = [];
    var sureStack = [];
    var moveDirection = getMoveDirection();
    var tChessPoints = cloneChessPoint(chessPoints, ["x", "y", "player", "domain"]);
    var selectedPoint = getPoint(point, chessPoints);
    
    //console.log(tChessPoints);
    var chessPoint;
    for(var i=0; i<6; i++)
    {// 對選到的點 往六個方向探詢 是否可以走
        chessPoint = getPoint(getMovePoint(moveDirection[i], point), tChessPoints);
        if(!chessPoint)
        {
            continue;
        }
        else if(chessPoint.player < 0)
        {
            sureStack.push(chessPoint);
        }
    }
    
    jumpStack.push(getPoint(point, tChessPoints));
    //console.log(jumpStack);
    jump_recursive(jumpStack, sureStack, moveDirection, tChessPoints);
    
    //console.log(sureStack);
    for(var i in sureStack)
    {
        tPoint = sureStack[i];
        chessPoint = getPoint(tPoint, chessPoints);
        if(isPointDomainBelongPlayer(chessPoint, selectedPoint.player))
        {
            chessPoint.computed = true;
        }
    }
}

function jump_recursive(jumpStack, sureStack, moveDirection, tChessPoints)
{
    if(jumpStack.length == 0)
    {// 不用繼續遞迴
        return;
    }
    //console.log("Start jump_recursive");
    var nextJumpStack = [];
    var chessPoint;
    for(var i in jumpStack)
    {
        tPoint = jumpStack[i]; 
        for(var j in moveDirection)
        {
            var thisRoundMoveDirection = moveDirection[j];
            if(tPoint[thisRoundMoveDirection] == true)
            {// 此點此方向已經跳過
                continue;
            }
            
            chessPoint = getPoint(getMovePoint(thisRoundMoveDirection, tPoint), tChessPoints);
            if(!(chessPoint && chessPoint.player >= 0))
            {// 確認此方向是否可以跳躍
                continue;
            }
            
            chessPoint = getPoint(getMovePoint(thisRoundMoveDirection, tPoint, true), tChessPoints);
            //console.log(chessPoint);
            if(!chessPoint)
            {
                continue;
            }
            else if(chessPoint.player < 0)
            {
                tPoint[thisRoundMoveDirection] = true;
                nextJumpStack.push(chessPoint);
                sureStack.push(chessPoint);
            }
        }
    }
    //console.log("Next Round Jump");
    //console.log(nextJumpStack);
    jump_recursive(nextJumpStack, sureStack, moveDirection, tChessPoints);
}
function findPath(startPoint,finalPoint)
{
    var jumpStack = [];
    var path = [startPoint];
    var moveDirection = getMoveDirection();
    var tChessPoints = cloneChessPoint(chessPoints, ["x", "y", "player", "domain"]);
    var chessPoint;
    for(var i=0; i<6; i++)
    {// 對選到的點 往六個方向探詢 是否可以走
        chessPoint = getPoint(getMovePoint(moveDirection[i], startPoint), tChessPoints);
        if(!chessPoint)
        {
            continue;
        }
        else if(chessPoint.x==finalPoint.x&&chessPoint.y==finalPoint.y)
        {
            path.push(finalPoint);
            return path;
        }
        chessPoint.mark = true;
    }
    return findPath_recursive(startPoint,finalPoint,path,tChessPoints);
}
function findPath_recursive(startPoint,finalPoint,path,tChessPoints)
{
    var result = null;
    var moveDirection = getMoveDirection();
    path.push(startPoint);
    for(var i=0; i<6; i++)
    {// 對選到的點 往六個方向探詢 是否可以走
        var middleChecker = getMovePoint(moveDirection[i], startPoint);
        if(!middleChecker||middleChecker.player<0)continue;
        var moveP = getMovePoint(moveDirection[i], startPoint,true)
        chessPoint = getPoint(moveP, tChessPoints);
        if(!chessPoint || chessPoint.mark)
        {
            continue;
        }
        else if(chessPoint.x==finalPoint.x&&chessPoint.y==finalPoint.y)
        {
            path.push(finalPoint);
            return path;
        }
        else
        {
            chessPoint.mark = true;
            result = findPath_recursive(chessPoint,finalPoint,path,tChessPoints);
            if(result!=null)return result;
        }
    }
    return result;
}
function isPointDomainBelongPlayer(point, playerNumber)
{
    if(point.domain[0] == -1)
        return true;
    for(var i in point.domain)
        if(point.domain[i] == playerNumber)
            return true;
    return false;
}

function getMovePoint(direction, point, isJump)
{
    move = isJump == true ? 2 : 1;
    switch(direction)
    {
        case 'up'://0
            return {x:point.x,y:point.y+move};
            break;
        case 'down'://3
            return {x:point.x,y:point.y-move};
            break;
        case 'left'://3
            return {x:point.x-move,y:point.y};
            break;
        case 'right'://1
            return {x:point.x+move,y:point.y};
            break;
        case 'leftup'://5
            return {x:point.x-move,y:point.y+move};
            break;
        case 'rightdown'://2
            return {x:point.x+move,y:point.y-move};
            break;
    }
}

function getMoveDirection()
{
    return ["up", "right", "rightdown", "down", "left", "leftup"];
}

function cloneChessPoint(source, tag)
{
    var destination = {};
    for(var i in source)
    {
        destination[i] = {};
        for (var property in tag)
        {
            destination[i][tag[property]] = deepCopy(source[i][tag[property]]);
        }
    }
    return destination;
}

function deepCopy(obj)
{
    if(obj == null || typeof(obj) !== 'object'){
        return obj;
    }
    //make sure the returned object has the same prototype as the original
    var ret = obj.constructor();
    for(var key in obj)
    {
        ret[key] = deepCopy(obj[key]);
    }
    return ret;
}