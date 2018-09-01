//Die Höhe und Breite des Sprites
var spriteWidth = 865; 
var spriteHeight = 400; 

// Anzahl der Zeilen und Spalten des Sprites
var rows = 2; 
var cols = 5; 

//Die erste Zeile ist die Bewegung nach rechts
var trackRight = 0; 

//Die zweite zeile Bewegung nach links
var trackLeft = 1; 

//Die Höhe und Breite der einzelner Bildelemente ausrechnen
//weil alle Sprites die selbe Größe haben
var width = spriteWidth/cols; 
var height = spriteHeight/rows; 

//Anzahl der Bilder/Sprites
var curFrame = 0; 
var frameCount = 5; 

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
    srcX = curFrame * width; 

// Löscht das vorherige Bild
   // ctx.clearRect(x,y,width,height);
}

// Zeichnet das Sprite
function drawPlayer(){
//führt nach jedem zeichnen ein Update durch 
    updateFrame();

//Zeichnet das Bild //Position im Spritespeet:
ctx.drawImage        (character,srcX,srcY,width,height,

                    //Position in Canvas: Wo befindet sich der Spieler und wie groß ist er?
                    player.x, player.y, player.width, player.height);

}
function drawBackground(){

// Erstellt ein Bildobjekt für den Blöcke
var boden = new Image(); 
boden.src = "../assets/boden/boden.png";

// Erstellt ein Bildobjekt für den Lava
var ilava = new Image(); 
ilava.src = "../assets/lava/lava_1.png";

// Erstellt ein Bildobjekt für den Cookie
var cookie = new Image(); 
cookie.src = "../assets/coin/cookie.png";

// Erstellt ein Bildobjekt für den Charakter
var character = new Image(); 
character.src = "../assets/player/walk/player.png";

    ctx.drawImage        (character,0,0,560,600,
    player.x, player.y, player.width, player.height);

    //Block
    for (var i = 0; i < boxes.length; i++) {
        //ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        ctx.drawImage        (boden,0,0,70,70,
            boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
    
    }

    //Lava
    for (var i = 0; i < lava.length; i++) {
        // ctx.rect(lava[i].x, lava[i].y, lava[i].width, lava[i].height);
         ctx.drawImage        (ilava,0,0,1024,1024,
             lava[i].x, lava[i].y, lava[i].width, lava[i].height);
 
     }

    // Coin
    for (var i = 0; i < coin.length; i++) {
        if ( coin[i].alive == 1)
        {
            //ctx.arc(coin[i].x, coin[i].y,5,0, 2* Math.PI);
           // ctx.closePath();
            ctx.drawImage        (cookie,0,0,1533,695,
                coin[i].x, coin[i].y, coin[i].width, coin[i].height);
        }
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fill(); 
}