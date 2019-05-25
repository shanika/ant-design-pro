import request from '@/utils/request';
import { getAuthHeader } from '../utils/request';

/*
  Auth
 */
export async function getAuthority() {
  return request('/api/auth/authority', {
    headers : getAuthHeader()
  });
}

/*
Cloud Accounts
 */

export async function getCloudAccounts() {
  return request('/api/workspaces/1/cloudAccounts');
}

export async function getCloudAccount(id) {
  return request(`/api/workspaces/1/cloudAccounts/${id}`);
}

export async function addCloudAccount(payload) {
  return request('/api/workspaces/1/cloudAccounts', {
    method: 'POST',
    data: payload,
  });
}

export async function removeCloudAccount(id) {
  return request(`/api/workspaces/1/cloudAccounts/${id}`, {
    method: 'DELETE',
  });
}

export async function refreshCloudAccount(id) {
  return request(`/api/workspaces/1/cloudAccounts/${id}/updateStatus`, {
    method: 'POST',
  });
}

/*
 Performance Tests
 */

export async function getPerformanceTests() {
  return request('/api/workspaces/1/tests');
}

export async function getPerformanceTest(id) {
  return request(`/api/workspaces/1/tests/${id}`);
}

export async function addPerformanceTest(payload) {
  return request('/api/workspaces/1/tests', {
    method: 'POST',
    data: payload,
  });
}

export async function savePerformanceTest( id, payload) {
  return request(`/api/workspaces/1/tests/${id}`, {
    method: 'PUT',
    data: payload,
  });
}

export async function removePerformanceTest(id) {
  return request(`/api/workspaces/1/tests/${id}`, {
    method: 'DELETE',
  });
}

/*
Meta Data
 */
export async function getLocationsList() {
  return request('/api/data/locations?cloudType=GCP');
}

export async function getVmTypes() {
  return request('/api/data/vmTypes?cloudType=GCP');
}



