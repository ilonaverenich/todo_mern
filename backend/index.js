//mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN'
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Todo = require('./List');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
  console.log('Приветики');
  res.send('Стартовая страница');
});

mongoose
  .connect('mongodb+srv://ilonaverenich:CiCvsYz7KuoJKMan@cluster0.gkclzup.mongodb.net/MERN', {
    useNewUrlParser: true,
  })
  .then(() => console.log('База данных подключена'))
  .catch((err) => console.log('Возникла ошибка с подключением к базе данных', err));

app.use('/delete', (req, res) => {
  const { id } = req.body;
  Todo.deleteOne({ id: id })
    .then((result) => {
      console.log('Запись успешно удалена', result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Ошибка при удалении записи');
    });
});

app.use('/update', (req, res) => {
  const { value, id } = req.body;
  Todo.updateOne({ id: id }, { list: value }).then((result) =>
    console.log('Успешно изменено значение', result),
  );
  Todo.find({ id: id }).then((el) => console.log(el));
});
app.post('/', (req, res) => {
  const { id, list, active } = req.body;
  console.log(id, list, active);

  Todo.create({
    id: id,
    list: list,
    active: active,
  }).then(() => {
    console.log('запись добавлена');
  });
});

app.get('/', (req, res) => {
  Todo.find().then((todos) => res.send(todos));
});

app.post('/active', (req, res) => {
  const { id } = req.body;
  Todo.updateOne({ id: id }, { active: true }).then((result) =>
    console.log('Успешно изменено значение', result),
  );
  Todo.find({ id: id }).then((el) => console.log(el));
});

app.post('/noactive', (req, res) => {
  const { id } = req.body;
  Todo.updateOne({ id: id }, { active: false }).then((result) =>
    console.log('Успешно изменено значение', result),
  );
  Todo.find({ id: id }).then((el) => console.log(el));
});

app.listen('5000', () => console.log('server has been started'));
