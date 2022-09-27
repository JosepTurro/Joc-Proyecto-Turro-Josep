//Quan està amb majusccules (comentaris) es el titol de un apartat

window.onload = () => { 
    document.getElementById('start-button').onclick = () => {
        startGame();
    };





    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // DEFINICION DE VARIABLES/CONSTANTES
    //Fem una variable per guardar i crear img per poder interactuar amb ella
    const imgFondo = document.createElement("img");
    imgFondo.setAttribute("src", "images/fondo_img.png");
    let frames = 0;
    let interval;
    let jugador_x = canvas.width-1340;
    let jugador_y = canvas.height -600;
    let temporitzador = 0;
    const obstaclesArr = [];
    let jugador;
    let botellesArr = [];
    

    class Botelles {
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.height = 70;
            this.width = 40; 
           
        }
        pintarBot (){
            ctx.fillStyle = 'red';
            ctx.fillRect (this.x, this.y, this.width, this.height);
           
       }
       chocaBot (){
           
           if (!(((jugador_x + 40) < this.x) || (jugador_y > (this.y + this.height)) || (jugador_x > (this.x + this.width)) || ((jugador_y + 40) < this.y))) {
               clearInterval(interval);
              
           }

           
       }
   }

   const botTopRight = new Botelles (1255, 76);
    const botTopLeft = new Botelles (774, 76);
    const botBottomRight = new Botelles (1255, 546);
    const botBottomLeft = new Botelles (774, 546);

    botellesArr = [botTopRight, botTopLeft, botBottomRight, botBottomLeft];
    
    // const botellesArr = [];   ///// proba botelles

    
    
    
    function startGame() {
       
        interval = setInterval(update, 20);
        
        
    }

    function update(){
       frames ++;
       
        
        //LIMPIAR
        //RECALCULAR ---- Posicio del obstacles.
        obstaclesArr.forEach((obstaculo) => {
            obstaculo.y -= 6.5; // velocitat obstacle
        })
        
        //botelles
       

        
        if (frames % 100 == 0){ // aqui fas que quan acbi la arry de obstacles retorni
            //crear obstaculo
            let obstacle = new Obstacle();
            obstaclesArr.push(obstacle);
        }
        


        // REPINTAR
        //fondu
        ctx.drawImage(imgFondo, 0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
        //jugador
        ctx.fillStyle = 'green'
        jugador= ctx.fillRect(jugador_x, jugador_y, 40, 40);
        //botelles
       
        


        // obstacles
        obstaclesArr.forEach((obstacle) => {    // Aquest loop far que recorri laarry de objectes (que vagin surtin)
            obstacle.pintar();
            obstacle.choca();
            
            
           
        })
        
        // botelles // nomes aqui xq son ffixes;
        botellesArr.forEach((botella)=>{
            botella.pintarBot();
            botella.chocaBot();
        })

        


       
        

    }

    // MOVIMENT DEL TT

    document.body.addEventListener("keydown", (e) => {
        
        //Moviment eix x.
        if (e.key == "ArrowLeft") {
          if(jugador_x > 22) jugador_x -= 10;
        //   if(jugador_x> canvas.width-62) jugador_x -=0;
        } else if (e.key == "ArrowRight"){
          if (jugador_x < (canvas.width - 62)) jugador_x += 10;
        }
        //Moviment eix y.
        if (e.key == "ArrowUp") {
            if(jugador_y > 22) jugador_y -= 10;
          } else if (e.key == "ArrowDown"){
            if (jugador_y < (canvas.height - 62)) jugador_y += 10;
    
            // if (jugador_y>canvas.height-62)jugador_y -=0;
          }

        
      })

   

    class Obstacle {
        constructor(){
            let maximaPosicio_x = 680;
            this.width = 70;
            this.height = 70;
            this.x = Math.floor(Math.random() * (maximaPosicio_x - 70));
            this.y = 600;

        }

        pintar(){
            ctx.fillStyle = 'black'
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        choca (){
             if (!(((jugador_x + 40) < this.x) || (jugador_y > (this.y + this.height)) || (jugador_x > (this.x + this.width)) || ((jugador_y + 40) < this.y))) {
                 clearInterval(interval);
                
             }

        }
    }

    // class ParetsFoc {
    //     constructor (){
    //         this.width = 22;
    //         this.height = 239;
    //         this

    //     }
    // }

    

   

    
    
    // class Persesguidor {
    //     constructor(){
    //         let minimaPosicio_x = 710;
    //         let maximaPosicioPer_x = 
    //         this.width = 70;
    //         this.height = 70;
    //         this.x = Math.floor(Math.random() * (maximaPosicio_x - 70));
    //         this.y = 600; 
    //     }
    // }

     
}



// botelles = queda ficar el choca a la classe i despres ficar el for en elupdate a sota de linea 86
