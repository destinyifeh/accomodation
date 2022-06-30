import { useState, useRef } from "react";
import Link from "next/link";

import LoadingBar from "react-top-loading-bar";
import styles from "../styles/components.module.css";

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
          Accomo<span className={styles.logo}>dation</span>
        </span>
        <div className="hidden md:block" id={styles.navigation}>
          <Link className="" href="/">
            Home
          </Link>
          <Link className="" href="/about">
            About
          </Link>
          <Link className="" href="/contact">
            Contact
          </Link>
          <Link className="" href="/mission">
            Mission
          </Link>
          <Link className="" href="/vision">
            Vision
          </Link>
          <Link className="" href="/properties" onClick={handleLoader}>
            Properties
          </Link>
          <Link className="" href="/properties/add">
            Create
          </Link>
        </div>

        {login ? (
          <i className="fa fa-user-circle" style={style}></i>
        ) : (
          <i
            className="fa fa-user-circle"
            style={style}
            onClick={handleUser}
          ></i>
        )}
      </header>
    </>
  );
}
