import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import Typeds from "../components/Typed";
import user from "../public/images/new2.png";
import { minuteAgo } from "../utils/formatters";
import { getProperties } from "../services/property/api";
import { getAgents } from "../services/agents/api";
export default function Posts() {
  const [share, setShare] = useState(true);
  const [social, setSocial] = useState("");
  const [share2, setShare2] = useState(false);
  const [agents, setAgents] = useState([]);
  const [properties, setProperties] = useState([]);
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

  async function sendRequest() {
    try {
      const { data } = await getProperties();
      const properties = data;
      setProperties(properties);
      console.log("propShow", properties);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    sendRequestAgent();
    sendRequest();
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
  return (
    <>
      {properties.length > 0 ? (
        <section className="posts mb-5 md:grid md:grid-cols-3 md:gap-4 container mx-auto p-5">
          <div className="">
            <h2 className=" my-5 lg:text-center font-bold" id="h2">
              Latest Property
            </h2>
            {properties.slice(0, 1).map((property, idx) => {
              const propertyImage = JSON.parse(property.image);
              const propertyAgent = agents.find(
                (agent) => agent._id === property.agent
              );
              return (
                <article key={idx} className="posts-card relative ">
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
                      <Link href={`/property/${property.slug}`}>
                        <a>
                          <i className="fa fa-map-marker"></i>{" "}
                          {property.address.slice(0, 23)}...
                        </a>
                      </Link>
                    </p>
                    <p className="text-4 text-white">
                      <i className="fa fa-camera"></i> {property.views}
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
                          <a href={`/agent/${propertyAgent._id}`}>
                            {propertyAgent.firstName}
                            {propertyAgent.lastName}{" "}
                          </a>
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

          <div className="">
            <h2 className=" lg:text-center my-5 font-bold" id="h2">
              Recent Property
            </h2>
            {properties.slice(1, 2).map((property, idx) => {
              const propertyImage = JSON.parse(property.image);
              const propertyAgent = agents.find(
                (agent) => agent._id === property.agent
              );
              return (
                <article className="posts-card relative " key={idx}>
                  <p className="text-1">{property.tag}</p>
                  <p className="text-2">Recent Offer</p>
                  <span className="relative">
                    <Image
                      className="post-pic"
                      width={650}
                      height={505}
                      alt="Propertyimage"
                      src={propertyImage[0]}
                    />

                    <p className="text-3 font-bold">
                      <a href={`/property/${property.slug}`}>
                        <i className="fa fa-map-marker"></i>{" "}
                        {property.address.slice(0, 23)}...
                      </a>
                    </p>
                    <p className="text-4 text-white">
                      <i className="fa fa-camera"></i> {property.views}
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
                      <i className="fa fa-clock-o"></i>
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
                          <a href={`/agent/${propertyAgent._id}`}>
                            {propertyAgent.firstName}
                            {propertyAgent.lastName}{" "}
                          </a>
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
                    )}{" "}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="">
            <h2 className="lg:text-center font-bold my-5" id="h2">
              Hot and Popular
            </h2>

            <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true}>
              {properties.slice(0, 3).map((property, idx) => {
                const propertyImage = JSON.parse(property.image);
                return (
                  <div key={idx}>
                    <p className="carousel-p">Affordable properties for you</p>
                    <Image
                      src={propertyImage[0]}
                      width={500}
                      height={500}
                      alt="Property image"
                      className="rounded relative"
                      priority={true}
                    />
                    <p
                      className=" legend "
                      style={{ textTransform: "capitalize" }}
                    >
                      <a href={`/property/${property.slug}`}>
                        {property.title}
                      </a>
                    </p>
                  </div>
                );
              })}
            </Carousel>
            <div className="mt-8 text-center">
              <Link href="/properties">
                <h5
                  className="text-center exp p-3"
                  id="h5"
                  style={{
                    fontSize: "1.3em",
                    color: "#ffff",
                    cursor: "pointer",
                    backgroundColor: "#2d2926ff",
                    width: "100%",
                    margin: "6em auto",
                    boxShadow: "0px 2px 2px grey",
                    borderRadius: "10px",
                  }}
                >
                  Explore more <i className="fa fa-arrows-h"></i>
                </h5>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

// export async function getStaticProps() {
//   try {
//     const { data } = await axios.get(
//       "http://localhost:3000/api/property/latest"
//     );
//     const properties = data;

//     return {
//       props: {
//         properties: properties,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
// }
