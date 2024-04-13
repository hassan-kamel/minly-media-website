import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppBar } from "./components/AppBar";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/AppStoreHooks";
import { setUserAndToken } from "./store/features/authenticationSlice";
import { RootState } from "./store/appStore";
import { Button } from "./components/ui/button";
import { Telescope } from "lucide-react";

const authRoutes = ["/login", "/signup"];
function App() {
  // router
  const { pathname } = useLocation();
  const navigateTo = useNavigate();

  // user
  const { user, token } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useAppDispatch();

  //  first load -  check for logged usr by hitting the local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") as string);
    if (storedToken && storedUser) {
      dispatch(setUserAndToken({ user: storedUser, token: storedToken }));
    }
  }, [dispatch]);

  //  change localStorage if user logged in or out based on user selector
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    if (token) localStorage.setItem("token", token);
  }, [user, token]);

  return (
    <>
      <Toaster />
      {authRoutes.includes(pathname) ? (
        <>
          <Button
            className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[200px] "
            variant={"destructive"}
            onClick={() => navigateTo("/")}
          >
            <span> Browse Anonymously</span>
            <Telescope className="w-32 ml-5" />
          </Button>
          <Outlet></Outlet>
        </>
      ) : (
        <>
          <div className="max-w-[95%] mx-auto md:container">
            <div className="flex flex-col w-full ">
              <AppBar />
              <Outlet></Outlet>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
