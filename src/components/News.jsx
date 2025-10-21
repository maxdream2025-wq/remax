import React from "react";
import Link from "next/link";

const News = ({ newsList }) => {
  const list = Array.isArray(newsList) ? newsList : (newsList?.results || []);
  // Filter only featured news and sort by order
  const featuredNews = list
    .filter((news) => news.feature)
    .sort((a, b) => {
      // If order is not set (0), put them at the end
      if (a.order === 0 && b.order === 0) return 0;
      if (a.order === 0) return 1;
      if (b.order === 0) return -1;
      
      // Sort by order (1, 2, 3, 4...)
      return a.order - b.order;
    });

  return (
    <section className="py-5 bg-light">
      <div className="container" style={{ marginTop: "-10px" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold section-title" style={{ color: "#003366" }}>
            Latest UAE Real Estate News
          </h1>
          <p className="text-muted">
            Stay updated with property insights and market trends
          </p>
        </div>

        <div
          id="newsContainer"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {featuredNews.length > 0 ? (
            featuredNews.slice(0, 4).map((news, index) => (
              <div key={index} style={{ marginBottom: "12px" }}>
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
                    position: "relative",
                  }}
                >
                  {/* Feature badge */}
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
                  <img 
                    src={news.image ? `https://res.cloudinary.com/dkjpnznbf/${news.image}` : "/assets/building_bg.jpg"}
                    alt={news.title} 
                    className="w-100 h-100 object-fit-cover"
                    onError={(e) => {
                      console.error("Failed to load image:", news.image);
                      e.target.src = "/assets/building_bg.jpg";
                    }}
                  />
                  <div style={{ padding: "12px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h5 style={{ fontSize: "20px", margin: 0 }}>{news.title}</h5>
                    <p style={{ marginTop: "8px", marginBottom: "8px", color: "#374151", flexGrow: 1 }}>
                      {(news.desc || '').slice(0, 140)}
                    </p>
                    <p style={{ color: "#6b7280", fontSize: "12px", marginBottom: "8px" }}>
                      Date: {news.date}
                    </p>
                    <Link
                      href={`/news/${news.slug}`}
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
            ))
          ) : (
            <p className="text-center text-muted">
              No featured news available.
            </p>
          )}
        </div>

        <div className="text-center mt-4">
          <Link
            href="/news"
            id="viewAllBtn"
            className="btn btn-secondary text-white px-4 py-2"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
