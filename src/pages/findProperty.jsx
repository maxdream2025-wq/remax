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

    // Fetch properties if search parameters are provided
    let properties = [];
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

        const propertiesRes = await axios.get(`${FIND_PROPERTY_API_URL}?${searchParams.toString()}`);
        properties = propertiesRes.data;
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
        searchError: "Failed to load categories. Please try again.",
        searchParams: query
      } 
    };
  }
}

const FindProperty = ({ categories, properties, searchError, searchParams }) => {
	console.log(categories)
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
				searchParams={searchParams}
			/>
			<SearchResult 
				properties={properties}
				searchError={searchError}
				searchParams={searchParams}
			/>

			<section id="top_areas" className="mt_115 topareas_ paddingeneral" style={{minHeight: "100vh"}}>
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
						{categories.length === 0 ? (
							<div className="col-12">
								<p className="text-muted">No categories available.</p>
							</div>
						) : (
							categories
								.filter(category => category.developer) // <-- Only show if developer is true
								.map((category) => (
									<div key={category.id} className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 padd_null p-0">
										<div className="flexed_gallery w-100" style={{ height: "350px" }}>
											<Link href={`/category/${category.slug}`}>
												<img 
													src={category.image || "/assets/building_bg.jpg"} 
													alt={category.title || category.property_category} 
													style={{ width: "100%", height: "100%", objectFit: "cover" }}
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