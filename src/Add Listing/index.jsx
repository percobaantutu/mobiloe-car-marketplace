import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import carDetails from "@/Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import features from "@/Shared/features.json";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { CarListing, CarImages } from "./../../configs/schema";
import { db } from "./../../configs";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { supabase } from "./../../configs/supabase";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from "react-router";
import { eq } from "drizzle-orm";

// Add this right after your imports
const sanitizeFilename = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-.]/g, "")
    .replace(/-+/g, "-");
};

function AddListing() {
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";
  const carId = searchParams.get("id");
  const [existingImages, setExistingImages] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [featuresData, setFeaturesData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { user } = useUser();

  const handleImageUpload = async (files, carId) => {
    try {
      const urls = [];
      for (const [index, file] of files.entries()) {
        const cleanName = sanitizeFilename(file.name);
        const fileName = `cars/${carId}/${Date.now()}-${index}-${cleanName}`;

        const { error } = await supabase.storage
          .from("vehicle-images") // Changed bucket name
          .upload(fileName, file);

        if (error) throw error;

        const {
          data: { publicUrl },
        } = await supabase.storage.from("vehicle-images").getPublicUrl(fileName);

        urls.push(publicUrl);
      }
      return urls;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchCarData = async () => {
        try {
          const result = await db.select().from(CarListing).where(eq(CarListing.id, carId)).leftJoin(CarImages, eq(CarListing.id, CarImages.car_id));

          const carData = result[0].car_listing;
          const images = result.map((row) => row.car_images?.image_url).filter(Boolean);

          setFormData(carData);
          setFeaturesData(carData.features || {});
          setExistingImages(images);
        } catch (error) {
          toast({ title: "Error", description: "Failed to load listing", variant: "destructive" });
        }
      };
      fetchCarData();
    }
  }, [isEditMode, carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setSubmitError(null);

    try {
      if (isEditMode) {
        // UPDATE existing listing
        await db
          .update(CarListing)
          .set({ ...formData, features: featuresData })
          .where(eq(CarListing.id, carId));

        // Handle images (delete old ones if new files added)
        if (selectedFiles.length > 0) {
          await db.delete(CarImages).where(eq(CarImages.car_id, carId));
          const newUrls = await handleImageUpload(selectedFiles, carId);
          await db.insert(CarImages).values(
            newUrls.map((url) => ({
              car_id: carId,
              image_url: url,
            }))
          );
        }

        toast({ title: "Updated!", description: "Listing updated successfully", variant: "success" });
        navigate("/profile");
      } else {
        // Existing CREATE logic (keep your original code here)
        try {
          // 1. Create main car listing
          const [newCar] = await db
            .insert(CarListing)
            .values({
              ...formData,
              features: featuresData,
              created_by: user.primaryEmailAddress.emailAddress,
              user_name: user?.fullName || "Anonymous",
              user_image_url: user?.imageUrl,
              created_at: new Date(),
            })
            .returning();

          // 2. Upload images and create image records
          const imageUrls = await handleImageUpload(selectedFiles, newCar.id);

          await db.insert(CarImages).values(
            imageUrls.map((url) => ({
              car_id: newCar.id,
              image_url: url,
            }))
          );

          toast({
            title: "Listing Created",
            description: "Your car listing has been successfully published!",
            variant: "success",
          });

          // Reset form
          setFormData({});
          setFeaturesData({});
          setSelectedFiles([]);
          navigate("/profile");
        } catch (error) {
          toast({
            title: "Submission Failed",
            description: error.message || "Failed to create listing. Please try again.",
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturesChange = (name, value) => {
    setFeaturesData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Header />
      <div className=" px-5 md:px-20 my-10">
        <h2 className="font-bold text-4xl">{isEditMode ? "Edit Listing" : "Add New Listing"}</h2>
        <form onSubmit={handleSubmit} className="p-5 md:p-10 border rounded-xl mt-6">
          {/* Car Details Section */}
          <h2 className="font-medium text-xl mb-6">Car Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {carDetails.carDetails.map((item, index) => (
              <div key={index}>
                <label className="text-sm flex gap-3 items-center mb-1">
                  <IconField icon={item.icon} />
                  {item.label} {item.required && <span className="text-red-500">*</span>}
                </label>
                {item.fieldType === "text" || item.fieldType === "number" ? (
                  <InputField item={item} onChange={(value) => handleInputChange(item.name, value)} value={formData[item.name] || ""} />
                ) : item.fieldType === "dropdown" ? (
                  <DropdownField item={item} onChange={(value) => handleInputChange(item.name, value)} value={formData[item.name] || ""} />
                ) : item.fieldType === "textarea" ? (
                  <TextAreaField item={item} onChange={(value) => handleInputChange(item.name, value)} value={formData[item.name] || ""} />
                ) : null}
              </div>
            ))}
          </div>

          <Separator className="my-10" />

          {/* Features Section */}
          <h2 className="font-medium text-xl mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {features.features.map((item) => (
              <div key={item.id || item.name}>
                {item.fieldType === "checkbox" && (
                  <div className="flex items-center gap-2 ">
                    <Checkbox onCheckedChange={(value) => handleFeaturesChange(item.name, value)} checked={featuresData[item.name] || false} />
                    <h2>{item.label}</h2>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Separator className="my-10" />

          {/* Image Upload Section */}
          <UploadImages selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} isUploading={isUploading} existingImages={existingImages} />

          {/* Submit Section */}
          <div className="flex justify-end p-2 mt-8">
            <Button type="submit" disabled={isUploading || selectedFiles.length === 0} className="min-w-[200px] bg-green-500">
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">🌀</span>
                  Submitting...
                </span>
              ) : (
                "Publish Listing"
              )}
            </Button>
          </div>

          {submitError && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">{submitError}</div>}
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default AddListing;
