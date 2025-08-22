"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TimelineSlider() {
    const slides = [
        {
            year: '1973',
            title: 'The Inception of the RE/MAX Journey',
            desc: `For more than 50 years, RE/MAX has undergone a transformative journey since it started in 1973 as a solitary real estate office in Denver, Colorado. RE/MAX's journey began with a groundbreaking concept: "real estate maximums," later known as RE/MAX.`,
            images: {
                xl: 'https://remax.ae/public/uploads/pages/c060daf0-2efd-4b47-a619-95e6c12a88c1.webp',
                lg: 'https://remax.ae/public/uploads/pages/70ce76bc-1335-4476-8209-27d0dcfed213.webp',
                sm: 'https://remax.ae/public/uploads/pages/d57ec94c-34ae-4e99-b382-0d7f91c2b9f2.webp',
            },
        },
        {
            year: '1980s',
            title: 'Expanding to Canada',
            desc: `Frank Polzler and Walter Schneider opened the first Canadian region, RE/MAX Ontario-Atlantic Canada. RE/MAX flourished and rapidly spread across the country, with thirty Canadian franchises sold in just six months. In 1984, RE/MAX Ontario-Atlantic Canada became the first independently owned region to reach 1,000 Real Estate Agents.`,
            images: {
                xl: 'https://remax.ae/public/uploads/pages/0be1f02a-9c5f-4289-99ce-691046f50e80.webp',
                lg: 'https://remax.ae/public/uploads/pages/006fe841-6bd8-4430-b471-c5a75c367c40.webp',
                sm: 'https://remax.ae/public/uploads/pages/b48f1a2b-9323-40e1-a017-ad23276b9882.webp',
            },
        },
        {
            year: '1994-1999',
            title: 'Continent by Continent',
            desc: `RE/MAX Europe opens its first region in Spain and RE/MAX of Southern Africa launches. In 1996 RE/MAX Australia became country No. 16, as RE/MAX expanded to its fourth continent. In early 1999 a fifth continent, South America, was added when RE/MAX entered Venezuela.`,
            images: {
                xl: 'https://remax.ae/public/uploads/pages/94f58d7a-9154-4253-b7e6-9526feee57fd.webp',
                lg: 'https://remax.ae/public/uploads/pages/0766cd0b-4d3f-4311-98b3-3515ceb4b351.webp',
                sm: 'https://remax.ae/public/uploads/pages/09147c3a-c796-4d41-a0cc-0066997ad855.webp',
            },
        },
        {
            year: '2000',
            title: 'Agents Global Force',
            desc: `By the end of the year, RE/MAX boasts nearly 65,000 Associates working out of almost 4,000 offices across 35 countries and eight territories.`,
            images: {
                xl: 'https://remax.ae/public/uploads/pages/8b1790e5-8115-43aa-b0df-e4151f302348.webp',
                lg: 'https://remax.ae/public/uploads/pages/af27765a-d265-4590-89f6-02e1ccfa0f67.webp',
                sm: 'https://remax.ae/public/uploads/pages/d136eb62-848c-4642-811b-6763a14d0669.webp',
            },
        },
        {
            year: '2019',
            title: 'Rising with RE/MAX UAE',
            desc: `RE/MAX is in more than 85 countries. The RE/MAX network expands again, this time into the UAE. In 2019, RE/MAX UAE was launched with unquestionable confidence in the booming real estate market of the United Arab Emirates and has since been effectively building and growing the brand’s presence and strength. We are currently expanding our presence in Dubai, Abu Dhabi, and Ras El Khaimah, with 10+ offices and 150+ agents.`,
            images: {
                xl: 'https://remax.ae/public/uploads/pages/540dcf92-83ce-4f6d-a18c-5082ba2e9b34.webp',
                lg: 'https://remax.ae/public/uploads/pages/d41eff56-ad80-4914-8718-fcfb4bd809b0.webp',
                sm: 'https://remax.ae/public/uploads/pages/39ef5e7f-8f4e-41f0-afd2-e9c9e689ea8f.webp',
            },
        },
        {
            year: '2023',
            title: 'RE/MAX Celebrating 50 Years of Leadership',
            desc: `For 50 years, RE/MAX has been empowering individuals and transforming lives through real estate, continuing to inspire and motivate generations of real estate professionals. This half-century mark commemorates a legacy of innovation, growth, and success in the real estate industry.`,
            images: {
                xl: 'https://remax.ae/public/uploads/pages/eee6a2e2-cc91-4c77-9e64-ecb6a6772b04.webp',
                lg: 'https://remax.ae/public/uploads/pages/bc238fc2-480b-47c3-98ff-1137fdf67b56.webp',
                sm: 'https://remax.ae/public/uploads/pages/54bffbbf-067b-4f6b-b5c3-3b6690179c22.webp',
            },
        },
        {
            year: '2024',
            title: 'RE/MAX’s Global Presence Today',
            desc: `Today, RE/MAX stands as a comprehensive global real estate network, boasting over 9,000 franchisee-owned and operated offices and a vast network of more than 144,000 sales associates across 110+ countries.`,
            images: {
                xl: 'https://remax.ae/public/uploads/pages/5dc8952d-d727-4279-a4f3-2705255a5b15.webp',
                lg: 'https://remax.ae/public/uploads/pages/78017bf7-8ef6-4c93-9e56-ebab8ac941e8.webp',
                sm: 'https://remax.ae/public/uploads/pages/e4b5052d-8d1e-4189-a439-81a148277248.webp',
            },
        },
        {
            year: '2024',
            title: '',
            desc: '',
            images: {
                xl: 'https://remax.ae/assets/img/remax/eight_slide.png',
                lg: 'https://remax.ae/assets/img/remax/eight_slide.png',
                sm: 'https://remax.ae/assets/img/remax/eight_slide.png',
            },
        },
    ];

    return (
        <div className="carousel uaeslidertimeline" id="progress_slider">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: false }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="slides timeline-swiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="slide">
                        <div className="overly_bg"></div>

                        <img
                            className="hero_images d-none d-xl-block"
                            src={slide.images.xl}
                            alt={slide.title || `Slide ${index + 1}`}
                        />
                        <img
                            className="hero_images d-none d-sm-block d-xl-none"
                            src={slide.images.lg}
                            alt={slide.title || `Slide ${index + 1}`}
                        />
                        <img
                            className="hero_images d-block d-sm-none"
                            src={slide.images.sm}
                            alt={slide.title || `Slide ${index + 1}`}
                        />

                        <div className="custom_marg">
                            <div className="content pt_60_px_48" id={`dynamicContent${index + 1}`}>
                                <div className="yearly outline-text">{slide.year}</div>
                                <h3 className=" ">{slide.title}</h3>
                                <p className=" text-white">{slide.desc}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="progress-bar-container">
                <div className="progress-bar"></div>
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`progress-number${idx === 6 ? ' foruaenobefore' : ''}${idx === 7 ? '  foruaeno' : ''}`}
                    >
                        {idx + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}


