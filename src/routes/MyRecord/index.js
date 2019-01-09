import React, {Component, Fragment} from 'react';
import LetterSearch from '../../components/common/letterSearch';
import {Button, Icon, Modal, Input, Table} from 'antd';
import {connect} from 'dva';
import {isEmpty} from "../../utils/utils";
import {Link} from "dva/router";

let arr = [];

class Index extends Component {
  state = {
    dataSource: [],
    title: '',
    bookReaddocGroupId: '',
    value: ''
  };

  refresh = () => {
    this.props.dispatch({
      type: 'myRecord/userBookReadDocGroups'
    });
  };

  componentDidMount() {
    this.refresh();
  }

  UNSAFE_componentWillReceiveProps(r) {
    this.setState({
      dataSource: r.myRecord,
    });
  }

  addModalShow = (bookReaddocGroupId, readdocGroupName) => {
    if (isEmpty(bookReaddocGroupId)) {
      this.setState({title: '新建档案', bookReaddocGroupId: ''});
    } else {
      this.setState({title: '重命名', bookReaddocGroupId: bookReaddocGroupId});
    }
    this.setState({visible: true});
  };

  handleOk = () => {
    const {bookReaddocGroupId} = this.state;
    const cb = this.callback;
    if (isEmpty(bookReaddocGroupId)) {
      this.props.dispatch({
        type: 'myRecord/addUserBookReadDocGroup',
        payload: {
          readdocGroupName: this.state.value
        },
        callback: cb
      });
    } else {
      this.props.dispatch({
        type: 'myRecord/updateUserBookReadDocGroup',
        payload: {
          readdocGroupName: this.state.value,
          bookReaddocGroupId: bookReaddocGroupId
        },
        callback: cb
      });
    }
    this.setState({visible: false});
  };

  callback = (r) => {
    if (r.status === 200) {
      this.setState({bookReaddocGroupId: ''});
      this.refresh();
    }
  };
  handleCancel = () => {
    this.setState({visible: false});
  };
  change = (e) => {
    this.setState({value: e.target.value});
  };

  removeBookGroup = (bookReaddocGroupId) => {
    const cb = this.callback;
    const {dispatch} = this.props;
    Modal.confirm({
      title: '确认删除吗？',
      onOk() {
        dispatch({
          type: 'myRecord/deleteUserBookReadDocGroup',
          payload: {
            bookReaddocGroupId: bookReaddocGroupId
          },
          callback: cb
        });
      }
    });
  };

  render() {
    arr = [];
    for (let i in this.state.dataSource) {
      arr.push(i);
    }
    const columnsData = [{
      title: '分组Id',
      dataIndex: 'bookReaddocGroupId',
      key: 'bookReaddocGroupId',
      className: 'hide',
    }, {
      title: '档案',
      dataIndex: 'readdocGroupName',
      key: 'readdocGroupName',
      width:600,
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record) =>
        <div className='options'>
          {/*<i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'
            onClick={() => this.detail()}
          >查看</i>*/}
          <Link
            to={`/home/recordView/${record.bookReaddocGroupId}`}
            className="recordView"
          >
            <i
              style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'
            >查看</i>
          </Link>

          <i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'
            onClick={() => this.addModalShow(record.bookReaddocGroupId, record.readdocGroupName)}
          >重命名</i>
          <i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default'
            onClick={() => this.removeBookGroup(record.bookReaddocGroupId)}
          >删除</i>
        </div>

    }];
    return (
      <div className='myRecord'>
        <section className='flex-r'>
          <Button onClick={() => this.addModalShow()}>
            <Icon type="plus" />新建档案夹
          </Button>
          <LetterSearch list={arr} />
        </section>
        <Table
          dataSource={[]} columns={columnsData} message='没有匹配的笔记哦！'
          pagination={false}
          rowKey='bookReaddocGroupId'
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
              rowKey='bookReaddocGroupId'
            />
          </Fragment>
        )}
        <Modal
          centered
          visible={this.state.visible}
          closable={false}
          title={this.state.title}
          okText='确定'
          cancelText='取消'
          footer={[
            <Button key="submit" onClick={this.handleOk}>
              确定
            </Button>,
            <Button key="back" onClick={this.handleCancel}>取消</Button>
          ]}
        >
          <Input id='recordId' onChange={this.change} value={this.state.value} placeholder='请输入档案名称' />
        </Modal>
      </div>
    );
  }
}

export default connect(({myRecord}) => ({
  myRecord
}))(Index);
