function loadMusic() {
    //document.querySelector(".options").setAttribute("class","options show");
    document.querySelector(".back_to_options").setAttribute("class","back_to_options show");
    //document.getElementById("penis").classList.toggle("hidden");
    //document.querySelector(".options").setAttribute("class","options show");
    // das soll mit dem click auf sound aufgerufen werden in gleicher struktur
    // problem ID klasse?
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