const teste = document.getElementById("hora")
let contador = 0
var FPS = 20

class Player{

    constructor(imagem_padrao, elemento_html){
        this.direita = true
        this.esquerda = false
        this.imagem_atual  = imagem_padrao
        this.imagem_padrao = imagem_padrao
        this.imagem_padrao_direita = imagem_padrao
        this.imagem_padrao_esquerda = "img/andar/esquerda/0.png"
        this.elemento_html = elemento_html
        this.animacao_atual = null
        this.animacoes ={
            andar_direita:{ diretorio: "img/andar/direita/", numero_da_imagem_atual: 0},
            andar_esquerda:{ diretorio: "img/andar/esquerda/", numero_da_imagem_atual: 0}
        }
    }


    mudar_imagem(img){
        this.elemento_html.src = img
        this.imagem_atual = img
    }


    
    andar_para_direita(t){
        const animacao = t.animacoes.andar_direita
        const img = animacao.diretorio+animacao.numero_da_imagem_atual+".png"
        t.mudar_imagem(img)
        animacao.numero_da_imagem_atual += 1
        if(animacao.numero_da_imagem_atual == 6){
            animacao.numero_da_imagem_atual=0
        }
    }

    andar_para_esquerda(t){
        const animacao = t.animacoes.andar_esquerda
        const img = animacao.diretorio+animacao.numero_da_imagem_atual+".png"
        t.mudar_imagem(img)
        animacao.numero_da_imagem_atual += 1
        if(animacao.numero_da_imagem_atual == 6){
            animacao.numero_da_imagem_atual=0
        }
    }

    andar(){
        if(this.animacao_atual == null){
            if(this.direita){
                this.animacao_atual = setInterval(this.andar_para_direita,1000/FPS,this)
            }else if(this.esquerda){
                this.animacao_atual = setInterval(this.andar_para_esquerda,1000/FPS,this)
            }
            
        }
    }

    parar(){
        clearInterval(this.animacao_atual)
        this.animacao_atual = null
        if(this.direita){
            this.mudar_imagem(this.imagem_padrao_direita)
        }else if(this.esquerda){
            this.mudar_imagem(this.imagem_padrao_esquerda)
        }
        
    }
    
    controlador(){
        document.addEventListener("keydown",(key)=>{if(key.key == 'd'){player.esquerda = false;player.direita = true;player.andar()}})
        document.addEventListener("keyup",(key)=>{if(key.key == 'd'){player.parar()}})

        document.addEventListener("keydown",(key)=>{if(key.key == 'a'){player.direita = false;player.esquerda = true;player.andar()}})
        document.addEventListener("keyup",(key)=>{if(key.key == 'a'){player.parar()}})
    }

}





const player = new Player("img/andar/direita/0.png",document.getElementById("player"))
player.controlador()

