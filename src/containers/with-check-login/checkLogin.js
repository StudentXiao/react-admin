/*
* 检查登录模块
* */
import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const checkLogin = (WrappedComponent) =>{
  return connect(
    (state) =>({token: state.user.token}),
    null
  )(
    class extends  React.Component{

      render() {
        const {location,token,...rest} = this.props;
        if (location.pathname === '/login') {
          if (token) {
            return <Redirect to={'/'}/>;
          }
        }else{
          if (!token) {
            return <Redirect to={'/login'}/>;
          }
        }

        return <WrappedComponent location={location} {...rest}/>
      }
    }
  )
};

export default checkLogin;