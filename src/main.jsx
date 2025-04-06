import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-ai-trip/index.jsx";
import Header from "./custom/Header.jsx";
import Hero from "./Hero.jsx";
import Footer from "./custom/Footer.jsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-ai-trip/[tripid]/index.jsx";
import MyTrips from "./MyTrips/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/create-ai-trip",
    element: <CreateTrip />,
  },
  {
    path : "/view-trip/:tripid",
    element : <ViewTrip/>
  },
  {
    path : "/my-trips",
    element : <MyTrips/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
      <Footer />
    </GoogleOAuthProvider>
  </StrictMode>
);
