var EzWebGame = (function(){
    var EzWebGameURL = "http://127.0.0.1/GameRound/";
    var Key = '';
    var LocalLoginURL = "./login.php";
    var SSE;
	
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
            if(data.Wrong)alert(data.Wrong);
            else
            {
				openRequest();
                var object = new Array();
                EzWebEventCalls(EzWebEvent.onRoomCreated, {"Room":data.Room[0], "Players":data.Player});
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
            if(data.Wrong)alert(data.Wrong);
            else
			{
				openRequest();
				EzWebEventCalls(EzWebEvent.onRoomJoined,{"Room":data.Room[0], "Players":data.Player});
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
		SSE = new EventSource(EzWebGameURL + 'Event/Request/' + Key);
		console.log('openRequest()');
        
		SSE.onmessage = function (event) {
			events = JSON.parse(event.data);
            console.log(new Date() + ": " + event.data);
			for(var i=0; i<events.length ; i++)
			{
				console.log(events[i]["Type"] + ':' + events[i]["Param"]);
			}
		};
		SSE.onerror = function (event) {
			console.log('SSE Error');
			event.target.close();
			openRequest();
		}
	}
	
	function closeRequest()
	{
		SSE.close();
		console.log('User Close Request');
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
            console.log("Not Found This Event: " + onEzWebEvent.name);
        }
    }
    
    return {
        // Prototype
        cKey: onReceiveFirstCKey,
        
        // User
        login: login,
        logout: logout,
        
        // Game
        listRoomInfos: listRooms,
        
        // Room
        createGameRoom: createRoom,
        leaveGameRoom: leaveRoom,
        joinGameRoom: joinRoom
        // Exec
    }
})();