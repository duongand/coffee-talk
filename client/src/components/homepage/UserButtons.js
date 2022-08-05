import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function UserButtons() {
	return (
		<Stack gap={2} className="align-items-center">
			<Link to="/login"><Button variant="dark" className="w-100">Login</Button></Link>
			<Link to="/chat"><Button variant="outline-dark">Continue as Guest</Button></Link>
		</Stack>
	);
};

export default UserButtons;