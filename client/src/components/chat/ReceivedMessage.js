function ReceivedMessage({ message }) {
  return (
    <li className="message-received">
      <ul>
        <li className="message-received--username">{message.username}</li>
        <li className="message-received--message">{message.message}</li>
        <li className="message-received--time-stamp">{formatDate(message.createDate)}</li>
      </ul>
    </li>
  );
};

export default ReceivedMessage;

function formatDate(date) {
  const currentDate = new Date(date);
  return (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`)
};