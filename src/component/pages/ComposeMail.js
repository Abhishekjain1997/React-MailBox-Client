import { useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { uiActions } from "../../store/ui-slice";

const ComposeMail = (props) => {
  const {sendRequest} = useHttp()
  const show = useSelector(state => state.ui.show)
  const email = useSelector(state => state.auth.email)

  const senderMail = email.replace('@', '').replace('.', '')

  const dispatch = useDispatch()
  const emailRef = useRef();
  const subjectRef = useRef();
  const mailBodyRef = useRef();
  const composeMailHandler = (event) => {
    event.preventDefault();

     const receiverMail = emailRef.current.value.replace('@', '').replace('.', '')
    const recevierMailData = {
      sender: email,
      subject: subjectRef.current.value,
      body: mailBodyRef.current.value,
      isRead: false
    };
    const senderMailData = {
        sentTo: emailRef.current.value,
        subject: subjectRef.current.value,
        body: mailBodyRef.current.value,
      }

      sendRequest({
        url: `https://mailbox-client-ac835-default-rtdb.firebaseio.com/rec${receiverMail}.json`,
        method: "POST",
        body: recevierMailData
      });
      sendRequest({
        url: `https://mailbox-client-ac835-default-rtdb.firebaseio.com/sent${senderMail}.json`,
        method: "POST",
        body: senderMailData
      });
  
      dispatch(uiActions.handleShow());
  };

  return (
    <Modal show={show} onHide={() => dispatch(uiActions.handleShow())}>
      <Modal.Header closeButton>
        <Modal.Title>New Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={composeMailHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              ref={emailRef}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="subject"
              autoFocus
              ref={subjectRef}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} ref={mailBodyRef} required/>
          </Form.Group>
          <Button variant="primary" type="submit">Send</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ComposeMail;