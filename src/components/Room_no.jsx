import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebaseDB from "../firebase";

const Room_no = () => {
  const [beds, setBeds] = useState([]);
  const [g2Beds, setG2Beds] = useState([]);
  const [a1Beds, setA1Beds] = useState([]);
  const [a2Beds, setA2Beds] = useState([]);
  const [a3Beds, setA3Beds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firebaseDB.child("G1").once("value");
      const data = snapshot.val();
      if (data) {
        const bedArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBeds(bedArray);
      }
      const g2Snapshot = await firebaseDB.child("G2").once("value");
      const g2Data = g2Snapshot.val();
      if (g2Data) {
        const g2BedArray = Object.keys(g2Data).map((key) => ({
          id: key,
          ...g2Data[key],
        }));
        setG2Beds(g2BedArray);
      }
      const a1Snapshot = await firebaseDB.child("A1").once("value");
      const a1Data = a1Snapshot.val();
      if (a1Data) {
        const a1BedArray = Object.keys(a1Data).map((key) => ({
          id: key,
          ...a1Data[key],
        }));
        setA1Beds(a1BedArray);
      }
      const a2Snapshot = await firebaseDB.child("A2").once("value");
      const a2Data = a2Snapshot.val();
      if (a1Data) {
        const a2BedArray = Object.keys(a2Data).map((key) => ({
          id: key,
          ...a2Data[key],
        }));
        setA2Beds(a2BedArray);
      }
      const a3Snapshot = await firebaseDB.child("A3").once("value");
      const a3Data = a3Snapshot.val();
      if (a3Data) {
        const a3BedArray = Object.keys(a3Data).map((key) => ({
          id: key,
          ...a3Data[key],
        }));
        setA3Beds(a3BedArray);
      }
    };

    fetchData();
  }, []);

  const getIconColorClass = (status) => {
    switch (status) {
      case "Joined":
        return "text-success"; // Green for joined
      case "Vacated":
        return "text-danger"; // Red for vacated
      case "Under Maintenance":
        return "text-warning"; // Yellow for under maintenance
      default:
        return "text-secondary"; // Default color
    }
  };

  return (
    <div className="container">
      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card">
              <div className="card-body">
                <Link to="/g1" style={{ textDecoration: "none" }}>
                  <h5>G1</h5>
                </Link>
                <div className="d-flex flex-wrap mb-3">
                  {beds.map((bed) => (
                    <i
                      key={bed.id}
                      className={`material-icons ${getIconColorClass(
                        bed.status
                      )} mx-1 my-1`}
                      title={`Room ${bed.room_number}: ${bed.status}`}
                      style={{ fontSize: "24px" }} // Adjust icon size as needed
                    >
                      localhotel
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card">
              <div className="card-body">
                <Link to="/g2">
                  <h5>G2</h5>
                </Link>
                <div className="d-flex flex-wrap mb-3">
                  {g2Beds.map((bed) => (
                    <i
                      key={bed.id}
                      className={`material-icons ${getIconColorClass(
                        bed.status
                      )} mx-1 my-1`}
                      title={`Room ${bed.room_number}: ${bed.status}`}
                      style={{ fontSize: "24px" }} // Adjust icon size as needed
                    >
                      localhotel
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card">
              <div className="card-body">
                <Link to="/a1" style={{ textDecoration: "none" }}>
                  <h5>A1</h5>
                </Link>
                <div className="d-flex flex-wrap mb-3">
                  {a1Beds.map((bed) => (
                    <i
                      key={bed.id}
                      className={`material-icons ${getIconColorClass(
                        bed.status
                      )} mx-1 my-1`}
                      title={`Room ${bed.room_number}: ${bed.status}`}
                      style={{ fontSize: "24px" }} // Adjust icon size as needed
                    >
                      localhotel
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card">
              <div className="card-body">
                <Link to="/a2" style={{ textDecoration: "none" }}>
                  <h5>A2</h5>
                </Link>
                <div className="d-flex flex-wrap mb-3">
                  {a2Beds.map((bed) => (
                    <i
                      key={bed.id}
                      className={`material-icons ${getIconColorClass(
                        bed.status
                      )} mx-1 my-1`}
                      title={`Room ${bed.room_number}: ${bed.status}`}
                      style={{ fontSize: "24px" }} // Adjust icon size as needed
                    >
                      localhotel
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card">
              <div className="card-body">
                <Link to="/a3" style={{ textDecoration: "none" }}>
                  <h5>A3</h5>
                </Link>
                <div className="d-flex flex-wrap mb-3">
                  {a3Beds.map((bed) => (
                    <i
                      key={bed.id}
                      className={`material-icons ${getIconColorClass(
                        bed.status
                      )} mx-1 my-1`}
                      title={`Room ${bed.room_number}: ${bed.status}`}
                      style={{ fontSize: "24px" }} // Adjust icon size as needed
                    >
                      localhotel
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room_no;
