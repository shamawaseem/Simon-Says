let gameseq=[];
let userseq=[];
let highscore=[];

let started=false;
let level=0;
let btncolor=["red","yellow","purple","green"];

let h4=document.querySelector("h4");

document.addEventListener("keypress",function(){
if(started==false){
    console.log("Game Started.");
    
    started=true;
    levelup();
}
});
function levelup()
{
    userseq=[];
    level++;
    h4.innerText=`Level ${level}`;

    let r=Math.floor(Math.random()*3)+1;
    let rb=btncolor[r];
    let fb=document.querySelector(`.${rb}`);
    gameseq.push(rb);
    console.log(gameseq);
    btnFlash(fb);
}
function btnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function btnpress()
{
    if(started==true)
    {
    let btn=this;
    userFlash(btn);
    let sb=btn.getAttribute("id");
    userseq.push(sb);

    checkans(userseq.length-1);
    }
}

function checkans(ind)
{
    
    if(userseq[ind]===gameseq[ind])
    {
        if(userseq.length==gameseq.length)
        {
            setTimeout(levelup,1000);
        }
    }
    else
    {
        h4.innerHTML=`Game Over. <br>Your Score :<b>${level}</b>.<br>Press any key to start.`;
        highscore.push(level);
        
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";     
        },150);
        level=0;
        started=false;
        gameseq=[];
        userseq=[];
        showscore();
    }
}

let allbtn=document.querySelectorAll(".btn");
for(btn of allbtn)
{
    btn.addEventListener("click",btnpress);
}
function showscore()
{
    let h=highscore.reduce((m,el)=>{
        if(m<el)
        {
            return el;
        }
        else{
            return m;
        }
    });
    h4.innerText=h4.innerText+`Highest score :${h}.`;
}