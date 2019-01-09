import React, {Component} from 'react';
import {connect} from 'dva';
import Pagination from '../../components/common/pagination';
import Table from '../../components/common/table';
import Search from '../../components/common/searchInput';
import Sider from '../../components/common/sider';
import EditModal from '../../components/common/modal';
import {Button, Input, Modal, Select, Switch} from 'antd';
import {defaultPage, isNotEmpty, formatTime} from '../../utils/utils';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      page: defaultPage(),
      stateVisible: false,
      bookUserId: '',
      isHiddenUser: '',
      bookDefGroup: [],
      selectValue: '',
      rowData: {},
      pagination: {},
      value: {},
      selectTypeValue: {},
      isHiddenAdminStateVisible: false,
      currentPage: 1,
    };
  }


  handleChange = e => {
    this.setState({
      selectValue: e
    });
  };

  delBook = (record) => {
    const {dispatch} = this.props;
    const arr = [record];
    const cb = this.BookCallBack;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'mybooks/delBook',
          payload: arr,
          callback: cb
        });
      }
    });
  };
  BookCallBack = (r) => {
    if (r.status === 200) {
      this.refreshTypeBook();
    }
  };
  addModalShow = (r) => {
    const {dispatch} = this.props;
    const cb = this.callback;
    dispatch({
      type: 'mybookgroup/getSelectBookDefGroupList',
      payload: {
        page: defaultPage()
      },
      callback: cb
    });
    this.setState({rowData: r, bookUserId: r.bookUserId, visible: true});
  };
  callback = (r) => {
    if (r.status === 200) {
      this.setState({bookDefGroup: r.data.rows});
    }
  };
  handleOk = () => {
    const {dispatch} = this.props;
    const cb = this.BookCallBack;
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

  isHiddenAdminStateHandleCancel = () => {
    this.setState({isHiddenAdminStateVisible: false});
  };

  stateHandleOk = () => {
    const {dispatch} = this.props;
    const cb = this.BookCallBack;
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

  refreshTypeBook = () => {
    const {dispatch} = this.props;
    const {value, page} = this.state;
    if (this.state.selectTypeValue === 'uploadBooks') {
      dispatch({
        type: 'mybooks/getUserCloudBook',
        payload: {
          data: value,
          page: page,
          typeBookValue: 1
        }
      });

    } else if (this.state.selectTypeValue === 'donatedBooks') {
      dispatch({
        type: 'mybooks/getUserCloudBook',
        payload: {
          data: value,
          page: page,
          typeBookValue: 2
        }
      });
    } else if (this.state.selectTypeValue === 'purchasedBooks') {
      dispatch({
        type: 'mybooks/getUserCloudBook',
        payload: {
          data: value,
          page: page,
          typeBookValue: 0
        }
      });
    } else {
      dispatch({
        type: 'mybooks/getUserCloudCoverBook',
        payload: {
          data: value,
          page: page
        }
      });
    }
  };

  refresh = () => {
    const {dispatch} = this.props;
    const {value, page} = this.state;
    dispatch({
      type: 'mybooks/getUserCloudCoverBook',
      payload: {
        data: value,
        page: page
      }
    });
  };

  tableChange = (pagination) => {
    // const {formValues} = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    }, function () {
      this.refreshTypeBook();
      //  this.refresh(formValues, page);
    });
  };
  selectCb = (val) => {
    this.setState({selectTypeValue: val,currentPage: 1});
    // this.refreshTypeBook();
    const {dispatch} = this.props;
    const {value} = this.state;

    if (val === 'uploadBooks') {
      dispatch({
        type: 'mybooks/getUserCloudBook',
        payload: {
          data: value,
          page: defaultPage(),
          typeBookValue: 1
        }
      });
    } else if (val === 'donatedBooks') {
      dispatch({
        type: 'mybooks/getUserCloudBook',
        payload: {
          data: value,
          page: defaultPage(),
          typeBookValue: 2
        }
      });
    } else if (val === 'purchasedBooks') {
      dispatch({
        type: 'mybooks/getUserCloudBook',
        payload: {
          data: value,
          page: defaultPage(),
          typeBookValue: 0
        }
      });
    } else {
      dispatch({
        type: 'mybooks/getUserCloudCoverBook',
        payload: {
          data: value,
          page: defaultPage()
        }
      });
    }
  };


  search = (val) => {
    this.setState({
      page: defaultPage()
    }, function () {
      this.seacherBook(val);
    });
  };


  seacherBook = (value) => {
    const {dispatch} = this.props;
    const {page} = this.state;
    const val = this.state.selectTypeValue;
    if (val === 'uploadBooks') {
      dispatch({
        type: 'mybooks/getSearcherUserCloudBook',
        payload: {
          data: value,
          page: defaultPage(),
          typeBookValue: 1
        }
      });
    } else if (val === 'donatedBooks') {
      dispatch({
        type: 'mybooks/getSearcherUserCloudBook',
        payload: {
          data: value,
          page: defaultPage(),
          typeBookValue: 2
        }
      });
    } else if (val === 'purchasedBooks') {
      dispatch({
        type: 'mybooks/getSearcherUserCloudBook',
        payload: {
          data: value,
          page: defaultPage(),
          typeBookValue: 0
        }
      });
    } else {
      dispatch({
        type: 'mybooks/getSearcherUserCloudCoverBook',
        payload: {
          data: value,
          page
        }
      });
    }
  };

  componentDidMount() {
    this.refresh();
  }

  UNSAFE_componentWillReceiveProps(r) {
    this.setState({
      dataSource: r.mybooks.rows,
      pagination: {
        pages: r.mybooks.pages,
        currentPage: this.state.currentPage,
        current: r.mybooks.pageNo,
        pageSize: r.mybooks.pageSize
      }
    });
  }

  changePage = (val) => {
    // const {formValues} = this.state;
    const page = {
      pageSize: 10,
      pageNo: val
    };
    this.setState({
      page,
      currentPage: val
    }, function () {
      this.refresh();
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
      title: '分组',
      dataIndex: 'defGroupName',
      key: 'defGroupName',
      width: 100,
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
      width: 100,
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
            onClick={() => this.delBook(record.bookUserId)}
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
          <Search search={this.search} placeholder='在我的图书里搜索' />
          <Pagination {...propsItem} />
        </section>
        <section className='flex-r'>
          <Sider selectCb={this.selectCb} />
          {
            this.state.dataSource.length > 0 ? <Table
              rowKey='bookName' dataSource={this.state.dataSource} columnsData={columnsData}
              pagination={false} onChange={this.tableChange} message='没有匹配的书籍哦！'
            /> : <Table
              rowKey='bookName' dataSource={[]} columnsData={columnsData}
              pagination={false} onChange={this.tableChange} message='没有匹配的书籍哦！'
            >
              <div className='ant-table-placeholder_new'>
                <div className="noData-wrapper">
                  <div className="noData"></div>
                  <p>没有匹配的书籍哦！</p></div>
              </div>
            </Table>
          }

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
            <Button key="back" onClick={this.isHiddenAdminStateHandleCancel} htmlType='button'>确认</Button>
          ]}
        >
          该书已被运营设置为私藏，具体原因详询藏书馆客服
        </Modal>
        <Modal
          centered
          visible={this.state.stateVisible}
          closable={false}
          title='切换图书状态'
          onOk={this.stateHandleOk}
          onCancel={this.stateHandleCancel}
          footer={[
            <Button key="submit" onClick={this.stateHandleOk} htmlType='button'>
              确定
            </Button>,
            <Button key="back" onClick={this.stateHandleCancel} htmlType='button'>取消</Button>
          ]}
        >
        </Modal>
      </div>
    );
  }
}

export default connect(({mybooks, mybookgroup}) => ({
  mybooks, mybookgroup
}))(Index);
