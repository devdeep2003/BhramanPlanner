import React, { useState, useEffect } from 'react';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';

const CarouselPlace = ({ tripid }) => {
  const [images, setImages] = useState([]);

  // Fetch images from Google Custom Search API
  useEffect(() => {
    const fetchImages = async () => {
      const query = `${tripid}`; // Customize query based on tripid
      const url = `https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&cx=${import.meta.env.VITE_CX_ID}&q=${encodeURIComponent(query)}&searchType=image&num=6`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
          const imageUrls = data.items.map(item => item.link); // Extract image URLs
          setImages(imageUrls);
        } else {
          console.error('No images found');
          setImages([]); // Fallback to empty array if no results
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setImages([]); // Fallback on error
      }
    };

    if (tripid) {
      fetchImages();
    }
  }, [tripid]); // Re-run when tripid changes

  return (
    <div className="w-[60%] max-w-[600px] mx-auto rounded-xl overflow-hidden shadow-md mt-[40px]">
      <CCarousel controls indicators>
        {images.length > 0 ? (
          images.map((img, index) => (
            <CCarouselItem key={index}>
              <CImage
                className="w-full h-[400px] object-cover"
                src={img}
                alt={`Slide ${index + 1}`}
              />
            </CCarouselItem>
          ))
        ) : (
          <CCarouselItem>
            <CImage
              className="w-full h-[400px] object-cover"
              src="/carousel/main-logo.jpeg" // Fallback image
              alt="No images available"
            />
          </CCarouselItem>
        )}
      </CCarousel>
    </div>
  );
};

export default CarouselPlace;