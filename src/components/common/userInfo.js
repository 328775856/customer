import React, {Component} from 'react';

class userInfo extends Component {
  render() {
    return (
      <div style={{
        height: 128,
        background: 'RGBA(108, 119, 128, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <img
          style={{width: 64, height: 64, borderRadius: '50%'}}
          src={this.props.avatar ? this.props.avatar : require('../../assets/avatar.jpg')}
          alt="avatar"
        />
        <span style={{color: '#fff', fontSize: 18}}>{this.props.nickname ? this.props.nickname : 'guest'}</span>
      </div>
    );
  }
}

export default userInfo;
