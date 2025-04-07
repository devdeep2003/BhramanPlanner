import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-ai-trip/index.jsx";
import Header from "./custom/Header.jsx"; // no longer needed here
import Hero from "./Hero.jsx";
import Footer from "./custom/Footer.jsx"; // no longer needed here
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-ai-trip/[tripid]/index.jsx";
import MyTrips from "./MyTrips/index.jsx";
import Layout from "./custom/Layout.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ✅ shared layout
    children: [
      { path: "/", element: <Hero /> },
      { path: "/create-ai-trip", element: <CreateTrip /> },
      { path: "/view-trip/:tripid", element: <ViewTrip /> },
      { path: "/my-trips", element: <MyTrips /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
