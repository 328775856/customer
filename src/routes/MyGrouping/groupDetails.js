import React, {Component} from 'react';
import Pagination from '../../components/common/pagination';
import Table from '../../components/common/table';
import EditModal from '../../components/common/modal';
import {Button, Modal, Input,Select, Switch} from 'antd';
import {connect} from 'dva';
import {defaultPage, isNotEmpty,formatTime} from '../../utils/utils';
import Search from "../../components/common/searchInput";

class Index extends Component {

  state = {
    dataSource: [],
    visible: false,
    stateVisible:false,
    isHiddenAdminStateVisible:false,
    pagination: {},
    currentPage: 1,
    page: defaultPage(),
    bookDefGroupId: '',
    value: {},
    rowData: {},
    isHiddenUser:'',
    bookUserId:'',
    bookDefGroup:[]
  };
  handleChange = e => {
    this.setState({
      selectValue: e
    });
  };
  addStateModalShow = (bookUserId, isHiddenUser, isHiddenAdmin) => {
    if (isHiddenUser === 0) {
      this.setState({isHiddenUser: 1});
      this.setState({stateVisible: true});
    } else {
      this.setState({isHiddenUser: 0});
      if (isHiddenAdmin === 1) {
        this.setState({isHiddenAdminStateVisible: true});
      } else {
        this.setState({stateVisible: true});
      }
    }
    this.setState({bookUserId: bookUserId});
  };

  stateHandleOk = () => {
    const {dispatch} = this.props;
    const cb = this.callback;
    dispatch({
      type: 'mybooks/setBookIsHiddenUserStatus',
      payload: {
        bookUserIds: [this.state.bookUserId],
        isHiddenUser: this.state.isHiddenUser
      },
      callback: cb
    });
    this.setState({stateVisible: false});
  };
  stateHandleCancel = () => {
    this.setState({stateVisible: false});
  };

  isHiddenAdminStateHandleCancel = () => {
    this.setState({isHiddenAdminStateVisible: false});
  };
  refresh = (value) => {
    const {dispatch} = this.props;
    const {page} = this.state;
    dispatch({
      type: 'mygrouping/getBookDefGroupBookList',
      payload: {
        data: value,
        page: page
      }
    });
  };


  componentDidMount() {
    const id = this.props.location.search.replace("?id=","");
    this.setState({bookDefGroupId:id});
    this.refresh(id);
  }

  UNSAFE_componentWillReceiveProps(r) {
    this.setState({
      dataSource: r.mygrouping.rows,
      pagination: {
        total: r.mygrouping.total,
        current: r.mygrouping.pageNo,
        pageSize: r.mygrouping.pageSize
      }
    });
  }

  tableChange = (pagination) => {
    const id = this.state.bookDefGroupId;
    const {formValues} = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    }, function () {
      this.refresh(id, page);
    });
  };

  callback = (r) => {
    if (r.status === 200) {
      this.refresh(this.state.bookDefGroupId);
    }
  };

  delGroupBook = (record) => {
    const id = this.state.bookDefGroupId;
    const {dispatch} = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'mygrouping/batchDeleteBookDefGroupBook',
          payload: {
            'bookDefGroupId': id,
            'bookUserIds':[record]
          },
          callback: cb
        });
      }
    });
  };
  addModalShow = (r) => {
    const {dispatch} = this.props;
    const cb = this.callbackGroup;
    dispatch({
      type: 'mybookgroup/getSelectBookDefGroupList',
      payload: {
        page: defaultPage()
      },
      callback: cb
    });
    this.setState({rowData: r, bookUserId: r.bookUserId, visible: true});
  };

  callbackGroup = (r) => {
    if (r.status === 200) {
      this.setState({bookDefGroup: r.data.rows});
    }
  };

  handleOk = () => {
    const {dispatch} = this.props;
    const cb = this.callback;
    if(isNotEmpty(document.getElementById('defGroupName').value)) {
      dispatch({
        type: 'mybooks/createBookDefGroup',
        payload: document.getElementById('defGroupName').value,
      });
    }
    if (isNotEmpty(this.state.bookUserId)) {
      dispatch({
        type: 'mybooks/divideIntoGroups',
        payload: {
          bookUserId: [this.state.bookUserId],
          bookDefGroupId: this.state.selectValue
        },
        callback: cb
      });
    }
    this.setState({visible: false});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  prevPage = (record) => {
    console.log('1');
  };
  nextPage = (record) => {
    console.log('1');
  };
  changePage = (val) => {
    const {formValues} = this.state;
    const page = {
      pageSize: 2,
      pageNo: parseInt(val) + 1
    };
    this.setState({
      page,
      currentPage: val
    }, function () {
      this.refresh(formValues, page);
    });
    console.log(val);
  };

  search = (val) => {
    this.setState({
      page: defaultPage()
    }, function () {
      this.searcherBook(val);
    });
  };

  searcherBook = (value) => {
    const {dispatch} = this.props;
    const {page} = this.state;
    dispatch({
      type: 'mygrouping/getBookDefGroupBookList',
      payload: {
        data: this.state.bookDefGroupId,
        page: defaultPage(),
        bookName: value
      }
    });
  };
  render() {
    const columnsData = [{
      title: '书名',
      dataIndex: 'bookName',
      key: 'bookName',
      render: (text, record) =>
        <div className="bookName flex-r jus">
          <img src={record.coverPath} style={{width: 42, height: 60, borderRadius: '5px', marginRight: '15px'}} alt="" />
          <span>{record.bookName}</span>
        </div>
    }, {
      title: '来源',
      dataIndex: 'bookSource',
      key: 'bookSource',
      width: 80,
      render: (text, record) => {
        if (record.bookSource === 0) {
          return <div className="iconfont icon-ic_chuan" />;
        } else if (record.bookSource === 1) {
          return <div className="iconfont icon-ic_gou" />;
        } else {
          return <div className="iconfont icon-ic_zeng" />;
        }
      }
    }, {
      title: '大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 100,
      render: (text, record) =>
        <div className="fileSize">{Math.round(record.fileSize / 1024 / 10) * 10}kb</div>
    }, {
      title: '创建时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      width: 200,
      render: (text, record) =>
        <div className="uploadTime">{formatTime(record.uploadTime)}</div>
    }, {
      title: '格式',
      dataIndex: 'fileFormat',
      key: 'fileFormat',
      width: 100
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      width: 500,
      render: (text, record) =>
        <div className='options'>
          <span style={{display: 'inline-block', verticalAlign: 'middle', paddingRight: '40px'}}>
            <Switch
              style={{marginRight: '20px'}}
              onClick={() => this.addStateModalShow(record.bookUserId, record.isHiddenUser, record.isHiddenAdmin)}
              checked={record.isHiddenUser !== 0}
            />公开/隐藏
          </span>
          <i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'
            onClick={() => this.addModalShow(record)}
          >分组到</i>
          <i
            style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default'
            onClick={() => this.delGroupBook(record.bookUserId)}
          >删除</i>
        </div>

    }];

    const propsItem = {
      page: this.state.pagination,
      currentPage: this.state.currentPage,
      changePage: this.changePage
    };

    return (
      <div className='myBooks'>
        <section className='flex-r'>
          {/*<Search search={this.search} placeholder='在我的图书里搜索'></Search>*/}
          <Pagination {...propsItem}></Pagination>
        </section>
        <section className='flex-r'>
          {/*<Sider selectCb={this.selectCb}></Sider>*/}
          <Table
            rowKey='bookName' dataSource={this.state.dataSource} columnsData={columnsData}
            pagination={false} onChange={this.tableChange} message='没有匹配的书籍哦！'
          ></Table>
        </section>
        <EditModal
          data={this.state.rowData}
          modalShow={this.state.visible}
          closable={false}
          title='分组到'
          okHandle={this.handleOk}
          cancelHandle={this.handleCancel}
        >
          <Select
            onChange={this.handleChange} style={{width: 320}}
            placeholder="全部分组"
          >{this.state.bookDefGroup.map((item, index) =>
              <Select.Option key={item.bookDefGroupId}>{item.defGroupName}</Select.Option>
            )}
          </Select>
          <Input id='defGroupName' placeholder='新建分组' />
        </EditModal>
        <Modal
          centered
          visible={this.state.isHiddenAdminStateVisible}
          closable={false}
          title='公开失败'
          // onOk={this.stateHandleOk}
          onCancel={this.isHiddenAdminStateHandleCancel}
          footer={[
            <Button key="back" onClick={this.isHiddenAdminStateHandleCancel}>确认</Button>
          ]}
        >
          该书已被运营设置为私藏，具体原因详询藏书馆客服
        </Modal>  <Modal
          centered
          visible={this.state.stateVisible}
          closable={false}
          title='切换状态'
          onOk={this.stateHandleOk}
          onCancel={this.stateHandleCancel}
          footer={[
            <Button key="submit" onClick={this.stateHandleOk}>
            确定
            </Button>,
            <Button key="back" onClick={this.stateHandleCancel}>取消</Button>
          ]}
        >
        </Modal>
      </div>
    );
  }
}

export default connect(({mygrouping,mybooks,mybookgroup}) => ({
  mygrouping,mybooks,mybookgroup
}))(Index);

