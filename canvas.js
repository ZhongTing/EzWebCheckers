  var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 200
  });

  var layer = new Kinetic.Layer();

  // tooltip
  var tooltip = new Kinetic.Label({
    x: 170,
    y: 75,
    opacity: 0.75
  });

  tooltip.add(new Kinetic.Tag({
    fill: 'black',
    pointerDirection: 'down',
    pointerWidth: 10,
    pointerHeight: 10,
    lineJoin: 'round',
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffset: 10,
    shadowOpacity: 0.5
  }));
  
  tooltip.add(new Kinetic.Text({
    text: 'Tooltip pointing down',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'white'
  }));
  
  // label with left pointer
  var labelLeft = new Kinetic.Label({
    x: 195,
    y: 130,
    opacity: 0.75
  });
  
  labelLeft.add(new Kinetic.Tag({
    fill: 'green',
    pointerDirection: 'left',
    pointerWidth: 20,
    pointerHeight: 28,
    lineJoin: 'round'
  }));
  
  labelLeft.add(new Kinetic.Text({
    text: 'Label pointing left',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'white'
  }));
  
  // simple label
  var simpleLabel = new Kinetic.Label({
    x: 350,
    y: 50,
    opacity: 0.75
  });
  
  simpleLabel.add(new Kinetic.Tag({
    fill: 'yellow'
  }));
  
  simpleLabel.add(new Kinetic.Text({
    text: 'Simple label',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black'
  }));
  
  // add the labels to layer
  layer.add(tooltip).add(labelLeft).add(simpleLabel);

  // add the layer to the stage
  stage.add(layer);
