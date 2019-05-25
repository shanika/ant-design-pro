import request from '@/utils/request';
import { getAuthHeader } from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/user/me', {
    headers : getAuthHeader()
  });
}
