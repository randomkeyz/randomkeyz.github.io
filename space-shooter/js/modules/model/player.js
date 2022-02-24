import game from './../controller/game.js';
import renderer from './../view/renderer.js';
import Projectile from './../model/projectile.js';
import Boundary from './boundary.js';

export default class Player {
    constructor(projectiles = 0) {
        this.width = 58;
        this.height = 95;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height - this.height + 10;
        this.hp = 1;
        this.speed = 3;
        this.img = 'player-ss.png';
        this.projectiles = projectiles;
    }

    boundary() {
        return new Boundary(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update() {
        // Checks movement
        if(game.state.keys.rightPressed && this.x <= game.width - this.width / 2) this.x += this.speed;
        if(game.state.keys.leftPressed && this.x >= 0) this.x -= this.speed;
        if(game.state.keys.upPressed && this.y >= 0) this.y -= this.speed;
        if(game.state.keys.downPressed && this.y <= game.height - this.height / 2) this.y += this.speed;
    }

    draw(index, spritePos){
        let scale = 0.6;
        const playerImg = new Image();
        playerImg.src = `./images/${this.img}`;
        
        this.update(index);

        playerImg.onload = (() => {
            // image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight
            renderer.context.drawImage(
                playerImg,
                // Sprite # you want * width of sheet divided by number of sprites (starts at 0)
                spritePos * playerImg.width / 3, 
                0,
                playerImg.width / 3, // Spritesheet width dividedd by the number of sprites
                playerImg.height,
                this.x, 
                this.y,
                this.width * scale,
                this.height * scale
            );
        })();
    }

    fire(){
        // Check to see how many projectiles are active. Only 3 on screen at a time.
        const projectileCount = game.projectiles.filter(projectile => projectile.type === 'player');

        if(projectileCount.length < 3){
            // Play projectile sound
            const projectile = new Audio('./audio/player_torpedo.mp3');
            projectile.play();

            // Create new projectile and add to list
            game.projectiles.push(
                new Projectile(
                    this.x + this.width / 2 - 12, 
                    this.y, 
                    '#15f4ee', 
                    'player'
                )
            );
        }
    }
}