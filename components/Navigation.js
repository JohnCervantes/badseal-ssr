import React from "react";
import Image from "next/image";
import { useQuery, useLazyQuery } from "@apollo/client";
import { setState } from "../operations/mutation";
import {
  faAngleUp,
  faAngleDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
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

  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (  
    <>
      <nav className="navigation">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="title-container">
              <Image src="/seal3.png" height={20} width={50} />
              <NavigationLink type="" toggle="homeToggled">
                <p>Badseal Studios</p>
              </NavigationLink>
            </div>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars} size="sm" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? "flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div className="navbar-links">
              <NavigationLink type="resume" toggle="resumeToggled">
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
        </div>
      </nav>
    </>
  );

  function NavigationLink(props) {
    const { toggle } = props;
    return (
      <Link href={`/${props.type}`}>
        <a
          className={`mr-3 ${
            router.pathname === `/${props.type}`
              ? "text-blue-300"
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
            className={`navigation-icon ${props.type === "" ? "hidden" : ""}`}
            icon={icon[toggle] ? faAngleUp : faAngleDown}
            size="sm"
          />
        </a>
      </Link>
    );
  }
}
