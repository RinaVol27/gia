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
              //Выдать
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
                    const user_id = document.querySelector('#user_id').value
                    const return_date = document.querySelector('#return_date').value
                    const id = event.target.parentElement.parentElement.children[1].textContent;
                    const libr_id = localStorage.getItem('userId');

                    fetch(`http://localhost:3000/give/${id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ user_id: user_id, book_id: id, libr_id: libr_id, return_date: return_date}),
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

              td.appendChild(button);
              tr.appendChild(td);
              table.querySelector('tbody').appendChild(tr);
          });
      })
      .catch(error => console.error('Error:', error));
};

function search(){}



