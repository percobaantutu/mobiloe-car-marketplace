import React from "react";
import { Button } from "./components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MostSearchedCar from "./components/MostSearchedCar";
import InformationSection from "./components/InformationSection";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <div>
      <Header />

      <Hero />

      <MostSearchedCar />
      <InformationSection />
      <Footer />
    </div>
  );
}

export default HomePage;
