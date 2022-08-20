import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Header2 from "../../components/Header2";
import Footer from "../../components/Footer";
import { getProperties } from "../../services/property/api";
import { getAgents } from "../../services/agents/api";
import { minuteAgo } from "../../utils/formatters";
import Loading from "../../components/Loading";
export default function ShowAgent() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id, "agent id");
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loader, setLoader] = useState(true);
  const [share, setShare] = useState(true);
  const [social, setSocial] = useState("");
  const [share2, setShare2] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, []);

  async function sendRequest() {
    try {
      const { data } = await getProperties();
      const properties = data;
      setProperties(properties);
      console.log("the agent prop", properties);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendAgentRequest() {
    try {
      const { data } = await getAgents;
      const agents = data;
      setAgents(agents);
      console.log("the agents", agents);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    sendRequest();
    sendAgentRequest();
  }, []);

  const handleShare = (id) => {
    console.log(id);
    const thisProperty = properties.find((property) => property._id === id);
    console.log(thisProperty._id, "thisProp");

    setSocial(thisProperty._id);
    setShare2(true);
    setShare(false);
  };

  const handleShare2 = (id) => {
    console.log(id);
    setSocial(false);
    setShare2(false);
    setShare(true);
  };

  const theAgent = agents.find((agent) => agent._id === id);
  const agentProperties = properties.filter(
    (property) => property.agent === id
  );
  console.log(agentProperties, "agentProperties");
  console.log(theAgent, "theAgent");
  return (
    <>
      <Head>
        <title>
          {theAgent?.firstName} {theAgent?.lastName} - Accommodation
        </title>
        <meta
          name="url"
          content={`https://accomodation.vercel.app/agent/${id}`}
        />
      </Head>

      <Header2 />
      {loader ? (
        <div className="prop-loader ">
          <Loading />
        </div>
      ) : (
        <>
          <section className="my-4 mx-4">
            <div>
              <p className="text-lg text-center my-4">Agent Profile</p>
              <div
                className="p-4 "
                style={{
                  backgroundColor: "#fff",
                  color: "#e94b3cff",
                  borderRadius: 10,
                  boxShadow: "0px 2px 2px grey",
                  width: "fit-content",
                  padding: 10,
                  margin: "auto",
                }}
              >
                <span className="flex justify-center my-3">
                  <Image
                    width={50}
                    height={50}
                    src={theAgent.picture}
                    alt=""
                    className=""
                    style={{ borderRadius: "50%" }}
                  />
                </span>
                <p className="">
                  Agent Full Name:{" "}
                  <span
                    className="text-black "
                    style={{ textTransform: "capitalize" }}
                  >
                    {" "}
                    {theAgent?.firstName} {theAgent?.lastName}
                  </span>
                </p>
                <p>
                  Email:
                  <span className="text-black "> {theAgent?.email}</span>
                </p>
              </div>
            </div>
            <div>
              <p className="text-lg mt-8 text-center">Agent Properties</p>
              <p className="text-center">
                {agentProperties.length < 1 ? " No property yet" : " "}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {agentProperties.map((property, idx) => {
                  const propertyImage = JSON.parse(property.image);
                  const propertyAgent = agents.find(
                    (agent) => agent._id === property.agent
                  );
                  return (
                    <article key={idx} className="posts-card relative my-5 ">
                      <p className="text-1">{property.tag}</p>
                      <p className="text-2">New Offer</p>
                      <span className="relative">
                        <Image
                          className="post-pic"
                          width={650}
                          height={505}
                          alt="Property image"
                          // src="/images/ad3.jpg"
                          src={propertyImage[0]}
                        />

                        <p className="text-3 font-bold">
                          <a href={`/property/${property.slug}`}>
                            <i className="fa fa-map-marker"></i>{" "}
                            {property.address.slice(0, 23)}...
                          </a>
                        </p>
                        <p className="text-4 text-white">
                          <i className="fa fa-camera"></i> 9
                        </p>
                      </span>
                      <div className="card-body">
                        <h3
                          className="font-bold"
                          id="h3"
                          style={{ textTransform: "capitalize" }}
                        >
                          <a href={`/property/${property.slug}`}>
                            {property.title.slice(0, 33)}...
                          </a>
                        </h3>
                        <p className="naira my-2">N{property.price}</p>
                        {/* <p className="my-2">{property.detail}</p> */}
                        <span className="time ">
                          <i className="fa fa-clock-o"></i>{" "}
                          {minuteAgo(property.createdAt)}
                        </span>
                        <div></div>
                        <div className="card-footer flex justify-between border-t p-3 mt-3">
                          <span className="flex justify-around">
                            <Image
                              className="agent-pic"
                              width={30}
                              height={30}
                              alt="agent pic"
                              // src={user}
                              src={propertyAgent.picture}
                            />
                            <p
                              className="mt-1 ml-2 font-bold"
                              style={{ textTransform: "capitalize" }}
                            >
                              <Link href={`/agent/${propertyAgent._id}`}>
                                <a>
                                  {propertyAgent.firstName}
                                  {propertyAgent.lastName}{" "}
                                </a>
                              </Link>
                            </p>
                          </span>
                          {share ? (
                            <a
                              href="#"
                              onClick={(e) =>
                                e.preventDefault(handleShare(property._id))
                              }
                            >
                              <i className="fa fa-share-alt mt-3"></i>
                            </a>
                          ) : (
                            <a
                              href="#"
                              onClick={(e) =>
                                e.preventDefault(handleShare2(property._id))
                              }
                            >
                              <i className="fa fa-share-alt mt-3"></i>
                            </a>
                          )}
                        </div>
                        {social === property._id ? (
                          <span className=" p-0 flex justify-center share-btn">
                            <a
                              href={`https://facebook.com/sharer/sharer.php?u=${`https://accomodation.vercel.app/${property.slug}`}`}
                              className="mx-2 hover:text-black"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-facebook"></i>
                            </a>
                            <a
                              href={`https://twitter.com/intent/tweet/?text=${
                                property.title
                              }&url=${`https://accomodation.vercel.app/${property.slug}`}`}
                              className="mx-2 hover:text-black"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-twitter"></i>
                            </a>
                            <a
                              href={`https://api.whatsapp.com/send?text=${`http://localhost:3000/${property.slug}`}`}
                              className="mx-2 hover:text-black"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-whatsapp"></i>
                            </a>
                            <a
                              href={`https://linkedin.com/sharing/share-offsite/?url=${`https://accomodation.vercel.app/${property.slug}`}`}
                              className="mx-2 hover:text-black"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-linkedin"></i>
                            </a>
                            <a
                              href={`mailto:?subject=${
                                property.title
                              }&body=${`https://accomodation.vercel.app/${property.slug}`}`}
                              className="mx-2 hover:text-black"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-envelope"></i>
                            </a>
                            <a
                              href={`https://t.me/share/url?url=${`https://accomodation.vercel.app/${property.slug}`}&text=${
                                property.title
                              }`}
                              className="mx-2 hover:text-black"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-telegram"></i>
                            </a>
                          </span>
                        ) : (
                          " "
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
          {agentProperties.length > 4 ? <Footer /> : ""}
        </>
      )}
    </>
  );
}
