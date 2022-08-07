import { Row, Col } from 'react-bootstrap';
import LoginForm from '../components/form/LoginForm';
import RegisterForm from '../components/form/RegisterForm';

function Login({ loginForm, handleLoginChange, registerForm, handleRegisterChange, onSubmit }) {
  return (
    <div className="login">
      <Row>
        <Col>
          <LoginForm 
            loginForm={loginForm}
            handleLoginChange={handleLoginChange}
            onSubmit={onSubmit}
          />
        </Col>
        <Col>
          <RegisterForm 
            registerForm={registerForm}
            handleRegisterChange={handleRegisterChange}
            onSubmit={onSubmit}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;