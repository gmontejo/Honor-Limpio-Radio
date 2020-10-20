import React from "react";
import { useForm } from "react-hook-form";
import * as dayjs from "dayjs";
import * as client from "../../client";

export default function VideoUploader() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const url = data.videoCode.split(" ")[3];
    let videoID = url.split("embed/")[1];
    videoID = videoID.substring(0, videoID.length - 1);

    await client.submitVideo(
      data.title,
      data.comment,
      data.videoCode,
      videoID,
      dayjs().format()
    );

    window.alert("cargado");
  };

  return (
    <div className="videoUploaderContainer">
      <div className="videoUploaderContent">
        <h2>Cargar video a la página</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">
            <input
              ref={register({ required: true })}
              type="text"
              name="title"
              placeholder="titulo para presentar el video"
            />
          </label>
          <label htmlFor="comment">
            Breve descripción del video
            <textarea
              ref={register({ required: true })}
              name="comment"
              id="comment"
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <label htmlFor="videoCode" name="video">
            Pegar código del video
            <textarea
              ref={register({ required: true })}
              name="videoCode"
              id="videoCode"
              cols="30"
              rows="10"
            ></textarea>
          </label>
          <input type="submit" value="Subirvideo" />
        </form>
      </div>
    </div>
  );
}
