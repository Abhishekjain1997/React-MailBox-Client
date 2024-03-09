import { useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import ViewMail from "./ViewMail";
import useHttp from "../../hooks/use-http";

const SentMail = () => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const { sentMail, changed } = useSelector((state) => state.mail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail.replace("@", "").replace(".", "");
  console.log(email);
  const viewMailHandler = () => {
    dispatch(mailActions.mailHandler());
  }; 
   
  useEffect(() => {
    const transformData = (data) => {
      const newData = [];
      for (let key in data) {
        newData.push({ id: key, ...data[key] });
      }
      dispatch(mailActions.updateSentMail({ mail: newData }));
    };
    sendRequest(
      {
        url: `https://mailbox-client-ac835-default-rtdb.firebaseio.com/sent${email}.json`,
      },
      transformData
    );
  }, [sendRequest, changed, dispatch, email]);

  return (
    <Card>
      <Card.Header>Sent Mail</Card.Header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Content</th>
            <th>Sent To</th>
          </tr>
        </thead>
        <tbody>
          {sentMail.map((mail) => (
            <tr key={mail.id}>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>{mail.sentTo}</td>
              <td>
                <Button variant="success" onClick={viewMailHandler}>
                  View
                </Button>
              </td>
              <ViewMail mail={mail} email={email} type={"sent"} />
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default SentMail;