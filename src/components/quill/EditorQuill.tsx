import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditorQuill = () => {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      theme="snow"
      placeholder="trung nè"
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
      }}
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
        "code-block",
        "indent",
        "list",
        "direction",
        "align",
        "link",
        "image",
        "video",
        "formula",
      ]}
    />
  );
};

export default EditorQuill;
