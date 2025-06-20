//Перейти на старницу Авторов
function navigateToPageAuthors() {
    window.location.href = "./authors.html";
}
//Перейти на старницу Выдачи
function navigateToPageIssue() {
    window.location.href = "./issue.html";
}
//Перейти на старницу Читателя
function navigateToPageReader() {
    window.location.href = "./reader.html";
}
//Перейти на старницу Инструкции
function navigateToPageInstruction() {
    window.location.href = "./instruction.html";
}
//Перейти на страницу авторизации
function navigateToPageAvtorization() {
    window.location.href = "./avtorization.html";
    window.localStorage.clear();
}
//Показать/скрыть пароль
function togglePassword() {
    var passwordInput = document.getElementById('password');
    var showPasswordText = document.querySelector('.show-password');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordText.textContent = 'Скрыть';
    } else {
      passwordInput.type = 'password';
      showPasswordText.textContent = 'Показать';
    }
  }
//При загрузке сайта выводит номер авторизованного библиотекаря
  document.addEventListener('DOMContentLoaded', (event) => {
    // Получить данные из localStorage
    var data = localStorage.getItem('userId');
    // Найти div на странице
    var libr = document.getElementById('profil');
    // Вывести данные в div
    libr.innerHTML = 'Сотрудник ' + data;
});