import Link from "next/link";
import React from "react";
import MetaData from "../../components/MetaData.jsx";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/news/`;

export async function getServerSideProps() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch news");
    const news = await res.json();
    return { props: { news } };
  } catch (e) {
    return { props: { news: [] } };
  }
}

const truncate = (text, max) => {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
};

const NewsIndex = ({ news }) => {
  return (
    <>
      <MetaData
        title="UAE Real Estate News | RE/MAX UAE"
        description="Latest UAE real estate news, market insights, and updates from RE/MAX UAE."
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://remax.ae'}/news`}
        type="article"
      />
      <section style={{ paddingTop: "3rem", paddingBottom: "3rem", backgroundColor: "#f8f9fa" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px", marginTop: "-10px" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, color: "#003366", fontSize: "40px", margin: 0 }}>All UAE Real Estate News</h2>
          <p style={{ color: "#6c757d", marginTop: "8px" }}>Explore all the latest news and updates</p>
        </div>

        {news.length === 0 ? (
          <div style={{ textAlign: "center", color: "#6b7280" }}>No news available.</div>
        ) : (
          <div
            id="newsContainer"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {news.map((item, index) => (
              <div key={item.id || index} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    height: "100%",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative", // <-- Needed for badge positioning
                  }}
                >
                  {/* Feature badge */}
                  {item.feature && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 2,
                        background: "#ffc107",
                        color: "#212529",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontWeight: 600,
                        fontSize: "13px",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      }}
                    >
                      Featured
                    </span>
                  )}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ height: "200px", width: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ height: "200px", background: "#f3f4f6" }} />
                  )}
                  <div style={{ padding: "12px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h5 style={{ fontSize: "20px", margin: 0 }}>{item.title}</h5>
                    <p style={{ marginTop: "8px", marginBottom: "8px", color: "#374151", flexGrow: 1 }}>
                      {truncate(item.desc, 140)}
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "12px", marginBottom: "8px" }}>
                      Date: {item.date}
                    </p>
                    <Link
                      href={`/news/${item.slug}`}
                      style={{
                        background: "#6c757d",
                        color: "#fff",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        width: "fit-content",
                        marginTop: "auto",
                      }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default NewsIndex;


