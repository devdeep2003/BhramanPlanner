import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/FirebaseConfig";
import animationDataHotel from "../../../public/Lottie/Hotel.json";
import animationDataPlace from "../../../public/Lottie/Place.json";
import animationDataidea from "../../../public/Lottie/idea.json";
import Lottie from "lottie-react";


function ViewTrip() {
  const { tripid } = useParams();
  const [fetchedData, setFetchedData] = useState({});
 

  const getTripData = async () => {
    const docRef = doc(db, "AITripData", tripid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFetchedData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  

  

  useEffect(() => {
    getTripData();
  }, []);

 
  return (
    <div className="p-8 text-gray-800">
   

      <p className="text-3xl font-bold mt-1 mb-3 ">
        {fetchedData?.UserSelection?.destination}
      </p>

      <div className="flex flex-row gap-4 mb-6">
        <div className="border px-4 py-2 rounded shadow cursor-pointer hover:scale-110 transition-transform">⌛ {fetchedData?.UserSelection?.days}</div>
        <div className="border px-4 py-2 rounded shadow cursor-pointer hover:scale-110 transition-transform">💰 {fetchedData?.UserSelection?.budget}</div>
        <div className="border px-4 py-2 rounded shadow cursor-pointer hover:scale-110 transition-transform">🧑‍🤝‍🧑 {fetchedData?.UserSelection?.travellers}</div>
      </div>

      {/* Hotels */}
      <h5 className="text-xl font-bold mb-4 cursor-default">Hotels</h5>
      <div className="flex flex-col gap-6">
        {fetchedData?.TripDetails?.hotels?.map((hotel, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline block hover:no-underline"
          >
            <div className="flex border rounded shadow p-4 hover:scale-105 transition-transform">
            <Lottie animationData={animationDataHotel} loop={true} className="h-[90px] w-[90px] mr-[10px]" />
              <div className="flex flex-col justify-between">
                <h5 className="text-xl font-semibold hover:text-blue-600 transition-colors">{hotel?.name}</h5>
                <p className="text-sm text-gray-600 font-medium mt-2">💰 {hotel?.price_per_night}</p>
                <span className="text-sm text-gray-500 mt-2">📍 {hotel?.location}</span>
                <span className="text-sm  text-blue-700 mt-3  ">Google Maps 📍</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Tourist Attractions */}
      <h5 className="mt-4 text-xl font-bold mb-4 cursor-default">Popular Attractions</h5>
     
      <div className="flex flex-col gap-6">
        {fetchedData?.TripDetails?.tourist_places?.map((place, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline block hover:no-underline"
          >
            <div className="flex border rounded shadow p-4 hover:scale-105 transition-transform">
            <Lottie animationData={animationDataPlace} loop={true} className="h-[150px] w-[150px] mr-[10px]" />
              <div className="flex flex-col justify-between">
                <h5 className="text-xl font-semibold hover:text-blue-600">{place?.name}</h5>
                <p className="text-sm text-gray-600 mt-2">{place?.description}</p>
                <div className="mt-3 text-sm text-gray-500 space-y-1">
                  <p>🗓️ {place?.best_time_to_visit}</p>
                  <p className="text-gray-400">📍 {place?.location}</p>
                  <span className="text-sm text-blue-700 ">Google Maps 📍</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Local Tips */}
      <h5 className="mt-4 text-xl font-bold mb-4 cursor-default">Tips and Suggestions</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fetchedData?.TripDetails?.local_tips?.map((tip, index) => (
          <div key={index} className="p-4 border rounded shadow hover:scale-105 transition-transform flex flex-row ">
            <Lottie animationData={animationDataidea} loop={true} className="h-[40px] w-[40px] mr-[10px]" />
            <p className="text-sm text-gray-700">{tip}</p>
          </div>
        ))}
      </div>

      {/* Estimated Total Cost */}
      <div className="mt-10">
        <h5 className="p-4 border rounded shadow hover:scale-105 transition-transform">
          Overall Estimated Cost 💸 : 
          <span className="font-medium text-blue-700 ml-1">
            {fetchedData?.TripDetails?.estimated_cost?.total || "N/A"}
          </span>
        </h5>
      </div>

      {/* Day Wise Plan */}
      <h5 className="mt-4 text-xl font-bold mb-4">Day Wise Plan 📝</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fetchedData?.TripDetails?.daily_itinerary?.map((day, index) => (
          <div key={index} className="p-4 border rounded shadow hover:scale-105 transition-transform">
            <h6 className="text-lg font-semibold mb-2">Day {index + 1}</h6>
            <ul className="list-disc pl-5">
              {day?.activities?.map((activityItem, actIndex) => (
                <li key={actIndex} className="mb-2">
                  <span className="font-semibold">{activityItem.time}</span> — {activityItem.activity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <h5 className="mt-4 text-xl font-bold mb-4">Estimated Travel Cost 💸</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(fetchedData?.TripDetails?.estimated_cost || {}).map(([key, value], index) => (
          <div key={index} className="p-4 border rounded shadow hover:scale-105 transition-transform">
            <h6 className="text-lg font-semibold mb-2 capitalize">{key}</h6>
            <p className="text-sm text-gray-700">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewTrip;
