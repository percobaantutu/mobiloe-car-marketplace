import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "../components/DetailHeader";
import { useParams } from "react-router";
import { db } from "./../../../configs";
import { CarListing, CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import ImageGallery from "../components/ImageGallery";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Specification from "../components/Specification";
import ProfileOwner from "../components/ProfileOwner";
import FinancialCalculator from "../components/FinancialCalculator";
import ListingFooter from "../components/ListingFooter";

function ListingDetails() {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetCarDetail();
  }, [id]);

  const GetCarDetail = async () => {
    try {
      const result = await db.select().from(CarListing).where(eq(CarListing.id, id)).leftJoin(CarImages, eq(CarListing.id, CarImages.car_id));

      console.log("Full result:", result);

      if (result.length > 0) {
        // Structure the data properly
        const formattedData = {
          ...result[0].car_listing,
          images: result.map((row) => row.car_images?.image_url).filter(Boolean),
          features: result[0].car_listing.features || {},
        };

        setCarDetail(formattedData);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="p-10 md:px-20">
        <DetailHeader carDetail={carDetail} />
        <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-3">
          <div className="md:col-span-2">
            <ImageGallery carDetail={carDetail} />
            <Description carDetail={carDetail} />
            <Features features={carDetail?.features} />
            <FinancialCalculator />
          </div>
          <div>
            <div>
              <Pricing carDetail={carDetail} />
            </div>
            <div>
              <Specification carDetail={carDetail} />
            </div>
            <div>
              <ProfileOwner carDetail={carDetail} />
            </div>
          </div>
        </div>
        {/* <MostSearchedCar className="mt-5" /> */}
      </div>
      <ListingFooter />
    </div>
  );
}

export default ListingDetails;
