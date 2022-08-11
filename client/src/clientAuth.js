import axios from 'axios';
import { setToken } from './tokenHelpers.js';

export function loginUser(loginForm) {
	return axios.post('/api/login', {
		'username': loginForm.username,
		'password': loginForm.password
	}).then((response) => {
		if (response.status === 401) return;
		setToken(response.data.token);
		return response.data;
	}).catch((error) => {
		console.log(error);
		return 401;
	});
};

export function registerUser(registerForm) {
	if (!checkValidPassword(registerForm.password)) return 401;

	return axios.post('/api/users', {
		'username': registerForm.username,
		'password': registerForm.password
	}).then((response) => {
		return response.status;
	}).catch((error) => {
		console.log(error);
		return 401;
	});
};

function checkValidPassword(password) {
	return password.length === 4 && Number.isInteger(parseInt(password));
};