import React, {Component} from 'react';
import Pagination from '../../components/common/pagination';
import Table from '../../components/common/table';
import EditModal from '../../components/common/modal';
import {Button, Icon, Modal, Input} from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {defaultPage} from '../../utils/utils';

class Index extends Component {

  // constructor(props) {
  //   super(props);
  // }

  state = {
    dataSource: [],
    visible: false,
    GruoupNameVisible: false,
    pagination: {},
    page: defaultPage(),
    currentPage: 1,
    bookDefGroupId: '',
    value: {},
    rowData: {}
  };

  refresh = () => {
    const {dispatch} = this.props;
    const {page, value} = this.state;
    dispatch({
      type: 'mygrouping/getBookDefGroupList',
      payload: {
        data: value,
        page: page
      }
    });
  };

  addModalShow = () => {
    this.setState({visible: true});
  };
  handleOk = () => {
    const {dispatch} = this.props;
    const cb = this.callback;
    dispatch({
      type: 'mygrouping/createBookDefGroup',
      payload: document.getElementById('defGroupName').value,
      callback: cb
    });
    this.setState({visible: false});
  };
  handleCancel = () => {
    this.setState({visible: false});
  };

  addModalShowGroupName = (r) => {
    this.setState({bookDefGroupId: r.bookDefGroupId, GruoupNameVisible: true, rowData: r});
  };
  detail = (r) => {
    console.log(r);
    this.props.dispatch(routerRedux.push('/home/libraries/groupingDetails?id=' + r.bookDefGroupId));
  };
  GruoupNamehandleOk = () => {
    const {dispatch} = this.props;
    const cb = this.callback;
    dispatch({
      type: 'mygrouping/editBookDefGroup',
      payload: {
        bookDefGroupId: this.state.bookDefGroupId,
        defGroupName: document.getElementById('updateDefGroupName').value
      },
      callback: cb
    });
    this.setState({GruoupNameVisible: false});
  };

  GruoupNamehandleCancel = () => {
    this.setState({GruoupNameVisible: false});
  };

  componentDidMount() {
    this.refresh();
  }

  UNSAFE_componentWillReceiveProps(r) {
    this.setState({
      dataSource: r.mygrouping.rows,
      pagination: {
        pages: r.mygrouping.pages,
        currentPage: this.state.currentPage,
        pageSize: r.mygrouping.pageSize
      }
    });
  }

  tableChange = (pagination) => {
  };

  callback = (r) => {

    if (r.status === 200) {
      this.refresh();
    }
  };

  removerBookDefGroup = (record) => {
    const {dispatch} = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'mygrouping/removerBookDefGroup',
          payload: record,
          callback: cb
        });
      }
    });
  };
  changePage = (val) => {
    const {formValues} = this.state;
    const page = {
      pageSize: 2,
      pageNo: val
    };
    this.setState({
      page,
      currentPage: val
    }, function () {
      this.refresh(formValues, page);
    });
  };

  render() {
    const columnsData = [{
      title: 'id',
      dataIndex: 'bookDefGroupId',
      key: 'bookDefGroupId'
    }, {
      title: '分组名称',
      dataIndex: 'defGroupName',
      key: 'defGroupName'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record) =>

        <div className='options'>
          <i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'
            onClick={() => this.detail(record)}
          >查看</i>
          <i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'
            onClick={() => this.addModalShowGroupName(record)}
          >重命名</i>
          <i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default'
            onClick={() => this.removerBookDefGroup(record.bookDefGroupId)}
          >删除</i>
        </div>

    }];
    const propsItem = {
      page: this.state.pagination,
      currentPage: this.state.currentPage,
      changePage: this.changePage
    };

    return (
      <div className='myGrouping'>
        <section className='flex-r'>
          <Button onClick={this.addModalShow}>
            <Icon type="plus" />新建分组
          </Button>
          <Pagination {...propsItem}></Pagination>
        </section>
        <section className='flex-r'>
          <Table
            dataSource={this.state.dataSource} columnsData={columnsData} pagination={false}
            onChange={this.tableChange} message='没有匹配的书籍哦！'
          ></Table>
        </section>
        <Modal
          centered
          visible={this.state.visible}
          closable={false}
          title='新建分组'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" onClick={this.handleOk}>
              确定
            </Button>,
            <Button key="back" onClick={this.handleCancel}>取消</Button>
          ]}
        >
          <Input id='defGroupName' placeholder='新建分组' />
        </Modal>
        <EditModal
          centered
          modalShow={this.state.GruoupNameVisible}
          closable={false}
          title='更改分组名称'
          okHandle={this.GruoupNamehandleOk}
          cancelHandle={this.GruoupNamehandleCancel}
          footer={[
            <Button key="submit" onClick={this.GruoupNamehandleOk}>
              确定
            </Button>,
            <Button key="back" onClick={this.GruoupNamehandleCancel}>取消</Button>
          ]}
        >
          <Input
            id='updateDefGroupName' placeholder={this.state.rowData.defGroupName}
          />
        </EditModal>
      </div>
    );
  }
}

export default connect(({mygrouping}) => ({
  mygrouping
}))(Index);

