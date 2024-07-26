// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import firebaseDB from "./firebase";

import { imgDB } from "./firebase";
import "./Nav";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Modal, Button } from "react-bootstrap"; // Assuming you're using Bootstrap for the modal
<<<<<<< HEAD
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
=======
import { logout } from "./helper";
import AdvertisingComponents from "./AdvertisingComponents";
>>>>>>> f561941af3f9e40ef0b6afb77d23b41a888414d2

const customStyle = {
  headRow: {
    style: {
      backgroundColor: "black",
      color: "white",
    },
  },
};

function App() {
  const [originalRecords, setOriginalRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false); // State for image modal
  const [selectedImageUrl, setSelectedImageUrl] = useState(""); // State to store selected image URL
  // const [notifications, setNotifications] = useState([]); // State to store notifications

  const [data1, setData1] = useState({
    date: "",
    name: "",
    status: "",
    room_number: "",
    floor_number: "",
    price: "",
    payment: "",
    room_img: "",
    due_date: "",
  });
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      firebaseDB.child("project").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setOriginalRecords(dataArray);
          setRecords(dataArray);
          checkDueDates(dataArray);
        }
      });
    };
    // Listen for new data being added
    firebaseDB.child("project").on("child_added", (snapshot) => {
      const newData = snapshot.val();
      if (newData) {
        toast.success("New data added!");
      }
    });
    fetchData();
    return () => firebaseDB.child("project").off();
  }, []);

  const calculateDueDate = (dateOfJoin) => {
    const dueDate = new Date(dateOfJoin);
    dueDate.setMonth(dueDate.getMonth() + 1); // Next month's due date

    return dueDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const handlePayment = async () => {
    // Implement your payment logic here (this is a placeholder)
    // For demonstration, we assume a successful payment and update due date

    try {
      // Calculate new due date
      const newDueDate = calculateDueDate(selectedRecord.date);

      // Update Firebase record with new due date
      await firebaseDB.child(`project/${selectedRecord.id}`).update({
        ...selectedRecord,
        due_date: newDueDate,
      });

      // Notify user or update UI as needed
      toast.success("Payment successful! Due date updated.");
    } catch (error) {
      console.error("Error handling payment:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const checkDueDates = (records) => {
    const today = new Date();
    const newNotifications = [];
    records.forEach((record) => {
      const dueDate = new Date(record.due_date);
      const differenceInDays = Math.floor(
        (dueDate - today) / (1000 * 60 * 60 * 24)
      );

      if (differenceInDays < 0) {
        newNotifications.push({
          message: `Alert: Room ${record.room_number} is overdue by ${Math.abs(
            differenceInDays
          )} days!`,
          date: record.due_date,
        });
        toast.error(
          `Alert: Room ${record.room_number} is overdue by ${Math.abs(
            differenceInDays
          )} days!`
        );
      } else if (differenceInDays <= 3) {
        newNotifications.push({
          message: `Reminder: Room ${record.room_number} is due in ${differenceInDays} days!`,
          date: record.due_date,
        });
        toast.warn(
          `Reminder: Room ${record.room_number} is due in ${differenceInDays} days!`
        );
      }
    });
    // setNotifications(newNotifications);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    const imgRef = ref(imgDB, `file/${v4()}`);
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);
    return url;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = await handleFileUpload(img);
    const formDataWithImgUrl = { ...data1, room_img: url };
    await firebaseDB.child("project").push(formDataWithImgUrl);
    alert("Data saved successfully!");
    setData1({
      date: "",
      name: "",
      status: "",
      room_number: "",
      floor_number: "",
      price: "",
      payment: "",
      room_img: "",
    });
    setImg(null);
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();
    try {
      if (img) {
        const url = await handleFileUpload(img);
        data1.room_img = url;
      }
      await firebaseDB.child(`project/${selectedRecord.id}`).update(data1);
      alert("Data updated successfully!");
      setData1({
        date: "",
        name: "",
        status: "",
        room_number: "",
        floor_number: "",
        price: "",
        payment: "",

        room_img: "",
      });
      setSelectedRecord(null);
      setImg(null);
    } catch (err) {
      console.log("Error updating data: ", err);
    }
  };

  const handleDeleteButtonClick = (row) => {
    try {
      firebaseDB.child(`project/${row.id}`).remove();
      console.log("Row deleted successfully!");
    } catch (error) {
      console.error("Error deleting row:", error);
    }
    alert("do you want to delete");
  };

  const handleEditButtonClick = (row) => {
    setSelectedRecord(row);
    setData1(row);
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      setRecords(originalRecords);
    } else {
      const newData = originalRecords.filter((row) => {
        const roomNumberLower = row.room_number.toLowerCase();
        const statusLower = row.status.toLowerCase();
        // const Student_name = row.Student_name.toLowerCase();

        return (
          roomNumberLower.includes(searchTerm) ||
          statusLower.includes(searchTerm)
        );
      });
      setRecords(newData);
    }
  };

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signOut(auth);
  //     logout();
  //     navigate("/login", { replace: true });
  //   } catch (error) {
  //     console.error("Logout error:", error.message);
  //   }
  // };

  const handleImageClick = (row) => {
    setSelectedImageUrl(row.room_img);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImageUrl("");
  };

  const columns = [
    {
      name: "DATE OF JOIN",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "DUE DATE",
      selector: (row) => row.due_date,
      sortable: true,
      cell: (row) => {
        // Calculate days difference between current date and due date
        const today = new Date();
        const dueDate = new Date(row.due_date);
        const differenceInDays = Math.floor(
          (dueDate - today) / (1000 * 60 * 60 * 24)
        );

        let badgeClass = "badge bg-success"; // Default badge color for due date

        // Change badge color based on days difference
        if (differenceInDays < 3) {
          badgeClass = "badge bg-danger"; // Red color for near due dates
        }

        return (
          <span className={badgeClass}>
            {row.due_date} {/* Display due date */}
          </span>
        );
      },
    },
    // {
    //   name: "STUDENT_NAME",
    //   selector: (row) => row.name,
    //   sortable: true,
    // },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        let badgeClass = "";
        let statusText = "";

        switch (row.status) {
          case "Available":
            badgeClass = "badge bg-success";
            statusText = "Available";
            break;
          case "Not Available":
            badgeClass = "badge bg-danger";
            statusText = "Not Available";
            break;
          case "Under Maintenance":
            badgeClass = "badge bg-warning";
            statusText = "Under Maintenance";
            break;
          default:
            badgeClass = "badge bg-secondary";
            statusText = "Unknown";
        }

        return <span className={badgeClass}>{statusText}</span>;
      },
    },
    {
      name: "ROOM NUMBER",
      selector: (row) => row.room_number,
      sortable: true,
      cell: (row) => {
        let badgeClass = "badge bg-info"; // Default badge color for room numbers

        // Example condition for displaying a badge based on room number
        if (row.room_number === "101") {
          badgeClass = "badge bg-primary";
        }

        return <span className={badgeClass}>{row.room_number}</span>;
      },
    },
    {
      name: "FLOOR",
      selector: (row) => row.floor_number,
      sortable: true,
      cell: (row) => {
        let badgeClass = "badge bg-warning"; // Default badge color for room numbers

        // Example condition for displaying a badge based on room number
        if (row.floor_number === "10") {
          badgeClass = "badge bg-primary";
        }

        return <span className={badgeClass}>{row.room_number}</span>;
      },
    },
    {
      name: "PRICE",
      selector: (row) => row.price,
      sortable: true,
      cell: (row) => {
        let badgeClass = "badge bg-secondary"; // Default badge color for price

        // Example condition for displaying a badge based on price
        if (row.price > 100) {
          badgeClass = "badge bg-success";
        } else if (row.price > 50) {
          badgeClass = "badge bg-warning";
        } else {
          badgeClass = "badge bg-danger";
        }

        return (
          <span className={badgeClass}>
            ${row.price} {/* Format price to two decimal places */}
          </span>
        );
      },
    },
    {
      name: "PAYMENT",
      selector: (row) => row.payment,
      sortable: true,
    },
    {
      name: "ROOM IMG",
      selector: (row) => row.room_img,
      sortable: true,
      cell: (row) => (
        <img
          src={row.room_img}
          alt="Room"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
          onClick={() => handleImageClick(row)}
        />
      ),
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="row">
          <div className="col">
            <button
              className="btn badge text-bg-danger "
              onClick={() => handleDeleteButtonClick(row)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <button
              className="btn badge text-bg-primary ms-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
              onClick={() => handleEditButtonClick(row)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>
      ),
    },
  ];

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      setData1({
        ...data1,
        [name]: value,
        due_date: calculateDueDate(value), // Calculate due date when 'date' changes
      });
    } else {
      setData1({ ...data1, [name]: value });
    }
  };

  return (
    <div className="container mt-3 ">
      {/* <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid ">
          <a className="navbar-brand  text-white badge text-bg-dark" href="#">
            HOSTEL MANAGMENT
          </a>
          <button
            className="navbar-toggler text-bg-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-4 ms-5">
              <li className="nav-item  text-white">
                <a
                  className="nav-link active  text-white badge "
                  aria-current="page"
                  href="\dashboard"
                >
                  DASHBOARD
                </a>
              </li>
              <li className="nav-item  text-white">
                <a
                  className="nav-link active  text-white badge "
                  aria-current="page"
                  href="\rooms"
                >
                  Rooms
                </a>
              </li>
              <li className="nav-item  text-white">
                <a
                  className="nav-link active  text-white badge text-bg-secondary"
                  aria-current="page"
                  href="\app"
                >
                  SINGLE SHARE
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active  text-white badge" href="\second">
                  DOUBLE SHARE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active  text-white badge"
                  href="\thrible"
                >
                  THRIBLE SHARE
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active  text-white badge" href="\four">
                  FOUR SHARE
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active  text-white badge"
                  href="\studentdetails"
                >
                  STUDENT DETAILS
                </a>
              </li>
              <li className="nav-item dropdown">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Messages
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {notifications.length === 0 ? (
                      <Dropdown.Item>No new messages</Dropdown.Item>
                    ) : (
                      notifications.map((notification, index) => (
                        <Dropdown.Item key={index}>
                          {notification.message}
                        </Dropdown.Item>
                      ))
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button
                className="btn badge text-bg-success"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav> */}
      <ToastContainer />
      <div className="row justify-content-end p-4">
        <div className="col-auto">
          <button
            type="button"
            className="btn badge text-bg-primary me-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add AVAILABLE ROOMS
          </button>
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleFilter}
          />
        </div>
      </div>

      <DataTable
        className="table table-bordered table-secondary"
        columns={columns}
        data={records}
        selectableRows
        pagination
        customStyles={customStyle}
      />

      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Customer
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <div className="col-md-4">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={data1.date}
                    onChange={changeHandler}
                    required
                  />
                </div>
                {/* <div className="col-md-4">
                  <label className="form-label">Student_name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={data1.name}
                    onChange={changeHandler}
                    required
                  />
                </div> */}
                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={data1.status}
                    onChange={changeHandler}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option className="badge text-bg-success" value="Available">
                      Available
                    </option>
                    <option
                      className="badge text-bg-danger"
                      value="Not Available"
                    >
                      Not Available
                    </option>
                    <option
                      className="badge text-bg-warning"
                      value="Under Maintenance"
                    >
                      Under Maintenance
                    </option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Room Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="room_number"
                    value={data1.room_number}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Floor</label>
                  <input
                    type="text"
                    className="form-control"
                    name="floor_number"
                    value={data1.floor_number}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Price</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={data1.price}
                      onChange={changeHandler}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label">payment status</label>
                  <select
                    className="form-select"
                    name="payment"
                    value={data1.payment}
                    onChange={changeHandler}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option className="badge text-bg-success" value="payed">
                      payed
                    </option>
                    <option className="badge text-bg-danger" value="Not Payed">
                      Not Payed
                    </option>
                    <option
                      className="badge text-bg-warning"
                      value="Under Process"
                    >
                      Under Process
                    </option>
                  </select>
                </div>
                {/* <div className="col-md-4">
                  <label className="form-label">Git Colab</label>
                  <input
                    type="text"
                    className="form-control"
                    name="room_img"
                    value={data1.room_img}
                    onChange={changeHandler}
                    required
                  />
                </div> */}
                <div className="col-md-4">
                  <label className="form-label">ROOM Img</label>
                  <input
                    type="file"
                    name="room_img"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit PG Students Record
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitEditHandler}>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={data1.date}
                    onChange={changeHandler}
                    required
                  />
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={data1.name}
                    onChange={changeHandler}
                    required
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={data1.status}
                    onChange={changeHandler}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Room Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="room_number"
                    value={data1.room_number}
                    onChange={changeHandler}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Floor number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="floor_number"
                    value={data1.floor_number}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={data1.price}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">payment status</label>
                  <select
                    className="form-select"
                    name="payment"
                    value={data1.payment}
                    onChange={changeHandler}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option className="badge text-bg-success" value="payed">
                      payed
                    </option>
                    <option className="badge text-bg-danger" value="Not Payed">
                      Not Payed
                    </option>
                    <option
                      className="badge text-bg-warning"
                      value="Under Process"
                    >
                      Under Process
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Room Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => setImg(event.target.files[0])}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePayment}
                >
                  Pay Rent and Update Due Date
                </button>

                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AdvertisingComponents />

      <Modal show={showImageModal} onHide={handleCloseImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Room Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImageUrl} alt="Room" style={{ width: "100%" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
