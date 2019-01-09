import React, {Component, Fragment} from 'react';
import Editor from '../../components/common/editor';
import {Input, Button, Radio, Modal, Upload, Table} from 'antd';
import './index.less';
import {connect} from "dva";
import {Link} from "react-router-dom";

let arr = [];

class CreateNew extends Component {
  state = {
    modalVisible: false,
    noteModalVisible: false,
    dataSource: []
  };

  // UNSAFE_componentWillReceiveProps(r) {
  //   this.setState({
  //     dataSource: r.createnew
  //   });
  //   debugger;
  // }


  onCancel = () => {
    this.setState({
      modalVisible: false,
      noteModalVisible: false
    });
  };

  getUserImage = () => {
    this.setState({
      modalVisible: true
    });
    const {dispatch} = this.props;
    const callback = this.callback;
    dispatch({
      type: 'createnew/getUserImage',
      callback:callback
    });
  };

  callback = (r) => {
    if(r.status === 200){
      this.setState({
        dataSource: r.data
      });
      debugger;
    }
  };

  getUserAudio = () => {
    this.setState({
      modalVisible: true
    });
    const {dispatch} = this.props;
    const callback = this.callback;
    dispatch({
      type: 'createnew/getUserAudio',
      callback:callback
    });
  };

  getUserBookReadNotes = () => {
    debugger
    const {dispatch} = this.props;
    const callback = this.callback;
    dispatch({
      type: 'createnew/getUserBookReadNotes',
      callback:callback
    });
  };

  getUserMediaArticle = () => {
    debugger
    const {dispatch} = this.props;
    const callback = this.callback;
    dispatch({
      type: 'createnew/getUserMediaArticle',
      callback:callback
    });
  };


  render() {
    return (
      <Fragment>
        <div className='create'>
          <div className='create-wrapper'>
            <header className='flex-r'>
              <div className='create-title'>
                <p className='create-text'>投稿标题</p>
                <Input placeholder='请输入你的投稿标题'/>
              </div>
              <div className='create-cover'>
                <p className='create-text'>封面图片</p>
                <Button>请选择图片</Button>
              </div>
            </header>
            <p className='create-text'>插入元素</p>
            <main className='flex-r'>
              <aside>
                <div className='flex-r'>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value='a' onClick={this.getUserImage}>插入图片</Radio.Button>
                    <Radio.Button value='b' onClick={this.getUserAudio}>插入音频</Radio.Button>
                    <Radio.Button value='c' onClick={this.getUserBookReadNotes}>插入笔记</Radio.Button>
                  </Radio.Group>
                  <Modal
                    visible={this.state.modalVisible}
                    align={'center'}
                    footer={null}
                    onCancel={this.onCancel}
                    wrapClassName='uploadFile'
                  >
                    <Upload
                      showUploadList={false}
                    >
                      <Button value='a'>选择本地文件</Button>
                    </Upload>
                    <Button value='b'>选择素材库文件</Button>
                  </Modal>
                </div>
                <div className='editor-wrapper'>
                  <Editor/>
                </div>
              </aside>
              <aside>
                a
              </aside>
            </main>
          </div>
          <footer>
            <Button>提交审核</Button>
            <Button>保存成草稿</Button>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default connect(({createnew}) => ({
  createnew
}))(CreateNew);
