var EzWebEvent = (function(){
    function loginSuccessEvent()
    {
		EzWebGame.openSSE();
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
        //console.log(JSON.stringify(roomInfos));
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
        EzWebGame.listRoomInfos();
    }
    
	function getRoomChangedEvent(roomInfo)
    {
        //refreshRoomInfoLayer(roomInfo.Room);
		//console.log(roomInfo);
        refreshPlayersInRoomInfoLayer(roomInfo.Players);
    }
	
    function roomJoinedEvent(roomInfo)
    {
        turnToRoomLayer();
        refreshRoomInfoLayer(roomInfo.Room);
        refreshPlayersInRoomInfoLayer(roomInfo.Players);
    }
    
	function roomStartdEvent()
	{
		turnToGameLayer();
	}
	
	function changeTurnEvent(player)
	{
		console.log(player.userName + "[" + player.userId + "]");
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
        onRoomChanged: getRoomChangedEvent,
        onRoomJoined: roomJoinedEvent,
		onRoomStarted: roomStartdEvent,
		
        // �C����
		onChangeTrun: changeTurnEvent
    }
})();

function c_createGameRoom()
{
    var title = prompt('enter room title','Welcome');
    var maxPlayer = prompt('enter maxPlayer','3');
    if(isNaN(maxPlayer))maxPlayer=3;
    EzWebGame.createGameRoom(title,2,maxPlayer);
}