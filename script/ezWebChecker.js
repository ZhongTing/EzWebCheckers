function onLoginSuccess()
{
    turnToLobbyLayer();
    listRoomInfos();
}
function onLoginFail(errorMsg)
{
    alert(errorMsg);
}
function onLogout()
{
    turnToLoginLayer();
}

function onListRoomDone(roomInfos)
{
    console.log(JSON.stringify(roomInfos));
}
function onRoomCreated(room, player)
{
    turnToRoomLayer();
    refleshRoomInfoLayer(room);
    refleshPlayersInRoomInfoLayer(player);
}
function onRoomLeaved()
{
    turnToLobbyLayer();
}
function c_createGameRoom()
{
    var title = prompt('enter room title','Come In!');
    var maxPlayer = prompt('enter maxPlayer','3');
    if(isNaN(maxPlayer))maxPlayer=3;
    createGameRoom(title,2,maxPlayer);
}