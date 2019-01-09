import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import Pagination from '../../components/common/pagination';
import Table from '../../components/common/table';
import {Button, DatePicker, Input} from 'antd';
import {defaultPage, formatTime} from '../../utils/utils';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');


class MyIncome extends Component {
  state = {
    dataSource: [],
    pagination: {},
    value: {},
    productName: '',
    startTime: null,
    endTime: null,
    page: defaultPage(),
    currentPage: 1,
    visible: false
  };

  refresh = (value, page) => {
    this.props.dispatch({
      type: 'myincome/saleInfo',
      payload: {
        data: value,
        page: page
      }
    });
  };

  resetForm = () => {
    this.setState({productName: ''});
    this.setState({startTime: null});
    this.setState({endTime: null});
  };

  componentDidMount() {
    const {value, page} = this.state;
    this.refresh(value, page);
  }

  UNSAFE_componentWillReceiveProps(r) {
    const {total, pageNo, pageSize, rows, pages} = r.myincome;
    const pagination = {
      pageSize: pageSize,
      currentPage: this.state.currentPage,
      pages: pages
    };
    this.setState({
      dataSource: rows,
      pagination
    });
  }

  onChangeProductName = (e) => {
    this.setState({
      productName: e.target.value
    });
  };
  onChangeStartTime = (date, dateString) => {
    this.setState({
      startTime: date
    });
  };
  onChangeEndTime = (date, dateString) => {
    this.setState({
      endTime: date
    });
  };
  search = () => {
    const {value, page} = this.state;
    value.startTimeStr = this.state.startTime ? this.state.startTime.format('YYYYMMDDHHMMSS') : '';
    value.endTimeStr = this.state.endTime ? this.state.endTime.format('YYYYMMDDHHMMSS') : '';
    value.productName = this.state.productName;
    this.refresh(value, page);
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
    const columnsData = [{
      title: '序号',
      dataIndex: 'orderId'
    }, {
      title: '序列名称',
      dataIndex: 'productName'
    }, {
      title: '销售时间',
      dataIndex: 'payDateTime',
      render: (text) => <Fragment>{formatTime(text)}</Fragment>
    }, {
      title: '苹果销量',
      dataIndex: 'iosVolume'
    }, {
      title: '苹果销售额',
      dataIndex: 'iosSales'
    }, {
      title: '安卓销量',
      dataIndex: 'androidVolume'
    }, {
      title: '安卓销售额',
      dataIndex: 'androidSales'
    }, {
      title: '日销量',
      dataIndex: 'dailySales'
    }];

    const propsItem = {
      page: this.state.pagination,
      currentPage: this.state.currentPage,
      changePage: this.changePage
    };
    return (
      <div className='myIncome'>
        <section className='flex-r'>
          <Input
            value={this.state.productName}
            placeholder="请输入序列名"
            style={{height: 40, width: 280}}
            onChange={this.onChangeProductName}
          />
          &nbsp;&nbsp;
          <DatePicker
            value={this.state.startTime}
            allowClear={false}
            size={'large'}
            onChange={this.onChangeStartTime}
            format="YYYY-MM-DD HH:MM:SS"
            placeholder="开始时间"/>
          &nbsp;-&nbsp;
          <DatePicker
            value={this.state.endTime}
            allowClear={false}
            onChange={this.onChangeEndTime}
            size={'large'}
            format="YYYY-MM-DD HH:MM:SS"
            placeholder="结束时间"/>
          &nbsp;&nbsp;
          <Button style={{height: 40, width: 120}} type="primary" onClick={this.search}>
            查询
          </Button>
          <Button style={{marginLeft: 8, height: 40, width: 120}} onClick={this.resetForm}>
            重置
          </Button>
          <Pagination className='pagination' {...propsItem}></Pagination>
        </section>
        <section className='flex-r'>
          <Table
            dataSource={this.state.dataSource}
            columnsData={columnsData}
            pagination={false}
            rowKey='orderId'
            message='没有匹配的订单哦！'
          >
          </Table>
        </section>
      </div>
    );
  }
}

export default connect(({myincome}) => ({
  myincome
}))(MyIncome);
