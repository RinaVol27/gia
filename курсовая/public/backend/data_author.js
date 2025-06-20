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
                                    <td>${row.date_of_death.substr(0,10)}</td>`
                
                // Object.values(row).forEach(text => {
                    
                //     const td = document.createElement('td');
                //     td.textContent = {text};
                //     tr.appendChild(td);
                // });
                
                table.querySelector('tbody').appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
  };
  
  function search(){}
  
  