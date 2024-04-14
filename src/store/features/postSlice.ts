import {
  createPost,
  deletePost,
  dislikePost,
  getPaginatedPosts,
  likePost,
} from "@/api/postApi";
import { TStatusFlag } from "@/interfaces/post/flag-status";
import { TPost } from "@/interfaces/post/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Post = {
  posts: {
    total: number;
    data: TPost[];
  } | null;
  endOfScrolling: boolean | null;
  creatingPostFlag: TStatusFlag | null;
  likePostFlag: TStatusFlag | null;
  deletePostFlag: TStatusFlag | null;
  tempPost: { post?: TPost; index?: number } | null;
  loading: boolean | null;
  error: unknown | string | null;
};

const initialState: Post = {
  posts: null,
  creatingPostFlag: null,
  likePostFlag: null,
  endOfScrolling: null,
  deletePostFlag: null,
  tempPost: null,
  loading: null,
  error: null,
};

// Async Thunk s
export const getPaginatedPostsThunk = createAsyncThunk(
  "posts/getPaginatedPosts",
  getPaginatedPosts
);
export const createPostThunk = createAsyncThunk("posts/createPost", createPost);
export const likePostThunk = createAsyncThunk("posts/likePost", likePost);
export const dislikePostThunk = createAsyncThunk(
  "posts/dislikePost",
  dislikePost
);
export const deletePostThunk = createAsyncThunk("posts/deletePost", deletePost);

// Slice
export const postSlice = createSlice({
  name: "Posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  getPaginatedPosts reducers
    builder
      .addCase(getPaginatedPostsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaginatedPostsThunk.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.loading = false;
        if (action.payload?.data?.error) {
          state.error = action.payload.data;
        }
        if (action.payload.data) {
          if (state.posts?.total && +action.meta.arg.pageNumber > 1) {
            console.log("state.posts: ", state.posts);
            state.posts = {
              total: action.payload.total,
              data: [...state.posts.data, ...action.payload.data],
            };
          } else state.posts = action.payload;

          if (action.payload.data.length === 0) state.endOfScrolling = true;
        }
      })
      .addCase(getPaginatedPostsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //  createPost reducers
      .addCase(createPostThunk.pending, (state) => {
        state.creatingPostFlag = "Loading";
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        console.log("action: ", action);
        if (action.payload?.data?.error) {
          state.error = action.payload.data;
          state.creatingPostFlag = "Error";
        }
        if (action.payload) {
          state.creatingPostFlag = "Success";
          if (state.posts) {
            state.posts = {
              total: state.posts.total + 1,
              data: [action.payload, ...state.posts.data],
            };
          }
        }
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.creatingPostFlag = "Error";
        state.error = action.error;
      })

      //  likePost reducers
      .addCase(likePostThunk.pending, (state, action) => {
        console.log("action: ", action);
        state.likePostFlag = "Loading";
        // optimistic update
        if (state.posts) {
          const postId = action.meta.arg.postId;
          const user = JSON.parse(localStorage.getItem("user")!);
          state.posts = {
            ...state.posts,
            data: [
              ...state.posts.data.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likedBy: [
                        ...post.likedBy,
                        { id: user.id, fullName: user.fullName },
                      ],
                    }
                  : post
              ),
            ],
          };
        }
      })
      .addCase(likePostThunk.fulfilled, (state, action) => {
        console.log("action: ", action);
        if (action.payload?.data?.error) {
          state.likePostFlag = "Error";
          state.error = action.payload.data;
          // Roll Back
          if (state.posts) {
            const postId = action.meta.arg.postId;
            const user = JSON.parse(localStorage.getItem("user")!);
            state.posts = {
              ...state.posts,
              data: [
                ...state.posts.data.map((post) =>
                  post.id === postId
                    ? {
                        ...post,
                        likedBy: [
                          ...post.likedBy.filter(
                            (likedUser) => likedUser.id !== user.id
                          ),
                        ],
                      }
                    : post
                ),
              ],
            };
          }
        } else {
          state.likePostFlag = "Success";
        }
      })
      .addCase(likePostThunk.rejected, (state, action) => {
        state.likePostFlag = "Error";
        state.error = action.error;
        // Roll Back
        if (state.posts) {
          const postId = action.meta.arg.postId;
          const user = JSON.parse(localStorage.getItem("user")!);
          state.posts = {
            ...state.posts,
            data: [
              ...state.posts.data.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likedBy: [
                        ...post.likedBy.filter(
                          (likedUser) => likedUser.id !== user.id
                        ),
                      ],
                    }
                  : post
              ),
            ],
          };
        }
      })

      //  dislike Post reducers
      .addCase(dislikePostThunk.pending, (state, action) => {
        console.log("action: ", action);
        state.likePostFlag = "Loading";
        // optimistic update
        if (state.posts) {
          const postId = action.meta.arg.postId;
          const user = JSON.parse(localStorage.getItem("user")!);
          state.posts = {
            ...state.posts,
            data: [
              ...state.posts.data.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likedBy: [
                        ...post.likedBy.filter(
                          (likedUser) => likedUser.id !== user.id
                        ),
                      ],
                    }
                  : post
              ),
            ],
          };
        }
      })
      .addCase(dislikePostThunk.fulfilled, (state, action) => {
        console.log("action: ", action);
        if (action.payload?.data?.error) {
          state.likePostFlag = "Error";
          state.error = action.payload.data;
          // Roll Back
          if (state.posts) {
            const postId = action.meta.arg.postId;
            const user = JSON.parse(localStorage.getItem("user")!);
            state.posts = {
              ...state.posts,
              data: [
                ...state.posts.data.map((post) =>
                  post.id === postId
                    ? {
                        ...post,
                        likedBy: [
                          ...post.likedBy,
                          { id: user.id, fullName: user.fullName },
                        ],
                      }
                    : post
                ),
              ],
            };
          }
        } else {
          state.likePostFlag = "Success";
        }
      })
      .addCase(dislikePostThunk.rejected, (state, action) => {
        state.likePostFlag = "Error";
        state.error = action.error;
        // Roll Back
        if (state.posts) {
          const postId = action.meta.arg.postId;
          const user = JSON.parse(localStorage.getItem("user")!);
          state.posts = {
            ...state.posts,
            data: [
              ...state.posts.data.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likedBy: [
                        ...post.likedBy,
                        { id: user.id, fullName: user.fullName },
                      ],
                    }
                  : post
              ),
            ],
          };
        }
      })

      //  delete Post reducers
      .addCase(deletePostThunk.pending, (state, action) => {
        console.log("action: ", action);
        state.deletePostFlag = "Loading";
        // optimistic update
        if (state.posts) {
          const postId = action.meta.arg.postId;
          state.tempPost = {
            post: state.posts.data.find((post) => post.id === postId),
            index: state.posts.data.findIndex((post) => post.id === postId),
          };
          state.posts = {
            ...state.posts,
            data: [...state.posts.data.filter((post) => post.id !== postId)],
          };
        }
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        console.log("action: ", action);
        if (action.payload?.data?.error) {
          state.deletePostFlag = "Error";
          state.error = action.payload.data;
          // Roll Back
          if (state.posts && state.tempPost) {
            console.log("state.tempPost: ", { ...state.tempPost.post });
            const revalidatedPosts = state.posts.data;
            revalidatedPosts.splice(state.tempPost.index!, 0, {
              ...state.tempPost.post!,
            });
            state.posts = {
              ...state.posts,
              data: revalidatedPosts,
            };
          }
        } else {
          state.deletePostFlag = "Success";
        }
      })

      .addCase(deletePostThunk.rejected, (state, action) => {
        state.deletePostFlag = "Error";
        state.error = action.error;
        // Roll Back
        if (state.posts && state.tempPost) {
          state.posts = {
            ...state.posts,
            data: [...state.posts.data].splice(
              state.tempPost.index!,
              0,
              state.tempPost.post!
            ),
          };
        }
      });
  },
});

export default postSlice.reducer;
