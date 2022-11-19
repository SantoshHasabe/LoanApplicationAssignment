const form = document.querySelector('#form');
const userName =document.querySelector('#name');
const email =document.querySelector('#email');
const pan =document.querySelector('#pan');
const loanAmount =document.querySelector('#loan');
const EstEmi=document.querySelector('#EstimatedEmi');

form.addEventListener('submit', (event)=>{
    validateForm();
    // generate random otp 
 if(isFormValid()== true){
    const otp=Math.floor((Math.random()*10000)+1)
    console.log(otp);
     // to store data of form for use in next page
    const name =userName.value;
    const emailId=email.value;
    localStorage.setItem('myobj', JSON.stringify({fn:name, em:emailId}));
    window.location.href="confirm.html";
     
    form.submit();
 }else{
    event.preventDefault();
 } 

});
function isFormValid(){
    const inputContainers=form.querySelectorAll(".input-group");
    result = true;
    inputContainers.forEach((container)=>{
    if(container.classList.contains('error')){
            result =false;
        }
    })
    return result;

}
function validateForm(){
    //userName
    const letters = /^[A-Za-z' ']+$/;
    if(userName.value.trim() == ''){
        setError(userName, 'Name can not be empty');
    }else if(!userName.value.match(letters)){
        setError(userName, 'Name must contain letter only')
    }else if(userName.value.trim().length < 8){
        setError(userName, 'Name must be minimum 2 Words of 4 character')
    }else{
        setSucess(userName);
    }
    //email
    if(email.value.trim()==''){
        setError(email, 'Email can not be empty');   
    }else if(isEmailValid(email.value)){
        setSucess(email);
    }else{
        setError(email, 'Provide valid email')
    }

    // Pan
    const numbers = /^[A-Za-z0-9]+$/; // creating regx for containing only letter and numbers
    if(pan.value.trim() == ''){
        setError(pan, 'Pan can not be empty');
    }else if(pan.value.trim().length != 10 ){
        setError(pan, 'Pan is not valid.Must be 10 Digit')
    }else if(!pan.value.match(numbers)){
        setError(pan, 'Pan is not must be letter and numbers only')
    }else{
        setSucess(pan);
    }
    // Loan Amount
    if(loanAmount.value.trim()==0){
        setError(loanAmount, 'Please Enter Loan amount')

    }else
    if(loanAmount.value.trim().length > 9 ){
        setError(loanAmount, 'Invalid loan amount! try minimum value')
    }
    else{
        setSucess(loanAmount);
    }

    
}
// function for error message if not validate
function setError(element, errorMessage){
    const parent = element.parentElement;
    if(parent.classList.contains('sucess')){
        parent.classList.remove('sucess')
    }
    parent.classList.add('error');
    const para = parent.querySelector('p');
    para.textContent = errorMessage;
} 

// function for mark input data is valid
function setSucess(element){
    const parent = element.parentElement;
    if(parent.classList.contains('error')){
        parent.classList.remove('error')
    }
    parent.classList.add('sucess');
     
}
  //check for email validation
function isEmailValid(email){
    const regx=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regx.test(email);
}

// function for calculation of estimated EMI
function EstimatedEmi(){
    let P = loanAmount.value; //loan amount
    let R = 8.5/1200;   //interst rate per month
    let T=15*12; //total number of installments
    r1=(1+R)
    let S= Math.pow(r1, T);
    let U= Math.pow(r1,T)-1;
    let emi =  (P*R*S)/U;  // final formulla for EMI
    EstEmi.textContent = emi;   
}

