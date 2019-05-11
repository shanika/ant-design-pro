import React, { PureComponent } from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setAccessToken } from '@/utils/Authorized';

@connect(()=>{})
class OAuth2RedirectHandler extends PureComponent {

  render() {

    const params = getPageQuery();
    const { token, error } = params;

    if(token) {
      setAccessToken(token);
      setAuthority('user');
      return <Redirect
        to="/dashboard/analysis"
      />;
    }

    const { dispatch } = this.props;

      dispatch({
        type : 'login/changeLoginStatus',
        payload : {
          status: 'error',
          error,
          currentAuthority: 'guest',
        }
      });

      return <Redirect

        to={{
        to: "/user/login",
      }}
      />;

  }
}

export default OAuth2RedirectHandler;
