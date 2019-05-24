import { addCloudAccount, getCloudAccount, getCloudAccounts, removeCloudAccount } from '../services/api';

export default {
  namespace: 'cloudAccounts',
  state: {
    list : [],
    account : {}
  },
  effects: {
    *fetchAll(action, { call, put }) {
      yield put({ type : 'clear' });
      const accounts = yield call(getCloudAccounts);
      yield put({
        type : 'setCloudAccounts',
        payload : accounts
      })
    },
    *add({payload}, {call, put}) {
      const cloudAccount = yield call(addCloudAccount, payload);
      yield put({
        type : 'addCloudAccounts',
        payload: cloudAccount
      })
    },
    *remove({payload}, {call, put}) {
      yield call(removeCloudAccount, payload);
      yield put({
        type : 'removeCloudAccounts',
        payload,
      })
    },
    *fetchOne({payload}, {call, put}) {
      const account = yield call(getCloudAccount, payload);
      yield put({
        type : 'setAccount',
        payload : account
      });
    },
    *unsetOne(action, {put}) {
      yield put({
        type : 'unsetAccount'
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
    setCloudAccounts(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    addCloudAccounts(state, action) {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    },
    removeCloudAccounts(state, { payload }) {
      return {
        ...state,
        list: state.list.filter( a => a.id !== payload),
      };
    },
    setAccount(state, {payload}) {
      return {
        ...state,
        account : payload
      }
    },
    unsetAccount(state) {
      return {
        ...state,
        account : {}
      }
    }
  }
}
