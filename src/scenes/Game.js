import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

class Game extends Phaser.Scene{

    init(){
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0);

        this.leftScore = 0;
        this.rightScore = 0
    }

    preaload(){
        const fonts = new WebFontFile(this.load, "press Start 2p");
        this.load.addfile(fonts)
    };

    create(){
        //text score
        const scoreStyle= {
            fontSize:50, 
            fontFamily:'"Press Start 2P"',
        }
        this.physics.world.setBounds(-100, 0 , 1000 ,600);

        const bastard = this.add.text(250, 250, 'batard'); 
        //creation d'un cercle pour le pong la function cercle(axe des X, axe des Y, ma taille du vercle et ca couleur le 1 final alpha ??)
        const ball= this.ball = this.add.circle(400, 250, 15, 0xffffff,1); 

        //attribution de la physic du jeu en soit dans ce cas la gravité zero en Y au constante
        this.physics.add.existing(this.ball);

        this.ball.body.setBounce(1,1);

        this.physics.add.existing(bastard);

        bastard.body.setBounce(1,1);

        //attribution des collistionsur les rebort du 'monde'+ en argument le rebond plus la vitesse exemple 1.1 rebon normal et vitesse normal si on passe en 2.2 sa rebondi de plus en plus vite
        this.ball.body.setCollideWorldBounds(true,1,1);

        bastard.body.setCollideWorldBounds(true,1,1);

        this.resetBall(),
        // const angle = Phaser.Math.Between(0,360);
        // const vec = this.physics.velocityFromAngle(angle, 200)

        // //attribution de l'angle (argument1) de deplacement et de la vitesse(argument2)
        // // this.ball.body.setVelocity(Phaser.Math.Between(-200,200),Phaser.Math.Between(-200,200)); 
        // this.ball.body.setVelocity(vec.x , vec.y); 

        bastard.body.setVelocity(200,200);

        //creation des bare latterale argument (axe X, Y, taille largeur,longeur couleur et alpha ???)
        const paddleLeft= this.paddleLeft = this.add.rectangle(30,200,50,100,0xffffff,1 );

        this.physics.add.existing(this.paddleLeft,true);
        //creation du paddle droite
        const paddleRight = this.paddleRight = this.add.rectangle(770,200,50,100,0xffffff,1 );

        this.physics.add.existing(this.paddleRight,true);

        //mise en place de la collison entre le paddle et la ball + le mot
        this.physics.add.collider(this.paddleLeft,this.ball);
        this.physics.add.collider(this.paddleLeft,bastard);
        this.physics.add.collider(this.paddleRight,this.ball);
        this.physics.add.collider(this.paddleRight,bastard);

        //text score
        // const scoreStyle= {
        //     fontSize:50, 
        //     fontFamily:'"Press Start 2p"'
        // }
        const leftScoreLabel = this.leftScoreLabel = this.add.text(300, 125,'0', scoreStyle).setOrigin(0.5,0.5)

        const rigtScorelabel = this.rightScoreLabel = this.add.text(500, 125,'0', scoreStyle).setOrigin(0.5,0.5)

        //creation des touche
        const cursor = this.cursor = this.input.keyboard.createCursorKeys();
        console.log(cursor);

    };
    // function pour pour les interaction direct entre le jouer et le jeu
    update(){
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

        if(this.ball.x < -0){
            //up le score du coté gauche
            this.resetBall();
            this.incrementrightScore();
        }
        else if (this.ball.x > 820){
            //up le score du coté droit
            this.resetBall();
            this.incrementleftScore();
        };

       
    };

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
        const angle = Phaser.Math.Between(0,360);
        const vec = this.physics.velocityFromAngle(angle, 200)
        this.ball.body.setVelocity(vec.x , vec.y); 
    };
};

export default Game; 