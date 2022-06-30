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
        <form className="p-2 login-form">
          <div className="">
            <h5 id="h5" className="flex justify-left">
              Email
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="email"
              name="email"
              id="email"
            />
          </div>

          <div className="">
            <button type="submit" className="w-full bg-black p-2 mt-3">
              Submit
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
