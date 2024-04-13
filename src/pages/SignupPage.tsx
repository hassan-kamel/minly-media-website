import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/AppStoreHooks";
import { RootState } from "@/store/appStore";
import { signupAsyncThunk } from "@/store/features/authenticationSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const SignupSchema = z
  .object({
    firstName: z.string({ required_error: "Enter your first name" }).min(3, {
      message: "First name must be at least 3 characters",
    }),
    lastName: z.string({ required_error: "Enter your last name" }).min(3, {
      message: "Last name must be at least 3 characters",
    }),
    email: z.string({ required_error: "Enter your email" }).email({
      message: "Enter a valid email",
    }),
    password: z.string({ required_error: "Enter your password" }).min(8, {
      message: "Password must be at least 8 characters",
    }),

    confirmPassword: z
      .string({ required_error: "Enter your password" })
      .min(8, {
        message: "Password must be at least 8 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormFields = z.infer<typeof SignupSchema>;

function SignUpPage() {
  const navigateTo = useNavigate();
  // form state handlers
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormFields>({
    resolver: zodResolver(SignupSchema),
  });

  // submit handler
  const onSubmit = async (data: SignupFormFields) => {
    console.log(data);
    dispatch(
      signupAsyncThunk({
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      })
    );
    // reset();
  };

  //  state handlers
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    if (loading)
      toast.loading("Creating your account", {
        id: "loading",
      });
    else toast.dismiss("loading");
  }, [loading]);

  // listeners for state error
  useEffect(() => {
    if (error) {
      toast.error(
        (error as { message: string }).message || "Uh oh! Something went wrong"
      );
    }
    return () => {};
  }, [error]);

  // listeners for state
  useEffect(() => {
    if (token) {
      toast.success("Your Account is created Successfully");
      toast.dismiss("loading");
      navigateTo("/");
    }
    return () => {};
  }, [token, navigateTo]);

  return (
    <div className="grid w-full min-h-screen lg:grid-cols-2 place-items-center">
      <div className="hidden w-full h-full bg-muted lg:block">
        <img
          src="https://images.pexels.com/photos/6285919/pexels-photo-6285919.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        ></img>
      </div>
      <Card className="max-w-2xl mx-auto border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    {...register("firstName")}
                    id="first-name"
                    placeholder="ex: hassan"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-400 text-muted-foreground">
                      {errors.firstName?.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    {...register("lastName")}
                    id="last-name"
                    placeholder="ex: Kamel"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-400 text-muted-foreground">
                      {errors.lastName?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-400 text-muted-foreground">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-400 text-muted-foreground">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 text-muted-foreground">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !!loading}
                className="w-full"
              >
                {isSubmitting || loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    loading
                  </>
                ) : (
                  "Create an account"
                )}
              </Button>

              <Button variant="ghost" className="w-full">
                Sign up with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
