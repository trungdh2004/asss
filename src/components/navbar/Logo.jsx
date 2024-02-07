import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white rounded-full text-xl font-bold">
          H
        </div>
        <div className="ml-1 text-xl font-bold text-blue-500">ỏi đáp</div>
      </div>
    </Link>
  );
};

export default Logo;
