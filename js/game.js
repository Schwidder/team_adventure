(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})(); //game loop

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 604, 
    height = 404, 
    player = {
        width: 25,
        height: 25, 
        x: 250, //width 
        y: 40,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        life: 3
    },
    keys = [],
    friction = 0.75, // slide Faktor
    gravity = 0.20;

// Variablen sezten
var starttime = Date.now();
var pausetime = 0;
var blockSize;
var boxes = [], milk = [], cookie = [], fallenemy = [], vertenemy = [], slowfallenemy = [];
var cookie_current = 0;
var current_level, current_level_id = 0, game_status = 0, next_level_id = 0;
var respawn = {x:0,y:0};
var map_shift_x = 0;
var map_shift_y = 0;

creatLevel(current_level_id);
startAnimation();

// Funktion zum nächsten Level
function nextLevel()
{
    current_level_id++;
    setLevel(current_level_id);
}
function tryAgainLevel()
{
    setLevel(current_level_id);
}
function setChangeLevel(level_id)
{
    next_level_id = level_id;
    game_status = 4;
    document.querySelector(".change").setAttribute("class", "change show");
    updatePausetime();
}
function startChangeLevel()
{
    setLevel(next_level_id);
    current_level_id = next_level_id;
    document.querySelector(".change").setAttribute("class","change hidden");
}
function setLevel(level_id) {
    cookie_current = 0;
    creatLevel(level_id);
    map_shift_x = 0;
    map_shift_y = 0;

    document.querySelector(".win").setAttribute("class","win hidden");
    document.querySelector(".gameover").setAttribute("class","gameover hidden");
    document.querySelector(".win .game_states").innerHTML = "";
    pausetime = 0;
    starttime = Date.now();
    game_status = 0;
    player.life = 3;
    update();
}


// Sounds
var eatSound;
var loseSound;
var jumpSound;

eatSound = new sound("../sounds/cookie.wav");
loseSound = new sound("../sounds/death.wav");
jumpSound = new sound("../sounds/jump.wav");
winSound = new sound("../sounds/win.wav");

// Sound construktor
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
}

// Quit game
function quit(){
    window.location.href = "../index.html";
}

// Pause time for continue
function updatePausetime() {
    pausetime = pausetime + (Date.now()-starttime);
}

// Gamemenü aufrufen
function gamemenu(){
    updatePausetime();
    document.querySelector(".options").setAttribute("class","options show");
}

// Options continue game
function continueGame(){
    document.querySelector(".options").setAttribute("class","options hidden");
    document.querySelector(".change").setAttribute("class","change hidden");
    starttime = Date.now();
    game_status = 0;
    requestAnimationFrame(update);    
}


function setGameHighscore(){
    document.getElementById("game_level").querySelector("span").innerHTML = (current_level_id+1);
    var highscoreContent = '';
    for(var i=0; i<highscore.length; i++){
        highscoreContent += '<div class="row"><a onclick="setChangeLevel('+i+')">Lvl'+highscore[i].lvl_id+': </a><span>'+highscore[i].score+'</span></div>'
    }
    document.getElementById("game_highscore").innerHTML = highscoreContent;
}

// Level erstellen
function creatLevel(id) {
    current_level = levels[id];
    canvas.width = width;
    canvas.height = height;
    blockSize = 25;
    setGameHighscore();

// Arrays von Spielobjekten
    boxes = [];
    milk = [];
    fallenemy = [];
    slowfallenemy = [];
    vertenemy = [];
    cookie = [];


    creatPlattform();
    creatMilk();
    creatCookies();
    creatSlowFallEnemy();
    creatFallEnemy(current_level.fallenemy);
    creatVertEnemy();

    // cookie counter
    for (var i in cookie) {
        if (cookie[i].alive == 1) {
            cookie_current = cookie_current + 1;
        }
    }

    // set Player position
    console.log("Level player position= " + current_level.player.x + ":" + current_level.player.y);
    player.x = (current_level.player.x) * blockSize;
    player.y = (current_level.player.y) * blockSize;
    respawn.x = player.x;
    respawn.y = player.y;
}

// Gameobjekte erstellen
function creatPlattform() {
    for (var b in current_level.walls) {
        var block = current_level.walls[b];
        boxes.push({
            x: block.x * blockSize,
            y:  block.y * blockSize,
            width: blockSize,
            height: blockSize
        });
    }
}
function creatMilk() {
    for (var b in current_level.milk) {
        var block = current_level.milk[b];
        milk.push({
            x: block.x * blockSize,
            y: block.y * blockSize,
            width: blockSize,
            height: blockSize
        });
    }
}
function creatFallEnemy() {
    for (var b in current_level.fallenemy) {
        var block = current_level.fallenemy[b];
        fallenemy.push({
            x: block.x * blockSize,
            y: block.y * blockSize,
            spawnY: block.spawnY,
            width: blockSize,
            height: blockSize
        });
    }
}
function creatSlowFallEnemy() {
    for (var b in current_level.slowfallenemy) {
        var block = current_level.slowfallenemy[b];
        slowfallenemy.push({
            x: block.x * blockSize,
            y: block.y * blockSize,
            spawnY: block.spawnY,
            width: blockSize,
            height: blockSize
        });
    }
}
function creatVertEnemy() {
    for (var b in current_level.vertenemy) {
        var block = current_level.vertenemy[b];
        vertenemy.push({
            x: block.startX * blockSize,
            y: block.y * blockSize,
            startX: block.startX * blockSize,
            endX: block.endX * blockSize,
            moveDirection: 1,
            width: blockSize,
            height: blockSize
        });
        //console.log("FALLENEMY" + fallenemy[b].y);
    }
}
function creatCookies() {
    for (var b in current_level.cookies) {
        var block = current_level.cookies[b];
        cookie.push({
            x: block.x * blockSize,
            y: block.y * blockSize,
            width: blockSize,
            height: blockSize,
            alive: 1
        });
    }
}

// Respawn
function checkToRespawn() {
    player.velX=0; player.velY=0;
    if (player.life > 1) {
        loseSound.play();
        player.life = player.life - 1;
        player.x = respawn.x; //Spawnfix
        player.y = respawn.y;

    }
    else {
        loseSound.play();
        document.querySelector(".gameover").setAttribute("class","gameover show");
        document.querySelector(".game_states").innerHTML = "Time: "+ Math.round(
            (Date.now()-starttime+pausetime)/1000
        ) + " Seconds";

        var nextlink = "";
        if((levels.length-1) != current_level_id) {
            nextlink = '<a class="button" onclick="nextLevel()">Skip level</a>';
        }
        document.querySelector(".gameover").querySelector(".nextLevel").innerHTML = nextlink;
        starttime= Date.now();
        console.log("game over");
        game_status = 2;
    }
}

// Collision player dead
function collisionForDying() {
    for (var i = 0; i < milk.length; i++) {
        var dir1 = colCheck(player, milk[i]);
        if (dir1 === "l" || dir1 === "r" || dir1 === "b" || dir1 === "t") {
            checkToRespawn();
        }
    }
    for (var i = 0; i < fallenemy.length; i++) {
        var dir1 = colCheck(player, fallenemy[i]);
        if (dir1 === "l" || dir1 === "r" || dir1 === "b" || dir1 === "t") {
            checkToRespawn();
        }
    }
    for (var i = 0; i < slowfallenemy.length; i++) {
        var dir1 = colCheck(player, slowfallenemy[i]);
        if (dir1 === "l" || dir1 === "r" || dir1 === "b" || dir1 === "t") {
            checkToRespawn();
        }
    }
    for (var i = 0; i < vertenemy.length; i++) {
        var dir1 = colCheck(player, vertenemy[i]);
        if (dir1 === "l" || dir1 === "r" || dir1 === "b" || dir1 === "t") {
            checkToRespawn();
        }
    }
}

// Collision Platform
function collisionBox() {
    for (var i = 0; i < boxes.length; i++) {

        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
    }
}

// Collision Cookie
function collisionCookie() {
    for (var i = 0; i < cookie.length; i++) {
        if(cookie[i].alive == 1)
        {
            var dir2 = colCheck(player, cookie[i]);

            if (dir2 === "l" || dir2 === "r" || dir2 === "b" || dir2 === "t") {
                
                //Cookie -- and disappear
                cookie[i].alive = 0;
                eatSound.play();
                cookie_current = cookie_current -1;
                console.log("ABZUG:" + cookie_current);
                if(cookie_current == 0)
                {
                    winSound.play();
                    document.querySelector(".win").setAttribute("class","win show");
                    document.querySelector(".win .game_states").innerHTML = "Time needed: "+ Math.round((Date.now()-starttime+pausetime)/1000)+ " Seconds";
                    if(highscore[current_level_id].score == 0
                        || highscore[current_level_id].score > Math.round((Date.now()-starttime+pausetime)/1000)) {
                        highscore[current_level_id].score = Math.round((Date.now() - starttime + pausetime) / 1000);
                    }
                    var nextlink;
                    if((levels.length-1) == current_level_id) {
                        nextlink = '<a class="button" onclick="(function(){location.reload(true);})();">Back to Level 1</a>';
                    }
                    else {
                        nextlink = '<a class="button" onclick="nextLevel()">Next level</a>';
                    }
                    document.querySelector(".win").querySelector(".nextLevel").innerHTML = nextlink;
                    updatePausetime();
                    game_status = 1;
                }
            }

        }

    }
}

// Collision dropping Milk
function collisionFallingEnemy(enemy) {
    for(var x = 0; x < enemy.length; x++) {
        for (var i = 0; i < boxes.length; i++) {

            var dir = colCheck(enemy[x], boxes[i]);

            if (dir === "b") {
                enemy[x].y = enemy[x].spawnY * blockSize;
            }
        }
    }
}

// Dropping Milk Bewegung
function fallingEnemyMovement(enemy, speed) {
    for(var x = 0; x < enemy.length; x++)
    {
        enemy[x].y += speed * gravity;
        if(enemy[x].y >= current_level.height * blockSize)
        {
            enemy[x].y = enemy[x].spawnY * blockSize;
        }
    }
}


function verticalEnemyMovement() {
    for(var x = 0; x < vertenemy.length; x++)
    {
        vertenemy[x].x += 2 * vertenemy[x].moveDirection;
        if(vertenemy[x].x >= vertenemy[x].endX || vertenemy[x].x <= vertenemy[x].startX){
            vertenemy[x].moveDirection = vertenemy[x].moveDirection * (-1);
        }
    }

}

// update checks for keys
function update() {
    if (keys[65]) {
        // A
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    if (keys[68]) {
        // D
        if (player.velX < player.speed) {
            player.velX++;
        }
    }

    if (keys[87]) {
        // W
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            jumpSound.play();
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }

    if (keys[27]) {
        // esc,
        gamemenu();
        game_status = 2;
    }

    player.velX *= friction; 
    player.velY += gravity;

    //box zeichnen
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    player.grounded = false;

    collisionForDying();
    collisionBox();
    collisionCookie();
    collisionFallingEnemy(fallenemy);
    collisionFallingEnemy(slowfallenemy);

    if(player.grounded){
         player.velY = 0;
    }
    
    //player movements
    player.x += player.velX;   
    player.y += player.velY;

    fallingEnemyMovement(fallenemy, 14);
    fallingEnemyMovement(slowfallenemy, 4);
    verticalEnemyMovement();


    if (player.y >= (current_level.height * blockSize)) {
        console.log("fall");
        checkToRespawn();
    }

    map_shift_x = Math.max(0, player.x - width/2);
    map_shift_y = Math.max(0, player.y - height/2);

    drawBackground(current_level);
    drawPlayer(player);

    if(game_status == 0) {
        updateGameInfo();
        requestAnimationFrame(update);
    }

}

// Game information
function updateGameInfo() {
    var lifes = "";
    for(var i=0; i<3; i++){
        if(i >= player.life) {
            lifes = lifes + '<img src=\"../assets/ui/null_life.png\" width=\"20\" height=\"20\" />';
        }
        else{
            lifes = lifes + '<img src=\"../assets/ui/full_life.png\" width=\"20\" height=\"20\" />';
        }
    }
    document.getElementById("game_cookies").querySelector("span").innerHTML = cookie_current;
    document.getElementById("game_life").innerHTML = lifes;
    document.getElementById("game_time").querySelector("span").innerHTML = Math.round((Date.now()-starttime+pausetime)/1000);
}

    // Nach Collesion checken
function colCheck(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        collisionDirection = null;

    // Collesion von verschiedenen Richtungen
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                collisionDirection = "t"; // Top collision
                shapeA.y += oY;
            } else {
                collisionDirection = "b"; // Bottom collision
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                collisionDirection = "l"; // Left collision
                shapeA.x += oX;
            } else {
                collisionDirection = "r"; // Right collision
                shapeA.x -= oX;
            }
        }
    }
    return collisionDirection;
}



document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});