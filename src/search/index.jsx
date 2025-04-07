import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { db } from "./../../configs";
import { CarListing, CarImages } from "./../../configs/schema";
import { eq, lte } from "drizzle-orm"; // Added lte import
import CarItem from "@/components/CarItem"; // Assuming this is the correct path
import Header from "@/components/Header";

function SearchResults() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const fetchResults = async () => {
      try {
        // Added try statement
        let query = db.select().from(CarListing).leftJoin(CarImages, eq(CarListing.id, CarImages.car_id));

        if (searchParams.get("cars")) {
          query = query.where(eq(CarListing.condition, searchParams.get("cars")));
        }
        if (searchParams.get("make")) {
          query = query.where(eq(CarListing.make, searchParams.get("make")));
        }
        if (searchParams.get("price")) {
          query = query.where(lte(CarListing.price, searchParams.get("price")));
        }

        const data = await query.execute();
        const formattedData = data.map((row) => ({
          id: row.car_listing.id,
          image: row.car_images?.image_url || "",
          name: `${row.car_listing.make} ${row.car_listing.model}`,
          miles: row.car_listing.mileage,
          fuel_type: row.car_listing.fuel_type,
          transmission: row.car_listing.transmission,
          price: row.car_listing.price,
          created_at: row.car_listing.created_at,
        }));
        setResults(formattedData);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.search]);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : results.length === 0 ? (
          <div className="text-center text-gray-500">No matching cars found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((car) => (
              <CarItem key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
