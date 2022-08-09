import MessageForm from './MessageForm';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';

function ChatBox({ messages, handleMessageDraftChange, messageDraft, sendMessage }) {
  const currentUser = 'Ca Phe Sua Da';

  const messageList = messages.map((message) => {
    if (message.username === currentUser) {
      return <SentMessage message={message} />
    } else {
      return <ReceivedMessage message={message} />
    };
  });

  return (
    <div className="chat-box">
      <ul className="message-list">
        {messageList}
      </ul>
      <MessageForm
        handleMessageDraftChange={handleMessageDraftChange}
        messageDraft={messageDraft}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatBox;