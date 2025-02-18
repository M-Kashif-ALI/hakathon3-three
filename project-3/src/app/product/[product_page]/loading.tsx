import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen animate-spin">
      <Loader size={150} />
    </div>
  );
};

export default Loading;
