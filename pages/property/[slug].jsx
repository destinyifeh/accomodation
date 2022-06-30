import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header2";
import user from "../../public/images/new2.png";
import Footer from "../../components/Footer";
export default function Show() {
  const [share, setShare] = useState(true);
  const [social, setSocial] = useState(false);
  const [share2, setShare2] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    setSocial(true);
    setShare2(true);
    setShare(false);
  };

  const handleShare2 = (e) => {
    e.preventDefault();
    setSocial(false);
    setShare2(false);
    setShare(true);
  };
  const style = {
    width: "50%",
  };
  return (
    <>
      <Head>
        <title>{""}</title>
        <meta property="og:title" content={""} />
        <meta property="og:description" content={""} />
        <meta property="og:site_name" content="Accomodation" />
        <meta property="og:image" content={`http://localhost:3000${""}`} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta name="og:url" content={`http://localhost:3000/posts/${""}`} />
        <meta name="twitter:title" content={""} />
        <meta name="twitter:description" content={""} />
        <meta name="twitter:image" content={`http://localhost:3000${""}`} />
        <meta property="twitter:image:width" content="200" />
        <meta property="twitter:image:height" content="200" />
      </Head>
      <Header />
      <article className="container md:container mx-auto my-4 p-4 text-white show-page">
        <p className="md:text-center text-black text-xl ">
          Property for sale in lekki , lago state
        </p>
        <p className="text-center my-3">
          By agent boss{" "}
          <span className="border-b cursor-pointer animate-pulse">
            Contact agent
          </span>
        </p>
        <p>
          A beautiful mansion is available for sale . The mansion is located in
          lekki, lagos, nigeria. The total package is hundred thousand dollar
          but negotiable
        </p>

        <span className="flex justify-center my-4">
          <Image alt="" width={500} height={500} src="/images/ad3.jpg" />
        </span>
        <p className="text-center text-base  animate-bounce">
          Make others aware of this by sharing
        </p>
        <span className=" p-3 flex justify-center text-white text-xl">
          <a
            href="https://facebook.com/sharer/sharer.php?u="
            className="mx-2 hover:text-black"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com/intent/tweet/?text="
            className="mx-2 hover:text-black"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            href="https://api.whatsapp.com/send?text="
            className="mx-2 hover:text-black"
          >
            <i className="fa fa-whatsapp"></i>
          </a>
          <a
            href="https://linkedin.com/sharing/share-offsite/?url="
            className="mx-2 hover:text-black"
          >
            <i className="fa fa-linkedin"></i>
          </a>
          <a
            href="mailto:?subject=title=body"
            className="mx-2 hover:text-black"
          >
            <i className="fa fa-envelope"></i>
          </a>
          <a
            href={`https://t.me/share/url?url=${"url"}&text=${"text"}`}
            className="mx-2 hover:text-black"
          >
            <i className="fa fa-telegram"></i>
          </a>
        </span>
      </article>
      <section className="my-12 p-4 md:grid md:grid-cols-3 gap-3">
        <div className="">
          <p className="text-xl text-center my-4">Related Property</p>
          <article className="posts-card relative text-black mx-auto" id="">
            <p className="text-1">Sale</p>
            <p className="text-2">New Offer</p>
            <span className="relative">
              <Image
                className="post-pic"
                width={650}
                height={500}
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
            <div className="card-body text-black">
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
              <div className="card-footer flex justify-between border-t p-3 mt-3 text-black">
                <span className="flex justify-around">
                  <Image
                    className="agent-pic"
                    width={30}
                    height={30}
                    alt="agent pic"
                    src={user}
                  />
                  <p className="mt-1 ml-2 font-bold text-black">
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
          <p className="text-xl text-center my-4">Trending Property</p>
          <article className="posts-card relative text-black mx-auto " id="">
            <p className="text-1">Sale</p>
            <p className="text-2">New Offer</p>
            <span className="relative">
              <Image
                className="post-pic"
                width={650}
                height={500}
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
            <div className="card-body text-black">
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
              <div className="card-footer flex justify-between border-t p-3 mt-3 text-black">
                <span className="flex justify-around">
                  <Image
                    className="agent-pic"
                    width={30}
                    height={30}
                    alt="agent pic"
                    src={user}
                  />
                  <p className="mt-1 ml-2 font-bold text-black">
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
          <p className="text-xl text-center my-4">Most Viewed Property</p>
          <article className="posts-card relative text-black mx-auto" id="">
            <p className="text-1">Sale</p>
            <p className="text-2">New Offer</p>
            <span className="relative">
              <Image
                className="post-pic"
                width={650}
                height={500}
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
            <div className="card-body text-black">
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
              <div className="card-footer flex justify-between border-t p-3 mt-3 text-black">
                <span className="flex justify-around">
                  <Image
                    className="agent-pic"
                    width={30}
                    height={30}
                    alt="agent pic"
                    src={user}
                  />
                  <p className="mt-1 ml-2 font-bold text-black">
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
      </section>
      <Footer />
    </>
  );
}
