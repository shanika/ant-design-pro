import { calculateMetricCharts, calculateUsageCharts, groupBy } from '../services/chartDataCalc';
import { getAggResults, getErrorList, getNodeUsage, getSampleMetrics } from '../services/api';

const metricChartsDefault = {
  users: [],
  hits: [],
  errorPer: [],
  responseTime: [],
  responseTimes: [],
  maximumUsers: 0,
  avgHitsPerSec: 0,
  avgErrorPer: 0,
  avgResponseTime: 0,
  avgNetworkUsage: 0,
  usageData: [],
};

const usageChartsDefault = {
  cpu: [],
  memory: [],
  network: [],
};

export default {
  namespace: 'reportData',
  state: {
    executionId: undefined,
    metric: {},
    metricLastReading: 0,
    metricCharts: metricChartsDefault,
    usageCharts: usageChartsDefault,
    errors: [],
    results: [],
    usage: {},
    usageLastReading: 0,
  },
  effects: {
    *fetchMetric(
      {
        payload: { executionId, startTime, endTime },
      },
      { call, put, select }
    ) {
      const preReportData = yield select(state => state.reportData);

      if (preReportData.executionId !== executionId) {
        yield put({
          type: 'reset',
          payload: { executionId },
        });
      }

      const { metricLastReading } = yield select(state => state.reportData);
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();

      let startTimeArg = startTime;
      let endTimeArg = endTime;

      if (metricLastReading) {
        const metricLastReadingBuff = (metricLastReading - 30) * 1000;
        if (startTime < metricLastReadingBuff) {
          startTimeArg = metricLastReadingBuff;
        }
      }

      if (!endTime) {
        endTimeArg = new Date().getTime();
      }

      const metric = yield call(getSampleMetrics, workspaceId, executionId, startTimeArg, endTimeArg);

      if (metric && metric.length > 0) {
        const data = groupBy(
          metric.filter(d => d.x != null).map(d => (d.label != null ? d : { ...d, label: 'All' })),
          'x'
        );

        yield put({
          type: 'updateMetric',
          payload: {
            data,
            metricLastReading: metric[metric.length - 1].x,
          },
        });
      }

      const updatedReportData = yield select(state => state.reportData);
      yield put({
        type: 'setMetricCharts',
        payload: {
          metricCharts: calculateMetricCharts(updatedReportData.metric),
        },
      });

      const usageData = yield call(getNodeUsage, workspaceId, executionId, updatedReportData.usageLastReading ? updatedReportData.usageLastReading : startTimeArg , endTimeArg);

      if (usageData && usageData.length > 0) {
        const data = groupBy(usageData, 'timestamp');
        const usageLastReading = usageData[usageData.length - 1].timestamp;
        yield put({
          type: 'updateUsage',
          payload: {
            data,
            usageLastReading,
          },
        });

        const updatedReportData2 = yield select(state => state.reportData);
        yield put({
          type: 'setUsageCharts',
          payload: {
            usageCharts: calculateUsageCharts(updatedReportData2.usage),
          },
        });
      }

      const errors = yield call(getErrorList, workspaceId, executionId);

      if (errors && errors.length > 0) {
        yield put({
          type: 'updateErrors',
          payload: {
            data: errors,
          },
        });
      }
    },
    *fetchResults(
      {
        payload: { executionId, startTime, endTime },
      },
      { call, put, select }
    ) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const data = yield call(getAggResults, workspaceId, executionId, startTime, endTime);
      yield put({
        type: 'setSampleResults',
        payload: data,
      });
    },
  },
  reducers: {
    updateMetric(
      state,
      {
        payload: { data, metricLastReading },
      }
    ) {
      return {
        ...state,
        metric: {
          ...state.metric,
          ...data,
        },
        metricLastReading,
      };
    },
    updateUsage(
      state,
      {
        payload: { data, usageLastReading },
      }
    ) {
      return {
        ...state,
        usage: {
          ...state.usage,
          ...data,
        },
        usageLastReading,
      };
    },
    updateErrors(
      state,
      {
        payload: { data },
      }
    ) {
      return {
        ...state,
        errors: data,
      };
    },
    setMetricCharts(
      state,
      {
        payload: { metricCharts },
      }
    ) {
      return {
        ...state,
        metricCharts,
      };
    },
    setUsageCharts(
      state,
      {
        payload: { usageCharts },
      }
    ) {
      return {
        ...state,
        usageCharts,
      };
    },
    reset(
      state,
      {
        payload: { executionId },
      }
    ) {
      return {
        ...state,
        executionId,
        metric: {},
        metricLastReading: 0,
        metricCharts: metricChartsDefault,
        usage: {},
        usageLastReading: 0,
        usageCharts: usageChartsDefault,
        errors: [],
      };
    },
    setSampleResults(state, { payload }) {
      return {
        ...state,
        results: payload,
      };
    },
  },
};
