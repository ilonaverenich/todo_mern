import { Input, Button, message, List } from 'antd';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ListItem from './ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { getData, setStatus } from '../redux/mainReducer';

function Todo() {
  const dispatch = useDispatch();
  const status = useSelector((store) => store.data.status);
  const datas = useSelector((store) => store.data.data);
  const [value, setValue] = useState('');

  const inputRef = useRef(null);
  console.log(datas);
  useEffect(() => {
    inputRef.current.focus();

    axios
      .get('http://localhost:5000/')
      .then((res) => dispatch(getData(res.data)))
      .catch((err) => console.log(err));
  }, [status]);

  async function sendData() {
    if (value == '') {
      message.error('Проверьте правильность введенных данных');
    } else {
      const todo = {
        id: new Date().getTime(),
        list: value,
        active: false,
      };

      setValue('');
      dispatch(setStatus());

      await axios
        .post('http://localhost:5000/', todo)
        .then(() => console.log('все ок'))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="content">
      <h1>Список дел</h1>
      <Input
        className="input"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button className="btn btn-send" onClick={() => sendData()}>
        Добавить{' '}
      </Button>

      <div className="block-todo">
        <ol>{datas && datas.map((item) => <ListItem item={item} />)} </ol>
      </div>
      <div>
        <p>
          <span className="done">
            Выполнено: {datas.filter((el) => el.active).length} -{' '}
            {((datas.filter((el) => el.active).length / datas.length) * 100).toFixed(1)}%
          </span>
        </p>
        <p>
          <span className="red">
            Осталось: {datas.length - datas.filter((el) => el.active).length} -{' '}
            {100 - ((datas.filter((el) => el.active).length / datas.length) * 100).toFixed(1)}%{' '}
          </span>
        </p>
        <p className="all"> Всего задач: {datas.length} - 100% </p>
      </div>
    </div>
  );
}

export default Todo;
