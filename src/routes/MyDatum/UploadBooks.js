import React, {Component} from 'react';
import Pagination from '../../components/common/pagination';
import Table from '../../components/common/table';
import {Switch, Radio} from 'antd';

class Mybooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      columnsData: [{
        title: '书名',
        dataIndex: 'bookName',
        key: 'bookName',
        render(text, record, index) {
          return (
            <div>{record.size}</div>
          );
        }
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render() {
          return (
            <div>
              <i className='iconfont icon-ic_chuan'></i>
            </div>
          );
        }
      }, {
        title: '进度',
        dataIndex: 'progress',
        key: 'progress'
      }, {
        title: '大小',
        dataIndex: 'size',
        key: 'sieze'
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render() {
          return (
            <div className='options'>
              <span style={{display: 'inline-block', verticalAlign: 'middle', paddingRight: '40px'}}>
                <Switch style={{marginRight: '20px'}} />公开/隐藏
              </span>
              <i style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'>分组到</i>
              <i style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default'>删除</i>
            </div>
          );
        }
      }],
      checked: true
    };
  }

  handleSizeChange = (e) => {
    this.setState({checked: !e.target.checked});
  };

  render() {
    return (
      <div className='uploadBooks'>
        <section className='flex-r'>
          <div className='btn'>
            <Radio.Group onChange={this.handleSizeChange}>
              <Radio.Button
                checked={this.state.checked}
                value='addLocal'
              >添加本地文件</Radio.Button>
              <Radio.Button value='addStart'>全部开始</Radio.Button>
            </Radio.Group>
          </div>
          <Pagination></Pagination>
        </section>
        <section className='flex-r'>
          <Table dataSource={this.state.dataSource} columnsData={this.state.columnsData} message='请上传文件！'></Table>
        </section>
      </div>
    );
  }
}

export default Mybooks;
