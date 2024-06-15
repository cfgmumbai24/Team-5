import React from 'react';
import './profile.css';

const data = {
  name: "Someone",
  email: "abc@gmail.com",
}

const Profile = () => {
  return (
    <div className="profile-container">
      <h1 className="profile-name">{data.name}</h1>
      <p className="profile-email">{data.email}</p>
    </div>
  );
}

export default Profile;
