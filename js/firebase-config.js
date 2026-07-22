import {
initializeApp
}
from 
"https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";


import {
getFirestore
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {

apiKey:"AIzaSyDVtjqMcYOKs_TMQnxZLo6SXgQvsX7ByIs",

authDomain:"sistemaharas-7e158.firebaseapp.com",

projectId:"sistemaharas-7e158",

storageBucket:"sistemaharas-7e158.firebasestorage.app",

messagingSenderId:"568033864847",

appId:"1:568033864847:web:8b9a9488a4a8d39ead94fa"

};


const app =
initializeApp(firebaseConfig);


const db =
getFirestore(app);


export {
db
};