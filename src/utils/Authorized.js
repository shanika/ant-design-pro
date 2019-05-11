import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorize(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};

const setAccessToken = (accessToken) => {
  localStorage.setItem('kandula-token', accessToken);
};

const deleteAccessToken = () => {
  localStorage.removeItem('kandula-token');
};

export { reloadAuthorized, setAccessToken, deleteAccessToken };
export default Authorized;
