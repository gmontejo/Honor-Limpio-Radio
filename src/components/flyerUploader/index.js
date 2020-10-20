import React from "react";
import { useForm } from "react-hook-form";
import * as client from "../../client";

export default function FlyerUploader() {
  const { register, handleSubmit } = useForm();
  let reader = new FileReader();

  const onSubmit = async (data) => {
    reader.readAsArrayBuffer(data.flyerImg[0]);
    reader.onload = async () => {
      await client.submitFlyer(reader.result);
    };
  };

  return (
    <div>
      <form className="flyerForm" onSubmit={handleSubmit(onSubmit)}>
        <h2>Actualizar el flyer de la página</h2>
        <label htmlFor="flyerImg">
          <input
            ref={register({ required: true })}
            type="file"
            name="flyerImg"
            accept="image/*"
          />
        </label>
        <input type="submit" value="SubirFoto" />
      </form>
    </div>
  );
}

//FUNCTIONALITY TO USE IN HOME IN CASE CLIENT WANTED TO CHANGE FLYER IMG ON HIS OWN. !!!INCREASES LOAD TIME CONSIDERABLY!!!

// useEffect(() => {
//   if (imgReady && imgData) {
//     document.getElementById("flyer").src = imgData;
//     document.getElementById("flyerPhone").src = imgData;
//   } else {
//     return;
//   }
// }, [imgReady, imgData]);

// const getImg = async () => {
//   const flyer = await client.getFlyer();

//   const base64 = Buffer.from(flyer.data.file).toString("base64");
//   const datajpg = "data:image/jpg;base64," + base64;
//   setImgReady(true);
//   setImgData(datajpg);
// };
