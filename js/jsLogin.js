var checkUsername="Jose"
var checkPassword="hola"


function logear(){
    let userName =document.getElementById('username').value;
    console.log(userName)
    let password=document.getElementById('password').value;
    console.log(password)


    if (userName==checkUsername && password==checkPassword){
        window.open("inicio.html","_system")
       
    
    }
    else{
        document.getElementById('alert').style.display="block"


    }
}

