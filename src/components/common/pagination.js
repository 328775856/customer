import React, {Component} from 'react';
import {Button, Icon} from 'antd';

class pagination extends Component {
  render() {
    return (
      <div className='pagination'>
        <Button.Group size=''>
          <Button>
            <Icon type="left"/>
          </Button>
          <Button>
            <Icon type="right"/>
          </Button>
          <Button>
            第一页<Icon type="left"/>
          </Button>

        </Button.Group>
      </div>
    );
  }
}

export default pagination;
