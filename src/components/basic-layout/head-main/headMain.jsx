import React, {Component} from 'react';
import {Button,Modal} from "antd";
import screenfull from 'screenfull';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {removeUserSuccess} from '../../../redux/action-creators/user';
import {removeItem} from '../../../utils/storage';
import {withRouter} from 'react-router-dom';
import menus from '../../../config/menu';

@withRouter
@connect(
  (state) =>({username: state.user.user.username}),
  {removeUserSuccess}
)
@withTranslation()
class HeadMain extends Component {

  state = {
    isScreenfull: false,
    isEnglish: this.props.i18n.language === 'en' ? true : false,
    title: '',
  };

  toggleScreen = () =>{
    screenfull.toggle();
  };

  logoOut = () =>{
    Modal.confirm({
      title: '你想要退出登录吗！',
      onOk: () =>{
        // 清空用户数据
        removeItem('user');
        this.props.removeUserSuccess();
        //跳转到login 页面
        this.props.history.replace('/login');
      },
    });
  };

  change = () =>{
    this.setState({
      isScreenfull: !this.state.isScreenfull
    })
  };

  changLang = () =>{
    const isEnglish = !this.state.isEnglish;
    this.setState({
      isEnglish
    });
    this.props.i18n.changeLanguage(isEnglish ? 'en':'zh');
  };

  componentDidMount() {
    screenfull.on('change', this.change);
  }

  componentWillUnmount() {
    screenfull.off('change',this.change);
  }

  static getDerivedStateFromProps(nextProps, prevState){

  }


  render() {
    const {isScreenfull,isEnglish} = this.state;
    const {username} = this.props;
    console.log(username);
    return (
      <div>
        <div className={'head-top'}>
          <Button size={"small"} icon={isScreenfull? 'fullscreen-exit':'fullscreen'} onClick={this.toggleScreen}/>
          <span>欢迎您,{username}</span>
          <Button size={"small"} onClick={this.changLang}>{isEnglish ? '中文':'英文'}</Button>
          <Button type={"link"} onClick={this.logoOut}>退出登录</Button>
        </div>
        <div className={'head-bottom'}>
          <h3></h3>
          <span>时间</span>
        </div>
      </div>
    );
  }
}

export default HeadMain;