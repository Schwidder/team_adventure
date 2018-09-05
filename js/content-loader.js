function loadMusicSetting() {
    document.querySelector("#music_settings").setAttribute("class","show");
}

function closeMusicSetting() {
    document.querySelector("#music_settings").setAttribute("class","hidden");
}



function setVolume() {
    var myAudio = document.getElementById("audio_player");  
    myAudio.volume = 0.1; // set start volume
}

function setVolumebar() {
    var audio_player = document.getElementById("audio_player");
    audio_player.volume = document.getElementById("volumecontrol").value;
}

function openColseHelpMenu() {
    if(document.getElementById("helps").getAttribute("class") == "rollout") {
        document.getElementById("helps").setAttribute("class", "rollin");
    }else {
        document.getElementById("helps").setAttribute("class", "rollout");
    }
}