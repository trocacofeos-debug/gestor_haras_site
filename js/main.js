/* ==========================================
   MAIN JS
   HARAS PREMIUM
========================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{



/* ==========================================
   ANO FOOTER
========================================== */


const year =
document.getElementById("year");


if(year){

year.textContent =
new Date().getFullYear();

}





/* ==========================================
   MENU MOBILE
========================================== */


const menuBtn =
document.getElementById("menuBtn");


const mobileMenu =
document.getElementById("mobileMenu");



if(menuBtn && mobileMenu){



menuBtn.addEventListener(
"click",
()=>{


mobileMenu.classList.toggle(
"hidden"
);



menuBtn.classList.toggle(
"active"
);



});





mobileMenu
.querySelectorAll("a")
.forEach(link=>{


link.addEventListener(
"click",
()=>{


mobileMenu.classList.add(
"hidden"
);


});


});



}









/* ==========================================
   NAVBAR SCROLL PREMIUM
========================================== */


const navbar =
document.getElementById("navbar");



if(navbar){


window.addEventListener(
"scroll",
()=>{



if(window.scrollY > 80){



navbar.classList.add(

"bg-black/90",

"backdrop-blur-xl"

);



}else{



navbar.classList.remove(

"bg-black/90",

"backdrop-blur-xl"

);



}



});


}









/* ==========================================
   LOADER
========================================== */


const loader =
document.getElementById("loader");


const loaderBar =
document.getElementById("loaderBar");




if(loader){



setTimeout(()=>{


if(loaderBar){


loaderBar.style.width =
"100%";


}


},100);






window.addEventListener(
"load",
()=>{


setTimeout(()=>{


loader.style.opacity =
"0";


loader.style.pointerEvents =
"none";




setTimeout(()=>{


loader.remove();


},1000);



},1200);



});


}









/* ==========================================
   VIDEO FALLBACK
========================================== */


const video =
document.getElementById("heroVideo");



if(video){



video.addEventListener(
"error",
()=>{


video.style.display =
"none";


});


}









/* ==========================================
   CONTADORES ANIMADOS
========================================== */


const counters =
document.querySelectorAll(
".counter"
);



counters.forEach(
counter=>{



let started=false;



const animate=()=>{


if(started)
return;



started=true;



const target =
Number(
counter.dataset.number
);



let current=0;



const speed =
target / 80;



const timer =
setInterval(
()=>{



current += speed;



if(current >= target){



counter.innerText =
target;



clearInterval(timer);



}else{



counter.innerText =
Math.floor(current);



}



},
20
);



};






const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(
entry=>{


if(entry.isIntersecting){


animate();


}



});


},
{

threshold:.6

}
);





observer.observe(counter);



});









/* ==========================================
   SCROLL REVEAL
========================================== */


const revealElements =
document.querySelectorAll(

`
.scroll-left,
.scroll-right,
.luxury-card,
.card-premium,
.horse-card,
.gallery-card,
.stat-card
`

);






const revealObserver =
new IntersectionObserver(

(entries)=>{


entries.forEach(
entry=>{


if(entry.isIntersecting){



entry.target.classList.add(
"active"
);



}


});


},
{

threshold:.15

}

);






revealElements.forEach(
element=>{


revealObserver.observe(
element
);


});









/* ==========================================
   EFEITO PARALLAX HERO
========================================== */


const hero =
document.querySelector(
".hero-video"
);



if(hero){



window.addEventListener(
"scroll",
()=>{


const offset =
window.scrollY * 0.25;



hero.style.transform =
`
scale(1.1)
translateY(${offset}px)
`;



});


}









/* ==========================================
   BOTÕES MAGNÉTICOS
========================================== */


const buttons =
document.querySelectorAll(
".magnetic-btn"
);



buttons.forEach(
button=>{


button.addEventListener(
"mousemove",
(e)=>{



const rect =
button.getBoundingClientRect();



const x =
e.clientX - rect.left -
rect.width / 2;



const y =
e.clientY - rect.top -
rect.height / 2;




button.style.transform =
`

translate(
${x * .15}px,
${y * .15}px
)

`;



});





button.addEventListener(
"mouseleave",
()=>{


button.style.transform =
"translate(0,0)";


});



});









/* ==========================================
   ANIMAÇÃO IMAGENS
========================================== */


const images =
document.querySelectorAll(
"img"
);



images.forEach(
img=>{



img.addEventListener(
"load",
()=>{


img.classList.add(
"loaded"
);


});


});









/* ==========================================
   SMOOTH LINKS
========================================== */


document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(
link=>{


link.addEventListener(
"click",
function(e){



const target =
document.querySelector(
this.getAttribute("href")
);



if(target){


e.preventDefault();



target.scrollIntoView({

behavior:"smooth"

});


}



});



});








});