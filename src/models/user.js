import { query as queryUsers, queryCurrent } from '@/services/user';
import { addWorkspace, removeWorkspace, switchWorkspace } from '../services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *addWorkspace({ payload }, { call, put}) {
      const workspace = yield call(addWorkspace, payload);
      yield put({
        type : 'addNewWorkspace',
        payload: workspace
      })
    },
    *deleteWorkspace({ payload }, { call, put}) {
      yield call(removeWorkspace, payload);
      yield put({
        type : 'removeWorkspace',
        payload
      })
    },
    *switchWorkSpace({payload}, {call, put}) {
      const ws = yield call(switchWorkspace, payload);
      yield put({
        type : 'changeWorkspace',
        payload : ws.id
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    addNewWorkspace(state, { payload }) {
      return {
        ...state,
        currentUser : {
          ...state.currentUser,
          workspaceResponse : [...state.currentUser.workspaceResponse, payload]
        }
      }
    },
    removeWorkspace(state, { payload }) {
      return {
        ...state,
        currentUser : {
          ...state.currentUser,
          workspaceResponse : state.currentUser.workspaceResponse.filter(ws => ws.id !== payload)
        }
      }
    },
    changeWorkspace(state, { payload }) {
      return {
        ...state,
        currentUser : {
          ...state.currentUser,
          currentWorkspaceId : payload
        }
      }
    }
  },
};
