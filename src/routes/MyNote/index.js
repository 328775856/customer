import React, {Component, Fragment} from 'react';
import LetterSearch from '../../components/common/letterSearch';
import {Table} from 'antd';
import {connect} from 'dva';
import {Link} from 'dva/router';


let arr = [];

class Index extends Component {
  state = {
    dataSource: [],
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'mynote/userBookReadNotes',
    });
  }

  UNSAFE_componentWillReceiveProps(r) {
    this.setState({
      dataSource: r.mynote.data,
    });
  }

  render() {
    arr = [];
    for (let i in this.state.dataSource) {
      arr.push(i);
    }
    const columnsData = [{
      title: '图书用户Id',
      dataIndex: 'bookUserId',
      className: 'hide',
      width: 300
    }, {
      title: '书名',
      dataIndex: 'bookName',
      key: 'bookName'
    }, {
      title: '封面',
      dataIndex: 'coverPath',
      key: 'coverpath',
      width: 300,
      render: (text, record) =>
        <img alt="" style={{width: 42, height: 60, borderRadius: '5px', marginRight: '15px'}} src={record.coverPath} />

    }, {
      title: '作者',
      dataIndex: 'bookAuthor',
      key: 'bookAuthor',
      width: 300
    }, {
      title: '笔记数',
      dataIndex: 'noteNum',
      key: 'noteNum',
      width: 300
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record) =>
        <Link
          // to={`/home/noteView?bookUserId=${record.bookUserId}`}
          to={`/home/noteView/${record.bookUserId}`}
          className="noteView"
        >
          <i
            style={{paddingRight: '40px'}}
            className='iconfont icon-ic_look_default'
          >查看笔记</i>
        </Link>

    }];
    return (
      <div className='myNote'>
        <section className='flex-r'>
          <LetterSearch list={arr} />
        </section>

        <Table
          dataSource={[]} columns={columnsData} message='没有匹配的笔记哦！'
          pagination={false}
          rowKey='bookUserId'
        />
        {arr.map((el, index) =>
          <Fragment
            key={index}
          >
            <span id={el} style={{fontSize:'18px'}}>{el}</span>
            <Table
              showHeader={false}
              dataSource={this.state.dataSource[el]} columns={columnsData} message='没有匹配的笔记哦！'
              pagination={false}
              rowKey='bookUserId'
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default connect(({mynote}) => ({
  mynote
}))(Index);
