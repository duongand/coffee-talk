import Alert from 'react-bootstrap/Alert';

function LoginFail({ onClick }) {
	return (
		<Alert className="login-alert" variant="danger" onClick={onClick} dismissible>
			<Alert.Heading>Login error!</Alert.Heading>
			<p>Username and password combination was unsuccessful.</p>
		</Alert>
	);
};

export default LoginFail;