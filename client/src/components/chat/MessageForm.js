import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function MessageForm({ handleMessageDraftChange, messageDraft, sendMessage }) {
  return (
    <Form className="message-form" onSubmit={sendMessage}>
      <InputGroup>
        <Form.Control
          name="messageDraft" 
          className="message-form--input" 
          type="text" 
          placeholder="Enter message" 
          value={messageDraft}
          onChange={handleMessageDraftChange}
        />
        <Button 
          variant="dark" 
          type="submit"
        >
          Submit
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;