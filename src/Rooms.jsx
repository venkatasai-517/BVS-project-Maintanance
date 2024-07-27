import { useEffect, useState } from "react";
import firebaseDB from "./firebase";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [totalBeds, setTotalBeds] = useState(0);
  const [vacatedBeds, setVacatedBeds] = useState(0);
  const [joined, setJoined] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for each room
        const roomIds = [
          "G1",
          "G2",
          "A1",
          "A2",
          "A3",
          "A4",
          "A5",
          "A6",
          "A7",
          "B1",
          "B2",
          "B3",
          "B4",
          "B5",
          "B6",
          "C1",
          "C2",
          "C3",
          "C4",
        ];

        let totalBedsCount = 0;
        let vacatedBedsCount = 0;
        let joinedBedCount = 0;

        for (const roomId of roomIds) {
          const roomSnapshot = await firebaseDB.child(roomId).once("value");
          const roomData = roomSnapshot.val();

          if (roomData) {
            const roomBedsCount = Object.keys(roomData).length;
            totalBedsCount += roomBedsCount;

            const vacatedCount = Object.values(roomData).filter(
              (bed) => bed.status === "Vacated"
            ).length;
            vacatedBedsCount += vacatedCount;
            const joinedCount = Object.values(roomData).filter(
              (bed) => bed.status === "Joined"
            ).length;
            joinedBedCount += joinedCount;
          }
        }

        setTotalBeds(totalBedsCount);
        setVacatedBeds(vacatedBedsCount);
        setJoined(joinedBedCount);
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
                <div className="card-body bg-body text-danger">
                  <Link
                    to="/room_no"
                    style={{ textDecoration: "none", color: "black" }}
                  >
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
                <div className="card-body bg-warning">
                  <h5>Total Beds</h5>
                  <h1>{totalBeds}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body bg-danger text-dark">
                  <h5>Vacated Beds</h5>
                  <h1>{vacatedBeds}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body bg-success text-white">
                  <h5>Joined Beds</h5>
                  <h1>{joined}</h1>
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
