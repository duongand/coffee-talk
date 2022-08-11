function SentMessage({ message }) {
  return (
    <li className="message-sent">
      <ul>
        <li className="message-sent--message">{message.message}</li>
        <li className="message-sent--time-stamp">{formatDate(message.createDate)}</li>
      </ul>
    </li>
  );
};

export default SentMessage;

function formatDate(date) {
  const currentDate = new Date(date);
  return (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`)
};