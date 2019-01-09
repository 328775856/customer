import React, {Component} from 'react';
import Pagination from '../../components/common/pagination';
import Table from '../../components/common/table';
import {Switch, Radio, Modal, Upload, message, Button, Icon} from 'antd';

class Mybooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      dataSource: [],
      modalVisible: false,
      percent: [],
      uploadList: [],
      columnsData: [{
        title: '书名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render() {
          return (
            <div>
              <i className='iconfont icon-ic_chuan'></i>
            </div>
          );
        }
      }, {
        title: '进度',
        dataIndex: 'progress',
        key: 'progress',
        render: (text, record) =>
          // if (this.state.uploadList.indexOf(record.name) !== -1) {
          //   return (
          //     <div>100%</div>
          //   );
          // } else {

          <div>{this.state.percent[record.name] || 0}%</div>

        // }

      }, {
        title: '大小',
        dataIndex: 'size',
        key: 'sieze'
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render() {
          return (
            <div className='options'>
              <span style={{display: 'inline-block', verticalAlign: 'middle', paddingRight: '40px'}}>
                <Switch style={{marginRight: '20px'}}/>公开/隐藏
              </span>
              <i style={{paddingRight: '40px'}} className='iconfont icon-ic_fengzu_default'>分组到</i>
              <i style={{paddingRight: '40px'}} className='iconfont icon-ic_shanchu_default'>删除</i>
            </div>
          );
        }
      }],
      checked: true
    };
  }

  handleSizeChange = (e) => {
    this.setState({checked: !e.target.checked});
  };

  addLocalFile = () => {
    this.setState({modalVisible: true});
  };
  allStart = () => {
    const that = this;
    const px=new Promise(function(resolve,reject){
      let formdata = new FormData();
      let file = that.state.fileList[0]
      formdata.append('file', file);
      formdata.append('filename', file.name);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', process.env.NODE_ENV === 'production' ? '/api/gb_customer/GbCustomer/file/uploadBook' : '/file/uploadBook');
      xhr.setRequestHeader('Authorization', sessionStorage.getItem("auth"));
      xhr.onload = function (e) {
        if(this.status == 200||this.status == 304){
          let list =that.state.fileList
          list = list.splice(1,1)
          // that.state.fileList.slice(0)
          setTimeout(()=>{
            that.setState({fileList: list},
              () => {
                console.log(that.state.fileList);
                 resolve(that.state.fileList)
              });
          },1000)
        }
        // if (that.state.percent[file.name] == 100) {
        //   for (let i of that.state.fileList) {
        //     if (i.name === file.name) {
        //       that.state.fileList.splice(that.state.fileList.indexOf(file.name), 1);
        //       that.setState({fileList: that.state.fileList.splice(that.state.fileList.indexOf(file.name), 1)},
        //         () => {
        //           console.log(that.state.fileList);
        //           resolve(that.state.fileList)
        //         });
        //     }
        //   }
        // }
      };
      xhr.upload.onprogress = function (e) {
        let name = file.name;
        let obj = {};
        obj[name] = Math.round(e.loaded / e.total * 100);
        if (e.lengthComputable) {
          that.setState({percent: obj}, () => {
            // if (that.state.percent[name] == 100) {
            //   // setTimeout(() => {
            //     flag = true;
            //   // }, 3000);
            // }
          });
        }
      };
      xhr.send(formdata);
    })
    px.then(v=>{
      console.log(v)
      if(v.length>0){
        this.allStart()
      }
    })
    // this.state.fileList.forEach(file => {
    //   // let flag = false;
    //   let formdata = new FormData();
    //   formdata.append('file', file);
    //   formdata.append('filename', file.name);
    //   let xhr = new XMLHttpRequest();
    //   xhr.open('POST', process.env.NODE_ENV === 'production' ? '/api/gb_customer/GbCustomer/file/uploadBook' : '/file/uploadBook');
    //   xhr.setRequestHeader('Authorization', sessionStorage.getItem("auth"));
    //   xhr.onload = function (e) {
    //     if (that.state.percent[file.name] == 100) {
    //       for (let i of that.state.fileList) {
    //         if (i.name === file.name) {
    //           that.state.fileList.splice(that.state.fileList.indexOf(file.name), 1);
    //           that.setState({fileList: that.state.fileList.splice(that.state.fileList.indexOf(file.name), 1)},
    //             () => {
    //               console.log(that.state.fileList);
    //             });
    //         }
    //       }
    //     }
    //   };
    //   xhr.upload.onprogress = function (e) {
    //     let name = file.name;
    //     let obj = {};
    //     obj[name] = Math.round(e.loaded / e.total * 100);
    //     if (e.lengthComputable) {
    //       that.setState({percent: obj}, () => {
    //         // if (that.state.percent[name] == 100) {
    //         //   // setTimeout(() => {
    //         //     flag = true;
    //         //   // }, 3000);
    //         // }
    //       });
    //     }
    //   };
    //   xhr.send(formdata);
    // });
    // that.setState({fileList: []});
  };
  okHandle = () => {
    this.setState({modalVisible: false});
  };
  cancelHandle = () => {
    this.setState({modalVisible: false});
  };

  render() {
    const props = {
      name: 'file',
      // action: 'http://192.168.10.172:8769/api/gb_customer/GbCustomer/file/uploadBook',
      // action: 'http://localhost:8000/api/gb_customer/GbCustomer/file/uploadBook',
      // action: '/file/uploadBook',
      action: process.env.NODE_ENV === 'production' ? '/api/gb_customer/GbCustomer/file/uploadBook' : '/file/uploadBook',
      headers: {
        authorization: sessionStorage.getItem('auth')
      },
      showUploadList: false,
      // data: (file) => ({"fileName": file.name}),
      beforeUpload: (file, fileList) => {
        if (this.state.fileList.length === 0) {
          this.setState({fileList: this.state.fileList.concat(fileList), modalVisible: false});
          return false;
        } else {
          let arr = [];
          for (let i of this.state.fileList) {
            arr.push(i.name);
          }
          for (let i = 0; i < this.state.fileList.length; i++) {
            if (this.state.fileList[i].name !== file.name && arr.indexOf(file.name) === -1) {
              this.setState({fileList: this.state.fileList.concat(fileList), modalVisible: false});
            } else {
              message.warn('重复选择！');
              this.setState({modalVisible: false});
              return false;
            }
            // if (this.state.fileList[i].name === file.name && this.state.fileList.indexOf(this.state.fileList[i].name) !== -1) {
            //   message.warn('重复添加！');
            //   return false;
            // } else {
            //   this.setState({fileList: this.state.fileList.concat(fileList), modalVisible: false});
            // }
          }
          return false;
        }
      },
      onChange: (info) => {
        // if (this.state.fileList.length !== 0 && this.state.fileList[0].name.indexOf(info.file.name) !== -1) {
        //   message.warn('重复添加！');
        //   return;
        // }
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name}上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name}上传失败`);
        }
      },
    };
    return (
      <div className='uploadBooks'>
        <section className='flex-r'>
          <div className='btn'>
            <Radio.Group onChange={this.handleSizeChange}>
              <Radio.Button
                checked={this.state.checked}
                value='addLocal'
                onClick={this.addLocalFile}
              >添加本地文件</Radio.Button>
              <Radio.Button
                value='addStart'
                onClick={this.allStart}
              >全部开始</Radio.Button>
            </Radio.Group>
          </div>
          {/*<Pagination></Pagination>*/}
        </section>
        <section className='flex-r'>
          <Table
            rowKey='uid' dataSource={this.state.fileList} columnsData={this.state.columnsData}
            message='请上传文件！'
          ></Table>
        </section>
        <Modal
          className='uploadBooksModal'
          title='上传文件'
          visible={this.state.modalVisible}
          okText='确定'
          cancelText='取消'
          onOk={this.okHandle}
          onCancel={this.cancelHandle}
        >
          <Upload
            {...props}
          >
            <Button>
              <Icon type="upload"/> 请点击上传
            </Button>
          </Upload>
        </Modal>
      </div>
    );
  }
}

export default Mybooks;
