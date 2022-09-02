import Phaser from "phaser";
import * as Colors  from "../consts/Colors"

export default class GameBackGround extends Phaser.Scene{

    preload(){

    }

    create(){
        this.add.line(400,250,0,0,0,700, Colors.White,1).setLineWidth(3,3)

        // this.add.circle(400,300,50,0xffffff,1)
        this.add.arc(400,300,50).setStrokeStyle(5,Colors.White,1)
    }
}