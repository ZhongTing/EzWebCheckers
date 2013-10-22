var chessBoardCenter = {x:393.5,y:207};
var chessBoardGridEdge = 45;
var chessPoints = getInitChessPoint();
var userCheckerColors = ["red","yellow","green"];
var selectedChecker;

function getInitChessPoint()
{
    var point = {};
    var moveDirection = ["up", "right", "rightdown", "down", "left", "leftup"];
    
    //定義紅色領地0 & player 0 所在之地, TipPoint{-2,-2} move up & rightdown
    setPlayerAndDomain({x:-2,y:-2},"up","rightdown",0,0);
    
    //定義綠色領地2,                     TipPoint{-4,-2} move right & down
    setPlayerAndDomain({x:-4,y:2}, "right","down",-1,2);
    
    //定義黃色領地1 & player 1 所在之地, TipPoint{-2,4}  move rightdown & left
    setPlayerAndDomain({x:-2,y:4}, "rightdown","left",1,1);
    
    //定義紅色領地0,                     TipPoint{2,2}   move down & leftup
    setPlayerAndDomain({x:2,y:2},  "down","leftup",-1,0);
    
    //定義綠色領地2 & player 2 所在之地, TipPoint{4,-2}  move left & up
    setPlayerAndDomain({x:4,y:-2}, "left","up",2,2);
    
    //定義黃色領地1,                     TipPoint{2,-4}  move leftup & right
    setPlayerAndDomain({x:2,y:-4}, "leftup","right",-1,1);
    
    //定義中間無人區塊
    var CenterPoint = {x:0,y:0};
    for(var i=0; i<6; i++)
    {
        tempPoint = getMovePoint(moveDirection[i],CenterPoint);
        tempPoint.player=-1;
        tempPoint.domain={x:-1};
        point[tempPoint.x+","+tempPoint.y] = tempPoint;
    }
    CenterPoint.player=-1;
    CenterPoint.domain={x:-1};
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
                tempPoint.domain = tempPoint.domain == undefined ? {x:domain} : {x:tempPoint.domain.x,y:domain}; 
                //console.log(i + ", " + j + ": ");console.log(tempPoint);
                point[tempPoint.x+","+tempPoint.y] = tempPoint;
            }
        }
    }
}

function getChessPoint(point)
{
    return chessPoints[point.x+","+point.y];
}

function gridXyToXy(point)
{
    var x = (point.x+(point.y)/2) *chessBoardGridEdge + chessBoardCenter.x;;
    var y = -(point.y*Math.sqrt(3)/2)*chessBoardGridEdge + chessBoardCenter.y;
    return {x:x,y:y};
}

function findAndRecordOnBoard(point)
{
    findNear(point.x+1,point.y);
    findNear(point.x-1,point.y);
    findNear(point.x,point.y+1);
    findNear(point.x,point.y-1);
    findNear(point.x+1,point.y-1);
    findNear(point.x-1,point.y+1);
    find_recursive(point);
}
function findNear(x,y)
{
    var point = getChessPoint(x,y);
    if(!point)return;
    if(point.player>=0)return;
    point.computed = true;
}

function find_recursive(point)
{
    var jumpPoint = [];
    jumpPoint.push(getChessPoint(point.x+2,point.y));
    jumpPoint.push(getChessPoint(point.x-2,point.y));
    jumpPoint.push(getChessPoint(point.x,point.y+2));
    jumpPoint.push(getChessPoint(point.x,point.y-2));
    jumpPoint.push(getChessPoint(point.x+2,point.y-2));
    jumpPoint.push(getChessPoint(point.x-2,point.y+2));
    
    for(var i=0;i<jumpPoint.length;i++)
    {
        if(!jumpPoint[i]||jumpPoint[i].computed)continue;
        if(jumpPoint[i].player>=0)continue;
        jumpPoint[i].computed = true;
        find_recursive(jumpPoint[i]);
    }
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