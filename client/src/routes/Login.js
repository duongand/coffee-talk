import { Row, Col } from 'react-bootstrap';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';

function Login() {
  return (
    <div className="login">
      <Row>
        <Col>
          <LoginForm />
        </Col>
        <Col>
          <RegisterForm />
        </Col>
      </Row>
    </div>
  );
};

export default Login;