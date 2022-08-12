import axios from 'axios';
import { setToken } from './tokenHelpers.js';

export function loginUser(loginForm) {
	return axios.post('/api/login', {
		'username': loginForm.username,
		'password': loginForm.password
	}).then((response) => {
		if (response.status === 400) return 400;
		setToken(response.data.token);
		return response.data;
	}).catch(() => {
		return 400;
	});
};

export function registerUser(registerForm) {
	if (!checkValidPassword(registerForm.password)) return 400;

	return axios.post('/api/users', {
		'username': registerForm.username,
		'password': registerForm.password
	}).then((response) => {
		if (response.status === 400) return;
		return response.data;
	}).catch(() => {
		return 400;
	});
};

function checkValidPassword(password) {
	return password.length === 4 && Number.isInteger(parseInt(password));
};