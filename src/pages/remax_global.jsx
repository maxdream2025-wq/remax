import MetaData from "@/components/MetaData";
import TimelineSlider from "@/components/TimelineSlider";
import React, { useEffect, useState } from "react";

const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const endValue = parseInt(end.replace(/\D/g, "")); // remove + , etc.
        const step = (endValue - start) / (duration / 16); // ~60fps

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

const RemaxGlobal = () => {
    const countries = useCounter("110+");
    const offices = useCounter("9000+");
    const agents = useCounter("144000+");
    return (
        <>
            <MetaData
                title="RE/MAX Global | The Leading Real Estate Company Worldwide"
                description="RE/MAX Global provides international real estate services worldwide with over 144000 real estate agents and 9000 offices to help clients achieve their property goals"
                image="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
                url="https://remax.ae"
            />
            <section className="about_global_era">
                <section
                    className="full-bg-section rm_banner"
                    id="about_global_bg"
                    style={{
                        backgroundImage:
                            "url(https://promaxlisting.com/public/uploads/pages/page_banner.webp)",
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
                        <rect
                            opacity="0.1"
                            x="529.75"
                            width="1"
                            height="1026"
                            fill="white"
                        />
                        <rect
                            opacity="0.1"
                            x="959.5"
                            width="1"
                            height="1026"
                            fill="white"
                        />
                        <rect
                            opacity="0.1"
                            x="1389.25"
                            width="1"
                            height="1026"
                            fill="white"
                        />
                        <rect opacity="0.1" x="1819" width="1" height="1026" fill="white" />
                    </svg>

                    <div className="container-fluid egypt_banner_logo" >
                        <div className="row ">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6"></div>
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                <div className="egypt_logo_media">
                                    <img
                                        src="https://remax.ae/assets/img/icons/Global.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Banner era */}
                </section>
                <section
                    className="egypt_about_remax global_era"
                    id="global_height_era"
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5 egypt_btm">
                                <div className="card egypt_card" style={{ background: "#102962" }}>
                                    <div className="egypt_content">
                                        <div className="styleheadingmain">
                                            <h2 className="lighttext" style={{ color: "#fff" }}>
                                                ABOUT
                                            </h2>
                                            <h4 className="font_48_bold">
                                                RE/MAX - The World's Largest Real Estate Network
                                            </h4>
                                        </div>

                                        <p>
                                            It all began as a dream and a plan on paper when founders
                                            Dave and Gail Liniger introduced the concept of Real
                                            Estate Maximums in 1973, revolutionizing the real estate
                                            market by introducing the maximum commission concept that
                                            lets agents keep more of what they earn. The idea was
                                            simple: attract the best real estate agents by offering
                                            various competitive advantages under the RE/MAX brand.
                                            With appealing partner commission plans, an outstanding
                                            business model, a unique education system, and the latest
                                            technology, RE/MAX was launched. Since then, this vision
                                            has proven immensely successful, allowing us to grow into
                                            a vast global network of real estate professionals.
                                            <br />
                                            <br />
                                            In the heart of our vision lies a sole purpose - changing
                                            the lives of agents, office owners and real estate
                                            clients. It starts with investing in our people, RE/MAX’s
                                            true assets, ensuring they are fully equipped and ready to
                                            assist you in discovering the perfect property to fulfill
                                            your life's requirements and dreams. Whether it's the
                                            future dream home where you'll create lasting memories
                                            with loved ones or a strategic investment opportunity, we
                                            are here for every aspect. Just remember, whenever you
                                            require assistance or guidance, never hesitate to lean on
                                            RE/MAX.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-sm-12 col-md-12 col-lg-12 col-xl-7 align_center d-xl-block d-none"
                                id="additional_col_changes"
                            >
                                <div className="media_content">
                                    <div className="remax_btm_media">
                                        <img
                                            src="https://promaxlisting.com/public/uploads/pages/page_about_section_image.webp"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="dave_liniger" className="dave_liniger headingabout ">
                    <div className="container-fluid">
                        <div className="row align_center">
                            <div className="col-sm-12 col-lg-7 col-xl-7 text-left">
                                <div className="content_inner text-left">
                                    <div className="styleheadingmain">
                                        <h2 className="lighttext" style={{ color: "#fff" }}>
                                            A Visionary
                                        </h2>
                                        <h4 className="font_48_bold">DAVE LINIGER</h4>
                                    </div>
                                    <p className="text-white subtitlehead_">
                                        Chairman of the Board & Co-Founder
                                    </p>

                                    <p className="text-white">Dave Liniger co-founded the global real estate franchise RE/MAX with his wife, Gail, in 1973.
                                        He is highly respected for his extensive real estate knowledge and influence on housing policy.
                                        During the recession, he advocated for housing reforms that were largely adopted and helped speed the recovery.
                                        Dave's innovative business model for real estate agents, which combines maximum commission with robust support services,
                                        has made RE/MAX agents the most productive in the industry. He currently serves as Chairman of the RE/MAX Board.

                                        "Always dream big dreams. Big dreams attract big people." - Dave Liniger.</p>

                                </div>
                            </div>

                            <div className="col-sm-5 col-lg-5 col-xl-5 position_right_ mx-auto">
                                <div className="media_liniger">
                                    <img
                                        src="https://promaxlisting.com/public/uploads/pages/page_visionary_image.webp"
                                        alt="Dave Liniger"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="legacy_of_innovation"
                    className="legacy_of_innovation headingabout bg-white"
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                <div className="content_inno">
                                    <div className="styleheadingmain">
                                        <h2 className="lighttext" style={{ maxWidth: "100%" }}>
                                            1973 - Today
                                        </h2>
                                        <h4 className="font_48_bold">RE/MAX Through The Years</h4>
                                    </div>

                                    <p className="subcontent_">
                                        Building a legacy of success and growth to empower
                                        generations to come.
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4"></div>
                        </div>
                    </div>
                </section>
                <div className="row mt-4">
                    <div className="col-12">
                        <TimelineSlider />
                    </div>
                </div>
                <section className="locations_era headingabout gloabllocationpage overflow-hidden position-relative">
                    <svg
                        className="outlined_borders"
                        width="1920"
                        height="900"
                        viewBox="0 0 1920 900"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect opacity="0.1" x="100" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="529.75" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="959.5" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="1389.25" width="1" height="900" fill="white" />
                        <rect opacity="0.1" x="1819" width="1" height="900" fill="white" />
                    </svg>

                    <div className="container-fluid position-relative">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align_center d-flex">
                                <div className="styleheadingmain">
                                    <h2 className="lighttext" style={{ color: "#fff" }}>
                                        GLOBAL REACH
                                    </h2>
                                    <h4 className="font_48_bold">
                                        RE/MAX is the only one that can say: Nobody in the World Sells
                                        more Real Estate than RE/MAX.
                                    </h4>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <div className="location_media">
                                    <img
                                        src="https://remax.ae/assets/img/icons/Clippathgroup.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <div className="boxaboutpage boxesmain">
                    <div className="boxes">
                        <div className="box box1 border_top">
                            <div className="font_48_bold counter">
                                {countries.toLocaleString()}+
                            </div>
                            <p className="font_30_regular mb-0">Countries</p>
                        </div>

                        <div className="box box2 border_top">
                            <div className="font_48_bold counter">
                                {offices.toLocaleString()}+
                            </div>
                            <p className="font_30_regular mb-0">Offices</p>
                        </div>

                        <div className="box box3 border_top">
                            <div className="font_48_bold counter">
                                {agents.toLocaleString()}+
                            </div>
                            <p className="font_30_regular mb-0">Agents</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RemaxGlobal;
