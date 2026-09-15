console.log('Flappy-Bird -- Des. Alessandra')

const sprites = new Image();
sprites.src = './sprites-and-effects/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


//atribuições dos objetos e entidades do jogo
const globais = {};
let frames = 0;

function criaFlappyBird() {
    const flappyBird = {
        w: 33,
        h: 24,
        x: 10,
        y: 50,
        gravidade: 0.25,
        velocidade: 0,
        pulo: 5,
        movimentos: [
            {sX: 0, sY: 0},
            {sX: 0, sY: 26},
            {sX: 0, sY: 52}
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            if (frames % 10 === 0) {
            incremento = flappyBird.frameAtual + 1;
            flappyBird.frameAtual = incremento % flappyBird.movimentos.length;
            }
        },
    
        pula() {
            flappyBird.velocidade = -flappyBird.pulo;
        },
    
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                som_HIT.play();
                setTimeout(() => {
                    mudaParaTela(telas.inicio);
                }, 200)
                return;
            }
            
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.y += flappyBird.velocidade;
        },
    
        desenha() {
            const {sX, sY} = flappyBird.movimentos[flappyBird.frameAtual];
            flappyBird.atualizaFrameAtual();
            
            contexto.drawImage(
                sprites,
                sX, sY,
                flappyBird.w, flappyBird.h,
                flappyBird.x, flappyBird.y,
                flappyBird.w, flappyBird.h
            );
        }
    }
    return flappyBird;
}
function criaChao() {
    const chao = {
        sX: 0,
        sY: 610,
        w: 224,
        h: 112,
        x: 0,
        y: canvas.height - 112,
    
        atualiza() {
            const movimentoDoChao = 1;
            chao.x = (chao.x - movimentoDoChao) % (chao.w / 2)
        },
    
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
    return chao;
}
function criaCanos() {
    const canos = {
        w: 52,
        h: 400,
        chao: {
            sX: 0,
            sY: 169
        },
        ceu: {
            sX: 52,
            sY: 169
        },
        espaco: 90,
        desenha() {
            canos.pares.forEach((par) => {
                const yRandom = par.y;
                
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                contexto.drawImage(
                    sprites,
                    canos.ceu.sX, canos.ceu.sY,
                    canos.w, canos.h,
                    canoCeuX, canoCeuY,
                    canos.w, canos.h
                );

                const canoChaoX = par.x;
                const canoChaoY = canos.h + canos.espaco + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.sX, canos.chao.sY,
                    canos.w, canos.h,
                    canoChaoX, canoChaoY,
                    canos.w, canos.h
                );

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.h + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        colisaoCanos(par) {
            const cabecaFlappy = globais.flappyBird.y;
            const peFlappy = globais.flappyBird.y + globais.flappyBird.h;

            if (((globais.flappyBird.x + globais.flappyBird.w) >= par.x) && (cabecaFlappy <= par.canoCeu.y || peFlappy >= par.canoChao.y)) {
                return true;
            }
            return false;
        },
        pares: [],
        atualiza() {
            if (frames % 100 === 0) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1)
                });
            }

            canos.pares.forEach((par) => {
                par.x -= 2;

                if (canos.colisaoCanos(par)) {
                    som_HIT.play();
                    mudaParaTela(telas.inicio);
                }

                if (par.x +canos.w <= 0) {
                    canos.pares.shift();
                }
            })
        }
    }
    return canos;
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
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        atualiza() {
            globais.chao.atualiza();
        },
        click() {
            mudaParaTela(telas.jogo);
        }
    },
    jogo: {
        inicializa() {
        },
        desenha() {
            planoDeFundo.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
        },
        atualiza() {
            globais.canos.atualiza();
            globais.chao.atualiza();
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
    frames += 1;

    requestAnimationFrame(loop);
};


mudaParaTela(telas.inicio);
loop();