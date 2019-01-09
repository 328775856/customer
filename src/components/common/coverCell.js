import React, {Component} from 'react';
import {Icon, Checkbox} from 'antd';

class coverCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log(this.props.arr);
    return (
      <div className='coverCell' onClick={()=>this.props.change(this.props.keys)}>
        <Checkbox
          className={this.props.arr.indexOf(this.props.keys) !== -1 ? 'checkbox' : 'hide'}
          checked={this.props.arr.indexOf(this.props.keys) !== -1}
        />
        <img src={this.props.src} alt="" />
        <div className={this.props.arr.indexOf(this.props.keys) !== -1 ? 'hide' : ''}>
          <Icon
            className='closeBtn' type="close-circle"
            onClick={() => this.props.data.mediaImageId ? this.props.delete(this.props.data.mediaImageId) : this.props.delete(this.props.data.mediaAudioId)}
          />
          <div className="imgCover">
            <div
              className="imgCover"
            >{this.props.isAudio ? this.props.minute + ' : ' + this.props.second : this.props.data.imageName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default coverCell;
