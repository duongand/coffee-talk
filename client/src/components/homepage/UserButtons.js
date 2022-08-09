import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function UserButtons() {
	return (
		<Link to="/login"><Button variant="dark" className="w-100">Login</Button></Link>
	);
};

export default UserButtons;