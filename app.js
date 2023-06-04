
const gameContainer = document.querySelector('.gameContainer');


let containerWidth = "400px";
let containerHeight = "400px";
gameContainer.setAttribute("style",`width:${containerWidth} ; height:${containerHeight}`);

// create board 
// defining box number in side grid
let totalBoxes = 100;
let rowLenght= 10;
let boxes= [];
let totalBombs= 25;
let isGameOver = false;
let flags=0;
function createBoard(){
   
    // creating the random calsses for bombs and empty boxes(vide/empty) to apply to boxes

    const bombsArray = new Array(totalBombs).fill('bomb');
    const emptyArray = new Array(totalBoxes-totalBombs).fill('empty');

    // randomly placing empty and bombs 

    const gameArray = (bombsArray.concat(emptyArray)).sort(()=>Math.random()-0.5) ;

    // another way to generate random array

    //const gameArray2= shuffle((bombsArray.concat(emptyArray)));  
    for (let i=0; i<totalBoxes;i++){
        let box = document.createElement("div");
        box.setAttribute("id",i);
        box.classList.add(gameArray[i])
        gameContainer.appendChild(box);
        boxes.push(box);

        box.addEventListener('click',(e)=>{
           
            click(e.target);
           // calculateTotal(e.target);
          //box.innerHTML=calculateTotal (e);
            
        })

        box.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            addFlag(e.target);
        })
    }

}

createBoard();

const click = (box)=>{

    let total = calculateTotal(box);
    if (isGameOver){
        return
    }

    if ( box.classList.contains('checked')|| box.classList.contains('flag')){
        return
    }

    if( box.classList.contains('bomb')){
        isGameOver = true;
        gameOver(box);
        //console.log("gameover");
    }
    else{
        if (total!=0){
            box.classList.add('checked');
            box.innerHTML= total; 
            return
        } if (total===0){
            massClick(box);
        }
       
    }
     box.classList.add('checked');

}

function gameOver(box){
    
    box.innerHTML= '💣';
    isGameOver = true;
    const lost = document.querySelector(".lost");
    lost.classList.toggle("hidden");
    const button = document.querySelector(".button");
    button.classList.toggle("hidden");
    // to reload the game
    button.addEventListener("click", ()=>{
        location.reload()
    })

    for (let box of boxes){
        let value = box.classList.value;
        if(value ==='bomb'){
           
            box.innerHTML= '💣';
           // square.classList.remove('bomb')
            box.classList.add('checked');
        }
    }

}

// add Falg

function addFlag(box){
   
    if(isGameOver){
        return
    }
    if(!box.classList.contains('checked') && flags<totalBombs ){
        if(!box.classList.contains('flag')){
            box.classList.add('flag');
            box.innerHTML='🚩';
            flags++
            gameWin();
        }else{
            box.classList.remove('flag')
            box.innerHTML='';
            flags--;
        }
    }

}
// to check win
function gameWin(){

    let contest = 0;
    for (let i=0; i<boxes.length;i++){
        if(boxes[i].classList.contains('flag') && boxes[i].classList.contains('bomb')){
            contest++
        }
        if(contest === totalBombs){
            const win = document.querySelector(".won");
            win.classList.toggle("hidden");
            const button = document.querySelector(".button");
            button.classList.toggle("hidden");
            // to reload the game
            button.addEventListener("click", ()=>{
                location.reload()
            })
        }
    }
   
}

function massClick(box){
    let x= Number(box.id);
    let width= rowLenght;
    const isLeftEdge = (x % rowLenght === 0);
    const isRightEdge = (x % rowLenght === (rowLenght-1));

        setTimeout(()=>{
        if(x>0 && !isLeftEdge){
            const newBox= document.getElementById(x-1);
            click(newBox)
        }
        
        if(x<89 ){
            const newBox= document.getElementById(x+rowLenght);
            click(newBox)
        }
        if(x>10){
            const newBox= document.getElementById(x-rowLenght);
            click(newBox)
        }
        if(x<98 && !isRightEdge){
            const newBox= document.getElementById(x+1);
            click(newBox)
        }
        if(x>11 && !isLeftEdge){
            const newBox= document.getElementById(x-1-rowLenght);
            click(newBox,newBox.event)
        }
        if(x<90 && !isLeftEdge){
            const newBox= document.getElementById(x-1+rowLenght);
            click(newBox)
        }
        if(x<88 && !isRightEdge ){
            const newBox= document.getElementById(x+1+rowLenght);
            click(newBox)
        }
        if(x>9 && !isRightEdge){
            const newBox= document.getElementById(x+1-rowLenght);
            click(newBox)
        }

    },5)

}

function calculateTotal(box){
    let x= Number(box.id);
    let y= box.classList.value;
    let total = 0;
    const isLeftEdge = (x % rowLenght === 0);
    const isRightEdge = (x % rowLenght === (rowLenght-1))

    if (y.includes("empty")){
        if(x>0 && !isLeftEdge &&boxes[x-1].classList.contains('bomb')){
            total++
        }
        if(x<89 && boxes[x+rowLenght].classList.contains('bomb')){
            total++
        }
        if(x>10 && boxes[x-rowLenght].classList.contains('bomb')){
            total++
        }
        if(x<98 && !isRightEdge && boxes[x+1].classList.contains('bomb')){
            total++
        }
        if(x>11 && !isLeftEdge && boxes[x-1-rowLenght].classList.contains('bomb')){
            total++
        }
        if(x<90 && isLeftEdge && boxes[x-1+rowLenght].classList.contains('bomb')){
            total++
        }
        if(x<88 && !isRightEdge && boxes[x+1+rowLenght].classList.contains('bomb')){
            total++
        }
        if(x>9 && !isRightEdge &&boxes[x+1-rowLenght].classList.contains('bomb')){
            total++
        }
       // alert("hi")
    }
    return Number(total)
    
}


//The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
      while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;
    let intervalID = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;
  
      if (--timer < 0) {
        clearInterval(intervalID);
        alert("Game Over!");
      }
    }, 1000);
  }
  
  window.onload = function () {
    let timeout = 150; // unit: seconds
    let display = document.querySelector("#time");
    startTimer(timeout, display);
  };



  


  
  
  