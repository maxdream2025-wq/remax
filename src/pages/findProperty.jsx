import MetaData from "@/components/MetaData";
import React from "react";
import axios from "axios";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import SearchResult from "@/components/SearchResult";

const CATEGORIES_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/property-categories/`;
const FIND_PROPERTY_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/find-property/`;

export async function getServerSideProps({ query }) {
  try {
    // Fetch categories
    const categoriesRes = await axios.get(CATEGORIES_API_URL);
    const categories = categoriesRes.data;
	console.log(categories, 'categories')

    // Fetch properties if search parameters are provided
    let properties = [];
    let pagination = { count: 0, next: null, previous: null, page: 1 };
    let searchError = null;

    if (query.location) {
      try {
        const searchParams = new URLSearchParams();
        
        // Add all search parameters
        if (query.location) searchParams.append('location', query.location);
        if (query.propertyType) searchParams.append('propertyType', query.propertyType);
        if (query.userType) searchParams.append('userType', query.userType);
        if (query.bedroom) searchParams.append('bedroom', query.bedroom);
        if (query.bathroom) searchParams.append('bathroom', query.bathroom);
        if (query.completionStatus) searchParams.append('completionStatus', query.completionStatus);
        if (query.minPrice) searchParams.append('minPrice', query.minPrice);
        if (query.maxPrice) searchParams.append('maxPrice', query.maxPrice);
        if (query.areaMin) searchParams.append('areaMin', query.areaMin);
        if (query.areaMax) searchParams.append('areaMax', query.areaMax);

        // Pagination
        const page = query.page || 1;
        searchParams.append('page', page);

        const propertiesRes = await axios.get(`${FIND_PROPERTY_API_URL}?${searchParams.toString()}`);
        const data = propertiesRes.data;
        properties = Array.isArray(data) ? data : (data.results || []);
        pagination = Array.isArray(data)
          ? { count: properties.length, next: null, previous: null, page: Number(page) }
          : { count: data.count ?? properties.length, next: data.next || null, previous: data.previous || null, page: Number(page) };
      } catch (error) {
        if (error.response?.data?.error) {
          searchError = error.response.data.error;
        } else {
          searchError = "Failed to fetch properties. Please try again.";
        }
        console.error("Error fetching properties:", error.message);
      }
    }

    return { 
      props: { 
        categories,
        properties,
        pagination,
        searchError,
        searchParams: query
      } 
    };
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return { 
      props: { 
        categories: [],
        properties: [],
        pagination: { count: 0, next: null, previous: null, page: 1 },
        searchError: "Failed to load categories. Please try again.",
        searchParams: query
      } 
    };
  }
}

const FindProperty = ({ categories, properties, pagination, searchError, searchParams }) => {
	// Sort categories by order field (lower numbers appear first)
	const sortedCategories = categories ? categories.sort((a, b) => {
		// If order is not set (0), put them at the end
		if (a.order === 0 && b.order === 0) return 0;
		if (a.order === 0) return 1;
		if (b.order === 0) return -1;
		
		// Sort by order (1, 2, 3, 4...)
		return a.order - b.order;
	}) : [];
	
	console.log('Categories sorted by order:', sortedCategories.map(cat => ({ title: cat.title, order: cat.order })));
	
	return (
		<>
			<MetaData
				title="RE/MAX UAE- Top Real Estate Company"
				description="Find properties for sale and rent across UAE with RE/MAX."
				image="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
				url="https://remax.ae/findProperty"
			/>
			<SearchForm 
				categories={categories}
				properties={properties}
				searchError={searchError}
				s earchParams={searchParams}
			/>
			<SearchResult 
				properties={properties}
				searchError={searchError}
				searchParams={searchParams}
			/>

			{/* Pagination controls for search results */}
			{searchParams.location && (
				<div className="container" style={{ marginTop: "-20px" }}>
					<div className="d-flex justify-content-between align-items-center py-3">
						<div>
							<span className="text-muted">Total: {pagination?.count ?? properties.length}</span>
						</div>
						<div className="btn-group">
							{pagination?.previous && (
								<Link
									href={{ pathname: "/findProperty", query: { ...searchParams, page: Math.max((pagination?.page || 1) - 1, 1) } }}
									className="btn btn-outline-secondary"
								>
									Previous
								</Link>
							)}
							{pagination?.next && (
								<Link
									href={{ pathname: "/findProperty", query: { ...searchParams, page: (pagination?.page || 1) + 1 } }}
									className="btn btn-outline-secondary"
								>
									Next
								</Link>
							)}
						</div>
					</div>
				</div>
			)}

			<section id="top_areas" className="bg-white pt-5 topareas_ paddingeneral" style={{minHeight: "100vh"}}>
				<div className="container-fluid">
					<div className="styleheadingmain">
						<h2 className="lighttext">
							Areas
						</h2>
						<h4 className="font_48_bold">Discover by Top Developers</h4>
					</div>
				</div>
				<div className="text-center topareas_items">
					<div className="row flex-wrap m-0" id="categoryGrid">
						{sortedCategories.length === 0 ? (
							<div className="col-12">
								<p className="text-muted">No categories available.</p>
							</div>
						) : (
							sortedCategories
								.filter(category => category.developer) // <-- Only show if developer is true
								.map((category) => (
									<div key={category.id} className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 padd_null p-0">
										<div className="flexed_gallery w-100" style={{ height: "350px" }}>
											<Link href={`/category/${category.slug}`}>
												<img 
													src={category.image ? `https://res.cloudinary.com/dkjpnznbf/${category.image}` : ""} 
													alt={category.title || category.property_category} 
													style={{ width: "100%", height: "100%", objectFit: "cover" }}
													onError={(e) => {
														console.error("Failed to load image:", category.image);
														e.target.src = "/assets/building_bg.jpg";
													}}
												/>
												<div className="overlay">
													<span>{category.title || category.property_category}</span>
												</div>
											</Link>
										</div>
									</div>
								))
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default FindProperty;