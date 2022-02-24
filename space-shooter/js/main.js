import html from './modules/model/globals.js';
import game from './modules/controller/game.js';

html.startBtn.onclick = () => {
    html.innerWrap.style.display = 'block';
    html.main.style.display = 'none';
    game.start();
};

html.replayBtn.onclick = () => game.replay();