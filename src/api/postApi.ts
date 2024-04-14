import { TPostPayload } from "@/interfaces/post/post-list-payload";
import { MinlyMediaAPI } from "./MinlyMediaAPI";
import { TCreatePostPayload } from "@/interfaces/post/create-post-payload";
import { TPostIdPayload } from "@/interfaces/post/post-id-payload";

// Function to handle errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  console.log("error: ", error);
  console.log("error.response: ", error.response);
  return error.response || error;
};

export const getPaginatedPosts = async ({
  pageNumber,
  pageSize,
}: TPostPayload) => {
  return MinlyMediaAPI.get(
    `/post?pageNumber=${pageNumber}&pageSize=${pageSize}`
  )
    .then((response) => response.data)
    .catch(handleError);
};

export const getPost = (postId: string) => {
  return MinlyMediaAPI.get(`/post/${postId}`)
    .then((response) => response.data)
    .catch(handleError);
};

export const createPost = async (
  payload: TCreatePostPayload & { token: string }
) => {
  const formData = new FormData();
  console.log("payload.media: ", payload.media);
  formData.append("caption", payload.caption);
  formData.append("media", payload.media);

  return MinlyMediaAPI.post(`/post`, formData, {
    headers: {
      Authorization: `Bearer ${payload.token}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => response.data)
    .catch(handleError);
};

// export const updatePost = (postId: string, postPayload: any, token: string) => {
//   return MinlyMediaAPI.put(`/post/${postId}`, postPayload, {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//     .then((response) => response.data)
//     .catch(handleError);
// };

export const deletePost = async ({
  postId,
  token,
}: TPostIdPayload & { token: string }) => {
  return MinlyMediaAPI.delete(`/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.data)
    .catch(handleError);
};

export const likePost = async ({
  postId,
  token,
}: TPostIdPayload & { token: string }) => {
  return MinlyMediaAPI.post(
    `/post/like/${postId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((response) => response.data)
    .catch(handleError);
};

export const dislikePost = async ({
  postId,
  token,
}: TPostIdPayload & { token: string }) => {
  return MinlyMediaAPI.post(
    `/post/dislike/${postId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((response) => response.data)
    .catch(handleError);
};
