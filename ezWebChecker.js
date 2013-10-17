function onLoginSuccess()
{
    $("#loginBtn").hide();
    $("#logoutBtn").show();
    listRoomInfos();
}
function onLoginFail(errorMsg)
{
    alert(errorMsg);
}
function onListRoomDone(roomInfos)
{
    console.log(JSON.stringify(roomInfos));
}
(function(){
    $("#logoutBtn").hide();
})();