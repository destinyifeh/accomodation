import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import Link from "next/link";
import Typeds from "../components/Typed";
import agent1 from "../public/images/staff1.jpg";
import agent2 from "../public/images/staff5.jpg";
import agent3 from "../public/images/staff3.jpg";
import user1 from "../public/images/staff2.jpg";
import user2 from "../public/images/staff4.jpg";
import user3 from "../public/images/staff6.jpg";

import Posts from "./home";
import Footer from "../components/Footer";
import Ad from "../components/Ad";
import Ad2 from "../components/Ad2";
import Info from "../components/Info";
import Loader from "../components/Loader";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Register from "../components/Register";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import { getAgents } from "../services/agents/api";
import { getProperties } from "../services/property/api";
export default function Home() {
  console.log(agents, "agents");
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState(true);
  const [rent, setRent] = useState(false);
  const [show, setShow] = useState(true);
  const [remove, setRemove] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [properties, setProperties] = useState("");
  const [agents, setAgents] = useState([]);

  async function sendRequest() {
    try {
      const { data } = await getProperties();
      const properties = data;
      setProperties(properties);
      console.log("prop", properties);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendRequestAgent() {
    try {
      const { data } = await getAgents;
      const agents = data;
      setAgents(agents);
      console.log("agentshow", agents);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    sendRequest();
    sendRequestAgent();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 8000);
  }, []);

  const handleRent = () => {
    setSales(false);
    setRent(true);
  };

  const handleSales = () => {
    setSales(true);
    setRent(false);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (rent === true) {
      console.log("Rent is true");
      window.location.href = "/properties/query/rent";
    } else {
      if (sales === true) {
        console.log("Sale is true");
        window.location.href = "/properties/query/sale";
      }
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Home - Accommodation</title>
          <meta name="url" content="https://accomodation.vercel.app" />
        </Head>

        <Header
          show={show}
          remove={remove}
          setShow={setShow}
          setRemove={setRemove}
          setLogin={setLogin}
          login={login}
          setRegister={setRegister}
          register={register}
          agents={agents}
        />

        <main className=" text-white text-center">
          <section className="card-top">
            {forgot ? (
              <ForgotPassword
                login={login}
                setLogin={setLogin}
                register={register}
                setRegister={setRegister}
                forgot={forgot}
                setForgot={setForgot}
                agents={agents}
              />
            ) : (
              " "
            )}

            {register ? (
              <Register
                login={login}
                setLogin={setLogin}
                register={register}
                setRegister={setRegister}
                setForgot={setForgot}
                agents={agents}
              />
            ) : (
              " "
            )}
            {login ? (
              <Login
                login={login}
                setLogin={setLogin}
                register={register}
                setRegister={setRegister}
                setForgot={setForgot}
                agents={agents}
              />
            ) : (
              ""
            )}
            {remove ? (
              <Fade top>
                <MobileNav />
              </Fade>
            ) : (
              ""
            )}
            <Typeds />
            <h5 className="prose-headings prose-h1">
              What accommodation are you looking for?{" "}
            </h5>

            <div className="flex justify-center">
              {sales ? (
                <h5
                  className=" sales text-white p-2 "
                  style={{ cursor: "pointer" }}
                >
                  Sale
                </h5>
              ) : (
                <h5
                  className=" text-white p-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleSales}
                >
                  Sale
                </h5>
              )}
              {rent ? (
                <h5
                  className=" rent text-white p-2 "
                  style={{ cursor: "pointer" }}
                >
                  Rent
                </h5>
              ) : (
                <h5
                  className="  text-white p-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleRent}
                >
                  Rent
                </h5>
              )}
            </div>
            <div className=" " id="searchForm">
              <form
                className="flex justify-center rounded p-3"
                onSubmit={submitSearch}
              >
                {sales ? (
                  <>
                    <div>
                      <h5 className="">Location</h5>

                      <select className="p-3 text-black">
                        <option>All</option>
                      </select>
                    </div>
                    <div>
                      <h5 className="">Property</h5>
                      <select className="p-3 text-black mx-2">
                        <option>Sale</option>
                      </select>
                    </div>
                    <div>
                      <h5 className="">Budget</h5>

                      <select className=" text-black p-3 ">
                        <option>All</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h5 className="">Location</h5>

                      <select className="p-3 text-black">
                        <option>All</option>
                      </select>
                    </div>
                    <div>
                      <h5 className="">Property</h5>
                      <select className="p-3 text-black mx-2">
                        <option>Rent</option>
                      </select>
                    </div>
                    <div>
                      <h5 className="">Budget</h5>

                      <select className=" text-black p-3 ">
                        <option>All</option>
                      </select>
                    </div>
                  </>
                )}
                <div className="">
                  <button
                    className=" text-white p-3 ml-2 mt-6 "
                    id="searchBtn"
                    type="submit"
                  >
                    <span className="hidden md:inline">
                      <i className="fa fa-search"></i>
                    </span>{" "}
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:flex lg:justify-around lg:gap-0 text-white my-4 ">
              <span
                className="cursor-pointer"
                onClick={() => (window.location.href = "/properties")}
              >
                <div className="building">
                  <Image
                    className="img"
                    src="/images/new1.png"
                    alt=""
                    width={70}
                    height={70}
                    style={{ color: "green" }}
                  />
                </div>
                <h5 className="">Office Space</h5>
              </span>

              <span
                className="cursor-pointer"
                onClick={() => (window.location.href = "/properties")}
              >
                <div className="building">
                  <Image
                    className="text-white"
                    src="/images/new2.png"
                    alt=""
                    width={70}
                    height={70}
                  />
                </div>
                <h5 className="">Homes</h5>
              </span>

              <span
                className="cursor-pointer"
                onClick={() => (window.location.href = "/properties")}
              >
                <div className="building">
                  <Image
                    className="text-white"
                    src="/images/new4.png"
                    alt=""
                    width={70}
                    height={70}
                  />
                </div>
                <h5 className="">Villas</h5>
              </span>
              <span
                className="cursor-pointer"
                onClick={() => (window.location.href = "/properties")}
              >
                <div className="building">
                  <Image
                    className="text-white"
                    src="/images/new6.png"
                    alt=""
                    width={70}
                    height={70}
                  />
                </div>
                <h5 className="">Apartments</h5>
              </span>
            </div>
            <Info />
          </section>
        </main>
        <main className="hidden md:block">
          <Ad />

          <section className="info p-3 md:grid grid-cols-3 md:gap-4 container mx-auto my-2">
            <div className="p-2">
              <h2 id="h2" className=" font-bold my-3">
                We connect our visitors who are in search for accommodation to
                rent or properties to buy to the appropriate agents
              </h2>
              <p>
                Making sure our clients get the best. We act as a third party
                between our clients and registered agents. Our aim is to ensure
                you get easy access to hundreds of available properties both for
                rent and sale, posted here on daily basis by registered agents
              </p>
              <div className="mt-3">
                <p>
                  <i className="fa fa-check p-2"></i>{" "}
                  <span>24/7 Customer support service</span>
                </p>
                <p>
                  <i className="fa fa-check p-2"></i>{" "}
                  <span> We provides advisory services </span>
                </p>
                <p>
                  <i className="fa fa-check p-2"></i>{" "}
                  <span>Free and easy access </span>
                </p>

                <p className="p-link mb-3 ml-4">
                  <a className="font-bold contact-link rounded-lg " href="">
                    Contact us now
                  </a>
                </p>
              </div>
              <Ad2 />
            </div>

            <div className="p-2">
              <h2 className=" font-bold lg:text-center my-3" id="h2">
                Registered Agents{" "}
              </h2>
              <div className="agents-card mt-3">
                <Image
                  className="agent-pic"
                  width={50}
                  height={50}
                  alt="agent pic"
                  src={agent1}
                />
                <h3 className="font-bold mt-3" id="h3">
                  Nosa Omorodion
                </h3>
                <h4 className="agent-status" id="h4">
                  property agent
                </h4>
                <p className="mb-3">
                  {" "}
                  Mr Nosa is a certified property manager and agent who is
                  committed and dedicated as well as trust worthy{" "}
                </p>
                <span className="stars text-blue-700 ">
                  Verified<i className="fa fa-check "></i>
                </span>
              </div>

              <div className="agents-card mt-3">
                <Image
                  className="agent-pic"
                  width={50}
                  height={50}
                  alt="agent pic"
                  src={agent2}
                />
                <h3 className="font-bold mt-3" id="h3">
                  Rebecca Peterson
                </h3>
                <h4 className="agent-status" id="h4">
                  property agent /project manager
                </h4>
                <p className="mb-3">
                  {" "}
                  Rebecca is professional property agent with over ten years of
                  experience{" "}
                </p>
                <span className="stars text-blue-700 ">
                  Verified<i className="fa fa-check "></i>
                </span>
              </div>

              <div className="agents-card mt-3">
                <Image
                  className="agent-pic"
                  width={50}
                  height={50}
                  alt="agent pic"
                  src={agent3}
                />
                <h3 className="font-bold mt-3" id="h3">
                  Kunle Ariyo
                </h3>
                <h4 className="agent-status" id="h4">
                  house agent
                </h4>
                <p className="mb-3">
                  Property agent based in lagos state, Nigeria. Kunle is a
                  experience house agent, Kunle is one of the most reliable and
                  active agent on this platform
                </p>
                <span className="stars text-blue-700 ">
                  Verified<i className="fa fa-check "></i>
                </span>
              </div>
            </div>
            <div className="p-2">
              <h2 className=" font-bold lg:text-center my-3" id="h2">
                Testimonies{" "}
              </h2>
              <div className="agents-card mt-3">
                <Image
                  className="agent-pic"
                  width={50}
                  height={50}
                  alt="agent pic"
                  src={user1}
                />
                <h3 className="font-bold mt-3" id="h3">
                  Umaru Musa
                </h3>
                <h4 className="agent-status" id="h4">
                  house buyer
                </h4>
                <p>
                  I got connected to an agent on this website and within a week
                  i got myself a new home. very grateful!
                </p>
                <span className="stars">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
              </div>

              <div className="agents-card mt-3">
                <Image
                  className="agent-pic"
                  width={50}
                  height={50}
                  alt="agent pic"
                  src={user2}
                />
                <h3 className="font-bold mt-3" id="h3">
                  Tunde Ibrahim
                </h3>
                <h4 className="agent-status" id="h4">
                  house buyer
                </h4>
                <p>
                  I am super proud of this website, they have done a wondeful
                  job
                </p>
                <span className="stars">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
              </div>

              <div className="agents-card mt-3">
                <Image
                  className="agent-pic"
                  width={50}
                  height={50}
                  alt="agent pic"
                  src={user3}
                />
                <h3 className="font-bold mt-3" id="h3">
                  Chioma Uche
                </h3>
                <h4 className="agent-status" id="h4">
                  {" "}
                  apartment rental
                </h4>
                <p>
                  I finally rented an apartment for myself through this site
                  after months of searching for apartment here in lagos
                </p>
                <span className="stars">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </span>
              </div>
            </div>
          </section>

          <Posts />

          {/* <div className="mt-8 text-center">
            <Link href="/properties">
              <h5
                className="text-center exp p-3"
                id="h5"
                style={{
                  fontSize: "1.3em",
                  color: "#ffff",
                  cursor: "pointer",
                  backgroundColor: "#2d2926ff",
                  width: "50%",
                  margin: "auto",
                  boxShadow: "0px 2px 2px grey",
                  borderRadius: "10px",
                }}
              >
                Explore more <i className="fa fa-arrows-h"></i>
              </h5>
            </Link>
          </div> */}

          <section className="others">
            <div className=""></div>
          </section>

          <Footer />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Loader />
      </>
    );
  }
}

// export async function getStaticProps() {
//   const { data } = await getAgents;
//   const agents = data;
//   return {
//     props: {
//       agents: agents,
//     },
//   };
// }
