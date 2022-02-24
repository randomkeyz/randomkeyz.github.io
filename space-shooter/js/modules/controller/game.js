import html from '../model/globals.js';
import Player from './../model/player.js';
import Enemy from './../model/enemy.js';
import physics from './../controller/physics.js';
import renderer from './../view/renderer.js';
import { setRandomInterval } from './../utility.js';
import Particle from '../model/particle.js';

// Controller
class Game {
    constructor(
        state = {
            running: true, 
            score: 0, 
            spawnEnemyInt: null, 
            keys: {
                rightPressed: false,
                leftPressed: false,
                upPressed: false,
                downPressed: false,
                spacePressed: false
            }
        }) {
        this.entities = []; // holds player and enemies
        this.projectiles = []; // holds all shots by player/enemies
        this.particles = []; // holds explosion particles
        this.background = [];
        this.height = innerHeight;
        this.state = state;
        this.bgm = new Audio('./audio/tngend2.mp3');
        this.redAlert = new Audio('./audio/redalert.mp3');
        this.width = 1024;
        this.height = 576;
    }

    spawnEnemy() {
        const spawn = () => { 
            if(this.entities.length < 5) this.entities.push(new Enemy());
        }
        const spawnEnemyInt = setRandomInterval(spawn, 500, 2500);

        return spawnEnemyInt;
    }

    createStars() {
        for(let i = 0; i < 20; i++){
            this.background.push(new Particle({
                position: {
                    x: Math.random() * innerWidth,
                    y: Math.random() * innerHeight
                },
                velocity: {
                    x: 0,
                    y: 1
                },
                radius: Math.random() * 3,
                color: '#fff',
                fades: false
            }));
        }
    }
    

    // Should only be called once. Multiple calls will result in compounding loops and increase in game speed
    start() {
        this.redAlert.play();
        this.bgm.loop = true;
        this.bgm.volume -= 0.2;
        this.bgm.play();
        this.createStars();

        // Default entities on start
        this.entities.push(new Player());
        this.entities.push(new Enemy());
                
        physics.startMovementDetect(); // Run event listeners
        this.state.spawnEnemyInt = this.spawnEnemy();

        requestAnimationFrame(this.update.bind(this));
    };

    end(){        
        html.innerWrap.style.display = 'none';
        html.startingMenu.style.display = 'none';
        html.gameOverMenu.style.display = 'block';
        html.main.style.display = 'block';
        
        html.score.innerHTML = 'Score: 0';
        html.finalScore.innerHTML = `${this.state.score}`;
        this.state.spawnEnemyInt.clear(); // Clear interval so no other enemies are spawned
    }

    replay(){
        html.innerWrap.style.display = 'block';
        html.gameOverMenu.style.display = 'none';
        html.main.style.display = 'none';
        
        this.state.running = true;
        this.state.score = 0;
        this.entities.splice(0, this.entities.length); // Clear entity array
        this.particles.splice(0, this.particles.length); // Clear particles array
        this.projectiles.splice(0, this.projectiles.length); // Clear projectiles array
        
        renderer.context.clearRect(0, 0, this.width, this.height); // Clearing canvas

        // Default entities on start
        this.entities.push(new Player());
        this.entities.push(new Enemy());
        this.state.spawnEnemyInt = this.spawnEnemy(); // Restart spawn enemy interval

        requestAnimationFrame(this.update.bind(this));
    }

    // Gets called every sec
    update() {
        if(this.state.running === false) return this.end();
        physics.detectCollision();
        renderer.render();

        requestAnimationFrame(this.update.bind(this));
    };
}

const game = new Game();
Object.freeze(game);

export default game;