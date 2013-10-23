var EzWebGame = (function(){
    var EzWebGameURL = "http://127.0.0.1/GameRound/";
    var LocalLoginURL = "./login.php";
    var TurnId = 0;
	var gamePlayers = [];//遊戲開始的玩家
	
	var request = (function(){
        var queue = [];
        var Key = '';
        var LastKey = '';
        var eventSSE;
        
        function receiveKey(key)
        {
            if(queue.length > 0)
            {
                var node = queue.shift();
                node.requestObject.url += key;
                $.ajax(node.requestObject).done(node.doneRequest);
            }
            else
            {
                LastKey = key;
                Key = key;
            }
        }
        
        function send(requestObject, doneRequest)
        {
            if(Key != '')
            {
                requestObject.url += Key;
                Key = '';
                $.ajax(requestObject).done(doneRequest);
            }
            else
            {
                queue.push({"requestObject":requestObject, "doneRequest":doneRequest});
            }
        }
        
        function clean()
        {
            Key = '';
            LastKey = '';
        }
        
        function openSSE()
        {
            eventSSE = new EventSource(EzWebGameURL + 'Event/Request/' + LastKey);
			console.log('openRequest()');
			
			eventSSE.onmessage = function (event) {
				console.debug(event.data);
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
							gamePlayers = events[i]["Param"].Players;
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
                        case 'checkWin':
                            var param = JSON.parse(events[i]["Param"].replace("\\\"","\""));
							EzWebEventCalls(EzWebEvent.onCheckWin, param.WinnerId);
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
        
        function closeSSE()
        {
            eventSSE.close();
            console.log('User Close Request');
        }
        
        function getId()
        {
            var infos = LastKey.split("_");
            return infos[1];
        }
        
        return {
            receiveKey: receiveKey,
            send: send,
            clean: clean,
            openSSE: openSSE,
            closeSSE: closeSSE,
            getUserId: getId
        }
	})();
    
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
        var requestObject = {
      		url: EzWebGameURL + "user/logout/"
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            request.clean();
			closeRequest()
            EzWebEventCalls(EzWebEvent.onLogout);
        }
    }
    
    function listRooms()
    {
        var requestObject = {
      		url: EzWebGameURL + "Room/ListRoomInfos/"
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            EzWebEventCalls(EzWebEvent.onListRoomDone, data.Room);
        }
    }
    
    function createRoom(title,minPlayer,maxPlayer)
    {
        var requestObject = {
      		url: EzWebGameURL + "Room/Create/" + title + "/" + minPlayer + "/" + maxPlayer + "/" 
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            TurnId = 0;
            if(data.Wrong)alert(data.Wrong);
            else
            {
				closeRequest();
				openRequest();
                var object = new Array();
                EzWebEventCalls(EzWebEvent.onRoomCreated, {"Room":data.Room[0], "Players":data.Players});
            }
        }
    }
    
    function leaveRoom()
    {
        var requestObject = {
      		url: EzWebGameURL + "Room/Leave/"
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            if(data.Wrong)alert(data.Wrong);
            else
			{
				closeRequest();
				openRequest();
				EzWebEventCalls(EzWebEvent.onRoomLeaved);
			}
        }
    }
    
    function joinRoom(roomId)
    {
        var requestObject = {
      		url: EzWebGameURL + "Room/join/" +roomId+"/"
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            TurnId = 0;
            if(data.Wrong)alert(data.Wrong);
            else
			{
				closeRequest();
				openRequest();
				EzWebEventCalls(EzWebEvent.onRoomJoined,{"Room":data.Room[0], "Players":data.Players});
			}
        }
    }
    
    function listRoomPlayers()
    {
        var requestObject = {
      		url: EzWebGameURL + "Room/ListRoomPlayers/"
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            if(data.Wrong)alert(data.Wrong);
        }
    }
    
    function onReceiveFirstCKey(data)
    {
        if(data.Wrong!=null)
        {
            EzWebEventCalls(EzWebEvent.onLoginFail, data.Wrong)
        }
        else
        {
            request.receiveKey(data.cKey);
            EzWebEventCalls(EzWebEvent.onLoginSuccess)
        }
    }
    
	function openRequest()
	{
		request.openSSE();
	}
	
	function closeRequest()
	{
		request.closeSSE();
	}
	
	function startRoom()
	{
	    var requestObject = {
      		url: EzWebGameURL + "Exec/Start/"
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            if(data.Wrong)alert(data.Wrong);
			else
			{
				EzWebEventCalls(EzWebEvent.onRoomStarted, {"Players":data.Players});
                gamePlayers = data.Players;
			}
        }
	}
	
    function getUserId()
    {
        return request.getUserId();
    }
    
    function getUserTurnOrder()
    {
        var userId = request.getUserId();
        for(var order in gamePlayers)
            if(gamePlayers[order].userId == userId)
				return order;
    }
	
    function getNowTurnUserOrder()
    {
        for(var order in gamePlayers)
            if(gamePlayers[order].userId == TurnId)
				return order;
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
        var requestObject = {
      		url: EzWebGameURL + "Exec/NextRound/"
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            if(data.Wrong)alert(data.Wrong);
			else
			{
                TurnId = data.NextRound.userId;
				EzWebEventCalls(EzWebEvent.onChangeTrun, data.NextRound);
			}
        }
    }
    
    function sendMessage(instruction)
    {
        var requestObject = {
      		url: EzWebGameURL + "Exec/SendMessage/",
            type: "POST",
            data: {message: instruction}
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            if(data.Wrong)alert(data.Wrong);
			else
			{
                console.log("Send: " + instruction);
			}
        }
    }
    
    function arriveFinalStep()
    {
        var requestObject = {
      		url: EzWebGameURL + "Exec/ArriveFinalStep/",
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            if(data.Wrong)alert(data.Wrong);
			else
			{
                console.log("Inform the Player, I Won");
			}
        }
    }
    
    function replyCheck(isWin)
    {
        var requestObject = {
      		url: EzWebGameURL + "Exec/Reply/" + isWin + "/",
       	};
        request.send(requestObject, doneRequest);
        function doneRequest(data)
        {
            console.debug(data);
            data = JSON.parse(data);
            request.receiveKey(data.cKey);
            if(data.Wrong)alert(data.Wrong);
			else
			{
                console.log("Reply The Player is or isn't Win");
			}
        }
    }
    
    return {
        // Prototype
        cKey: onReceiveFirstCKey,
        openSSE: openRequest,
		isTurnSelf: isTurnSelf,
        getNowTurnUserOrder:getNowTurnUserOrder,
        getUserTurnOrder:getUserTurnOrder,
		getUserId:getUserId,
        
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
        finishGame: arriveFinalStep,
        replyCheck: replyCheck
    }
})();