import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
} from 
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



const lista = document.getElementById("listaCavalos");



async function carregarCavalos(){


    console.log("INICIANDO TESTE FIREBASE");

    try {


        const snapshot = await getDocs(
            collection(db,"cavalos")
        );



        console.log(
            "Quantidade encontrada:",
            snapshot.size
        );



        lista.innerHTML="";



        if(snapshot.empty){

            lista.innerHTML=`

            <div class="col-span-full text-center py-20">

            <h3 class="text-gray-400 text-xl">
            Nenhum cavalo cadastrado
            </h3>

            </div>

            `;

            return;

        }





        let total=0;



        snapshot.forEach(doc=>{


            console.log(
                "DOCUMENTO:",
                doc.id
            );



            const cavalo = doc.data();



            console.log(
                cavalo
            );




            /*
            ===========================
            FILTRO DISPONIBILIDADE
            ===========================
            */


            const status = 
            String(
                cavalo.status || ""
            )
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g,"")
            .toLowerCase()
            .trim();



            if(status){

                if(
                    status !== "disponivel"
                ){

                    console.log(
                        "Ignorado por status:",
                        status
                    );

                    return;

                }

            }





            if(
                cavalo.vendido === true
            ){

                console.log(
                    "Ignorado vendido"
                );

                return;

            }






            total++;




            const foto =

            cavalo.fotoPrincipal ||

            (
                Array.isArray(cavalo.fotos)
                &&
                cavalo.fotos.length > 0
                ?
                cavalo.fotos[0]
                :
                null
            )

            ||

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







            lista.innerHTML += `


<div

class="
group
bg-black
rounded-[35px]
overflow-hidden
border
border-neutral-800
hover:border-yellow-500/50
shadow-2xl
transition
duration-500
hover:-translate-y-3
">


<div

class="
relative
h-[350px]
overflow-hidden
">


<img

src="${foto}"

class="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-700
"

onerror="this.src='assets/images/sem-foto.jpg'"

>



<span

class="
absolute
top-5
right-5
bg-black/80
border
border-yellow-500
text-yellow-500
px-4
py-2
rounded-full
text-xs
font-bold
">

Disponível

</span>



</div>







<div class="p-7">



<h3

class="
title-font
text-3xl
">

${cavalo.nome || "Cavalo Premium"}

</h3>




<p

class="
text-yellow-500
mt-3
font-semibold
">

${cavalo.raca || "Raça não informada"}

</p>





<div

class="
grid
grid-cols-2
gap-4
mt-6
text-gray-400
text-sm
">


<div>

Idade

<br>

${cavalo.idade || "-"}

</div>




<div>

Sexo

<br>

${cavalo.sexo || "-"}

</div>




<div>

Pelagem

<br>

${cavalo.pelagem || "-"}

</div>




<div>

Registro

<br>

${cavalo.registro || "-"}

</div>


</div>






<p

class="
text-gray-400
mt-6
line-clamp-3
">

${cavalo.descricao || 
"Animal selecionado pelo Gestor Haras."}

</p>







<div

class="
flex
justify-between
items-center
mt-8
">


<div>


<span

class="
text-xs
text-gray-500
uppercase
">

Valor

</span>



<div

class="
text-yellow-500
font-bold
text-xl
">

${preco}

</div>


</div>





<a

href="
detalhe-cavalo.html?id=${doc.id}
"

class="
bg-yellow-500
text-black
px-6
py-3
rounded-xl
font-bold
hover:scale-105
transition
">

Detalhes

</a>




</div>



</div>



</div>



`;





        });







        console.log(
            "Cavalos exibidos:",
            total
        );





        if(total===0){


            lista.innerHTML=`

            <div class="col-span-full text-center py-20">

            <h3 class="text-gray-400 text-xl">

            Nenhum cavalo disponível

            </h3>


            </div>

            `;


        }




    }

    catch(error){


        console.error(
            "ERRO FIREBASE:",
            error
        );



        lista.innerHTML=`

        <div class="col-span-full text-center py-20">


        <p class="text-red-500">

        Erro ao carregar cavalos

        </p>


        <p class="text-gray-400">

        ${error.message}

        </p>


        </div>

        `;


    }



}



carregarCavalos();