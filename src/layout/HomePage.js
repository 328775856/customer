import React, {Component} from 'react';
import {connect} from 'dva';
import {Layout, Menu, Breadcrumb, Button} from 'antd';
import {Route, Link, routerRedux} from 'dva/router';
//css module
import styles from './index.less';

//组件
import UserInfo from '../components/common/userInfo';
import Table from '../components/common/table';
import SearchInput from '../components/common/searchInput';
//路由映射
import RouterName from './Router_name';

const {SubMenu} = Menu;
const {Sider, Header, Content} = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'login/getUserInfo'
    });
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      url: RouterName[this.props.history.location.pathname]
    });
  }
  UNSAFE_componentWillMount(){
    const {dispatch} = this.props;
    if (!sessionStorage.getItem('auth')) {
      dispatch(routerRedux.push('/'));
    }
  }
  loginOut=()=>{
    sessionStorage.removeItem('auth')
    this.props.dispatch(routerRedux.push('/'))
  }
  render() {
    const {userName} = this.props.login.userInfo || '';
    return (
      <Layout className={styles.homePage}>
        <Header className={styles.header}>
          <div className={styles.logo}></div>
          <div>
            <p>藏书馆</p>
            <p>给你知识的力量</p>
          </div>
          <div className={styles.userInfo}>
            <Link to='/home'>首页</Link>
            <Button className={styles.personalCenter}>个人中心</Button>
            <span className={styles.userName}>{userName}</span>
            <a className={styles.loignOut} onClick={this.loginOut}>退出</a>
          </div>
        </Header>
        <Layout>
          <Sider className='siderBar' width={200} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              defaultOpenKeys={['libraries']}
              defaultSelectedKeys={['libraries-books']}
              style={{height: '100%', borderRight: 0, color: 'RGBA(31, 207, 185, 1)'}}
            >
              <UserInfo></UserInfo>
              <SubMenu key="libraries" title={<span><i className='iconfont icon-ic_wodeYunshuguan_de'></i>我的云书馆</span>}>
                <Menu.Item key="libraries-books">
                  <Link to="/home/books">我的图书</Link>
                </Menu.Item>
                <Menu.Item key="libraries-grouping">我的分组</Menu.Item>
              </SubMenu>
              <SubMenu key="borrow" title={<span><i className='iconfont icon-ic_wodejieyue_defaul'></i>我的借阅</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <Menu.Item key="note">
                <i className='iconfont icon-ic_wodebiji_default'></i>
                <span>我的笔记</span>
              </Menu.Item>
              <Menu.Item key="record">
                <i className='iconfont icon-ic_wodedangan_defaul'></i>
                <span>我的档案</span>
              </Menu.Item>
              <Menu.Item key="datum">
                <i className='iconfont icon-ic_wodeziliao_defaul'></i>
                <span>我的资料</span>
              </Menu.Item>
              <SubMenu key="contribute" title={<span><i className='iconfont icon-ic_wodetougao_defaul'></i>我的投稿</span>}>
                <Menu.Item key="12">option5</Menu.Item>
                <Menu.Item key="13">option6</Menu.Item>
                <Menu.Item key="14">option7</Menu.Item>
                <Menu.Item key="15">option8</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>{this.state.url}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
              <SearchInput></SearchInput>
              <Route path='/home/books' component={Table}/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({login}) => ({
  login
}))(HomePage);
