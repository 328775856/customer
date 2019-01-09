import React, {Component} from 'react';
import {Radio} from 'antd';


const arr = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class letterSearch extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    current: ''
  };

  handleChange = (e) => {
    this.setState({current: e.target.value});
    document.getElementById(`${e.target.value}`).scrollIntoView();
  };

  render() {
    return (
      <div className='letterSearch'>
        <Radio.Group
          value={this.state.current ? this.state.current : this.props.list[0]}
          onChange={this.handleChange}
        >{arr.map((el, index) =>
            <Radio.Button
              disabled={this.props.list.indexOf(el) === -1}
              value={el}
              key={index}
            >
              {el}
            </Radio.Button>
          )}
        </Radio.Group>
      </div>
    );
  }
}

export default letterSearch;
