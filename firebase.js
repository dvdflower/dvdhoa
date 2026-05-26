import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
deleteDoc,
updateDoc,
doc,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyArdShAGDqUhY0wWRlGLO_FZRuabG4BNOs",

authDomain:"dvdflowers.firebaseapp.com",

projectId:"dvdflowers",

storageBucket:"dvdflowers.firebasestorage.app",

messagingSenderId:"454790351769",

appId:"1:454790351769:web:2e48a45c871ecc3a5b6108"

};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

export {

db,

collection,
addDoc,
deleteDoc,
updateDoc,
doc,
onSnapshot

};
