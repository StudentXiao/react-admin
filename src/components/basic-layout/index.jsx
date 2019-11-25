import React from 'react';
import { Layout, Breadcrumb} from 'antd';
import chaekLogin from '../../containers/with-check-login/checkLogin';
import LeftNav from './left-nav/left-nav';
import HeadMain from './head-main/headMain';
const { Header, Content, Footer, Sider } = Layout;

@chaekLogin
class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <LeftNav />
        </Sider>
        <Layout>
            <Header style={{ background: '#fff', padding: 0 }} >
                <HeadMain />
            </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
       </Layout>
    );
  }
}

export default BasicLayout;