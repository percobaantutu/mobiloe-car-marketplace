import { Separator } from "./ui/separator";
import React from "react";
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { TbManualGearboxFilled } from "react-icons/tb";
import { MdOutlineOpenInNew } from "react-icons/md";
import { Link } from "react-router";

function CarItem({ car }) {
  return (
    <Link to={"/listing-details/" + car?.id} key={car?.id}>
      <div className="rounded-xl hover:shadow-md cursor-pointer p-1 md:p-2 border border-slate-400 relative">
        {car?.created_at && <h2 className="bg-red-600 text-white text-sm px-3 py-1 rounded-full absolute m-2">New</h2>}
        <img src={car?.image} alt="Car listing" width={300} height={250} className="rounded-md h-[180px] w-full object-cover" />
        <div className="mt-3">
          <h2 className="font-bold text-lg mb-2">{car?.name}</h2>
          <Separator orientation="horizontal" />
          <div className="flex gap-1 justify-between mt-2 mb-3">
            <div className="flex flex-col items-center">
              <IoSpeedometerOutline className="text-lg mb-2" />
              <h2>{car?.miles?.toLocaleString()} miles</h2>
            </div>
            <div className="flex flex-col items-center">
              <LuFuel className="text-lg mb-2" />
              <h2>{car?.fuel_type}</h2> {/* Updated from fuelType to fuel_type */}
            </div>
            <div className="flex flex-col items-center">
              <TbManualGearboxFilled className="text-lg mb-2" />
              <h2>{car?.transmission}</h2> {/* Updated from gearType to transmission */}
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex items-center justify-between mt-3">
            <h2 className="font-bold text-lg">
              ${car?.price?.toLocaleString()} {/* Added number formatting */}
            </h2>
            <h2 className="text-sm flex items-center gap-1">
              View details <MdOutlineOpenInNew />
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarItem;
