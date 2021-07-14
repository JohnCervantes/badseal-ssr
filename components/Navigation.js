import React from "react";
import seal from "../assets/seal3.png";
import Image from "next/image";
import { useQuery, useLazyQuery } from "@apollo/client";
import { setState } from "../operations/mutation";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { readState } from "../operations/query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import { RESET_ICON } from "../cache";

export default function Navigation() {
  const router = useRouter();
  const {
    data: {
      readState: { icon },
    },
  } = useQuery(readState("icon"));
  return (
    <div className="navigation">
      <div className="title-container">
        <Image src={seal} height={20} width={50} />
        <p>Badseal Studios</p>
      </div>

      <div className="navbar-links">
        <NavigationLink
          //key={icon["resumeToggled"]}
          type="resume"
          toggle="resumeToggled"
        >
          Resume
        </NavigationLink>
        <NavigationLink
          // key={icon["projectsToggled"]}
          type="projects"
          toggle="projectsToggled"
        >
          Projects
        </NavigationLink>
        <NavigationLink
          //key={icon["blogToggled"]}
          type="blog"
          toggle="blogToggled"
        >
          Blog
        </NavigationLink>
      </div>
    </div>
  );

  function NavigationLink(props) {
    const { toggle } = props;
    return (
      <Link href={`/${props.type}`}>
        <a
          className={`mr-3 ${
            router.pathname === `/${props.type}`
              ? "text-white"
              : "navigation-link"
          }`}
          onClick={() => {
            setState({
              icon: { ...RESET_ICON, [toggle]: true },
            });
          }}
        >
          {" "}
          {props.children}{" "}
          <FontAwesomeIcon
            className="navigation-icon"
            icon={icon[toggle] ? faAngleUp : faAngleDown}
            size="sm"
          />
        </a>
      </Link>
    );
  }
}
