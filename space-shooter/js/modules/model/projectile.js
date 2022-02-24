import game from './../controller/game.js';
import renderer from './../view/renderer.js';
import Boundary from './boundary.js';

export default class Projectile{
    constructor(x, y, color, type) {
        this.x = x;
        this.y = y;
        this.radiusX = 3;
        this.radiusY = 8;
        this.width = this.radiusX / 2;
        this.height = this.radiusY / 2;
        this.speed = 8;
        this.color = color;
        this.type = type;
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
        // Either move or remove projectile
        if(this.type === 'player') {
            this.y -= this.speed;
            
            // Remove projectile from projectiles array if it falls below view
            if(this.y <= 0) game.projectiles.splice(index, 1);
        }
        if(this.type === 'enemy') {
            this.y += this.speed;

            // Remove projectile from projectiles array if it falls below view
            if(this.y >= game.height) game.projectiles.splice(index, 1);
        }
    }

    draw(x, y, color, index) {
        renderer.context.beginPath();
        
        //ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, counterclockwise]);
        renderer.context.ellipse(x, y, this.radiusX, this.radiusY, Math.PI, 0, 2 * Math.PI);
        renderer.context.fillStyle = color;
        renderer.context.filter = "blur(1px)";
        renderer.context.fill();
        renderer.context.closePath();

        this.update(index);
    }
}