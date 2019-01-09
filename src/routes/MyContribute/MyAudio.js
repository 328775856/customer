import React, {Component} from 'react';
import {Radio, message, Icon, Upload} from 'antd';
import {defaultPage} from "../../utils/utils";
import CoverCell from "../../components/common/coverCell";
import {connect} from "dva";
import Pagination from "../../components/common/pagination";

class MyAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxFileSize: 10,
      dataSource: [],
      arr: [],
      previewVisible: false,
      previewImage: '',
      fileList: [],
      page: defaultPage(),
      currentPage: 1
    };
  }

  changeCheck = () => {
    if (this.state.arr.length > 0) {
      this.setState({arr: []});
    } else {
      let arr = [];
      for (let i of this.state.dataSource) {
        arr.push(i.mediaAudioId);
      }
      this.setState({arr: arr});
    }
  };

  change = (val) => {
    if (this.state.arr.indexOf(val) !== -1) {
      this.state.arr.splice(this.state.arr.indexOf(val), 1);
      this.setState({arr: this.state.arr});
    } else {
      this.setState({arr: this.state.arr.concat(val)});
    }
  };
  handleSizeChange = (e) => {
    this.setState({checked: !e.target.checked});
  };
  beforeUpload = file => {
    // console.log(file.size);
    const maxFileSize = this.state.maxFileSize;
    if (maxFileSize) {
      const isLtMax = file.size / 1024 / 1024 < maxFileSize;
      if (!isLtMax) {
        message.error(`文件大小超过${maxFileSize}M限制`);
        return false;
      }
      return isLtMax;
    }
  };

  refresh = () => {
    const {dispatch} = this.props;
    const {page, value} = this.state;
    dispatch({
      type: 'myaudio/getAudioPage',
      payload: {
        data: value,
        page: page
      }
    });
  };
  sendAudio = (data, audioName) => {
    const {dispatch} = this.props;
    const cb = this.callback;
    let minute = Math.floor(data.millisecond / (1000 * 60));
    let second = Math.round(((data.millisecond - minute * 1000 * 60) / 1000).toFixed(1));
    let audioFormat = data.format === 'mp3' ? 1 : 0;
    dispatch({
      type: 'myaudio/addAudio',
      payload: {
        audioPath: data.fileName,
        fileName: audioName,
        audioFormat: audioFormat,
        minute: minute,
        second: second,
      },
      callback: cb
    });
  };
  callback = (r) => {
    if (r.status == 200) {
      this.refresh();
    }
  };

  deleteAudio = (val) => {
    const {dispatch} = this.props;
    const cb = this.callback;
    // console.log(val);
    dispatch({
      type: 'myaudio/delAudio',
      payload: {
        mediaAudioId: val
      },
      callback: cb
    });
  };

  componentDidMount() {
    this.refresh();
  }

  UNSAFE_componentWillReceiveProps(r) {
    this.setState({
      dataSource: r.myaudio.rows,
      pagination: {
        pages: r.myaudio.pages,
        currentPage: this.state.currentPage,
        pageSize: r.myaudio.pageSize
      }
    });
  }

  changePage = (val) => {
    const {formValues} = this.state;
    const page = {
      pageSize: 10,
      pageNo: val
    };
    this.setState({
      page,
      currentPage: val,
      arr: []
    }, function () {
      this.refresh(formValues, page);
    });
  };

  render() {
    const UploadBtn = <div><span>+</span></div>;
    const props = {
      name: 'file',
      action: process.env.NODE_ENV === 'production' ? '/api/gb_customer/GbCustomer/file/uploadAudio' : '/file/uploadAudio',
      accept: "audio/*",
      headers: {
        authorization: sessionStorage.getItem('auth')
      },
      onChange: (info) => {
        if (info.file.status !== 'uploading') {
          if (info.file.type.indexOf('mp3') === -1 && info.file.type.indexOf('aac') === -1) {
            message.error('请上传aac或mp3格式音频！');
            return;
          }
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name}上传成功！`);
          this.sendAudio(info.file.response.data, info.file.name);
        } else if (info.file.status === 'error') {
          console.log(info.file.status);
          message.error(`${info.file.name}上传失败！`);
        }
      }
    };
    const propsItem = {
      page: this.state.pagination,
      currentPage: this.state.currentPage,
      changePage: this.changePage
    };
    return (
      <div className='uploadBooks'>
        <section className='flex-r'>
          <div className='btn'>
            <Radio.Group onChange={this.handleSizeChange}>
              <Radio.Button
                value='addAll'
                onClick={this.changeCheck}
              >全选</Radio.Button>
              <Radio.Button value='delete'>删除</Radio.Button>
            </Radio.Group>
          </div>
          <div className='pagination-wrapper'>
            <Pagination {...propsItem} />
          </div>
        </section>
        <section className='flex-r' style={{justifyContent: 'flex-start', minWidth: 1528}}>
          <Upload
            {...props}
            beforeUpload={this.beforeUpload}
            showUploadList={false}
          >
            <div className='uploadImgBtn'>
              {UploadBtn}
            </div>
          </Upload>
          {this.state.dataSource.map(el =>
            <CoverCell
              isAudio
              data={el}
              src='http://wx3.sinaimg.cn/large/006prIg7gy1fx5fzq6zkbj30m80ci1bi.jpg'
              delete={this.deleteAudio} key={el.mediaAudioId}
              // time={`${el.minute}:${el.second}`}
              minute={el.minute < 10 ? `0${el.minute}` : el.minute}
              second={el.second < 10 ? `0${el.second}` : el.second}
              keys={el.mediaAudioId}
              arr={this.state.arr}
              change={this.change}
              checked={this.state.checked}
            >{el}
            </CoverCell>
          )}
        </section>
      </div>
    );
  }
}

export default connect(({myaudio}) => ({
  myaudio
}))(MyAudio);
