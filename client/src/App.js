import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import NavigationBar from './components/common/NavigationBar';
import Home from './routes/Home';
import Login from './routes/Login';
import Chat from './routes/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import {
	loginUser,
	registerUser,
} from './clientAuth.js'

import {
	getToken,
	checkToken,
	removeToken
} from './tokenHelpers.js';

function App() {
	const [loginForm, setLoginForm] = useState({
		'username': '',
		'password': ''
	});
	const [registerForm, setRegisterForm] = useState({
		'username': '',
		'password': '',
		'confirmPassword': ''
	});
	const [messageDraft, setMessageDraft] = useState({
		'message': ''
	});
	const [currentUsername, setCurrentUsername] = useState('');
	const [activeUsers, setActiveUsers] = useState([]);
	const [messageLog, setMessageLog] = useState([]);
	const socket = useRef(null);
	let navigate = useNavigate();

	useEffect(() => {
		if (checkToken()) {
			removeToken();
		};

		socket.current = io();

		socket.current.on('new user', (activeUsers) => {
			setActiveUsers(activeUsers)
		});

		socket.current.on('return message', (messages) => {
			setMessageLog(messages);
		});

		return () => {
			socket.off('new user');
			socket.off('return message');
			socket.current = null;
		};
	}, []);

	function handleLoginChange(event) {
		const { name, value } = event.target;
		setLoginForm((prevLoginForm) => ({
			...prevLoginForm,
			[name]: value
		}));
	};

	function handleRegisterChange(event) {
		const { name, value } = event.target;
		setRegisterForm((prevRegisterForm) => ({
			...prevRegisterForm,
			[name]: value
		}));
	};

	function handleMessageDraftChange(event) {
		const { name, value } = event.target;
		setMessageDraft((prevMessageDraft) => ({
			...prevMessageDraft,
			[name]: value
		}));
	};

	async function onSubmit(event) {
		event.preventDefault();
		const formType = event.target.className;
		if (formType === 'login-form') {
			const response = await loginUser(loginForm);
			if (response.success) {
				socket.current.emit('user joined', getToken());
				setCurrentUsername(response.username);
				setLoginForm({
					'username': '',
					'password': ''
				})
				navigate('/chat', { replace: true });
			};
		} else if (formType === 'register-form') {
			if (registerForm.password !== registerForm.confirmPassword) return;
			const response = await registerUser(registerForm);
			if (response.success) window.location.href = '/login';
		};
	};

	function sendMessage(event) {
		event.preventDefault();
		if (messageDraft === '') return;
		axios.post('/api/messages', {
			'message': messageDraft.message,
			'token': getToken(),
		}).then((response) => {
			socket.current.emit('new message');
		}).catch((error) => {
			console.log(error);
		});
		setMessageDraft({ 'message': '' });
	};

	function logout() {
		socket.current.emit('user left', getToken());
		reset();
		navigate('/', { replace: true })
	};

	function reset() {
		setCurrentUsername('');
		setActiveUsers([]);
		setMessageLog([]);
		removeToken();
	};

	return (
		<div className="App">
			<NavigationBar
				currentUsername={currentUsername}
				logout={logout}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home />
					} />
				<Route
					path="/login"
					element={
						<Login
							currentUsername={currentUsername}
							loginForm={loginForm}
							handleLoginChange={handleLoginChange}
							registerForm={registerForm}
							handleRegisterChange={handleRegisterChange}
							onSubmit={onSubmit}
						/>
					} />
				<Route
					path="/chat"
					element={
						<Chat
							currentUsername={currentUsername}
							users={activeUsers}
							messages={messageLog}
							handleMessageDraftChange={handleMessageDraftChange}
							messageDraft={messageDraft}
							sendMessage={sendMessage}
						/>
					} />
			</Routes>
		</div>
	);
};

export default App;