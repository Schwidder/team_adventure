function initGame() {
    console.log("start game");
    var context, controller, rectangle, loop;

    context = document.getElementById("mycanvas").getContext("2d");

    context.canvas.height = 180;
    context.canvas.width = 320;

    rectangle = {

        height:32,      // Höhe des Blocks
        width:32,       // Breite des Blocks
        jumping:true,   // Zum Prüfen, ob man in der Luft ist.
        x:144,          // position des Block's mittig im canvasfeld
        x_geschw:0,     // Geschwindigkeit auf der X-Achse
        y:0,
        y_geschw:0,     // Geschwindigkeit auf der Y-Achse

    };

    controller = {
        left:false,
        right:false,
        up:false,
        keyListener:function(event) {

            // keydown = Ist die Taste runter gedrückt? JA = true
            // Befehler werden nur beim runter Drücken der Taste ausgeführt.

        var key_state = (event.type == "keydown")?true:false;

        // Was wurde überhaupt runtergedrückt?
        switch(event.keyCode) {

          case 37:  //Pfeil nach links
            controller.left = key_state;
          break;
          case 38:  //Pfeil nach oben
            controller.up = key_state;
          break;
          case 39:  //Pfeil nach rechts
            controller.right = key_state;
          break;

        }

      }

    };

    // Loop über die Physik: Geschwindigkeiten X-Achse, Y-Achse, Gravitation, Sprünge
    loop = function() {

        // Springen
      if (controller.up && rectangle.jumping == false) {

        rectangle.y_geschw -= 20; // Geschwindigkeit wie schnell man auf der Y-Achse nach unten fällt
        rectangle.jumping = true; // nur einmal Springen kein zweiter sprung während man in der Luft ist

      }

      // Bewegungen Links & Rechts
      if (controller.left) {

        rectangle.x_geschw -= 0.5; // Geschwindigkeit in Richtung X-Achse

      }

      if (controller.right) {

        rectangle.x_geschw += 0.5;

      }

      rectangle.y_geschw += 1.5; // Gravitation: Geschwindigkeit wie schnell man fällt
      rectangle.x += rectangle.x_geschw;
      rectangle.y += rectangle.y_geschw;
      rectangle.x_geschw *= 0.9; // Reibung wenn man anhalten will verringert die Geschw. über Zeit
      rectangle.y_geschw *= 0.9;

    // Grenzen des Spielfeldes
        // Y-Achse: 180 Anfang der Seite bis zum Canvisfeld, 16 bis zum Boden / Linie x-achse , 32 Blockhöhe
      if (rectangle.y > 180 - 16 - 32) {

        rectangle.jumping = false; // Sobald man den Boden berührt ist Springen erlaubt
        rectangle.y = 180 - 16 - 32;
        rectangle.y_geschw = 0;

      }

      // X-Achse: Grenzen Links & Rechts --> Links raus Teleport nach rechts und anders rum

      if (rectangle.x < -32) {         // Wenn der Block links aus dem Canvis Feld geht

        rectangle.x = 320;

      } else if (rectangle.x > 320) { // Wenn der Block rechts aus dem Canvis Feld geht

        rectangle.x = -32;

      }

      context.fillStyle = "#202020";
      context.fillRect(0, 0, 320, 180);
      context.fillStyle = "#ff0000";
      context.beginPath();
      context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      context.fill();
      context.strokeStyle = "#202830";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(0, 164);
      context.lineTo(320, 164);
      context.stroke();

      // Erneut zeichnen
      window.requestAnimationFrame(loop);

    };

    //Wenn das Event ausgelöst wird führe die Funktion aus
    window.addEventListener("keydown", controller.keyListener)
    window.addEventListener("keyup", controller.keyListener);
    window.requestAnimationFrame(loop);
}