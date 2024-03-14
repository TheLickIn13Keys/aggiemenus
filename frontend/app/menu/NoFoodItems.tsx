import Image from "next/image";
import React from "react";

interface Props {
  dc: string;
}

const NoFoodItems = ({ dc }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl text-primary font-semibold">Sorry!</h1>
      <p className="text-xl text-center sm:px-32 px-12">
        It appears that {dc} isn&apos;t serving food at this time... please try
        another day!
      </p>
      <Image
        src="/../icon.png"
        alt="Cow chef"
        width={500}
        height={500}
        className="sm:size-96 size-64 items-center justify-center"
      />
    </div>
  );
};

export default NoFoodItems;
