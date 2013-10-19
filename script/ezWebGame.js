var EzWebGameURL = "http://127.0.0.1/GameRound/";
var Key = '';
var LocalLoginURL = "./login.php";

function signup(name,account,password)
{
	$.ajax({
		url: EzWebGameURL + "user/signup/"+name+'/'+account+'/'+password,
	}).done(function(data) {
		console.log(data);
	});
}

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
  		console.log(data);
        Key = '';
        if(onLogout)onLogout();
    });
}

function listRoomInfos()
{
    $.ajax({
  		url: EzWebGameURL + "Room/ListRoomInfos/"+Key
   	}).done(function(data) {
        data = JSON.parse(data);
        Key = data.cKey;
        if(onListRoomDone)
        {
            onListRoomDone(data.Room);
        }
    });
}

function createGameRoom(title,minPlayer,maxPlayer)
{
    $.ajax({
  		url: EzWebGameURL + "Room/Create/" + title + "/" + minPlayer + "/" + maxPlayer + "/" + Key 
   	}).done(function(data) {
  		console.log(data);
        data = JSON.parse(data);
        Key = data.cKey;
        if(data.Wrong)alert(data.Wrong);
        else if(onRoomCreated)onRoomCreated(data.Room[0] ,data.Player);
    });
}

function leaveGameRoom()
{
    $.ajax({
  		url: EzWebGameURL + "Room/Leave/" + Key 
   	}).done(function(data) {
  		console.log(data);
        data = JSON.parse(data);
        Key = data.cKey;
        if(data.Wrong)alert(data.Wrong);
        else if(onRoomLeaved)onRoomLeaved();
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
