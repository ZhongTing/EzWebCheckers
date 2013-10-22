var chessBoardCenter = {x:393.5,y:207};
var chessBoardGridEdge = 45;
var chessPoints = getInitChessPoint();
var userCheckerColors = ["red","yellow","green"];
var selectedChecker;
function getInitChessPoint()
{
    var point = {};
    point["0,0"] = {x:0,y:0};
    point["0,1"] = {x:0,y:1};
    point["0,2"] = {x:0,y:2};
    point["0,-1"] = {x:0,y:-1};
    point["0,-2"] = {x:0,y:-2};
    
    point["1,0"] = {x:1,y:0};
    point["1,1"] = {x:1,y:1};
    point["1,2"] = {x:1,y:2};
    point["1,-1"] = {x:1,y:-1};
    point["1,-2"] = {x:1,y:-2};
    point["1,-3"] = {x:1,y:-3};
    
    point["2,0"] = {x:2,y:0};
    point["2,1"] = {x:2,y:1};
    point["2,2"] = {x:2,y:2};
    point["2,-1"] = {x:2,y:-1};
    point["2,-2"] = {x:2,y:-2};
    point["2,-3"] = {x:2,y:-3};
    point["2,-4"] = {x:2,y:-4};
    
    point["3,-1"] = {x:3,y:-1};
    point["3,-2"] = {x:3,y:-2};
    
    point["4,-2"] = {x:4,y:-2};
    
    point["-1,0"] = {x:-1,y:0};
    point["-1,-1"] = {x:-1,y:-1};
    point["-1,-2"] = {x:-1,y:-2};
    point["-1,1"] = {x:-1,y:1};
    point["-1,2"] = {x:-1,y:2};
    point["-1,3"] = {x:-1,y:3};
    
    point["-2,0"] = {x:-2,y:0};
    point["-2,-1"] = {x:-2,y:-1};
    point["-2,-2"] = {x:-2,y:-2};
    point["-2,1"] = {x:-2,y:1};
    point["-2,2"] = {x:-2,y:2};
    point["-2,3"] = {x:-2,y:3};
    point["-2,4"] = {x:-2,y:4};
    
    point["-3,1"] = {x:-3,y:1};
    point["-3,2"] = {x:-3,y:2};
    
    point["-4,2"] = {x:-4,y:2};
    
    
    point["-2,-2"].player = 0;
    point["-2,-1"].player = 0;
    point["-2,0"].player = 0;
    point["-1,-2"].player = 0;
    point["-1,-1"].player = 0;
    point["0,-2"].player = 0;
    point["0,2"].player = 1;
    point["-1,2"].player = 1;
    point["-2,2"].player = 1;
    point["-1,3"].player = 1;
    point["-2,3"].player = 1;
    point["-2,4"].player = 1;
    point["2,0"].player = 2;
    point["2,-1"].player = 2;
    point["2,-2"].player = 2;
    point["3,-1"].player = 2;
    point["3,-2"].player = 2;
    point["4,-2"].player = 2;
    
    return point;
}
function getChessPoint(x,y)
{
    return chessPoints[x+","+y];
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