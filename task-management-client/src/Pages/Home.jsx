import React, { useEffect } from "react";
import Banner from "../Component/Banner";
import Testimonial from "../Component/Testimonial";
import BestWorker from "../Component/BestWorker";
import Newsletter from "../Component/Newsletter";
import WhyChooseUs from "../Component/WhyChooseUs ";
import HowItWorks from "../Component/HowItWorks";
import Aos from "aos";
import FeatureTask from "../Component/FeatureTask";
import { CallToActionSection } from "../Component/CallToActionSection";

const Home = () => {
  useEffect(() => {
    document.title = "ZenTask - Home";
    Aos.init({ duration: 800 });
  }, []);
  return (
    <div className="">
      <Banner />
      <FeatureTask />
      <BestWorker />
      <Testimonial />
      <HowItWorks />
      <WhyChooseUs />
      <Newsletter />
    </div>
  );
};

export default Home;
