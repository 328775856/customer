import React, {Component} from 'react'
import {connect} from 'dva'
import Comcount from '../components/count'

const Count = ({dispatch,count}) => {

  function addCount() {
    dispatch({
      type: 'count/add'
    })
  }

  function deleteCount() {
    dispatch({
      type: 'count/delete'
    })
  }
  return (
    <div>
      <h2>List of count</h2>
      <Comcount onDelete={deleteCount} onAdd={addCount} count={count}></Comcount>
    </div>
  )
}
// class count extends Component {
//     render() {
//         return
//     }
// }

export default connect(({count}) => ({
  count
}))(Count)
