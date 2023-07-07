//mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN'
const express = require('express');
const config = require('config');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const listSchema = require('./List')
app.use(cors())
app.use(express.json());

app.get('/home',(req,res)=>{
 console.log('Приветики')
 res.send('Стартовая страница')
})
const Todo = mongoose.model('todo',listSchema)
mongoose.connect('mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN').then(()=>console.log('База данных подключена')).catch((err)=>console.log('Возникла ошибка с подключением к Базе данных'))

app.post('/', (req, res) => {
    const todo = req.body;
    try {
        

    }
    catch {

    }

    console.log(todo);
  });

app.listen(config.get('PORT'),()=>console.log('server has been started'))