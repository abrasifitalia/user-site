import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Partner.css";

const Partner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // Slide one item at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const partnerLogos = [
    "/assets/partner/logo-hiper-grinding.png",
    "/assets/partner/mixer-logo.png",
    "/assets/partner/uctem-logo.png",
    "/assets/partner/eurolux-logo.png",
    "/assets/partner/ital-abrasivi-logo.png",
  ];

  return (
    <div className="bg-white py-8 my-4 shadow-lg rounded-lg overflow-hidden mb-12 pt-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-danger text-center m-4">
          Nos Partenaires
        </h3>
      </div>

      {/* Carousel for Partner Logos */}
      <Carousel
        responsive={responsive}
        ssr={true} // Enable server-side rendering
        infinite={true} // Enable looping
        autoPlay={true} // Enable auto-scroll
        autoPlaySpeed={3000} // Set auto-scroll speed
        keyBoardControl={true} // Enable keyboard navigation
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile" , "desktop"]} // Remove arrows for smaller devices
        dotListClass="custom-dot-list-style"
      >
        {partnerLogos.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 flex justify-center items-center transition-transform duration-300 transform hover:scale-110"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
          >
            <img
              src={src}
              alt={`Brand ${index + 1}`}
              className="w-full h-full object-contain"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block", // Ensures the image is treated as a block element
                margin: "0 auto", // Centers the image horizontally
              }}
              loading="lazy"
            />
          </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Partner;
