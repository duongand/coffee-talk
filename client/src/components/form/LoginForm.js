import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginForm({ loginForm, handleLoginChange, onSubmit }) {
	return (
		<div className="login--login-form">
			<h2 className="login--login-header">Login</h2>
			<Form className="login-form" onSubmit={onSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control
						name="username"
						placeholder="Enter username"
						value={loginForm.username}
						onChange={handleLoginChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						placeholder="Enter password"
						value={loginForm.password}
						onChange={handleLoginChange}
					/>
				</Form.Group>
				<Button className="login--button" variant="dark" type="null">Login</Button>
			</Form>
		</div>
	);
};

export default LoginForm;