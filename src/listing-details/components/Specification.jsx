import IconField from "@/Add Listing/components/IconField";
import CarSpecification from "@/Shared/CarSpecification";
import React from "react";

function Specification({ carDetail }) {
  //   if (!carDetail) return <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 mt-2 animate-pulse h-60"></div>;
  return (
    <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 mt-2">
      <h2 className="font-semibold tex-2xl">Specification</h2>
      {carDetail ? (
        CarSpecification.map((item, index) => (
          <div className="mt-3 flex justify-between" key={item.name}>
            <h2 className="flex items-center gap-1">
              {" "}
              <IconField icon={item.icon} className="bg-green-300" />
              {item.label}
            </h2>
            <h2>{carDetail?.[item.name]}</h2>
          </div>
        ))
      ) : (
        <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 mt-2 animate-pulse h-60"></div>
      )}
    </div>
  );
}

export default Specification;
