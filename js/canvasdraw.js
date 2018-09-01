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

//x und y Kordinate zum Rändern des Sprites (Anfang) 
var x=0;
var y=0; 

//x und y Kordinate um aus dem feld zu zeichnen
var srcX=0; 
var srcY=0; 

//Bewegung erfassen
var left = false;
var right = false;


// holt das <canvas>-Element anhand seiner ID
var canvas = document.getElementById('canvas');


//Holt den 2D-Context
var ctx = canvas.getContext("2d");

// Erstellt ein Bildobjekt für den Charakter
var character = new Image(); 
character.src = "../assets/player/walk/playerwalk.png";


function updateFrame(){
//Updated das Spriteelement anahnd des Indexes 
    curFrame = ++curFrame % frameCount; 

//Berechnet die X Koordinate des Sprites 
    srcX = curFrame * width; 

// Löscht das vorherige Bild
    ctx.clearRect(x,y,width,height);
}

// Zeichnet das Sprite
function drawPlayer(){
//führt nach jedem zeichnen ein Update durch 
updateFrame();

//Zeichnet das Bild //Position im Spritespeet:
ctx.drawImage        (character,srcX,srcY,width,height,

                    //Position in Canvas: Wo befindet sich der Spieler und wie groß ist er?
                        player.x,player.y,width,height);

}

// Updatet die Funktion alle 100 milisekunden
setInterval(drawPlayer,100);