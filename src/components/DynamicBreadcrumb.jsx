// components/Breadcrumb.js
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Breadcrumb = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Format slug to readable text
  const formattedSlug = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  return (
    <nav>
      <ol className="breadcrumb p-2 container" >
        <li className="breadcrumb-item">
          <Link className="text-white" href="/">Home</Link>
        </li>
        {slug && (
          <li className="breadcrumb-item active text-white" aria-current="page">
            {formattedSlug}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
