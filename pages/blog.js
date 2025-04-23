import React, { useEffect } from "react";
import Image from "next/legacy/image";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setState } from "../operations/mutation";
import { useQuery } from "@apollo/client";
import { ALL_POST, readState } from "../operations/query";
import { faInfoCircle, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { getStandAloneApolloClient } from "./_app";
import Link from "next/link";
import connectMongo from "../dbConfig/mongoose";
import Head from "next/head";
import { useInView } from "react-intersection-observer";

export default function blog({ posts, error }) {
  const {
    data: {
      readState: { navbarOpen, posts: postsVar },
    },
  } = useQuery(readState("navbarOpen, posts"));

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (error) return console.error(error);
    if (posts) {
      setState({ posts });
    }
    setState({ showSpinner: false });
  }, []);
  return (
    <div className={`blog-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
    <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Blogs page of the portfolio website developed by John Cervantes."
        />
      </Head>
      {/* <div
        className={`flex justify-center items-center  absolute ${
          navbarOpen ? "top-52" : "top-28"
        } right-5 sm:top-28`}
      >
        <div className="text-blue-300 hover-trigger">
          <FontAwesomeIcon icon={faInfoCircle} size={"2x"} className="mr-1" />
          <div className="absolute right-5 rounded bg-black w-[300px] hover-target p-3 z-50">
            Crud operations are available in public intentionally for demo purposes only.
            Updating data will not be reflected in the front-end immediately by
            design. Please be patient when updating
            data and edit responsibly :)
          </div>
        </div>
        <button
          onClick={() =>
            setState({ showModal: { show: true, type: "addPost" } })
          }
        >
          Add+
        </button>
      </div> */}
      <div className="post-container">
        {postsVar.map((post) => {
          return (
            <Link href={`/blog/${post._id}`} key={post._id} legacyBehavior>
              <div ref={ref} className="post-card group animate-fade-in-up">
                {/* <div className="relative group-hover:scale-x-105 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150 h-[150px] sm:h-[250px] w-full">
                  <Image
                    src={JSON.parse(post.banner)[Object.keys(JSON.parse(post.banner))[0]]}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                  />
                </div> */}
                <div className="p-3 relative">
                  <p className="font-semibold text-2xl">{post.postName} </p>
                  <p className="flex font-light items-baseline text-green-100 ">
                    <FontAwesomeIcon
                      className="mr-1"
                      icon={faCalendar}
                      size="xs"
                    />
                    {new Date(Number(post.date)).toString().substring(0, 15)}
                  </p>
                  <p className="text-justify mb-7">
                    {post.shortDescription}
                    <span className="text-yellow-500 absolute right-4 bottom-4">
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
            </Link>
          );
        })}
      </div>
      <div className="featured-container divide-y divide-white">
        <p className="text-2xl text-center w-[150px] mx-auto m-1 text-white bg-[#c2b280]">
          Featured
        </p>

        {postsVar.slice(0, 5).map((post) => {
          return (
            <Link href={`/blog/${post._id}`} key={post._id} legacyBehavior>
              <div className="flex h-[75px] p-1 group hover:cursor-pointer">
                <div className="relative max-h-[75px] w-[150px]">
                  <Image
                    src="/defaultBanner.png"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                  />
                </div>
                <div className="flex justify-center items-center w-full p-1 max-h-[75px] overflow-hidden text-lg font-medium group-hover:text-yellow-500 group-hover:underline text-center">
                  <p>{post.postName}</p>
                </div>
              </div>
            </Link>
            
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await connectMongo();
    const client = getStandAloneApolloClient();
    const { data, error } = await client.query(
      { query: ALL_POST },
      {
        fetchPolicy: "no-cache",
      }
    );

    if (!data) {
      return { props: { projects: [], error } };
    }
    return {
      props: {
        posts: data.posts,
      },
      //revalidate: 1,
    };
  } catch (error) {
    return { props: { error: error.message } };
  }
}
