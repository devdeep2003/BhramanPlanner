import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { Input } from "@/components/ui/input";
import {
  BudgetDetails,
  GEMINI_PROMPT,
  TravellerOptions,
} from "../constants/Options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { startChatSession } from "../service/AI_modal";
import "tailwindcss";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { ImSpinner6 } from "react-icons/im";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverTravellerIndex, setHoverTravellerIndex] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTravellers, setSelectedTravellers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleInput = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateTrip = async () => {
    if (
      !form?.destination ||
      !form?.days ||
      !form?.budget ||
      !form?.travellers ||
      form?.days < 0 ||
      form?.days > 50
    ) {
      toast("Please fill in all required details correctly.");
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = GEMINI_PROMPT.replace("{place}", form?.destination)
      .replace("{days}", form?.days)
      .replace("{budget}", form?.budget)
      .replace("{members}", form?.travellers);
    

    try {
      const chatSession = startChatSession();
      const responseText = await chatSession.sendMessage(FINAL_PROMPT);
      const text = await responseText.response.text();
      const result = JSON.parse(text);
      SaveTripDB(result);
    } catch (e) {
      console.error("Error generating trip:", e);
    }
    setLoading(false);
  };

  const login = useGoogleLogin({
    onSuccess: (coderesp) => getUserInfo(coderesp),
    onError: (err) => console.log(err),
  });

  const SaveTripDB = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITripData", docID), {
      UserSelection: form,
      TripDetails: TripData,
      id: docID,
      user_email: user?.email,
    });
    navigate("/view-trip/" + docID);
  };

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
        setOpenDialog(false);
        generateTrip();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
   
  }, [form]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <p className="text-4xl font-bold font-sans mb-6 leading-tight max-w-3xl">
        Plan Your Perfect Trip with AI-Powered Assistance🚀
      </p>

      <div className="w-full max-w-3xl">
        <p className="text-base font-semibold mt-6 mb-3 text-gray-500">
          Where do you want to go?
        </p>
        <Autocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
          onPlaceSelected={(place) =>
            handleInput("destination", place.formatted_address)
          }
          className="w-full p-3 mb-3 text-lg rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-400"
          placeholder="Enter your destination..."
        />

        <p className="text-base font-semibold mt-6 mb-3 text-gray-500">
          Trip Duration (Days)
        </p>

        <Input
          placeholder="Ex. 5"
          type="number"
          className="w-full mb-3 p-4 text-lg rounded-lg border border-gray-300 shadow-sm focus:ring focus:ring-blue-400"
          onChange={(e) => handleInput("days", e.target.value)}
        />

<p className="text-base font-semibold mt-6 mb-3 text-gray-500 ">
  Select Your Budget
</p>
<div className="flex flex-wrap mb-3 gap-4 sm:gap-6">
  {BudgetDetails.map((item, index) => (
    <div
      key={index}
      className={`flex flex-col items-center justify-center w-full sm:w-[220px] p-5 rounded-lg border shadow-md text-center cursor-pointer transition transform ${
        hoverIndex === index ? "bg-blue-100 scale-105" : "bg-white"
      } ${
        selectedBudget === index
          ? "border-black bg-blue-100"
          : "border-gray-300"
      }`}
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
      onClick={() => {
        setSelectedBudget(index);
        handleInput("budget", item.title);
      }}
    >
      <p className="text-3xl mb-2">{item.emoji}</p>
      <p className="font-medium text-gray-900">{item.title}</p>
      <p className="text-sm text-gray-600">{item.desc}</p>
    </div>
  ))}
</div>

<p className="text-base font-semibold mt-6 mb-3 text-gray-500 ">
  Number of Travellers
</p>
<div className="flex flex-wrap gap-4 sm:gap-6">
  {TravellerOptions.map((item, index) => (
    <div
      key={index}
      className={`flex flex-col items-center justify-center w-full sm:w-[220px] p-5 rounded-lg border shadow-md text-center cursor-pointer transition transform ${
        hoverTravellerIndex === index
          ? "bg-blue-100 scale-105"
          : "bg-white"
      } ${
        selectedTravellers === index
          ? "border-black bg-blue-100"
          : "border-gray-300"
      }`}
      onMouseEnter={() => setHoverTravellerIndex(index)}
      onMouseLeave={() => setHoverTravellerIndex(null)}
      onClick={() => {
        setSelectedTravellers(index);
        handleInput("travellers", item.title);
      }}
    >
      <p className="text-3xl mb-2">{item.emoji}</p>
      <p className="font-medium text-gray-900">{item.title}</p>
      <p className="text-sm text-gray-600">{item.desc}</p>
    </div>
  ))}
</div>


        <div className="flex justify-center mt-6">
          {loading ? (
            <ImSpinner6 className="h-3 w-3 mb-3 animate-spin" />
          ) : (
            <button
              className="w-full sm:w-auto px-8 py-3 my-5 text-lg font-semibold rounded bg-blue-600 text-white shadow-md transition duration-300 hover:bg-white-800"
              onClick={generateTrip}
            >
              Generate Trip
            </button>
          )}
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <img src="../../public/logo_main.png" />
              </DialogTitle>
              <DialogDescription>
                <h5 className="  text-left text-black font-extrabold flex flex-row gap-2 align-center">
                  Sign in{" "}
                  <FaSignInAlt
                    style={{
                      alignItems: "center",
                      color: "green",
                      marginTop: "2px",
                    }}
                  />{" "}
                </h5>
                <h6 className=" mb-3 text-left">
                  Sign in with your Google account securely
                </h6>
                <Button
                  varient="secondary"
                  className="rounded p-3 w-full bg-black"
                  onClick={login}
                >
                  <FcGoogle />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
