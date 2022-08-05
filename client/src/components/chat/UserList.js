function UserList({ users }) {
  const userList = users.map((user) => (
    <li key={user} className="user-list--user">{user}</li>
  ));
  
  return (
    <div className="user-list">
      <ul className="user-list--list">
        {userList}
      </ul>
    </div>
  );
};

export default UserList;