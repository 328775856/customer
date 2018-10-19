import React, {Component} from 'react';
import {Radio} from 'antd';

const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class letterSearch extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleChange = (e) => {
    console.log(e.target.value);
  };

  render() {
    return (
      <Radio.Group defaultValue='A' onChange={this.handleChange}>{
        arr.map((el, index) =>
          <Radio.Button key={index} value={el}>{el}</Radio.Button>
        )
      }
      </Radio.Group>

    );
  }
}

export default letterSearch;
