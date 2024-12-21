let colors = ["green", "red", "yellow", "blue"];
let gameSeq = [];
let userSeq = [];

let level = 0;
let highestScore = 0;
let started = false;

let body = document.querySelector('body');
let btns = document.querySelectorAll(".btn");
let h2 = document.querySelector("h2");

function gameFlash(){
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSeq.push(randomColor);
    console.log(randomColor);
    let randomBtn = document.querySelector(`.${randomColor}`);
    console.log(randomBtn);
    randomBtn.classList.add("flash");
    setTimeout(function(){
        randomBtn.classList.remove("flash");
    }, 200);
};

function levelUp(){
    level = ++level;
    h2.innerText = "Level - " + level;
    userSeq = [];
    gameFlash();
};

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        body.style.backgroundColor = "red";
        setTimeout(() => {
            body.style.backgroundColor = "rgba(48, 25, 52, .9)";
        }, 150);
        if(!highestScore){
            highestScore = level;
            h2.innerText = `GAME OVER! Your highest score was ${highestScore}. Press any key to start`;
        }else if(highestScore < level){
            highestScore = level;
            h2.innerText = `Congratulations! Your highest score is ${highestScore}. Press any key to start`;
        }else{
            h2.innerText = `GAME OVER! Your score is ${level} and highest score was ${highestScore} . Press any key to start`;
        }
        started = false;
        gameSeq = [];
        userSeq = [];
        level = 0;
    }
};

function userFlash(){
    this.classList.add("flash");
    setTimeout(() => {
        this.classList.remove("flash");
    }, 250);
    let userColor = this.classList[1];
    userSeq.push(userColor);
    idx = userSeq.length -1;
    checkAns(idx);
}

for(let btn of btns){
    btn.addEventListener("click", userFlash)
}

document.addEventListener("keypress", () => {
    if(!started){
     started = true;
     levelUp();
    }
});