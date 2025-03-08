'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setFilters, clearFilters } from '@/store/slices/outfitSlice';

const styles = [
  'Casual',
  'Business',
  'Formal',
  'Athletic',
  'Bohemian',
  'Streetwear',
];

const occasions = [
  'Everyday',
  'Work',
  'Party',
  'Wedding',
  'Vacation',
  'Sport',
];

const seasons = [
  'Spring',
  'Summer',
  'Fall',
  'Winter',
  'All Season',
];

const priceRanges = [
  { min: null, max: 100, label: 'Under $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: 500, label: '$200 - $500' },
  { min: 500, max: null, label: '$500+' },
];

export default function OutfitFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.outfits.filters);

  const handleStyleChange = (style: string) => {
    dispatch(setFilters({ style: filters.style === style ? null : style }));
  };

  const handleOccasionChange = (occasion: string) => {
    dispatch(setFilters({ occasion: filters.occasion === occasion ? null : occasion }));
  };

  const handleSeasonChange = (season: string) => {
    dispatch(setFilters({ season: filters.season === season ? null : season }));
  };

  const handlePriceRangeChange = (min: number | null, max: number | null) => {
    dispatch(setFilters({ priceRange: { min, max } }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Style</h3>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`px-4 py-2 rounded-full text-sm ${
                filters.style === style
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Occasion</h3>
        <div className="flex flex-wrap gap-2">
          {occasions.map((occasion) => (
            <button
              key={occasion}
              onClick={() => handleOccasionChange(occasion)}
              className={`px-4 py-2 rounded-full text-sm ${
                filters.occasion === occasion
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Season</h3>
        <div className="flex flex-wrap gap-2">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => handleSeasonChange(season)}
              className={`px-4 py-2 rounded-full text-sm ${
                filters.season === season
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => handlePriceRangeChange(range.min, range.max)}
              className={`px-4 py-2 rounded-full text-sm ${
                filters.priceRange.min === range.min && filters.priceRange.max === range.max
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleClearFilters}
        className="text-sm text-gray-600 hover:text-black"
      >
        Clear all filters
      </button>
    </div>
  );
} 