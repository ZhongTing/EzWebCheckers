var EzWebEvent = (function(){
    function loginSuccessEvent()
    {
        turnToLobbyLayer();
        listRoomInfos();
    }
    
    function loginFailEvent(errorMsg)
    {
        alert(errorMsg);
    }
    
    function logoutEvent()
    {
        turnToLoginLayer();
    }
    
    function listRoomDoneEvent(roomInfos)
    {
        console.log(JSON.stringify(roomInfos));
    }
    
    function createdRoomEvent(roomInfo)
    {
        turnToRoomLayer();
        refleshRoomInfoLayer(roomInfo.Room);
        refleshPlayersInRoomInfoLayer(roomInfo.Players);
    }
    
    function leavedRoomEvent()
    {
        turnToLobbyLayer();
    }
    
    function getRoomInfoDoneEvent(data)
    {
        console.log("Event: " + data);
    }
    
    return {
        // 登入遊戲
        onLoginSuccess: loginSuccessEvent,
        onLoginFail: loginFailEvent,
        onLogout: logoutEvent,
        
        // 大廳中
        onListRoomDone: listRoomDoneEvent,
        onRoomCreated: createdRoomEvent,
        
        // 房間中
        onRoomLeaved: leavedRoomEvent,
        onRoomInfoReceived: getRoomInfoDoneEvent
        
        // 遊戲中
    }
})();

function c_createGameRoom()
{
    var title = prompt('enter room title','Welcome');
    var maxPlayer = prompt('enter maxPlayer','3');
    if(isNaN(maxPlayer))maxPlayer=3;
    EzWebGame.createGameRoom(title,2,maxPlayer);
}