class Level
{
	constructor(lvl)
	{
        this.walls = [];
        this.lava = [];
        this.horizlava = [];
        this.vertlava = [];
        this.coins = [];
        this.player = [];
        this.width = lvl[0].length;
        this.height = lvl.length;
        

		for(var y=0; y < lvl.length; y++)
        {
            var row = lvl[y];
            console.log(row, "=>", row.length);
            for(var x=0; x<row.length;x++)
            {
                var c = row[x];

                var posX = x;
                var posY = y;
                switch(c) {
                    case 'x':
                        this.walls.push({
                            x: posX,
                            y: posY
                        });
                        break;
                    case '!':
                        this.lava.push({
                            x: posX,
                            y: posY
                        });
                        break;
                    case '$':
                        this.player.x = posX;
                        this.player.y = posY;
                        console.log("Player:" + this.player.x + "=" + posX + "_" + this.player.y + "=" + posY);
                        break;
                    case 'v':
                        this.vertlava.push({
                            x: posX,
                            y: posY
                        });
                        break;
                    case '|':
                        this.horizlava.push({
                            x: posX,
                            y: posY
                        });
                        break;
                    case 'o':
                        this.coins.push({
                            x: posX,
                            y: posY
                        });
                        break;
                    default:break;
                }
            }
        }
	}
}
/*
var boden   = new Image();
var lava    = new Image();
var coin    = new Image();
*/

var boxes = [];
var levels = [];

console.log("levels", levelPlans.length);
for(var i=0; i < levelPlans.length;i++)
{
    var level = new Level(levelPlans[i]);
    levels.push(level);
}

console.log("levels:", levels);

var current_level = levels[1];