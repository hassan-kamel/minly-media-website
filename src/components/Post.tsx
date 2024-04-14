import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { getTime } from "@/lib/utils/getTime";
import {
  MessageCircleIcon,
  Share,
  HeartIcon,
  EllipsisVertical,
  Edit2Icon,
  Trash,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/AppStoreHooks";
import { RootState } from "@/store/appStore";
import { IUser } from "@/interfaces/user/user";
import {
  deletePostThunk,
  dislikePostThunk,
  likePostThunk,
} from "@/store/features/postSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PostProps = {
  postId: string;
  type: "IMAGE" | "VIDEO";
  mediaUrl: string;
  caption: string;
  createdAt: string;
  likedBy: Array<Partial<IUser>>;
  author: Partial<IUser>;
};
const Post = ({
  postId,
  type,
  mediaUrl,
  caption,
  createdAt,
  likedBy,
  author,
}: PostProps) => {
  // user
  const { user, token } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useAppDispatch();

  // post
  const { likePostFlag, error } = useAppSelector(
    (state: RootState) => state.post
  );

  // check if the user liked the post
  const isLikedIt = () => {
    return likedBy.some((item) => item.id === user?.id);
  };

  // Handle Like
  const handleLike = () => {
    if (token) {
      isLikedIt()
        ? dispatch(dislikePostThunk({ postId, token }))
        : dispatch(likePostThunk({ postId, token }));
    }
  };

  //  handle delete post
  const handleDelete = () => {
    if (token && isMyPost()) {
      dispatch(deletePostThunk({ postId, token }));
    }
  };

  // effect fot taost if  like request failed

  useEffect(() => {
    if (likePostFlag === "Error") {
      toast.dismiss("like-error");
      toast.error("Something went wrong", {
        id: "like-error",
      });
    }
  }, [likePostFlag]);

  // error message
  useEffect(() => {
    if (error) {
      const myError = error as {
        message: string;
        error: { status: string };
      };
      toast.dismiss("post-error");
      toast.error(
        myError?.message || myError?.error.status || "Something went wrong",
        {
          id: "post-error",
        }
      );
    }
  }, [error]);

  // check if my post
  const isMyPost = () => {
    return author.id === user?.id;
  };

  return (
    <Card className="mx-auto w-full md:max-w-[700px] my-5 group h-auto ">
      <CardHeader className=" z-1 transition-duration-3000">
        <CardTitle>
          <div className="flex items-center gap-4 mb-3">
            <Avatar className="flex items-center justify-center text-white bg-black rounded-full h-9 w-9 sm:flex">
              <AvatarFallback
                className="uppercase"
                style={{ letterSpacing: "1px" }}
              >
                {author?.fullName?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1 ">
              <div className="text-lg font-medium leading-none capitalize">
                {author.fullName}
              </div>
              <p className="text-sm text-muted-foreground">
                {getTime(createdAt)}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {isMyPost() && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 transform translate-y-[5px] -translate-x-1/3">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit2Icon className="w-4 h-4 mr-2" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleDelete}
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardTitle>
        <CardDescription className="mt-52">
          <span className="mt-5 text-sm">{caption.slice(0, 100) + "..."}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid items-center md:w-[700px] h-64 p-0  shadow-lg rounded-lg overflow-hidden bg-primary ">
        {type === "IMAGE" ? (
          <>
            <img
              className="object-contain w-full h-64 overflow-hidden bg-transparent shadow-lg "
              src={mediaUrl}
              alt={caption}
            />
          </>
        ) : (
          <>
            <video
              className="block object-contain w-full h-64 overflow-hidden bg-transparent border shadow-lg "
              src={mediaUrl}
              controls
            ></video>
          </>
        )}
      </CardContent>
      <div className="flex items-center p-5 item-center ">
        {likedBy.length > 0 && <p>Liked By {likedBy.length} people</p>}
      </div>
      <div className="flex items-center justify-center h-16 ">
        {/* post actions like comment share */}

        <div className="flex items-center flex-grow w-full h-full py-5 ">
          <div
            onClick={handleLike}
            className="flex items-center justify-center flex-grow h-16 text-xl cursor-pointer hover:bg-slate-300 "
          >
            <HeartIcon
              className={`mr-2  ${
                isLikedIt()
                  ? " bg-gradient-to-r from-minlyFirst to-minlySecond bg-clip-text fill-minlySecond"
                  : ""
              }`}
              size={isLikedIt() ? 35 : 25}
              stroke={!isLikedIt() ? "black" : "white"}
            />
            <span
              className={`${
                isLikedIt()
                  ? "text-transparent bg-gradient-to-r from-minlyFirst to-minlySecond bg-clip-text font-bold"
                  : ""
              }`}
            >
              {isLikedIt() ? "Liked" : "Like"}
            </span>
          </div>
          <div className="flex items-center justify-center flex-grow h-16 text-xl cursor-pointer hover:bg-slate-300">
            <MessageCircleIcon className="mr-2" size={25} />
            <span>Comment</span>
          </div>
          <div className="flex items-center justify-center flex-grow h-16 text-xl cursor-pointer hover:bg-slate-300">
            <Share className="mr-2" size={25} />
            <span>Share</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Post;
