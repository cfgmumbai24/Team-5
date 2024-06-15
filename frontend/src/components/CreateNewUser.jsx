import React, { useState } from "react";
import "./createNewUser.css";
import Select from "react-select";

const CreateNewUser = ({ categories, closeForm }) => {
  const role = [
    { value: "1", label: "Sub-Admin" },
    { value: "2", label: "Cluster" },
  ];

  const [newUser, setNewUser] = useState({
    name: "",
    role: null,
    category: null,
    password: "",
  });

  const handleUser = (e) => {
    e.preventDefault();
    console.log(newUser);
    setNewUser({ name: "", role: null, category: null, password: "" });
    closeForm();
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
            value={categories.find(
              (option) => option.value === newUser.category
            )}
            onChange={(selectedOption) =>
              setNewUser({
                ...newUser,
                category: selectedOption.label,
              })
            }
          />
        )}
        <input
          type="text"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateNewUser;
