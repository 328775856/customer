import React, {Component} from 'react';
import {Input, Icon} from 'antd';

// const Search = Input.Search;

class searchInput extends Component {
  constructor() {
    super();
    this.state = {
      val: ''
    };
  }

  onChangeUserName = (e) => {
    this.setState({
      val: e.target.value
    });
  };
  search = (e) => {
    // this.state.val;
  };

  render() {
    return (
      <div>
        <Input
          className='search'
          style={{width: 626, height: 48}}
          placeholder="在云书馆里搜索"
          prefix={<Icon type="search"/>}
          suffix={<span style={{
            width: 70,
            height: 32,
            lineHeight: '32px',
            background: '#6C7780',
            borderRadius: 5,
            display: 'inline-block',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer'
          }} onClick={this.search}>搜索</span>}
          onChange={this.onChangeUserName}
        />
      </div>
    );
  }
}

export default searchInput;
