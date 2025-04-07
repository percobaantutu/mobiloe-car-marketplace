import React, { useEffect, useState } from "react";
import CarItem from "./CarItem";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { db } from "./../../configs/index";
import { CarListing, CarImages } from "./../../configs/schema";
import { desc, eq } from "drizzle-orm";

function MostSearchedCar() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMostSearched = async () => {
      try {
        const result = await db.select().from(CarListing).leftJoin(CarImages, eq(CarImages.car_id, CarListing.id)).orderBy(desc(CarListing.created_at)).limit(10);

        console.log("Raw query result:", result); //

        const transformed = result.map((row) => ({
          ...row.car_listing,
          images: row.car_images ? [row.car_images] : [],
        }));

        console.log("Transformed data:", transformed);

        setCars(transformed);
      } catch (err) {
        setError("Failed to load popular listings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMostSearched();
  }, []);

  if (loading) return <div className="text-center">Loading popular cars...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="mx-14 md:mx-20 mt-16 lg:mt-96">
      <h2 className="font-bold text-3xl text-center my-16">Most Recent Listings</h2>
      <Carousel>
        <CarouselContent>
          {cars.map((car) => (
            <CarouselItem key={car.id} className="basis-1/1 md:basis-1/3 lg:basis-1/4">
              <CarItem
                car={{
                  ...car,
                  image: car.images[0]?.image_url || "/default-car.jpg",
                  name: `${car.make}  ${car.model}`,
                  miles: car.mileage,
                  price: car.price,
                  fuelType: car.fuel_type,
                  gearType: car.transmission,
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default MostSearchedCar;
