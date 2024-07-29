import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebaseDB from "../firebase";

const Room_no = () => {
  const [beds, setBeds] = useState([]);
  const [g2Beds, setG2Beds] = useState([]);
  const [a1Beds, setA1Beds] = useState([]);
  const [a2Beds, setA2Beds] = useState([]);
  const [a3Beds, setA3Beds] = useState([]);
  const [a4Beds, setA4Beds] = useState([]);
  const [a5Beds, setA5Beds] = useState([]);
  const [a6Beds, setA6Beds] = useState([]);
  const [a7Beds, setA7Beds] = useState([]);

  const [b1Beds, setB1Beds] = useState([]);
  const [b2Beds, setB2Beds] = useState([]);
  const [b3Beds, setB3Beds] = useState([]);
  const [b4Beds, setB4Beds] = useState([]);
  const [b5Beds, setB5Beds] = useState([]);
  const [b6Beds, setB6Beds] = useState([]);
  const [c1Beds, setC1Beds] = useState([]);
  const [c2Beds, setC2Beds] = useState([]);
  const [c3Beds, setC3Beds] = useState([]);

  const [c4Beds, setC4Beds] = useState([]);

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
      const a4Snapshot = await firebaseDB.child("A4").once("value");
      const a4Data = a4Snapshot.val();
      if (a4Data) {
        const a4BedArray = Object.keys(a4Data).map((key) => ({
          id: key,
          ...a4Data[key],
        }));
        setA4Beds(a4BedArray);
      }
      const a5Snapshot = await firebaseDB.child("A5").once("value");
      const a5Data = a5Snapshot.val();
      if (a5Data) {
        const a5BedArray = Object.keys(a5Data).map((key) => ({
          id: key,
          ...a5Data[key],
        }));
        setA5Beds(a5BedArray);
      }
      const a6Snapshot = await firebaseDB.child("A6").once("value");
      const a6Data = a6Snapshot.val();
      if (a6Data) {
        const a6BedArray = Object.keys(a6Data).map((key) => ({
          id: key,
          ...a6Data[key],
        }));
        setA6Beds(a6BedArray);
      }
      const a7Snapshot = await firebaseDB.child("A7").once("value");
      const a7Data = a7Snapshot.val();
      if (a7Data) {
        const a7BedArray = Object.keys(a7Data).map((key) => ({
          id: key,
          ...a7Data[key],
        }));
        setA7Beds(a7BedArray);
      }
      const b1Snapshot = await firebaseDB.child("B1").once("value");
      const b1Data = b1Snapshot.val();
      if (b1Data) {
        const b1BedArray = Object.keys(b1Data).map((key) => ({
          id: key,
          ...b1Data[key],
        }));
        setB1Beds(b1BedArray);
      }
      const b2Snapshot = await firebaseDB.child("B2").once("value");
      const b2Data = b2Snapshot.val();
      if (b2Data) {
        const b2BedArray = Object.keys(b2Data).map((key) => ({
          id: key,
          ...b2Data[key],
        }));
        setB2Beds(b2BedArray);
      }
      const b3Snapshot = await firebaseDB.child("B3").once("value");
      const b3Data = b3Snapshot.val();
      if (b3Data) {
        const b3BedArray = Object.keys(b3Data).map((key) => ({
          id: key,
          ...b3Data[key],
        }));
        setB3Beds(b3BedArray);
      }
      const b4Snapshot = await firebaseDB.child("B4").once("value");
      const b4Data = b4Snapshot.val();
      if (b4Data) {
        const b4BedArray = Object.keys(b4Data).map((key) => ({
          id: key,
          ...b4Data[key],
        }));
        setB4Beds(b4BedArray);
      }
      const b5Snapshot = await firebaseDB.child("B5").once("value");
      const b5Data = b5Snapshot.val();
      if (b5Data) {
        const b5BedArray = Object.keys(b5Data).map((key) => ({
          id: key,
          ...b5Data[key],
        }));
        setB5Beds(b5BedArray);
      }
      const b6Snapshot = await firebaseDB.child("B6").once("value");
      const b6Data = b6Snapshot.val();
      if (b6Data) {
        const b6BedArray = Object.keys(b6Data).map((key) => ({
          id: key,
          ...b6Data[key],
        }));
        setB6Beds(b6BedArray);
      }
      const c1Snapshot = await firebaseDB.child("C1").once("value");
      const c1Data = c1Snapshot.val();
      if (c1Data) {
        const c1BedArray = Object.keys(c1Data).map((key) => ({
          id: key,
          ...c1Data[key],
        }));
        setC1Beds(c1BedArray);
      }
      const c2Snapshot = await firebaseDB.child("C2").once("value");
      const c2Data = c2Snapshot.val();
      if (c2Data) {
        const c2BedArray = Object.keys(c2Data).map((key) => ({
          id: key,
          ...c2Data[key],
        }));
        setC2Beds(c2BedArray);
      }
      const c3Snapshot = await firebaseDB.child("C3").once("value");
      const c3Data = c3Snapshot.val();
      if (c3Data) {
        const c3BedArray = Object.keys(c3Data).map((key) => ({
          id: key,
          ...c3Data[key],
        }));
        setC3Beds(c3BedArray);
      }
      const c4Snapshot = await firebaseDB.child("C4").once("value");
      const c4Data = c4Snapshot.val();
      if (c4Data) {
        const c4BedArray = Object.keys(c4Data).map((key) => ({
          id: key,
          ...c4Data[key],
        }));
        setC4Beds(c4BedArray);
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
    <div className="container mb-5">
      <div className="row g-3">
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/g1" style={{ textDecoration: "none" }}>
                  <h5>G1</h5>

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
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/g2" style={{ textDecoration: "none" }}>
                  <h5>G2</h5>

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
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/a1" style={{ textDecoration: "none" }}>
                  <h5>A1</h5>

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
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
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
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/a3" style={{ textDecoration: "none" }}>
                  <h5>A3</h5>

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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/a4" style={{ textDecoration: "none" }}>
                  <h5>A4</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {a4Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/a5" style={{ textDecoration: "none" }}>
                  <h5>A5</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {a5Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/a6" style={{ textDecoration: "none" }}>
                  <h5>A6</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {a6Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/a7" style={{ textDecoration: "none" }}>
                  <h5>A7</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {a7Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/b1" style={{ textDecoration: "none" }}>
                  <h5>B1</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {b1Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/b2" style={{ textDecoration: "none" }}>
                  <h5>B2</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {b2Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/b3" style={{ textDecoration: "none" }}>
                  <h5>B3</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {b3Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/b4" style={{ textDecoration: "none" }}>
                  <h5>B4</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {b4Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/b5" style={{ textDecoration: "none" }}>
                  <h5>B5</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {b5Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/b6" style={{ textDecoration: "none" }}>
                  <h5>B6</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {b6Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/c1" style={{ textDecoration: "none" }}>
                  <h5>C1</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {c1Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/c2" style={{ textDecoration: "none" }}>
                  <h5>C2</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {c2Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/c3" style={{ textDecoration: "none" }}>
                  <h5>C3</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {c3Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="p-3">
            <div className="card shadow-lg mb-5 bg-body rounded border-0">
              <div className="card-body">
                <Link to="/c4" style={{ textDecoration: "none" }}>
                  <h5>C4</h5>

                  <div className="d-flex flex-wrap mb-3">
                    {c4Beds.map((bed) => (
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room_no;
