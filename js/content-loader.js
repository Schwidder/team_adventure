function cookieController() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
    
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function loadMenu() {
    document.getElementById("inner").setAttribute("include-html-content", "content/menu.html");
    loadContent();
}

function loadGame() {
    document.getElementById("inner").setAttribute("include-html-content", "content/game.html");
    loadContent();
    setTimeout(function() {
        //getCanvas();
        console.log(document.getElementById("mycanvas"));
        initGame();
    }, 2000);
}
function loadImpressum() {
    document.getElementById("inner").setAttribute("include-html-content", "content/impressum.html");
    loadContent();
}
/* async function is not working
async function getCanvas() {
    try {
        let content = await loadContent();
        console.log(content);
        if (content) {
            console.log("wait on load success");
            initGame();
        }
        else{
            console.log("wait on load failed");
        }
    } catch (err) {
        console.log(err);
    }
}//*/

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