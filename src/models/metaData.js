import { getCloudAccounts, getLocationsList, getVmTypes } from '../services/api';

export default {
  namespace: 'metaData',

  state: {
    locations: [],
    vmTypes: [],
  },

  effects : {
    *fetchCloudAccounts(action, {call, put, select}) {
      const { user : { currentUser : { currentWorkspaceId : workspaceId }}} = yield select();
      const cloudAccounts = yield call(getCloudAccounts, workspaceId);
      yield put({
        type : 'setCloudAccounts',
        payload : cloudAccounts
      });
    },
    *fetchLocations(action, {call, put}) {
      const locations = yield call(getLocationsList);
      yield put({
        type : 'setLocations',
        payload : locations
      });
    },
    *fetchVmTypes(action, {call, put}) {
      const vmTypes = yield call(getVmTypes);
      yield put({
        type : 'setVmTypes',
        payload : vmTypes
      });
    }
  },

  reducers: {
    setLocations(state, { payload }) {
      return {
        ...state,
        locations : payload
      }
    },
    setVmTypes(state, { payload }) {
      return {
        ...state,
        vmTypes : payload
      }
    },
    setCloudAccounts(state, { payload }) {
      return {
        ...state,
        cloudAccounts : payload
      }
    },
    clearCloudAccounts(state) {
      return {
        ...state,
        cloudAccounts : []
      }
    }
  }

}
