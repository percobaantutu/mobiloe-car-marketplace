import React from "react";
import Search from "./Search";
import Category from "./Category";

function Hero() {
  return (
    <div className="flex flex-col items-center  p-10 py-20 gap-6 min-h-screen md:h-[600px] w-full bg-[#eef0fc]">
      <h2 className="text-lg text-center">Find car for sale and for rent near you</h2>
      <h2 className="text-[60px] font-bold text-center">Find your dream car</h2>
      <Search />
      <img src=" /car.png" alt="Hero-Picture" className="md:max-w-[1300px] max-w-[390px] max-h-[320px] px-2" />
      <Category />
    </div>
  );
}

export default Hero;
