import { db } from "./firebase-config.js";

import {
    doc,
    getDoc
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



console.log("Detalhe cavalo iniciado");



const params = new URLSearchParams(
    window.location.search
);


const id = params.get("id");



const container =
document.getElementById(
    "detalheCavalo"
);



if(!id){

    container.innerHTML = `

    <div class="text-center py-20">

    <h2 class="text-red-500 text-2xl">

    Cavalo não encontrado

    </h2>

    </div>

    `;

    throw new Error(
        "ID do cavalo ausente"
    );

}





async function carregarDetalhe(){


try{


    console.log(
        "Buscando cavalo:",
        id
    );



    const referencia = doc(
        db,
        "cavalos",
        id
    );



    const snap =
    await getDoc(
        referencia
    );





    if(!snap.exists()){


        container.innerHTML = `

        <div class="text-center py-20">


        <h2 class="text-gray-400 text-2xl">

        Cavalo não encontrado

        </h2>


        </div>

        `;


        return;

    }





    const cavalo =
    snap.data();




    console.log(
        cavalo
    );







    const fotos =

    Array.isArray(
        cavalo.fotos
    )

    ?

    cavalo.fotos

    :

    [];





    const imagemPrincipal =

    fotos.length > 0

    ?

    fotos[0]

    :

    "assets/images/sem-foto.jpg";






    const preco =

    Number(
        cavalo.preco || 0
    )
    .toLocaleString(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    );








    let galeria = "";



    fotos.forEach(
        foto=>{


        galeria += `


        <img

        src="${foto}"

        class="
        w-24
        h-24
        object-cover
        rounded-xl
        border
        border-neutral-800
        hover:border-yellow-500
        cursor-pointer
        "

        onclick="
        trocarImagem('${foto}')
        "

        onerror="
        this.src='assets/images/sem-foto.jpg'
        "

        >


        `;


        }

    );








container.innerHTML = `




<div

class="
grid
lg:grid-cols-2
gap-12
">






<!-- IMAGENS -->

<div>


<div

class="
relative
rounded-[40px]
overflow-hidden
border
border-yellow-500/20
">




<img

id="imagemPrincipal"

src="${imagemPrincipal}"

class="
w-full
h-[550px]
object-cover
"

onerror="
this.src='assets/images/sem-foto.jpg'
"

>


</div>






<div

class="
flex
gap-4
mt-6
overflow-x-auto
">

${galeria}


</div>



</div>










<!-- INFORMAÇÕES -->

<div>



<span

class="
text-yellow-500
uppercase
tracking-[5px]
text-xs
font-bold
">

Cavalo Premium

</span>





<h1

class="
title-font
text-5xl
md:text-7xl
mt-5
mb-6
">

${cavalo.nome || "Animal Selecionado"}

</h1>







<p

class="
text-yellow-500
text-2xl
font-bold
mb-8
">

${preco}

</p>









<div

class="
grid
grid-cols-2
gap-5
mb-10
">



<div class="glass rounded-2xl p-5">

<p class="text-gray-500 text-sm">

Raça

</p>

<strong>

${cavalo.raca || "-"}

</strong>

</div>





<div class="glass rounded-2xl p-5">

<p class="text-gray-500 text-sm">

Idade

</p>

<strong>

${cavalo.idade || "-"}

</strong>

</div>





<div class="glass rounded-2xl p-5">

<p class="text-gray-500 text-sm">

Sexo

</p>

<strong>

${cavalo.sexo || "-"}

</strong>

</div>





<div class="glass rounded-2xl p-5">

<p class="text-gray-500 text-sm">

Pelagem

</p>

<strong>

${cavalo.pelagem || "-"}

</strong>

</div>






<div class="glass rounded-2xl p-5">

<p class="text-gray-500 text-sm">

Registro

</p>

<strong>

${cavalo.registro || "-"}

</strong>

</div>





<div class="glass rounded-2xl p-5">

<p class="text-gray-500 text-sm">

Status

</p>

<strong class="text-yellow-500">

${cavalo.status || "Disponível"}

</strong>

</div>




</div>








<div class="mb-10">


<h3

class="
title-font
text-3xl
mb-4
">

Descrição

</h3>



<p

class="
text-gray-400
leading-relaxed
">

${cavalo.descricao || 
"Animal selecionado pelo Gestor Haras."}

</p>


</div>







<a

id="whatsappCompra"

target="_blank"

class="
btn-gold
w-full
text-center
text-lg
cursor-pointer
">

Tenho interesse neste cavalo

</a>






</div>



</div>





`;







const whatsapp =
document.getElementById(
    "whatsappCompra"
);



if(whatsapp){



const numero =
"5521999999999";



const mensagem = encodeURIComponent(

`Olá! Tenho interesse no cavalo ${cavalo.nome || ""}. Valor ${preco}.`

);



whatsapp.href =
`https://wa.me/${numero}?text=${mensagem}`;


}







}

catch(error){


console.error(
    "Erro detalhe:",
    error
);



container.innerHTML = `

<div class="text-center py-20">

<p class="text-red-500">

Erro ao carregar cavalo

</p>

<p class="text-gray-500">

${error.message}

</p>

</div>

`;

}



}






window.trocarImagem =
function(url){


const img =
document.getElementById(
    "imagemPrincipal"
);


if(img){

img.src=url;

}


};





carregarDetalhe();