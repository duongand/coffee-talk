import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';

function Login({ loginForm, handleLoginChange, registerForm, handleRegisterChange, onSubmit }) {
	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token')) navigate('/chat', { replace: true });
	}, []);

	return (
		<Container className="login--container" fluid>
			<Row>
				<Col xs lg={2}/>
				<Col>
					<LoginForm
						loginForm={loginForm}
						handleLoginChange={handleLoginChange}
						onSubmit={onSubmit}
					/>
				</Col>
				<Col xs lg={1}/>
				<Col>
					<RegisterForm
						registerForm={registerForm}
						handleRegisterChange={handleRegisterChange}
						onSubmit={onSubmit}
					/>
				</Col>
				<Col xs lg={2}/>
			</Row>
		</Container>
	);
};

export default Login;