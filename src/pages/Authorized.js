import React, { Component } from 'react';
import Redirect from 'umi/redirect';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import Exception403 from '@/pages/Exception/403';

@connect(({ menu: menuModel, login : { authority } }) => ({
  routerData: menuModel.routerData,
  authority
}))
class AuthComponent extends Component {

  componentWillMount() {
    const { authority, dispatch} = this.props;
    if (authority === undefined) {
      dispatch({
        type : 'login/fetchAuthority'
      });
    }
  }

  getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach(route => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = this.getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };

  render() {

    const { children, location, routerData, authority } = this.props;

    if (authority) {
      const isLogin = authority[0] !== 'guest';
      return (
        <Authorized
          authority={this.getRouteAuthority(location.pathname, routerData)}
          noMatch={isLogin ? <Exception403 /> : <Redirect to="/user/login" />}
        >
          {children}
        </Authorized>
      );
    }

    return <div />
  }
}

export default (AuthComponent);
