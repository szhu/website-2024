/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import image17850575dc7087eb from "./image-17850575dc7087eb.ico";
import image6b9ee1b51afdab3a from "./image-6b9ee1b51afdab3a.png";
import image7df1aad9ebf30437 from "./image-7df1aad9ebf30437.png";
import image9747fe15bbfa967c from "./image-9747fe15bbfa967c.png";
import imagea5878a11bb0293a1 from "./image-a5878a11bb0293a1.png";
import imagefd2b915a9dac1c56 from "./image-fd2b915a9dac1c56.png";

const page: React.FC<unknown> = () => {
  return (
    <>
      <p>fsdfdsfdsfdsfksdf</p>
      <p>sdf</p>
      <p>dsf</p>
      <p>dsfdsfdsfds</p>
      <p>
        <Image
          alt=""
          src={image9747fe15bbfa967c}
          data-filename="image-9747fe15bbfa967c.png"
        />
      </p>
      <p>
        <br />
      </p>
      <p>
        <Image
          alt=""
          src={image6b9ee1b51afdab3a}
          data-filename="image-6b9ee1b51afdab3a.png"
        />
      </p>
      <p>
        <Image
          alt=""
          src={image7df1aad9ebf30437}
          data-filename="image-7df1aad9ebf30437.png"
        />
      </p>
      <p>
        <Image
          alt=""
          src={imagefd2b915a9dac1c56}
          data-filename="image-fd2b915a9dac1c56.png"
        />
      </p>
      <p>
        <Image
          alt=""
          src={image17850575dc7087eb}
          data-filename="image-17850575dc7087eb.ico"
        />
      </p>
      <p>
        <Image
          alt=""
          src={imagea5878a11bb0293a1}
          data-filename="image-a5878a11bb0293a1.png"
        />
      </p>
      <p>
        <br />
      </p>
    </>
  );
};

export default page;
