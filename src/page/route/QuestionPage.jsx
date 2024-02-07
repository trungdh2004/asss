import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosPath from "../../api/config";
import { formatDistance } from "date-fns";
import { vi } from "date-fns/locale";
import TooltipAction from "../../components/TooltipAction";
import { toast } from "react-toastify";
import LinkIcon from "@mui/icons-material/Link";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AdjustIcon from "@mui/icons-material/Adjust";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Questions = () => {
  const { id } = useParams();
  const [question, setQuestions] = useState(null);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axiosPath.get("/questions/" + id);
      setQuestions(data);
    })();

    (async () => {
      const { data } = await axiosPath.get(`/comments?questionId=${id}`);
      setComments(data);
    })();
  }, []);

  const onCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Đã copy link");
  };

  const onComment = async () => {
    if (value === "") {
      toast.error("Mời bạn nhập comment");
      return;
    }
    try {
      const comment = {
        questionId: id,
        content: value,
        createdAt: new Date(),
      };

      const { data } = await axiosPath.post("/comments", comment);
      setComments([data, ...comments]);
      setValue("");
      toast.success("Comment thành công");
    } catch (error) {
      toast.error("Comment bị lỗi");
    }
  };

  return (
    <div className="grid grid-cols-[8fr,4fr] gap-10 py-8 px-10">
      <div className="w-full h-20 ">
        {/* title */}
        <div className="w-full mb-10">
          <h1 className="text-[36px] font-bold font-sans">{question?.title}</h1>
        </div>

        <div className="flex items-center justify-between ">
          <div className="flex items-center ">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-4 border">
              <img
                src={question?.profile?.avatar}
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="">
              <p className="text-base font-semibold">
                {question?.profile?.username}
              </p>
              <p className="text-sm text-zinc-500 leading-4">
                {question?.createdAt &&
                  formatDistance(question?.createdAt, new Date(), {
                    addSuffix: true,
                    locale: vi,
                  })}
              </p>
            </div>
          </div>
          <div
            className=" cursor-pointer"
            onClick={() => {
              onCopyLink(`http://localhost:5173/question/${question?.id}`);
            }}
          >
            <TooltipAction label={"Copy link"} placement={"top"}>
              <LinkIcon />
            </TooltipAction>
          </div>
        </div>

        <div className="mt-10 read ">
          {question?.content && (
            <ReactQuill
              value={JSON.parse(question?.content)}
              readOnly
              modules={{
                toolbar: false,
              }}
            />
          )}
        </div>
      </div>
      <div className="w-full h-20 px-4 sticky">
        <div className="h-20 flex items-center justify-center text-xl ">
          <h1>Comment</h1>
        </div>
        <div className="py-2 border-t border-b h-14">
          <div className="flex">
            <input
              type="text"
              placeholder="Comment..."
              className="flex-1 py-2 px-2 border-none outline-none mr-2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              onClick={onComment}
              disabled={!value}
              className="cursor-pointer"
            >
              <SendIcon />
            </Button>
          </div>
        </div>

        <div className="py-2 space-y-2 ">
          {comments &&
            comments.map((item) => (
              <div className="w-full  py-1 " key={item?.id}>
                <div className="w-full leading-normal">
                  <AdjustIcon
                    className="w-3 h-3"
                    sx={{
                      width: "15px",
                      height: "15px",
                    }}
                  />{" "}
                  {item?.content}
                </div>
                <div className="w-full flex items-center mt-2">
                  <AccessTimeIcon
                    sx={{
                      width: "15px",
                      height: "15px",
                    }}
                  />{" "}
                  <span className="text-sm ml-4 text-zinc-500">
                    {item?.createdAt &&
                      formatDistance(item?.createdAt, new Date(), {
                        locale: vi,
                      })}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
