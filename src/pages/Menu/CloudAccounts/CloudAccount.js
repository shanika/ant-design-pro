import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Button, Card, Col, Icon, message, Row, Spin, Tag } from 'antd';
import FileUpload from './FileUpload';
import { getAuthHeader } from '../../../utils/request';
import LearnHow from '../../../components/LearnHow';
import styles from './CloudAccount.less';
import StatusBadge from '../../../components/StatusBadge';

@connect(({ cloudAccounts : { account }, loading}) => ({
  account,
  loading : loading.effects['cloudAccounts/fetchOne'],
  updating : loading.effects['cloudAccounts/refresh']
}))
class CloudAccount extends PureComponent {

  state = { uploading : false };

  componentWillMount() {
    const {dispatch, match : {params  : {id}}} = this.props;
    dispatch({
      type : 'cloudAccounts/fetchOne',
      payload : id
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type : 'cloudAccounts/unsetOne',
    });
  }

  extra = () => {
    const { dispatch, match, updating } = this.props;
    return (
      <Button
        icon="sync"
        type="primary"
        loading={updating}
        onClick={() => {
          dispatch({
            type: 'cloudAccounts/refresh',
            payload: match.params.id,
          });
        }}
      >
        Refresh
      </Button>
    );
  };

  onFileUploadChange = (info) => {
    const {dispatch} = this.props;
    const {status, response} = info.file;

    if (status === 'done') {
      dispatch({
        type : 'cloudAccounts/setAccount',
        payload : response
      });
      this.setState({ uploading : false});
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.setState({ uploading : false});
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const {account, match} = this.props;
    const {uploading} = this.state;

    const tags = account && <StatusBadge type={ account.complete? 'success' : 'danger' } text={account.complete? 'Complete' : 'Incomplete' } />;

    return (
      <PageHeaderWrapper
        onBack={() => router.push("/menu/cloudAccounts")}
        hiddenBreadcrumb
        title={account && account.name}
        extra={this.extra()}
        tags={tags}
      >
        <div className="learn-how-enabled">
          <Card bordered={false} className={styles.noBottomMargin}>
            <Row gutter={24}>
              <Col span={24}>
                <p className={styles['help-text']}>
              Please create a service account in your Google Cloud project with{' '}
                  <b>Compute Instance Admin (v1)</b> AIM role permission granted. Then upload the Service
              Account Key file in JSON format. Kandula will use the service account to create JMeter
              nodes on demand and terminate them once test completed.
                </p>
              </Col>
            </Row>
          </Card>
          <Card bordered={false} className={styles.techInfo}>
            <Row gutter={32}>
              <Col sm={24} md={12} className={styles.upload}>
                <Spin spinning={uploading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                  <FileUpload
                    className={styles['file-upload']}
                    title="Upload Service Account Key File"
                    name="file"
                    multiple={false}
                    accept=".json"
                    action={`/api/workspaces/1/cloudAccounts/${match.params.id}/serviceAccFile`}
                    onChange={this.onFileUploadChange}
                    headers={getAuthHeader()}
                    showUploadList={false}
                    beforeUpload={() => this.setState({ uploading : true })}
                    fileName={account && account.serviceAccKeyFile}
                  />
                </Spin>
              </Col>
              <Col sm={24} md={12}>
                <Row>
                  <Col span={12}> Project Id : </Col> <Col span={12}> {account && account.projectId} </Col>
                </Row>
                <Row>
                  <Col span={24}> <h5>Attributes That Needs To Be Enabled</h5> </Col>
                </Row>
                <Row>
                  <Col span={12}> Api Enabled : </Col> <Col span={12}> {(account && account.apiEnabled) ? 'Yes' : 'No'} </Col>
                </Row>
                <Row>
                  <Col span={12}> Compute Engine Access : </Col> <Col span={12}> {(account && account.accessGranted) ? 'Yes' : 'No'} </Col>
                </Row>
                <Row>
                  <Col span={12}> Billing Enabled : </Col> <Col span={12}> {(account && account.billingEnabled) ? 'Yes' : 'No'} </Col>
                </Row>
                <Row>
                  <Col span={12}> TCP Enabled/ Firewall Rule Exists : </Col> <Col span={12}> {(account && account.portReachable) ? 'Yes' : 'No'} </Col>
                </Row>
                <LearnHow text="Learn how to enable these attribues?" />
              </Col>
            </Row>
          </Card>
        </div>
        <LearnHow
          title="Learn how to CREATE and CONFIGURE NEW CLOUD ACCOUNT?"
          text="A complete guide to setup new cloud account and configure it..."
        />
      </PageHeaderWrapper>
    );
  }
}

export default CloudAccount;
