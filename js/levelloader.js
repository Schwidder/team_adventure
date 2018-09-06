
function constructor(lvl)
{
    var Level =
        {
            walls: [],

            lava: [],
            horizenemy: [],
            vertenemy: [],
            fallenemy: [],

            cookies: [],
            player: [],
            width: 0,
            height: 0
        };

    Level.width = lvl[0].length;
    Level.height = lvl.length;
        

    for(var y=0; y < lvl.length; y++)
    {
        var row = lvl[y];
        //console.log(row, "=>", row.length);
        for(var x=0; x<row.length;x++)
        {
            var c = row[x];

            var posX = x;
            var posY = y;
            switch(c) {
                case 'x':
                    Level.walls.push({
                        x: posX,
                        y: posY
                    });
                    break;
                case '!':
                    Level.lava.push({
                        x: posX,
                        y: posY
                    });
                    //console.log("l:" + Level.lava.x + "=" + posX + "_" + Level.lava.y + "=" + posY);
                    break;
                case '$':
                    Level.player.x = posX;
                    Level.player.y = posY;
                    //console.log("Player:" + Level.player.x + "=" + posX + "_" + Level.player.y + "=" + posY);
                    break;
                case 'v':
                    Level.fallenemy.push({
                        x: posX,
                        y: posY,
                        spawnY: posY
                    });
                    //console.log("Enemy:" + Level.fallenemy.x + "=" + posX + "_" + Level.fallenemy.y + "=" + posY);
                    break;
                case '|':
                    Level.horizenemy.push({
                        x: posX,
                        y: posY
                    });
                    break;
                
                case '=':
                    var matches = row.substring(x,row.length).match(/(.*)(])/);// get the rest of the row and search for the character "]"
                    var movingarea = 0;

                    if(matches != null) {
                        movingarea = (posX + matches[0].length) - 1;
                        console.log("Moving Area:"+movingarea);
                    }

                    Level.vertenemy.push({
                        startX: posX,
                        y: posY,
                        endX: movingarea
                    });
                    break;
                case 'o':
                    Level.cookies.push({
                        x: posX,
                        y: posY
                        });
                    break;
                default:break;
            }
        }
    }
    return Level;
}

var boxes = [];
var levels = [];

console.log("levels", levelPlans.length);
for(var i=0; i < levelPlans.length;i++)
{
    var level = constructor(levelPlans[i]);
    levels.push(level);
}

console.log("levels:", levels);