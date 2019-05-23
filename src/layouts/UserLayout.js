import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Button, Layout, Menu, Row, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import getPageTitle from '@/utils/getPageTitle';

const { Header, Content } = Layout;

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 www.kandula.io
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
    } = this.props;
    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <Layout className={styles.container}>
          <Header className={styles.header}>
            <div className={styles.logo} id="logo">
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <h1>Kandula</h1>
              </Link>
            </div>
            <Menu mode="horizontal" style={{ lineHeight: '64px', fontSize: 16 }}>
              <Menu.Item key="resources">Blog</Menu.Item>
              <Menu.Item key="login">Login</Menu.Item>
              <Menu.Item><Button type="primary">Sign up</Button></Menu.Item>
            </Menu>
          </Header>
          <Content className={styles.content}>
            <div className={styles.top}>
              <div className={styles.desc}>
                <span style={{ fontSize: 20 }}>Sign up and start running tests!</span>
              </div>
            </div>
            {children}
          </Content>
          <GlobalFooter links={links} copyright={copyright} />
        </Layout>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout);
