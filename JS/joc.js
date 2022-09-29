//Quan està amb majusccules (comentaris) es el titol de un apartat


// window.onload = () => { 
    
    let intervalo;
    document.getElementById('start-button').onclick = () => {
        startGame();
       intervalo= setInterval(updateCountdown, 700)
    };

    
    
   
    const countDownEl = document.getElementById("countdown")
    
    let time =  30;
    
    function updateCountdown() {
       
        const minutes = Math.floor(time / 30)
        let seconds = time % 30
        seconds = seconds < 10 ? "0" + seconds : seconds;
        countDownEl.innerHTML = `${seconds}`
        time--
    }

    
    
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    

    // DEFINICIÓ DE VARIABLES/CONSTANTES
    //Fem una variable per guardar i crear img per poder interactuar amb ella
    const imgFondo = document.createElement("img");
    imgFondo.setAttribute("src", "images/fondo_massa_bo.png");
    const imgMurFoc = document.createElement("img");
    imgMurFoc.setAttribute("src", "images/ppp.png");
    const imgBot = document.createElement('img');
    imgBot.setAttribute("src", "images/botella_a.png");
    const fotoJugador = document.createElement('img');
    fotoJugador.setAttribute("src", "images/foto_chill.png");
    const winner = document.createElement('img');
    winner.setAttribute("src", "images/winner.jpg")
    const loser = document.createElement("img");
    loser.setAttribute("src", "images/GameOver.jpg");
    //  const fotoJugadorChill = document.createElement('img');
    //  fotoJugador.setAttribute("src", "images/cara_enfado.png");
    const ratoli = document.createElement('img');
    ratoli.setAttribute("src", "images/ratolinet.png");
    
    
    
    let frames = 0;
    let interval;
    let jugador_x = canvas.width-1340;
    let jugador_y = canvas.height -600;
    let temporitzador = 0;
    const obstaclesArr = [];
    let jugador;
    let botellesArr = [];
    let foc = [];

    // DEINICIÓ DE CLASSES (EXCEPTE JUGAR QUE EL POSEM DINS UPDATE)
    
    

    class Botelles {
        constructor(x, y){
            this.x = x;
            this.y = y;
            this.height = 73;
            this.width = 73; 
        }
        pintarBot (){
            //  ctx.fillStyle = 'red';
            //   ctx.fillRect (this.x, this.y, this.width, this.height);
            ctx.drawImage(imgBot, this.x, this.y, this.width, this.height);
            
            
        }
       chocaBot (){
        
        if (!(((jugador_x + 73) < this.x) || (jugador_y > (this.y + this.height)) || (jugador_x > (this.x + this.width)) || ((jugador_y + 73) < this.y))) {
            return true
        }
           return false;
        }
   }

    const botTopRight = new Botelles (1255, 76);
    const centerBot = new Botelles (1030,318);
    const botTopLeft = new Botelles (774, 76);
    const botBottomRight = new Botelles (1255, 446);
    const botBottomLeft = new Botelles (774, 446);

    botellesArr = [botTopRight, botTopLeft, botBottomRight, botBottomLeft, centerBot];
    
    class ParedFoc{
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.height = 251;
            this.width =73;  
        }
        pintarFoc(){
            // ctx.fillStyle = 'orange'
            // ctx.fillRect (this.x, this.y, this.width, this.height);
            ctx.drawImage(imgMurFoc, this.x, this.y, this.width, this.height);
            
        }
        chocaFoc (){
            if (!(((jugador_x + 73) < this.x) || (jugador_y > (this.y + this.height)) || (jugador_x > (this.x + this.width)) || ((jugador_y + 73) < this.y))) {
                clearInterval(interval);
                gameOver();
               
            }  
        }
        
    }

    const topFoc = new ParedFoc(623,0);
    const botFoc = new ParedFoc(623,379);
    foc = [topFoc, botFoc];

    
   /* BOOONUUUS
    class Persesguidor {
        constructor(){
            this.width = 50;
            this.height = 50;
            let maxPos_x = 1347 - this.width;
            let miniPos_x = 706;
            let maxPos_y = 23;
            let miniPos_y = 612 - this.height;
            this.x = ( Math.floor(Math.random() * (Math.floor(maxPos_x) - Math.ceil(miniPos_x)) +  Math.ceil(miniPos_x)));
            this.y = ( Math.floor(Math.random() * (Math.floor(maxPos_y) - Math.ceil(miniPos_y)) +  Math.ceil(miniPos_y)));
        }
        pintarPers(){
            ctx.fillStyle='blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }


    }
    */
    let chocaCompr = false;
    class Obstacle {
        constructor(){
            let maximaPosicio_x = 625;
            this.width = 73;
            this.height = 73;
            this.x = Math.floor(Math.random() * (maximaPosicio_x - 73));
            this.y = 600;

        }

        pintar(){
            // ctx.fillStyle = 'black'
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(ratoli, this.x, this.y, this.width, this.height);
        }
        choca (){
             if (!(((jugador_x + 73) < this.x) || (jugador_y > (this.y + this.height)) || (jugador_x > (this.x + this.width)) || ((jugador_y + 73) < this.y))) {
                 clearInterval(interval);
                    gameOver();
                
             }

        }
    }
        
    function startGame() {
       
        interval = setInterval(update, 20);
        document.getElementById("start").remove();
        
        
    }

    function update(){
       frames ++;
        //LIMPPIAR
        //RECALCULAR ---- Posicio del obstacles.
        obstaclesArr.forEach((obstaculo) => {
            obstaculo.y -= 6.5; // velocitat obstacle
        })
        
        if (frames % 100 == 0){ // aqui fas que quan acbi la arry de obstacles retorni
            //crear obstaculo
            let obstacle = new Obstacle();
            obstaclesArr.push(obstacle);
        }
        
        // REPINTAR
        //fondu
        ctx.drawImage(imgFondo, 0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
        //jugador
        //ctx.fillStyle = 'green'
        jugador= ctx.drawImage(fotoJugador, jugador_x, jugador_y, 73, 73); //ctx.fillRect(jugador_x, jugador_y, 73, 73);
        
        
       
        // obstacles
        obstaclesArr.forEach((obstacle) => {    // Aquest loop far que recorri laarry de objectes (que vagin surtin)
            obstacle.pintar();
            obstacle.choca();


           
        })
        
        
        // botelles // nomes aquì xq son fixes;
        botellesArr.forEach((botella, k)=>{     //Aqui recorrem l'array de botelles per comprobar si chocca o no gracies a la variable
            let comprovacio = botella.chocaBot();// i si choca es true doncs la traiem del array
            if (comprovacio){
               
                botellesArr.splice(k,1);
                return;
            } 
            
            botella.pintarBot();  // fem que les pinti cada frame // ja que el jugador esta en moviment
        })
        if (botellesArr.length == 0){ // si l'array de botelles esta buida hem guanyat
            win();
        }

        // Foc
        foc.forEach((mur)=>{
            mur.pintarFoc();
            mur.chocaFoc();

        })

        
        if (time< 0){
            clearInterval(intervalo);
            gameOver()
            
        }
       
        
        

    }

   

    
    

    // MOVIMENT DEL TT

    document.body.addEventListener("keydown", (e) => {
        
        //Moviment eix x.
        if (e.key == "ArrowLeft") {
          if(jugador_x > 22) jugador_x -= 10;
        //   if(jugador_x> canvas.width-62) jugador_x -=0;
        } else if (e.key == "ArrowRight"){
          if (jugador_x < (canvas.width - 62)) jugador_x += 30;
        }
        //Moviment eix y.
        if (e.key == "ArrowUp") {
            if(jugador_y > 22) jugador_y -= 10;
          } else if (e.key == "ArrowDown"){
            if (jugador_y < (canvas.height - 62)) jugador_y += 30;
    
            // if (jugador_y>canvas.height-62)jugador_y -=0;
          }

    });

    // Definim el gameOver i el win

    function gameOver() {
        // ctx.fillStyle='green'
        // ctx.fillRect (0,0,400,600);
        ctx.drawImage(loser, 0, 0,canvas.getAttribute("width"), canvas.getAttribute("height") );
        clearInterval(intervalo);
        clearInterval(interval);
        botellesArr.delete();
        
        
    }

    function win(){
        // ctx.fillStyle='blue'
        // ctx.fillRect (0,300,400,600);
        ctx.drawImage (winner, 0, 0,canvas.getAttribute("width"), canvas.getAttribute("height") );
        clearInterval(intervalo);
        clearInterval(interval);
        botellesArr.delete();
                
    }

    


     
// }




