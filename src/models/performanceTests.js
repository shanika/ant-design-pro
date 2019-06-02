import { message } from 'antd';
import {
  addPerformanceTest,
  getPerformanceTest,
  getPerformanceTests, getStatus,
  removePerformanceTest, runPerformanceTest,
  savePerformanceTest,
} from '../services/api';

export default {
  namespace: 'performanceTests',
  state: {
    list: [],
    performanceTest: {},
    showConfig : true
  },
  effects: {
    *fetchAll(action, { call, put, select }) {
      yield put({ type : 'clear' });
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const performanceTests = yield call(getPerformanceTests, workspaceId);
      yield put({
        type : 'setAll',
        payload : performanceTests
      })
    },
    *add({payload}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const performanceTest = yield call(addPerformanceTest, workspaceId, payload);
      yield put({
        type : 'addOne',
        payload: performanceTest
      })
    },
    *update({payload : {id, values}}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const performanceTest = yield call(savePerformanceTest, workspaceId, id, values);
      yield put({
        type : 'setOne',
        payload: performanceTest
      });
      yield put({
        type : 'setShowConfig',
        payload : false
      });
      message.success('Test Configurations saved.');
    },
    *removePerformanceTest({payload}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      yield call(removePerformanceTest, workspaceId, payload);
      yield put({
        type : 'remove',
        payload,
      });
    },
    *fetchOne({payload}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const performanceTest = yield call(getPerformanceTest, workspaceId, payload);
      yield put({
        type : 'setOne',
        payload : performanceTest
      });
    },
    *unsetOne(action, {put}) {
      yield put({
        type : 'unsetAccount'
      });
    },
    *runTest({ payload }, { call, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      yield call(runPerformanceTest, workspaceId, payload);
    },
    *updateStatus (action, { put, call, select}) {
       const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
       const testStatus = yield call(getStatus, workspaceId);
        yield put({
          type : 'setTestStatus',
          payload : testStatus
        });
    }
  },
  reducers: {
    clear(state) {
      return {
        ...state,
        list : []
      }
    },
    setAll(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    addOne(state, action) {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    remove(state, { payload }) {
      return {
        ...state,
        list: state.list.filter( a => a.id !== payload),
      };
    },
    setOne(state, {payload}) {
      return {
        ...state,
        performanceTest : payload
      }
    },
    unsetAccount(state) {
      return {
        ...state,
        performanceTest : {}
      }
    },
    setShowConfig(state, { payload }) {
      return {
        ...state,
        showConfig : payload
      }
    },
    setTestStatus(state, { payload }) {
      return {
        ...state,
        list : state.list.map( t => {
          const status = payload.find(s => s.testId === t.id);
          return status ? { ...t, status : status.status } : t;
        }),
        performanceTest : {
          ...state.performanceTest,
          status: payload.find(s => s.testId === state.performanceTest.id) ? payload.find(s => s.testId === state.performanceTest.id).status : 'STOPPED',
        }
      }
    }
  }
}
