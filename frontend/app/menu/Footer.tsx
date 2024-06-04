import React from "react";

const Footer = () => {
  return (
    <div className="bg-black flex flex-row items-center sm:justify-between justify-center sm:px-20 px-8 py-10">
      <p className="text-center text-white sm:text-xl text-sm">
        Made by{" "}
        <span className="font-semibold">
          <a href="https://aggieworks.org/" target="_blank">
            Aggieworks
          </a>
        </span>
      </p>
      <p className="text-center text-white sm:text-xl text-sm">
        Have any questions? Fill out{" "}
        <a
          href="https://airtable.com/appYxSI2HPTOwdEMn/shrhxNPYQR0pBfXE7"
          target="_blank"
          className="text-primary hover:underline"
        >
          this form
        </a>{" "}
        and let us know!
      </p>
    </div>
  );
};

export default Footer;
