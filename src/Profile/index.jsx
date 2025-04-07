import Header from "@/components/Header";

import React from "react";
import MyListing from "./components/MyListing";

function Profile() {
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <MyListing />
      </div>
    </div>
  );
}

export default Profile;
