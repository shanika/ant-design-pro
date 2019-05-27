import React, { PureComponent } from 'react';
import { Button, Dropdown, Icon, Menu, Modal } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import styles from './Workspaces.less';
import showModalForm, { updateModalProgress } from '../../components/ModalForm/ModalForm';
import AddWorkspace from './AddWorkspace';

const { confirm } = Modal;

@connect(({ user : { currentUser : { workspaceResponse, currentWorkspaceId } }, loading }) => ({
  workspaces : workspaceResponse,
  loading : loading.effects['user/addWorkspace'],
  deleting : loading.effects['user/removeWorkspace'],
  switching : loading.effects['user/switchWorkSpace'],
  currentWorkspaceId
}))
class Workspaces extends PureComponent {

  componentDidUpdate(prevProps) {
    updateModalProgress(prevProps, this.props, 'loading', this.addWorkspace);
  }

  componentWillUnmount() {
    if (this.addPerformanceTest) {
      this.addWorkspace.destroy();
    }
  }

  deleteWorkspace = (ws) => {
    const { dispatch } = this.props;
    confirm({
      title: `Are you sure that you want to delete ${ws.name} workspace?`,
      content: 'All the cloud account configurations and test data will be completely removed.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        return dispatch ({
          type: 'user/deleteWorkspace',
          payload : ws.id
        });
      },
      onCancel() {},
    });
  };

  switchWorkspace = (ws) => {
    const { dispatch } = this.props;
    confirm({
      title: `Switch to ${ws.name} workspace?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        return dispatch ({
          type: 'user/switchWorkSpace',
          payload : ws.id
        });
      },
      onCancel() {},
    });
  };

  render() {

    const { workspaces, currentWorkspaceId } = this.props;

    return (
      <div className={styles.workspaces}>
        <div className={styles.title}>WORKSPACES</div>
        { workspaces && workspaces.map( ws => {

            const menu = (
              <Menu>
                <Menu.Item key="0">
                  <Button onClick={() => this.switchWorkspace(ws)} icon="export" type="link" disabled={ws.id === currentWorkspaceId}>{`Switch to ${ws.name}`}</Button>
                </Menu.Item>
                <Menu.Item key="1">
                  <Button className={styles.danger} icon="delete" type="link" onClick={() => this.deleteWorkspace(ws)} disabled={ws.id === currentWorkspaceId || ws.type === 'PERSONAL'}>{`Delete ${ws.name}`}</Button>
                </Menu.Item>
              </Menu>
            );

            const wsClasses = classNames({
              [styles.workspace] : true,
              [styles.active] : ws.id === currentWorkspaceId,
              [styles.inactive] : ws.id !== currentWorkspaceId
            });

            return (
              <div key={ws.id} className={wsClasses}>
                <div className={styles.leftContent}>
                  <div className={styles.iconContainer}><Icon style={{ color: '#fff' }} type="folder" theme="filled" /></div>
                  <div className={styles.titleContainer} onClick={() => ws.id !== currentWorkspaceId && this.switchWorkspace(ws)}>
                    <div>{ws.name}</div>
                    <div className={styles.subTitle}>Shanika Wijerathna</div>
                  </div>
                </div>
                <div className={styles.optionsIcon}>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Icon type="more" style={{ color: '#fff' }} />
                  </Dropdown>
                </div>
              </div>
            );
          }
        )}
        <Button
          icon="plus"
          onClick={() => {
            this.addWorkspace = showModalForm({
              content: AddWorkspace,
              title: 'Create Workspace',
              okText: 'Create',
              onOk: values => {
                const { dispatch } = this.props;
                dispatch({
                  type: 'user/addWorkspace',
                  payload: values
                })
              },
            });
          }}
        >
          Create New Workspace
        </Button>
      </div>
    );
  }
}

Workspaces.propTypes = {};

export default Workspaces;
