import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router";
import Data from "@/Shared/Data";
import { Button } from "./ui/button";

function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    cars: "",
    make: "",
    price: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchParams.cars) params.append("cars", searchParams.cars);
    if (searchParams.make) params.append("make", searchParams.make);
    if (searchParams.price) params.append("price", searchParams.price);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="flex bg-white rounded-xl md:rounded-full flex-col md:flex-row  p-2 md:p-5  gap-2 lg:gap-10 mx-5 items-center w-full md:w-[60%]">
      <Select onValueChange={(value) => setSearchParams((prev) => ({ ...prev, cars: value }))}>
        <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg rounded-full">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setSearchParams((prev) => ({ ...prev, make: value }))}>
        <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg rounded-full">
          <SelectValue placeholder="Car Brand" />
        </SelectTrigger>
        <SelectContent>
          {Data.carBrand.map((car, index) => (
            <SelectItem value={car.name} key={index}>
              {car.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select onValueChange={(value) => setSearchParams((prev) => ({ ...prev, price: value }))}>
        <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg rounded-full">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1000">1000</SelectItem>
          <SelectItem value="5000">5000</SelectItem>
          <SelectItem value="7000">7000</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <div className="p-2 text-2xl bg-black text-white rounded-full hover:scale-105 transition-all w-full cursor-pointer text-center flex justify-center" aria-label="Search">
        <CiSearch onClick={handleSearch} />
      </div>
    </div>
  );
}

export default Search;
