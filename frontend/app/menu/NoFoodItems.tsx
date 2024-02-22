import Image from "next/image";
import React from "react";

interface Props {
  dc: string;
}

const NoFoodItems = ({ dc }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center px-32 gap-5">
      <h1 className="text-5xl text-primary font-semibold">Sorry!</h1>
      <p className="text-xl">
        It appears that {dc} isn&apos;t serving food at this time... please try
        another day!
      </p>
      <img src="/../icon.png" alt="Cow chef" />
    </div>
  );
};

export default NoFoodItems;
