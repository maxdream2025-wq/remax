import React from "react";
import AddCategory from "./addProperty/AddCategory";
import AddProperty from "./addProperty/property";
import News from "./addNews/News";
import Testimonial from "./addTestimonial";
import Interest from "./Interest";

const Body = ({ activeMenu }) => {
  switch (activeMenu) {
    case "dashboard":
      return <div className="p-4"><h2>Dashboard Content</h2></div>;
    case "add-property":
      return <AddProperty />;
    case "Add-News":
      return <News/>;
    case "Add-Category":
      return <AddCategory />;
    case "testimonial":
      return <Testimonial />;
    case "interest":
      return <Interest />;
    default:
      return <div className="p-4"><h2>Dashboard Content</h2></div>;
  }
};

export default Body;
