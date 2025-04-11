import React from "react";
import { Button } from "@/components/ui/button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (coderesp) => getUserInfo(coderesp),
    onError: (err) => console.log(err),
  });

  const getUserInfo = (accessToken) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex justify-between items-center px-5 py-2">
        {/* Logo and Text */}
        <div className="flex items-center">
          <img src="/logo_main.png" alt="Logo" className="h-7 w-8 mr-2" />
          <p className="text-xl font-semibold text-gray-800 pt-2">
            भ्रमणPlanner
          </p>
        </div>

        {/* Right Side */}
        {user ? (
          <div className="flex items-center gap-3 p-2">
            <Link to="/create-ai-trip">
              <Button variant="outline" className="rounded text-white">
                ➕ Create Trip
              </Button>
            </Link>
            <Link to="/my-trips">
              <Button className="rounded">My Trips</Button>
            </Link>

            <Popover>
              <PopoverTrigger className="rounded text-white h-[35px] px-4 flex items-center justify-center bg-black hover:bg-gray-700">
                {user?.given_name}
              </PopoverTrigger>
              <PopoverContent
                className="cursor-pointer"
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
              >
                Logout
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            variant="outline"
            className="px-6 py-2 text-lg font-medium bg-black text-white rounded-md hover:bg-gray-800"
            onClick={login}
          >
            Sign In
          </Button>
        )}
      </div>
      <div className=" mb-[30px] bg-yellow-100 border-t border-b border-yellow-400 text-yellow-800 px-4 py-2 overflow-hidden whitespace-nowrap ">
        <div className="inline-block" style={{
      animation: 'marquee 15s linear infinite',
      whiteSpace: 'nowrap',
    }}>
          If you encounter an error (such as a 404), please click the browser's
          back button once or go back once on your phone, then reload the page.
          The issue should resolve automatically. Thank you for your patience.
        </div>
        <style jsx>{`
    @keyframes marquee {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `}</style>
      </div>
    </div>
  );
}

export default Header;
