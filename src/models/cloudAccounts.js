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
    *fetchAll(action, { call, put, select }) {
      yield put({ type : 'clear' });
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const accounts = yield call(getCloudAccounts, workspaceId);
      yield put({
        type : 'setAll',
        payload : accounts
      })
    },
    *add({payload}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const cloudAccount = yield call(addCloudAccount, workspaceId, payload);
      yield put({
        type : 'addOne',
        payload: cloudAccount
      })
    },
    *removeAccount({payload}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      yield call(removeCloudAccount, workspaceId, payload);
      yield put({
        type : 'remove',
        payload,
      })
    },
    *fetchOne({payload}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const account = yield call(getCloudAccount, workspaceId, payload);
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
    *refresh({payload}, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const account = yield call(refreshCloudAccount, workspaceId, payload);
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
