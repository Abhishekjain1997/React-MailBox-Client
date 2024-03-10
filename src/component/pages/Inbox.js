import { useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import ViewMail from './ViewMail';
import useHttp from "../../hooks/use-http";

const Inbox = () => {
  const { sendRequest } = useHttp();
    const dispatch = useDispatch();
    
    const { receivedMail, changed } = useSelector((state) => state.mail);
    const senderMail = useSelector((state) => state.auth.email);
    const email = senderMail.replace("@", "").replace(".", "");
  
    console.log(receivedMail)

      const viewMailHandler = (mail) => {
        
        sendRequest({
          url: `https://mailbox-client-ac835-default-rtdb.firebaseio.com/rec${email}/${mail.id}.json`,
          method: "PUT",
          body: { ...mail, isRead: true },
        });
        console.log(mail);
        dispatch(mailActions.viewMailHandle({ id: mail.id, mail:mail }));

    };
    useEffect(() => {
      const transformData = (data) => {
        const newData = [];
  let count=0;
        for (let key in data) {
          newData.push({ id: key, ...data[key] });
          }
          for(let i=0;i<newData.length;i++){
            if(!newData[i].isRead){
count++
            }
          }
          dispatch(mailActions.updateCount({count:count}))
        dispatch(mailActions.updateReceivedMail({ mail: newData }));
      };
      sendRequest(
        {
          url: `https://mailbox-client-ac835-default-rtdb.firebaseio.com/rec${email}.json`,
        },
        transformData
      );
    }, [sendRequest, dispatch, email, changed]);
    
      return (
        <Card>
          <Card.Header>Inbox</Card.Header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>.</th>
                <th>Subject</th>
                <th>Content</th>
                <th>Sender</th>
              </tr>
            </thead>
            <tbody>
              {receivedMail.map((mail) => (
                <tr key={mail.id}>
                    <td style={{ color: "blue", fontSize: "40px" }}>
                {!mail.isRead && "."}
              </td>
                  <td>{mail.subject}</td>
                  <td>{mail.body}</td>
                  <td>{mail.sender}</td>
                  <td>
                  <Button variant="success" onClick={() => viewMailHandler(mail)}>
                  View
                </Button>
                  </td>
                  <ViewMail mail={mail} email={email} type={'received'}/>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      );
    };


export default Inbox