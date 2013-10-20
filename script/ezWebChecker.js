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
        // �n�J�C��
        onLoginSuccess: loginSuccessEvent,
        onLoginFail: loginFailEvent,
        onLogout: logoutEvent,
        
        // �j�U��
        onListRoomDone: listRoomDoneEvent,
        onRoomCreated: createdRoomEvent,
        
        // �ж���
        onRoomLeaved: leavedRoomEvent,
        onRoomInfoReceived: getRoomInfoDoneEvent
        
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