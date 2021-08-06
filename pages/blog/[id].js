import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { readState } from "../../operations/query";
import { useQuery } from "@apollo/client";
import { setState, updatePost } from "../../operations/mutation";
import { uploadPhoto } from "../../helpers/aws";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const [post, setPost] = useState(undefined);
  const [uneditedPost, setUneditedPost] = useState(undefined);
  const [images, setImages] = useState({});
  const [banner, setBanner] = useState(undefined);
  const {
    data: {
      readState: { posts: postsVar, navbarOpen },
    },
  } = useQuery(readState("posts, navbarOpen"));

  useEffect(() => {
    const post = postsVar.find((p) => p._id === id);
    setPost(post);
    setUneditedPost(post)
  }, [id, postsVar]);

  if (!post) {
    return (
      <div
        className={`blog-container ${
          navbarOpen ? "pt-60" : "pt-36"
        } min-h-screen`}
      />
    );
  }

  if (editMode) {
    return editForm();
  }

  return (
    <div className={`projects-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
      <div className="relative bg-white w-10/12 mx-auto text-center py-20 px-2">
        <button
          className="absolute top-3 right-5"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <div
          className={"font-semibold text-3xl text-center text-green-700"}
        >
          {uneditedPost.postName}
        </div>
        <div className="divider" />

        <div className="w-[80%] mx-auto flex justify-end font-light items-baseline text-green-900 mb-5">
          <FontAwesomeIcon className="mr-1" icon={faCalendar} size="xs" />
          {new Date(Number(post.date)).toString().substring(0, 15)}
        </div>

        <div className="relative w-[60%] h-[200px] mx-auto">
          <Image src={uneditedPost.banner} layout="fill" />
        </div>

        <div className="text-left px-5 py-10 whitespace-pre-wrap">
          <p>{uneditedPost.content}</p>
        </div>
      </div>
    </div>
  );

  function editForm() {
    return (
      <div className={`homepage-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
        <div className="relative bg-white w-10/12 mx-auto text-center py-20 px-2">
          <button
            className=" absolute top-3 right-5 text-red-900"
            onClick={() => {
              setEditMode(false);
              setImages({});
            }}
          >
            Cancel
          </button>
          <textarea
            className="overflow-hidden text-center w-[300px] resize-none text-3xl text-green-700 "
            placeholder="Edit title..."
            value={post.postName}
            onChange={(e) => setPost({ ...post, postName: e.target.value })}
            rows="1"
          ></textarea>
          <div className="divider" />

          <div className="flex items-center px-2 justify-center w-[80%] bg-gray-300 mx-auto h-[250px]">
            <Image
              src={
                banner
                  ? URL.createObjectURL(banner.target.files[0])
                  : post.banner
              }
              width="500px"
              height="200px"
              unoptimized={true}
            />
          </div>
          <input
            className="w-[70%] sm:w-[30%] mt-3"
            onClick={(e) => {
              e.target.value = null;
              setBanner(undefined);
            }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              setBanner(e);
            }}
          />

          <div className="text-left p-5">
            <textarea
              rows="10"
              onChange={(e) => {
                setPost({ ...post, content: e.target.value });
              }}
              value={post.content}
              placeholder="Edit full description..."
            />

            <button
              className="block mt-10"
              onClick={async () => {
                let updatedBanner;
                setState({ showSpinner: true });
                if (banner) {
                  updatedBanner = await uploadPhoto(banner);
                }
                await updatePost({
                  ...post,
                  banner: updatedBanner ? updatedBanner : post.banner,
                });
                setEditMode(false);
                setState({ showSpinner: false });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
