const switch_auth = document.getElementById("but_per_auth")
switch_auth.addEventListener('click', function(){
    if (switch_auth){
        window.location.href = "auth.html"
    }
    else{
        alert('что-то пошло не так')
    }
})
