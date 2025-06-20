const { response } = require("express")

window.onload = function(){
    fetch('http://localhost:5001/users')
    .then(response => response.json())
    .then(data =>{
        const table = document.getElementsByClassName('all_zayv')
        data.forEach(row => {
            const tr = document.createElement('tr')
            tr.innerHTML = `<td class="user_data">${row.fio_user}</td>
                            <td class="user_data">${row.email}</td>
                            <td class="user_data">${row.name_pr}</td>
                            <td class="user_data">${row.count_pr}</td>
                            <td class="user_data">${row.status}</td>
                            <td class="user_data">
                                <button class="but_change" id="but_check" data-id="${row.status}">Подтверждено</button>
                                <button class="but_change" id="but_cancel" data-id="${row.status}">Отменено</button>
                            </td>
                        `
            table.querySelector('tbody').appendChild(tr)
        })
    })
    .catch(error => console.error("ERROR: ", error))
}
