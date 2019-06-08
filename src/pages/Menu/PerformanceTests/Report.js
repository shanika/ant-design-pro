import React, { PureComponent } from 'react';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Col, Icon, Row, Spin, Tabs } from 'antd';
import { connect } from 'dva';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import styles from './Report.less';
import HitsAndErrorsChart from './Charts/HitsAndErrorsChart';
import ResponseTimeChart from './Charts/ResponseTimeChart';
import SampleDataChart from './Charts/SampleDataChart';
import UsageCPU from './Charts/UsageCPU';
import UsageMemory from './Charts/UsageMemory';
import UsageNetwork from './Charts/UsageNetwork';
import ErrorsTable from './Charts/ErrorsTable';
import ResultsTable from './Charts/ResultsTable';
import ResultFetcher from './ResultFetcher';
import ProgressButton from '../../../components/ButtonProgress';
import { getStatusIndex } from '../../../utils/TestStatusUtil';

const { TabPane } = Tabs;

const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


@connect(({
            performanceTests: { performanceTest, execution },
            loading,
            reportData: {
              metric,
              usage,
              metricCharts: { maximumUsers, avgHitsPerSec, avgErrorPer, avgResponseTime, avgNetworkUsage },
            },
          }) => ({
  fetching: loading.effects['reportData/fetchMetric'],
  performanceTest,
  execution,
  maximumUsers,
  avgHitsPerSec,
  avgErrorPer,
  avgResponseTime,
  avgNetworkUsage,
  metric,
  usage,
}))
class Report extends PureComponent {

  getProgress = url => (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="ant-btn"
      style={{ maxWidth: '250px', lineHeight: '44px' }}
      disabled={!url}
    >
      <Icon style={{ color: '#36cfc9', marginRight: 8, fontSize: 18 }} type="cloud-download" />{' '}
      JMeter Logs
    </a>
  );

  componentWillMount() {
    const {dispatch, match : {params  : { testId, id}}} = this.props;
    dispatch({
      type: 'performanceTests/fetchExecution',
      payload: {
        testId,
        id
      }
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type : 'performanceTests/clearExecution'
    });
  }

  render() {

    const {
      execution,
      fetching,
      maximumUsers,
      avgHitsPerSec,
      avgErrorPer,
      avgResponseTime,
      avgNetworkUsage,
      metric,
      usage,
    } = this.props;


    const spinning = fetching && metric && Object.keys(metric).length === 0;
    const usageSpinning = fetching && usage && Object.keys(usage).length === 0;

    return (
      <PageHeaderWrapper
        onBack={() => router.goBack()}
        hiddenBreadcrumb
        title="Execution"
        extra={
          execution && execution.status &&
          (execution.status === 'STOPPED' ? (
            this.getProgress('/file')
          ) : (
            <ProgressButton persent={getStatusIndex(execution.status)/5 * 100} />
          ))
        }
      >
        {
          execution && execution.startTime && <ResultFetcher execution={execution} />
        }
        <div style={{ padding: '10px' }}>
          <GridContent>
            <Row gutter={24} style={{ marginBottom: 16 }}>
              <Col className="gutter-row" xs={4}>
                <Card className={styles.reportCard}>
                Maximum <br /> Users <span>{maximumUsers}</span>
                </Card>
              </Col>
              <Col className="gutter-row" xs={4}>
                <Card className={styles.reportCard}>
                Average <br /> Hits per sec<span>{Math.round(avgHitsPerSec * 100) / 100}</span>
                </Card>
              </Col>
              <Col className="gutter-row" xs={4}>
                <Card className={styles.reportCard}>
                Errors (%) <span>{Math.round(avgErrorPer)} %</span>
                </Card>
              </Col>
              <Col className="gutter-row" xs={4}>
                <Card className={styles.reportCard}>
                Average <br /> Response <br /> Time{' '}
                  <span>{Math.round(avgResponseTime)} ms</span>
                </Card>
              </Col>
              <Col className="gutter-row" xs={4}>
                <Card className={styles.reportCard}>
                90% Response Time <span>{Math.round(avgResponseTime)} ms</span>
                </Card>
              </Col>
              <Col className="gutter-row" xs={4}>
                <Card className={styles.reportCard}>
                Average <br /> Network <br /> Usage (KB) <span>{avgNetworkUsage} Kb/s</span>
                </Card>
              </Col>
            </Row>
            <Card bodyStyle={{ padding: 0 }} style={{ marginBottom: 16 }}>
              <Tabs
                tabBarExtraContent={
                  <div style={{ paddingRight: 24 }}>
                    <Spin size="small" spinning={fetching} indicator={loadingIcon} />
                  </div>
              }
              >
                <TabPane tab="Overview" key="1">
                  <div style={{ padding: 16 }}>
                    <Row gutter={24}>
                      <Col xs={12}>
                        <HitsAndErrorsChart spinning={spinning} />
                      </Col>
                      <Col xs={12}>
                        <ResponseTimeChart spinning={spinning} />
                      </Col>
                    </Row>
                  </div>
                </TabPane>
                <TabPane tab="Response Times" key="2">
                  <SampleDataChart spinning={spinning} />
                </TabPane>
                <TabPane tab="Node Performance" key="4">
                  <div style={{ padding: 16 }}>
                    <Row gutter={24}>
                      <Col className="gutter-row" xs={8}>
                        <UsageCPU spinning={usageSpinning} />
                      </Col>
                      <Col className="gutter-row" xs={8}>
                        <UsageMemory spinning={usageSpinning} />
                      </Col>
                      <Col className="gutter-row" xs={8}>
                        <UsageNetwork spinning={usageSpinning} />
                      </Col>
                    </Row>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
            <Card title="Errors" bodyStyle={{ padding: 0 }} style={{ marginBottom: 16 }}>
              <ErrorsTable />
            </Card>
            { execution && execution.id && <ResultsTable execution={execution} />}
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}



export default Report;
