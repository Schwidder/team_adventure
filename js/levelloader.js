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

                if(c == 'x')
                {
                    this.walls.push({
                        x: posX,
                        y: posY
                    });
                }

                if(c == '!')
                {
                    this.lava.push({
                        x: posX,
                        y: posY
                    });
                }

                if(c == '$')
                {
                    this.player.x = posX;
                    this.player.y = posY;
                    console.log("Player:"+this.player.x+"="+posX+"_"+this.player.y+"="+posY);
                }

                if(c == 'v')
                {
                    this.vertlava.push({
                        x: posX,
                        y: posY
                    });
                }

                if(c == '|')
                {
                    this.horizlava.push({
                        x: posX,
                        y: posY
                    });
                }

                if(c == 'o')
                {
                    this.coins.push({
                        x: posX,
                        y: posY
                    });
                }
            }
        }
	}
}

/* var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var posX=0;
var posY=0;
var blockSize = 16; */

var boden   = new Image();
var lava    = new Image();
var coin    = new Image();

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