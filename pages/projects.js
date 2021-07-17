import React from "react";
import Image from "next/image";

export default function projects() {
  return (
    <div className="projects-container grid-layout">
      <div className="project-card group">
        <div className="relative w-[200px] h-full">
          <Image
            className="group-hover:scale-x-105 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
            layout="fill"
            src="/stock.jpg"
          ></Image>
        </div>
        <div className="break-words w-[70%] ml-1">
          Project Name <br /> <br />
          some project blah blah built with: this
        </div>
      </div>
      <div className="project-card group">
        <div className="relative w-[200px] h-full">
          <Image
            className="group-hover:scale-x-105 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
            layout="fill"
            src="/stock.jpg"
          ></Image>
        </div>
        <div className="break-words w-[70%] ml-1">
          Project Name <br /> <br />
          some project blah blah built with: this
        </div>
      </div>
      <div className="project-card group">
        <div className="relative w-[200px] h-full">
          <Image
            className="group-hover:scale-x-105 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
            layout="fill"
            src="/stock.jpg"
          ></Image>
        </div>
        <div className="break-words w-[70%] ml-1">
          Project Name <br /> <br />
          some project blah blah built with: this
        </div>
      </div>
      <div className="project-card group">
        <div className="relative w-[200px] h-full">
          <Image
            className="group-hover:scale-x-105 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
            layout="fill"
            src="/stock.jpg"
          ></Image>
        </div>
        <div className="break-words w-[70%] ml-1">
          Project Name <br /> <br />
          some project blah blah built with: this
        </div>
      </div>
    </div>
  );
}
