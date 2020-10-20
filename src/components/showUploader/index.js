import React from "react";
import * as dayjs from "dayjs";
import * as client from "../../client";
import { useForm } from "react-hook-form";

export default function ShowUploader() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await client.submistShow(data.showRecording, dayjs().format());

    alert("Se subió el recording");
  };

  return (
    <div>
      <form className="newShowForm" onSubmit={handleSubmit(onSubmit)}>
        <h2> Pegar código de la transmisión</h2>
        <label htmlFor="showRecording" name="video">
          <textarea
            ref={register({ required: true })}
            name="showRecording"
            id="showRecording"
            cols="30"
            rows="10"
          ></textarea>
        </label>
        <input type="submit" value="subirPrograma" />
      </form>
    </div>
  );
}
