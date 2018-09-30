import React, {Component} from 'react'
import { Button} from 'antd'
// class count extends Component {
//     render() {
//         return
//     }
// }
const count = ({onDelete, onAdd, count})=>{
  return (
    <div>
      <div>{count}</div>
      <Button onClick={onAdd}>添加</Button>
      <Button onClick={onDelete}>删除</Button>
    </div>
  )
}

export default count
