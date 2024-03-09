import { Link, Outlet } from "react-router-dom";
import classes from "./Header.module.css";
import { authActions } from "../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import ComposeMail from "../pages/ComposeMail";
import { uiActions } from "../../store/ui-slice";
import { mailActions } from "../../store/mail-slice";

const Header = () => {
  const dispatch = useDispatch();
  const mail = useSelector((state) => state.auth.email);
  const logoutHandler = () => {
    dispatch(authActions.logout())
    dispatch(mailActions.updateReceivedMail({mail: []}))
    dispatch(mailActions.updateSentMail({mail: []}))
  }

  return (
    <main>
      <header className={classes.header}>
        <h1 className={classes["header-title"]}>Mailbox</h1>
        <div className={classes.actions}>
          <button onClick={() => dispatch(uiActions.handleShow())}>
            Compose
          </button>
        </div>
        <div className={classes.actions}>
          <Link to="inbox">Inbox</Link>
        </div>
        <div className={classes.actions}>
          <Link to="sent">Sent Mail</Link>
        </div>

        <div className={classes.actions}>
          <h6>{mail}</h6>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </header>
      <ComposeMail />
      <Outlet/>
    </main>
  );
};

export default Header;