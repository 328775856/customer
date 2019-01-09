import React, {Component} from 'react';
import {Button, Icon, Select} from 'antd';
import './index.less';

const Option = Select.Option;
let arr = [1];

class pagination extends Component {
  state = {
    page: {},
    currentPage: this.props.currentPage
  };

  componentDidMount() {
    this.setState({page: this.props.page});
  }

  componentWillReceiveProps(r) {
    this.setState({page: r.page, currentPage: r.currentPage});
    arr = [1];
    for (let i = 2; i < r.page.pages + 1; i++) {
      arr.push(i);
    }
  }

  render() {
    const {changePage} = this.props;
    return (
      <div className='pagination'>
        <Button.Group size=''>
          <Button disabled={this.state.currentPage < 2} onClick={() => changePage(this.state.currentPage - 1)}>
            <Icon type="left" />
          </Button>
          <Button
            disabled={this.state.page && this.state.currentPage === this.state.page.pages}
            onClick={() => changePage(this.state.currentPage + 1)}
          >
            <Icon type="right" />
          </Button>
          <Select
            onChange={(val) => changePage(parseInt(val))}
            value={this.state.currentPage}
            style={{width: 120, height: 48, lineHeight: 48}}
          >
            {arr.map((item, index) =>
              <Option style={{height: 48, lineHeight: '48px', fontSize: '18px'}} key={index} value={item}>
                第{item}页
              </Option>
            )}
          </Select>
        </Button.Group>
      </div>
    );
  }
}

export default pagination;
