# team_adventure
BlockRun ist ein Adventure Spiel, welches im Rahmen der Vorlesung "Projekte der Wirtschaftsinformatik" (Q3/2018) an der FHDW in Bergisch Gladbach entwickelt wurde.

## Release-Informationen
**Release**: Block Run 1.0

### Browserkompatibilität
Die folgenden Browser werden vollständig unterstützt:
* Google Chrome (Microsoft Windows, Apple macOS, Linux)
* Mozilla Firefox (Microsoft Windows, Apple macOS, Linux)

Die folgenden Browser werden teilweise unterstützt:
* Apple Safari (Apple macOS)

Die folgenden Browser werden nicht unterstützt:
* Microsoft Internet Explorer
* Microsoft Edge

### Bekannte Fehler (Bugs)


## Projekt Details
Dieses Projekt setzt auf vanilla HTML, CSS und JavaScript im ES6-Standard auf.
Die Einbindung von Libraries ist generell nicht vorgesehen.

Um das Projekt lokal aufsetzen, sind die folgenden Schritte erforderlich:
1. [Node.js](https://nodejs.org/de/) (6er-Release-Zyklus, aktuellster LTS-Release) mit npm (Node Package Manager) installieren
1. Repository klonen: `git clone git@github.com:fastexitlane/icedash.git`
2. Abhängigkeiten des Projekts lokal installieren: `npm install`

## Architektur
### Verzeichnisse und Dateien
Zu den relevanten Verzeichnissen und Dateien zählen:
* `content/`: Kontent
* `js/`: generierter ES5-JavaScript-Quellcode, der im Browser genutzt wird.
* `css/`: CSS-Dateien


### Drei-Layer-Aufbau
Die Architektur des Spiels setzt sich im Wesentlichen aus drei Ebenen (Layern) zusammen:
1. **Model-Layer** (`src/model`): Der Model-Layer kapselt das Datenmodell des Spiels (Level). Daneben beschreibt er die innere Spiellogik, d.h. das Verhalten der einzelnen Feldtypen. Er basiert als einziger Layer vollständig auf dem Klassenkonzept von ES6.
2. **Loading-Layer** (`src/loading`): Im Loading-Layer werden das Preloading der Assets (nach intialem Seitenaufbau) sowie die Initialisierung eines Levels durchgeführt.
3. **Game-Layer** (`src/game`): Der Game Layer bildet die "äußere" Spiellogik, d.h. Benutzerführung und GameLoop, sowie das Rendering des Spiels ab.

Details zu den einzelnen Layern werden im Wiki beschrieben.


## Credits
IceDash wird durch folgende Drittanbieter-Assets ermöglicht:
* Grafik ([http://bevouliin.com](http://bevouliin.com), Open Game Art License / OGA-BY)
* Coin Animation ([dontmind8.blogspot.com](dontmind8.blogspot.com), Creative Commons / CC-BY)
* Platformer Art Deluxe ([kenney.nl](kenney.nl), Creative Commons / CC0)
* Game-Game ([metaruka](https://opengameart.org/content/game-game), Creative Commons / CC-BY-SA)
* Sound Pack ([artisticdude](https://opengameart.org/content/rpg-sound-pack), Creative Commons / CC0)

Wesentlich an dem Projkekt mitgewirkt haben:
* Gleb Shpak (Development, Design, Lizenzierung)
* Fabian Kaspar (Level Design, Testing, Compliance)
* Kevin Schwidder (Development, Design, Animationen)
