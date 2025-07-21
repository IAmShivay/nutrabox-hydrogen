import React from 'react';
import { Image } from '@shopify/hydrogen';

export interface ProductHeroSectionProps {
  className?: string;
  desktopImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  mobileImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  altText?: string;
}

const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  className = '',
  desktopImage,
  mobileImage,
  altText = 'Product Image',
}) => {

  return (
    <div className={`product-hero-section ${className}`}>
      {/* Desktop Image */}
      <div className="hidden lg:block">
        {desktopImage && (
          <Image
            data={desktopImage}
            alt={altText}
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      {/* Mobile Image */}
      <div className="block lg:hidden">
        {mobileImage && (
          <Image
            data={mobileImage}
            alt={altText}
            className="w-full h-auto object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default ProductHeroSection;
