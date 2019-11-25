import React from 'react';
import {Menu, Icon} from 'antd';
import logo from '../../../asset/logo.png';
import './index.less';
import { Link, withRouter} from "react-router-dom";
import menu from '../../../config/menu';
import {withTranslation} from "react-i18next";
const { SubMenu } = Menu;

@withTranslation()
@withRouter
class LeftNav extends React.Component {
  state = {
    menus: [],
  };

  createMenus = (menus) =>{
    const {t} = this.props;
    return menus.map((menu) =>{
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{t("layout.leftNav." + menu.title)}</span>
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
    const {t} = this.props;
    return (
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{t("layout.leftNav."+ menu.title)}</span>
        </Link>
      </Menu.Item>
    )
  };

  findOpenKey = (menus, pathname) =>{
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const cMenu = menu.children.find((cMenu) => cMenu.path === pathname);
        if (cMenu) {
          return menu.path;
        }
      }
    }
  };

  // componentDidMount() {
  //   this.setState({
  //     menus: this.createMenus(menu)
  //   })
  // }

  render() {
    const {t} = this.props;
    const { pathname } = this.props.location;
    const openKey = this.findOpenKey(menu, pathname);

    const menusList = this.createMenus(menu);
    return (
      <div>
        <div className="logo" >
          <img src={logo} alt="logo"/>
          <h2>{t("layout.leftNav.title")}</h2>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline">
          {menusList}
        </Menu>
      </div>
    );
  }
}

export default LeftNav;