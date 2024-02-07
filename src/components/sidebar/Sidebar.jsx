import AddIcon from "@mui/icons-material/Add";
import TooltipAction from "../TooltipAction";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const Sidebar = () => {
  const router = useNavigate();

  const logOut = () => {
    localStorage.setItem("auth", null);
    router("/login");
  };

  return (
    <div className="w-full h-full px-2 flex flex-col items-center py-4 space-y-4">
      <div className="flex-1 space-y-4">
        <TooltipAction label={"Thêm câu hỏi"} placement={"right"}>
          <div
            className="bg-blue-500 w-[45px] h-[45px] rounded-full text-white flex items-center justify-center text-xl cursor-pointer"
            onClick={() => router("/create")}
          >
            <AddIcon />
          </div>
        </TooltipAction>

        <TooltipAction label={"Trang chủ"} placement={"right"}>
          <div
            className="bg-zinc-200 w-[45px] h-[45px] rounded-xl text-black flex items-center justify-center text-xl cursor-pointer"
            onClick={() => router("/")}
          >
            <HomeIcon />
          </div>
        </TooltipAction>

        <TooltipAction label={"Bài viết của bạn"} placement={"right"}>
          <div
            className="bg-zinc-200 w-[45px] h-[45px] rounded-xl text-black flex items-center justify-center text-xl cursor-pointer"
            onClick={() => router("/myquestions")}
          >
            <LibraryBooksIcon />
          </div>
        </TooltipAction>
      </div>

      <TooltipAction label={"Đăng xuất"} placement={"right"}>
        <div
          className="bg-zinc-200 w-[45px] h-[45px] rounded-xl text-black flex items-center justify-center text-xl cursor-pointer"
          onClick={logOut}
        >
          <Logout />
        </div>
      </TooltipAction>
    </div>
  );
};

export default Sidebar;
