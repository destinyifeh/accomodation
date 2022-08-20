import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getToken, getSession } from "./requesters";

import { token, session } from "../utils/constants";
import { currentTime } from "../utils/helper";

import { logoutCurrentAgent, removeToken, sessionExpires } from "./requesters";

export const Auth = ({ children }) => {
  const [state, setState] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const isToken = getToken(token);
    const expireAt = getSession(session);
    const time = currentTime();
    if (isToken) {
      console.log("Token available");
      setState(true);
    } else {
      console.log("No token ");
      //toast.warn("Unauthorized! Login to gain access");
      // router.push("/");
      setState(false);
      window.location.href = "/";
    }

    setTimeout(() => {
      if (time > expireAt) {
        logoutCurrentAgent();
        sessionExpires();
        removeToken();
      }
    }, 2000);
  }, [router]);

  return (
    <>
      {state ? (
        <>{children}</>
      ) : (
        <div
          className="container md:container mx-auto p-5"
          style={{ marginTop: "10%" }}
        >
          <p
            className="mx-auto md:text-center text-lg"
            style={{ color: "red" }}
          >
            Unauthorized! login to gain access to this page.
          </p>
          <p className="text-center">Redirecting....</p>
        </div>
      )}
    </>
  );
};
