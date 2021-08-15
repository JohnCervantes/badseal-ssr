import { gql } from "@apollo/client";
import { state } from "../cache";
import { client } from "../pages/_app";

const ADD_PROJECT = gql`
  mutation addProject(
    $thumbnail: String!
    $image: String!
    $projectName: String!
    $shortDescription: String
    $longDescription: String
    $technology: String!
    $status: String!
    $feature: String!
    $git: String!
  ) {
    addProject(
      thumbnail: $thumbnail
      image: $image
      projectName: $projectName
      shortDescription: $shortDescription
      longDescription: $longDescription
      technology: $technology
      status: $status
      feature: $feature
      git: $git
    ) {
      _id
      thumbnail
      image
      projectName
      shortDescription
      longDescription
      git
      technology
      status
      feature
    }
  }
`;

const ADD_POST = gql`
  mutation addPost(
    $banner: String
    $postName: String!
    $date: String!
    $shortDescription: String!
    $content: String!
  ) {
    addPost(
      banner: $banner
      postName: $postName
      date: $date
      shortDescription: $shortDescription
      content: $content
    ) {
      _id
      banner
      postName
      date
      shortDescription
      content
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $_id: ID!
    $thumbnail: String
    $image: String
    $projectName: String
    $shortDescription: String
    $longDescription: String
    $technology: String
    $status: String
    $feature: String
    $git: String
  ) {
    updateProject(
      _id: $_id
      thumbnail: $thumbnail
      image: $image
      projectName: $projectName
      shortDescription: $shortDescription
      longDescription: $longDescription
      technology: $technology
      status: $status
      feature: $feature
      git: $git
    ) {
      _id
      thumbnail
      image
      projectName
      shortDescription
      longDescription
      git
      technology
      status
      feature
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost(
    $_id: ID!
    $banner: String
    $postName: String!
    $date: String!
    $shortDescription: String!
    $content: String!
  ) {
    updatePost(
      _id: $_id
      banner: $banner
      postName: $postName
      date: $date
      shortDescription: $shortDescription
      content: $content
    ) {
      _id
      banner
      postName
      date
      shortDescription
      content
    }
  }
`;

export async function addProject(
  thumbnail,
  image,
  projectName,
  shortDescription,
  longDescription,
  technology,
  status,
  feature,
  git
) {
  try {
    const {
      data: { addProject },
    } = await client.mutate({
      mutation: ADD_PROJECT,
      variables: {
        thumbnail,
        image,
        projectName,
        shortDescription,
        longDescription,
        technology,
        status,
        feature,
        git,
      },
    });
    setState({
      projects: state().projects.concat(addProject),
      showModal: { show: false, type: "" },
      showToast: {
        show: true,
        status: "success",
        header: "Success",
        message: "New project has been successfully added!",
      },
    });
  } catch (e) {
    setState({
      showToast: {
        showToast: {
          show: true,
          status: "error",
          header: "Failed to add a project",
          message: e.message,
        },
      },
    });
  }
}

export async function addPost(
  banner,
  postName,
  date,
  shortDescription,
  content
) {
  try {
    const {
      data: { addPost },
    } = await client.mutate({
      mutation: ADD_POST,
      variables: {
        banner,
        postName,
        date,
        shortDescription,
        content,
      },
    });
    setState({
      posts: state().posts.concat(addPost),
      showModal: { show: false, type: "" },
      showToast: {
        show: true,
        status: "success",
        header: "Success",
        message: "New post has been successfully added!",
      },
    });
  } catch (e) {
    setState({
      showToast: {
        showToast: {
          show: true,
          status: "error",
          header: "Failed to add a post",
          message: e.message,
        },
      },
    });
  }
}

export async function updateProject({
  _id,
  thumbnail,
  image,
  projectName,
  shortDescription,
  longDescription,
  technology,
  status,
  feature,
  git,
}) {
  try {
    const {
      data: { updateProject },
    } = await client.mutate({
      mutation: UPDATE_PROJECT,
      variables: {
        _id,
        thumbnail,
        image,
        projectName,
        shortDescription,
        longDescription,
        technology,
        status,
        feature,
        git,
      },
    });
    const updatedProjects = [...state().projects];
    updatedProjects.forEach(function (item, i) {
      if (item._id == updateProject._id) updatedProjects[i] = updateProject;
    });
    setState({
      projects: updatedProjects,
      showToast: {
        show: true,
        status: "success",
        header: "Success",
        message: "Project has been successfully updated!",
      },
    });
  } catch (e) {
    setState({
      showToast: {
        showToast: {
          show: true,
          status: "error",
          header: "Failed to add a project",
          message: e.message,
        },
      },
    });
  }
}

export async function updatePost({
  _id,
  banner,
  postName,
  date,
  shortDescription,
  content,
}) {
  try {
    const {
      data: { updatePost },
    } = await client.mutate({
      mutation: UPDATE_POST,
      variables: {
        _id,
        banner,
        postName,
        date,
        shortDescription,
        content,
      },
    });
    const updatedPosts = [...state().posts];
    updatedPosts.forEach(function (item, i) {
      if (item._id == updatePost._id) updatedPosts[i] = updatePost;
    });
    setState({
      posts: updatedPosts,
      showToast: {
        show: true,
        status: "success",
        header: "Success",
        message: "Blog post has been successfully updated!",
      },
    });
  } catch (e) {
    setState({
      showToast: {
        showToast: {
          show: true,
          status: "error",
          header: "Failed to updated blog post",
          message: e.message,
        },
      },
    });
  }
}

export function setState(field) {
  state({ ...state(), ...field });
}
