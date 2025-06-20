window.onload = function() {
    fetch('http://localhost:3000')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('data-table');
            data.forEach(row => {
                const tr = document.createElement('tr');
                Object.values(row).forEach(text => {
                    const td = document.createElement('td');
                    td.textContent = text;
                    tr.appendChild(td);
                });
                const td = document.createElement('td');
                const button = document.createElement('button');
                button.textContent = 'Выдать';
                const button2 = document.createElement('button');
                button2.textContent = 'Изменить';
                const button3 = document.createElement('button');
                button3.textContent = 'Удалить';
                
                //Код, отрабат. при нажатии на кнопку "Выдать"
                button.addEventListener('click', function() {
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
  
                  add.addEventListener('click', function(){  
                      alert('Сохранено! Ну типо');
                      //Код для того, чтобы выдавать книгу
                  });
                });

                //Код, который отрабат. при нажатии на кнопку "Изменить"
                button2.addEventListener('click', function() {
                    // код для обработки события нажатия на кнопку
                    const mod_auto2 = document.getElementById('myModal_auto2');
                    const cancel2 = document.getElementById('cancel2');
                    const add2 = document.getElementById('add2');
                    mod_auto2.style.display = "block"

                    document.getElementById('myModal_auto2').addEventListener('show.bs.modal', function (event) {
                        let button22 = event.relatedTarget; // Кнопка, которая вызвала модальное окно
                        let id = button22.getAttribute('data-id'); // Извлекаем информацию из data-* атрибутов
                      

                        // const id = event.target.parentElement.parentElement.children[0].textContent;
                        fetch('http://localhost:3000/oneBook/${id}' + id, {
                            method: 'GET',
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
                            // Заполняем поля ввода данными
                            document.querySelector("input[name='book_name']").value = data.name_book;
                            document.querySelector("input[name='author_id']").value = data.author_id;
                            document.querySelector("input[name='genry']").value = data.genre;
                            document.querySelector("input[name='year']").value = data.year_of_writing;
                            document.querySelector("input[name='about_what']").value = data.about_what;
                            document.querySelector("input[name='num']").value = data.num_in_bible;
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            alert('Ошибка при добавлении: ' + error.message); // Выводим сообщение об ошибке
                        });
                    });


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
                
                //Код, отрабат. при нажатии на кнопку "Удалить"
                button3.addEventListener('click', function(){
                    const id = event.target.parentElement.parentElement.children[0].textContent;
                    fetch(`http://localhost:3000/delete/${id}`, {
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
  
                td.appendChild(button);
                td.appendChild(button2);
                td.appendChild(button3);
                tr.appendChild(td);
                table.querySelector('tbody').appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
  };
  
  function search(){}
  
  
  