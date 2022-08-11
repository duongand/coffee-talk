import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavigationBar({ currentUsername, logout }) {
	return (
		<>
			<Navbar bg="coffee" variant="dark">
				<Container>
					<Nav.Link as={ Link } className="navbar--title" to="/">Coffee Talk</Nav.Link>
					<Nav>
						{!currentUsername && <Nav.Link as={ Link } className="navbar--login" to="/login">Login</Nav.Link>}
						{currentUsername && <Nav.Link as={ Link } className="navbar--chat" to="/chat">Chat</Nav.Link>}
						{currentUsername && <Nav.Link as={ Link } className="navbar--logout" to="/" onClick={logout}>Logout</Nav.Link>}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;