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
    });
}

function listRoomInfos()
{
    $.ajax({
  		url: EzWebGameURL + "Room/ListRoomInfos/"+Key
   	}).done(function(data) {
  		console.log(data);
        data = JSON.parse(data);
        Key = data.cKey;
        if(onListRoomDone)
        {
            onListRoomDone(data.Room);
        }
    });
}