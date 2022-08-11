import Button from 'react-bootstrap/Button';

function UserList({ users, logout }) {
  const userList = users.map((user) => (
    <li key={user} className="user-list--user">{user}</li>
  ));
  
  return (
    <div className="user-list">
			<h5 className="user-list--header">Active Users:</h5>
      <ul className="user-list--list">
        {userList}
      </ul>
    </div>
  );
};

export default UserList;