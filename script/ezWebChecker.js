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