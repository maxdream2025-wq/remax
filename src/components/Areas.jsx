import Link from "next/link";

export default function PopularAreas({ properties }) {
  const propsArray = Array.isArray(properties) ? properties : (properties?.results || []);
  // Filter out developer categories, show only non-developer ones
  const nonDeveloperProperties = propsArray.filter(area => !area.developer);
  
  // Sort by order field (lower numbers appear first)
  const sortedProperties = nonDeveloperProperties.sort((a, b) => {
    // If order is not set (0), put them at the end
    if (a.order === 0 && b.order === 0) return 0;
    if (a.order === 0) return 1;
    if (b.order === 0) return -1;
    
    // Sort by order (1, 2, 3, 4...)
    return a.order - b.order;
  });
  
  console.log('Sorted properties by order:', sortedProperties.map(p => ({ title: p.title, order: p.order })));
  
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
            {sortedProperties && sortedProperties.length > 0 ? (
              sortedProperties.slice(0, 9).map((area) => (
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
