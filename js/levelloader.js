var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var posX=0;
var posY=0;
var blockSize = 16;

var boden   = new Image();
var lava    = new Image();
var coin    = new Image();


console.log("levels", levelPlans.length);
for(var i=0; i < levelPlans.length;i++)
{
    var lvl_width = levelPlans[i][0].length;
    blockSize =  canvas.width / lvl_width;

    if (i==1) break;
    console.log("LEVEL "+i);
    for(var y=0;y < levelPlans[i].length;y++)
    {
        var row = levelPlans[i][y];
        console.log(row, "=>", row.length);
        for(var x=0; x<row.length;x++)
        {
            var c = row[x];

            console.log("checke ", x, y, " => ", c);

            var posX = x*blockSize;
            var posY = y*blockSize;

            if(c == 'x'){
                //ctx.drawImage(boden,posX,posY,32,32);
               ctx.beginPath();
                ctx.rect(posX,posY,blockSize,blockSize);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.closePath();
                console.log("wand");
            }

            if(c == '!'){
               //ctx.drawImage(lava,posX,posY,32,32);
               ctx.beginPath();
                ctx.rect(posX,posY,blockSize,blockSize);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
                console.log("lava");
            }

            if(c == 'o'){
               // ctx.drawImage(coin,posX,posY,32,32);
               ctx.beginPath();
                ctx.rect(posX,posY,blockSize,blockSize);
                ctx.fillStyle = "yellow";
                ctx.fill();
                ctx.closePath();
                console.log("coin");
            }
        }
    }
}
