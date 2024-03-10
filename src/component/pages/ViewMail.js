import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { mailActions } from "../../store/mail-slice"


const ViewMail = (props) => {
   
    const viewMail = useSelector(state => state.mail.viewMail)
    const view=useSelector(state=>state.mail.view)
    const dispatch = useDispatch()
    const viewMailHandler = () => {
        dispatch(mailActions.mailHandler())
    }
const email=localStorage.getItem('email');
const mail=email.replace('@','').replace('.','');
    const deleteMailHandler = async () => {
       
        console.log(view.id)
        if (props.type === "received") {
         const response =await fetch (`https://mailbox-client-ac835-default-rtdb.firebaseio.com/rec${mail}/${view.id}.json`,
          {method:'DELETE',
        }
          )
          dispatch(mailActions.deleteReceivedMail({id: view.id}));
        }else{
            const url = await fetch (`https://mailbox-client-ac835-default-rtdb.firebaseio.com/sent${mail}/${view.id}.json`,
            {method:'DELETE',
          }
            );
          dispatch(mailActions.deleteSentMail({id: view.id}));
        }

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
        <Modal.Body>
          {console.log(view)}

          {view.body}

        </Modal.Body>
        <Modal.Footer>

          <Button variant="danger" onClick={deleteMailHandler}>Delete</Button>
        </Modal.Footer>
      </Modal>
    )
}


export default ViewMail;