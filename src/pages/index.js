import React from "react";
import Banner from "@/components/Banner";
import MetaData from "@/components/MetaData";
import WhyRemax from "@/components/WhyRemax";
import Expertise from "@/components/Expertise";
import Mission from "@/components/Mission";
import Areas from "@/components/Areas";
import News from "@/components/News";
import Review from "@/components/Review";
import InterestModal from "@/components/InterestModal";
import axios from "axios";

export default function HomePage({ properties, news, testimonials }) {
  return (
    <>
      <MetaData
        title="RE/MAX UAE - Leading Real Estate Company"
        description="RE/MAX the leading real estate company in UAE offers properties for sale and rent. And for successful business join our real estate agents or own a franchise"
        image="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
        url="https://remax.ae"
      />
      <Banner />
      <WhyRemax />
      <Expertise />
      <Mission />
      <Areas properties={properties} />
      <News newsList={news} /> 
      <Review testimonials={testimonials} />
      <InterestModal />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const [propertiesRes, newsRes, testimonialsRes] = await Promise.all([
      axios.get("http://127.0.0.1:8000/api/v1/property-categories/"),
      axios.get("http://127.0.0.1:8000/api/v1/news/"),
      axios.get("http://127.0.0.1:8000/api/v1/testimonial/"),
    ]);

    return { 
      props: { 
        properties: propertiesRes.data, 
        news: newsRes.data,
        testimonials: testimonialsRes.data || []
      } 
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return { props: { properties: [], news: [], testimonials: [] } };
  }
}
