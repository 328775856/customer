import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import Pagination from '../../components/common/pagination';
import SearchInput from '../../components/common/searchInput';
import Table from '../../components/common/table';
import {Button, Dropdown, Menu,Modal} from 'antd';
import{defaultPage,getPreMonth,isEmpty} from '../../utils/utils';
import {formatTime} from '../../utils/utils';

class Index extends Component {
  state = {
    dataSource: [],
    pagination:{},
    value:{},
    amount:0,
    page:defaultPage(),
    currentPage:1,
    visible: false
  };

  refresh = (amount) =>{
    const {value,page} = this.state;
    value.lessTime = getPreMonth(amount);
    this.props.dispatch({
      type: 'myborrow/bookProgress',
      payload: {
        data:value,
        page: page
      }
    });
    this.setState({
      amount: isEmpty(amount) ? 0 : amount
    });
  };

  componentDidMount() {
    this.refresh(0);
  }

  queryThreeMonths = (amount,e) =>{
    e.preventDefault();
    this.setState({
      page:defaultPage()
    },function(){
      this.refresh(amount);
    });
  };

  //三个月之前的阅历按月份倒序 amount=2
  queryLastReadMonthByGroup = (amount,e) =>{
    e.preventDefault();
    const {dispatch} = this.props;
    const {page} = this.state;
    dispatch({
      type:'myborrow/queryLastReadMonthByGroup',
      payload:{
        data:{lastReadtime:getPreMonth(amount)},
        page:page
      }
    });
  };

  //查询具体月份的阅历
  queryProgressByMonth =() =>{
    const {dispatch} = this.props;
    const {page} = this.state;
    dispatch({
      type:'myborrow/queryProgressByMonth',
      payload:{
        data:{lastReadtime:201811},
        page:page
      }
    });
  };

  UNSAFE_componentWillReceiveProps(r) {
    const {total,pageNo,pageSize,rows,pages} = r.myborrow;
    const pagination ={
      pageSize: pageSize,
      currentPage: this.state.currentPage,
      pages: pages
    };
    this.setState({
      dataSource: rows,
      pagination
    });
  }

  search = (val) => {
    const {amount} = this.amount;
    this.setState({
      value:{
        search: val
      },
      page:defaultPage()
    },function () {
      this.refresh(amount);
    });
  };

  removerBookProgress = (bookUserId) => {
    const {dispatch} = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗？',
      onOk() {
        dispatch({
          type: 'myborrow/deleteBookProgress',
          payload: {
            'bookUserId': bookUserId
          },
          callback: cb
        });
      }
    });
  };

  callback = (r) => {
    if (r.status === 200) {
      this.refresh();
    }
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
    const columnsData =[{
      title:'图书用户Id',
      dataIndex:'bookUserId',
      key:'bookUserId',
      className:'hide'
    },{
      title:'书名',
      dataIndex:'bookName',
      key:'bookName',
      render: (text, record) =>
        <div className="bookName">
          <img src={record.coverPath} style={{ width: '42px', height: '60px', marginRight: '15px', borderRadius:'5px' }} alt="" />{record.bookName}
        </div>
    },{
      title:'借阅状态',
      dataIndex:'borrowStatus',
      key:'borrowStatus',
      render:(text,record) =>text === 1 ? '借阅中':'已过期'
    },{
      title:'阅读进度',
      dataIndex:'readProgress',
      key:'readProgress',
      render: (text, record) => <Fragment>{text}%</Fragment>
    },{
      title:'借阅时间',
      dataIndex:'borrowTime',
      key:'borrowTime',
      render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
    },{
      title:'操作',
      dataIndex:'options',
      render:(text,record) =>
        <div className='options'>
          <i style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default' onClick={() => this.removerBookProgress(record.bookUserId)}>删除</i>
          {/*<i style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default' onClick={() => this.queryProgressByMonth()}>测试</i>*/}
        </div>

    }];
    const menu =
      <Menu>
        <Menu.Item key="0">
          <a href="#" onClick={(e)=>this.queryThreeMonths(2,e)}>近三个月</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a
            href="#" onClick={(e)=>this.queryLastReadMonthByGroup(2,e)}
          >三个月前</a>
        </Menu.Item>
        {/*<Menu.Divider />*/}
        {/*<Menu.Item key="3">3rd menu item</Menu.Item>*/}
      </Menu>
    ;

    const propsItem = {
      page: this.state.pagination,
      currentPage: this.state.currentPage,
      changePage: this.changePage
    };
    return (
      <div className='myBorrow'>
        <section className='flex-r'>
          <SearchInput search={this.search} placeholder='在我的阅历里搜索'></SearchInput>
          <Pagination className='pagination' {...propsItem}></Pagination>
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Button>
              <i className='iconfont icon-ic_more'></i>
            </Button>
          </Dropdown>
        </section>
        <section className='flex-r'>
          <Table
            dataSource={this.state.dataSource}
            columnsData={columnsData}
            pagination={false}
            rowKey='bookUserId'
            message='没有匹配的书籍哦！'
          >
          </Table>
        </section>
      </div>
    );
  }
}

export default connect(({myborrow}) => ({
  myborrow
}))(Index);
