import React, {useEffect, useState} from 'react';

export interface FeatureItem {
  id: string;
  text: string;
  icon?: string;
}

export interface ProductFeatureSliderProps {
  className?: string;
  features?: FeatureItem[];
  speed?: number; // Animation speed in seconds
  pauseOnHover?: boolean;
}

const ProductFeatureSlider: React.FC<ProductFeatureSliderProps> = ({
  className = '',
  features = [
    {id: '1', text: '24G PROTEIN', icon: '💪'},
    {id: '2', text: 'MUSCLE BUILDING', icon: '🏋️'},
    {id: '3', text: 'FAT LOSS', icon: '🔥'},
    {id: '4', text: 'NO ADDED SUGAR', icon: '🚫'},
    {id: '5', text: "WORLD'S HIGHEST CERTIFIED PROTEIN", icon: '🏆'},
    {id: '6', text: '18 FLAVORS', icon: '🍓'},
  ],
  speed = 30,
  pauseOnHover = false,
}) => {
  console.log('ProductFeatureSlider rendering with features:', features);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate features for seamless loop
  const duplicatedFeatures = [...features, ...features];

  return (
    <div className={`product-feature-slider ${className}`}>
      <div
        className={`flex items-center whitespace-nowrap ${
          isPaused ? '' : 'animate-marquee'
        }`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        {duplicatedFeatures.map((feature, index) => (
          <div
            key={`${feature.id}-${index}`}
            className="flex items-center px-6 py-4 text-sm font-medium text-gray-700 flex-shrink-0"
          >
            {feature.icon && (
              <span className="mr-2 text-lg">{feature.icon}</span>
            )}
            <span>{feature.text}</span>
            {index < duplicatedFeatures.length - 1 && (
              <span className="mx-4 text-gray-400">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatureSlider;
