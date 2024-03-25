import React, { useState } from "react";
import ImageComponent from "./ImageComponent";
import axios from 'axios'

const ParentComponent = () => {
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL

  // Function to fetch the image from S3 and update the URL
  const fetchImage = async () => {
    try {
        const response = await axios.get(
          "http://localhost:4000/app/user/getDocument?id=66015a07013ae40fc1175c58",
          {
            headers: {
              "Content-Type": 'application/json',
            },
          }
        );
        console.log("Server response:", response.data);
        const url = response.data.url;
        console.log(url);
        setImageUrl(url);
      } catch (error) {
        console.error("Error getting document:", error);
      }
  };

  return (
    <div>
      <button onClick={fetchImage}>Fetch Image</button>
      <ImageComponent imageUrl={imageUrl} />
    </div>
  );
};

export default ParentComponent;
