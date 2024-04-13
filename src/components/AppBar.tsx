import {
  CircleUser,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  Tv,
  Heart,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/AppStoreHooks";
import { RootState } from "@/store/appStore";
import { logout } from "@/store/features/authenticationSlice";

export function AppBar() {
  // user
  const { user, token } = useAppSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useAppDispatch();

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-20 flex items-center w-full h-16 gap-4 overflow-x-hidden border-b bg-background md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NavLink
          to={"/"}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Tv className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </NavLink>
        <NavLink
          to={"/"}
          className="flex items-center gap-2 transition-colors text-foreground hover:text-foreground justify-content-center"
        >
          <Home />
          <span>Home</span>
        </NavLink>
        <NavLink
          to={"/"}
          className="flex items-center gap-2 transition-colors text-muted-foreground hover:text-foreground justify-content-center"
        >
          <Heart />
          <span>Likes</span>
        </NavLink>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <NavLink
              to={"/"}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Tv className="w-6 h-6" />
              <span className="sr-only">Acme Inc</span>
            </NavLink>
            <NavLink
              to={"/"}
              className="flex items-center gap-2 hover:text-foreground justify-content-center"
            >
              <Home />
              <span>Home</span>
            </NavLink>
            <NavLink
              to={"/"}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground justify-content-center"
            >
              <Heart />
              <span>Likes</span>
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 ml-auto sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 md:w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search ..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>

        {user && token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUser className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 transform translate-y-[15px]">
              <DropdownMenuLabel className="capitalize">
                <span className="mr-2 text-xl">{user?.fullName}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex justify-center items-between ">
            <Link to="/login" className="w-full mx-2">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup" className="w-full mx-2">
              <Button variant="default">Create New Account</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
