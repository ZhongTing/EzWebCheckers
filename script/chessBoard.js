var chessBoardCenter = {x:393.5,y:207};
var chessBoardGridEdge = 45;
var chessPoints = getInitChessPoint();
var userCheckerColors = ["red","yellow","green"];
function getInitChessPoint()
{
    var point = {};
    for(var i =0;i<3;i++)
    {
        for(var x=1;x<=2;x++)
        {
            for(var y=1;y<=2;y++)
            {
                for(var minus=-1;minus<2;minus+=2)
                {
                    var val_1 = x*minus;
                    var val_2 = y*minus*(i==2? -1:1);
                    switch(i)
                    {
                        case 0:point[val_1+','+val_2+',0'] = {x:val_1,y:val_2,z:0};
                        case 1:point[val_1+',0,'+val_2] = {x:val_1,y:0,z:val_2};
                        case 2:point['0,'+val_1+','+val_2] = {x:0,y:val_1,z:val_2};
                    }
                }
            }
        }
    }
    for(var j=-2;j<3;j++)
    {
        if(j==0)continue;
        point[j+",0,0"] = {x:j,y:0,z:0};
        point["0,"+j+",0"] = {x:0,y:j,z:0};
        point["0,0,"+j] = {x:0,y:0,z:j};
    }    
    point["0,0,0"] = {x:0,y:0,z:0};
    
    point["-2,-2,0"].player = 0;
    point["-2,-1,0"].player = 0;
    point["-2,0,0"].player = 0;
    point["-1,-2,0"].player = 0;
    point["-1,-1,0"].player = 0;
    point["0,-2,0"].player = 0;
    point["0,2,-2"].player = 1;
    point["0,2,-1"].player = 1;
    point["0,2,0"].player = 1;
    point["0,1,-2"].player = 1;
    point["0,1,-1"].player = 1;
    point["0,0,-2"].player = 1;
    point["2,0,2"].player = 2;
    point["2,0,1"].player = 2;
    point["2,0,0"].player = 2;
    point["1,0,2"].player = 2;
    point["1,0,1"].player = 2;
    point["0,0,2"].player = 2;
    return point;
}
function getChessPoint(x,y,z)
{
    return chessPoints[x+","+y+","+z];
}

function gridXyzToXy(point)
{
    var x = point.x+(point.y+point.z)/2;
    var y = point.z-point.y;
    return {x:x,y:y};
}
function gridXyToXy(point)
{
    var x = point.x * chessBoardGridEdge + chessBoardCenter.x;
    var y = point.y * chessBoardGridEdge*Math.sqrt(3)/2 + chessBoardCenter.y;
    return {x:x,y:y};
}