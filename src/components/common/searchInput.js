import React, {Component} from 'react';
import {Input} from 'antd';

// const Search = Input.Search;

class searchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: ''
    };
  }

  onChangeUserName = (e) => {
    this.setState({
      val: e.target.value
    });
  };
  empty = (e) => {
    console.log(this.userNameInput.value)
    this.userNameInput.focus();
    this.setState({
      val: ''
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
          value={this.state.val}
          ref={node => {
            this.userNameInput = node;
          }}
          placeholder="在云书馆里搜索"
          prefix={<i className="iconfont icon-serch_ic_serch"/>}
          suffix={
            <div>
              {this.state.val ? <i className='iconfont icon-serch_ic_close' onClick={this.empty}></i> : null}
              <span
                style={{
                  width: 70,
                  height: 32,
                  lineHeight: '32px',
                  background: '#6C7780',
                  borderRadius: 5,
                  display: 'inline-block',
                  color: 'white',
                  textAlign: 'center',
                  cursor: 'pointer'
                }} onClick={this.search}
              >搜索</span>
            </div>}
          onChange={this.onChangeUserName}
        />
      </div>
    );
  }
}

export default searchInput;
