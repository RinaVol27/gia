const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5001

app.listen(PORT, () =>{
    console.log(`Сервер работает на порту ${PORT}`)
})