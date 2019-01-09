import React, {Component} from 'react';
import {Modal} from 'antd';

class modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {modalShow, cancelHandle, okHandle, title, data, footer} = this.props;
    return (
      <div className='modal'>
        <Modal
          centered
          title={title}
          visible={modalShow}
          onCancel={cancelHandle}
          onOk={okHandle}
          footer={footer}
          okText='确定'
          cancelText='取消'
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default modal;
