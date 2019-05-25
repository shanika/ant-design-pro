import { message } from 'antd';
import {
  addPerformanceTest,
  getPerformanceTest,
  getPerformanceTests,
  removePerformanceTest,
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
    *fetchAll(action, { call, put }) {
      yield put({ type : 'clear' });
      const performanceTests = yield call(getPerformanceTests);
      yield put({
        type : 'setAll',
        payload : performanceTests
      })
    },
    *add({payload}, {call, put}) {
      const performanceTest = yield call(addPerformanceTest, payload);
      yield put({
        type : 'addOne',
        payload: performanceTest
      })
    },
    *update({payload : {id, values}}, {call, put}) {
      const performanceTest = yield call(savePerformanceTest, id, values);
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
    *removePerformanceTest({payload}, {call, put}) {
      yield call(removePerformanceTest, payload);
      yield put({
        type : 'remove',
        payload,
      });
    },
    *fetchOne({payload}, {call, put}) {
      const performanceTest = yield call(getPerformanceTest, payload);
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
    }
  }
}
