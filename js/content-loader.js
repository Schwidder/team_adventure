function loadOptions() {
    document.getElementById("menu").setAttribute("include-html-content", "content/options.html");
    loadContent();
}

function loadMusic() {
    document.getElementById("menu").setAttribute("include-html-content", "content/music.html");
    loadContent();
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