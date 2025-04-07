import { MdCalendarMonth } from "react-icons/md";
import { TbManualGearboxFilled } from "react-icons/tb";
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";

function DetailHeader({ carDetail }) {
  if (!carDetail) {
    return <div className="w-full h-[100px] rounded-xl bg-slate-200 animate-pulse"></div>;
  }

  return (
    <div className="flex gap-3 flex-col">
      <h2 className="text-2xl md:text-4xl font-bold">
        {carDetail.make} {carDetail.model}
      </h2>
      {carDetail.listing_title && <p>{carDetail.listing_title}</p>}
      <div className="flex gap-2 text-gray-600 flex-wrap">
        <div className="flex items-center gap-1 bg-green-200 px-2 py-1 rounded-2xl">
          <MdCalendarMonth />
          <span>{carDetail.year}</span>
        </div>
        <div className="flex items-center gap-1 bg-green-200 px-2 py-1 rounded-2xl">
          <TbManualGearboxFilled />
          <span>{carDetail.transmission}</span>
        </div>
        <div className="flex items-center gap-1 bg-green-200 px-2 py-1 rounded-2xl">
          <LuFuel />
          <span>{carDetail.fuel_type}</span>
        </div>
        <div className="flex items-center gap-1 bg-green-200 px-2 py-1 rounded-2xl">
          <IoSpeedometerOutline />
          <span>{carDetail.mileage?.toLocaleString()} miles</span>
        </div>
      </div>
    </div>
  );
}

export default DetailHeader;
