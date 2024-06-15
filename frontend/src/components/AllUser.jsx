// src/components/UserCard.js
import React from 'react';

const UserCard = ({ user, handleDelete }) => {
  return (
    <div className="user-card">
      <div>
        <h1>Name: {user.name}</h1>
        <p>Role: {user.role}</p>
        {user.role === "Cluster" && <p>Category: {user.category}</p>}
      </div>
      <button onClick={(e) => handleDelete(e, user)}>Delete</button>
    </div>
  );
};

export default UserCard;
