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
            case 'CancelSelect':
                gameEffectLayer.removeChildren();
                gameEffectLayer.clear().draw();
                break;
        }
    }
    
    function receiveCheckWinEvent(arriveId)
    {
        EzWebGame.replyCheck(isWin(EzWebGame.getUserTurnOrder(arriveId)));
    }
    
    function someoneFinishGameEvent(user)
    {
        showMessage(user.userName + " Finish Game");
    }
    
    function gameFinishEvent(rank)
    {
        console.debug(rank);
        var messages = [];
        var maxLength = 0;
        for(var i=0;i<rank.length;i++)
        {
            var message = "#" + (i+1) + "\t\t" + rank[i].userName;
            messages.push(message);
            if(message.length > maxLength)
                maxLength = message.length;
        }
        
        // 讓所有訊息等長
        for(var i=0; i<messages.length;i++)
        {
            var message = messages[i];
            for(var j=0;j<maxLength-message.length;j++)
            {
                messages[i] += " ";
            }
        }
        showCheckMessage(messages.join("\n"), backToRoom);
        
        function backToRoom()
        {
            turnToRoomLayer();
            roomInfoLayer.show();
            roomPlayerLayer.show();
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
        onReceiveStep: receiveStepEvent,
        onCheckWin: receiveCheckWinEvent,
        onAccomplishGame: someoneFinishGameEvent,
        onGameFinish: gameFinishEvent
    }
})();

function c_createGameRoom()
{
    var title = prompt('enter room title','Welcome');
    var maxPlayer = prompt('enter maxPlayer','3');
    if(isNaN(maxPlayer))maxPlayer=3;
    EzWebGame.createGameRoom(title,2,maxPlayer);
}