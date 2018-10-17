import React, {Component} from 'react';
import {Table} from 'antd';

class table extends Component {
  state={
    bordered: true
  }
  componentDidMount() {
    let message = this.props.message;
    if (this.props.dataSource.length === 0) {
      this.setState({bordered: false})
      document.getElementsByClassName('ant-table-placeholder')[0].innerHTML = '<div class="noData-wrapper"><div class="noData"></div><p>' + message + '</p></div>';
    }
  }

  render() {
    return (
      <div className='table'>
        <Table dataSource={this.props.dataSource} pagination={false} columns={this.props.columnsData} bordered={this.state.bordered} />
      </div>
    );
  }
}

export default table;
