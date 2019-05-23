import request from '@/utils/request';
import { getAuthHeader } from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('http://localhost:8080/api/user/me', {
    headers : getAuthHeader()
  });
}
