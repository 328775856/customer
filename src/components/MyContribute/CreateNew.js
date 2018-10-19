import React, {Component} from 'react';
import Editor from '../common/editor';
import {Input, Button} from 'antd';
import './index.less';

class CreateNew extends Component {
  render() {
    return (
      <div className='create'>
        <div className='create-wrapper'>
          <header className='flex-r'>
            <div className='create-title'>
              <p className='create-text'>投稿标题</p>
              <Input placeholder='请输入你的投稿标题'></Input>
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
                <Button>插入图片</Button>
                <Button>插入音频</Button>
                <Button>插入笔记</Button>
              </div>
              <div className='editor-wrapper'>
                <Editor></Editor>
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
    );
  }
}

export default CreateNew;
