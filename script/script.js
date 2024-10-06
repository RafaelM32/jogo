const teste = document.getElementById("hora")
let contador = 0
var FPS = 13

class Player{

    constructor(imagem_padrao, elemento_html){
        this.imagem_atual  = imagem_padrao
        this.imagem_padrao = imagem_padrao
        this.elemento_html = elemento_html
        this.animacoes ={
            andar_direita:{ diretorio: "img/andar/direita/", numero_da_imagem_atual: 0}
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

    andar(){
        setInterval(this.andar_para_direita,1000/FPS,this)
    }
    
}



const player = new Player("img/andar/direita/0.png",document.getElementById("player"))
