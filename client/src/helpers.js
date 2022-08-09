import axios from 'axios';

export function createMessage(message) {
	const token = getToken();
	const timeStamp = new Date().toISOString;
	const body = ({
		'message': message,
		'token': token,
		'time_stamp': timeStamp
	});

	axios.post('/messages', 
		body
	).then((response) => {
		console.log(response);
	});
};

function getToken() {
	return localStorage.getItem('token');
};

function logout() {
	localStorage.removeItem('token');
};