import React, {Component} from 'react'
import Login from '../routes/Login/login'
import styles from './index.less'

class LoginPage extends Component {
  render() {
    return(
      <div className={styles.loginPage}>
        <Login></Login>
      </div>
    )
  }
}

export default LoginPage
