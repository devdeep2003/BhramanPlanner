import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/FirebaseConfig";

function MyTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    setTrips([]);
    const q = query(
      collection(db, "AITripData"),
      where("user_email", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setTrips((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <div className="container mt-4 mb-4">
      <h2 className="text-2xl font-semibold mb-4">My Trips</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {trips.map((trip, index) => {
          const { destination, days, budget, travellers } = trip.UserSelection;
          return (
            <div key={index} className="col">
              <div
                className="card h-100 shadow-sm border-primary hover:scale-110 transition-transform cursor-pointer"

              >
                <div className="card-body">
                  <h5 className="card-title text-primary">{destination}</h5>
                  <p className="card-text">
                    <strong>Days:</strong> {days}
                  </p>
                  <p className="card-text">
                    <strong>Budget:</strong> {budget}
                  </p>
                  <p className="card-text">
                    <strong>Travellers:</strong> {travellers}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyTrips;
