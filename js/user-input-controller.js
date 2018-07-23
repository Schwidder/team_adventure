var context, controller, block, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width  = 320;

block = {

    height:32, // Höhe des Blocks
    width:32,  // Breite des Blocks
    springen:true, // Zum Prüfen, ob man in der Luft ist.
    x:144, // position des Block's mittig im canvasfeld
    x_geschw:0, // Geschwindigkeit auf der X-Achse
    y:0,
    y_geschw:0, // Geschwindigkeit auf der Y-Achse

};

controller = {

    left: false,
    right: false,
    ip: false,

    keyListener:function(event){
        
        // keydown = Taste runter gedrückt = true 
        // Befehler werden nur beim runter Drücken der Taste ausgeführt.
        var key_status=(event.type == "keydown")?true:false;

        // Was wurde überhaupt runtergedrückt?
        switch(event.keyCode){
            
            case 37: //Pfreil nach links
            controller.left = key_status;
            break;

            case 38: //Pfeil nach oben
            controller.up = key_status;
            break;

            case 39: //Pfeil nach rechts
            controller.right = key_status;
            break;

        };

        //Physics
        loop = function() {
           
            // Sprung
            if(controller.up && block.jumping ==false){

                block.y_geschw -= 20;  // gravität negativ zum Runterfallen
                block.jumping = true; // nur einmal Springen

            }

            if (controller.left) { 

                block.x_geschw += 0.5; // Geschwindigkeit nach links

            }


            if (controller.right) {

                block.x_geschw += 0.5; // Geschwindigkeit nach rechts

            }


            block.y_geschw +=1.5; // Gravität fällt immer runter
            block.x += block.x_geschw; 
            block.y += block.y_geschw;
            block.x_geschw *= 0.9; // Reibung wenn man anhalten will verringert die Geschw. über zeit
            block.y_geschw *= 0.9;

            // Grenzen des Blocks
            // 180 Anfang der Seite, 16 x-achse , 32 Blockhöhe
            if (block.y > 180 - 16 - 32){

                block.jumping = false;  // Boden berührt Springen erlaubt
                block.y = 180 - 16 - 32; 
                block.y_geschw = 0; // sobald Grenze erreicht stoppen

            }
            // Links raus Teleport nach rechts und anders rum
            if (block.x <-32){

                block.x = 320;

            }else if (block.x >320){

                block.x = -32;

            }

        // Canvas Feld / Block
        
        context.fillStyle = "#202020";
        context.fillRect(0,0,320,180);
        context.fillStyle = "#ff0000"; 
        context.beginPath();
        context.rect(block.x, block.y, block.width, block.height);
        context.fill();
        context.strokeStyle = "#202830";
        contect.lineWidth = 4;
        context.beginPath();
        context.moveTo(0,164);
        context.lineTo(320, 164);
        context.stroke();  

        window.requestAnimationFrame(loop);
        };

    }

};

//Wenn das Event ausgelöst wird führe die Funktion aus
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener); 
window.requestAnimationFrame(loop);
