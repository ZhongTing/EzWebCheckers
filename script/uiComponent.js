function newButton(px,py,buttonText,labelFontSize)
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
        width:100,
        height:50
    }));
    label.add(new Kinetic.Text({
        text: buttonText,
        fontSize: labelFontSize,
        padding: 5,
        fill: 'white',
        align:'center',
        width:100,
        height:50
    }));
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
function newText(px,py,Text,FontSize)
{
    if(!FontSize)FontSize=20;
    var simpleText = new Kinetic.Text({
        x: px,
        y: py,
        text: Text,
        fontSize: FontSize,
        fill: 'green'
      });
    return simpleText;
}
 
function getBackgroundLayer()
{
    var layer = new Kinetic.Layer();
    layer.add(new Kinetic.Rect({
        x: 0,
        y: 0,
        stroke: '#555',
        strokeWidth: 5,
        fill: '#ddd',
        width: stage.getWidth(),
        height: stage.getHeight(),
    }));
    return layer;
}