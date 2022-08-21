import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "./ForgotPassword";
import MobileNav from "./MobileNav";
import styles from "../styles/components.module.css";
import { currentAgent } from "../utils/constants";
import { currentUser } from "../services/requesters";
import {
  logoutCurrentAgent,
  sessionExpires,
  removeToken,
} from "../services/requesters";
export default function Header2(props) {
  const [user, setUser] = useState(true);
  const [user2, setUser2] = useState(false);
  const [show2, setShow2] = useState(true);
  const [remove2, setRemove2] = useState(false);
  const [login2, setLogin2] = useState(false);
  const [register2, setRegister2] = useState(false);
  const [forgot2, setForgot2] = useState(false);
  const [current, setCurrent] = useState("");
  const [logoutUser, setLogoutUser] = useState(false);
  useEffect(() => {
    const user = currentUser(currentAgent);
    setCurrent(user);
  }, []);

  const handleShow2 = () => {
    setShow2(false);
    setRemove2(true);
  };

  const handleRemove2 = () => {
    setShow2(true);
    setRemove2(false);
  };

  const handleUser = () => {
    setLogin2(true);
    //setRegister(false);
    //setUser(false)
    //setUser2(true);
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
      <header className=" p-3 flex justify-around " id={styles.header}>
        {show2 ? (
          <i
            className="fa fa-bars md:hidden"
            style={style}
            onClick={handleShow2}
          ></i>
        ) : (
          <i
            className="fa fa-remove md:hidden"
            style={style}
            onClick={handleRemove2}
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
          <a className="" href="/">
            Home
          </a>
          <a className="" href="/about">
            About
          </a>
          <a className="" href="/contact">
            Contact
          </a>
          <a className="" href="/mission">
            Mission
          </a>
          <a className="" href="/vision">
            Vision
          </a>
          <a className="" href="/properties">
            Properties
          </a>
          <a href="/agents" className="">
            Agents
          </a>
          <a className="" href="/agent/dashboard">
            Agent Dashboard
          </a>
        </div>
        {current ? (
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
                ({currentUser(currentAgent)?.firstName})
              </span>
            </p>
          </>
        ) : (
          <>
            {login2 ? (
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
      <div className="ml-4 mt-3">{remove2 ? <MobileNav /> : ""}</div>

      <div className="mt-3 mr-5">
        {login2 ? (
          <Login
            forgot2={forgot2}
            setForgot2={setForgot2}
            login2={login2}
            setLogin2={setLogin2}
            register2={register2}
            setRegister2={setRegister2}
            setLogoutUser={setLogoutUser}
            logoutUser={logoutUser}
          />
        ) : (
          " "
        )}
        {register2 ? (
          <Register
            forgot2={forgot2}
            setForgot2={setForgot2}
            login2={login2}
            setLogin2={setLogin2}
            register2={register2}
            setRegister2={setRegister2}
            setLogoutUser={setLogoutUser}
            logoutUser={logoutUser}
          />
        ) : (
          " "
        )}

        {forgot2 ? (
          <ForgotPassword
            forgot2={forgot2}
            setForgot2={setForgot2}
            login2={login2}
            setLogin2={setLogin2}
            register2={register2}
            setRegister2={setRegister2}
          />
        ) : (
          " "
        )}
      </div>
    </>
  );
}
