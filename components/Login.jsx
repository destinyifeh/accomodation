const Login = (props) => {
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
        <form className="p-2 login-form">
          <div className="my-3">
            <h5 id="h5" className="flex justify-left">
              Email
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="email"
              name="email"
              placeholder="Enter your email"
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
            />
          </div>

          <div className="">
            <button type="submit" className="w-full bg-black p-2 mt-3">
              Login
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
