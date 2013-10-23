var EzWebGame = (function(){
    var EzWebGameURL = "http://127.0.0.1/GameRound/";
    var Key = '';
    var LocalLoginURL = "./login.php";
    var eventSSE;
    var TurnId = 0;
	
    function login()
    {
        $.ajax({
      		url: LocalLoginURL
       	}).done(function(data) {
      		console.log(data);
            eval(data);
        });
    }
    
    function logout()
    {
        $.ajax({
      		url: EzWebGameURL + "user/logout/"+Key
       	}).done(function(data) {
            Key = '';
			closeRequest()
            EzWebEventCalls(EzWebEvent.onLogout);
        });
    }
    
    function listRooms()
    {
        $.ajax({
      		url: EzWebGameURL + "Room/ListRoomInfos/"+Key
       	}).done(function(data) {
            data = JSON.parse(data);
            Key = data.cKey;
            EzWebEventCalls(EzWebEvent.onListRoomDone, data.Room);
        });
    }
    
    function createRoom(title,minPlayer,maxPlayer)
    {
        $.ajax({
      		url: EzWebGameURL + "Room/Create/" + title + "/" + minPlayer + "/" + maxPlayer + "/" + Key 
       	}).done(function(data) {
      		console.log(data);
            data = JSON.parse(data);
            Key = data.cKey;
            TurnId = 0;
            if(data.Wrong)alert(data.Wrong);
            else
            {
				closeRequest();
				openRequest();
                var object = new Array();
                EzWebEventCalls(EzWebEvent.onRoomCreated, {"Room":data.Room[0], "Players":data.Players});
            }
        });
    }
    
    function leaveRoom()
    {
        $.ajax({
      		url: EzWebGameURL + "Room/Leave/" + Key 
       	}).done(function(data) {
      		console.log(data);
            data = JSON.parse(data);
            Key = data.cKey;
            if(data.Wrong)alert(data.Wrong);
            else
			{
				closeRequest();
				openRequest();
				EzWebEventCalls(EzWebEvent.onRoomLeaved);
			}
        });
    }
    
    function joinRoom(roomId)
    {
        $.ajax({
      		url: EzWebGameURL + "Room/join/" +roomId+'/'+ Key 
       	}).done(function(data) {
      		console.log(data);
            data = JSON.parse(data);
            Key = data.cKey;
            TurnId = 0;
            if(data.Wrong)alert(data.Wrong);
            else
			{
				closeRequest();
				openRequest();
				EzWebEventCalls(EzWebEvent.onRoomJoined,{"Room":data.Room[0], "Players":data.Players});
			}
        });
    }
    
    function listRoomPlayers()
    {
        $.ajax({
      		url: EzWebGameURL + "Room/ListRoomPlayers/" + Key 
       	}).done(function(data) {
      		console.log(data);
            data = JSON.parse(data);
            Key = data.cKey;
            if(data.Wrong)alert(data.Wrong);
        });
    }
    
    function onReceiveFirstCKey(data)
    {
        if(data.Wrong!=null)
        {
            EzWebEventCalls(EzWebEvent.onLoginFail, data.Wrong)
        }
        else
        {
            Key = data.cKey;
            EzWebEventCalls(EzWebEvent.onLoginSuccess)
        }
    }
    
	function openRequest()
	{
		eventSSE = new EventSource(EzWebGameURL + 'Event/Request/' + Key);
		console.log('openRequest()');
        
		eventSSE.onmessage = function (event) {
			console.log(event.data);
			events = JSON.parse(event.data).Events;
            //console.log(new Date() + ": " + event.data);
			for(var i=0; i<events.length ; i++)
			{
				switch(events[i]["Type"])
				{
					case 'RefreshRoomList':
						EzWebEventCalls(EzWebEvent.onListRoomDone, events[i]["Param"]);
						break;
					case 'roomChanged':
						EzWebEventCalls(EzWebEvent.onRoomChanged, events[i]["Param"]);
						break;
					case 'start':
						EzWebEventCalls(EzWebEvent.onRoomStarted, events[i]["Param"]);
						break;
					case 'turn':
						var param = JSON.parse(events[i]["Param"].replace("\\\"","\""));
                        TurnId = param.userId;
						EzWebEventCalls(EzWebEvent.onChangeTrun, param);
						break;
                    case 'message':
				        EzWebEventCalls(EzWebEvent.onReceiveStep, events[i]["Param"]);
                        break;
					default:
						console.log(new Date() + "=> " + events[i]["Type"] + ':' + events[i]["Param"]);
				}
			}
		};
		eventSSE.onerror = function (event) {
			console.log('eventSSE Error');
			event.target.close();
			openRequest();
		}
	}
	
	function closeRequest()
	{
		eventSSE.close();
		console.log('User Close Request');
	}
	
	function startRoom()
	{
		$.ajax({
      		url: EzWebGameURL + "Exec/Start/" + Key 
       	}).done(function(data) {
      		console.log(data);
            data = JSON.parse(data);
            Key = data.cKey;
            if(data.Wrong)alert(data.Wrong);
			else
			{
				EzWebEventCalls(EzWebEvent.onRoomStarted, {"Players":data.Players});
			}
        });
	}
	
    function getUserId()
    {
        var infos = Key.split("_");
        return infos[1];
    }
    
    function isTurnSelf()
    {
        return TurnId == getUserId();
    }
    
    function EzWebEventCalls(onEzWebEvent, data)
    {
        if(onEzWebEvent)
        {
            console.log(onEzWebEvent.name + ": " + JSON.stringify(data));
            onEzWebEvent(data);
        }
        else
        {
            console.log("Not Found This Event: " + onEzWebEvent.toString());
        }
    }
    
    function nextRound()
    {
        $.ajax({
      		url: EzWebGameURL + "Exec/NextRound/" + Key 
       	}).done(function(data) {
      		console.log(data);
            data = JSON.parse(data);
            Key = data.cKey;
            if(data.Wrong)alert(data.Wrong);
			else
			{
                TurnId = data.NextRound.userId;
				EzWebEventCalls(EzWebEvent.onChangeTrun, data.NextRound);
			}
        });
    }
    
    function sendMessage(instruction)
    {
        $.ajax({
      		url: EzWebGameURL + "Exec/SendMessage/" + Key,
            type: "POST",
            data: {message: instruction}
       	}).done(function(data) {
      		console.log(data);
            data = JSON.parse(data);
            Key = data.cKey;
            if(data.Wrong)alert(data.Wrong);
			else
			{
                console.log("Send: " + instruction);
			}
        });
    }
    
    function arriveFinalStep()
    {
        
    }
    
    return {
        // Prototype
        cKey: onReceiveFirstCKey,
        openSSE: openRequest,
		isTurnSelf: isTurnSelf,
        
        // User
        login: login,
        logout: logout,
        
        // Game
        listRoomInfos: listRooms,
        
        // Room
        createGameRoom: createRoom,
        leaveGameRoom: leaveRoom,
        joinGameRoom: joinRoom,
		startGameRoom: startRoom,
		
        // Exec
        doStep: sendMessage,
        finishStep: nextRound,
        finishGame: arriveFinalStep
    }
})();