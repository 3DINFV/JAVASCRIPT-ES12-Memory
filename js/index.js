"option strict";
//let vetImg = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
let vetImg = new Array(16).fill(-1);
let casella1=null;
let casella2=null;
let turno = 0;
let nMosse = 0;

window.onload = function (){
    console.log(vetImg);
    generaVettore();
    let body = document.getElementsByTagName("body")[0];
    let h1 = document.createElement("h1");
    h1.innerHTML = "Gioco del memory";
    body.append(h1);
    h1.style.margin = "30px auto";
    h1.style.border = "2px solid black";
    h1.style.width="300px";
    h1.style.textAlign="center";
    let wrapper = document.createElement("div");
    body.append(wrapper);
    wrapper.style.margin = "30px auto";
    wrapper.style.border = "2px solid navy"
    wrapper.style.height = "450px";
    wrapper.style.width = "460px";
    for(let i=0; i<16;i++){
        let div=document.createElement("div");
        div.id = "div"+i; // equivalente a div.setAttribute("id")=...
        wrapper.append(div);
        div.classList.add("caselle");
        div.setAttribute("immagine","img"+vetImg[i]);
        // div.addEventListener("click",clickCella);
        div.onclick = clickCella;
    }
}

function clickCella(){
    this.style.backgroundImage = "url('img/"+this.getAttribute("immagine")+".png')";
    casella2 = casella1;
    casella1=this;
    if(turno %2 != 0){
        let caselle = document.getElementsByClassName("caselle");
        for(let i=0;i<caselle.length;i++)
            caselle[i].classList.add("disabled-click");
        if(casella1.style.backgroundImage != casella2.style.backgroundImage){
            setTimeout(()=>{
                casella1.style.backgroundImage = "url('img/retro.jpg')";
                casella2.style.backgroundImage = "url('img/retro.jpg')";
                document.querySelectorAll(".caselle").forEach(div => {
                    div.classList.remove("disabled-click");
                });
                document.querySelectorAll(".indovinato").forEach(div => {
                    div.classList.add("disabled-click");
                });
            },1000);
        }else{
            casella1.classList.add("indovinato");
            casella2.classList.add("indovinato");
            document.querySelectorAll(".caselle").forEach(div => {
                div.classList.remove("disabled-click");
            });
            document.querySelectorAll(".indovinato").forEach(div => {
                div.classList.add("disabled-click");
            });
            nMosse++;
            if(nMosse === 8)
                alert("Partita terminata");
        }
    }
    turno++;
}

function generaVettore(){
    let n;
    for(let i=0;i<8;i++){
        n=0;
        do{
            let pos=Math.floor(Math.random()*16);
            if(vetImg[pos]===-1){
                vetImg[pos]=i;
                n++;
            }
        }while (n!=2);
    }
    console.log(vetImg);
}
