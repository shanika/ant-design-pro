import { stringify } from 'qs';
import request from '@/utils/request';
import { getAuthHeader } from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getAuthority() {
  return request('/api/auth/authority', {
    headers : getAuthHeader()
  });
}

/*
Cloud Accounts
 */

export async function getCloudAccounts() {
  return request('/api/workspaces/1/cloudAccounts', {
    headers : getAuthHeader()
  });
}

export async function getCloudAccount(id) {
  return request(`/api/workspaces/1/cloudAccounts/${id}`, {
    headers : getAuthHeader()
  });
}

export async function addCloudAccount(payload) {
  return request('/api/workspaces/1/cloudAccounts', {
    headers : getAuthHeader(),
    method: 'POST',
    data: payload,
  });
}

export async function removeCloudAccount(id) {
  return request(`/api/workspaces/1/cloudAccounts/${id}`, {
    headers : getAuthHeader(),
    method: 'DELETE',
  });
}

export async function refreshCloudAccount(id) {
  return request(`/api/workspaces/1/cloudAccounts/${id}/updateStatus`, {
    headers : getAuthHeader(),
    method: 'POST',
  });
}

/*
 Performance Tests
 */

export async function getPerformanceTests() {
  return request('/api/workspaces/1/tests', {
    headers : getAuthHeader()
  });
}

export async function getPerformanceTest(id) {
  return request(`/api/workspaces/1/tests/${id}`, {
    headers : getAuthHeader()
  });
}

export async function addPerformanceTest(payload) {
  return request('/api/workspaces/1/tests', {
    headers : getAuthHeader(),
    method: 'POST',
    data: payload,
  });
}

export async function savePerformanceTest( id, payload) {
  return request(`/api/workspaces/1/tests/${id}`, {
    headers : getAuthHeader(),
    method: 'PUT',
    data: payload,
  });
}

export async function removePerformanceTest(id) {
  return request(`/api/workspaces/1/tests/${id}`, {
    headers : getAuthHeader(),
    method: 'DELETE',
  });
}

/*
Meta Data
 */
export async function getLocationsList() {
  return request('/api/data/locations?cloudType=GCP', {
    headers : getAuthHeader()
  });
}

export async function getVmTypes() {
  return request('/api/data/vmTypes?cloudType=GCP', {
    headers : getAuthHeader()
  });
}



