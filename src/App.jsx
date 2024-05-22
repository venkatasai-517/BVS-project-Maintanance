import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import firebaseDB from "./firebase";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import "./Nav";

const customStyle = {
  headRow: {
    style: {
      backgroundColor: "black",
      color: "white",
    },
    headCells: {
      style: {
        padding: "50px",
      },
    },
  },
};

function App() {
  const [originalRecords, setOriginalRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      // If search input is empty, show all data
      setRecords(originalRecords);
    } else {
      const newData = originalRecords.filter((row) => {
        // Convert both project_name and client_name to lowercase for case-insensitive comparison
        const projectNameLower = row.project_name.toLowerCase();
        const clientNameLower = row.client_name.toLowerCase();
        // Check if either project_name or client_name contains the search term
        return (
          projectNameLower.includes(searchTerm) ||
          clientNameLower.includes(searchTerm)
        );
      });
      setRecords(newData);
    }
  };

  const initialFormState = {
    date: "",
    status: "",
    project_name: "",
    client_name: "",
    git_repo: "",
    git_colab: "",
    web_link: "",
  };

  const [data1, setData1] = useState(initialFormState);

  const changeHandler = (e) => {
    setData1({ ...data1, [e.target.name]: e.target.value });
  };

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
        }
      });
    };

    fetchData();
    return () => firebaseDB.child("project").off();
  }, []);

  const handleDeleteButtonClick = (row) => {
    try {
      firebaseDB.child(`project/${row.id}`).remove();
      console.log("Row deleted successfully!");
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const handleEditButtonClick = (row) => {
    setSelectedRecord(row);
    setData1(row);
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();
    try {
      await firebaseDB.child(`project/${selectedRecord.id}`).update(data1);
      alert("Data updated successfully!");
      setData1(initialFormState);
    } catch (err) {
      console.log("Error updating data: ", err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await firebaseDB.child("project").push(data1);
      alert("Data saved successfully!");
      setData1(initialFormState);
    } catch (err) {
      console.log("Error saving data: ", err);
    }
  };

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const columns = [
    {
      name: "DATE",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "PROJECT_NAME",
      selector: (row) => row.project_name,
      sortable: true,
    },
    {
      name: "CLIENT_NAME",
      selector: (row) => row.client_name,
      sortable: true,
    },
    {
      name: "GIT_REPO",
      selector: (row) => row.git_repo,
      sortable: true,
      cell: (row) => <a href={row.git_repo}>{row.git_repo}</a>,
    },
    {
      name: "GIT_COLAB",
      selector: (row) => row.git_colab,
      sortable: true,
      cell: (row) => <a href={row.git_colab}>{row.git_colab}</a>,
    },
    {
      name: "WEB_LINK",
      selector: (row) => row.web_link,
      sortable: true,
      cell: (row) => <a href={row.web_link}>{row.web_link}</a>,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="row">
          <div className="col">
            <button className="btn btn-danger ">
              <i
                className="fa-solid fa-trash"
                onClick={() => handleDeleteButtonClick(row)}
              ></i>
            </button>
            <button
              className="btn btn-primary ms-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => handleEditButtonClick(row)}
              ></i>
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-3 ">
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white ">BVS</a>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-success" onClick={handleLogout}>
              Logout
            </button>
          </form>
        </div>
      </nav>
      <div className="row justify-content-end p-4">
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary me-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Projects
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
                Modal title
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
                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="validationCustom04"
                    name="status"
                    value={data1.status}
                    onChange={changeHandler}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="Finished">Finished</option>
                    <option value="Under Process">Under Process</option>
                    <option value="Not Completed">Not Completed</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="project_name"
                    value={data1.project_name}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Client Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="client_name"
                    value={data1.client_name}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Git Repo</label>
                  <input
                    type="url"
                    className="form-control"
                    name="git_repo"
                    value={data1.git_repo}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Git Colab</label>
                  <input
                    type="text"
                    className="form-control"
                    name="git_colab"
                    value={data1.git_colab}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Web Link</label>
                  <input
                    type="url"
                    className="form-control"
                    name="web_link"
                    value={data1.web_link}
                    onChange={changeHandler}
                    required
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
                Edit Record
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
                    <option value="Finished">Finished</option>
                    <option value="Under Process">Under Process</option>
                    <option value="Not Completed">Not Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="project_name" className="form-label">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="project_name"
                    name="project_name"
                    value={data1.project_name}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Client Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="client_name"
                    value={data1.client_name}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="git_repo" className="form-label">
                    Git Repo
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="git_repo"
                    name="git_repo"
                    value={data1.git_repo}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="git_colab" className="form-label">
                    Git Colab
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="git_colab"
                    name="git_colab"
                    value={data1.git_colab}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="web_link" className="form-label">
                    Web Link
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="web_link"
                    name="web_link"
                    value={data1.web_link}
                    onChange={changeHandler}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
