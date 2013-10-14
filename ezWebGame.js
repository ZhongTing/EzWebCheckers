var EzWebGameURL = "http://localhost/GameRound/";

function signup(name,account,password)
{
	$.ajax({
		url: EzWebGameURL + "user/signup/"+name+'/'+account+'/'+password,
	}).done(function(data) {
		console.log(data);
	});
}