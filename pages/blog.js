import React, { useEffect } from "react";
import Image from "next/image";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setState } from "../operations/mutation";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";  
export default function blog() {
  const {
    data: {
      readState: { navbarOpen },
    },
  } = useQuery(readState("navbarOpen"));

  useEffect(() => {
    setState({ showSpinner: false });
  }, []);
  return (
    <div className={`blog-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
      <div className="post-container">
        <div className="post-card group">
          <div className="relative group-hover:scale-x-105 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150 h-[150px] sm:h-[250px] w-full">
            <Image src="/stock.jpg" layout="fill"></Image>
          </div>
          <div className="p-3">
            <p className="font-bold">Title</p>
            <p className="font-light">January 1, 2000</p>
            <p className="text-justify">
              Mauris neque quam, fermentum ut nisl vitae, convallis maximus
              nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor
              magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies
              mi non congue ullam corper. Praesent tincidunt sed tellus ut
              rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies
              congue gravida diam non fringilla. . .{" "}
              <span className="text-yellow-600">
                Read more
                <FontAwesomeIcon
                  className="ml-1"
                  icon={faAngleDoubleRight}
                  size="xs"
                ></FontAwesomeIcon>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="featured-container">featured post</div>
    </div>
  );
}
