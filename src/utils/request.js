/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';

const codeMessage = {
  200: 'The server successfully returned the requested data。',
  201: 'Create or modify data successfully。',
  202: 'A request has entered the background queue（Asynchronous task）。',
  204: 'Delete data successfully。',
  400: 'The request sent has an error',
  401: 'User does not have permission（Token、user name、wrong password）。',
  403: 'User is authorized，But access is forbidden。',
  404: 'The request is made for a record that does not exist，The server is not operating。',
  406: 'The format of the request is not available。',
  410: 'The requested resource is permanently deleted',
  422: 'When creating an object，A validation error has occurred。',
  500: 'Server error，Please check the server。',
  502: 'Gateway error。',
  503: 'service is not available，Server is temporarily overloaded or maintained。',
  504: 'Gateway timeout。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status === 401) {
    notification.error({
      message: 'Not logged in or login has expired，please login again。',
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  notification.error({
    message: `Request error ${status}: ${url}`,
    description: errortext,
  });
  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    router.push('/exception/404');
  }
};

export const getAuthHeader = () => {
  const authorization = localStorage.getItem('kandula-token');
  return authorization ? { authorization : `Bearer ${authorization}` } : {};
};

/**
 * Default parameters when configuring request
 */
const request = extend({
  errorHandler, // Default error handling
});

request.interceptors.request.use((url, options) => {
  return (
    {
      url,
      options: {
        ...options,
        headers : getAuthHeader(),
        interceptors: true
      },
    }
  );
});


export default request;
