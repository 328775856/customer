import React, {Component} from 'react';
import Pagination from '../../components/common/pagination';
import CoverCell from '../../components/common/coverCell';
import './index.less';
import {Radio, message, Upload, Icon} from 'antd';
import {connect} from "dva";
import {defaultPage} from "../../utils/utils";

class Mybooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxFileSize: this.props.maxFileSize ? this.props.maxFileSize : 2,
      dataSource: [],
      arr: [],
      previewVisible: false,
      previewImage: '',
      fileList: [],
      list: [1, 2, 3],
      page: defaultPage(),
      currentPage: 1,
      checked: false
    };
  }

  changeCheck = () => {
    if (this.state.arr.length > 0) {
      this.setState({arr: []});
    } else {
      let arr = [];
      for (let i of this.state.dataSource) {
        arr.push(i.mediaImageId);
      }
      this.setState({arr: arr});
    }
  };
  beforeUpload = (file) => {
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
      type: 'myphotos/getImagePage',
      payload: {
        data: value,
        page: page
      }
    });
  };
  sendImagePath = (filePath, fileName, fileSize) => {
    const {dispatch} = this.props;
    const cb = this.callback;
    dispatch({
      type: 'myphotos/addImage',
      payload: {
        fileName: fileName,
        filePath: filePath,
        fileSize: fileSize
      },
      callback: cb
    });
  };
  callback = (r) => {
    if (r.status == 200) {
      this.refresh();
    }
  };
  deleteImage = (val) => {
    const {dispatch} = this.props;
    const cb = this.callback;
    dispatch({
      type: 'myphotos/deleteImage',
      payload: {
        mediaImageId: val
      },
      callback: cb
    });
  };

  componentDidMount() {
    this.refresh();
  }

  UNSAFE_componentWillReceiveProps(r) {
    this.setState({
      dataSource: r.myphotos.rows,
      pagination: {
        pages: r.myphotos.pages,
        currentPage: this.state.currentPage,
        pageSize: r.myphotos.pageSize
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
  change = (val) => {
    if (this.state.arr.indexOf(val) !== -1) {
      this.state.arr.splice(this.state.arr.indexOf(val), 1);
      this.setState({arr: this.state.arr});
    } else {
      this.setState({arr: this.state.arr.concat(val)});
    }
  };

  render() {
    const props = {
      name: 'file',
      action: process.env.NODE_ENV === 'production' ? '/api/gb_customer/GbCustomer/file/uploadImage' : '/file/uploadImage',
      headers: {
        authorization: sessionStorage.getItem('auth')
      },
      onChange: (info) => {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name}上传成功！`);
          this.sendImagePath(info.file.response.data.fileName, info.file.name, Math.round(info.file.size / 1024 * 10) / 10);
          this.setState({
            fileList: info.fileList
          });
        } else if (info.file.status === 'error') {
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
            <Radio.Group>
              <Radio.Button
                onClick={this.changeCheck}
                value='addAll'
              >全选</Radio.Button>
              <Radio.Button value='delete'>删除</Radio.Button>
            </Radio.Group>
          </div>
          <div className='pagination-wrapper'>
            <Pagination {...propsItem}></Pagination>
          </div>
        </section>
        <section className='flex-r' style={{justifyContent: 'flex-start', minWidth: 1528}}>
          <Upload
            {...props}
            beforeUpload={this.beforeUpload}
            showUploadList={false}
          >
            <div className='uploadImgBtn'>
              <div><span>+</span></div>
            </div>
          </Upload>
          {this.state.dataSource && this.state.dataSource.map(el =>
            <CoverCell
              change={this.change}
              checked={this.state.checked}
              arr={this.state.arr} data={el}
              delete={this.deleteImage}
              src={el.imagePath} key={el.mediaImageId}
              keys={el.mediaImageId}
            ></CoverCell>
          )}
        </section>
      </div>
    );
  }
}

export default connect(({myphotos}) => ({
  myphotos
}))(Mybooks);
