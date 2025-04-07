import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";

function Pricing({ carDetail }) {
  return (
    <div className="p-4 rounded-xl bg-white shadow-md border border-slate-300 text-center">
      <h2 className="font-medium text-xl my-2">Our Price</h2>
      <h2 className="font-bold text-3xl my-2">$ {carDetail?.price}</h2>
      <Button className="w-full lg:text-lg text-base bg-green-500 rounded-xl" size="lg">
        <MdOutlineLocalOffer />
        Make an offer price
      </Button>
    </div>
  );
}

export default Pricing;
