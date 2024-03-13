import React from "react";

const Footer = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center p-10">
      <p className="text-center text-white">
        Have any questions? Email us at{" "}
        <a
          href="mailto:aggiemenus@gmail.com"
          className="text-primary hover:underline"
        >
          aggiemenus@gmail.com
        </a>{" "}
        and let us know!
      </p>
    </div>
  );
};

export default Footer;
