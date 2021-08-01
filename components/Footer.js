import React from "react";
import Image from "next/image";

import { faArrowUp, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faLinkedin,
  faYoutubeSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer">
      <div
        className="border-2 group p-2 hover:border-white mb-3"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="group-hover:text-white group-hover:cursor-pointer">
          <FontAwesomeIcon icon={faArrowUp} /> {"  "}
          To the top
        </span>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="mr-2 cursor-pointer hover:text-white"
          size="2x"
        />
        <FontAwesomeIcon
          icon={faGithubSquare}
          className="mr-2 cursor-pointer hover:text-white"
          size="2x"
        />
        <FontAwesomeIcon
          icon={faLinkedin}
          className="mr-2 cursor-pointer hover:text-white"
          size="2x"
        />
        <FontAwesomeIcon
          icon={faYoutubeSquare}
          className="mr-2 cursor-pointer hover:text-white"
          size="2x"
        />
        <FontAwesomeIcon
          icon={faTwitterSquare}
          className="mr-2 cursor-pointer hover:text-white"
          size="2x"
        />
      </div>
    </div>
  );
}
