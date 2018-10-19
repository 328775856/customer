import React, {Component} from 'react';
import Pagination from '../common/pagination';
import SearchInput from '../common/searchInput';
import Table from '../common/table';
import {Button, Menu, Dropdown} from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   dataSource: [{
    //     key: '1',
    //     bookName: '书名1',
    //     source: '传',
    //     grouping: '文学',
    //     size: '3333kb',
    //     createTime: '2018/5/13',
    //     format: 'EPUB',
    //     options: 'asd'
    //   }, {
    //     key: '2',
    //     bookName: 'sdfsd',
    //     source: 'asd',
    //     grouping: 'asd',
    //     size: 'asd',
    //     createTime: 'ads',
    //     format: 'ads',
    //     options: 'asd'
    //   }],
    //   columnsData: [{
    //     title: '书名',
    //     dataIndex: 'bookName',
    //     key: 'bookName',
    //     width: 234,
    //     render(text, record, index) {
    //       return (
    //         <div>{record.size}</div>
    //       );
    //     }
    //   }, {
    //     title: '来源',
    //     dataIndex: 'source',
    //     key: 'source',
    //     width: 96,
    //     render() {
    //       return (
    //         <div>
    //           <i className='iconfont icon-ic_chuan'></i>
    //         </div>
    //       );
    //     }
    //   }, {
    //     title: '分组',
    //     dataIndex: 'grouping',
    //     key: 'grouping',
    //     width: 96
    //   }, {
    //     title: '大小',
    //     dataIndex: 'size',
    //     key: 'sieze',
    //     width: 96
    //   }, {
    //     title: '创建时间',
    //     dataIndex: 'createTime',
    //     key: 'createTime',
    //     width: 131
    //   }, {
    //     title: '格式',
    //     dataIndex: 'format',
    //     key: 'format',
    //     width: 136
    //   }, {
    //     title: '操作',
    //     dataIndex: 'options',
    //     key: 'options',
    //     render() {
    //       return (
    //         <div className='options'>
    //           <span style={{display: 'inline-block', verticalAlign: 'middle', paddingRight: '40px'}}>
    //             <Switch style={{marginRight: '20px'}}/>公开/隐藏
    //           </span>
    //           <i style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'>分组到</i>
    //           <i style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default'>删除</i>
    //         </div>
    //       );
    //     }
    //   }]
    // };
    this.state = {
      dataSource: [],
      columnsData: [{
        title: '全部分组',
        dataIndex: 'allGrouping',
        key: 'allGrouping'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render() {
          return (
            <div className='options'>
              <i style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'>查看</i>
              <i style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'>重命名</i>
              <i style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default'>删除</i>
            </div>
          );
        }
      }]
    };
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="3">3rd menu item</Menu.Item>
      </Menu>
    );
    return (
      <div className='myBorrow'>
        <section className='flex-r'>
          <SearchInput></SearchInput>
          <Pagination className='pagination'></Pagination>
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Button>
              <i className='iconfont icon-ic_more'></i>
            </Button>
          </Dropdown>
        </section>
        <section className='flex-r'>
          <Table dataSource={this.state.dataSource} columnsData={this.state.columnsData} message='没有匹配的书籍哦！'></Table>
        </section>
      </div>
    );
  }
}

export default Index;
