import React from "react";
import { IoMdCheckboxOutline } from "react-icons/io";

function Features({ features }) {
  // Handle undefined/null features and non-object types
  if (!features || typeof features !== "object") {
    return null; // or return a loading state
  }
  if (!features) return <div className="h-20 animate-pulse bg-gray-100 rounded-lg"></div>;

  return (
    <div className="p-5 rounded-xl bg-white shadow-md border border-slate-300 mt-3">
      <h2 className="font-medium text-2xl mb-4">Features</h2>
      <div className="flex flex-wrap gap-2">
        {Object.entries(features).map(
          ([key, value]) =>
            // Only show features that are truthy
            value && (
              <div className="flex items-center gap-1  px-2 py-1 rounded-2xl" key={key}>
                <IoMdCheckboxOutline className="text-lg bg-gray-200 rounded-full" />
                <span className="capitalize">{key.replace(/_/g, " ")}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Features;
