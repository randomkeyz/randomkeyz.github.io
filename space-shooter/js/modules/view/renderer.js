import game from './../controller/game.js';
import Player from './../model/player.js';
import Enemy from './../model/enemy.js';

class Renderer {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
    }

    // Gets called every sec
    render() {
        /** 
         * FOR LOOPS used instead of FOR EACH for performance. Switching improved lag. 
        **/

        // DRAW CANVAS
        this.canvas.width = game.width;
        this.canvas.height = game.height;
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // DRAW AND UPDATE ENTITIES
        let spritePos = 1,
            entity,
            entities = game.entities;

        for(let i=0; i < entities.length; i++){
            entity = entities[i];

            if(entity instanceof Player) {
                // Change sprite based on key press
                if(game.state.keys.leftPressed) spritePos = 0;
                if(game.state.keys.rightPressed) spritePos = 2;

                entity.draw(i, spritePos);
            }

            if(entity instanceof Enemy) entity.draw(i);
        }

        // DRAW AND UPDATE PROJECTILES
        for(let n = 0; n < game.projectiles.length; n++) {
            let color;
            if(game.projectiles[n].type === 'player') color = '#4fc3f7';
            else color = 'red';
                
            game.projectiles[n].draw(game.projectiles[n].x, game.projectiles[n].y, color, n);
        };

        // DRAW AND UPDATE BACKGROUND STARS
        for(let b = 0; b < game.background.length; b++){
            game.background[b].update();
        }

        // DRAW AND UPDATE EXPLOSION PARTICLES
        if(game.particles.length <= 0 ) return; // returns if no particles present
        for(let p = 0; p < game.particles.length; p++){
            if(game.particles[p].position.y - game.particles[p].radius >= game.height){
                game.particles[p].position.x = Math.random() * game.width;
                game.particles[p].position.y = -game.particles[p].radius;
            }
    
            // Remove particles that are no longer visible or run update
            if(game.particles[p].opacity <= 0) game.particles.splice(p, 1);
            else game.particles[p].update();
        }

        
    }
}

const renderer = new Renderer();
Object.freeze(renderer);

export default renderer;