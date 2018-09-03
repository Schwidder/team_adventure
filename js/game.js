(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})(); //game loop

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 604, //500
    height = 404, //200
    player = {
        width: 20,
        height: 20, 
        x: 250, //width / 2
        y: 40,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        life: 3
    },
    keys = [],
    friction = 0.75, // a lower number makes you slide less, a higher number makes you slide more
    gravity = 0.50;


var starttime = Date.now();
var blockSize;
var highestLevelPosition;
var boxes = [], lava = [], coin = [];
var coin_current = 0;
var current_level, game_status = 0;
var respawn = {x:0,y:0};

creatLevel();

// Erstellt ein Bildobjekt für den Blöcke
var boden = new Image(); 
boden.src = "../assets/boden/boden.png";

// Erstellt ein Bildobjekt für den Lava
var ilava = new Image(); 
ilava.src = "../assets/lava/lava_1.png";

// Erstellt ein Bildobjekt für den Cookie
var cookie = new Image(); 
cookie.src = "../assets/coin/cookie.png";

// Sounds
var eatSound;
var loseSound;
var jumpSound;

eatSound = new sound("../sounds/cookie.wav");
loseSound = new sound("../sounds/losing.wav");
jumpSound = new sound("../sounds/jump.wav");

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
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function creatLevel() {
    current_level = levels[0];
    canvas.width = width;
    canvas.height = height;
    blockSize = 10;
    highestLevelPosition = height - ((current_level.height) * blockSize);
    // 4 below = framework

    boxes.push({    // left wall
        x: 0,
        y: 0,
        width: 2,
        height: height
    });
    boxes.push({    // right
        x: width - 2,
        y: 0,
        width: 50,
        height: height
    });
    boxes.push({    // top
        x: 0,
        y: 0,
        width: width,
        height: 2
    });
    boxes.push({    // bottom
        x: 0,
        y: height - 2,
        width: width,
        height: 50
    });

    creatPlattform();
    creatLava();
    creatCoins();
    // coin counter
    for (var i in coin) {
        if (coin[i].alive == 1) {
            coin_current = coin_current + 1;
        }
    }
    // set Player position
    console.log("Level player position= " + current_level.player.x + ":" + current_level.player.y);
    player.x = (current_level.player.x) * blockSize;
    player.y = (current_level.player.y) * blockSize;
    respawn.x = player.x;
    respawn.y = player.y;

}


function creatPlattform() {
    //platform
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
function creatLava() {
    for (var b in current_level.lava) {
        var block = current_level.lava[b];
        lava.push({
            x: block.x * blockSize,
            y: block.y * blockSize,
            width: blockSize,
            height: blockSize
        });
    }
}
function creatCoins() {
    for (var b in current_level.coins) {
        var block = current_level.coins[b];
        coin.push({
            x: block.x * blockSize,
            y: block.y * blockSize,
            width: blockSize,
            height: blockSize,
            alive: 1
        });
    }
}

function collisionLava() {
    for (var i = 0; i < lava.length; i++) {

        var dir1 = colCheck(player, lava[i]);

        if (dir1 === "l" || dir1 === "r" || dir1 === "b" || dir1 === "t") {
            if (player.life > 1) {
                player.life = player.life - 1;
                player.x = respawn.x; //Spawnfix
                player.y = respawn.y;
                
            }
            else {
                //player.life == 0;
                //player.life = player.life - 1;
                loseSound.play();
               // alert("GAME OVER");
                document.querySelector(".gameover").setAttribute("class","gameover show");
                document.querySelector(".game_states").innerHTML = "Time: "+ Math.round((Date.now()-starttime)/1000);
                console.log("game over");
                game_status = 2;
               // location.reload(true); // to the menu /deathscreen
               // document.getElementById("gameover").innerHTML = "Life: ";
               //document.getElementById("canvas").style.visibility = "hidden";
               //document.getElementById("game-over").style.visibility = "visible";  
               //$('#gameover').show();
                //ob.continue()
            }
        }
    }
}
function collisionBox() {
    for (var i = 0; i < boxes.length; i++) {
        drawBlock(i);

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
function collisionCoin() {
    for (var i = 0; i < coin.length; i++) {
        if(coin[i].alive == 1)
        {
            var dir2 = colCheck(player, coin[i]);

            if (dir2 === "l" || dir2 === "r" || dir2 === "b" || dir2 === "t") {
                //coin-- and disappear
                coin[i].alive = 0;
                eatSound.play();
                coin_current = coin_current -1;
                console.log("ABZUG:" + coin_current);
                if(coin_current == 0)
                {
                    alert("WIN");

                    location.reload(true);
                   //win menu --> next level
                }
            }

        }

    }
}

function update() {
    // check keys
    if (keys[37]) {
        // left arrow

        console.log('links');

        if (player.velX > -player.speed) {
            player.velX--;
        }
        
    }

    if (keys[39]) {
        // right arrow,

    
        console.log('rechts');

        if (player.velX < player.speed) {
            player.velX++;
        }
    }

    if (keys[38]) {
        // up arrow
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            jumpSound.play();
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }

    if (keys[27]) {
        // esc, 
        //game freeze + menu laden
        alert("Hello! I am an alert box!!");
    }

    player.velX *= friction; //both update loop
    player.velY += gravity;

    //box zeichnen
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();

    player.grounded = false;

    collisionLava();
    collisionBox();
    collisionCoin();

    if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;   //player movements
    player.y += player.velY;

    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }
    drawBackground();
    drawPlayer();


    // Game information
    document.getElementById("game_coins").innerHTML = "Coins: " + coin_current;
    document.getElementById("game_life").innerHTML = "Life: " + player.life;
    document.getElementById("game_time").innerHTML = "Time: "+ Math.round((Date.now()-starttime)/1000);
    //document.getElementById("music").innerHTML = "Menu";

    if(game_status == 0)
        requestAnimationFrame(update);

}

//

function colCheck(shapeA, shapeB) {
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
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