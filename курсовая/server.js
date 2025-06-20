const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = pgp({
    host: 'localhost',
    port: '5432',
    database: 'BookShelf',
    user: 'postgres',
    password: '55555'
});

// Middleware для обслуживания статических файлов из каталога "public"
app.use(express.static(path.join(__dirname, 'public')));

async function createTables() {
    try {
        await db.none(`
            CREATE TABLE Users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                date_of_birth DATE NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL,
                num_of_lost_book INT DEFAULT 0 NOT NULL
            );

            CREATE TABLE Authors (
                author_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL,
                date_of_birth DATE NOT NULL,
                date_of_death DATE
            );

            CREATE TABLE Books (
                book_id SERIAL PRIMARY KEY,
                Name_book VARCHAR(255) NOT NULL,
                Author_id INT REFERENCES Authors(author_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
                Genre VARCHAR(255) NOT NULL,
                Year_of_writing VARCHAR(20) NOT NULL,
                About_what TEXT NOT NULL,
                Num_in_bible INT NOT NULL
            );

            CREATE TABLE Librarians (
                librarian_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_admin VARCHAR(20) DEFAULT 'user' NOT NULL
            );

            CREATE TABLE Book_distribution (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES Users(user_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
                book_id INT REFERENCES Books(book_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
                librarian_id INT REFERENCES Librarians(librarian_id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
                date_of_issue DATE default current_date,
                return_date DATE NOT NULL,
                is_returned BOOLEAN DEFAULT FALSE NOT NULL
            );
        `);
        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

//createTables(); // Когда надо будет базу заного создать просто снеси в начале // и напиши node server.js и у тебя есть база :)

// Вход
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Поиск пользователя в базе данных по email
        const user = await db.oneOrNone('SELECT * FROM librarians WHERE email = $1', [email]);
  
        if (!user) {
            return res.status(404).send('Пользователь с таким email не найден');
        }
        
         // Генерация токена на основе email и id пользователя
        const token = generateToken(email, user.user_id, user.role);
        // Сравнение паролей
        const passwordMatch = await bcrypt.compare(password, user.password);
  
        if (passwordMatch) {
            // Отправка токена и id пользователя клиенту
            res.send({ token, userId: user.librarian_id, role: user.is_admin });
        } else {
            // Неверный пароль
            res.status(401).send('Неверный пароль');
        }
    } catch (error) {
        console.error('Ошибка при входе в аккаунт:', error);
        res.status(500).send('Что-то пошло не так');
    }
});
function generateToken(email, userId, role) {
    const secret = '123321'; //секретный ключ
    const token = jwt.sign({ email, userId, role }, secret);
    return token;
  }


//Добавить библиотекаря 
app.post('/register', async (req, res) =>{
    try{
        const{name, surname, lastname, email, password} = req.body
        const maybe_user = await db.oneOrNone('select librarians.email from librarians where email = $1', [email])
        if(maybe_user){
            return res.status(400).json({message: 'Такой сотрудник уже есть уже существует'})
        }
        const hash_password = bcrypt.hashSync(password, 10);
        const newLibr = await db.oneOrNone(
            `insert into librarians (name, surname, lastname, email, password) values ($1, $2, $3, $4, $5) Returning *`, 
            [name, surname, lastname, email, hash_password]
        );
        res.json(newLibr)
    }catch(e){
        console.log(e)
        res.status(400).json({message: 'Ошибка при добавлении'})
    }
});
//Удалить сотрудника из базы данных
app.delete('/deletel/:id', async(req, res) =>{
    try{
        const data = await db.query('DELETE FROM librarians WHERE librarian_id=$1', [req.params.id]);
        res.json({ message: 'Libr deleted successfully' });
    }catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});


//Вывод списка книг 
app.get('/', async (req, res) => {
    try {
        const data = await db.any('SELECT books.book_id, books.name_book, authors.name as author, books.genre, books.year_of_writing, books.about_what, books.num_in_bible FROM books JOIN authors ON books.author_id = authors.author_id');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});
//Выдать книгу 
app.post('/give/:id', async(req, res) =>{
    try{
        const{book_id, user_id, libr_id, return_date} = req.body
        console.log(book_id);
        
        const newGiveBook = await db.query(
            `insert into book_distribution (user_id, book_id, librarian_id, return_date) values ($1, $2, $3, $4) Returning *`, 
            [user_id, book_id, libr_id, return_date]
        );
        res.json(newGiveBook);
    }catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});

//Удалить книгу из базы данных (РАБОТАЕТ)
app.delete('/delete/:id', async(req, res) =>{
    try{
        const data = await db.query('DELETE FROM books WHERE book_id=$1', [req.params.id]);
        res.json({ message: 'Book deleted successfully' });
    }catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});
//Маршрут для получения данных об одной книге (НЕ РАБОТАЕТ)
app.get('/oneBook/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await db.oneOrNone('SELECT * FROM books WHERE book_id=$1', [req.params.id]);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});


//Вывод списка авторов
app.get('/authors', async (req, res) => {
    try {
        const data = await db.any('SELECT * FROM authors');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});
//Удалить автора из базы данных
app.delete('/authors/:id', async(req, res) =>{
    try{
        const data = await db.query('DELETE FROM authors WHERE author_id=$1', [req.params.id]);
        res.json(data.rows[0]);
    }catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});


//Вывод списка читателей 
app.get('/readers', async (req, res) => {
    try {
        const data = await db.any('SELECT * FROM users');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});
//Добавить читателя 
app.post('/add_reader', async (req, res) =>{
    try{
        const{name, surname, lastname, date_of_birth, phone, email} = req.body
        const maybe_user = await db.oneOrNone('select users.email from users where email = $1', [email])
        if(maybe_user){
            return res.status(400).json({message: 'Пользователь уже существует'})
        }
        const newReader = await db.query(
            `insert into users (name, surname, lastname, date_of_birth, phone, email) values ($1, $2, $3, $4, $5, $6) Returning *`, 
            [name, surname, lastname, date_of_birth, phone, email]
        );
        res.json(newReader)
    }catch(e){
        console.log(e)
        res.status(400).json({message: 'Ошибка при добавлении'})
    }
});
//Удалить читателя из базы данных 
app.delete('/delete/user/:id', async(req, res) =>{
    try{
        const data = await db.query('DELETE FROM users WHERE user_id=$1', [req.params.id]);
        res.json({ message: 'user deleted successfully' });
    }catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});
//Пользователь потерял книгу
app.put('/readers/add/:id', async(req, res) =>{
    try{
        const data = await db.any(`UPDATE users SET num_of_lost_book = num_of_lost_book + 1 WHERE user_id=${req.params.id}`);
        res.json(data);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка выполнения запроса', error: err.toString() });
    }
});

//Пользователь вернул книгу
app.put('/readers/subtract/:id', async(req, res) =>{
    try{
        const data = await db.any(`UPDATE users SET num_of_lost_book = num_of_lost_book - 1 WHERE user_id=${req.params.id}`);
        res.json(data);
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка выполнения запроса', error: err.toString() });
    }
});



//Вывод списка выданных книг
app.get('/issue', async (req, res) => {
    try {
        const data = await db.any('select book_distribution.id, book_distribution.user_id, users.surname as users, books.name_book as books, book_distribution.librarian_id, book_distribution.date_of_issue, book_distribution.return_date from book_distribution join users on book_distribution.user_id = users.user_id join books on book_distribution.book_id = books.book_id where book_distribution.is_returned = false');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});
//Вернуть книгу
app.put('/issue/:id', async(req, res) =>{
    try{
        const data = await db.any(`UPDATE book_distribution SET is_returned=true WHERE id=${req.params.id}`);
        res.json(data);
    }catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});

//Вывод списка сотрудников
app.get('/librarians', async (req, res) => {
    try {
        const data = await db.any('select * from librarians');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error executing query');
    }
});




// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
