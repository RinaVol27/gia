//Перейти на старницу Авторов
function navigateToPageAuthors() {
    window.location.href = "./authors_admin.html";
}
//Перейти на старницу Выдачи
function navigateToPageIssue() {
    window.location.href = "./issue_admin.html";
}
//Перейти на старницу Читателя
function navigateToPageReader() {
    window.location.href = "./reader_admin.html";
}
//Перейти на старницу Инструкции
function navigateToPageInstruction() {
    window.location.href = "./instruction_admin.html";
}
function navigateToPageLibrarian(){
    window.location.href = "./librarian_admin.html";
}
//Перейти на страницу авторизации
function navigateToPageAvtorization() {
    window.location.href = "../avtorization.html";
    window.localStorage.clear();
}

//Показать/скрыть пароль
function togglePassword() {
    var passwordInput = document.querySelector('[name="password"]');
    var showPasswordText = document.querySelector('.show-password');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPasswordText.textContent = 'Скрыть';
    } else {
      passwordInput.type = 'password';
      showPasswordText.textContent = 'Показать';
    }
  }
