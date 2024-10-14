const teste = document.getElementById("hora")
let contador = 0
var FPS = 10
const velocidade_cenario = 20
let _andando = true
let player_centralizado = true

class Player{

    constructor(imagem_padrao_direita, imagem_padrao_esquerda, elemento_html){
        

        //Carregamento de imagens do player (exceto as de animação)
        this.imagem_atual  = imagem_padrao_direita
        this.imagem_padrao_direita = imagem_padrao_direita
        this.imagem_padrao_esquerda = imagem_padrao_esquerda
        this.elemento_html = elemento_html
        this.pos_y_inicial = 18.3
        this.pos_y = this.pos_y_inicial
        this.pos_x_inicial = 22
        this.pos_x = this.pos_x_inicial

        //Carregamento de animações
        this.animacoes ={
            andar_direita:{ diretorio: "img/player/andar/direita/", numero_da_imagem_atual: 0, qtd_max_img: 4},
            andar_esquerda:{ diretorio: "img/player/andar/esquerda/", numero_da_imagem_atual: 0, qtd_max_img: 4},
            pular_direita:{diretorio:"img/player/pular/direita/",numero_da_imagem_atual: 0, qtd_max_img:6},
            pular_esquerda:{diretorio:"img/player/pular/esquerda/",numero_da_imagem_atual:0, qtd_max_img:6}
        }
        
        //Estado do player
        this.andando_direita  = false
        this.andando_esquerda = false
        this.pulando = false
        this.animacao_atual = null
        this.tocando_solo = true
        this.caindo = false
        this.direita = true

        
        
    }
    
    centralizado(){
        if(this.pos_x == this.pos_x_inicial){
            player_centralizado = true
            console.log(this.pos_x_inicial)
        }else{
            player_centralizado = false
            console.log(this.pos_x_inicial)
        }
    }
    


    mudar_imagem(img){
        this.elemento_html.src = img
        this.imagem_atual = img
    }


    //Animação de andar
    animacao_para_direita(t){
        if(!_andando){
            if(t.pos_x <= 53){
                t.pos_x = t.pos_x +1
                t.elemento_html.style.marginLeft = `${t.pos_x}vw`             
            }
        }
        const animacao = t.animacoes.andar_direita
        const img = animacao.diretorio+animacao.numero_da_imagem_atual+".png"
        t.mudar_imagem(img)
        animacao.numero_da_imagem_atual += 1
        if(animacao.numero_da_imagem_atual == animacao.qtd_max_img + 1){
            animacao.numero_da_imagem_atual=0
        }
        
        t.centralizado()
    }


    //Animação de andar
    animacao_para_esquerda(t){
        if(!_andando){
            if(t.pos_x >= -10){
                t.pos_x = t.pos_x -1
                t.elemento_html.style.marginLeft = `${t.pos_x}vw`
                
            }
        }
        const animacao = t.animacoes.andar_esquerda
        const img = animacao.diretorio+animacao.numero_da_imagem_atual+".png"
        t.mudar_imagem(img)
        animacao.numero_da_imagem_atual += 1
        if(animacao.numero_da_imagem_atual == animacao.qtd_max_img + 1){
            animacao.numero_da_imagem_atual=0
        }
        
        t.centralizado()
    }

    //Animacao de pular
    animacao_pular_direita(t){
        let animacao_direita = t.animacoes.pular_direita
        let animacao_esquerda = t.animacoes.pular_esquerda
        if(t.direita){
            const img = animacao_direita.diretorio+animacao_direita.numero_da_imagem_atual+".png"
            t.mudar_imagem(img)
        }else{
            const img = animacao_esquerda.diretorio+animacao_direita.numero_da_imagem_atual+".png"
            t.mudar_imagem(img)
        }
        
        

        if(animacao_direita.numero_da_imagem_atual != 4 || !t.pulando){
            animacao_direita.numero_da_imagem_atual += 1
        }

        if(animacao_esquerda.numero_da_imagem_atual != 4 || !t.pulando){
            animacao_esquerda.numero_da_imagem_atual += 1
        }

        
        if(animacao_direita.numero_da_imagem_atual == 3 || animacao_esquerda.numero_da_imagem_atual == 3 ){
            t.pulando = true
        }

        if(t.pulando && !t.caindo){
            t.pos_y = t.pos_y - 0.2*velocidade_cenario
            t.elemento_html.style.marginTop = `${t.pos_y}vw`
        }

        if(t.pos_y <=10){
            t.caindo = true
            animacao_direita.numero_da_imagem_atual += 1
            animacao_esquerda.numero_da_imagem_atual += 1
        }

        if(t.pulando && t.caindo){
            t.pos_y = t.pos_y + 0.2*velocidade_cenario
            t.elemento_html.style.marginTop = `${t.pos_y}vw`
        }

        if(t.pos_y == t.pos_y_inicial){
            t.pulando = false
            t.caindo = false
        }


        if(animacao_direita.numero_da_imagem_atual == animacao_direita.qtd_max_img + 1 || animacao_esquerda.numero_da_imagem_atual == animacao_direita.qtd_max_img + 1){
            clearInterval(t.animacao_atual)
            t.animacao_atual = null
            animacao_direita.numero_da_imagem_atual = 0
            animacao_esquerda.numero_da_imagem_atual = 0
            if(t.andando_direita){
                t.andando_direita = false
                t.andar_para_direita()
                }else if(t.andando_esquerda){ 
                t.andando_esquerda = false
                t.andar_para_esquerda() 
                }else if(t.direita){
                t.mudar_imagem(t.imagem_padrao_direita)
                }else{
                t.mudar_imagem(t.imagem_padrao_esquerda)
                }
    }
    }
    //Animacao de pular

    //Ação
    andar_para_direita(){
        if(!this.andando_direita && !this.pulando){
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
    pular_para_direita(){
        if(!this.pulando){
        clearInterval(this.animacao_atual)
        this.animacao_atual = null
        this.animacao_atual = setInterval(this.animacao_pular_direita,1000/FPS,this)
        } 
    }

    //Ação
    pular_para_esquerda(){
        if(!this.pulando){
        clearInterval(this.animacao_atual)
        this.animacao_atual = null
        this.animacao_atual = setInterval(this.animacao_pular_esquerda,1000/FPS,this)
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
        document.addEventListener("keydown",(key)=>{if(key.key == 'd' || key.key == "ArrowRight"){
            if(!this.pulando){
                this.andar_para_direita()
            }
            this.andando_esquerda = false
            this.direita = true
        }})
        
        //Volta a imagem padrão caso não haja outros movimentos
        document.addEventListener("keyup",(key)=>{if(key.key == 'd' || key.key == "ArrowRight"){
            if(!this.andando_esquerda && !this.pulando){
                this.parar()
                this.mudar_imagem(this.imagem_padrao_direita)
            }
            this.andando_direita = false;
        }})
        


        //Ativando a movimentação para esquerda a partir do acionamento do teclado
        document.addEventListener("keydown",(key)=>{if(key.key == 'a' || key.key == "ArrowLeft"){
            if(!this.pulando){
            this.andar_para_esquerda()
            };
            this.andando_direita = false
            this.direita = false
              
        }})
        

        //Volta a imagem padrão caso não haja outros movimentos
        document.addEventListener("keyup",(key)=>{if(key.key == 'a' || key.key == "ArrowLeft"){
            if(!this.andando_direita && !this.pulando){
                this.parar()
                this.mudar_imagem(this.imagem_padrao_esquerda)
            };
            this.andando_esquerda = false;
        }})

        document.addEventListener("keydown",(key)=>{if(key.key == ' ' || key.key == "ArrowUp"){this.pular_para_direita()}})

    }
}


class Cenario{


    constructor(img_path, qtd_img, elemento_html_1, elemento_html_2){
        this.elemento_html_1 = elemento_html_1
        this.elemento_html_2 = elemento_html_2
        this.img_path = img_path
        this.qtd_img = qtd_img

        this.imagem_atual = img_path+"0.png"
        this.posicao_atual_1 = -24.5
        this.posicao_atual_2 = 75.5

        this.elemento_html_1.src = this.imagem_atual
        this.elemento_html_2.src = img_path+"1.png"
        
        this.animacao_atual = null
        this.andando_direita = false
        this.andando_esquerda = false
    }

    limite_esquerdo(){
        if(parseInt(this.elemento_html_1.src[51])==0 || parseInt(this.elemento_html_2.src[51])==0){
            if(parseInt(this.elemento_html_1.src[51])==0){
                return [true,this.posicao_atual_1]
            }else{
                return [true,this.posicao_atual_2]
            }
        }else{
            return [false,0]
        }
    }

    limite_direito(){
        if(parseInt(this.elemento_html_1.src[51])==this.qtd_img || parseInt(this.elemento_html_2.src[51])==this.qtd_img){
            if(parseInt(this.elemento_html_1.src[51])==this.qtd_img){
                return [true,this.posicao_atual_1]
            }else{
                return [true,this.posicao_atual_2]
            }
        }else{
            return [false,0]
        }
    }

    ultima_imagem(num_img){
        if(num_img == this.qtd_img){
            return true
        }else{
            return false
        }
    }

    primeira_img(num_img){
        if(num_img == 0){
            return true
        }else{
            return false
        }
    }

    mudar_imagem(elemento_html, img){
        elemento_html.src = img
    }

    proxima_imagem(img_atual){
        let proxima = img_atual.substring(0,51)
        let num_prox_img = parseInt(img_atual[51]) + 2
        proxima = proxima+`${num_prox_img}.png`
        if(num_prox_img > this.qtd_img){
            return  img_atual
        }else{
            return proxima
        }
        
    }

    imagem_anterior(img_atual){
        let proxima = img_atual.substring(0,51)
        let num_prox_img = parseInt(img_atual[51]) - 2 
        proxima = proxima+`${num_prox_img}.png`
        if(num_prox_img > this.qtd_img){
            return  img_atual
        }else{
            return proxima
        }
        
    }


    reposiciona_elemento(vel,t){
        if(vel >= 0 ){

            if(!(t.limite_direito()[0] && t.limite_direito()[1] <= -24)){
                if(player_centralizado){
                t.posicao_atual_1 = t.posicao_atual_1 - 0.1*vel
                t.posicao_atual_2 = t.posicao_atual_2 - 0.1*vel
                t.elemento_html_1.style.marginLeft = t.posicao_atual_1.toString() + "vw"
                t.elemento_html_2.style.marginLeft = t.posicao_atual_2.toString() + "vw"
                _andando = true
                }
                
            }else{
                _andando = false
            }

        }else{
            if(!(t.limite_esquerdo()[0] && t.limite_esquerdo()[1] >= -24)){
                if(player_centralizado){
                t.posicao_atual_1 = t.posicao_atual_1 - 0.1*vel
                t.posicao_atual_2 = t.posicao_atual_2 - 0.1*vel
                t.elemento_html_1.style.marginLeft = t.posicao_atual_1.toString() + "vw"
                t.elemento_html_2.style.marginLeft = t.posicao_atual_2.toString() + "vw"
                _andando = true
                }
                
            }else{
                _andando = false
            }
        }
        

        if(t.posicao_atual_1 <= -120){
            t.posicao_atual_1 = t.posicao_atual_1 + 200
            t.mudar_imagem(t.elemento_html_1,t.proxima_imagem(t.elemento_html_1.src))
        }

        if(t.posicao_atual_1 >= 80){
            t.posicao_atual_1 = t.posicao_atual_1 - 200
            t.mudar_imagem(t.elemento_html_1,t.imagem_anterior(t.elemento_html_1.src))
        }

        if(t.posicao_atual_2 <= -120){
            t.posicao_atual_2 = t.posicao_atual_2 + 200
            t.mudar_imagem(t.elemento_html_2,t.proxima_imagem(t.elemento_html_2.src))
        }

        if(t.posicao_atual_2 >= 80){
            t.posicao_atual_2 = t.posicao_atual_2 - 200
            t.mudar_imagem(t.elemento_html_2,t.imagem_anterior(t.elemento_html_2.src))
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




const player = new Player("img/player/andar/direita/0.png","img/player/andar/esquerda/0.png",document.getElementById("player"))
const cenario = new Cenario("img/cenario/",3,document.getElementById("cenario_1"),document.getElementById("cenario_2"))
cenario.controlador()
player.controlador()



