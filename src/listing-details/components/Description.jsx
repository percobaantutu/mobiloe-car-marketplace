import React from "react";

function Description({ carDetail }) {
  return (
    <div>
      {carDetail?.listing_description ? (
        <div className="p-5 rounded-xl bg-white shadow-md border border-slate-300 mt-3">
          <h2 className="font-bold text-2xl my-2">Description</h2>
          <p>{carDetail?.listing_description}</p>
        </div>
      ) : (
        <div className="w-full h-[100px] rounded-xl bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default Description;
