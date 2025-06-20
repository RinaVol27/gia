window.onload = function() {
    fetch('http://localhost:3000/issue')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('data-table-issue');
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.id}</td>
                                <td>${row.user_id}</td>
                                <td>${row.users}</td>
                                <td>${row.books}</td>
                                <td>${row.librarian_id}</td>
                                <td>${row.date_of_issue.substr(0,10)}</td>
                                <td>${row.return_date.substr(0,10)}</td>
                                <td><button class="return-button">Вернуть</button></td>`;
                table.querySelector('tbody').appendChild(tr);
            });

            // Добавляем обработчик событий на кнопки "Вернуть"
            document.querySelectorAll('.return-button').forEach(button => {
                button.addEventListener('click', function(event) {
                    const id = event.target.parentElement.parentElement.children[0].textContent;
                    fetch(`http://localhost:3000/issue/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ is_returned: true }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Обновляем таблицу
                        window.location.reload();
                    })
                    .catch(error => console.error('Error:', error));
                });
            });
    })
        .catch(error => console.error('Error:', error));
};
