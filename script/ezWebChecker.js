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
    
	function roomStartdEvent(roomInfo)
	{
		turnToGameLayer();
        initGame(roomInfo.Players);
	}
	
	function changeTurnEvent(player)
	{
		console.log(player.userName + "[" + player.userId + "]");
        displayTurns(player);
	}
	
    function receiveStepEvent(instruction)
    {
        var step = JSON.parse(instruction.replace("\\\"","\""));
        switch(step.Method)
        {
            case 'Select':
                selectedChecker = getPoint(step.Point, chessPoints);
                displaySelectCheckerEffect(selectedChecker);
                displayPlaceToMove(selectedChecker);
                break;
            case 'MoveTo':
                moveCheckerTo(getPoint(step.Point, chessPoints));
                break;
        }
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
        onRoomChanged: getRoomChangedEvent,
        onRoomJoined: roomJoinedEvent,
		onRoomStarted: roomStartdEvent,
		
        // 遊戲中
		onChangeTrun: changeTurnEvent,
        onReceiveStep: receiveStepEvent
    }
})();

function c_createGameRoom()
{
    var title = prompt('enter room title','Welcome');
    var maxPlayer = prompt('enter maxPlayer','3');
    if(isNaN(maxPlayer))maxPlayer=3;
    EzWebGame.createGameRoom(title,2,maxPlayer);
}