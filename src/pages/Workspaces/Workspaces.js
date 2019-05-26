import React, { PureComponent } from 'react';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import styles from './Workspaces.less';

@connect(({ user : { currentUser : { workspaceResponse } } }) => ({
  workspaces : workspaceResponse
}))
class Workspaces extends PureComponent {
  render() {

    const { workspaces } = this.props;

    return (
      <div className={styles.workspaces}>
        <div className={styles.title}>WORKSPACES</div>
        { workspaces && workspaces.map( ws =>
          <div className={styles.workspace}>
            <div className={styles.leftContent}>
              <div className={styles.iconContainer}><Icon style={{color: '#fff'}} type="folder" theme="filled" /></div>
              <div className={styles.titleContainer}>
                <div>{ws.name}</div>
                <div className={styles.subTitle}>Shanika Wijerathna</div>
              </div>
            </div>
            <div className={styles.optionsIcon}><Icon type="more" style={{color: '#fff'}} /></div>
          </div>
        )}
        <Button
          icon="plus"
        >
          Create New Workspace
        </Button>
      </div>
    );
  }
}

Workspaces.propTypes = {};

export default Workspaces;
