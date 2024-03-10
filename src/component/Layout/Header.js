import React, {useEffect} from 'react';
import useHttp from '../../hooks/use-http';
import { Link, Outlet } from "react-router-dom";
import classes from "./Header.module.css";
import { authActions } from "../../store/auth-slice";
import { useDispatch,useSelector } from "react-redux";
import ComposeMail from "../pages/ComposeMail";
import { uiActions } from "../../store/ui-slice";
import { mailActions } from "../../store/mail-slice";

const Header = () => {
  const { sendRequest } = useHttp();
    const dispatch = useDispatch();
    const mail = useSelector((state) => state.auth.email);
    const unread=useSelector(state=>state.mail.count);
    console.log(unread)
    const logoutHandler = () => {
      dispatch(authActions.logout())
      dispatch(mailActions.updateReceivedMail({mail: []}))
      dispatch(mailActions.updateSentMail({mail: []}))
    }

    const { receivedMail, changed } = useSelector((state) => state.mail);
    const senderMail = useSelector((state) => state.auth.email);
    const email = senderMail.replace("@", "").replace(".", "");
    
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
         <main>
      <header className={classes.header}>
        <h1 className={classes["header-title"]}>Mailbox</h1>
        <div className={classes.actions}>
          {/* <Link to="/compose">Compose</Link> */}
          <button onClick={() => dispatch(uiActions.handleShow())}>
            Compose
          </button>
        </div>
        <div className={classes.actions}>
          <Link className={classes.links} to="inbox">Inbox { unread }</Link>
        </div>
        <div className={classes.actions}>
          <Link className={classes.links} to="sent">Sent Mail</Link>
        </div>
        <div className={classes.actions}>
        <h6>{mail}</h6>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </header>
      <ComposeMail/>
      <Outlet/>
    </main>

    )
}



export default Header;