import game from './../controller/game.js';
import renderer from './../view/renderer.js';
import Projectile from './../model/projectile.js';
import Boundary from './boundary.js';

export default class Enemy {
    constructor() {
        this.width = 108;
        this.height = 97;
        // To get random num between 2 nums: Math.random() * (max - min) + min ;
        this.x = Math.floor(Math.random() * ((game.width - this.width / 2) - this.width / 2) +  this.width / 2); // Ensures enemies are not spawned outside of window
        this.y = 0;
        this.hp = 1;
        this.img = 'enemy.png';
        this.speed = 2;
        this.scale = 0.75;
        //this.attackPattern = 0;
    }

    boundary() {
        return new Boundary(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(index) {
        // Update movement
        this.y += this.speed;

        // Remove enemy from entity array if it falls below view
        if(this.y >= game.height) game.entities.splice(index, 1);

        // Random fire
        const random = Math.floor(Math.random() * 100);
        if(random <= 0.5) this.fire();
    }

    draw(index){
        const enemyImg = new Image();
        enemyImg.src = `./images/${this.img}`;
        
        this.update(index);

        enemyImg.onload = (() => {
            renderer.context.drawImage(
                enemyImg, 
                this.x, 
                this.y,
                this.width * this.scale,
                this.height * this.scale
            );
        })();
    }

    fire(){
        // Check to see how many projectiles are active. Only 3 on screen at a time.
        const projectileCount = game.projectiles.filter(projectile => projectile.type === 'enemy');

        if(projectileCount.length < 3){
            // Play projectile sound
            const projectile = new Audio('./audio/klingon_torpedo.mp3');
            projectile.play();

            // Create new projectile and add to list
            game.projectiles.push(
                new Projectile(
                    this.x + this.width / 2 - 12, 
                    this.y + this.height, 
                    'red', 
                    'enemy'
                )
            );
        }
    }
}