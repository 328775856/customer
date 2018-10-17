import React, {Component} from 'react';
import {connect} from 'dva';
import {Layout, Menu, Breadcrumb, Button} from 'antd';
import {Route, Link, routerRedux, Switch} from 'dva/router';
//css module
import styles from './index.less';

//common组件
import UserInfo from '../components/common/userInfo';
//我的书馆>我的图书
import MybooksIndex from '../components/Mybooks/Index';
import UploadBooks from '../components/Mybooks/UploadBooks';
//我的书馆>我的分组
import MygroupingIndex from '../components/MyGrouping/Index';
//我的借阅
import MyBorrow from '../components/MyBorrow/Index';
//路由映射
import {BreadcrumbJosn, subMenuDefalutJson, keyDefalutJson} from './Router_name';

const {SubMenu} = Menu;
const {Sider, Header, Content} = Layout;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      openKey: this.getdefaultOpenKeys(),
      selectKey: this.getdefaultSelectedKeys(),
      isTips: false
    };
  }

  componentDidMount() {
    // const {dispatch} = this.props;
  }

  UNSAFE_componentWillReceiveProps() {
    if (this.props.history.location.pathname === '/home/libraries/uploadBooks') {
      this.setState({isTips: true});
    } else {
      this.setState({isTips: false});
    }
    this.setState({
      url: BreadcrumbJosn[this.props.history.location.pathname]
    });
  }

  UNSAFE_componentWillMount() {
    // console.log(this.props.history.location.pathname)
    const {dispatch} = this.props;
    if (!sessionStorage.getItem('auth')) {
      dispatch(routerRedux.push('/'));
    } else {
      dispatch({
        type: 'login/getUserInfo'
      });
    }
  }

  loginOut = () => {
    sessionStorage.removeItem('auth');
    this.props.dispatch(routerRedux.push('/'));
  };
  getdefaultOpenKeys = () => [keyDefalutJson[`${this.props.history.location.pathname}`]];
  getdefaultSelectedKeys = () => [subMenuDefalutJson[`${this.props.history.location.pathname}`]];

  render() {
    // console.log(this.state.isTips,'1')
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
            <span className={styles.userName}>{userName ? userName : 'guest'}</span>
            <a className={styles.loignOut} onClick={this.loginOut}>退出</a>
          </div>
        </Header>
        <Layout>
          <Sider className='siderBar' width={200} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              defaultOpenKeys={this.state.openKey}
              defaultSelectedKeys={this.state.selectKey}
              style={{height: '100%', borderRight: 0, color: 'RGBA(31, 207, 185, 1)'}}
            >
              <UserInfo></UserInfo>
              <SubMenu key="libraries" title={<span><i className='iconfont icon-ic_wodeYunshuguan_de'></i>我的云书馆</span>}>
                <Menu.Item key="libraries-books">
                  <Link to="/home/libraries/books">我的图书</Link>
                </Menu.Item>
                <Menu.Item key="libraries-grouping">
                  <Link to="/home/libraries/grouping">我的分组</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="borrow">
                <Link to="/home/borrow">
                  <i className='iconfont icon-ic_wodejieyue_defaul'></i>
                  我的借阅
                </Link>
              </Menu.Item>
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
            <Content
              className={this.state.isTips ? '' : 'content'}
              style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}
            >
              <Switch>
                <Route path='/home/libraries/books' exact component={MybooksIndex}/>
                <Route path='/home/libraries/uploadBooks' component={UploadBooks}/>
                <Route path='/home/libraries/grouping' component={MygroupingIndex}/>
                <Route path='/home/borrow' component={MyBorrow}/>
              </Switch>
            </Content>
            <div className={this.state.isTips ? 'tips' : 'hide'}>
              <h4>提示：</h4>
              <p>1.支持上传格式：epub、txt、pdf</p>
              <p>2.每次可上传≤20本图书，每本图书≤30MB</p>
              <p>3.上传涉及侵权内容的图书将会被默认设置为私藏，并且无法公开</p>
              <p>4.严禁上传含有淫秽色情及低俗信息等图书</p>
            </div>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({login}) => ({
  login
}))(HomePage);
