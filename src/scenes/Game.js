import Phaser from "phaser";
import WebFontFile from "./WebFontFile";
// import GameBackGround from "./GameBackGround";
import {GameBackGround, GameOver} from "../consts/ScenesKeys";
import * as Colors  from "../consts/Colors"

const GameState={
    Running : 'running',
    PlayerWon: "player_won",
    AIWon: 'ia_won'
}

class Game extends Phaser.Scene{

    init(){
        this.gameState = GameState.Running
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0);

        this.leftScore = 0;
        this.rightScore = 0;

        this.paused = false
    }

    preaload(){
        // const fonts = new WebFontFile(this.load,"Permanent Marker");
        // this.load.addfile(fonts)
    };

    create(){
        //text score
        const scoreStyle= {
            fontSize:50,
            //je comprend pas pk la font ne s'affiche pas  
            fontFamily:'"Permanent Marker"',
        }
        this.scene.run(GameBackGround)
        this.scene.sendToBack(GameBackGround)
        this.physics.world.setBounds(-100, 0 , 1000 ,600);

        const bastard = this.add.text(250, 250, 'batard'); 
        //creation d'un cercle pour le pong la function cercle(axe des X, axe des Y, ma taille du vercle et ca couleur le 1 final alpha ??)
        const ball= this.ball = this.add.circle(400, 250, 15, Colors.White,1); 

        //attribution de la physic du jeu en soit dans ce cas la gravité zero en Y au constante
        this.physics.add.existing(this.ball);

        this.ball.body.setBounce(1,1);

        this.physics.add.existing(bastard);

        bastard.body.setBounce(1,1);

        //attribution des collistionsur les rebort du 'monde'+ en argument le rebond plus la vitesse exemple 1.1 rebon normal et vitesse normal si on passe en 2.2 sa rebondi de plus en plus vite
        this.ball.body.setCollideWorldBounds(true,1,1);

        bastard.body.setCollideWorldBounds(true,1,1);
 
        // const angle = Phaser.Math.Between(0,360);
        // const vec = this.physics.velocityFromAngle(angle, 200)

        // //attribution de l'angle (argument1) de deplacement et de la vitesse(argument2)
        // // this.ball.body.setVelocity(Phaser.Math.Between(-200,200),Phaser.Math.Between(-200,200)); 
        // this.ball.body.setVelocity(vec.x , vec.y); 

        bastard.body.setVelocity(200,200);

        //creation des bare latterale argument (axe X, Y, taille largeur,longeur couleur et alpha ???)
        const paddleLeft= this.paddleLeft = this.add.rectangle(30,200,50,100,Colors.White,1 );

        this.physics.add.existing(this.paddleLeft,true);
        //creation du paddle droite
        const paddleRight = this.paddleRight = this.add.rectangle(770,200,50,100,Colors.White,1 );

        this.physics.add.existing(this.paddleRight,true);

        //mise en place de la collison entre le paddle et la ball + le mot
        this.physics.add.collider(this.paddleLeft,this.ball);
        this.physics.add.collider(this.paddleLeft,bastard);
        this.physics.add.collider(this.ball,bastard);
        this.physics.add.collider(this.paddleRight,this.ball);
        this.physics.add.collider(this.paddleRight,bastard);

        const leftScoreLabel = this.leftScoreLabel = this.add.text(300, 125,'0', scoreStyle).setOrigin(0.5,0.5)

        const rigtScorelabel = this.rightScoreLabel = this.add.text(500, 125,'0', scoreStyle).setOrigin(0.5,0.5)

        //creation des touche
        const cursor = this.cursor = this.input.keyboard.createCursorKeys();
        console.log(cursor);

        this.time.delayedCall(750, ()=>{
            this.resetBall()
        })

    };
    // function pour pour les interaction direct entre le jouer et le jeu
    update(){

        if(this.pause || this. gameState !== GameState.Running){
            return
        }

        this.paddleInput()
        this.updateIA()
        this.updateScore()
    };

    paddleInput(){
        //condition pour faire se deplacer le paddle gauche
        if(this.cursor.up.isDown){
            console.log('c ok haut');
            this.paddleLeft.y -= 10;
            this.paddleLeft.body.updateFromGameObject();
        }
        else if(this.cursor.down.isDown){
            console.log('c ok bas');
            this.paddleLeft.y += 10;
            this.paddleLeft.body.updateFromGameObject();
        };
    }

    updateIA(){
           /***********paddle iA droite**************/
        const diff = this.ball.y - this.paddleRight.y;
        if(Math.abs(diff) < 11.6){
            return;
        };

        const aispeed = 3;

        if(diff < 0){
            //ball et au dessu du paddle
            this.paddleRightVelocity.y = -aispeed;
            if(this.paddleRightVelocity.y < -10){
                this.paddleRightVelocity.y = -10;
            };
        }
        else if(diff > 0){
            //ball est en dessou du paddle
            this.paddleRightVelocity.y = aispeed;
            if(this.paddleRightVelocity.y > 10){
                this.paddleRightVelocity.y = 10;
            };
        };

        this.paddleRight.y += this.paddleRightVelocity.y;
        this.paddleRight.body.updateFromGameObject();
    }

    updateScore(){

        const x = this.ball.x
        const leftBound = -30
        const rightBound = 830

        if(x >= leftBound && x <= rightBound){
            return
        }

        if(this.ball.x < leftBound){
            //up le score du coté gauche
            this.incrementrightScore()
            
        }
        else if (this.ball.x > rightBound){
            //up le score du coté droit
            this.incrementleftScore();
            
        };

        const maxScore = 2
        if(this.leftScore >= maxScore){
            console.log('that win for player')
            this.gameState = this.gameState.PlayerWon
        }else if(this.rightScore >= maxScore){
            console.log('that win for IA')
            this.gameState = this.gameState.AIWon
        }
        
        if(this.gameState === GameState.Running){
            this.resetBall();
        }else{
            this.ball.active = false
            this.physics.world.remove(this.ball.body)
            this.scene.stop(GameBackGround)
            // Show the game over/ winScreen
            this.scene.start(GameOver, {
                leftScore:this.leftScore,
                rightScore:this.rightScore,
            })
        }
    }

    incrementleftScore(){
        this.leftScore += 1;
        this.leftScoreLabel.text = this.leftScore;
    }

    incrementrightScore(){
        this.rightScore += 1;
        this.rightScoreLabel.text = this.rightScore;
    }

    resetBall(){
        this.ball.setPosition(400,250);
        const angle = Phaser.Math.Between(-30,330);
        const vec = this.physics.velocityFromAngle(angle, 250)
        this.ball.body.setVelocity(vec.x , vec.y); 
    };
};

export default Game; 