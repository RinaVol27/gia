window.onload = function() {
    fetch('http://localhost:3000/readers')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('data-table-users');
            data.forEach(row => {
                const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${row.user_id}</td>
                                    <td>${row.name}</td>
                                    <td>${row.surname}</td>
                                    <td>${row.lastname}</td>
                                    <td>${row.date_of_birth.substr(0,10)}</td>
                                    <td>${row.phone}</td>
                                    <td>${row.email}</td>
                                    <td>
                                        <div style="display: flex; justify-content: space-between;">
                                        <span>${row.num_of_lost_book}</span>
                                        <div><button class="return-button-plus">+</button>
                                        <button class="return-button-minus">-</button></div>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="return-button">Удалить</button> 
                                        <button class="return-button2">Изменить</button>
                                    </td>`
                
                table.querySelector('tbody').appendChild(tr);
            });
            // добавть долг
            document.querySelectorAll('.return-button-plus').forEach(button => {
                button.addEventListener('click', function(event) {
                    const id = event.target.parentElement.parentElement.children[0].textContent;
                    fetch(`http://localhost:3000/readers/add/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: id }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Обновляем таблицу
                        window.location.reload();
                    })
                    .catch(error => console.error('Error:', error));
                });
            });
            //Убрать долг
            document.querySelectorAll('.return-button-minus').forEach(button => {
                button.addEventListener('click', function(event) {
                    const id = event.target.parentElement.parentElement.children[0].textContent;
                    fetch(`http://localhost:3000/readers/subtract/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ user_id: id }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Обновляем таблицу
                        window.location.reload();
                    })
                    .catch(error => console.error('Error:', error));
                });
            });

            //Код, который отрабатывает при нажатии на кнопку "Добавить"
            const button4 = document.getElementById('plus-button');
            button4.addEventListener('click', function(){
                // код для обработки события нажатия на кнопку
                const mod_auto = document.getElementById('myModal_auto');
                const cancel = document.getElementById('cancel');
                const add = document.getElementById('add');
                mod_auto.style.display = "block"
                window.onclick = function(event){
                    if (event.target == mod_auto) {
                        mod_auto.style.display = "none";
                    }
                }
                cancel.addEventListener('click', function(){
                    mod_auto.style.display = "none";
                })
                //"Добавить" читателя
                add.addEventListener('click', function(){  
                    //Код для того, чтобы выдавать книгу
                    const name = document.querySelector('#name').value
                    const surname = document.querySelector('#surname').value
                    const lastname = document.querySelector('#lastname').value
                    const date_of_birth = document.querySelector('#date_of_birth').value
                    const phone = document.querySelector('#phone').value
                    const email = document.querySelector('#email').value

                    fetch('http://localhost:3000/add_reader', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name: name, surname: surname, lastname: lastname, date_of_birth: date_of_birth, phone: phone, email: email}),
                        })
                        .then(response => {
                            if(!response.ok){
                                throw new Error ('Ошибка при отправке данных на сервер');
                            }
                        })
                        .then(data => {
                            // Обновляем таблицу
                            window.location.reload();
                            alert('Читатаель успешно добавлен');
                        })
                        .catch(error => console.error('Error:', error));
               
                });
            });


            // Код, который отрабат. при нажатии на кнопку "Изменить" -
            document.querySelectorAll('.return-button2').forEach(button2 => {
                button2.addEventListener('click', function() {
                     // код для обработки события нажатия на кнопку
                    const mod_auto2 = document.getElementById('myModal_auto2');
                    const cancel2 = document.getElementById('cancel2');
                    const add2 = document.getElementById('add2');
                    mod_auto2.style.display = "block"

                    window.onclick = function(event){
                        if (event.target == mod_auto2) {
                            mod_auto2.style.display = "none";
                        }
                    }
                    cancel2.addEventListener('click', function(){
                        mod_auto2.style.display = "none";
                    })

                    add2.addEventListener('click', function(){  
                        alert('Сохранено! Ну типо');
                        //Код для того, чтобы изменить читателя
                    });
                });
            });
            //"Удалить"
            document.querySelectorAll('.return-button').forEach(button6 => {
                button6.addEventListener('click', function() {
                    const id = event.target.parentElement.parentElement.children[0].textContent;
                    fetch(`http://localhost:3000/delete/user/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Обновляем таблицу
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Ошибка при удалении: ' + error.message); // Выводим сообщение об ошибке
                    });
                });
            });
        })
        .catch(error => console.error('Error:', error));
  };
  
  function search(){}
  
  