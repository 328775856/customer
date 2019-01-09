import React, {Component} from 'react';
import {connect} from 'dva';
import Masonry from 'react-masonry-component';
import './index.less';
import {formatTime} from '../../utils/utils';
import {Modal} from "antd";

@connect(({mynote}) => ({mynote}))
class noteView extends Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'mynote/getBookReadNotes',
      payload: {
        bookUserId: this.props.match.params.bookUserId
      }
    });
  }

  handleImagesLoaded(imagesLoadedInstance) {
  }

  removeNote = (element) => {
    const cb = this.callback;
    const {dispatch} = this.props;
    Modal.confirm({
      title: '确认删除吗？',
      onOk() {
        dispatch({
          type: 'mynote/deleteBookReadNotes',
          payload: {
            bookReadnoteId: element
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
      type: 'mynote/getBookReadNotes',
      payload: {
        bookUserId: this.props.match.params.bookUserId
      }
    });
  };
  render() {
    // console.log(this.props.location.query.bookUserId)
    const childElements = this.props.mynote.noteList.map((element, index) =>
      <div key={index} className="image-element-class">
        <div className='title'>
          <div className="bookName">{element.bookName}</div>
          <div className="createTime">{formatTime(element.createTime)}</div>
          <div className="iconfont icon-ic_delete"  onClick={() => this.removeNote(element.bookReadnoteId)}></div>
        </div>
        <div className='bookContent'>{element.annotation}</div>
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

export default noteView;
