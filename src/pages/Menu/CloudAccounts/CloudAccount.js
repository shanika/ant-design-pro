import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { message, Row, Col, Spin, Icon } from 'antd';
import FileUpload from './FileUpload';
import { getAuthHeader } from '../../../utils/request';


@connect(({ cloudAccounts : { account }, loading}) => ({
  account,
  loading : loading.effects['cloudAccounts/fetchOne'],
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

    return (
      <PageHeaderWrapper
        onBack={() => router.push("/menu/cloudAccounts")}
        title={account && account.name}
      >
        <Row>
          <Col sm={24} md={12}>
            <Spin spinning={uploading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
              <FileUpload
                title="Upload Service Account Key File"
                name="file"
                multiple={false}
                accept=".json"
                action={`http://localhost:8080/api/workspaces/1/cloudAccounts/${match.params.id}/serviceAccFile`}
                onChange={this.onFileUploadChange}
                headers={getAuthHeader()}
                showUploadList={false}
                beforeUpload={() => this.setState({ uploading : true })}
                fileName={account && account.serviceAccKeyFile}
              />
            </Spin>
          </Col>
          <Col sm={24} md={12}>
            <div>Project ID {account && account.projectId}</div>

            <div>Api Enabled {(account && account.apiEnabled) ? 'Yes' : 'No'}</div>
            <div>Compute Engine Access {(account && account.accessGranted) ? 'Yes' : 'No'}</div>
            <div>Billing Enabled {(account && account.billingEnabled) ? 'Yes' : 'No'}</div>
            <div>TCP Enabled/ Firewall Rule Exists {(account && account.portReachable) ? 'Yes' : 'No'}</div>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default CloudAccount;
