import { Avatar } from "@mui/material";
import { useState } from "react";
import { useProfile } from "../../store/zudtand";
import clsx from "clsx";

const AvatarAction = () => {
  const { data } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative">
      <Avatar
        alt="Cindy Baker"
        src={data?.avatar}
        className="border hover:border-blue-500 cursor-pointer transition-all"
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={clsx(
          "w-[200px]  right-0 top-11 rounded-md shadow shadow-zinc-400 absolute bg-white px-4",
          isOpen && "block",
          !isOpen && "hidden"
        )}
      >
        <div
          className="w-full h-10 border-b flex items-center justify-start font-medium hover:bg-zinc-50 cursor-pointer"
          onClick={handleClick}
        >
          Trang cá nhân
        </div>
        <div
          className="w-full h-10 border-b flex items-center justify-start font-medium hover:bg-zinc-50 cursor-pointer"
          onClick={handleClick}
        >
          Cài đặt
        </div>
        <div
          className="w-full h-10  flex items-center justify-start font-medium text-rose-500 hover:bg-zinc-50 cursor-pointer"
          onClick={handleClick}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default AvatarAction;
