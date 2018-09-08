# Cookie Adventure

![beschreibung](https://user-images.githubusercontent.com/41168148/45183901-aa918e00-b225-11e8-8d7f-f949964e1ce1.png "Beschreibung des Spiels.")
Cookie Adventure ist ein Adventure Spiel, welches im Rahmen der Vorlesung "Projekte der Wirtschaftsinformatik" (Q3/2018) 
an der FHDW in Bergisch Gladbach entwickelt wurde.

Das ganze Spiel basiert auf unterschiedlichen Leveln die der Spieler erfolgreich meisten muss.
Ein Level zählt dann als geschafft, wenn alle Cookies aufgesammelt worden sind:
Wenn der Spieler die lila Milch berührt wird das Level zurückgesetzt und er muss wieder 
von seiner Startpositon (Spawn) anfangen.

Wir haben uns für ein einfaches und schlichtes Level design in Form eines Array's entschieden, 
sodass es für jeden einfach zu lesen und zu editieren ist.

## Release-Informationen
**Release**: Cookie Adventure 1.0
* Spieler (Rechteck), Bewegung des Spielers, Springen,
* Platformen (Rechtecke) hard reingezeichnet

**Release**: Cookie Adventure 1.5
* Collisions:
    * Player, Lava, Coin
* Map:
    * Map in Canvas einlesen
    * Map Elemente: Spawn ,Coins, Lava
* Funktionalitäten: 
    * Coin einsammeln, Coin Counter, Lava = Gameover pushup, 

**Release**: Cookie Adventure 2.0
* Corporate design: Player, Enemy, Cookie:
    * Animantionen, Soundeffekte hinzugefügt
    * Neuen Name, neues Logo, neue Bider und Pitchslide hinzugefügt
    * Anpassung der Homepage, Schrift, Farbe, Icons...

* Game: neue Gegner, Viewpoint, Game Menu, Level überspringen & auswählen
    * Viewpoint auf den Spieler, der Spieler wird vom Canvas verfolgt
    * Game Menu mit Pausieren, Musik einstellungen, Level überspringen hinzugefügt
    * Homepage überarbeitet, Spielanleitung hinzugefügt, Datenschutz und Impressum und Über das Spiel überarbeitet
    * Neue Gegner: Zahnrad, langsam fallende Milch, Schnell fallende Milch
    * Neue Funktionalitäten: Musik button überarbeitet, Level auswählen hinzugefügt, Zeit pro Level hinzugefügt



### Browserkompatibilität
Die folgenden Browser werden vollständig unterstützt:
* Google Chrome (Microsoft Windows, Apple macOS, Linux)
* Mozilla Firefox (Microsoft Windows, Apple macOS, Linux)
* Microsoft Internet Explorer
* Microsoft Edge
* Apple Safari (Apple macOS)

### Bekannte Fehler (Bugs)
* Im Microsoft Internet Explorer funktionieren die Soundeffects nicht.
* Wenn mehrere Cookies gleichzeitig eingesammelt wird der Sound nur ein mal abgespielt, da wir keine Soundüberlappung erlauben wollten.
* In Chrome funktioniert die Hintergrundmusik nicht beim Aufrufen der Webseite (Schutzmichanismus von Chrome)

## Projekt Details
Dieses Projekt setzt auf vanilla HTML, CSS und JavaScript auf.
Die Einbindung von Libraries ist generell nicht vorgesehen.

Um das Projekt lokal aufsetzen, sind die folgenden Schritte erforderlich:
1. Repository klonen: `git clone https://github.com/Schwidder/team_adventure.git`

## Architektur
### Verzeichnisse und Dateien
Zu den relevanten Verzeichnissen und Dateien zählen:
* `assets/`: Alle verwerwendeten Bilder
* `content/`: HTML-Inhalt
* `js/`: JavaScript-Quellcode, der im Browser genutzt wird.
* `css/`: CSS-Dateien die das Aussehen der Website beinflussen
* `sounds/`: genutzte Sound-Dateien im Spiel

## Credits

* Cookie ([inkmammoth](https://opengameart.org/content/pixel-art-food-pack-by-inkmammoth), General Public License 2.0 / GNU 2.0)
* Playeranimation ([http://bevouliin.com](https://bevouliin.com/hairy-marshmallow-character/), Open Game Art License / OGA-BY)
* Platformer Art Candy ([kenney.nl](https://kenney.nl/assets/platformer-art-candy), Creative Commons / CC0)
* Game-Game ([metaruka](https://opengameart.org/content/game-game), Creative Commons / CC-BY-SA)
* Sound Pack ([artisticdude](https://opengameart.org/content/rpg-sound-pack), Creative Commons / CC0)
* Hintergrund Musik ([Heaven Voices by Waimis](https://soundcloud.com/waimis), Creative Commons 3.0 / CC-BY 3.0)
* Homepage Icon's ([Font Awesome Free](https://fontawesome.com/free), Creative Commons 4.0 / CC-BY 4.0)
* Control discription ([pixabay](https://pixabay.com/de/tastatur-computer-einfache-pc-1293389/), Creative Commons / CC0) 
* Datenschutzerklärung https://www.activemind.de/datenschutz/datenschutzhinweis-generator/


Wesentlich an dem Projkekt mitgewirkt haben:
* Gleb Shpak (Level Design, Animationen, Sound effects, Texturen, Testing ,Lizenzierung, Pitchslide)
* Fabian Kaspar (Menu Design, Homepage & Game Development, Musik , Testing, Compliance)
* Kevin Schwidder (Homepage & Game Development, Homepage Design, Bugfixing, Codecleaning)
