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

        const a1Snapshot = await firebaseDB.child("A1").once("value");
        const a1Data = a1Snapshot.val();
        const a1BedsCount = a1Data ? Object.keys(a1Data).length : 0;

        const a2Snapshot = await firebaseDB.child("A2").once("value");
        const a2Data = a2Snapshot.val();
        const a2BedsCount = a2Data ? Object.keys(a2Data).length : 0;

        const a3Snapshot = await firebaseDB.child("A3").once("value");
        const a3Data = a3Snapshot.val();
        const a3BedsCount = a3Data ? Object.keys(a3Data).length : 0;

        const a4Snapshot = await firebaseDB.child("A4").once("value");
        const a4Data = a4Snapshot.val();
        const a4BedsCount = a4Data ? Object.keys(a4Data).length : 0;

        const a5Snapshot = await firebaseDB.child("A5").once("value");
        const a5Data = a5Snapshot.val();
        const a5BedArray = a5Data ? Object.keys(a5Data).length : 0;

        const a6Snapshot = await firebaseDB.child("A6").once("value");
        const a6Data = a6Snapshot.val();
        const a6BedArray = a6Data ? Object.keys(a6Data).length : 0;

        const a7Snapshot = await firebaseDB.child("A7").once("value");
        const a7Data = a7Snapshot.val();
        const a7BedArray = a7Data ? Object.keys(a7Data).length : 0;

        const b1Snapshot = await firebaseDB.child("B1").once("value");
        const b1Data = b1Snapshot.val();
        const b1BedArray = b1Data ? Object.keys(b1Data).length : 0;

        const b2Snapshot = await firebaseDB.child("B2").once("value");
        const b2Data = b2Snapshot.val();
        const b2BedArray = b2Data ? Object.keys(b2Data).length : 0;

        const b3Snapshot = await firebaseDB.child("B3").once("value");
        const b3Data = b3Snapshot.val();
        const b3BedArray = b3Data ? Object.keys(b3Data).length : 0;

        const b4Snapshot = await firebaseDB.child("B4").once("value");
        const b4Data = b4Snapshot.val();
        const b4BedArray = b4Data ? Object.keys(b4Data).length : 0;

        const b5Snapshot = await firebaseDB.child("B5").once("value");
        const b5Data = b5Snapshot.val();
        const b5BedArray = b5Data ? Object.keys(b5Data).length : 0;

        const b6Snapshot = await firebaseDB.child("B6").once("value");
        const b6Data = b6Snapshot.val();
        const b6BedArray = b6Data ? Object.keys(b6Data).length : 0;

        const c1Snapshot = await firebaseDB.child("C1").once("value");
        const c1Data = c1Snapshot.val();
        const c1BedArray = c1Data ? Object.keys(c1Data).length : 0;

        const c2Snapshot = await firebaseDB.child("C2").once("value");
        const c2Data = c2Snapshot.val();
        const c2BedArray = c2Data ? Object.keys(c2Data).length : 0;

        const c3Snapshot = await firebaseDB.child("C3").once("value");
        const c3Data = c3Snapshot.val();
        const c3BedArray = c3Data ? Object.keys(c3Data).length : 0;

        const c4Snapshot = await firebaseDB.child("C4").once("value");
        const c4Data = c4Snapshot.val();
        const c4BedArray = c4Data ? Object.keys(c4Data).length : 0;

        // Calculate total beds count
        setTotalBeds(
          g1BedsCount +
            g2BedsCount +
            a1BedsCount +
            a2BedsCount +
            a3BedsCount +
            a4BedsCount +
            a5BedArray +
            a6BedArray +
            a7BedArray +
            b1BedArray +
            b2BedArray +
            b3BedArray +
            b4BedArray +
            b5BedArray +
            b6BedArray +
            c1BedArray +
            c2BedArray +
            c3BedArray +
            c4BedArray
        );
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
                  <Link to="/room_no" style={{ textDecoration: "none" }}>
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
