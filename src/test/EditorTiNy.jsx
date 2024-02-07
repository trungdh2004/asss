import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function EditorTiNy() {
  const [value, setValue] = useState(
    "<p>The quick brown fox jumps over the lazy dog</p>"
  );
  const [text, setText] = useState("");
  const log = () => {
    console.log(value);
    console.log(text);
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => {
          setText(editor.getContent({ format: "text" }));
        }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({ format: "text" }));
        }}
        apiKey="n6pn6rh67flqjabos7pl47qzspuqfcg41hk61jduruuu84ft"
        init={{
          plugins:
            "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          ai_request: (request, respondWith) =>
            respondWith.string(() =>
              Promise.reject("See docs to implement AI Assistant")
            ),
        }}
        initialValue="Welcome to TinyMCE!"
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
