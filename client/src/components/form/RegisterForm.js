import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterForm() {
  return (
    <div className="login--register-form">
      <h2 className="login--register-header">Register</h2>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter 4-digit password" />
        </Form.Group>
        <Form.Group controlId="formConfirmBasicPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" placeholder="Confirm 4-digit password" />
        </Form.Group>
        <Button variant="outline-dark" type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default RegisterForm;