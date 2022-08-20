import Head from "next/head";
import { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import Header from "./Header";
import {
  setPath,
  getPath,
  currentUser,
  getToken,
  getSession,
} from "../services/requesters";
import { currentPage, currentAgent, token, session } from "../utils/constants";
import { currentTime } from "../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
    }, 6000);
  }, []);
  useEffect(() => {
    console.log(currentUser(currentAgent), "i got");
    console.log(getToken(token), "i token");
    console.log(JSON.parse(localStorage.getItem("session")), "session");
    const dato = new Date().getTime();
    console.log(dato, "the time");
    console.log(currentTime(), "cur");

    const expireAt = getSession(session);
    console.log("expreAt", expireAt);
  }, []);

  return (
    <>
      <Head>
        <title>Welcome - Accomodation</title>

        <meta
          name="keywords"
          content="rent, accomodations, properties, house agents, house for sale"
        />
        <meta name="url" content="http://localhost:3000" />
        <meta
          name="description"
          content="Linking up clients, house agents and house owners"
        />
        <meta name="site_name" content="Accomodation" />
        <meta name="key_type" content="website" />
      </Head>
      <div>
        <LoadingBar color="black" ref={ref} />
      </div>
      <ToastContainer
        className="text-center"
        position="top-center"
      ></ToastContainer>
      {children}
    </>
  );
}
