import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "./../../../configs";
import { CarListing, CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import CarItem from "@/components/CarItem";
import Header from "@/components/Header";
import Search from "@/components/Search";

function SearchPage() {
  const { category } = useParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarsByCategory = async () => {
      try {
        console.log("Fetching cars for category:", category);
        const result = await db.select().from(CarListing).where(eq(CarListing.category, category)).leftJoin(CarImages, eq(CarListing.id, CarImages.car_id));

        console.log("Query result:", result);

        setCars(
          result.map((row) => ({
            ...row.car_listing,
            images: row.car_images ? [row.car_images] : [],
          }))
        );
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsByCategory();
  }, [category]);

  return (
    <div>
      <Header />
      <div className="p-10 bg-slate-600 flex justify-center">
        <Search />
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{category} Listings</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : cars.length === 0 ? (
          <div>No {category} cars found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cars.map((car) => (
              <CarItem
                key={car.id}
                car={{
                  ...car,
                  image: car.images[0]?.image_url,
                  name: `${car.make} ${car.model}`,
                  miles: car.mileage,
                  price: car.price,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
