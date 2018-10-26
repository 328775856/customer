import React, {Component} from 'react';
import Pagination from '../../components/common/pagination';
import Table from '../../components/common/table';
import {Button, Icon, Modal, Input} from 'antd';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          key:1,
          allGrouping:'1',
          createTime:'2321312',
          options:'12312'
        }
      ],
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
      }],
      visible: false
    };
  }

  addModalShow = () => {
    this.setState({visible: true});
  };
  handleOk = () => {
    this.setState({visible: false});
  };
  handleCancel = () => {
    this.setState({visible: false});
  };

  render() {
    return (
      <div className='myGrouping'>
        <section className='flex-r'>
          <Button onClick={this.addModalShow}>
            <Icon type="plus" />重建分组
          </Button>
          <Pagination></Pagination>
        </section>
        <section className='flex-r'>
          <Table dataSource={this.state.dataSource} columnsData={this.state.columnsData} message='没有匹配的书籍哦！'></Table>
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
          <Input placeholder='新建分组' />
        </Modal>
      </div>
    );
  }
}

export default Index;
