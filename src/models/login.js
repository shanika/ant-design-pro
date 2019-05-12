import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized, setAccessToken, deleteAccessToken } from '@/utils/Authorized';
import * as api from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    authority : undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {

        setAccessToken(response.accessToken);
        yield put({
          type : 'setAuthority',
          payload : response.currentAuthority
        });

        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *fetchAuthority( action, { call, put}) {
      const authority = yield call(api.getAuthority);
      yield put({
        type : 'setAuthority',
        payload : authority
      })
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });

      yield put({
        type: 'setAuthority',
      });

      deleteAccessToken();
      reloadAuthorized();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
    *changeLoginStatus({ payload }, { put }) {
      yield put({payload});
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    setAuthority(state, { payload }) {
      return {
        ...state,
        authority : payload
      }
    }
  },
};
