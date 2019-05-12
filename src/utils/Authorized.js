import RenderAuthorize from '@/components/Authorized';

let Authorized = RenderAuthorize(); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorize();
};

const setAccessToken = (accessToken) => {
  localStorage.setItem('kandula-token', accessToken);
};

const deleteAccessToken = () => {
  localStorage.removeItem('kandula-token');
};

export { reloadAuthorized, setAccessToken, deleteAccessToken };
export default Authorized;
