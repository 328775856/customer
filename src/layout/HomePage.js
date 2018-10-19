import React, {Component} from 'react';
import {connect} from 'dva';
import {Layout, Menu, Breadcrumb, Button} from 'antd';
import {Route, Link, routerRedux, Switch} from 'dva/router';
//css module
import styles from './index.less';

//common组件
import UserInfo from '../components/common/userInfo';
//主页
import Home from '../components/Home';
//我的书馆>我的图书
import MybooksIndex from '../components/Mybooks';
import UploadBooks from '../components/Mybooks/UploadBooks';
//我的书馆>我的分组
import MygroupingIndex from '../components/MyGrouping';
//我的借阅
import MyBorrow from '../components/MyBorrow';
//我的笔记
import MyNote from '../components/MyNote';
//我的档案
import MyRecord from '../components/MyRecord';
//我的资料
import MyDatum from '../components/MyDatum';
//我的投稿>我的投稿
import MyContribute from '../components/MyContribute';
//我的投稿>我的投稿>新建投稿
import CreateNew from '../components/MyContribute/CreateNew';
//我的投稿>收入统计
import MyIncome from '../components/MyContribute/MyIncome';
//我的投稿>我的素材图片
import MyPhotos from '../components/MyContribute/MyPhotos';
//我的投稿>我的素材录音
import MyAudio from '../components/MyContribute/MyAudio';
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
    if(this.props.history.location.pathname === '/home/libraries/books/uploadBooks'){
      document.getElementsByClassName('content')[0].className = 'content contribute ant-layout-content';
    }else{

    }
    if (this.props.history.location.pathname === '/home/libraries/books/uploadBooks') {
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
                <Menu.Item key="myBooks">
                  <Link to="/home/libraries/books">我的图书</Link>
                </Menu.Item>
                <Menu.Item key="myGrouping">
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
                <Link to="/home/note">
                  <i className='iconfont icon-ic_wodebiji_default'></i>
                  我的笔记
                </Link>
              </Menu.Item>
              <Menu.Item key="record">
                <Link to="/home/record">
                  <i className='iconfont icon-ic_wodedangan_defaul'></i>
                  我的档案
                </Link>
              </Menu.Item>
              <Menu.Item key="datum">
                <Link to="/home/datum">
                  <i className='iconfont icon-ic_wodeziliao_defaul'></i>
                  我的资料
                </Link>
              </Menu.Item>
              <SubMenu key="contribute" title={<span><i className='iconfont icon-ic_wodetougao_defaul'></i>我的投稿</span>}>
                <Menu.Item key="myContribute">
                  <Link to="/home/contribute">我的投稿</Link>
                </Menu.Item>
                <Menu.Item key="income">
                  <Link to="/home/contribute/income">收入统计</Link>
                </Menu.Item>
                <Menu.Item key="myPhotos">
                  <Link to="/home/contribute/photos">我的素材图片</Link>
                </Menu.Item>
                <Menu.Item key="myAudio">
                  <Link to="/home/contribute/audio">我的素材录音</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>{this.state.url}</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className={this.state.isTips ? '' : 'content'}
              style={{background: '#fff', padding: 40, paddingBottom: 0, margin: 0, minHeight: 280}}
            >
              <Switch>
                {/*主页*/}
                <Route path='/home' exact component={Home}/>
                {/*我的云书馆*/}
                <Route path='/home/libraries/books' exact component={MybooksIndex}/>
                <Route path='/home/libraries/books/uploadBooks' component={UploadBooks}/>
                <Route path='/home/libraries/grouping' component={MygroupingIndex}/>
                {/*我的借阅*/}
                <Route path='/home/borrow' component={MyBorrow}/>
                {/*我的笔记*/}
                <Route path='/home/note' component={MyNote}/>
                {/*我的档案*/}
                <Route path='/home/record' component={MyRecord}/>
                {/*我的资料*/}
                <Route path='/home/datum' component={MyDatum}/>
                {/*我的投稿*/}
                <Route path='/home/contribute' exact component={MyContribute}/>
                <Route path='/home/contribute/createNew' exact component={CreateNew}/>
                <Route path='/home/contribute/income' component={MyIncome}/>
                <Route path='/home/contribute/photos' component={MyPhotos}/>
                <Route path='/home/contribute/audio' component={MyAudio}/>
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
