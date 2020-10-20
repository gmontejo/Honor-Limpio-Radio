import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import * as dayjs from "dayjs";
import "react-quill/dist/quill.snow.css";
import Video from "../VideoUploader";
import FlyerUploader from "../flyerUploader";
import ShowUploader from "../showUploader";
import * as client from "../../client";

export default function PostSandbox() {
  const [value, setValue] = useState("");
  const [delta, setDelta] = useState({});
  const { register, handleSubmit } = useForm();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const onSubmit = async (data) => {
    const createdAt = `Creado el ${dayjs().format("DD/MM/YY - HH:mm")}`;

    window.alert("Subiendo Post");

    await client.submitPost(data.title, delta, createdAt, dayjs().format());
  };

  const handleQuillChange = (content, delta, e, editor) => {
    setValue(content);
    setDelta(editor.getContents().ops);
  };

  return (
    <div className="postSandboxContainer">
      <div className="postSandboxContent">
        <div className="postUploader">
          <h2>Crea una entrada de blog</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">
              <input
                ref={register({ required: true })}
                type="text"
                id="title"
                name="title"
                placeholder="Ingresa el título del artículo"
              />
            </label>
            <label htmlFor="articleContent"></label>
            <div name="articleContent" className="quillContainer"></div>
            <input className="submitBtn" type="submit" value="Postear" />
          </form>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={handleQuillChange}
          />
        </div>
        <Video />
        <FlyerUploader />
        <ShowUploader />
      </div>
    </div>
  );
}
