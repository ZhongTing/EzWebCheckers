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
function newImage(X,Y,Width,Height,Src,layer)
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
    }
    imageObj.src = Src;
    return imageObj;
}
function newPlayerZone(X,Y,Width,Height,PlayerName,Src,layer)
{
    var label = new Kinetic.Label({
        x: X,
        y: Y,
        opacity: 0.75,
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
    layer.add(label).add(newLabel(X,Y+Height,PlayerName,Width,20));
    return newImage(X,Y,Width,Width,Src,layer);
}