import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/AppStoreHooks";
import { RootState } from "@/store/appStore";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginAsyncThunk } from "@/store/features/authenticationSlice";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string({ required_error: "Enter your email" }).email({
    message: "Enter a valid email",
  }),
  password: z.string({ required_error: "Enter your password" }).min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type LoginFormFields = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigateTo = useNavigate();
  // form state handlers
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  // submit handler
  const onSubmit = async (data: LoginFormFields) => {
    console.log(data);
    dispatch(loginAsyncThunk(data));
    // reset();
  };

  //  state handlers
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector(
    (state: RootState) => state.authentication
  );

  useEffect(() => {
    if (loading)
      toast.loading("Logging into your account", {
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
      toast.success("Login Successful");
      toast.dismiss("loading");
      navigateTo("/");
    }
    return () => {};
  }, [token, navigateTo]);

  return (
    <>
      <div className="grid w-full min-h-screen lg:grid-cols-2 place-items-center">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
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
                    "Login"
                  )}
                </Button>
                <Button variant="ghost" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>

            <div className="mt-4 text-sm text-center">
              Don&apos;t have an account?
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden w-full h-full bg-muted lg:block">
          <img
            src="https://images.pexels.com/photos/13959289/pexels-photo-13959289.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
          ></img>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
