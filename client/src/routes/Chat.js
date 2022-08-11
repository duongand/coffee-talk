import { Container, Row, Col } from 'react-bootstrap';
import UserList from '../components/chat/UserList';
import ChatBox from '../components/chat/ChatBox';

function Chat({ currentUsername, users, messages, handleMessageDraftChange, messageDraft, sendMessage, logout }) {
	return (
		<Container className="chat" fluid>
      <Row className="chat--row">
        <Col md={1} className="chat--user-list">
          <UserList 
            users={users}
            logout={logout}
          />
        </Col>
        <Col md={11} className="chat--chat-container">
          <ChatBox
            currentUsername={currentUsername}
            messages={messages}
            handleMessageDraftChange={handleMessageDraftChange}
            messageDraft={messageDraft}
            sendMessage={sendMessage}
          />
        </Col>
      </Row>
    </Container>
	);
};

export default Chat;