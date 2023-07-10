import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, getData } from '../redux/mainReducer';

function ListItem(props) {
  const [state, setState] = useState(false);
  const [value, setValue] = useState('');
  const [oldValue, setOldValue] = useState('');

  const dispatch = useDispatch();
  const status = useSelector((store) => store.data.status);

  useEffect(() => {
    axios
      .get('http://localhost:5000/')
      .then((res) => dispatch(getData(res.data)))
      .catch((err) => console.log(err));
  }, [status]);

  async function deleteHandler(id) {
    dispatch(setStatus());
    await axios.post('http://localhost:5000/delete', { id });
  }

  function changeHandler() {
    setState(true);
    setOldValue(props.item.list);
  }
  function addCount(id) {
    axios.post('http://localhost:5000/noactive', { id });
    dispatch(setStatus());
    /*  dispatch(setDone(count)); */
  }
  function minusCount(id) {
    axios.post('http://localhost:5000/active', { id });
    dispatch(setStatus());
  }

  function saveHandler() {
    dispatch(setStatus());
    axios.get('http://localhost:5000/');

    const id = props.item.id;
    if (value !== '') {
      axios
        .post('http://localhost:5000/update', { value, id })
        .then((res) => console.log('Всё ок', res))
        .catch((err) => console.log(err));
      setState(false);
    } else {
      setValue(oldValue);
      setState(false);
    }
  }

  return (
    <li key={props.item.id}>
      {' '}
      <div>
        {state ? (
          <Input
            placeholder={oldValue}
            onChange={(e) => setValue(e.target.value)}
            className="input-change"
          />
        ) : (
          <div className={props.item.active ? 'yes' : 'no'}>{props.item.list} </div>
        )}

        {props.item.active ? (
          <img
            className="icon"
            width={30}
            src="https://i.postimg.cc/KjMD5Xmy/icons8-cross-mark-78.png"
            onClick={() => addCount(props.item.id)}
          />
        ) : (
          <img
            className="icon"
            width={30}
            onClick={() => minusCount(props.item.id)}
            src="https://i.postimg.cc/0jTMZLr7/icons8-done-50.png"
          />
        )}
        {state ? (
          <img
            className="icon"
            onClick={() => saveHandler()}
            src="https://i.postimg.cc/s2MYQ3p0/icons8-save-30.png"
          />
        ) : (
          <img
            className="icon"
            onClick={() => changeHandler()}
            src="https://i.postimg.cc/htgTr9Vx/icons8-edit-32.png"
          />
        )}
        <img
          src="https://i.postimg.cc/150JsRHG/icons8-delete-30.png "
          className="icon"
          onClick={() => deleteHandler(props.item.id)}
        />
      </div>
    </li>
  );
}

export default ListItem;
