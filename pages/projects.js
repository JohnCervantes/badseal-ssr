import React from "react";
import Image from "next/image";
import { ALL_PROJECTS } from "../operations/query";
import { client } from "./_app";

export default function projects({ data, errors }) {
  return (
    <div className="projects-container grid-layout">
      <div className="project-card group">
        <div className="relative w-[200px] h-full">
          <Image
            className="group-hover:scale-x-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
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
            className="group-hover:scale-x-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
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
            className="group-hover:scale-x-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
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
            className="group-hover:scale-x-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
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

export const getServerSideProps = async () => {
  try {
    const { data } = await client.query(
      { query: ALL_PROJECTS },
      {
        fetchPolicy: "no-cache",
      }
    );
    // const newData = [];
    // await Promise.all(
    //   data.animals.map(async (animal) => {
    //     const { base64 } = await getPlaiceholder(animal.pic);
    //     newData.push({ ...animal, blurDataURL: base64 });
    //   })
    // );
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return { props: { errors: error.message } };
  }
};
