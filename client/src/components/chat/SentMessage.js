function SentMessage({ message }) {
  return (
    <li className="message-sent">
      <ul>
        <li className="message-sent--message">{message.message}</li>
        <li className="message-sent--time-stamp">{message.time_stamp}</li>
      </ul>
    </li>
  );
};

export default SentMessage;