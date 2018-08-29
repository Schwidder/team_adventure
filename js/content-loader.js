function loadGame() {
    document.getElementById("inner").setAttribute("include-html-content", "content/game.html");
    loadContent();
    setTimeout(function() {
        //getCanvas();
        console.log(document.getElementById("mycanvas"));
        initGame();
    }, 2000);
}

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

function loadContent() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html-content");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html-content");
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            console.log("finish loading");
            return true;
        }
    }
    return false;
}