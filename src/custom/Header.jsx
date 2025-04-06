import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

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
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        {/* Logo and Text on the left */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo_main.png"
            alt="Logo"
            style={{ height: "28px", width: "32px", paddingRight: "5px" }}
          />
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#333",
              paddingTop: "12px",
            }}
          >
            भ्रमनPlanner
          </p>
        </div>

        {/* Sign In Button on the right */}

        {user ? (
          <div className="p-3 gap-2 flex flex-row ">
            <a href="/create-ai-trip"><Button variant="outline" className="rounded text-white">➕ Create Trip</Button></a>
            <a href="/my-trips"><Button className="rounded">My Trips</Button></a>
            <Popover>
              <PopoverTrigger className="rounded text-white h-[35px] px-4 flex items-center justify-center">
                {user?.given_name}
              </PopoverTrigger>
              <PopoverContent className="hover:cursor-pointer" onClick={()=>{
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>
                Logout
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            variant="outline"
            style={{
              padding: "8px 24px",
              fontSize: "18px",
              fontWeight: "500",
              backgroundColor: "black",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
            onClick={login}
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
