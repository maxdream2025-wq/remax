import React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "./DynamicBreadcrumb";

const DynamicBanner = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Format slug to readable text
  const formattedSlug = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  return (
    <div
      className=" text-white p-4"
      style={{
        backgroundColor: "#003366",
        borderTop: "1px solid #a8a8a845"
      }}
    >
      <div className="container">
        <h1
          className="text-left fw-bold"
          style={{
            fontSize: "3rem",
          }}
        >
          {formattedSlug || "Loading..."}
        </h1>
        <div className="w-100">
          <Breadcrumb />
        </div>
      </div>
    </div>
  );
};

export default DynamicBanner;
