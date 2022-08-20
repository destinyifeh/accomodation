import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import paginate from "react-paginate";
import Loading from "../../../components/Loading";
import user from "../../../public/images/new2.png";
import Footer from "../../../components/Footer";
import Header2 from "../../../components/Header2";
import { getAgents } from "../../../services/agents/api";
import { minuteAgo } from "../../../utils/formatters";
import { getQuery } from "../../../services/property/api";
export default function Properties({ properties }) {
  console.log("Query prop", properties);
  const [agents, setAgents] = useState("");
  const [loader, setLoader] = useState(false);
  const [share, setShare] = useState(true);
  const [social, setSocial] = useState("");
  const [share2, setShare2] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(4);
  const [pages, setPages] = useState(Math.ceil(properties.length / limit));
  const [loadMore, setLoadMore] = useState(false);
  const [loadLess, setLoadLess] = useState(false);
  const [propertyLoader, setPropertyLoader] = useState(false);
  const length = properties.length;
  const currentPage = page * limit;
  const lastPage = pages;
  console.log(lastPage, "last");

  const router = useRouter();
  const { slug } = router.query;
  console.log(slug, "slug of slug");
  async function sendRequest() {
    try {
      const { data } = await getAgents;
      const agents = data;
      setAgents(agents);
      console.log("property agents", agents);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    sendRequest();
  }, []);

  const handleLoadMore = (e) => {
    e.preventDefault();
    console.log("more");
    setPropertyLoader(true);
    setTimeout(() => {
      setPropertyLoader(false);
    }, 3000);
    if (page + 1 < pages) {
      setPage((page) => page + 1);
      setLoadMore(true);
      setLoadLess(true);
      console.log(pages, "this page");
      console.log(currentPage, "current");
      window.scrollTo({ top: 0 });
    } else {
      setLoadMore(false);
      setLoadLess(true);
    }
  };

  const handleLoadLess = (e) => {
    e.preventDefault();
    setPropertyLoader(true);
    setTimeout(() => {
      setPropertyLoader(false);
    }, 3000);
    console.log("less");
    if (page > 0) {
      setPage((page) => page - 1);
      setLoadLess(true);
      setLoadMore(true);
      window.scrollTo({ top: 0 });
    } else {
      setLoadLess(true);
      setLoadMore(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
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
      <Head>
        <title>Search results for {slug} - Accommodation</title>
        <meta
          name="url"
          content={`https://accomodation.vercel.app/property/query/${slug}`}
        />
      </Head>

      <Header2 />
      {loader ? (
        <>
          <h2 className="text-center my-4" id="h2">
            {properties.length > 0 ? (
              <span>
                {" "}
                Search results for
                <span className="pl-2" style={{ color: "#e94b3cff" }}>
                  {slug}
                </span>
              </span>
            ) : (
              <span>
                {" "}
                No search results for
                <span className="pl-2" style={{ color: "#e94b3cff" }}>
                  {slug}
                </span>
              </span>
            )}
          </h2>
          {propertyLoader ? (
            <Loading />
          ) : (
            <section className=" container md:container mx-auto grid md:grid-cols-3 gap-4 p-3 multiple-posts">
              {properties
                .slice(currentPage, currentPage + limit)
                .map((property, idx) => {
                  const propertyImage = JSON.parse(property.image);
                  const propertyAgent = agents.find(
                    (agent) => agent._id === property.agent
                  );
                  console.log(propertyAgent, "agentino");
                  return (
                    <article className="posts-card relative " key={idx}>
                      <p className="text-1">
                        {property.tag ? property.tag : "sale / rent"}
                      </p>
                      <p className="text-2">New Offer</p>
                      <span className="relative">
                        <Image
                          className="post-pic"
                          width={650}
                          height={500}
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
                              src={user}
                            />
                            <p
                              className="mt-1 ml-2 font-bold"
                              style={{ textTransform: "capitalize" }}
                            >
                              {/* <a href="">
                                {propertyAgent.firstName}
                                {propertyAgent.lastName}
                              </a> */}{" "}
                              dd
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
            </section>
          )}
          {pages > 1 ? (
            <section className="flex justify-between">
              {/* {loadLess ? ( */}
              <div className="p-3 my-3">
                <button
                  className="text-center exp p-3"
                  id="h5"
                  disabled={page === 0}
                  style={
                    page === 0
                      ? {
                          fontSize: "1.3em",
                          color: "#ffff",
                          cursor: "pointer",
                          backgroundColor: "grey",
                          width: "fit-content",
                          margin: "auto",
                          boxShadow: "0px 2px 2px grey",
                          borderRadius: "10px",
                        }
                      : {
                          fontSize: "1.3em",
                          color: "#ffff",
                          cursor: "pointer",
                          backgroundColor: "#2d2926ff",
                          width: "fit-content",
                          margin: "auto",
                          boxShadow: "0px 2px 2px grey",
                          borderRadius: "10px",
                        }
                  }
                  onClick={handleLoadLess}
                >
                  Load Previous <i className="fa fa-arrows-h"></i>
                </button>
              </div>
              {/* ) : (
              " "
            )} */}
              {/* {loadMore ? ( */}
              <div className="p-3 my-3">
                <button
                  className="text-center exp p-3"
                  id="h5"
                  disabled={page + 1 === pages}
                  style={
                    page + 1 === pages
                      ? {
                          fontSize: "1.3em",
                          color: "#ffff",
                          cursor: "pointer",
                          backgroundColor: "grey",
                          width: "fit-content",
                          margin: "auto",
                          boxShadow: "0px 2px 2px grey",
                          borderRadius: "10px",
                        }
                      : {
                          fontSize: "1.3em",
                          color: "#ffff",
                          cursor: "pointer",
                          backgroundColor: "#2d2926ff",
                          width: "fit-content",
                          margin: "auto",
                          boxShadow: "0px 2px 2px grey",
                          borderRadius: "10px",
                        }
                  }
                  onClick={handleLoadMore}
                >
                  Load more <i className="fa fa-arrows-h"></i>
                </button>
              </div>
              {/* ) : (
              ""
            )} */}
            </section>
          ) : (
            " "
          )}
        </>
      ) : (
        <div className="more-loader">
          <Loading />
        </div>
      )}
      {loader ? <Footer /> : " "}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const slug = context.params.slug;
    console.log(slug, "current slug");
    const res = await getQuery(slug);
    const properties = res.data;
    console.log(properties, "queryProp");
    return {
      props: {
        properties: properties,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
}
