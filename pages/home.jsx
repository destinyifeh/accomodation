import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Carousel } from "react-responsive-carousel";
import Typeds from "../components/Typed";
import user from "../public/images/new2.png";
//import Loading from "../components/Loading";
export default function Posts() {
  const [share, setShare] = useState(true);
  const [social, setSocial] = useState(false);
  const [share2, setShare2] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    setSocial(true);
    setShare2(true);
    setShare(false);
  };

  useEffect(() => {
    // var times = document.querySelectorAll("#timesBtn");
    // var bars = document.querySelectorAll("#barsBtn");
    // var downs = document.querySelectorAll("#downs");
    // for (let i = 0; i < downs.length; i++) {
    //   downs[i];
    // }
    // for (let i = 0; i < times.length; i++) {
    //   times[i];
    // }
    // for (let i = 0; i < bars.length; i++) {
    //   bars[i].addEventListener("click", () => {
    //     downs[i].style.display = "block";
    //     times[i].style.display = "block";
    //     bars[i].style.display = "none";
    //   });
    // }
    // for (let i = 0; i < times.length; i++) {
    //   times[i].addEventListener("click", () => {
    //     downs[i].style.display = "none";
    //     times[i].style.display = "none";
    //     bars[i].style.display = "block";
    //   });
    // }
  }, []);
  const handleShare2 = (e) => {
    e.preventDefault();
    setSocial(false);
    setShare2(false);
    setShare(true);
  };
  return (
    <>
      <Head>
        <title>Homeboys -Accomodation </title>
        <meta name="keywords" content="rent" />
        <meta name="url" content="http://localhost:3000/home" />
        <meta name="description" content="Linking up clients" />
        <meta name="site_name" content="Accomodation-home" />
        <meta name="key_type" content="website" />
      </Head>

      <section className="posts mb-5 md:grid md:grid-cols-3 md:gap-4 container mx-auto p-5">
        <div className="">
          <h2 className=" my-5 lg:text-center font-bold" id="h2">
            The Latest Properties Available
          </h2>
          <article className="posts-card relative ">
            <p className="text-1">Sale</p>
            <p className="text-2">New Offer</p>
            <span className="relative">
              <Image
                className="post-pic"
                width={650}
                height={505}
                alt="post pic"
                src="/images/ad3.jpg"
              />

              <p className="text-3 font-bold">
                <i className="fa fa-map-marker"></i> Transcorp, Ikoyi, Lagos
              </p>
              <p className="text-4 text-white">
                <i className="fa fa-camera"></i> 9
              </p>
            </span>
            <div className="card-body">
              <h3 className="font-bold" id="h3">
                <a href="/">Property For Sale In Lekki</a>
              </h3>
              <p className="naira my-2">N100,000</p>
              <p className="my-2">
                A beautiful mansion is available for sale . The mansion is
                located in lekki, lagos, nigeria. The total package is hundred
                thousand dollar but negotiable...
              </p>
              <span className="time ">
                <i className="fa fa-clock-o"></i> 2 min ago
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
                  <p className="mt-1 ml-2 font-bold">
                    <a href="">Tunde Kareem </a>
                  </p>
                </span>
                {share ? (
                  <a href="#" onClick={handleShare}>
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                ) : (
                  <a href="#" onClick={handleShare2}>
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                )}
              </div>
              {social ? (
                <span className=" p-3 flex justify-center share-btn" id="down">
                  <a
                    href="https://facebook.com/sharer/sharer.php?u="
                    className="mx-2"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com/intent/tweet/?text="
                    className="mx-2"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?text="
                    className="mx-2"
                  >
                    <i className="fa fa-whatsapp"></i>
                  </a>
                  <a
                    href="https://linkedin.com/sharing/share-offsite/?url="
                    className="mx-2"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="mailto:?subject=title=body" className="mx-2">
                    <i className="fa fa-envelope"></i>
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${"url"}&text=${"text"}`}
                    className="mx-2"
                  >
                    <i className="fa fa-telegram"></i>
                  </a>
                </span>
              ) : (
                " "
              )}
            </div>
          </article>
        </div>

        <div className="">
          <h2 className=" lg:text-center my-5 font-bold" id="h2">
            Recent Properties Listed
          </h2>
          <article className="posts-card relative ">
            <p className="text-1">Sale</p>
            <p className="text-2">Recent Offer</p>
            <span className="relative">
              <Image
                className="post-pic"
                width={650}
                height={505}
                alt="post pic"
                src="/images/ad3.jpg"
              />

              <p className="text-3 font-bold">
                <i className="fa fa-map-marker"></i> Transcorp, Ikoyi, Lagos
              </p>
              <p className="text-4 text-white">
                <i className="fa fa-camera"></i> 9
              </p>
            </span>
            <div className="card-body">
              <h3 className="font-bold" id="h3">
                <a href="/">Property For Sale In Lekki</a>
              </h3>
              <p className="naira my-2">N100,000</p>
              <p className="my-2">
                A beautiful mansion is available for sale . The mansion is
                located in lekki, lagos, nigeria. The total package is hundred
                thousand dollar but negotiable...
              </p>
              <span className="time ">
                <i className="fa fa-clock-o"></i> 2 min ago
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
                  <p className="mt-1 ml-2 font-bold">
                    <a href="">Tunde Kareem </a>
                  </p>
                </span>
                {share ? (
                  <a href="#" onClick={handleShare}>
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                ) : (
                  <a href="#" onClick={handleShare2}>
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                )}
              </div>
              {social ? (
                <span className=" p-3 flex justify-center share-btn">
                  <a
                    href="https://facebook.com/sharer/sharer.php?u="
                    className="mx-2"
                  >
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com/intent/tweet/?text="
                    className="mx-2"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?text="
                    className="mx-2"
                  >
                    <i className="fa fa-whatsapp"></i>
                  </a>
                  <a
                    href="https://linkedin.com/sharing/share-offsite/?url="
                    className="mx-2"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="mailto:?subject=title=body" className="mx-2">
                    <i className="fa fa-envelope"></i>
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${"url"}&text=${"text"}`}
                    className="mx-2"
                  >
                    <i className="fa fa-telegram"></i>
                  </a>
                </span>
              ) : (
                " "
              )}
            </div>
          </article>
        </div>
        <div className="">
          <h2 className="lg:text-center font-bold my-5" id="h2">
            Hots and Popular
          </h2>

          <Carousel autoPlay={true} showThumbs={false} infiniteLoop={true}>
            <div>
              <p className="carousel-p">Affordable properties for you</p>
              <Image
                src="/images/ad3.jpg"
                width={500}
                height={500}
                className="rounded relative"
                priority={true}
              />
              <p className=" legend ">Mini flat available for rent</p>
            </div>
            <div>
              <p className="carousel-p">Affordable properties for you</p>

              <Image
                src="/images/employee7.jpg"
                width={500}
                height={500}
                className="rounded relative"
              />
              <p className=" legend ">Newly built mansion for sale</p>
            </div>
            <div>
              <p className="carousel-p">Affordable properties for you</p>

              <Image
                src="/images/employee8.jpg"
                width={500}
                height={500}
                className="rounded relative"
              />
              <p className="legend ">Property for sale in lagos</p>
            </div>
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
    </>
  );
}
