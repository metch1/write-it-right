const DIGITS=3,TIME_LIMIT=20;
let target=genNum(),current="",locked=false,totalTyped=0;
const box=document.querySelector(".target-big"),
      progress=document.querySelector(".progress-main"),
      keys=document.querySelectorAll(".key");

initTarget(target);updateUI();startTimer(TIME_LIMIT);

keys.forEach(k=>k.addEventListener("click",()=>{
  if(locked)return;playClick();
  const v=k.textContent;
  if(v==="C")current="";
  else if(v==="⌫")current=current.slice(0,-1);
  else if(current.length<DIGITS)current+=v;
  fastCheck();updateUI();
}));

function initTarget(n){box.innerHTML="";[...n].forEach(d=>box.appendChild(Object.assign(document.createElement("span"),{textContent:d})))}
function updateUI(){box.querySelectorAll("span").forEach((s,i)=>s.classList.toggle("revealed",current[i]===s.textContent))}
function fastCheck(){const s=box.querySelectorAll("span");for(let i=0;i<current.length;i++)if(current[i]!==s[i].textContent){wrong();return;}if(current.length===DIGITS)win()}
function wrong(){current="";flash(box,"flash-red");playSound(wrongSnd);target=genNum();initTarget(target)}
function win(){locked=true;totalTyped++;flash(box,"flash-green");playSound(correctSnd);setTimeout(()=>{current="";locked=false;target=genNum();initTarget(target)},300)}
function startTimer(sec){const start=Date.now(),i=setInterval(()=>{const e=(Date.now()-start)/1000,p=Math.min((e/sec)*100,100);progress.style.width=p+"%";if(e>=sec){clearInterval(i);endGame()}},20)}
function endGame(){locked=true;setTimeout(()=>{alert(`⏱ Time's up! You typed ${totalTyped} correct numbers`);totalTyped=0;current="";locked=false;target=genNum();initTarget(target);progress.style.width="0%";startTimer(TIME_LIMIT)},100)}
function flash(el,c){el.classList.add(c);setTimeout(()=>el.classList.remove(c),400)}
function genNum(){return String(Math.floor(Math.random()*1000)).padStart(DIGITS,"0")}
