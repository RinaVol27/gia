document.getElementById('search-button').addEventListener('click', async () => {
    const searchValue = document.getElementById('search-input').value;
    const response = await fetch(`/search?q=${searchValue}`);
    const data = await response.json();
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';
    data.forEach(book => {
        const tr = document.createElement('tr');
                Object.values(row).forEach(text => {
                    const td = document.createElement('td');
                    td.textContent = text;
                    tr.appendChild(td);
                });
                const td = document.createElement('td');
                const button = document.createElement('button');
                button.textContent = 'Выдать';
                td.appendChild(button);
                tr.appendChild(td);
                table.querySelector('tbody').appendChild(tr);
    });
    console.log('ну хоть выводит')
});
