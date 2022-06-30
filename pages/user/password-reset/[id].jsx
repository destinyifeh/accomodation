import { useState, useEffect } from "react";
import Header from "../../../components/Header2";

const PasswordReset = (props) => {
  const style = {
    padding: "15px",
    background: "#e94b3cff",
    color: "white",

    boxShadow: "0px 2px 2px gray",
    borderRadius: "10px",
  };

  return (
    <>
      <Header />
      <section className="login p-3 mx-3 md:mx-auto md:w-1/2" style={style}>
        <h4 className="text-center" id="h4">
          Enter New Password
        </h4>
        <form className="p-2 login-form">
          <div className="">
            <h5 id="h5" className="flex justify-left">
              Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password"
              placeholder="Enter your new password"
            />
          </div>

          <div className="">
            <h5 id="h5" className="flex justify-left mt-2">
              Re-enter Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password"
              placeholder="Re-enter your new password"
            />
          </div>

          <div className="">
            <button type="submit" className="w-full bg-black p-2 mt-3">
              Proceed
            </button>
          </div>
        </form>
        {/* <div className="p-2">
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
        </div> */}
      </section>
    </>
  );
};

export default PasswordReset;
