import React from 'react'
import {Button,Input} from 'antd'

function ListItem(props) {

  return  <li id={props.item.id}>
  <p>{props.item.list}</p>           
  <Button className='btn btn-change'>Изменить</Button>
  <Button className='btn btn-delete'>Удалить</Button>
</li>
}

export default ListItem