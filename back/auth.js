const switch_reg = document.getElementById("but_per_reg")
switch_reg.addEventListener('click', function(){
    // event.preventDefault()
    if (switch_reg){
        window.location.href = "reg.html"
    }
    else{
        alert('что-то пошло не так')
    }
})

// Авторизация
const log_in = document.getElementById("but_auth")
log_in.addEventListener('click', ()=>{
    const inp_log= document.getElementById('log_auth').value
    const inp_pass = document.getElementById('pass_auth').value
    if(inp_log == 'sklad' && inp_pass == '123qwe'){
        window.location.href = "admin.html"
    }
    fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: inp_log, password: inp_pass})
    })
    .then(response =>{
        if(response.ok){
            console.log('Пользователь авторизован');
            // alert('Пользователь авторизован')
        }
        else{
            alert('Пользователя с таким email или паролем не существует')
        }
    }).catch(error => {
        console.error('Ошибка:', error)
    })
})
