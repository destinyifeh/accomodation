import { useState } from "react";
import { DotPulse } from "@uiball/loaders";
import { toast } from "react-toastify";
import { sendForgotEmail } from "../services/agents/api";

const ForgotPassword = (props) => {
  const {
    login,
    setLogin,
    register,
    setRegister,
    forgot,
    setForgot,

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
    setForgot(false);
  };

  const handleLogin = () => {
    setLogin(true);
    setRegister(false);
    setForgot(false);
  };

  const handleRegister2 = () => {
    setLogin2(false);
    setRegister2(true);
    setForgot2(false);
  };

  const handleLogin2 = () => {
    setLogin2(true);
    setRegister2(false);
    setForgot2(false);
  };

  const style = {
    position: "absolute",
    right: 0,
    padding: "15px",
    background: "#e94b3cff",
    zIndex: 2,
    color: "white",
    marginRight: "5px",
  };

  const handleRemove = () => {
    setForgot(false);
  };

  const handleRemove2 = () => {
    setForgot2(false);
  };

  const [email, setEmail] = useState(" ");
  const [status, setStatus] = useState({
    isSubmitting: false,
    isError: false,
    isSubmitted: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("agents forgot", agents);
    setStatus({ isSubmitting: true });
    const mail = {
      email: email,
    };
    try {
      if (email === " ") {
        console.log("Please enter your email");
        toast.info("Please enter your email");
        return false;
      } else {
        console.log(email, "em");
        const response = await sendForgotEmail(mail);
        console.log(response.data);
        setStatus({ isSubmitting: false });
        if (response.data === "Agent not found") {
          toast.error("No agent with this email found");
          return false;
        } else {
          window.location.href = "/user/password-reset-code";
          return true;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops! 500 server error");

      setStatus({ isSubmitting: false });
    }
  }

  return (
    <>
      <section className="login p-3" style={style}>
        <i
          className="fa fa-remove float-right"
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={forgot ? handleRemove : handleRemove2}
        ></i>
        <h4 className="text-center" id="h4">
          Forgot Password Form
        </h4>
        <form className="p-2 login-form" onSubmit={handleSubmit}>
          <div className="">
            <h5 id="h5" className="flex justify-left">
              Email
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="">
            <button
              type="submit"
              className="w-full  p-2 mt-3"
              style={
                status.isSubmitting
                  ? { background: "#3a3b3c" }
                  : { background: "black" }
              }
              disabled={status.isSubmitting}
            >
              {status.isSubmitting ? (
                <div className=" flex justify-center">
                  <DotPulse size={40} speed={1.3} color="white" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <div className="p-2">
          <a
            href="#"
            className="float-left "
            onClick={forgot ? handleLogin : handleLogin2}
          >
            SignIn <i className="fa fa-arrow-circle-o-right"></i>
          </a>

          <br />
          <a
            href="#"
            className="float-left "
            onClick={forgot ? handleRegister : handleRegister2}
          >
            Register as an agent <i className="fa fa-arrow-circle-o-right"></i>{" "}
          </a>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
