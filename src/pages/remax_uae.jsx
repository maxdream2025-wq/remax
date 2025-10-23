import MetaData from "@/components/MetaData";
import React, { useEffect, useState } from "react";
import logoNew from "@/assets/logo-new.png";

const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const endValue = parseInt(String(end).replace(/\D/g, ""));
        const totalFrames = Math.max(1, Math.floor(duration / 16));
        const step = (endValue - start) / totalFrames;

        const updateCounter = () => {
            start += step;
            if (start < endValue) {
                setCount(Math.floor(start));
                requestAnimationFrame(updateCounter);
            } else {
                setCount(endValue);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [end, duration]);

    return count;
};

const RemaxUae = () => {
    const emirates = useCounter("3");
    const offices = useCounter("10+");
    const agents = useCounter("150+");

    return (
        <>
            <MetaData
                title="RE/MAX UAE | Real Estate Across UAE"
                description="RE/MAX UAE serves clients across Dubai, Abu Dhabi and Ras Al Khaimah with top agents and offices."
                image="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
                url="https://remax.ae"
            />

            <section id="egypt_era_page">
                {/* Banner era */}
                <section
                    className="full-bg-section rm_banner uaecoverbg"
                    id="about_global_bg"
                    style={{
                        backgroundImage:
                            "url(http://remax.ae/staging/public/uploads/pages/page_top_banner_image.webp)",
                    }}
                >
                    <svg
                        className="outlined_borders"
                        width="1920"
                        height="1026"
                        viewBox="0 0 1920 1026"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect opacity="0.1" x="100" width="1" height="1026" fill="white" />
                        <rect opacity="0.1" x="529.75" width="1" height="1026" fill="white" />
                        <rect opacity="0.1" x="959.5" width="1" height="1026" fill="white" />
                        <rect opacity="0.1" x="1389.25" width="1" height="1026" fill="white" />
                        <rect opacity="0.1" x="1819" width="1" height="1026" fill="white" />
                    </svg>

                    <div className="container-fluid egypt_banner_logo">
                        <div className="row ">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6"></div>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                <div className="egypt_logo_media">
                                    <img className="d-flex" src="https://remax.ae/assets/img/icons/uae.png" alt="RE/MAX UAE" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Banner era */}
                </section>

                {/* RE/MAX UAE */}
                <section className="egypt_about_remax global_era mb-5" id="global_height_era">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5 egypt_btm">
                                <div className="card egypt_card" style={{background: "#102962"}}>
                                    <div className="egypt_content">
                                        <div className="styleheadingmain">
                                            <h2 className="lighttext" style={{ color: "#fff" }}>
                                                ABOUT
                                            </h2>
                                            <h4 className="font_48_bold">RE/MAX UAE</h4>
                                        </div>

                                        <p>
                                            At RE/MAX UAE, we believe in the power of paying it forward by taking the lead in
                                            guiding our RE/MAX members on their journeys to definite success. At RE/MAX UAE, we
                                            believe in the power of collaboration, combining our efforts as a unified force
                                            while also excelling individually. We share a collective purpose for providing real
                                            estate professionals and clients with exactly what they need, ensuring their utmost
                                            satisfaction to thrive in their careers building a brighter future for all.
                                            <br />
                                            <br />
                                            In 2019, RE/MAX UAE was launched and has since been effectively building and growing
                                            the brand’s psence and strength. RE/MAX UAE is currently psent in Dubai, Abu
                                            Dhabi, and Ras El Khaimah with 10+ offices and 150+ agents.
                                        </p>
                                        <h3 className="text-white">Winning Together</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-7 align_center d-xl-block d-none" id="additional_col_changes">
                                <div className="media_content">
                                    <div className="remax_btm_media">
                                        <img
                                            src="http://remax.ae/staging/public/uploads/pages/page_top_container_image_2.webp"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = "https://remax.ae/assets/img/remax/agent-image-error-logo.svg";
                                            }}
                                            alt="RE/MAX UAE"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Locations */}
                <section className="locations_era position-relative">
                    <svg className="outlined_borders" width="1920" height="900" viewBox="0 0 1920 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.1" x="100" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="529.75" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="959.5" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="1389.25" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="1819" width="1" height="900" fill="white" />
                    </svg>

                    <div className="container-fluid position-relative">
                        <div className="row justify-content-between">
                            <div className="col-sm-12 col-md-12 col-lg-5 col-xl-4 align_center d-flex">
                                <div className="location_content">
                                    <div>
                                        <img src={logoNew.src} alt="RE/MAX UAE" />
                                    </div>
                                    <h1 className="mb_41 text-white">Happily Serving Our Clients Across UAE</h1>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-7 col-xl-6">
                                <div className="location_media mt-5 mt-lg-0">
                                    <img src="https://remax.ae/staging/public/uploads/pages/page_section_2_right_image.webp" alt="UAE Locations" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mb_150 boxesmain">
                    <div className="boxes">
                        <div className="box box1 border_top">
                            <div className="font_48_bold counter">{emirates.toLocaleString()}</div>
                            <p className="font_30_regular mb-0">EMIRATES</p>
                        </div>
                        <div className="box box2 border_top">
                            <div className="font_48_bold counter">{offices.toLocaleString()}+</div>
                            <p className="font_30_regular mb-0">OFFICES</p>
                        </div>
                        <div className="box box3 border_top">
                            <div className="font_48_bold counter">{agents.toLocaleString()}+</div>
                            <p className="font_30_regular mb-0">AGENTS</p>
                        </div>
                    </div>
                </div>

                {/* Our mission/ our vision and our values */}
                <section id="our_mission_vision_values" className="padding_b_100">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-7">
                                <div className="our_mission mb-4">
                                    <div className="vision_logo">
                                        <img src="https://remax.ae/assets/img/icons/Mission.svg" alt="Mission" />
                                    </div>
                                    <div className="mission_cont">
                                        <h3 className="font_48_bold text-white">Our Mission</h3>
                                        <p className="mb-0 text-white">With full dedication, we invest in the industry’s top knowledge and tools to help our Real Estate Professionals and Clients turn their ambitions into reality. We lead to change their lives.</p>
                                    </div>
                                </div>

                                <div className="our_vision">
                                    <div className="vision_logo">
                                        <img src="https://remax.ae/assets/img/icons/vISION.svg" alt="Vision" />
                                    </div>
                                    <div className="mission_cont">
                                        <h3 className="font_48_bold text-white">Our Vision</h3>
                                        <p className="mb-0 text-white">Our vision is to be the most trusted real estate brand in UAE built on leading a legacy of success. With continuous growth we excel for changing the industry.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5">
                                <div className="our_values pt_186">
                                    <div className="vision_logo">
                                        <img src="https://remax.ae/assets/img/icons/Values.svg" alt="Values" />
                                    </div>
                                    <div className="mission_cont">
                                        <h3 className="font_48_bold text-white">Our Values</h3>
                                        <p className="mb-0 text-white">With <strong>VIRTUE</strong> at our core we hold ourselves <strong>ACCOUNTABLE</strong> to change people’s lives. With our <strong>LEADERSHIP</strong>, success is inevitable. We are <strong>UNITED</strong> in our efforts to deliver an <strong>EXPERIENCE</strong> that lasts a lifetime, constantly <strong>SERVING</strong> our winners to reach beyond their limits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end */}
            </section>
        </>
    );
};

export default RemaxUae;