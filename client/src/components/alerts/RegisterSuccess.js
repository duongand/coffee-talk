import Alert from 'react-bootstrap/Alert';

function RegisterSuccess({ onClick }) {
	return (
		<Alert className="register-alert" variant="success" onClick={onClick} dismissible>
			<Alert.Heading>Registration successful!</Alert.Heading>
			<p>You can now log into the chat!</p>
		</Alert>
	);
};

export default RegisterSuccess;