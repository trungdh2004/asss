import { Button, InputLabel, MenuItem, FormControl } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import axiosPath from "../../api/config";
import { toast } from "react-toastify";
import { useProfile } from "../../store/zudtand";
import { useNavigate } from "react-router-dom";

import Select from "@mui/material/Select";

const modules = {
  toolbar: [
    [
      {
        header: [1, 2, 3, 4, 5, 6, false],
      },
    ],
    [
      {
        font: [],
      },
    ],
    ["blockquote"],

    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
    [{ align: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const CreateQuestion = () => {
  const { data: user } = useProfile();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const quillRef = useRef(null);
  const router = useNavigate();

  const [language, setlanguage] = useState("");
  const handleChange = (event) => {
    setlanguage(event.target.value);
  };

  const onClick = async () => {
    if (title == "" || value == "" || language == "") {
      toast.error("Mời nhập đầy đủ");
      return;
    }
    let desc = quillRef.current.unprivilegedEditor.getText();
    if (quillRef.current.unprivilegedEditor.getLength() > 120) {
      desc =
        quillRef.current.unprivilegedEditor.getText().slice(0, 117) + "...";
    }

    try {
      const question = {
        title,
        userId: user.id,
        content: JSON.stringify(value),
        desc: desc,
        language,
        profile: {
          username: user.username,
          avatar: user.avatar,
        },
        createdAt: new Date(),
      };

      await axiosPath.post("/questions", question);
      toast.success("Tạo bài viết thành công");
      router("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-end">
        <div className="flex-1 mr-4">
          <input
            type="text"
            placeholder="Tiêu đề"
            className="text-3xl border-b w-full outline-none py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Loại ngôn ngữ
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={language}
              onChange={handleChange}
              label="Loại ngôn ngữ"
            >
              <MenuItem value={"javascript"}>JavaScript</MenuItem>
              <MenuItem value={"html"}>HTML</MenuItem>
              <MenuItem value={"css"}>Css</MenuItem>
              <MenuItem value={"php"}>PHP</MenuItem>
              <MenuItem value={"react"}>React</MenuItem>
              <MenuItem value={"nextjs"}>NextJs</MenuItem>
              <MenuItem value={"lavarel"}>Lavarel</MenuItem>
              <MenuItem value={"khac"}>Khac</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className=" pl-8 ">
          <Button variant="contained" endIcon={<SendIcon />} onClick={onClick}>
            Xuất bản
          </Button>
        </div>
      </div>

      {/* body */}
      <div className="grid grid-cols-2 mt-8 gap-4 h-full">
        <div>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
            className="border-none w-full h-full"
            modules={modules}
            formats={[
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "color",
              "background",
              "script",
              "header",
              "blockquote",
              "indent",
              "list",
              "direction",
              "align",
              "link",
              "image",
              "video",
              "formula",
            ]}
            placeholder="Mời viết "
          ></ReactQuill>
        </div>
        <div className="w-full h-full">
          <div className="h-[68px] w-full text-center text-xl font-bold flex items-center justify-center">
            Bản xem trước
          </div>
          <ReactQuill
            value={value}
            className="border-none w-full h-full"
            modules={{
              toolbar: false,
            }}
            readOnly
          ></ReactQuill>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
