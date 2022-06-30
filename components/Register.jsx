const Register = (props) => {
  const {
    register,
    setRegister,
    setLogin,
    setForgot,
    forgot2,
    setForgot2,
    login2,
    setLogin2,
    register2,
    setRegister2,
  } = props;

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
    setRegister(false);
  };

  const handleRemove2 = () => {
    setRegister2(false);
  };

  if (register) {
    setLogin(false);
  }

  const handleLogin = () => {
    setRegister(false);
    setForgot(false);
    setLogin(true);
  };

  const handleLogin2 = () => {
    setRegister2(false);
    setForgot2(false);
    setLogin2(true);
  };

  return (
    <>
      <section className="login p-3" style={style}>
        <i
          className="fa fa-remove float-right"
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={register ? handleRemove : handleRemove2}
        ></i>

        <h4 className="text-center" id="h4">
          Agent Registration Form
        </h4>
        <form className="p-2 login-form">
          <div className="">
            <h5 id="h5" className="flex justify-left">
              First Name
            </h5>
            <input
              className="w-full rounded-lg text-black onse"
              type="text"
              name="firstname"
            />
          </div>
          <div className="">
            <h5 id="h5" className="flex justify-left">
              Last Name
            </h5>
            <input
              className="w-full rounded-lg text-black "
              type="text"
              name="lastname"
            />
          </div>

          <div className="">
            <h5 id="h5" className="flex justify-left">
              Date of Birth
            </h5>
            <input
              className="bg-grey-700 w-full rounded-lg text-black"
              type="date"
              name="dob"
            />
          </div>
          <div className="">
            <h5 id="h5" className="flex justify-left">
              Residential State
            </h5>
            <select className="w-full rounded-lg text-black" name="">
              <option name="abuja">Abuja</option>
              <option name="lagos">Lagos</option>
              <option name="kano">Kano</option>
              <option name="imo">Imo</option>
              <option name="edo">Edo</option>
            </select>
          </div>

          <div className="">
            <h5 id="h5" className="flex justify-left">
              Gender
            </h5>
            <select className="w-full rounded-lg text-black">
              <option name="male">Male</option>
              <option name="female">Female</option>
            </select>
          </div>

          <div className="">
            <h5 id="h5" className="flex justify-left">
              Picture
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="file"
              name="image"
            />
          </div>

          <div className="">
            <h5 id="h5" className="flex justify-left">
              Email
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="email"
              name="email"
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
            <h5 id="h5" className="flex justify-left">
              Confirm Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password2"
            />
          </div>

          <div className="">
            <button type="submit" className="w-full bg-black p-2 mt-3">
              Submit
            </button>
          </div>
        </form>

        <a href="#" onClick={register ? handleLogin : handleLogin2}>
          Login existing agent <i className="fa fa-arrow-circle-o-right"></i>
        </a>
      </section>
    </>
  );
};

export default Register;
