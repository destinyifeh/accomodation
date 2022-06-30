import { Orbit } from "@uiball/loaders";

const Loader = () => {
  return (
    <section className="loader-load">
      <h3 className="text-white text-center mx-auto loader-text" id="h3">
        Welcome to accomodation
      </h3>

      <div className="loader-body flex justify-center mx-auto">
        <Orbit size={35} speed={1.5} color="white" />
      </div>
    </section>
  );
};

export default Loader;
