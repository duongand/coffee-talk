function ReceivedMessage({ message }) {
  return (
    <li className="message-received">
      <ul>
        <li className="message-received--username">{message.username}</li>
        <li className="message-received--message">{message.message}</li>
        <li className="message-received--time-stamp">{message.time_stamp}</li>
      </ul>
    </li>
  );
};

export default ReceivedMessage;