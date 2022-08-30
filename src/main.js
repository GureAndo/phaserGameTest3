//ficher importation de phaser
import Phaser from 'phaser';
//importation des fichier et scene donc le main a besoin
import TitleScreen from './scenes/TitleScreen';
import Game from './scenes/Game';

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
game.scene.add('titlescreen', TitleScreen);
game.scene.add('game', Game);
//affichage des scene  
//game.scene.start('titlescreen');
game.scene.start('game');

