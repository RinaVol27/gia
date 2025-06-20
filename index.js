const express = require('express')
const cors = require('cors')
// const db = require('./db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// db.connect((err) => {
//     if(err){
//         console.error('Ошибка при подключении к базе данных:', err.message)
//     }
//     else{
//         console.log('Подключение к базе данных прошло успешно')
//     }
// })

const SECRET_KEY = 'trud_work'
const generate_token = function(id,email){
    const token = {
        id, email
    }
    return jwt.sign(token,SECRET_KEY)
}

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5001

// Место для запросов
// Регистрация
app.post('/registration', async(req, res)=>{
    try{
        const{email, pass, fio, number} = req.body
        const maybe_user = await db.oneOrNone('SELECT users.email FROM users WHERE email = $1', [email])
        if(maybe_user){
            return res.status(400).json({message: 'Пользователь уже существует'})
        }
        const hash_password = bcrypt.hashSync(pass, 7)
        const new_user = await db.query(
            `INSERT INTO users (email, pass, fio, number)`,
            [email, pass, fio, number]
        )
        res.json(new_user)
    }
    catch(e){
        console.log(e)
        res.status(400).json({message: 'Ошибка регистрации'})
    }
})

// Авторизация
app.post('/authorization', async(req,res)=>{
    try{
        const {email, pass} = req.body
        const maybe_user = await db.oneOrNone('SELECT users.email FROM users WHERE email = $1', [email])
        if(!maybe_user){
            return res.status(400).json({message: 'Пользователь не найден'})
        }
        const valid_pass = bcrypt.compareSync(pass, maybe_user.pass)
        if(!valid_pass){
            return res.status(400).json({message: 'Введени неверный пароль'})
        }
        const token = generate_token(maybe_user.id_user, maybe_user.email) 
        res.json(token)
    }
    catch(e){
        console.log(e)
        res.status(400).json({message: 'Ошибка авторизации'})
    }
})

// Вывод заявок
app.get('/zayv', async (req, res) => {
    try {
        const data = await db.query('SELECT users.familia || users.name || users.last_name AS fio_user, users.email, product.name_pr, orders.count_pr, orders.status FROM orders JOIN users ON orders.user_id = users.id_user JOIN products ON orders.product_id = products.id_product');
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка запроса');
    }
});

// Удаление пользователей админимтстратором
app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.body.id_user;
        const user = await db.query('DELETE FROM users WHERE id_user = $1', [id]) 
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка запроса');
    }
});


app.listen(PORT, () =>{
    console.log(`Сервер работает на порту ${PORT}`)
})
