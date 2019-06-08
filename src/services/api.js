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

export async function runPerformanceTest(workspaceId, id) {
  return request(`/api/workspaces/${workspaceId}/tests/${id}/start`, {
    method: 'PUT',
  });
}

export async function getExecutions(workspaceId, testId) {
  return request(`/api/workspaces/${workspaceId}/tests/${testId}/executions`);
}

export async function getExecution(workspaceId, testId, executionId) {
  return request(`/api/workspaces/${workspaceId}/tests/${testId}/executions/${executionId}`);
}

export async function getStatus(workspaceId) {
  return request(`/api/workspaces/${workspaceId}/tests/status`);
}

/*
  Metrics Data
 */

export async function getSampleMetrics(workspaceId, executionId, startTime, endTime) {
  return request(`/api/workspaces/${workspaceId}/metrics/${executionId}/agg-samples?startTime=${startTime}&endTime=${endTime}`);
}

export async function getErrorList(workspaceId, executionId) {
  return request(`/api/workspaces/${workspaceId}/metrics/${executionId}/error-list`);
}

export async function getNodeUsage(workspaceId, executionId, startTime, endTime) {
  return request(`/api/workspaces/${workspaceId}/metrics/${executionId}/node-usage?startTime=${startTime}&endTime=${endTime}`);
}

export async function getLabels(workspaceId, executionId) {
  return request(`/api/workspaces/${workspaceId}/metrics/${executionId}/sample-labels`);
}

export async function getAggResults(workspaceId, executionId, startTime, endTime) {
  return request(`/api/workspaces/${workspaceId}/metrics/${executionId}/agg-result?startTime=${startTime}&endTime=${endTime}`);
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
