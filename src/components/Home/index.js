import React, {Component} from 'react';
import Editor from '../common/editor'

class index extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className='home'>
        <div>welcome!</div>
        <Editor></Editor>
      </div>
    );
  }
}

export default index;
