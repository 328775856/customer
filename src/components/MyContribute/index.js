import React, {Component} from 'react';
import Cell from '../../components/common/cell';
import {Link} from 'dva/router';

class Index extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount(){
  }
  render() {
    return (
      <div className='contribute flex-r'>
        <Link to='/home/contribute/createNew' className='create flex-c jus ala'>
          <i className='iconfont icon-ic_xinjian'></i>
          <p>新建投稿</p>
        </Link>
        {[1, 2, 3, 4].map((el, index) =>
          <Cell key={index}>{el}</Cell>
        )}
      </div>
    );
  }
}

export default Index;
