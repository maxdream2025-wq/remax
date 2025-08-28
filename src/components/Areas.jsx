import Link from "next/link";

export default function PopularAreas({ properties }) {
  return (
    <>
    {/* ss */}
      <section
        className="py-5 bg-white"
        style={{ background: "linear-gradient(135deg, #1E45AB, #4776e6)" }}
      >
        <div className="container" style={{ marginTop: "-10px" }}>
          <div className="text-center">
            <h1 className="fw-bold section-title text-white">
              Popular Areas in Dubai
            </h1>
            <p className="text-white">
              Explore Dubai’s top residential communities, from beachfront
              luxury to vibrant urban hubs. Discover your ideal location today
            </p>
          </div>

          <div className="row">
            {properties && properties.length > 0 ? (
              properties.slice(0, 9).map((area) => (
                <div className="col-md-4 mb-4" key={area.id}>
                  <Link href={`/category/${area.slug}`}>
                    <div
                      className="area-card position-relative overflow-hidden rounded-1 shadow-sm h-100"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={area.image}
                        alt={area.property_category}
                        className="w-100 h-100 object-fit-cover"
                      />
                      <div
                        className="area-info position-absolute bottom-0 w-100 text-white p-3"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <h5 className="mb-1" style={{ fontSize: "20px" }}>
                          {area.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-white text-center mt-4">
                No areas available at the moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
