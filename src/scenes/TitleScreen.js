import Phaser from 'phaser';
//export de la class TitleScreen pour pouvoir la rapeller dansq le main.js
export default class TitleScreen extends Phaser.Scene{
    // methode preaload pour charger les differante asset/sprite
    preload(){

    };
    //methode create pour afficher ce qui et preload ou tu text par exemple 
    create(){
        //text test pour l'ecrant titre ce qui ya en argument dans la function text(axe des X, axe des Y, et 'text d'affichage')
        const text = this.add.text(400,200, 'connard');
        //reposisionnement du text
        text.setOrigin(0.5, -3.5);
    };
};