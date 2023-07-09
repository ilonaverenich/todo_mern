import React,{useState,useEffect} from 'react';
import {Button,Input} from 'antd';
import axios from 'axios'


function ListItem(props) {

  const [state,setState] = useState(false)
  const [value,setValue] = useState('');
  const [oldValue,setOldValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(()=>{
    console.log('render')
  },[state])

  async function deleteHandler(id) {
    try {
      await axios.post('http://localhost:2000/delete', { id });
    } catch (err) {
      console.log(err);
    }
  }
  function changeHandler(){
    setState(true) 
    setOldValue(props.item.list)
    console.log(oldValue)
  }
  function saveHandler(){
    const id = props.item.id;
    if (value !== ''){
      axios.post('http://localhost:2000/update',{value, id})
      .then(res=>console.log('Всё ок', res))
      .catch(err=>console.log(err))
      setState(false)
    }
    else{
      setValue(oldValue)
      setState(false)
    }
  }
 const handleCheckboxChange = event => {
    const { checked } = event.target;
    setIsChecked(checked);
    
  };
  console.log(isChecked)
  return  <li key={props.item.id}> 

   { state? 
   <Input placeholder={oldValue}  onChange={(e)=>setValue(e.target.value)}  className='input-change'/>  
   : 
   <p className={isChecked?'yes':'no'}>{props.item.list} <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/></p> } 

{/* <Button onClick={()=>saveHandler()}>Сохранить</Button>
<Button onClick={()=>changeHandler()}>d</Button> */}
   {state?<img className='icon' onClick={()=>saveHandler()} src='https://i.postimg.cc/s2MYQ3p0/icons8-save-30.png'/>:<img className='icon' onClick={()=>changeHandler()} src='https://i.postimg.cc/htgTr9Vx/icons8-edit-32.png'/>}
  <img /* className='btn btn-delete' */ src='https://i.postimg.cc/150JsRHG/icons8-delete-30.png ' className='icon' onClick={()=>deleteHandler(props.item.id)}/>
</li>
}
/* https://i.postimg.cc/150JsRHG/icons8-delete-30.png */
export default ListItem