//Die Höhe und Breite des Sprites
var spriteWidth = 1598; 
var spriteHeight = 568; 

// Anzahl der Zeilen und Spalten des Sprites
var rows = 2; 
var cols = 6; 

//Die erste Zeile ist die Bewegung nach rechts
var trackRight = 0; 

//Die zweite zeile Bewegung nach links
var trackLeft = 1; 

//Die Höhe und Breite der einzelner Bildelemente ausrechnen
//weil alle Sprites die selbe Größe haben
var swidth = spriteWidth/cols; 
var sheight = spriteHeight/rows; 

//Anzahl der Bilder/Sprites
var curFrame = 0; 
var frameCount = 6; 

//x und y Kordinate um aus dem feld zu zeichnen
var srcX=0; 
var srcY=0; 

// Erstellt ein Bildobjekt für den Charakter
var character = new Image(); 
character.src = "../assets/player/walk/playerwalk.png";


function updateFrame(){
//Updated das Spriteelement anahnd des Indexes 
    curFrame = ++curFrame % frameCount; 

//Berechnet die X Koordinate des Sprites 
    if(keys[37]){
        //linkeanimation
        srcX = curFrame * swidth; 
        srcY = trackLeft * sheight; 
    }

    if (keys[39]) {
    //rechte Animation
        srcX = curFrame * swidth; 
        srcY = trackRight * sheight;
    }
// Löscht das vorherige Bild
   // ctx.clearRect(x,y,width,height);
}

// Zeichnet das Sprite
function drawPlayer(){
    //führt nach jedem zeichnen ein Update durch
    updateFrame();
    //Zeichnet das Bild //Position im Spritespeet:
    ctx.drawImage(
        character,
        srcX,
        srcY,
        swidth,
        sheight,
        player.x,
        player.y,
        player.width,
        player.height);

}
function drawBackground(){
    console.log("STart draw");
    ctx.beginPath();

    //Lava
    drawLava();
    // Cookie
    drawCookie();

    ctx.fill();
}

function drawBlock(i) {
    ctx.drawImage(
        boden,
        0,
        0,
        70,
        70,
        boxes[i].x,
        boxes[i].y,
        boxes[i].width,
        boxes[i].height);
}
function drawLava() {
    for (var i = 0; i < lava.length; i++) {
        // ctx.rect(lava[i].x, lava[i].y, lava[i].width, lava[i].height);
        ctx.drawImage(
            ilava,
            0,
            0,
            1024,
            1024,
            lava[i].x,
            lava[i].y,
            lava[i].width,
            lava[i].height);
    }
}

function drawCookie() {
    for (var i = 0; i < coin.length; i++) {
        if ( coin[i].alive == 1){
            ctx.drawImage(
                cookie,
                0,
                0,
                162,
                162,
                coin[i].x,
                coin[i].y,
                coin[i].width,
                coin[i].height);
        }
    }
}
