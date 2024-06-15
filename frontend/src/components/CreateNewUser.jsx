import React, { useState } from "react";
import axios from "axios";
import "./createNewUser.css";
import Select from "react-select";

const CreateNewUser = ({ categories, closeForm }) => {
  const role = [
    { value: "1", label: "Sub-Admin" },
    { value: "2", label: "Cluster" },
  ];

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: null,
    category: null,
    password: "",
  });

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8080/admin/register", {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        category: newUser.category,
        password: newUser.password,
      });
      console.log(response.data);
      setNewUser({ name: "", email: "", role: null, category: null, password: "" });
      closeForm();
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />

        <Select
          name="role"
          options={role}
          classNamePrefix="select"
          value={role.find((option) => option.value === newUser.role)}
          onChange={(selectedOption) =>
            setNewUser({
              ...newUser,
              role: selectedOption.label,
            })
          }
        />
        {newUser.role === "Cluster" && (
          <Select
            name="category"
            options={categories}
            classNamePrefix="select"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.value}
            value={categories.find(
              (option) => option.value === newUser.category
            )}
            onChange={(selectedOption) =>
              setNewUser({
                ...newUser,
                category: selectedOption.name,
              })
            }
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateNewUser;
