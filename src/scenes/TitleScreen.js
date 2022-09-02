import Phaser from 'phaser';
import WebFontFile from "./WebFontFile";
import {Game} from "../consts/ScenesKeys";

//export de la class TitleScreen pour pouvoir la rapeller dansq le main.js
export default class TitleScreen extends Phaser.Scene{
    // methode preaload pour charger les differante asset/sprite
    preload(){
      
       
    };
    //methode create pour afficher ce qui et preload ou tu text par exemple 
    create(){
        //text test pour l'ecrant titre ce qui ya en argument dans la function text(axe des X, axe des Y, et 'text d'affichage')
        const text2 = this.add.text(400,200, 'pong en phaser',{fontSize:50,fontFamily:'"Permanent Marker"'});
        //reposisionnement du text
        text2.setOrigin(0.5, 0.5);

        const text = this.add.text(400,500, 'Appuyer Sur espace pour commencer',{fontSize:25,fontFamily:'"Permanent Marker"'});
        //reposisionnement du text
        text.setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-SPACE', ()=>{
            console.log('HAHA')
            this.scene.start(Game);
        })
    };
};