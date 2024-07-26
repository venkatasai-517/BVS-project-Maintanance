import { useState, useEffect } from "react";
import firebaseDB from "../firebase";

const Dashboard = () => {
  //     const [records, setRecords] = useState([]);
  //   const [originalRecords, setOriginalRecords] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      firebaseDB.child("student").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          //   setOriginalRecords(dataArray);
          //   setRecords(dataArray);
          setTotalStudents(dataArray.length); // Set the total number of students
        }
      });
    };

    fetchData();
    return () => firebaseDB.child("student").off();
  }, []);
  return (
    <>
      <div className="container text-center mt-3">
        <div className="row g-2">
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <h5>Total Students</h5>
                  <p>{totalStudents}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <h5>Total Rooms</h5>
                  <p>This is some text within a card body.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <h5>Total Beds</h5>
                  <p>This is some text within a card body.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="p-3">
              <div className="card">
                <div className="card-body">
                  <h5>Vacated Rooms</h5>
                  <p>This is some text within a card body.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
