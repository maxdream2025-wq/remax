import Link from "next/link";

export default function PopularAreas({ properties }) {
console.log(properties, 'properties')

  // Filter out developer categories, show only non-developer ones
  const nonDeveloperProperties = properties ? properties.filter(area => !area.developer) : [];
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
              Explore Dubai's top residential communities, from beachfront
              luxury to vibrant urban hubs. Discover your ideal location today
            </p>
          </div>

          <div className="row">
            {nonDeveloperProperties && nonDeveloperProperties.length > 0 ? (
              nonDeveloperProperties.slice(0, 9).map((area) => (
                <div className="col-md-4 mb-4" key={area.id}>
                  <Link href={`/category/${area.slug}`}>
                    <div
                      className="area-card position-relative overflow-hidden rounded-1 shadow-sm h-100"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`https://res.cloudinary.com/dkjpnznbf/${area.image}`}
                        alt={area.property_category || area.title}
                        className="w-100 h-100 object-fit-cover"
                      />
                      <div
                        className="area-info position-absolute bottom-0 w-100 text-white p-3"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <h5 className="mb-1" style={{ fontSize: "20px" }}>
                          {area.title || area.property_category}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-white text-center mt-4">
                  {properties && properties.length > 0 
                    ? `No non-developer areas available. Total properties: ${properties.length}`
                    : "No areas available at the moment."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
