import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee, updateEmployee } from "../services/employeeservices";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmpEmail(response.data.empEmail);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !empEmail.trim()) {
      setMessage("All fields are required!");
      return;
    }

    const employeeData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      empEmail: empEmail.trim(),
    };

    setLoading(true);
    setMessage("");

    if (id) {
      // Update Employee
      updateEmployee(id, employeeData)
        .then((response) => {
          console.log(response.data);
          setMessage("Employee updated successfully!");
          navigate("/employees");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Failed to update employee.");
        })
        .finally(() => setLoading(false));
    } else {
      // Create Employee
      fetch("http://localhost:8081/api/employees/employee/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to save employee data");
          return response.json();
        })
        .then(() => {
          setMessage("Employee added successfully!");
          setFirstName("");
          setLastName("");
          setEmpEmail("");
        })
        .catch(() => setMessage("Failed to add employee >> Employee  already registered with given EmailId"))
        .finally(() => setLoading(false));
    }
  };

  const pageTitle = () =>
    id ? (
      <h2 className="text-center">Update Employee</h2>
    ) : (
      <h2 className="text-center">Add Employee</h2>
    );

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className="form-control"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email ID:</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email ID"
                  name="empEmail"
                  value={empEmail}
                  className="form-control"
                  onChange={(e) => setEmpEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
            {message && <div className="alert alert-info mt-2">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
