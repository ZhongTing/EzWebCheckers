var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 200  
});

turnToLoginLayer();

function turnToLoginLayer()
{
    stage.removeChildren('.layer');
    var loginLayer = new Kinetic.Layer();
    var loginLabel = newLabel(stage.getWidth()/2,stage.getHeight()/2,'login');
    var ezWebCheckerLabel = newLabel(stage.getWidth()/2,10,'EzWebCheck!~~');
    loginLabel.on('click',function(){login()});
    loginLayer.add(loginLabel).add(ezWebCheckerLabel);
    stage.add(loginLayer);
}
function turnToLobbyLayer()
{
    var lobbyLayer = new Kinetic.Layer();
    var logoutLabel = newLabel(0,0,'logout').on('click',function(){logout();});
    var refreshRoomListLabel = newLabel(0,50,'refresh room list').on('click',function(){listRoomInfos();});
    var createRoomLabel = newLabel(0,100,'CreateRoom').on('click',function(){openCreateRoomLayer();});
    lobbyLayer.add(logoutLabel).add(refreshRoomListLabel);
    stage.removeChildren('.layer');
    stage.add(lobbyLayer);
}
function turnToRoomLayer()
{
    var roomLayer = new Kinetic.Layer();
    stage.removeChildren('.layer');
    stage.add(roomLayer);
}
function openCreateRoomLayer()
{
    var input = new CanvasInput({
        canvas: document.getElementsByTagName('canvas'),
        fontSize: 18,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        placeHolder: 'Enter message here...'
    });
}