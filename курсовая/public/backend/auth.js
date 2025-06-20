document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entranceForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию
        
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
    
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
        
            if (response.ok) {
                const result = await response.json(); // Предполагается, что сервер возвращает JSON
        
                // Сохранение токена в localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.userId);
                localStorage.setItem('role', result.role);
        
                // Перенаправление на другую страницу
                let role = window.localStorage.getItem('role');
                if(role=='admin'){
                    window.location.href = './admin/site_admin.html';
                }else if (role=='user'){
                    window.location.href = './site.html';
                }
            } else {
                // Обработка ошибки
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            alert('Ошибка при входе: ' + error.message); // Выводим сообщение об ошибке
        }
    });
});
