import React from 'react';
import {Menu, Icon} from 'antd';
import logo from '../../../asset/logo.png';
import './index.less';
import { Link, withRouter} from "react-router-dom";
import menu from '../../../config/menu';
const { SubMenu } = Menu;


@withRouter
class LeftNav extends React.Component {
  state = {
    menus: [],
  };

  createMenus = (menus,index) =>{
    return menus.map((menu) =>{
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {
              menu.children.map((cMenu) => this.createCMenus(cMenu))
            }
          </SubMenu>
        )
      }else {
        return (
          this.createCMenus(menu)
        )
      }
    })
  };

  createCMenus = (menu) =>{
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    )
  };

  componentDidMount() {
    this.setState({
      menus: this.createMenus(menu)
    })
  }

  render() {
    return (
      <div>
        <div className="logo" >
          <img src={logo} alt="logo"/>
          <h2>硅谷后台管理</h2>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['user']}
          mode="inline">
          {this.state.menus}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;