var EzWebEvent = (function(){
    function loginSuccessEvent()
    {
        turnToLobbyLayer();
        EzWebGame.listRoomInfos();
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
        refreshLobbyRooms(roomInfos);
    }
    
    function createdRoomEvent(roomInfo)
    {
        turnToRoomLayer();
        refreshRoomInfoLayer(roomInfo.Room);
        refreshPlayersInRoomInfoLayer(roomInfo.Players);
    }
    
    function leavedRoomEvent()
    {
        turnToLobbyLayer();
    }
    
    function roomJoinedEvent(roomInfo)
    {
        turnToRoomLayer();
        refreshRoomInfoLayer(roomInfo.Room);
        refreshPlayersInRoomInfoLayer(roomInfo.Players);
    }
    function getRoomInfoDoneEvent(data)
    {
        console.log("Event: " + data);
    }
    
    return {
        // �n�J�C��
        onLoginSuccess: loginSuccessEvent,
        onLoginFail: loginFailEvent,
        onLogout: logoutEvent,
        
        // �j�U��
        onListRoomDone: listRoomDoneEvent,
        onRoomCreated: createdRoomEvent,
        
        // �ж���
        onRoomLeaved: leavedRoomEvent,
        onRoomInfoReceived: getRoomInfoDoneEvent,
        onRoomJoined: roomJoinedEvent
        // �C����
    }
})();

function c_createGameRoom()
{
    var title = prompt('enter room title','Welcome');
    var maxPlayer = prompt('enter maxPlayer','3');
    if(isNaN(maxPlayer))maxPlayer=3;
    EzWebGame.createGameRoom(title,2,maxPlayer);
}