(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})(); //game loop

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200,
    player = {
        width: 8,
        height: 8, 
        x: 250, //width / 2
        y: 200
        ,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false,
        life: 3
    },
    keys = [],
    friction = 0.75, // a lower number makes you slide less, a higher number makes you slide more
    gravity = 0.25;


 

// 4 below = framework
// AUSLAGERN??
var boxes = [];

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

//platform

boxes.push({
    x: 120,
    y: 10,
    width: 80,
    height: 80
});
boxes.push({
    x: 170,
    y: 50,
    width: 80,
    height: 80
});
boxes.push({
    x: 220,
    y: 100,
    width: 80,
    height: 80
});
boxes.push({
    x: 270,
    y: 150,
    width: 40,
    height: 40
});


// lava

var lava = []

lava.push({
    x: 190,
    y: 20,
    width: 20,
    height: 5
});
lava.push({
    x: 290,
    y: 100,
    width: 10,
    height: 5
});


//

// coin

var coin = []

coin.push({
    x: 250,
    y: 30,
    width: 6,
    height: 6,
    alive: 1
});
coin.push({
    x: 380,
    y: 190,
    width: 6,
    height: 6,
    alive: 1

});
coin.push({
    x: 340,
    y: 190,
    width: 6,
    height: 6,
    alive: 1

});
coin.push({
    x: 50,
    y: 190,
    width: 6,
    height: 6,
    alive: 1
});

var coin_current = 0; //coin.length;


//
for (var i in coin)
{
    if (coin[i].alive == 1)
    {
        coin_current = coin_current + 1;
    }
}



canvas.width = width;
canvas.height = height;

function update() {
    // check keys
    if (keys[37]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }

    if (keys[39]) {
        // right arrow, 
        if (player.velX < player.speed) {
            player.velX++;
        }
    }

    if (keys[38]) {
        // up arrow
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
        }
    }

    player.velX *= friction; //both update loop
    player.velY += gravity;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black"; //box zeichnen
    ctx.beginPath();
    
    player.grounded = false;


//collesion lava
for (var i = 0; i < lava.length; i++) {
    ctx.rect(lava[i].x, lava[i].y, lava[i].width, lava[i].height);
    
    var dir1 = colCheck(player, lava[i]);

    if (dir1 === "l" || dir1 === "r" || dir1 === "b" || dir1 === "t") {
        if (player.life > 1)
        {
            player.life = player.life - 1;
            alert("YOU DIED!!!\n You have " + player.life + " lifes left ...");
            player.x = 250;
            player.y = 200;
        }
        else 
        {
            player.life = player.life - 1;   
            alert("GAME OVER")
            location.reload(true); // to the menu /deathscreen
        }
        
    } 


}


    //collesion box
    for (var i = 0; i < boxes.length; i++) {
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        
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




//collesion coin
for (var i = 0; i < coin.length; i++) {
    //ctx.rect(coin[i].x, coin[i].y, coin[i].width, coin[i].height);
    
    var counter = 0;

    if(coin[i].alive == 1)
    {
        var dir2 = colCheck(player, coin[i]);
    
    

    if (dir2 === "l" || dir2 === "r" || dir2 === "b" || dir2 === "t") {
        //coin-- and disappear
        coin[i].alive = 0;
        if (coin[i].alive == 0)
        {
            if(counter == 0)
            {
            coin_current = coin_current -1;
            console.log("ABZUG:" + coin_current);
            }

        }
        
    } 
}
    
}

//    
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
//
    ctx.fill();
    ctx.fillStyle = "red"; //lava zeichnen
    ctx.beginPath();
     
    for (var i = 0; i < lava.length; i++) {
        ctx.rect(lava[i].x, lava[i].y, lava[i].width, lava[i].height);
    }


    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "green";
    ctx.fillText("Coins:" + coin_current, 400, 30); 

    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.fillText("Lifes:" + player.life, 400, 50); 

 //
 ctx.fill();
 ctx.fillStyle = "yellow"; 
 ctx.beginPath();



//coin zeichnen
 for (var i = 0; i < coin.length; i++) {
     if ( coin[i].alive == 1)
     {
     ctx.arc(coin[i].x, coin[i].y,5,0, 2* Math.PI);
     ctx.closePath();
     }
     
    }



//
     
ctx.fill();
ctx.fillStyle = "blue"; //player zeichnen
ctx.fillRect(player.x, player.y, player.width, player.height);

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