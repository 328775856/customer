import React, {Component} from 'react';
import {connect} from 'dva';
import Masonry from 'react-masonry-component';
import {formatTime} from '../../utils/utils';
import {Modal} from "antd";

@connect(({myRecord}) => ({myRecord}))
class recordView extends Component {
  state={
    recordList:[]
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'myRecord/bookReaddocGroup',
      payload: {
        bookReaddocGroupId: this.props.match.params.bookReaddocGroupId
      },
      callback:this.callback
    });
  }
  callback=(res)=>{
    if(res.status ===200){
      this.setState({recordList:res.data.rows})
    }
  }

  removeRecord = (element)=>{
    const cb = this.callback;
    const {dispatch} = this.props;
    Modal.confirm({
      title: '确认删除吗？',
      onOk() {
        dispatch({
          type: 'myRecord/deleteBookReaddoc',
          payload: {
            bookReaddocId: element
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

  refresh = () => {
    this.props.dispatch({
      type: 'myRecord/bookReaddocGroup',
      payload: {
        bookReaddocGroupId: this.props.match.params.bookReaddocGroupId
      }
    });
  };
  render() {
    // console.log(this.state.recordList)
    const childElements = this.state.recordList.map((element, index) =>
      <div key={index} className="image-element-class">
        <div className='title'>
          <div className="bookName">{element.bookName}</div>
          <div className="createTime">{formatTime(element.createTime)}</div>
          <div className="bookAuthor">{element.bookAuthor}</div>
          <div className="iconfont icon-ic_delete" onClick={() => this.removeRecord(element.bookReaddocId)}></div>
        </div>
        {/*<div>{element.annotation}</div>*/}
        <div className="bookContent">{element.bookContent}</div>
      </div>
    );
    return (
      <div>
        <Masonry
          ref={ref => this.masonryRef = ref}
          className="masonry flex-r"
          elementType="div"
          options={{transitionDuration: 0, fitWidth: true}}
          onImagesLoaded={this.handleImagesLoaded}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {childElements}
        </Masonry>
      </div>
    );
  }
}
export default recordView;
