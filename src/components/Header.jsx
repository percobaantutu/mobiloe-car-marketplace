import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { IoMdHome } from "react-icons/io";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center p-5 shadow-md">
      <img src="/logo.png" alt="logo" className="h-12 object-cover" />

      <div className="hidden md:block">
        <Link to="/">
          <div className="font-medium hover:scale-105 transition-all cursor-pointer ">
            <IoMdHome className="text-3xl" />
          </div>
        </Link>
      </div>
      {isSignedIn ? (
        <div className="flex gap-4">
          <UserButton></UserButton>
          <Link to="/profile">
            <Button className="bg-green-500">Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <SignInButton mode="modal" forceRedirectUrl="/">
          <Button>Submit Listing</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Header;
