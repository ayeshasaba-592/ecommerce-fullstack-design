import React from "react";

import Hero from "../components/Hero";
import Deals from "../components/Deals";
import HomeOutdoor from "../components/HomeOutdoor";
import ConsumerElectronics from "../components/ConsumerElectronics";
import InquiryForm from "../components/InquiryForm";
import RecommendedItems from "../components/RecommendedItems";
import ExtraServices from "../components/ExtraServices";
function Home() {
  return (
    <div>
      
      <Hero />
      <Deals />
      <HomeOutdoor />
      <ConsumerElectronics />
      <InquiryForm />
      <RecommendedItems />
      <ExtraServices />

    </div>
  );
}

export default Home;