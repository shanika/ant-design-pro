import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import { Button, Col, Icon, List, Row, Spin } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import Configure from './TestConfigurations';
import graphsLogo from '../../../assets/graphs.svg';
import LearnHow from '../../../components/LearnHow';
import styles from './PerformanceTest.less';
import ElapsedTime from './ElapsedTime';
import ExecutionBar from './ExecutionBar';
import { getStatusIndex, getStatusLabel } from '../../../utils/TestStatusUtil';

@connect(({ performanceTests : { performanceTest, executions }, loading}) => ({
  performanceTest,
  executions,
  loading : loading.effects['performanceTests/fetchOne'],
  loadingExecutions : loading.effects['performanceTests/fetchExecutions'],
}))
class PerformanceTest extends PureComponent {

  componentWillMount() {
    const {dispatch, match : {params  : {id}}} = this.props;
    dispatch({
      type : 'performanceTests/fetchOne',
      payload : id
    });
    dispatch({
      type : 'performanceTests/fetchExecutions',
      payload : id
    });
    dispatch({
      type : 'performanceTests/setShowConfig',
      payload: false
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type : 'performanceTests/unsetOne'
    });
    dispatch({
      type : 'performanceTests/clearExecutions'
    });

  }

  extra = () => {
    const { dispatch, performanceTest} = this.props;
    return (
      <div>
        <Button
          icon="setting"
          onClick={() => {
            dispatch({
              type : 'performanceTests/setShowConfig',
              payload: true
            });
          }}
        >
          Configure
        </Button>
        {
          performanceTest && performanceTest.configComplete &&
          <Button
            type="primary"
            icon="caret-right"
            onClick={() => {
              dispatch({
                type : 'performanceTests/runTest',
                payload: performanceTest.id
              });
            }}
          >
            Run
          </Button>
        }
      </div>
    );
  };

  render() {

    const {performanceTest, executions, loadingExecutions} = this.props;

    return (
      <PageHeaderWrapper
        onBack={() => router.goBack()}
        hiddenBreadcrumb
        title={performanceTest && performanceTest.name}
        extra={this.extra()}
      >
        <Configure />
        <List
          className={classNames("learn-how-enabled", styles.executions)}
          itemLayout="horizontal"
          dataSource={executions}
          loading={loadingExecutions}
          renderItem={item => (
            <List.Item>
              <div className={styles.container}>
                <List.Item.Meta
                  avatar={<Spin spinning={getStatusIndex(item.status) !== 5}><img src={graphsLogo} className="graphs-icon" alt="icon" /></Spin>}
                  title={`#${item.testNo} ${performanceTest.name}`}
                  description={moment(item.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                />
                <div className={styles.content}>
                  <div className={styles.specs}>
                    <Row gutter={8} className={styles.title}>
                      <Col span={6}>
                        <Icon type='cloud' />
                        <span>Cloud Account</span>
                        <span className={styles.value}>{item.cloudAccount.name}</span>
                      </Col>
                      <Col span={6}>
                        <Icon type='global' />
                        <span>Location</span>
                        <span className={styles.value}>{item.location.value}</span>
                      </Col>
                      <Col span={6}>
                        <Icon type='laptop' />
                        <span>VM Type</span>
                        <span className={styles.value}>{item.vmType.value}</span>
                      </Col>
                      <Col span={6}>
                        <Icon type='appstore' />
                        <span>Nodes</span>
                        <span className={styles.value}>{item.nodes}</span>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.rightContent}>
                    <ElapsedTime className={styles.time} startTime={item.startTime && moment(item.startTime)} endTime={item.endTime && moment(item.endTime)} />
                    <Button onClick={() => router.push(`/menu/performanceTests/${performanceTest.id}/report/${item.id}`)}>Report</Button>
                  </div>
                </div>
              </div>
              <ExecutionBar
                className={styles.footer}
                total={5}
                state={getStatusLabel(item.status)}
                current={getStatusIndex(item.status)}
              />
            </List.Item>
          )}
        />
        <LearnHow
          title="Learn how to CREATE, CONFIGURE and EXECUTE PERFORMANCE TEST"
          text="A complete guide to create, configure and execute performance tests…"
        />
      </PageHeaderWrapper>
    );
  }
}

export default PerformanceTest;
