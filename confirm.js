let obj1=JSON.parse(localStorage.getItem('myobj')) // converting json data into object
let name= obj1.fn;
const first = name.split(' ')[0] //taking first name of user

let email=obj1.em;
document.getElementById('name').innerText=first;  
document.getElementById('email').innerText=email;
