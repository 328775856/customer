import React, {Component} from 'react';
import {Radio} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';

class sider extends Component {
  state = {
    loading: false,
    checked: true,
    type:''
  };
  handleSizeChange = (e) => {
    this.props.selectCb(e.target.value);
    this.setState({checked: !e.target.checked});
  };
  checked = (e) => {

    console.log(e);
  };

  render() {
    return (
      <div className='sider'>
        <h5>来源分类</h5>
        <div className='flex-c'>
          <Radio.Group onChange={this.handleSizeChange}>
            <Radio.Button checked={this.state.checked} value="allKindsBooks">所有分类</Radio.Button>
            <Radio.Button value="uploadBooks">上传的书</Radio.Button>
            <Radio.Button value="donatedBooks">受赠的书</Radio.Button>
            <Radio.Button value="purchasedBooks">购买的书</Radio.Button>
          </Radio.Group>
          <Link to='/home/libraries/books/uploadBooks' className='uploadBooks'>
            <i className='iconfont icon-ic_shangchuan'></i>
            <div className="ant-upload-text">上传图书
            </div>
          </Link>
        </div>
      </div>
    );
  }
}


export default connect(({mybooks}) => ({
  mybooks
}))(sider);
