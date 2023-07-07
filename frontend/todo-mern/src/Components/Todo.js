import {Input,Button,message, List} from 'antd';
import {useState} from 'react';
import axios from 'axios';
import ListItem from './ListItem';

function Todo() {
    const [value, setValue] = useState('')
    const [todo, setTodo] = useState([])
 


    function sendData(){
      if (value =='') {
            message.error('Проверьте правильность введенных данных')
      } else {
        
        message.success('Задача успешно добавлена')
        const newTodo = {
            id: (new Date).getTime(),
            list: value,
            active:false
        }
        setTodo((prev)=>[...prev,newTodo]);    
        setValue('')
      }
        }
  

  return (
    //пока данные отображаются со стейта, в дальнейшем будет из базы данных
    <div className='content'>
    <h1>Todo list</h1>
     <Input className='input' value={value} onChange={(e)=>setValue(e.target.value)}/>
     <Button className='btn btn-send' onClick={()=>sendData()}> Добавить </Button>



    <div className='block-todo'>
           <ol> {todo && todo.map((item)=> <ListItem item={item}/>)}   
         </ol> 
    </div>
    </div>
  )  
}
     

export default Todo