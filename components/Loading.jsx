import { Ring } from "@uiball/loaders";

const Loading = () => {
  return (
    <div className="flex justify-center  ">
      <Ring size={35} speed={1.5} color="#e94b3cff" />
    </div>
  );
};

export default Loading;
