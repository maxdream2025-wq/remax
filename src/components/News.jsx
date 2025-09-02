import React from "react";
import Link from "next/link";

const News = ({ newsList }) => {
  // Filter only featured news
  const featuredNews = newsList ? newsList.filter((news) => news.feature) : [];

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

        <div className="row row-cols-1 row-cols-md-3 g-4" id="newsContainer">
          {featuredNews.length > 0 ? (
            featuredNews.slice(0, 3).map((news, index) => (
              <div className="col" key={index}>
                <div className="card h-100 shadow-sm position-relative">
                  <span
                    className="badge bg-warning text-dark position-absolute"
                    style={{ top: "10px", right: "10px", zIndex: 2 }}
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
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "20px" }}>
                      {news.title}
                    </h5>
                    <p className="card-text">{news.desc.slice(0, 100)}</p>
                    <p className="card-text text-muted small">
                      Date: {news.date}
                    </p>
                    <Link
                      href={`/news/${news.slug}`}
                      className="btn btn-sm btn-secondary"
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
