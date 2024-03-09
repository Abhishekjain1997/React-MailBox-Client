import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import useHttp from "../../hooks/use-http";

const ViewMail = (props) => {
  const { sendRequest } = useHttp();
  const viewMail = useSelector((state) => state.mail.viewMail);
  const dispatch = useDispatch();
  const viewMailHandler = () => {
    dispatch(mailActions.mailHandler());
  };
  
  const deleteMailHandler = async () => {
    let url;
    if (props.type === "recevied") {
      url = `https://mailbox-client-ac835-default-rtdb.firebaseio.com/rec${props.email}/${props.mail.id}.json`;
      dispatch(mailActions.deleteReceivedMail(props.mail.id));
    } else {
      url = `https://mailbox-client-ac835-default-rtdb.firebaseio.com/sent${props.email}/${props.mail.id}.json`;
      dispatch(mailActions.deleteSentMail(props.mail.id));
    }
    sendRequest({
      url: url,
      method: "DELETE",
    });
    dispatch(mailActions.mailHandler());
  };
  return (
    <Modal
      show={viewMail}
      onHide={viewMailHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.mail.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteMailHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewMail;