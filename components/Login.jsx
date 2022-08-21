import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DotPulse } from "@uiball/loaders";
import { useRouter } from "next/router";

import { sendLogin } from "../services/agents/api";
import {
  saveToken,
  saveUser,
  currentUser,
  setSession,
} from "../services/requesters";
import { token, currentAgent, session } from "../utils/constants";
import { loggedinTime } from "../utils/helper";

const Login = (props) => {
  const router = useRouter();

  const {
    login,
    setLogin,
    register,
    setRegister,
    setForgot,
    forgot,
    forgot2,
    setForgot2,
    login2,
    setLogin2,
    register2,
    setRegister2,
    agents,
  } = props;

  const handleRegister = () => {
    setLogin(false);
    setRegister(true);
    // setRegister2(false);
    // setLogin2(false);
  };

  const handleRegister2 = () => {
    setRegister2(true);
    setLogin2(false);
  };

  const handleForgot = () => {
    setLogin(false);
    setRegister(false);
    // setLogin2(false);
    //setRegister2(false);
    setForgot(true);
    //setForgot2(true);
  };

  const handleForgot2 = () => {
    setLogin2(false);
    setRegister2(false);
    setForgot2(true);
  };

  const style = {
    position: "absolute",
    right: 0,
    zIndex: 2,
    padding: "15px",
    background: "#e94b3cff",
    marginRight: "5px",
    color: "white",
  };

  const handleRemove = () => {
    setLogin(false);
  };

  const handleRemove2 = () => {
    setLogin2(false);
  };

  const [formData, setFormData] = useState({ email: " ", password: " " });
  const [submitting, setSubmitting] = useState(false);
  async function handleLoginSubmit(e) {
    try {
      e.preventDefault();
      // const checkEmail = agents?.map((agent) => agent.email);
      setSubmitting(true);
      const loggedIn = currentUser(currentAgent);
      console.log(loggedIn, "logged");
      if (loggedIn) {
        console.log("You already logged in");
        toast.info("You already logged in");
        setSubmitting(false);

        return false;
      } else if (!formData.email) {
        console.log("Enter email");
        toast.info("Enter email");
        setSubmitting(false);

        return false;
      } else if (!formData.password) {
        console.log("Enter password");
        toast.info("Enter password");
        setSubmitting(false);

        return false;
      } else {
        sendLogin(formData)
          .then((res) => {
            const data = res.data;
            console.log("Loggedin user", data);
            if (data === "Incorrect password") {
              toast.error("Incorrect password");
              setSubmitting(false);
              return false;
            }

            if (data === "No agent found") {
              toast.error("No agent with this email found");
              setSubmitting(false);
              return false;
            } else {
              toast.success("Loggedin");
              saveUser(currentAgent, data);
              saveToken(token, data._id);
              setSession(session, loggedinTime());
              setSubmitting(false);
              router.push("/agent/dashboard");
            }
          })

          .catch((err) => {
            console.log(err);
            toast.error("Oops! 500 ,Server error occurred");
            setSubmitting(false);
          });
      }
    } catch (err) {
      console.log(err);
      toast.error("Oops! An error occurred");
    }
  }

  return (
    <>
      <section className="login p-3" style={style}>
        <i
          className="fa fa-remove float-right"
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={login ? handleRemove : handleRemove2}
        ></i>

        <h4 className="text-center" id="h4">
          Agent Login Form
        </h4>
        <form className="p-2 login-form" onSubmit={handleLoginSubmit}>
          <div className="my-3">
            <h5 id="h5" className="flex justify-left">
              Email
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="">
            <h5 id="h5" className="flex justify-left">
              Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="">
            <button
              type="submit"
              className="w-full  p-2 mt-3"
              style={
                submitting ? { background: "#3a3b3c" } : { background: "black" }
              }
              disabled={submitting}
            >
              {submitting ? (
                <div className=" flex justify-center">
                  <DotPulse size={40} speed={1.3} color="white" />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="p-2">
          <a
            href="#"
            className="float-left "
            onClick={login ? handleForgot : handleForgot2}
          >
            Forgot password? <i className="fa fa-arrow-circle-o-right"></i>
          </a>

          <br />
          <a
            href="#"
            className="float-left "
            onClick={login ? handleRegister : handleRegister2}
          >
            Register as an agent <i className="fa fa-arrow-circle-o-right"></i>{" "}
          </a>
        </div>
      </section>
    </>
  );
};

export default Login;
