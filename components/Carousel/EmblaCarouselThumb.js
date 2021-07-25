import React from "react";
import Image from "next/image";

export const Thumb = ({ selected, onClick, imgSrc }) => (
  <div
    className={`embla__slide embla__slide--thumb ${
      selected ? "is-selected" : ""
    }`}
  >
    <button
      onClick={onClick}
      className="embla__slide__inner embla__slide__inner--thumb"
      type="button"
    >
      <Image
        className="embla__slide__thumbnail"
        layout="fill"
        // width="350px"
        // height="200px"
        src={imgSrc}
        quality="30"
        priority="true"
        //blurDataURL={image.blurDataURL}
        //alt="Picture of the missing pet"
        //placeholder="blur"
      />
    </button>
  </div>
);
