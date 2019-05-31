import request from '@/utils/request';
import { getAuthHeader } from '../utils/request';

/*
  Auth
 */
export async function getAuthority() {
  return request('/api/auth/authority');
}

export async function accountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function accountRegister(params) {
  return request('/auth/register', {
    method: 'POST',
    data: params,
  });
}


/*
Cloud Accounts
 */

export async function getCloudAccounts(workspaceId) {
  return request(`/api/workspaces/${workspaceId}/cloudAccounts`, {
    headers : getAuthHeader()
  });
}

export async function getCloudAccount(workspaceId, id) {
  return request(`/api/workspaces/${workspaceId}/cloudAccounts/${id}`);
}

export async function addCloudAccount(workspaceId, payload) {
  return request(`/api/workspaces/${workspaceId}/cloudAccounts`, {
    method: 'POST',
    data: payload,
  });
}

export async function removeCloudAccount(workspaceId, id) {
  return request(`/api/workspaces/${workspaceId}/cloudAccounts/${id}`, {
    method: 'DELETE',
  });
}

export async function refreshCloudAccount(workspaceId, id) {
  return request(`/api/workspaces/${workspaceId}/cloudAccounts/${id}/updateStatus`, {
    method: 'POST',
  });
}

/*
 Performance Tests
 */

export async function getPerformanceTests(workspaceId) {
  return request(`/api/workspaces/${workspaceId}/tests`);
}

export async function getPerformanceTest(workspaceId, id) {
  return request(`/api/workspaces/${workspaceId}/tests/${id}`);
}

export async function addPerformanceTest(workspaceId, payload) {
  return request(`/api/workspaces/${workspaceId}/tests`, {
    method: 'POST',
    data: payload,
  });
}

export async function savePerformanceTest(workspaceId, id, payload) {
  return request(`/api/workspaces/${workspaceId}/tests/${id}`, {
    method: 'PUT',
    data: payload,
  });
}

export async function removePerformanceTest(workspaceId, id) {
  return request(`/api/workspaces/${workspaceId}/tests/${id}`, {
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


/*
 Workspaces
 */

export async function addWorkspace(payload) {
  return request('/api/workspaces', {
    method: 'POST',
    data: payload,
  });
}

export async function removeWorkspace(id) {
  return request(`/api/workspaces/${id}`, {
    method: 'DELETE',
  });
}

export async function switchWorkspace(id) {
  return request(`/api/workspaces/${id}/select`, {
    method: 'POST',
  });
}
