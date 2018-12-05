import React, {Component} from 'react';
import Pagination from '../../components/common/pagination';
import LetterSearch from '../../components/common/letterSearch';
import Table from '../../components/common/table';
import {Link} from 'dva/router';

class Index extends Component {
  constructor(props) {
    super(props);
    this.dataSource = [{
      dataIndex: 'assdf',
      key: '0',
      allNote: '1',
      noteNum: '1'
    }];
    this.state = {};
  }

  render() {
    const columnsData = [{
      title: '全部笔记',
      dataIndex: 'allNote',
      key: 'allNote'
    }, {
      title: '笔记数',
      dataIndex: 'noteNum',
      key: 'noteNum'
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record) => (
        <Link
          to='/home/noteView'
          className='options'
        >
          <i
            style={{paddingRight: '40px'}}
            className='iconfont icon-ic_look_default'
          >查看笔记</i>
        </Link>
      )
    }];
    return (
      <div className='myNote'>
        <section className='flex-r'>
          <LetterSearch></LetterSearch>
          <Pagination className='pagination'></Pagination>
        </section>
        <section className='flex-r'>
          <Table dataSource={this.dataSource} columnsData={columnsData} message='没有匹配的书籍哦！'></Table>
        </section>
      </div>
    );
  }
}

export default Index;
