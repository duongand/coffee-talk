export function getToken() {
	return localStorage.getItem('token');
};

export function checkToken() {
	return localStorage.length > 0;
};

export function setToken(token) {
  localStorage.setItem('token', token);
};

export function removeToken() {
	localStorage.clear();
};