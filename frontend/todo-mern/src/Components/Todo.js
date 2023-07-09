import {Input,Button,message, List} from 'antd';
import {useState,useEffect,useRef} from 'react';
import axios from 'axios';
import ListItem from './ListItem';

function Todo() {
    const [value, setValue] = useState('')
    const [todo, setTodo] = useState([])
    const [state,setState] = useState(false)
    const [data,setData] = useState([])
    const inputRef = useRef(null)

    useEffect(()=>{
      inputRef.current.focus();
      axios
        .get('http://localhost:2000/')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
        console.log(data)
    },[state])
 

   async function sendData(){
    
      if (value == '') {
        message.error('Проверьте правильность введенных данных')
      } else {
        message.success('Задача успешно добавлена')
        const todo = {
          id: (new Date).getTime(),
          list: value,
          active:false
        }
    setTodo((prev)=>[...prev,todo]);  
    setValue('')
    
    await axios
      .post('http://localhost:2000/', todo) 
      .then(() => console.log('Успешно'))
      .catch((err) => console.log(err)); 
      }
    }
      
  return (
    //пока данные отображаются со стейта, в дальнейшем будет из базы данных
    <div className='content'>
    <h1>Todo list</h1>
     <Input className='input' ref={inputRef}  value={value} onChange={(e)=>setValue(e.target.value)}/>
     <Button className='btn btn-send' onClick={()=>sendData()}> Добавить </Button>

    <div className='block-todo'>
        <ol>{data && data.map((item)=> <ListItem item={item}/>)} </ol> 
    </div>
    </div>
  )  
}
     

export default Todo