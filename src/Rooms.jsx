import React, { useEffect, useState } from "react";
import firebaseDB from "./firebase";
import { Link } from "react-router-dom";
const Rooms = () => {
  const [totalBeds, setTotalBeds] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch G1 beds
        const g1Snapshot = await firebaseDB.child("G1").once("value");
        const g1Data = g1Snapshot.val();
        const g1BedsCount = g1Data ? Object.keys(g1Data).length : 0;

        // Fetch G2 beds
        const g2Snapshot = await firebaseDB.child("G2").once("value");
        const g2Data = g2Snapshot.val();
        const g2BedsCount = g2Data ? Object.keys(g2Data).length : 0;

        // Calculate total beds count
        setTotalBeds(g1BedsCount + g2BedsCount);
      } catch (error) {
        console.error("Error fetching bed data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container text-center mt-3">
        <div className="row g-2">
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <Link to="/room_no">
                    <h5>Total Rooms</h5>
                    <h1>19</h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <h5>Total Beds</h5>
                  <h1>{totalBeds}</h1>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <h5>Total Beds</h5>
                  <p>This is some text within a card body.</p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <h5>Vacated Rooms</h5>
                  <h1>4</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Rooms;
