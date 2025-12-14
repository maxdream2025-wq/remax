import MetaData from "@/components/MetaData";
import React from "react";

const RemaxDream = () => {
	return (
		<>
			<MetaData
				title="RE/MAX Dream | Top Real Estate Company"
				description="RE/MAX Dream connects buyers and sellers in the luxury property market, delivering transparent, efficient, and tailored real estate solutions."
				image="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
				url="https://remax.ae"
			/>

			{/* About content */}
			<section className="container my-5">
				<div className="row align-items-center">
					{/* Company Image */}
					<div className="col-lg-6 mb-4 mb-lg-0 col-sm-12" style={{ marginTop: 10 }}>
						<img src="/assets/remax.png" alt="RE/MAX Dream Office" className="img-fluid" />
					</div>

					{/* Company Info */}
					<div className="col-lg-6 col-sm-12 ">
						<h2 className="text-uppercase mb-3" style={{ color: "white", fontSize: "40px" }}>
							About RE/MAX Dream UAE
						</h2>
						<p className="text-white mb-3">
							We are <strong>RE/MAX Dream UAE</strong>, a newly established real estate brokerage committed to
							connecting buyers and sellers in the luxury property market. As part of the globally trusted RE/MAX
							network, we combine fresh local insight with proven international standards to deliver exceptional
							service and value.
						</p>
						<p className="text-white">
							Whether you're looking for a luxury villa, commercial space, or investment opportunity, our team is
							committed to providing transparent, efficient, and tailored real estate solutions.
						</p>
						<ul className="list-unstyled mt-4 text-white">
							<li>
								<strong>📍 Address:</strong> Armada hotel - Al Barsha, Office No - 101, Dubai, UAE
							</li>
							<li>
								<strong>📞 Phone:</strong> +971 547128882
							</li>
							<li>
								<strong>📧 Email:</strong> info@remaxdreamuae.com
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Google Map */}
			<section style={{ backgroundColor: "rgb(226, 226, 226)", paddingTop: 10, paddingBottom: 100 }}>
				<div className="row mt-5">
					<div className="col-12 px-0">
						<h2 className="mb-3 text-center" style={{ color: "#003366", fontSize: "40px" }}>
							Our Location
						</h2>
						<div className="map-container ratio ratio-16x9">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.733177676203!2d55.20258327530113!3d25.110891977766645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6beb5ef4055f%3A0x4350e38c468d954b!2sArmada%20Hotel%20-%20Al%20Barsha!5e0!3m2!1sen!2sae!4v1753278227094!5m2!1sen!2sae"
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
					</div>
				</div>
			</section>

		</>
	);
};

export default RemaxDream;