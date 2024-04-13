import Post from "@/components/Post";
import { useAppDispatch, useAppSelector } from "@/hooks/AppStoreHooks";
import { RootState } from "../store/appStore";
import { useEffect, useState } from "react";
import { getPaginatedPostsThunk } from "@/store/features/postSlice";
import CreatePostModal from "@/components/CreatePostModal";

import { useInView } from "react-intersection-observer";
import { SkeletonCard } from "@/components/SkeletonCard";

const Home = () => {
  // post
  const { posts, endOfScrolling } = useAppSelector(
    (state: RootState) => state.post
  );

  const dispatch = useAppDispatch();

  // state for keep track of posts pageNumber
  const [pageNumber, setPageNumber] = useState<number>(1);

  //  observer intersection
  const { ref: skeletonRef, inView: isScrolledToEnd } = useInView({
    threshold: 0,
  });

  // get posts
  useEffect(() => {
    dispatch(getPaginatedPostsThunk({ pageNumber, pageSize: 5 }));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (isScrolledToEnd) {
      setPageNumber((prev) => prev + 1);
    }
  }, [isScrolledToEnd]);

  return (
    <>
      <CreatePostModal />
      {!posts
        ? new Array(5).fill(0).map((_, index) => <SkeletonCard key={index} />)
        : posts.data.map((item) => {
            return (
              <Post
                key={item.id}
                postId={item.id}
                type={item.type}
                caption={item.caption}
                author={item.author}
                mediaUrl={item.mediaUrl}
                likedBy={item.likedBy}
                createdAt={item.createdAt}
              />
            );
          })}
      {!endOfScrolling && <SkeletonCard ref={skeletonRef} />}
    </>
  );
};

export default Home;
