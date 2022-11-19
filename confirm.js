let obj1=JSON.parse(localStorage.getItem('myobj'))
let name= obj1.fn;
const first = name.split(' ')[0]

let email=obj1.em;
document.getElementById('name').innerText=first;
document.getElementById('email').innerText=email;