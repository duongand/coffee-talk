import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function MessageForm() {
  return (
    <Form className="message-form">
      <InputGroup>
        <Form.Control className="message-form--input" type="text" placeholder="Enter message" />
        <Button variant="dark" type="submit">Submit</Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;