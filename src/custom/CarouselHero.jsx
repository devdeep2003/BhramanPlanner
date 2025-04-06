import React from 'react';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';

const CarouselHero = () => {
  // Inline styles
  const carouselStyle = {
    width: "60%",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "400px", // Adjust based on your need
    objectFit: "cover",
  };

  return (
    <div style={carouselStyle}>
      <CCarousel controls indicators>
        <CCarouselItem>
          <CImage style={imageStyle} src="/carousel/main-logo.jpeg" alt="Slide 1" />
        </CCarouselItem>

        <CCarouselItem>
          <CImage style={imageStyle} src="/carousel/land1.png" alt="Slide 2" />
        </CCarouselItem>

        <CCarouselItem>
          <CImage style={imageStyle} src="/carousel/main-logo-white.jpeg" alt="Slide 3" />
        </CCarouselItem>

        <CCarouselItem>
          <CImage style={imageStyle} src="/carousel/land2.png" alt="Slide 4" />
        </CCarouselItem>

        <CCarouselItem>
          <CImage style={imageStyle} src="/carousel/main-logo-black.jpeg" alt="Slide 5" />
        </CCarouselItem>

        
        <CCarouselItem>
          <CImage style={imageStyle} src="/carousel/land3.png" alt="Slide 6" />
        </CCarouselItem>

      </CCarousel>
    </div>
  );
};

export default CarouselHero;
