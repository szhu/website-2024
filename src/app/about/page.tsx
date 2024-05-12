/* eslint-disable @next/next/no-img-element */

const page: React.FC<unknown> = () => {
  return (
    <>
      <p>
        <img
          alt="A fake plant in a pot"
          width="600"
          height="600"
          draggable="false"
          src="https://www.ikea.com/us/en/images/products/fejka-artificial-potted-plant-with-pot-indoor-outdoor-succulent__0614211_pe686835_s5.jpg?f=s"
          title="Hi there! It’s 4:22 AM in New York."
        />
      </p>
      <p>Hi, I’m Sean. I’m a software engineer and aspiring designer.</p>
      <p>
        I want to create tools that enable people to do more of what they want
        to do.
      </p>
      <p>
        I want what I make to be useful for the general public, especially for
        people historically underserved by tech.
      </p>
    </>
  );
};

export default page;
