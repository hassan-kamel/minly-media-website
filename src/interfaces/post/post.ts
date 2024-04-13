import { IUser } from "../user/user";

export type TPost = {
  id: string;
  caption: string;
  mediaUrl: string;
  createdAt: string;
  updatedAt: string;
  type: "IMAGE" | "VIDEO";
  likedBy: Array<Partial<IUser>>;
  author: Partial<IUser>;
};
