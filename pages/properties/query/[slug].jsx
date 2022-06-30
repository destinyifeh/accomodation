import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../../components/Loading";
import user from "../../../public/images/new2.png";
import Footer from "../../../components/Footer";
import Header2 from "../../../components/Header2";
export default function Query(props) {
  const [loader, setLoader] = useState(false);
  const [share, setShare] = useState(true);
  const [social, setSocial] = useState(false);
  const [share2, setShare2] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);

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

  return (
    <>
      <Header2 />
      <h2 className="text-center my-4" id="h2">
        Recent Posts
      </h2>
      {loader ? (
        <>
          <section className=" container md:container mx-auto grid md:grid-cols-3 gap-4 p-3 multiple-posts">
            <article className="posts-card relative ">
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

            <article className="posts-card relative ">
              <p className="text-1">Sale</p>
              <p className="text-2">New Offer</p>
              <span className="relative">
                <Image
                  className="post-pic"
                  width={450}
                  height={350}
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
                  <a href="/">
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                </div>
              </div>
            </article>

            <article className="posts-card relative ">
              <p className="text-1">Sale</p>
              <p className="text-2">New Offer</p>
              <span className="relative">
                <Image
                  className="post-pic"
                  width={450}
                  height={350}
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
                  <a href="/">
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                </div>
              </div>
            </article>

            <article className="posts-card relative ">
              <p className="text-1">Sale</p>
              <p className="text-2">New Offer</p>
              <span className="relative">
                <Image
                  className="post-pic"
                  width={450}
                  height={350}
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
                  <a href="/">
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                </div>
              </div>
            </article>

            <article className="posts-card relative ">
              <p className="text-1">Sale</p>
              <p className="text-2">New Offer</p>
              <span className="relative">
                <Image
                  className="post-pic"
                  width={450}
                  height={350}
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
                  <a href="/">
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                </div>
              </div>
            </article>

            <article className="posts-card relative ">
              <p className="text-1">Sale</p>
              <p className="text-2">New Offer</p>
              <span className="relative">
                <Image
                  className="post-pic"
                  width={450}
                  height={350}
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
                  <a href="/">
                    <i className="fa fa-share-alt mt-3"></i>
                  </a>
                </div>
              </div>
            </article>
          </section>
          <div className="p-3 my-3">
            <h5
              className="text-center exp p-3"
              id="h5"
              style={{
                fontSize: "1.3em",
                color: "#ffff",
                cursor: "pointer",
                backgroundColor: "#2d2926ff",
                width: "fit-content",
                margin: "auto",
                boxShadow: "0px 2px 2px grey",
                borderRadius: "10px",
              }}
            >
              Load more <i className="fa fa-arrows-h"></i>
            </h5>
          </div>
        </>
      ) : (
        <div className="" style={{ marginTop: "12%" }}>
          <Loading />
        </div>
      )}
      {loader ? <Footer /> : " "}
    </>
  );
}
