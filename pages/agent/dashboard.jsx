import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { DotPulse } from "@uiball/loaders";
import { Auth } from "../../services/auth";
import Header2 from "../../components/Header2";
import { deleteProperty } from "../../services/property/api";

import {
  maxSelectFile,
  checkMimeType,
  checkFileSize,
} from "../../utils/helper";
import { currentUser } from "../../services/requesters";
import { currentAgent } from "../../utils/constants";
import { addNewProperty, getProperties } from "../../services/property/api";
export default function Add({ properties }) {
  const [current, setCurrent] = useState("");
  console.log(properties, "properties");

  // const [property, setProperty] = useState({
  //   title: " ",
  //   detail: " ",
  //   address: "",
  //   price: " ",
  //   image: " ",
  //   fileInputKey: Date.now(),
  // });
  const [agent, setAgent] = useState(current);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [tag, setTag] = useState(" ");
  const [theProperties, setTheProperties] = useState(properties);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(2);
  const [pages, setPages] = useState(Math.ceil(theProperties.length / limit));
  let currentPage = page * limit;
  const [nextDisabled, setNextDisabled] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  useEffect(() => {
    setAgent(currentUser(currentAgent)?._id);
    console.log(
      currentUser(currentAgent) ? currentUser(currentAgent)._id : "",
      "current agent"
    );
    console.log(agent, "curre");
  }, [agent]);

  const handleTag = (e) => {
    console.log(e.target.value, "tag");
    const tag = e.target.value.toLowerCase();
    setTag(tag);
  };
  const handleImage = (e) => {
    const files = e.target.files;
    console.log("files", e.target.files);
    if (maxSelectFile(e) && checkFileSize(e) && checkMimeType(e)) {
      setImage(files);
    }
  };

  const handlePrice = (e) => {
    if (!isNaN(e.target.value)) {
      console.log("number");
      setPrice(e.target.value);
    } else {
      console.log("not a number");
      toast.info("Enter only number");
    }
    // const pattern = new RegExp("^[0-9]*[.,]?[0-9]*$");

    // if (e.target.value === "" || pattern.test(e.target.value)) {
    //   setProperty({ price: e.target.value });
    // } else {
    //   console.log("not a number");
    //   toast.info("Enter only number");
    // }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    window.scrollTo(0, 0);
    console.log(tag, "tago");
    const data = new FormData();
    try {
      if (tag != "sale" && tag != "rent") {
        toast.info("Add correct tag");
        setSubmitting(false);
        return false;
      } else if (!agent || agent === "") {
        toast.info("Make sure you are logged in");
        setSubmitting(false);
        return false;
      } else if (tag.length !== 4) {
        toast.info("Add correct tag");
        setSubmitting(false);
        return false;
      } else if (address.length > 40) {
        toast.info("The address is too long");
        setSubmitting(false);
        return false;
      } else if (
        title === " " ||
        detail === " " ||
        address === " " ||
        price === " " ||
        image === "" ||
        tag === ""
      ) {
        console.log("All input fields are required");
        toast.info("All input fields are required");
        setSubmitting(false);
        return false;
      } else {
        data.append("agent", agent);
        data.append("tag", tag);
        data.append("title", title);
        data.append("detail", detail);
        data.append("price", price);
        data.append("address", address);
        for (let i = 0; i < image.length; i++) {
          console.log("img length", image[i]);
          data.append("image", image[i]);
        }

        console.log(data, "datas");
        addNewProperty(data)
          .then((res) => {
            console.log(res.data);
            setTheProperties((state) => [res.data, ...state]);
            setSubmitting(false);
            toast.success("Property added");
            setTitle("");
            setDetail("");
            setPrice("");
            setAddress("");
            setTag("");
            setFileInputKey(Date.now());
          })
          .catch((err) => {
            console.log(err.response);
            setSubmitting(false);
            toast.error("Oops! 500 server error, try again");
          });
      }
    } catch (err) {
      console.log(err.message);
      setSubmitting(false);
      if (
        err.message === "Cannot read properties of undefined (reading 'length')"
      ) {
        toast.error("Oops! Make sure you upload an image before submission");
      } else {
        toast.error("Oops! An error occurred");
      }
    }
  }

  const next = () => {
    console.log("next");
    if (page + 1 < pages) {
      setPage((page) => page + 1);
      window.scrollTo(0, 0);
      setNextDisabled(true);
      setPrevDisabled(false);

      return true;
    } else {
      setNextDisabled(false);
      return false;
    }
  };

  const prev = () => {
    console.log("prev");
    if (page > 0) {
      setPage((page) => page - 1);
      window.scrollTo(0, 0);
      setPrevDisabled(false);
      setNextDisabled(true);

      return true;
    } else {
      setPrevDisabled(true);
      return false;
    }
  };

  console.log(pages, "pages");
  const handleDeleteProperty = (id) => {
    console.log("id", id);
    window.scrollTo(0, 0);
    setSubmitting(true);
    deleteProperty(id)
      .then((res) => {
        console.log(res.data);
        if (res.data === "Property deleted") {
          toast.success("Property deleted");
          setSubmitting(false);
          const removeProperty = theProperties.filter(
            (property) => property._id !== id
          );
          setTheProperties(removeProperty);
        }
        if (res.data === "Property not found") {
          toast.info("Property not found");
          setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setSubmitting(false);

        toast.error("Oops! An error occurred, try again");
      });
  };
  return (
    <>
      <Auth>
        <>
          <Header2 />
          <h2
            className="my-3 text-center"
            id="h2"
            style={{ color: "#e94b3cff" }}
          >
            Agent Dashboard
          </h2>

          <section className="grid md:grid-cols-2 ">
            <section className="mt-4 p-4 container md:container mx-auto add-form ">
              <h2 className="mb-3" id="h2" style={{ color: "#e94b3cff" }}>
                Add Property
              </h2>
              {submitting ? (
                <div className=" flex justify-center">
                  <DotPulse size={40} speed={1.3} color="white" />
                </div>
              ) : (
                " "
              )}
              <form className="" onSubmit={handleSubmit}>
                <div className="my-2">
                  <label>Title</label>
                  <input
                    className="w-full p-5 "
                    type="text"
                    placeholder="Five bedroom duplex for rent"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="my-2">
                  <label>Location/Address</label>
                  <input
                    className="w-full p-5"
                    type="text"
                    placeholder="21, Lekki phase 1, Lagos"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
                <div className="my-2">
                  <label>Price (N)</label>
                  <input
                    className="w-full p-5"
                    type="text"
                    placeholder="100000"
                    onChange={handlePrice}
                    value={price}
                  />
                </div>
                <div className="my-2">
                  <label>Image</label>
                  <input
                    className="w-full p-5"
                    type="file"
                    style={{ background: "ghostWhite" }}
                    onChange={handleImage}
                    key={fileInputKey}
                    multiple
                  />
                </div>

                <div className="my-3">
                  <label>Add tag (rent or sale)</label>
                  <input
                    className="w-full p-5"
                    type="text"
                    placeholder="Use rent or sale"
                    onChange={handleTag}
                  />
                </div>
                <div className="">
                  <label>Detail</label>
                  <textarea
                    className="w-full p-5"
                    rows={5}
                    onChange={(e) => setDetail(e.target.value)}
                    value={detail}
                  />
                </div>
                <div className="my-2">
                  <button
                    className="w-full p-5 mb-6 bg-black text-white"
                    type="submit"
                    style={
                      submitting
                        ? { background: "black" }
                        : { background: "#e94b3cff" }
                    }
                  >
                    {submitting ? (
                      <div className=" flex justify-center">
                        <DotPulse size={40} speed={1.3} color="white" />
                      </div>
                    ) : (
                      "POST "
                    )}
                  </button>
                </div>
              </form>
              <div className="my-4 hidden lg:block">
                <p>
                  &copy; Accomodation Agent Dashboard 2022. All rights reserved
                </p>
              </div>
            </section>

            <section className="mt-4 agent-dash ">
              <h2 className="text-center" id="h2">
                {theProperties.length > 0
                  ? "My Posts"
                  : "You haven't posted yet"}
              </h2>
              {submitting ? (
                <div className=" flex justify-center">
                  <DotPulse size={40} speed={1.3} color="white" />
                </div>
              ) : (
                " "
              )}
              {theProperties
                .slice(currentPage, currentPage + limit)
                .map((property, idx) => {
                  const propertyImage = JSON.parse(property.image);
                  console.log(propertyImage[0], "property image");
                  return (
                    <>
                      <div className="my-posts p-3 text-center" key={idx}>
                        <div className="lg:flex md:justify-between">
                          <Link
                            className=" mb-5 "
                            id=""
                            href={`/property/${property.slug}`}
                          >
                            <a>{property.title}</a>
                          </Link>
                          {propertyImage[0] ? (
                            <span className="flex justify-center rounded-lg mt-4">
                              <Image
                                src={propertyImage[0]}
                                alt="Property image"
                                width={100}
                                height={100}
                                className="rounded-lg"
                                quality={70}
                              />
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="grid grid-cols-3 text-center my-3">
                          <p
                            className="text-black cursor-pointer font-bold"
                            onClick={() => handleDeleteProperty(property._id)}
                          >
                            Delete
                          </p>

                          <Link href={`/property/edit/${property._id}`}>
                            <a>
                              Edit <i className="fa fa-pencil"></i>{" "}
                            </a>
                          </Link>

                          <p>{property.views} views</p>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
              {theProperties.length > 2 ? (
                <div
                  className="pagination flex justify-between mt-4 "
                  style={{ userSelect: "none" }}
                >
                  <span
                    className="prev cursor-pointer"
                    style={
                      prevDisabled ? { color: "#dddddd" } : { color: "white" }
                    }
                    onClick={prev}
                  >
                    {" "}
                    <i className="fa fa-arrow-circle-o-left"></i> Previous
                  </span>
                  <span
                    className="next cursor-pointer"
                    style={
                      nextDisabled ? { color: "white" } : { color: "#dddddd" }
                    }
                    onClick={next}
                  >
                    {" "}
                    Next <i className="fa fa-arrow-circle-o-right"></i>
                  </span>
                </div>
              ) : (
                ""
              )}
            </section>
          </section>
        </>
      </Auth>
    </>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await getProperties();
    const properties = data;

    return {
      props: {
        properties: properties,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
