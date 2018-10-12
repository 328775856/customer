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
          style={{width: 64, height: 64, borderRadius: '50%'}} src={require('../../assets/images/login_logo.png')}
          alt=""
        />
        <span style={{color: '#fff', fontSize: 18}}>dsfsdf</span>
      </div>
    );
  }
}

export default userInfo;
