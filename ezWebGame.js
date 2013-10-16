var EzWebGameURL = "http://localhost/GameRound/";
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