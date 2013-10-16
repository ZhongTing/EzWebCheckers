<?php
    $gKey = "KlfQcRgxmNzzrjZRtH";
    $EzWebGameURL = "http://127.0.0.1/GameRound/";
    $getLKeyURL = $EzWebGameURL.'game/loadEzWebGameLib/'.$gKey;
    $lKey = file_get_contents($getLKeyURL);
    $loginURL = $EzWebGameURL.'member/login/'.$lKey;
    echo "window.open('".$loginURL."', '', 'width=500, height=350')";
?>