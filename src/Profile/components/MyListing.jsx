import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import CarItem from "@/components/CarItem";
import { db } from "./../../../configs/index";
import { CarListing, CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "@/hooks/use-toast";
import { supabase } from "./../../../configs/supabase";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Inbox from "./Inbox";

function MyListing() {
  const { user } = useUser();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const result = await db.select().from(CarListing).where(eq(CarListing.created_by, user.primaryEmailAddress.emailAddress)).leftJoin(CarImages, eq(CarListing.id, CarImages.car_id));

        setListings(
          result.map((row) => ({
            ...row.car_listing,
            images: row.car_images ? [row.car_images] : [],
          }))
        );
      } catch (err) {
        setError("Failed to fetch listings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchListings();
  }, [user]);

  const handleDelete = async (carId) => {
    setIsDeleting(true);

    try {
      // 1. Delete database record
      await db.delete(CarListing).where(eq(CarListing.id, carId));

      // 2. Delete storage files
      const { data: files, error: listError } = await supabase.storage.from("vehicle-images").list(`cars/${carId}`);

      if (files?.length) {
        const filesToDelete = files.map((file) => `${carId}/${file.name}`);
        const { error: deleteError } = await supabase.storage.from("vehicle-images").remove(filesToDelete);
      }

      // 3. Update UI state
      setListings((prev) => prev.filter((car) => car.id !== carId));

      toast({ title: "Success", description: "Listing deleted", variant: "default" });
    } catch (error) {
      toast({ title: "Error", description: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <div>
      <Tabs defaultValue="my-listing" className="w-full">
        <TabsList className="grid w-full  grid-cols-2 md:grid-cols-6 bg-slate-100 gap-1 md:gap-2">
          <TabsTrigger value="my-listing">My Listing</TabsTrigger>
          <TabsTrigger value="inbox">inbox</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="" className="col-span-3"></TabsTrigger>
        </TabsList>
        <TabsContent value="my-listing">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <h2 className="font-bold text-4xl">My Listing</h2>
            <Link to="/addlisting">
              <Button>+ Add New Listing</Button>
            </Link>
          </div>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : listings.length === 0 ? (
            <div className="text-center text-gray-500">No listings found. Create your first one!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {listings.map((car) => (
                <div key={car.id}>
                  <CarItem
                    car={{
                      ...car,
                      image: car.images[0]?.image_url, // Access through relation
                      name: `${car.make} ${car.model}`,
                      miles: car.mileage,
                      price: car.price, // Using renamed price field
                      fuelType: car.fuel_type, // Snake_case field
                      gearType: car.transmission,
                    }}
                  />
                  <div className="mt-2 w-full flex justify-between gap-2">
                    <Link to={`/addlisting?mode=edit&id=${car.id}`} className="w-full">
                      <Button className="bg-slate-300 w-full">Edit</Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-500">
                          <FaTrashCan />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription>Are you sure you want to delete this listing? This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(car.id)} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="inbox">
          <Inbox />
        </TabsContent>
        <TabsContent value="profile"></TabsContent>
      </Tabs>
    </div>
  );
}

export default MyListing;

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Link, useLocation } from "react-router";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useUser } from "@clerk/clerk-react";
// import { useState, useEffect } from "react";
// import CarItem from "@/components/CarItem";
// import { db } from "./../../../configs/index";
// import { CarListing, CarImages } from "./../../../configs/schema";
// import { eq } from "drizzle-orm";
// import { FaTrashCan } from "react-icons/fa6";
// import { toast } from "@/hooks/use-toast";
// import { supabase } from "./../../../configs/supabase";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import Inbox from "./Inbox";

// function MyListing() {
//   const { user } = useUser();
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("my-listing");
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     if (location.hash === "#inbox") {
//       setActiveTab("inbox");
//     }
//   }, [location]);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const result = await db.select().from(CarListing).where(eq(CarListing.created_by, user.primaryEmailAddress.emailAddress)).leftJoin(CarImages, eq(CarListing.id, CarImages.car_id));

//         setListings(
//           result.map((row) => ({
//             ...row.car_listing,
//             images: row.car_images ? [row.car_images] : [],
//           }))
//         );
//       } catch (err) {
//         setError("Failed to fetch listings");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (user) fetchListings();
//   }, [user]);

//   const handleDelete = async (carId) => {
//     setIsDeleting(true);

//     try {
//       await db.delete(CarListing).where(eq(CarListing.id, carId));

//       const { data: files } = await supabase.storage.from("vehicle-images").list(`cars/${carId}`);
//       if (files?.length) {
//         const filesToDelete = files.map((file) => `${carId}/${file.name}`);
//         await supabase.storage.from("vehicle-images").remove(filesToDelete);
//       }

//       setListings((prev) => prev.filter((car) => car.id !== carId));
//       toast({ title: "Success", description: "Listing deleted", variant: "default" });
//     } catch (error) {
//       toast({ title: "Error", description: "Delete failed", variant: "destructive" });
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div>
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-slate-100 gap-1 md:gap-2">
//           <TabsTrigger value="my-listing">My Listing</TabsTrigger>
//           <TabsTrigger value="inbox">Inbox</TabsTrigger>
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//           <TabsTrigger value="" className="col-span-3"></TabsTrigger>
//         </TabsList>
//         <TabsContent value="my-listing">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-2">
//             <h2 className="font-bold text-4xl">My Listing</h2>
//             <Link to="/addlisting">
//               <Button>+ Add New Listing</Button>
//             </Link>
//           </div>
//           {/* ... rest of the listing content ... */}
//         </TabsContent>
//         <TabsContent value="inbox">
//           <Inbox />
//         </TabsContent>
//         <TabsContent value="profile"></TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default MyListing;
