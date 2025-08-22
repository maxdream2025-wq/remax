import React from "react";
import axios from "axios";
import Link from "next/link";

const API_URL = "http://127.0.0.1:8000/api/v1/news/";

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
  return (
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
              src={item.image}
              alt={item.title || "News Image"}
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "16px",
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
  );
};

export default News;
