import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header2";
import user from "../../public/images/new2.png";
import Footer from "../../components/Footer";
import { getAgents } from "../../services/agents/api";
import {
  getProperties,
  getRelatedProperty,
  getPropertySlug,
  getRecent,
} from "../../services/property/api";
import { minuteAgo } from "../../utils/formatters";
import { production_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import { currentOne } from "../../utils/helper";
export default function Show({ theProperty }) {
  console.log(theProperty, "title");
  const [share, setShare] = useState(true);
  const [social, setSocial] = useState("");
  const [share2, setShare2] = useState(false);
  const [agents, setAgents] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recent, setRecent] = useState([]);
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug, "the slug");
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
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

  async function sendRequestRecent() {
    try {
      const { data } = await getRecent();
      const properties = data;
      setRecent(properties);
      console.log("propShow", properties);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    sendRequest();
    sendRequestAgent();
    sendRequestRecent();

    console.log(properties, "tiesShow");
  }, [properties]);

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
  const style = {
    width: "50%",
  };

  const mostViewed = properties.sort((a, b) => b.views - a.views);
  const theRelated = properties.find((prop) => prop.slug === slug);
  const relate = properties.filter(
    (property) => property.tag === theRelated.tag
  );
  const related = relate.filter((prop) => prop.slug !== slug);
  const propertyImage = JSON.parse(theProperty.image);
  const propertyAgent = agents.find((agent) => agent._id === theProperty.agent);
  console.log(related, "related");
  console.log(mostViewed, "most views");
  console.log(propertyAgent, "the agent property");
  console.log(recent, "recent properties");

  return (
    <>
      <Head>
        <title>{theProperty.slug} - Accomodation</title>
        <meta property="og:title" content={theProperty.title} />
        <meta property="og:description" content={theProperty.detail} />
        <meta property="og:site_name" content="Accomodation" />
        <meta property="og:image" content={propertyImage[0]} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta
          name="og:url"
          content={`https://accomodation.vercel.app/property/${theProperty.slug}`}
        />
        <meta name="twitter:title" content={theProperty.title} />
        <meta name="twitter:description" content={theProperty.detail} />
        <meta name="twitter:image" content={propertyImage[0]} />
        <meta property="twitter:image:width" content="200" />
        <meta property="twitter:image:height" content="200" />
      </Head>
      <Header />
      {isLoading ? (
        <div className="prop-loader">
          <Loading />
        </div>
      ) : (
        <>
          <article className="container md:container mx-auto my-4 p-4 text-white show-page">
            <p className="md:text-center text-black text-xl ">
              {theProperty.title}
            </p>
            <p className="text-center my-3">
              By agent
              <span
                style={{
                  textTransform: "capitalize",
                  color: "black",
                  marginRight: 2,
                }}
              >
                {propertyAgent?.firstName} {propertyAgent?.lastName}
              </span>
              <span className="border-b cursor-pointer animate-pulse">
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`mailto:${
                    propertyAgent.email
                  }?subject=${`Message coming from accomodation website`}`}
                >
                  Contact agent
                </a>
              </span>
            </p>
            <p className="text-center">{theProperty.detail}</p>

            <span className="flex justify-center  my-4">
              <Image alt="" width={500} height={500} src={propertyImage[0]} />
            </span>
            <div className="flex justify-center mx-3">
              {propertyImage[1] ? (
                <span className="flex justify-center my-4">
                  <Image
                    alt=""
                    width={300}
                    height={300}
                    src={propertyImage[1]}
                  />
                </span>
              ) : (
                ""
              )}

              {propertyImage[2] ? (
                <span className="flex justify-center mx-3 my-4">
                  <Image
                    alt=""
                    width={300}
                    height={300}
                    src={propertyImage[2]}
                  />
                </span>
              ) : (
                ""
              )}
            </div>
            <p className="text-center text-base  animate-bounce">
              Make others aware of this by sharing
            </p>
            <span className=" p-3 flex justify-center text-white text-xl">
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${`https://accomodation.vercel.app/${theProperty.slug}`}`}
                className="mx-2 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet/?text=${
                  theProperty.title
                }&url=${`https://accomodation.vercel.app/${theProperty.slug}`}`}
                className="mx-2 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${`http://localhost:3000/${theProperty.slug}`}`}
                className="mx-2 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
              <a
                href={`https://linkedin.com/sharing/share-offsite/?url=${`https://accomodation.vercel.app/${theProperty.slug}`}`}
                className="mx-2 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                href={`mailto:?subject=${
                  theProperty.title
                }&body=${`https://accomodation.vercel.app/${theProperty.slug}`}`}
                className="mx-2 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-envelope"></i>
              </a>
              <a
                href={`https://t.me/share/url?url=${`https://accomodation.vercel.app/${theProperty.slug}`}&text=${
                  theProperty.title
                }`}
                className="mx-2 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-telegram"></i>
              </a>
            </span>
          </article>

          <section className="my-12 p-4 md:grid md:grid-cols-3 gap-3">
            <div className="">
              <p className="text-xl text-center my-4">Related Properties</p>
              {related.length > 0 ? (
                <>
                  {related?.slice(0, 3).map((property, idx) => {
                    const propertyImage = JSON.parse(property.image);
                    const propertyAgent = agents.find(
                      (agent) => agent._id === property.agent
                    );
                    return (
                      <article key={idx} className="posts-card relative my-3 ">
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
                            {/* <Link href={`/property/${property.slug}`}> */}
                            <a href={`/property/${property.slug}`}>
                              <i className="fa fa-map-marker"></i>{" "}
                              {property.address.slice(0, 23)}...
                            </a>
                            {/* </Link> */}
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
                </>
              ) : (
                <p className="text-center">No related property</p>
              )}
            </div>
            <div className="">
              <p className="text-xl text-center my-4">Recent Properties</p>
              <p className="text-center">
                {recent.length < 1 ? "No recent property" : " "}
              </p>
              {recent.slice(0, 3).map((property, idx) => {
                const propertyImage = JSON.parse(property.image);
                const propertyAgent = agents.find(
                  (agent) => agent._id === property.agent
                );
                return (
                  <article key={idx} className="posts-card relative my-3 ">
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
                        <i className="fa fa-camera"></i> {property.views}
                      </p>
                    </span>
                    <div className="card-body">
                      <h3
                        className="font-bold"
                        id="h3"
                        style={{ textTransform: "capitalize" }}
                      >
                        {/* <Link
                          href={`/property/${property.slug}`}
                          onClick={() => handleRelate(property.slug)}
                        > */}
                        <a href={`/property/${property.slug}`}>
                          {property.title.slice(0, 33)}...
                        </a>
                        {/* </Link> */}
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
            <div className="">
              <p className="text-xl text-center my-4">Trending Properties</p>
              <p className="text-center">
                {mostViewed.length < 1 ? "No trending property yet" : " "}
              </p>

              {mostViewed.slice(0, 3).map((property, idx) => {
                const propertyImage = JSON.parse(property.image);
                const propertyAgent = agents.find(
                  (agent) => agent._id === property.agent
                );
                return (
                  <article key={idx} className="posts-card relative my-3">
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
                            {/* <Link href={`/agent/${propertyAgent._id}`}> */}
                            <a href={`/agent/${propertyAgent._id}`}>
                              {propertyAgent.firstName}
                              {propertyAgent.lastName}{" "}
                            </a>
                            {/* </Link> */}
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
          </section>

          <Footer />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const slug = context.params.slug;
    console.log(slug, "current slug");
    const res = await getPropertySlug(slug);
    const theProperty = res.data;
    console.log(theProperty, "theProp");
    return {
      props: {
        theProperty: theProperty,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
}
