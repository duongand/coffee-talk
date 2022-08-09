import Button from 'react-bootstrap/Button';

function UserList({ users, logout }) {
  const userList = users.map((user) => (
    <li key={user} className="user-list--user">{user}</li>
  ));
  
  return (
    <div className="user-list">
      <ul className="user-list--list">
        {userList}
      </ul>
      <Button variant="outline-dark" type="submit" onClick={logout}>Logout</Button>
    </div>
  );
};

export default UserList;