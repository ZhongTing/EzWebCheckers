var chessBoardCenter = {x:393.5,y:207};
var chessBoardGridEdge = 45;
var chessPoints = getInitChessPoint();
var users = getInitUserCheckers();
function getInitUserCheckers()
{
    var user = [{color:'red',points:[]},{color:'yellow',points:[]},{color:'green',points:[]}];
    user[0].points.push(getXyzPoint(-2,-2,0));
    user[0].points.push(getXyzPoint(-2,-1,0));
    user[0].points.push(getXyzPoint(-2,0,0));
    user[0].points.push(getXyzPoint(-1,-1,0));
    user[0].points.push(getXyzPoint(-1,-2,0));
    user[0].points.push(getXyzPoint(0,-2,0));
    user[1].points.push(getXyzPoint(0,2,-2));
    user[1].points.push(getXyzPoint(0,2,-1));
    user[1].points.push(getXyzPoint(0,2,0));
    user[1].points.push(getXyzPoint(0,1,-1));
    user[1].points.push(getXyzPoint(0,1,-2));
    user[1].points.push(getXyzPoint(0,0,-2));
    user[2].points.push(getXyzPoint(2,0,2));
    user[2].points.push(getXyzPoint(2,0,1));
    user[2].points.push(getXyzPoint(2,0,0));
    user[2].points.push(getXyzPoint(1,0,1));
    user[2].points.push(getXyzPoint(1,0,2));
    user[2].points.push(getXyzPoint(0,0,2));
    return user;
}
function getInitChessPoint()
{
    var point = [];
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
                        case 0:point.push({x:val_1,y:val_2,z:0});break;
                        case 1:point.push({x:val_1,y:0,z:val_2});break;
                        case 2:point.push({x:0,y:val_1,z:val_2});break;
                    }
                }
            }
        }
    }
    for(var j=-2;j<3;j++)
    {
        point.push({x:j,y:0,z:0});
        point.push({x:0,y:j,z:0});
        point.push({x:0,y:0,z:j});
    }    
    point.push({x:0,y:0,z:0});
    return point;
}
function getXyzPoint(x,y,z)
{
    return {x:x,y:y,z:z};
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