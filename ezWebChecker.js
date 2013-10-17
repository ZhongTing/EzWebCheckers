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

function onLogout()
{
    init();   
}

function onListRoomDone(roomInfos)
{
    console.log(JSON.stringify(roomInfos));
}

(function(){
    init();
})();

//check local function
function init()
{
    $("#loginBtn").show();
    $("#logoutBtn").hide();
}