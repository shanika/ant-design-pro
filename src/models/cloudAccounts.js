import {
  addCloudAccount,
  getCloudAccount,
  getCloudAccounts,
  refreshCloudAccount,
  removeCloudAccount,
} from '../services/api';

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
        type : 'setAll',
        payload : accounts
      })
    },
    *add({payload}, {call, put}) {
      const cloudAccount = yield call(addCloudAccount, payload);
      yield put({
        type : 'addOne',
        payload: cloudAccount
      })
    },
    *removeAccount({payload}, {call, put}) {
      yield call(removeCloudAccount, payload);
      yield put({
        type : 'remove',
        payload,
      })
    },
    *fetchOne({payload}, {call, put}) {
      const account = yield call(getCloudAccount, payload);
      yield put({
        type : 'setOne',
        payload : account
      });
    },
    *unsetOne(action, {put}) {
      yield put({
        type : 'unsetAccount'
      });
    },
    *refresh({payload}, {call, put}) {
      const account = yield call(refreshCloudAccount, payload);
      yield put({
        type : 'setOne',
        payload : account
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
