import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import { DotPulse } from "@uiball/loaders";
import { Auth } from "../../../services/auth";
import Header2 from "../../../components/Header2";
import {
  deleteProperty,
  updatePropertyRequest,
  getProperties,
  getProperty,
} from "../../../services/property/api";

import {
  maxSelectFile,
  checkMimeType,
  checkFileSize,
} from "../../../utils/helper";

export default function Update({ property }) {
  console.log(property, "property");

  const [propertyImage, setPropertyImage] = useState("");
  const [theUpdatedProperty, setTheUpdatedProperty] = useState(" ");
  const [submitting, setSubmitting] = useState(false);

  const [updateProperty, setUpdateProperty] = useState({
    title: "",
    detail: "",
    address: "",
    price: "",
    image: " ",
    tag: "",
    fileInputKey: Date.now(),
  });

  useEffect(() => {
    setPropertyImage(JSON.parse(property.image));
  }, [property.image]);
  useEffect(() => {
    setTheUpdatedProperty(property);
    setUpdateProperty({
      title: property.title,
      detail: property.detail,
      price: property.price,
      address: property.address,
      tag: property.tag,
    });
  }, [
    property,
    property.title,
    property.detail,
    property.price,
    property.address,
    property.tag,
  ]);

  const handleImage = (e) => {
    const files = e.target.files;
    console.log("files", e.target.files);
    if (maxSelectFile(e) && checkFileSize(e) && checkMimeType(e)) {
      setUpdateProperty({
        ...updateProperty,
        image: files,
      });
    }
  };

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
          // const removeProperty = theProperties.filter(
          //   (property) => property._id !== id
          // );
          // setTheProperties(removeProperty);
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
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    window.scrollTo(0, 0);
    const data = new FormData();
    const id = property._id;
    try {
      // if (
      //   !updateProperty.title ||
      //   !updateProperty.detail ||
      //   !updateProperty.price ||
      //   !updateProperty.address
      // ) {
      //   console.log("All text input fields are required");
      //   toast.info("All text input fields are required");
      //   setSubmitting(false);
      //   return false;
      // }
      data.append("tag", updateProperty.tag);
      data.append("title", updateProperty.title);
      data.append("detail", updateProperty.detail);
      data.append("price", updateProperty.price);
      data.append("address", updateProperty.address);
      if (updateProperty.image) {
        for (let i = 0; i < updateProperty.image.length; i++) {
          console.log("img length", updateProperty.image[i]);
          data.append("image", updateProperty.image[i]);
        }
      }
      console.log(updateProperty, "forms");
      console.log(data, "datas");
      updatePropertyRequest({ id, data })
        .then((res) => {
          console.log(res.data);

          setTheUpdatedProperty(res.data);
          setPropertyImage(JSON.parse(res.data.image));
          setSubmitting(false);
          toast.success("Property updated");
          setUpdateProperty({ fileInputKey: Date.now() });
        })
        .catch((err) => {
          console.log(err.response);
          setSubmitting(false);
          toast.error("Oops! 500 server error, try again");
        });
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Oops! An error occurred");
    }
  }

  console.log(propertyImage, "updated property");
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
                Edit Property
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
                    onChange={(e) =>
                      setUpdateProperty({
                        ...updateProperty,
                        title: e.target.value,
                      })
                    }
                    value={updateProperty.title}
                  />
                </div>
                <div className="my-2">
                  <label>Location/Address</label>
                  <input
                    className="w-full p-5"
                    type="text"
                    onChange={(e) =>
                      setUpdateProperty({
                        ...updateProperty,
                        address: e.target.value,
                      })
                    }
                    value={updateProperty.address}
                  />
                </div>
                <div className="my-2">
                  <label>Price (N)</label>
                  <input
                    className="w-full p-5"
                    type="text"
                    onChange={(e) =>
                      setUpdateProperty({
                        ...updateProperty,
                        price: e.target.value,
                      })
                    }
                    value={updateProperty.price}
                  />
                </div>
                <div className="my-3">
                  <p className="text-md text-center mb-3">Uploaded Image</p>
                  <div className="flex justify-around">
                    {propertyImage[0] ? (
                      <span>
                        <Image
                          src={propertyImage[0]}
                          quality={70}
                          height={100}
                          width={100}
                          priority={true}
                          alt="Property image "
                          className="rounded-lg my-2"
                        />
                      </span>
                    ) : (
                      " "
                    )}

                    {propertyImage[1] ? (
                      <span>
                        <Image
                          src={propertyImage[1]}
                          quality={70}
                          height={100}
                          width={100}
                          priority={true}
                          alt="Property image"
                          className="rounded-lg my-2"
                        />
                      </span>
                    ) : (
                      " "
                    )}

                    {propertyImage[2] ? (
                      <span>
                        <Image
                          src={propertyImage[2]}
                          quality={70}
                          height={100}
                          width={100}
                          priority={true}
                          alt="Property image"
                          className="rounded-lg my-2"
                        />
                      </span>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
                <div className="my-2">
                  <label>Change image</label>
                  <input
                    className="w-full p-5"
                    type="file"
                    style={{ background: "ghostWhite" }}
                    onChange={handleImage}
                    key={updateProperty.fileInputKey}
                    multiple
                  />
                </div>

                <div className="my-3">
                  <label>Property Tag (rent or sale)</label>
                  <input
                    className="w-full p-5"
                    type="text"
                    onChange={(e) =>
                      setUpdateProperty({
                        ...updateProperty,
                        tag: e.target.value,
                      })
                    }
                    value={updateProperty.tag}
                  />
                </div>

                <div className="">
                  <label>Detail</label>
                  <textarea
                    className="w-full p-5"
                    rows={5}
                    onChange={(e) =>
                      setUpdateProperty({
                        ...updateProperty,
                        detail: e.target.value,
                      })
                    }
                    value={updateProperty.detail}
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
                      "UPDATE "
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
                Property
              </h2>
              {submitting ? (
                <div className=" flex justify-center">
                  <DotPulse size={40} speed={1.3} color="white" />
                </div>
              ) : (
                " "
              )}

              <div className="my-posts p-3 text-center">
                <div className="lg:flex md:justify-between">
                  <Link
                    className=" mb-3"
                    id=""
                    href={`/property/${property.slug}`}
                  >
                    <a>{theUpdatedProperty.title}</a>
                  </Link>
                  <span className="flex justify-center rounded-lg mt-4">
                    {propertyImage[0] ? (
                      <Image
                        src={propertyImage[0]}
                        alt="Property image"
                        width={100}
                        height={100}
                        className="rounded-lg"
                        quality={70}
                      />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-3 text-center my-3">
                  <p
                    className="text-black cursor-pointer font-bold"
                    onClick={() => handleDeleteProperty(property._id)}
                  >
                    Delete
                  </p>

                  <Link href={"/agent/dashboard"}>
                    <a>
                      Add <i className="fa fa-pencil"></i>{" "}
                    </a>
                  </Link>

                  <p>{property.views} views</p>
                </div>
              </div>
              <hr />
            </section>
          </section>
        </>
      </Auth>
    </>
  );
}

//Getting single ids//

export async function getServerSideProps(context) {
  const id = context.params.id;
  console.log(id, "current id");
  const res = await getProperty(id);
  const property = res.data;
  console.log(property);
  return {
    props: {
      property: property,
    },
  };
}
