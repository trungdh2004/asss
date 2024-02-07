/* eslint-disable no-unused-vars */
import LinkIcon from "@mui/icons-material/Link";
import TooltipAction from "../TooltipAction";
import { Link, useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify";
import { useProfile } from "../../store/zudtand";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";

// eslint-disable-next-line react/prop-types
const Question = ({
  name,
  userId,
  id,
  desc,
  createdAt,
  profile,
  language,
  isUser = false,
  onDelete
}) => {
  const { data: user } = useProfile();
  const router = useNavigate();
  const onCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Đã copy link");
  };

  return (
    <div className="w-full rounded-xl shadow hover:shadow-md transition-all border p-6">
      <div className="w-full flex items-center justify-between">
        {/* người dùng */}
        <div className="flex items-center">
          <div className="w-[28px] h-[28px] border rounded-full overflow-hidden">
            <img
              // eslint-disable-next-line react/prop-types
              src={profile?.avatar}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/*  eslint-disable-next-line react/prop-types*/}
          <span className="ml-2 font-semibold text-sm">{profile.username}</span>
        </div>

        <div className="space-x-2">
          {user.id === userId && isUser && (
            <>
              <TooltipAction label={"Sửa"} placement={"top"}>
                <ConstructionOutlinedIcon
                  onClick={() => {
                    router(`/question/${id}/edit`);
                  }}
                  className=" cursor-pointer"
                />
              </TooltipAction>
              <TooltipAction label={"Xóa"} placement={"top"}>
                <DeleteOutlineOutlinedIcon
                  onClick={() => {
                    onDelete(id);
                  }}
                  className=" cursor-pointer"
                />
              </TooltipAction>
            </>
          )}

          <TooltipAction label={"Copy link"} placement={"top"}>
            <LinkIcon
              onClick={() => {
                onCopyLink(`http://localhost:5173/question/${id}`);
              }}
              className=" cursor-pointer"
            />
          </TooltipAction>
        </div>
      </div>
      <div className="w-full mt-2 flex items-center">
        <div className=" flex-1 pr-8">
          <Link to={`/question/${id}`}>
            <h1 className="text-xl font-bold leading-[1.6] text-black line-clamp-2 inline-block">
              {name}
            </h1>
          </Link>

          <p className="mt-1 w-full text-base line-clamp-2 text-zinc-500 leading-[1.6]">
            {desc}
          </p>

          <div className=" flex items-center mt-2 space-x-2">
            {/* eslint-disable-next-line react/prop-types */}
            <Chip label={language.toUpperCase()} size="small" />
            <span className="text-sm font-normal text-zinc-400">
              Đăng{" "}
              {formatDistance(createdAt, new Date(), {
                addSuffix: true,
                locale: vi,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
