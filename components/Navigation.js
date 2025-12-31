import React from "react";
import Image from "next/legacy/image";
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
      readState: { icon, navbarOpen },
    },
  } = useQuery(readState("icon, navbarOpen"));

  if(navbarOpen ===  undefined){
    return <></>
  }

  return (
    <>
      <nav className={"navigation " + (navbarOpen ? "h-[170px]" : "")}>
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full relative justify-between flex sm:w-auto sm:static sm:block sm:justify-start">
            <div className="title-container animate-fade-in">
              <Image src="/seal.png" height={100} width={75} quality="100" />
              <NavigationLink type="" toggle="homeToggled">
                <h1 className="text-3xl">Bad seal Studios</h1>
              </NavigationLink>
            </div>
            <div
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              onClick={() => setState({ navbarOpen: !navbarOpen })}
            >
              <FontAwesomeIcon icon={faBars} size="sm" />
            </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center  bg-[#A2D9FF]" +
              (navbarOpen ? "flex" : " hidden")
            }
          >
            <div className="navbar-links  animate-fade-in">
              <NavigationLink type="" toggle="projectsToggled">
                Projects
              </NavigationLink>
              <NavigationLink type="resume" toggle="resumeToggled">
                Resume
              </NavigationLink>
              <NavigationLink
                //key={icon["blogToggled"]}
                type="blog"
                toggle="blogToggled"
              >
                Blog
              </NavigationLink>
              <NavigationLink
                // key={icon["projectsToggled"]}
                type="about"
                toggle="aboutToggled"
              >
                About
              </NavigationLink>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={
          "absolute z-30 w-full h-[60px] bg-nav-wave " +
          (navbarOpen ? "top-36" : "top-12")
        }
      />
    </>
  );

  function NavigationLink(props) {
    console.log(props, "props in NavigationLink");
    const { toggle } = props;
    return (
      (<Link
        href={`/${props.type}`}
        className={`flex items-center mr-3 ${
          router.pathname === `/${props.type}`
            ? "text-blue-800 font-medium"
            : "navigation-link"
        }`}
        onClick={() => {
          setState({
            icon: { ...RESET_ICON, [toggle]: true },
            showSpinner: true,
          });
        }}>

        {props.children}
        <FontAwesomeIcon
          className={`navigation-icon ${props?.children?.props?.children === "Badseal Studios" ? "hidden" : ""}`}
          icon={icon[toggle] ? faAngleUp : faAngleDown}
          size="sm"
        />

      </Link>)
    );
  }
}
