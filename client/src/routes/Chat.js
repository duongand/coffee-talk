import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserList from '../components/chat/UserList';
import ChatBox from '../components/chat/ChatBox';
import { io } from 'socket.io-client';

function Chat({ users, messages, handleMessageDraftChange, messageDraft, sendMessage }) {
  useEffect(() => {
    const socket = io();
    console.log(socket);
  }, []);

	return (
		<Container className="chat" fluid>
      <Row className="chat--row">
        <Col md={2} className="chat--user-list">
          <UserList 
            users={users}
          />
        </Col>
        <Col md={10} className="chat--chat-container">
          <ChatBox 
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