import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageForm from '../form/MessageForm';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';

function ChatBox({ currentUsername, messages, handleMessageDraftChange, messageDraft, sendMessage }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login', { replace: true });
  }, []);

  const messageList = messages.map((message) => {
    if (message.username === currentUsername) {
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