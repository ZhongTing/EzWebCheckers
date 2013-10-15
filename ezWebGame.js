var EzWebGameURL = "http://localhost/GameRound/";
var gKey = "KlfQcRgxmNzzrjZRtH";
var Key;

function signup(name,account,password)
{
	$.ajax({
		url: EzWebGameURL + "user/signup/"+name+'/'+account+'/'+password,
	}).done(function(data) {
		console.log(data);
	});
}

function login(account,password)
{
    window.open(EzWebGameURL+'member/login/'+gKey, '', 'width=500, height=350');
}