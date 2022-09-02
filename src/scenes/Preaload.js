import Phaser, { Create } from "phaser";
import { TitleScreen } from "../consts/ScenesKeys";
import WebFontFile from "./WebFontFile";

export default class Preload extends Phaser.Scene{
    preload(){
        const fonts = new WebFontFile(this.load,"Permanent Marker");
        this.load.addfile(fonts)
    }
    Create(){
      this.scene.start(TitleScreen)  
    }
}