import React from "react";

function ImageGallery({ carDetail }) {
  return (
    <div>
      {carDetail?.images?.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full max-h-[500px] object-cover rounded-xl border-2 border-gray-200" />
      ))}
    </div>
  );
}

export default ImageGallery;
