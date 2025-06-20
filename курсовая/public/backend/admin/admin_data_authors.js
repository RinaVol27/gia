window.onload = function() {
    fetch('http://localhost:3000/authors')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('data-table-author');
            data.forEach(row => {
                // console.log(row)
                const tr = document.createElement('tr');
                // const td = document.createElement('td');
                    tr.innerHTML = `<td>${row.author_id}</td>
                                    <td>${row.name}</td>
                                    <td>${row.country}</td>
                                    <td>${row.date_of_birth.substr(0,10)}</td>
                                    <td>${row.date_of_death.substr(0,10)}</td>
                                    <td><button class="return-button" id="drop_b">Удалить</button> 
                                    <button class="return-button2" id="return-b">Изменить</button></td>`;
                

                //Код, который отрабатывает при нажатии на кнопку "Добавить"
                const button4 = document.getElementById('plus-button');
                button4.addEventListener('click', function(){
                    // код для обработки события нажатия на кнопку
                    const mod_auto3 = document.getElementById('myModal_auto3');
                    const cancel3 = document.getElementById('cancel3');
                    const add3 = document.getElementById('add3');
                    mod_auto3.style.display = "block"
                    window.onclick = function(event){
                        if (event.target == mod_auto3) {
                            mod_auto3.style.display = "none";
                        }
                    }
                    cancel3.addEventListener('click', function(){
                        mod_auto3.style.display = "none";
                    })
    
                    add3.addEventListener('click', function(){  
                        alert('Добавлено! Ну типо');
                        //Код для того, чтобы выдавать книгу
                    });
                });

                table.querySelector('tbody').appendChild(tr);

                data.forEach(row => {
                    // ... ваш код ...
                
                    // Код, отрабат. при нажатии на кнопку "Удалить"
                    document.querySelectorAll('.return-button').forEach(button3 => {
                        button3.addEventListener('click', function(){
                            const id = event.target.parentElement.parentElement.children[0].textContent;
                            fetch(`http://localhost:3000/authors/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })
                            .catch(networkError => {
                                console.error('Network Error:', networkError);
                                alert('Ошибка сети: ' + networkError.message);
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(data => {
                                // Обновляем таблицу только после успешного удаления
                                window.location.reload();
                            })
                            .catch(serverError => {
                                console.error('Server Error:', serverError);
                                alert('Ошибка сервера: ' + serverError.message); // Выводим сообщение об ошибке
                            });
                        });
                    });
                    
                    
                
                    // Код, который отрабат. при нажатии на кнопку "Изменить"
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
                                //Код для того, чтобы выдавать книгу
                            });
                        });
                    });
                });


            });
            
            
        })
        .catch(error => console.error('Error:', error));
  };
  
  function search(){}
  
  