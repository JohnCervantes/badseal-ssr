import Image from "next/image";
import { useQuery } from "@apollo/client";
import { readState, ALL_PROJECTS } from "../operations/query";
import { useEffect } from "react";
import { setState, UPDATE_PROJECT } from "../operations/mutation";
import connectMongo from "../dbConfig/mongoose";
import Head from "next/head";
import { getSignedUrl } from "../helpers/aws";
import { getStandAloneApolloClient } from "./_app";

export default function HomePage() {
  const {
    data: {
      readState: { navbarOpen },
    },
  } = useQuery(readState("navbarOpen"));

  useEffect(() => {
    setState({ showSpinner: false });
  });

  return (
    <div>
      <Head>
        <title>Welcome - About me</title>
        <meta
          name="description"
          content="Home page of the portfolio website developed by John Cervantes. It has basic information about him"
        />
      </Head>
      <div
        className={`homepage-container flex-col items-center justify-center  ${
          navbarOpen ? "pt-60" : "pt-36"
        }`}
      >
        <div>
          <p className="homepage-title mb-5">
            Welcome and thank you for visiting my website!
          </p>
          <div className="relative mx-auto container w-full mb-5 h-[200px] w-[190px] sm:w-[200px] sm:h-[200px]">
            <Image
              src="/john.jpg"
              quality="100"
              layout="fill"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            ></Image>
          </div>
        </div>
        <div className="container mx-auto w-full bg-white px-10 py-16  text-black text-left">
          <p className="font-semibold text-3xl text-center">About me</p>
          <div className="divider" />
          <p>
            John is a software developer with a bachelor’s degree in Computer
            Science. The exposure to various technologies he received in the
            workplace and school solidified his career choice in the field of
            information technology. The aspect that he enjoys most about
            technology is the level of creativity and passion that developers
            applies to their projects. He is constantly sharpening his skills by
            working on open source and personal projects. His hobbies are
            playing video games, watching movies and TV shows.
            <br />
            <br />I built this website with these goals in my mind. I want to
            discuss the latest and upcoming trends in the information technology
            world. I also would like to share my work with everyone, so I can
            build connections with others and also to collaborate with other
            programmers. If you have any questions or concerns, don't hesitate
            to connect with me!
          </p>
          <div className="flex sm:flex-row flex-col pt-5">
            <div className="sm:w-[50%] h-[300px] sm:h-auto relative">
              <Image
                src="/hackers-island.png"
                quality="100"
                layout="fill"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              />
            </div>
            <div className="mt-5 sm:mt-0 sm:w-[50%] bg-blue-100">
              <p className="font-semibold text-2xl sm:pl-5 text-center sm:text-left">
                Hacker's Island
              </p>
              <div className="divider mx-auto sm:ml-5" />
              <p className="p-5">
                One of his most significant projects is called Hacker’s Island,
                which was an educational video game that teaches the players on
                how they can protect their anonymity against common
                cyber-attacks. The idea was to increase the public awareness of
                cybercrimes and cybersecurity. After conducting research on many
                forms of common cyberattacks, he used this knowledge and turned
                it into an educational video game. He improved his teamwork and
                communication skills by actively engaging and coordinating with
                everyone on the team. When John encounters an issue with his
                code, he is determined and focused on finding solutions to solve
                it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    await connectMongo();
    const client = getStandAloneApolloClient();
    const { data, error } = await client.query(
      { query: ALL_PROJECTS },
      {
        fetchPolicy: "no-cache",
      }
    );

    let projects = [...data.projects];
    let i = 0;

    if (!data) {
      return { props: { projects: [], error } };
    }

    for (const project of projects) {
      let imageUpdatedUrl = [];
      for (const image of JSON.parse(project.image)) {
        let imageKey = Object.keys(image)[0];
        if (imageKey.includes("seal")) break;
        const updatedPresignedURLCarousel = await getSignedUrl(imageKey);

        imageUpdatedUrl.push({ [imageKey]: updatedPresignedURLCarousel });
      }
      if (imageUpdatedUrl.length > 0) {
        let thumbnailKey = Object.keys(JSON.parse(project.thumbnail))[0];
        const updatedPresignedURLThumbnail = await getSignedUrl(thumbnailKey);
        projects[i] = {
          ...projects[i],
          image: JSON.stringify(imageUpdatedUrl),
          thumbnail: JSON.stringify({
            [thumbnailKey]: updatedPresignedURLThumbnail,
          }),
        };
        client.mutate({
          mutation: UPDATE_PROJECT,
          variables: {
            _id: projects[i]._id,
            thumbnail: projects[i].thumbnail,
            image: projects[i].image,
            projectName: projects[i].projectName,
            shortDescription: projects[i].shortDescription,
            longDescription: projects[i].longDescription,
            technology: projects[i].technology,
            status: projects[i].status,
            feature: projects[i].feature,
            git: projects[i].git,
          },
        });
      }
      i++;
    }

    return {
      props: {
        projects,
      },
      revalidate: 518400,
    };
  } catch (error) {
    return { props: { error: error.message } };
  }
}
