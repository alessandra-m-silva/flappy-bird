console.log('Flappy-Bird -- Des. Alessandra')

const sprites = new Image();
sprites.src = './sprites-and-effects/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//atribuições dos objetos e entidades do jogo
const globais = {};

function criaFlappyBird() {
    const flappyBird = {
        sX: 0,
        sY: 0,
        w: 33,
        h: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 4.6,
    
        pula() {
            flappyBird.velocidade = -flappyBird.pulo;
        },
    
        atualiza() {
            if (fazColisao(flappyBird, chao)) {
                som_HIT.play();
                setTimeout(() => {
                    mudaParaTela(telas.inicio);
                }, 500)
                return;
            }
            
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y += flappyBird.velocidade;
        },
    
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
    return flappyBird;
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
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    }
}

//efeitos sonoros
const som_HIT = new Audio();
som_HIT.src = './sprites-and-effects/sounds/hit.wav';

const som_PULO = new Audio();
som_PULO.src = './sprites-and-effects/sounds/pulo.wav';

const som_PONTO = new Audio();
som_PONTO.src = './sprites-and-effects/sounds/ponto.wav';


//telas
const telas = {
    inicio: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        atualiza() {},
        click() {
            mudaParaTela(telas.jogo);
        }
    },
    jogo: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
        },
        atualiza() {
            globais.flappyBird.atualiza();
        },
        click() {
            globais.flappyBird.pula();
        }
    }
}
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}
let telaAtiva = {};

//condição troca de telas do começodo jogo
window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

//dinamicas do jogo
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.h;
    const chaoY = chao.y;
    
    if (flappyBirdY >= chaoY) {
        return true;
    }
    return false;
}


//loop do jogo
function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
};


mudaParaTela(telas.inicio);
loop();