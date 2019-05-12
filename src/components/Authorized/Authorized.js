import { Component } from 'react';
import { connect } from 'dva';
import CheckPermissions from './CheckPermissions';

@connect(({ login : { authority } }) => ({
  currentAuthority : authority
}))
class Authorized extends Component {
  render() {
    const { children, authority, noMatch, currentAuthority } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch, currentAuthority);
  }
}

Authorized.defaultProps = { noMatch: null }

export default Authorized;
