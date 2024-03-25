import React, { useState, useEffect } from "react";

const ImageComponent = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Set the image source to the provided data URL
    setImageSrc(imageUrl);
  }, [imageUrl]);

  return (
    <div>
        {console.log(imageUrl)}
      {imageSrc && <img src={imageSrc} alt="Image" />}
      {!imageSrc && <p>Loading...</p>}
    </div>
  );
};

export default ImageComponent;
