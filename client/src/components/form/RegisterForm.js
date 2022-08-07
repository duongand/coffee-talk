import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterForm({ registerForm, handleRegisterChange, onSubmit }) {
  return (
    <div className="login--register-form">
      <h2 className="login--register-header">Register</h2>
      <Form className="register-form" onSubmit={onSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            placeholder="Enter username"
            value={registerForm.username}
            onChange={handleRegisterChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter 4-digit password"
            value={registerForm.password}
            onChange={handleRegisterChange}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmBasicPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm 4-digit password"
            value={registerForm.confirmPassword}
            onChange={handleRegisterChange}
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default RegisterForm;