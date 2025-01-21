import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/employeeservices";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function addNewEmployee() {
    navigator("/add-employee");
  }

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);
    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">Employee List</h2>

      <button
        type="button"
        className="btn btn-primary mb-2"
        onClick={addNewEmployee}
      >
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Employee ID:</th>
            <th style={{ width: "20%" }}>Employee First Name</th>
            <th style={{ width: "20%" }}>Employee Last Name</th>
            <th style={{ width: "30%" }}>Employee Email Id</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td style={{ width: "10%" }}>{employee.id}</td>
              <td style={{ width: "20%" }}>{employee.firstName}</td>
              <td style={{ width: "20%" }}>{employee.lastName}</td>
              <td style={{ width: "30%" }}>{employee.empEmail}</td>
              <td style={{ width: "20%" }}>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeEmployee(employee.id);
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
