import Head from "next/head";
import { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import Header from "./Header";
import { setPath, getPath, pathname } from "../services/requesters";
import { currentPage } from "../utils/constants";
import { addMinute } from "../utils/helper";

export default function Layout({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
    }, 6000);

    let path = window.location.pathname;
    console.log(path);
    if (path) {
      setPath(currentPage, path);
    }
    console.log("des", getPath(currentPage));
  }, []);
  useEffect(() => {
    var dt = new Date();
    var later = dt.setHours(dt.getHours() + 3);
    console.log("min", later);
    console.log("today", addMinute());
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
      {children}
    </>
  );
}
