import React, { useState } from "react";
import axios from "axios";
import { fileToBase64 } from "../commonServices/commonMethods";


const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    phoneNumber: "",
    profile: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const base64String = await fileToBase64(file); // Convert file to base64
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile: {
        name: file.name,
        type: file.type,
        data: base64String,
      }
    }));
  };
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        profile: formData.profile, // Assuming profile is a URL or some identifier, not the actual file
      };
  
    // formDataToSend.append("file", formData.profile);

    axios
      .post(
        "http://localhost:4000/app/user/registration",
        data,
        {
          headers: {
            "Content-Type": 'application/json',
          },
        }
      )
      .then((response) => {
        console.log("Server response:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading user data:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <label htmlFor="profile">Profile:</label>
        <input
          type="file"
          id="profile"
          name="profile"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
