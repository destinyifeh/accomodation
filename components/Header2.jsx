import { useState, useEffect } from "react";
import Link from "next/link";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "./ForgotPassword";
import MobileNav from "./MobileNav";
import styles from "../styles/components.module.css";

export default function Header2(props) {
  const [user, setUser] = useState(true);
  const [user2, setUser2] = useState(false);
  const [show2, setShow2] = useState(true);
  const [remove2, setRemove2] = useState(false);
  const [login2, setLogin2] = useState(false);
  const [register2, setRegister2] = useState(false);
  const [forgot2, setForgot2] = useState(false);
  const [current, setCurrent] = useState("");

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
          Accomo<span className={styles.logo}>dation</span>
        </span>
        <div className="hidden md:block" id={styles.navigation}>
          <Link href="/">Home</Link>
          <Link href="/about" className="">
            About
          </Link>
          <Link href="/contact">Contact</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/vision">Vision</Link>
          <Link href="/properties" className="">
            Properties
          </Link>
        </div>

        {login2 ? (
          <i className="fa fa-user-circle" style={style}></i>
        ) : (
          <i
            className="fa fa-user-circle"
            style={style}
            onClick={handleUser}
          ></i>
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
