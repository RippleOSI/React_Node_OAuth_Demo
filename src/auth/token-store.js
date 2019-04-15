export const getUserProfile = () => {
  const jwt = getCookie();
  if (jwt) {
    return parseJwt(jwt);
  } else {
    return null;
  }
}

function getCookie() {
  if (document.cookie) {
    const jwt = document.cookie.split(';').find((item) => item.includes('user='));
    if (jwt) {
      return jwt.split('=')[1];
    } 
  }
  return null;
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};

