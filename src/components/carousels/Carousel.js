import React from 'react';
import { Carousel } from 'react-bootstrap';

const CustomCarousel = () => {
  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/6.jpg"
          alt="Image 1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/chim5.png"
          alt="Image 2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/h2.jpg"
          alt="Image 3"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
