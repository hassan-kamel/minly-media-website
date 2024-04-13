import { useAppDispatch, useAppSelector } from "@/hooks/AppStoreHooks";
import { RootState } from "../store/appStore";
import { useEffect, useState } from "react";
import { createPostThunk } from "@/store/features/postSlice";
import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import { LoaderCircle, Upload, UploadIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import reactSVG from "@/assets/react.svg";
import { TCreatePostPayload } from "@/interfaces/post/create-post-payload";
import { toast } from "sonner";

const createPostSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine(
      (files) => files[0]?.size < 100 * 1024 * 1024,
      "File size must be less than 100MB"
    ),
  caption: z
    .string({ required_error: "Caption is required" })
    .min(3, {
      message: "Caption must be at least 3 characters",
    })
    .max(500, {
      message: "Caption must be less than 500 characters",
    }),
});

type createPostFormFields = z.infer<typeof createPostSchema>;

const CreatePostModal = () => {
  // get Token
  const { token } = useAppSelector((state: RootState) => state.authentication);
  // post
  const { loading, creatingPostFlag } = useAppSelector(
    (state: RootState) => state.post
  );

  // dispatch
  const dispatch = useAppDispatch();

  // Create post Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<createPostFormFields>({
    resolver: zodResolver(createPostSchema),
  });

  // subscribe to create post flag
  useEffect(() => {
    if (creatingPostFlag === "Loading") {
      toast.dismiss("creating-post");

      toast.loading("Creating post", {
        id: "creating-post",
      });
    } else if (creatingPostFlag === "Success") {
      toast.success("Post created successfully", {
        id: "post-Created",
      });
      reset();
      setIsDrawerOpen(false); // close drawer
    } else if (creatingPostFlag === "Error") {
      toast.dismiss("creating-post");
      toast.error("Something went wrong");
    }
  }, [creatingPostFlag, reset]);

  //  Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  // file state
  const [file, setFile] = useState<File | null>(null);

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.files[0]: ", e?.target?.files?.[0]);

    setFile(null);

    e.target.files?.length && setFile(e.target.files[0]);
  };

  // submit handler
  const onSubmit = async (data: createPostFormFields) => {
    console.log("data: ", data);
    const payload: TCreatePostPayload = {
      caption: data.caption,
      media: data.file[0],
    };

    token && dispatch(createPostThunk({ ...payload, token }));
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger className="fixed grid w-20 h-20  rounded-full shadow-lg bottom-2 right-2 md:bottom-10 md:right-10 place-items-center bg-gradient-to-r from-minlyFirst to-minlySecond">
        <Upload color="white" size={32} />
      </DrawerTrigger>
      <DrawerContent className="h-[70vh] max-w-[600px] container mb-2">
        <DrawerHeader>
          <DrawerTitle className="capitalize">
            Create Post by [ Uploading image Or Video ] and caption
          </DrawerTitle>
        </DrawerHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerDescription>
            <div className="my-3">
              <Label htmlFor="caption">Caption</Label>
              <Input
                {...register("caption")}
                type="text"
                className="w-full p-1 border-2 border-gray-400 rounded-md"
                placeholder="write a caption for your post"
              />
              {errors.caption && (
                <div className="text-sm text-red-400 text-muted-foreground">
                  {errors.caption.message}
                </div>
              )}
            </div>

            {/* upload image or video */}
            <div className="relative">
              <Label htmlFor="caption">Upload Image or Video</Label>
              <input
                {...register("file")}
                type="file"
                id="file"
                className="hidden"
                accept="image/*,video/*"
                onChangeCapture={handleFileChange}
              />

              {file && (
                <label
                  htmlFor="file"
                  className="absolute top-0 flex items-center justify-center w-32 h-8 gap-3 text-white transform -translate-x-1/2 bg-green-500 rounded-full cursor-pointer left-1/2"
                >
                  <UploadIcon color="white" size={20} />
                  <span>Reupload</span>
                </label>
              )}

              <label
                htmlFor="file"
                className="flex items-center justify-center w-full h-64 p-5 bg-white border-2 border-dashed rounded-lg cursor-pointer"
              >
                {file ? (
                  file.type.includes("image") ? (
                    <img
                      className="block object-contain w-full h-full p-1 border-2 rounded-lg"
                      src={URL.createObjectURL(file) || reactSVG}
                    />
                  ) : (
                    <video
                      controls
                      className="block object-contain w-full h-full p-1 border-2 rounded-lg"
                    >
                      <source src={URL.createObjectURL(file)} />
                    </video>
                  )
                ) : (
                  <Upload size={32} />
                )}
              </label>
              {errors.file && (
                <div className="text-sm text-red-400 text-muted-foreground">
                  {errors.file?.message}
                </div>
              )}
            </div>
          </DrawerDescription>

          <div className="flex flex-row items-center justify-end gap-2 my-4">
            <Button type="submit" disabled={isSubmitting || !!loading}>
              {isSubmitting || creatingPostFlag === "Loading" ? (
                <>
                  <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                  loading
                </>
              ) : (
                "Post"
              )}
            </Button>
            <DrawerClose>Cancel</DrawerClose>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreatePostModal;
