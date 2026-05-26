import {

db,

collection,
addDoc,
deleteDoc,
updateDoc,
doc,
onSnapshot

}

from "./firebase.js";

let flowers=[];

const ADMIN_PASS="DVD8686";

window.showSection=(id)=>{

document
.querySelectorAll('.section')
.forEach(s=>s.classList.remove('active'));

document
.getElementById(id)
.classList.add('active');

};

window.adminLogin=()=>{

const pass=
prompt("Mật khẩu Admin");

if(pass===ADMIN_PASS){

showSection('adminSection');

}else{

alert("Sai mật khẩu");

}

};

onSnapshot(

collection(db,'flowers'),

(snapshot)=>{

flowers=
snapshot.docs.map(d=>({

id:d.id,

...d.data()

}));

renderAll();

}

);

function renderAll(){

renderFlowers();

renderMembers();

document.getElementById(
'flowerCount'
).innerText=flowers.length;

}

function renderFlowers(){

const grid=
document.getElementById(
'flowerGrid'
);

grid.innerHTML=
flowers.map(f=>`

<div class="card"
onclick="showOwners('${f.id}')">

<img src="${f.image}">

<h3>${f.name}</h3>

<p>${f.type}</p>

</div>

`).join('');

}

function renderMembers(){

const members={};

flowers.forEach(f=>{

f.owners.forEach(o=>{

if(!members[o.ingame]){

members[o.ingame]=[];

}

members[o.ingame].push(f);

});

});

const list=
document.getElementById(
'memberGrid'
);

const arr=
Object.keys(members);

document.getElementById(
'memberCount'
).innerText=arr.length;

list.innerHTML=
arr.map(name=>`

<div class="card"
onclick="showMember('${name}')">

<h3>${name}</h3>

<p>${members[name].length} hoa</p>

</div>

`).join('');

}

window.showMember=(name)=>{

const own=
flowers.filter(f=>

f.owners.some(o=>
o.ingame===name)

);

openModal(

'🌸 '+name,

own.map(x=>x.name).join('<br>')

);

};

window.showOwners=(id)=>{

const flower=
flowers.find(
x=>x.id===id
);

openModal(

flower.name,

flower.owners.map(o=>

'🎮 '+o.ingame+

' - '+o.zalo

).join('<br>')

);

};

window.closeModal=()=>{

document
.getElementById('modal')
.style.display='none';

};

function openModal(title,html){

document
.getElementById('modalTitle')
.innerHTML=title;

document
.getElementById('modalBody')
.innerHTML=html;

document
.getElementById('modal')
.style.display='flex';

}

window.addFlower=()=>{

const file=
document.getElementById(
'flowerImage'
).files[0];

if(!file) return;

const reader=
new FileReader();

reader.onload=
async(e)=>{

await addDoc(

collection(db,'flowers'),

{

name:
flowerName.value,

type:
flowerType.value,

rarity:
flowerRarity.value,

image:
e.target.result,

owners:[{

ingame:
memberName.value,

zalo:
memberZalo.value

}]

}

);

alert("Đã thêm");

};

reader.readAsDataURL(file);

};
