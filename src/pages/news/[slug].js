import React from "react";
import axios from "axios";
import Link from "next/link";
import MetaData from "../../components/MetaData.jsx";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/news/`;

export async function getServerSideProps({ params }) {
  const { slug } = params || {};
  let item = null;

  try {
    // Fetch news detail by slug: /news/<slug>/
    const res = await axios.get(`${API_URL}${encodeURIComponent(slug)}/`);
    item = res.data;
  } catch (error) {
    return { notFound: true };
  }

  if (!item) {
    return { notFound: true };
  }

  return { props: { item } };
}

const News = ({ item }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://remax.ae";
  const canonicalUrl = item?.slug ? `${siteUrl}/news/${item.slug}` : `${siteUrl}/news`;
  const metaDescription = item?.desc ? (item.desc.length > 160 ? `${item.desc.slice(0, 160)}...` : item.desc) : "";

  return (
    <>
      <MetaData
        title={`${item?.title || "News"} | RE/MAX UAE`}
        description={metaDescription}
        image={item?.image ? `https://res.cloudinary.com/dkjpnznbf/${item.image}` : undefined}
        url={canonicalUrl}
        type="article"
      />
      <section style={{ padding: "3rem 0", backgroundColor: "#ffffff" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "24px",
            background: "#fff",
          }}
        >
          <h1 style={{ marginBottom: "1rem", fontWeight: 700, color: "#003366" }}>
            {item.title || "Untitled"}
          </h1>

          {item.image && (
            <img
              src={`https://res.cloudinary.com/dkjpnznbf/${item.image}`}
              alt={item.title || "News Image"}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
              onError={(e) => {
                console.error("Failed to load image:", item.image);
                e.target.style.display = "none";
              }}
            />
          )}

          <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7 }}>
            {item.desc || ""}
          </p>

          <div style={{ color: "#6b7280", fontSize: "14px", marginTop: "12px" }}>
            <b>{item.date || ""}</b>
          </div>

          <Link
            href="/news"
            style={{
              display: "inline-block",
              marginTop: "16px",
              background: "#6c757d",
              color: "#fff",
              padding: "8px 12px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            ← Back to News
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default News;
