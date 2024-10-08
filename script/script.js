const teste = document.getElementById("hora")
let contador = 0
var FPS = 10
const velocidade_cenario = 10

class Player{

    constructor(imagem_padrao_direita, imagem_padrao_esquerda, elemento_html){
        

        //Carregamento de imagens do player (exceto as de animação)
        this.imagem_atual  = imagem_padrao_direita
        this.imagem_padrao_direita = imagem_padrao_direita
        this.imagem_padrao_esquerda = imagem_padrao_esquerda
        this.elemento_html = elemento_html

        //Carregamento de animações
        this.animacoes ={
            andar_direita:{ diretorio: "img/andar/direita/", numero_da_imagem_atual: 0, qtd_max_img: 4},
            andar_esquerda:{ diretorio: "img/andar/esquerda/", numero_da_imagem_atual: 0, qtd_max_img: 4}
        }
        
        //Estado do player
        this.andando_direita  = false
        this.andando_esquerda = false
        this.animacao_atual = null
        
        
    }


    mudar_imagem(img){
        this.elemento_html.src = img
        this.imagem_atual = img
    }


    //Animação
    animacao_para_direita(t){
        const animacao = t.animacoes.andar_direita
        const img = animacao.diretorio+animacao.numero_da_imagem_atual+".png"
        t.mudar_imagem(img)
        animacao.numero_da_imagem_atual += 1
        if(animacao.numero_da_imagem_atual == animacao.qtd_max_img + 1){
            animacao.numero_da_imagem_atual=0
        }
    }


    //Animação
    animacao_para_esquerda(t){
        const animacao = t.animacoes.andar_esquerda
        const img = animacao.diretorio+animacao.numero_da_imagem_atual+".png"
        t.mudar_imagem(img)
        animacao.numero_da_imagem_atual += 1
        if(animacao.numero_da_imagem_atual == animacao.qtd_max_img + 1){
            animacao.numero_da_imagem_atual=0
        }    }

    //Ação
    andar_para_direita(){
        if(!this.andando_direita){
            clearInterval(this.animacao_atual)
            this.animacao_atual = null
            this.animacao_atual = setInterval(this.animacao_para_direita,1000/FPS,this)
            this.andando_direita = true
            this.andando_esquerda = false
        }
    }

    //Ação
    andar_para_esquerda(){
        if(!this.andando_esquerda){
            clearInterval(this.animacao_atual)
            this.animacao_atual = null
            this.animacao_atual = setInterval(this.animacao_para_esquerda,1000/FPS,this)
            this.andando_esquerda = true
            this.andando_direita = false
        }
    }

    //Ação
    parar(){
        clearInterval(this.animacao_atual)
        this.animacao_atual = null
    }
    
    //Configuração de controles
    controlador(){

        //Ativando a movimentação para direita a partir do acionamento do teclado
        document.addEventListener("keydown",(key)=>{if(key.key == 'd' || key.key == "ArrowRight"){this.andar_para_direita()}})
        
        //Volta a imagem padrão caso não haja outros movimentos
        document.addEventListener("keyup",(key)=>{if(key.key == 'd' || key.key == "ArrowRight"){
            if(!this.andando_esquerda){
                this.parar()
                this.andando_direita = false
                this.mudar_imagem(this.imagem_padrao_direita)
            }
        }})


        //Ativando a movimentação para esquerda a partir do acionamento do teclado
        document.addEventListener("keydown",(key)=>{if(key.key == 'a' || key.key == "ArrowLeft"){this.andar_para_esquerda()}})
        

        //Volta a imagem padrão caso não haja outros movimentos
        document.addEventListener("keyup",(key)=>{if(key.key == 'a' || key.key == "ArrowLeft"){
            if(!this.andando_direita){
                this.parar()
                this.andando_esquerda = false
                this.mudar_imagem(this.imagem_padrao_esquerda)
            }
        }})

    }
}


class Cenario{


    constructor(img_path, qtd_img, elemento_html_1, elemento_html_2){
        this.elemento_html_1 = elemento_html_1
        this.elemento_html_2 = elemento_html_2
        this.img_path = img_path
        this.qtd_img = qtd_img

        this.imagem_atual = img_path+"3.png"
        this.posicao_atual_1 = -24.5
        this.posicao_atual_2 = 75.5

        this.elemento_html_1.src = this.imagem_atual
        this.elemento_html_2.src = img_path+"4.png"
        
        this.animacao_atual = null
        this.andando_direita = false
        this.andando_esquerda = false
    }


    reposiciona_elemento(vel,t){
        t.posicao_atual_1 = t.posicao_atual_1 - 0.1*vel
        t.posicao_atual_2 = t.posicao_atual_2 - 0.1*vel
        t.elemento_html_1.style.marginLeft = t.posicao_atual_1.toString() + "vw"
        t.elemento_html_2.style.marginLeft = t.posicao_atual_2.toString() + "vw"

        if(t.posicao_atual_1 <= -120){
            t.posicao_atual_1 = t.posicao_atual_1 + 200
        }

        if(t.posicao_atual_2 <= -120){
            t.posicao_atual_2 = t.posicao_atual_2 + 200
        }

    }

    mover_cenario(vel){
        if(this.animacao_atual == null){
            this.animacao_atual = setInterval(this.reposiciona_elemento,1000/FPS,vel,this)
        }
    }

    parar(){
        clearInterval(this.animacao_atual)
        this.animacao_atual = null
    }

    controlador(){

        //Ativando a movimentação para direita a partir do acionamento do teclado
        document.addEventListener("keydown",(key)=>{if(key.key == 'd' || key.key == "ArrowRight"){
            if(!this.andando_direita){
                this.andando_esquerda = false
                this.parar()
            }
            this.mover_cenario(velocidade_cenario); 
            this.andando_direita = true
        }})
        
        //Para de mover a imagem caso não haja outros movimentos
        document.addEventListener("keyup",(key)=>{if(key.key == 'd' || key.key == "ArrowRight"){
            if(!this.andando_esquerda){
                this.parar()
                this.andando_direita = false
            }
        }})


        //Ativando a movimentação para esquerda a partir do acionamento do teclado
        document.addEventListener("keydown",(key)=>{if(key.key == 'a' || key.key == "ArrowLeft"){
            if(!this.andando_esquerda){
                this.andando_direita = false
                this.parar()
            }
            this.mover_cenario(-velocidade_cenario);
            this.andando_esquerda = true
        }})
        

        //Para de mover a imagem caso não haja outros movimentos
        document.addEventListener("keyup",(key)=>{if(key.key == 'a' || key.key == "ArrowLeft"){
            if(!this.andando_direita){
                this.parar()
                this.andando_esquerda = false
            }
        }})
        

    }


}




const player = new Player("img/andar/direita/0.png","img/andar/esquerda/0.png",document.getElementById("player"))
const cenario = new Cenario("img/cenario/",2,document.getElementById("cenario_1"),document.getElementById("cenario_2"))
player.controlador()
cenario.controlador()

