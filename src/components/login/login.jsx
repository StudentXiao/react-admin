import React, {Component} from 'react';
import { Form, Icon, Input, Button,message} from 'antd';
import axios from 'axios';
import logo from './logo.png';
import './login.less';


class Login extends Component {
  /*
  自定义效验规则
  * */
  validator = (rule, value, callback) =>{
    // console.log(rule);
    // console.log(value);
    // console.log(callback('12'));
    const name = rule.field === 'username'? '用户名':'密码';
    if (!value) {
      callback(`请输入${name}`)
    }else if (value.length < 4) {
      callback(`${name}长度至少大于4位`)
    }else if (value.length > 13) {
      callback(`${name}长度不能超过于13位`)
    }else if (!/\w/.test(value)) {
      callback(`${name}只能包含数字字母下划线`)
    }else {
      callback();
    }
  };

  /*
  * 登录
  * */
  login = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(err);
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post("http://localhost:5000/api/login",values)
          .then((response) =>{
            console.log(response);
            if (response.data.status === 0) {
              // 登录成功
              this.props.history.push('/');
            }else {
              message.error(response.data.msg);
              this.props.form.resetFields(['password'])
            }
          })
          .catch((err) =>{
            console.log(err);
          })
      }

    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'content'}>
        <div className={'head'}>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台管理</h1>
        </div>
        <section className={'section'}>
          <h3>登录</h3>
          <Form onSubmit={this.login} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username',{
                  //rules:[{required: true,message:'Please input your username!'}]
                  rules:[{
                    validator: this.validator
                  }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules: [
                    {validator: this.validator}
                    ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="login-form-button" htmlType={'submit'}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default Form.create()(Login);