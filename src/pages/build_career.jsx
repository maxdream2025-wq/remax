import MetaData from "@/components/MetaData";
import React, { useState } from "react";
import axios from "axios";

const BuildCareer = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country_code: '+971',
    phone: '',
    description: ''
  });
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', ''

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const data = new FormData();
      data.append('first_name', formData.first_name);
      data.append('last_name', formData.last_name);
      data.append('email', formData.email);
      data.append('country_code', formData.country_code);
      data.append('phone', formData.phone);
      data.append('description', formData.description);
      if (cvFile) {
        data.append('cv_resume', cvFile);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/career/`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSubmitStatus('success');
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        country_code: '+971',
        phone: '',
        description: ''
      });
      setCvFile(null);
      
             // Don't auto-close modal - let user close it themselves

    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
        <>
            <MetaData
                title="RE/MAX UAE | Best Real Estate Agents"
                description="Join the most recognized real estate brand in UAE and become a RE/MAX Agent to take your career to the next level."
                image="https://remax.ae/assets/img/brandlogo/remax_logo.svg"
                url="https://remax.ae/buildcareer"
            />

            <section className="own_remax position-relative" id="our_remax">
                <section
                    className="full-bg-section rm_banner buildcareerbgmainsection"
                    id="our_remax_bg"
                    style={{
                        backgroundImage:
                            "url(https://remax.ae/public/uploads/pages/35a54c51-4a1c-4135-8573-825de3b977a2.webp)",
                    }}
                >
                    <div className="container-fluid new_banner text-left ownremaxbanner" style={{ minHeight: "100vh" }}>
                        <div className="content-container">
                            <div className="row justify-content-center justify-content-xl-start ">
                                <div className="col-md-9 col-xl-6 hero-content">
                                    <h1 className=" text-white text-left"  style={{"textAlign" : "left"}}>Build Your Real Estate Career With RE/MAX</h1>
                                    <h4 className=" text-white" style={{"textAlign" : "left"}}>Your Big Goals Deserve a Big Name</h4>

                                    <ul className="list-unstyled lisiitini " style={{"textAlign" : "left"}}>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            Top-of-mind brand name
                                        </p>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            Powerful global presence & network
                                        </p>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            Ongoing education & development
                                        </p>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            Industry leading tech
                                        </p>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            Entrepreneurial freedom
                                        </p>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            Unlimited growth opportunities
                                        </p>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            Comprehensive support & consultation
                                        </p>
                                        <p className="custom-list text-white font_20_bold">
                                            <span>
                                                <img src="https://remax.ae/assets/img/icons/li.svg" alt="" />
                                            </span>
                                            A culture of like-minded entrepreneurs
                                        </p>
                                    </ul>
                                    <div className="d-flex">
                                        <button style={{"textAlign" : "left"}} className="mt-4 btn btn-light font_18_med text-uppercase" data-bs-toggle="modal" data-bs-target="#joinFormModal">
                                            JOIN NOW
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6"></div>
                        </div>
                    </div>
                </section>

                <div id="exp_speaks" className="specificownremax testimonialsmain bg-white">
                    <div className="container-fluid">
                        <div className="styleheadingmain">
                            <h2 className="lighttext">TESTIMONIALS</h2>
                            <h4 className="font_48_bold">Let Their Experience Speak For Us</h4>
                        </div>
                        <div className="testrow">
                            <div id="testimonialslider" className="testimonialslider sidesbtns owl-carousel owl-theme"></div>
                        </div>
                    </div>
                </div>

                <div id="taking_remax" className="ownstylemain">
                    <div className="container">
                        <div className="row ">
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                                <div className="media_imgs imgspecial">
                                    <img src="/assets/remax.png" alt="" />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center">
                                <div className="content_era_remax">
                                    <h2 className="lighttext">RE/MAX HUSTLE</h2>
                                    <h4 className="font_48_bold">Success Starts Here</h4>
                                    <p className="global_color">As a winner, you already have the skills to excel on any path. However, joining RE/MAX, a leader in the industry, will propel you to even greater heights. RE/MAX is the choice for entrepreneurs seeking both autonomy and ample support to maximize their opportunities and income. Whether you're an experienced real estate agent or just starting your career, RE/MAX is the place for you. Satisfy your hunger for success and unleash your passion and creativity, as each day offers a new opportunity to set higher standards. Simply with RE/MAX be ready to be taken to the MAX!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="owngame buildcareerimg" style={{ backgroundImage: "url(https://remax.ae/public/uploads/pages/a29e7936-c474-4f5c-bf74-a3c15487b024.webp)" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-12 col-xl-6">
                                <div className="content_era_remax">
                                    <h2 className="lighttext">MAXIMUM COMMISSION</h2>
                                    <h4 className="font_48_bold">The Sky’s The Limit</h4>
                                    <p className="global_color mb-0"> Founders of RE/MAX, Dave and Gail Liniger introduced the concept of Real Estate Maximums in 1973, revolutionizing the real estate market by introducing the maximum commission concept that lets agents keep more of what they earn. The idea was simple: attract the best real estate agents by offering various competitive advantages under the RE/MAX brand. With appealing commission plans, unlimited growth opportunities, a unique education system, and the latest technology, RE/MAX was launched focusing on changing people’s lives.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div className="styleheading bg-white">
                    <div className="container-xl">
                        <div className="row">
                            <div className="col-12">
                                <div className="styleheadingmain">
                                    <h2 className="lighttext">BENEFITS</h2>
                                    <h4 className="font_48_bold">Competitive Advantages</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advantages list repeating blocks */}
                <div className="parentlistingviewing">
                    <div id="taking_remax" className="ownstylemain withbg listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <img src="https://remax.ae/public/uploads/pages/f1191485-383d-4e08-b220-e6805ea64c47.webp" alt="" />
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pl-42">
                                    <div className="content_era_remax">
                                        <h4>
                                            <span>1.&nbsp;</span>
                                            The Name: A Leading Brand for Top Agents
                                        </h4>
                                        <p className="global_color">Climbing the ladder of entrepreneurship becomes more manageable with a strong foundation, precisely what RE/MAX provides. With over 50 years of experience and a history of success in constructing a globally recognized brand, you benefit from the trust that customers already place in the RE/MAX balloon—a trust they will extend to you. Remember when people think of real estate, they think of RE/MAX. We are a top-of-mind brand name.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="taking_remax" className="ownstylemain listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <div className="content_era_remax">
                                        <h4 className="font_48_bold">
                                            <span>2.&nbsp;</span>
                                            The Network: Grow Globally
                                        </h4>
                                        <p className="global_color">One for all, all for one. At RE/MAX we see ourselves as one giant team. Our agents are interconnected in more than 110 countries, providing mutual support and creating endless referral opportunities. As part of the RE/MAX family, you will tap into the lucrative international market, providing local expertise to global clients and helping your local clients buy their dream homes abroad. By becoming your clients’ go-to source for global connections, you can create an entirely new income stream for your business.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-42">
                                    <div className="media_imgs">
                                        <img src="https://remax.ae/public/uploads/pages/da748810-556e-461b-be62-310f29f5a9c1.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="taking_remax" className="ownstylemain withbg listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <img src="https://remax.ae/public/uploads/pages/9e9cb93d-5d24-4af1-89e9-08ea08115634.webp" alt="" />
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pl-42">
                                    <div className="content_era_remax">
                                        <h4>
                                            <span>3.&nbsp;</span>
                                            On-demand Education: Learn More.. Earn More
                                        </h4>
                                        <p className="global_color">As a RE/MAX agent, you'll benefit from top-tier training opportunities at every stage of your career. Our diverse range of online and in-class programs at RE/MAX Education Center are designed to maximize potential by providing essential skills and strategies to keep you up-to-date with the market. Covering every aspect of real estate, our training ensures you can offer your clients superior customer service. By joining RE/MAX you will become a certified real estate agent even if you come from a completely different career path.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="taking_remax" className="ownstylemain listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <div className="content_era_remax">
                                        <h4 className="font_48_bold">
                                            <span>4.&nbsp;</span>
                                            Technology Tools: Become Unstoppable
                                        </h4>
                                        <p className="global_color">With RE/MAX, you'll have access to the right tools to stay seamlessly connected anytime, anywhere. As a RE/MAX agent you will always be equipped with advanced, professional technology like PRO/MAX, MAX/CENTER, RE/MAX University, Photofy, RE/MAX Hustle, and more. These platforms and systems help you create marketing materials, promote yourself and your listings, track leads, develop new business, and stay connected after the sale, and so much more.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-42">
                                    <div className="media_imgs">
                                        <img src="https://remax.ae/public/uploads/pages/3651f200-b338-4127-b900-d6a416709e48.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="taking_remax" className="ownstylemain withbg listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <img src="https://remax.ae/public/uploads/pages/87f841a7-c348-48f6-a16b-8cc0acfd284d.webp" alt="" />
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pl-42">
                                    <div className="content_era_remax">
                                        <h4>
                                            <span>5.&nbsp;</span>
                                            The Support: Backed by the Best
                                        </h4>
                                        <p className="global_color">As a RE/MAX agent, you're in control of your own career, yet you're never without assistance. You’ll receive continuous guidance and support from your office as well as the head office. Tap into our decades of experience, innovative tools, and technological resources whenever needed, making it easier to build your business and achieve entrepreneurial success.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="taking_remax" className="ownstylemain listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <div className="content_era_remax">
                                        <h4 className="font_48_bold">
                                            <span>6.&nbsp;</span>
                                            The People: Grow with Winners
                                        </h4>
                                        <p className="global_color">Within RE/MAX, we view ourselves as a cohesive team dedicated and driven towards success and winning together. Our agents connect, support one another, and exchange ideas and experiences. You’ll learn from other agents – and pass your own expertise on to others. When productive individuals, positive mindsets, and remarkable results come together, it becomes contagious creating a powerful synergy. Together we are strong!</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-42">
                                    <div className="media_imgs">
                                        <img src="https://remax.ae/public/uploads/pages/be9a9153-db97-4753-9ea3-65dbb851466c.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="taking_remax" className="ownstylemain withbg listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <img src="https://remax.ae/public/uploads/pages/162dd433-0ffd-49cc-882d-2c35042406f5.webp" alt="" />
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pl-42">
                                    <div className="content_era_remax">
                                        <h4>
                                            <span>7.&nbsp;</span>
                                            Entrepreneurial Freedom: Be Your Own Boss
                                        </h4>
                                        <p className="global_color">As a RE/MAX agent you are in the business for yourself but not by yourself. You operate independently while always having the support of your office, head office and network. We provide the framework for you to enjoy maximum flexibility and build your own successful business. Enjoy the advantages of an established business without any constraints.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="taking_remax" className="ownstylemain listingviewing">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 align-self-center pr-42">
                                    <div className="content_era_remax">
                                        <h4 className="font_48_bold">
                                            <span>8.&nbsp;</span>
                                            Unlimited Growth: Opportunities Unleashed
                                        </h4>
                                        <p className="global_color">At RE/MAX, growth is a continuous journey. Whether you're starting as a new agent or are already established, RE/MAX is the ideal place to thrive. Why? Because the business model, combined with the resources and tools provided, offers countless opportunities for career advancement. You can grow from working individually as an agent to building your own team; allowing you to expand your business base further, becoming unstoppable.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 pl-42">
                                    <div className="media_imgs">
                                        <img src="https://remax.ae/public/uploads/pages/34b7ebfc-a9d6-4f26-a9af-3f720eea1c85.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal (non-functional placeholder) */}
                <div className="modal fade" id="joinFormModal" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header d-block position-relative">
                                <h5 className="modal-title text-secondary" style={{ textAlign: "center" }}>Join Us</h5>
                                <button 
                                    type="button" 
                                    className="btn-close position-absolute" 
                                    style={{ top: "10px", right: "10px" }}
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="modal-body">
                                    <div className="container-fluid">
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">First Name</label>
                                                <input 
                                                    type="text" 
                                                    name="first_name"
                                                    value={formData.first_name}
                                                    onChange={handleInputChange}
                                                    className="form-control w-100" 
                                                    required 
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Last Name</label>
                                                <input 
                                                    type="text" 
                                                    name="last_name"
                                                    value={formData.last_name}
                                                    onChange={handleInputChange}
                                                    className="form-control w-100" 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input 
                                                type="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-control w-100" 
                                                required 
                                            />
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Country Code</label>
                                                <select 
                                                    name="country_code"
                                                    value={formData.country_code}
                                                    onChange={handleInputChange}
                                                    className="form-select w-100" 
                                                    required
                                                >
                                                    <option value="+971">
                                                        United Arab Emirates (+971)
                                                    </option>
                                                    <option value="+1">United States (+1)</option>
                                                    <option value="+44">United Kingdom (+44)</option>
                                                    <option value="+91">India (+91)</option>
                                                    <option value="+86">China (+86)</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Phone Number</label>
                                                <input 
                                                    type="tel" 
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="form-control w-100" 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Upload CV/Resume</label>
                                            <input 
                                                type="file" 
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.txt"
                                                className="form-control w-100 h-100" 
                                                required 
                                            />
                                            <small className="text-muted">Accepted formats: PDF, DOC, DOCX, TXT (Max 5MB)</small>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea 
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="form-control w-100" 
                                                rows={4} 
                                                placeholder="Tell us about your experience, why you want to join RE/MAX, and any additional information..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className="alert alert-success mx-3 mb-0">
                                        <i className="fas fa-check-circle me-2"></i>
                                        Application submitted successfully! We'll contact you soon.
                                        {cvFile && (
                                            <div className="mt-2">
                                                <i className="fas fa-file-upload me-1"></i>
                                                CV/Resume uploaded: {cvFile.name}
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                {submitStatus === 'error' && (
                                    <div className="alert alert-danger mx-3 mb-0">
                                        <i className="fas fa-exclamation-circle me-2"></i>
                                        Error submitting application. Please try again.
                                    </div>
                                )}
                                
                                <div className="modal-footer">
                                    <button 
                                        type="submit" 
                                        className="btn btn-secondary text-white"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary" 
                                        data-bs-dismiss="modal"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BuildCareer;