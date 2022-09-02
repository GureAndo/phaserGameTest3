//ficher importation de phaser
import Phaser from 'phaser';
//importation des fichier et scene donc le main a besoin
import TitleScreen from './scenes/TitleScreen';
import Game from './scenes/Game';
import GameBackGround from './scenes/GameBackGround';
import GameOver from './scenes/GameOver';
import Preload from './scenes/Preaload';

import * as SceneKeys from './consts/ScenesKeys'

//la config du jeu 
const config = {
    //taille du "canvas ou du webGf"
    width: 800,
    height: 600,
    //attribution du format canva, webGf ou comme la auto
    type: Phaser.AUTO,
    //ajout de la physique du jeu (gravite)
    physics: {
        default: "arcade",
        arcade: {
            gravity:{y:0},
            debug: true,
        }
    }
};

//instancition de l'objet ('le jeu')
const game = new Phaser.Game(config);
//ajout des scene
game.scene.add(SceneKeys.TitleScreen, TitleScreen);
game.scene.add(SceneKeys.Game, Game);
game.scene.add(SceneKeys.GameBackGround, GameBackGround);
game.scene.add(SceneKeys.GameOver, GameOver);
game.scene.add(SceneKeys.Preaload, Preload);

//affichage des scene  
game.scene.start(SceneKeys.TitleScreen)
// game.scene.start(SceneKeys.Game);

