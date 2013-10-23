function newLabel(px,py,Text,Width,labelFontSize)
{
    if(!labelFontSize)labelFontSize=20;
    var label = new Kinetic.Label({
        x: px,
        y: py,
        opacity: 0.75,
    });
    label.add(new Kinetic.Tag({
        fill: 'black',
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 0,
        shadowOffset: 5,
        shadowOpacity: 0.5,
        width:Width,
    }));
    label.add(new Kinetic.Text({
        text: Text,
        fontSize: labelFontSize,
        padding: 5,
        fill: 'white',
        align:'center',
        width:Width,
    }));
    return label;
}
function newButton(px,py,buttonText,Width,labelFontSize)
{
    if(!labelFontSize)labelFontSize=20;
    var label = newLabel(px,py,buttonText,Width,labelFontSize);
    label.on('mouseover',function(){
        this.getTag().setFill('rgb(100,100,100)');
        this.getLayer().draw();
    })
    label.on('mouseout',function(){
        this.getTag().setFill('black');
        this.getLayer().draw();
    })
    return label;
}
function newText(px,py,Text,FontSize,color)
{
    if(!FontSize)FontSize=20;
    if(!color)color='rgb(60,60,60)';
    var simpleText = new Kinetic.Text({
        x: px,
        y: py,
        text: Text,
        fontSize: FontSize,
        fill: color
      });
    return simpleText;
}
function newNowPlayerEffect(px,py,Width,Height,color,id)
{
    return new Kinetic.Tag({
        x:px,
        y:py,
        stroke: color,
        strokeWidth: 5,
        width:Width,
        height:Height,
        id:id,
        name:'playerZoneEffect'
    });
}
function newImage(X,Y,Width,Height,Src,layer,onLoadFunc)
{
    var imageObj = new Image();
    imageObj.onload = function() {
        var image = new Kinetic.Image({
            x: X,
            y: Y,
            image: imageObj,
            width: Width,
            height: Height
        });
        layer.add(image);
        layer.draw();
        if(onLoadFunc)onLoadFunc(image);
    }
    imageObj.src = Src;
}
function newPlayerZone(X,Y,Width,Height,PlayerName,Src,layer)
{
    var shortSide = Width>Height?Height:Width;
    var label = new Kinetic.Label({
        x: X,
        y: Y,
    });
    label.add(new Kinetic.Tag({
        fill: 'white',
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 0,
        shadowOffset: 5,
        shadowOpacity: 0.5,
        width:Width,
        height:Height
    }));
    layer.add(label).add(newLabel(X,Y+shortSide,PlayerName,Width,20));
    newImage(X+(Width-shortSide)/2,Y,shortSide,shortSide,Src,layer);
}
function newLobbyRoomZone(X,Y,Width,Height,RoomInfo,layer)
{
    var labelFontSize = 20;
    var group = new Kinetic.Group({
        x: X,
        y: Y,
        opacity: 0.75,
    });
    var tag = new Kinetic.Tag({
        fill: 'black',
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 0,
        shadowOffset: 5,
        shadowOpacity: 0.5,
        width:Width-Height,
        height:Height,
        pointerDirection: 'right',
        pointerWidth: Height/2,
        pointerHeight: Height,
        x:Height/2,
    });
    var triangle = new Kinetic.Shape({
        drawFunc: function(context) {
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(Height/2, Height/2);
          context.lineTo(0, Height);
          context.lineTo(Height/2, Height);
          context.lineTo(Height/2, 0);
          context.closePath();
          context.fillStrokeShape(this);
        },
        fill: 'black',
        shadowColor: 'black',
        shadowBlur: 0,
        shadowOffset: 5,
        shadowOpacity: 0.5,
    });
    group.add(tag).add(triangle);
    group.add(new Kinetic.Text({
        text: RoomInfo.title,
        fontSize: labelFontSize,
        fill: 'white',
        align:'center',
        width:Width,
        y:(Height-labelFontSize)/2
    }));
    group.add(new Kinetic.Text({
        text: RoomInfo.id,
        fontSize: labelFontSize,
        fill: 'white',
        x:Height/2+15,
        y:(Height-labelFontSize)/2
    }));
    group.add(new Kinetic.Text({
        text: RoomInfo.now+'/'+RoomInfo.max,
        fontSize: labelFontSize,
        fill: 'white',
        align:'left',
        x:Width-Height/2-50,
        y:(Height-labelFontSize)/2
    }));
    group.on('mouseover',function(){
        tag.setFill('rgb(100,100,100)');
        triangle.setFill('rgb(100,100,100)');
        this.getLayer().draw();
    })
    group.on('mouseout',function(){
        tag.setFill('black');
        triangle.setFill('black');
        this.getLayer().draw();
    })
    group.on('click',function(){EzWebGame.joinGameRoom(RoomInfo.id)});
    layer.add(group);
}