import Phaser from "phaser";
import { TitleScreen } from "../consts/ScenesKeys"; 

export default class GameOver extends Phaser.Scene{

    /**
     * 
     * @param {{leftScore : number, rightScore : number}} data 
     */
    create(data){

        let titleText = 'GAME OVER'
        console.dir(data)
        if (data.leftScore > data.rightScore){
            //player gagne 
            titleText= 'YOU WIN'
        }
        this.add.text(400, 200, titleText, {
            fontFamily:'"Press Start 2 P"',
            fontSize: 50
        }).setOrigin(0.5)

        this.add.text(400,300, 'Appuier sur espace pour continuer',{fontSize:50,fontFamily:'"Permanent Marker"'}).setOrigin(0.5)
        this.input.keyboard.once('keydown-SPACE', ()=>{
            this.scene.start(TitleScreen)
        })
        
    }
} 