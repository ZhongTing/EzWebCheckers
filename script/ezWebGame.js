var EzWebGame = (function(){
    var EzWebGameURL = "http://127.0.0.1/GameRound/";
    var Key = '';
    var LocalLoginURL = "./login.php";
    
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
            else EzWebEventCalls(EzWebEvent.onRoomLeaved);
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
        leaveGameRoom: leaveRoom
        
        // Exec
    }
})();