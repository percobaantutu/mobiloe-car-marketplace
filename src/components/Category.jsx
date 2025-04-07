import Data from "@/Shared/Data";
import React from "react";
import { Link } from "react-router";

function Category() {
  return (
    <div className="">
      <h2 className="font-bold text-3xl  text-center mb-12">Browse your type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 lg:px-15">
        {Data.Category.map((type) => (
          <Link to={`/search/${type.name}`} key={type.id} className="block">
            <div className="border border-slate-500 rounded-xl shadow-lg p-3 flex flex-col items-center hover:scale-105 transition-all cursor-pointer" key={type.id}>
              <img src={type.icon} alt={type.name} width={40} height={40} />
              <h2 className="mt-2">{type.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
