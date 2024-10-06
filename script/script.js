const teste = document.getElementById("hora")
let contador = 0
var FPS = 30

class Player{

    imagem_atual;
    imagem_padrao;
    elemento_html;
    
    estado = {
        direita: true,
        esquerda: false,
        andando: false,
    }
    animacoes = {
        andar_direita:"img/andar/direita",
        andar_esquerda:""
    }

    constructor(imagem_padrao, elemento_html){
        this.imagem_atual  = imagem_padrao
        this.imagem_padrao = imagem_padrao
        this.elemento_html = elemento_html
    }

    mudar_imagem(img){
        this.elemento_html.src = img
    }

    
}

const player = new Player("img/player_0r.png",document.getElementById("player"))

