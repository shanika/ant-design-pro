import { addCloudAccount, getCloudAccounts, removeCloudAccount } from '../services/api';

export default {
  namespace: 'cloudAccounts',
  state: {
    list : []
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
  }
}
