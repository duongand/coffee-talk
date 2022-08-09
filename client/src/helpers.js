import axios from 'axios';

export function createMessage(message) {
	const token = getToken();
	const body = ({
		'message': message,
		'token': token,
	});

	axios.post('/api/messages', 
		body
	).catch((error) => {
		console.log(error);
	});
};

function getToken() {
	return localStorage.getItem('token');
};