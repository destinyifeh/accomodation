import { useState, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import LoadingBar from "react-top-loading-bar";
import styles from "../styles/components.module.css";
import { currentAgent } from "../utils/constants";
import { currentUser } from "../services/requesters";
import {
  logoutCurrentAgent,
  sessionExpires,
  removeToken,
} from "../services/requesters";
export default function Header(props) {
  const [user, setUser] = useState(true);
  const [user2, setUser2] = useState(false);
  const ref = useRef(null);

  const {
    show,
    setShow,
    remove,
    setRemove,
    login,
    register,
    setLogin,
    setRegister,
  } = props;

  const handleShow = () => {
    setShow(false);
    setRemove(true);
  };

  const handleRemove = () => {
    setShow(true);
    setRemove(false);
  };

  const handleUser = () => {
    setLogin(true);
    //setRegister(false);
    //setUser(false)
    //setUser2(true);
  };

  const handleLoader = () => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
    }, 6000);
  };

  const handleLogout = (currentAgent) => {
    console.log(currentAgent);
    removeToken();
    logoutCurrentAgent();
    sessionExpires();
    toast.success("Logged out");
    window.location.reload();
  };

  const style = {
    fontWeight: "bold",
    fontSize: "1.2em",
    cursor: "pointer",
  };

  return (
    <>
      <div>
        <LoadingBar color="#e94b3cff" ref={ref} />
      </div>
      <header className=" p-3 flex justify-around " id={styles.header}>
        {show ? (
          <i
            className="fa fa-bars md:hidden"
            style={style}
            onClick={handleShow}
          ></i>
        ) : (
          <i
            className="fa fa-remove md:hidden"
            style={style}
            onClick={handleRemove}
          ></i>
        )}

        <span
          className="font-bold cursor-pointer "
          translate="no"
          onClick={() => (window.location.href = "/")}
        >
          Accommo<span className={styles.logo}>dation</span>
        </span>
        <div className="hidden md:block" id={styles.navigation}>
          <a className="" href="/" onClick={handleLoader}>
            Home
          </a>
          <a className="" href="/about" onClick={handleLoader}>
            About
          </a>
          <a className="" href="/contact" onClick={handleLoader}>
            Contact
          </a>
          <a className="" href="/mission" onClick={handleLoader}>
            Mission
          </a>
          <a className="" href="/vision" onClick={handleLoader}>
            Vision
          </a>
          <a className="" href="/properties" onClick={handleLoader}>
            Properties
          </a>
          <a href="/agents" className="" onClick={handleLoader}>
            Agents
          </a>
          <a className="" href="/agent/dashboard" onClick={handleLoader}>
            Agent Dashboard
          </a>
        </div>
        {currentUser(currentAgent) ? (
          <>
            <p
              className="cursor-pointer"
              onClick={() =>
                handleLogout(
                  currentUser(currentAgent) ? currentUser(currentAgent) : " "
                )
              }
            >
              Logout
              <span
                className=""
                style={{
                  color: "#e94b3cff",
                  fontSize: "13px",
                  marginLeft: "2px",
                  cursor: "pointer",
                }}
              >
                ({currentUser(currentAgent).firstName})
              </span>
            </p>
          </>
        ) : (
          <>
            {login ? (
              <i className="fa fa-user-circle" style={style}></i>
            ) : (
              <i
                className="fa fa-user-circle"
                style={style}
                onClick={handleUser}
              ></i>
            )}
          </>
        )}
      </header>
    </>
  );
}
