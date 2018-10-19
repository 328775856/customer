import React, {Component} from 'react';
import {Button} from 'antd';

class cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '公益责任',
      time: '2018-09-17  15:40'
    };
  }

  render() {
    return (
      <div className='cell'>
        <div className='cell-text flex-r'>
          <div>
            <p className='text'>{this.state.text}</p>
            <p className='time'>{this.state.time}</p>
          </div>
          <Button>审核中</Button>
        </div>
        <div className='cell-img'>
          <img src="http://fa.topitme.com/a/4f/9f/11248985417179f4fao.jpg" alt=""/>
        </div>
        <div className='cell-btn'>
          <Button>预览</Button>
        </div>
      </div>
    );
  }
}

export default cell;
