import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="grid w-full min-h-screen lg:grid-cols-2 place-items-center">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="ghost" className="w-full">
              Login with Google
            </Button>
          </div>
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
  );
}

export default LoginPage;
