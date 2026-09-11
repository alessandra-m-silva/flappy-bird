console.log('Flappy-Bird -- Des. Alessandra')

const sprites = new Image();
sprites.src = './sprites-and-effects/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//atribuições dos objetos e entidades do jogo
const flappyBird = {
    sX: 0,
    sY: 0,
    w: 33,
    h: 24,
    x: 10,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.sX, flappyBird.sY,
            flappyBird.w, flappyBird.h,
            flappyBird.x, flappyBird.y,
            flappyBird.w, flappyBird.h
        );
    }
}
const chao = {
    sX: 0,
    sY: 610,
    w: 224,
    h: 112,
    x: 0,
    y: canvas.height - 112,

    desenha() {
        contexto.drawImage(
            sprites,
            chao.sX, chao.sY,
            chao.w, chao.h,
            chao.x, chao.y,
            chao.w, chao.h
        );
        contexto.drawImage(
            sprites,
            chao.sX, chao.sY,
            chao.w, chao.h,
            (chao.x + chao.w), chao.y,
            chao.w, chao.h
        );
    }
}
const planoDeFundo = {
    sX: 390,
    sY: 0,
    w: 275,
    h: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.sX, planoDeFundo.sY,
            planoDeFundo.w, planoDeFundo.h,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.w, planoDeFundo.h
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.sX, planoDeFundo.sY,
            planoDeFundo.w, planoDeFundo.h,
            (planoDeFundo.x + planoDeFundo.w), planoDeFundo.y,
            planoDeFundo.w, planoDeFundo.h
        );
    }
}


//loop do jogo
function loop() {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();

    requestAnimationFrame(loop);
};
loop();