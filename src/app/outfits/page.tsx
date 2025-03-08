'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { setOutfits } from '@/store/slices/outfitSlice';
import Layout from '@/components/layout/Layout';
import OutfitCard from '@/components/shop/OutfitCard';
import OutfitFilters from '@/components/shop/OutfitFilters';

// Temporary mock data - replace with API call
const mockOutfits = [
  {
    id: '1',
    name: 'Summer Casual',
    description: 'Perfect for a sunny day out',
    style: 'Casual',
    occasion: 'Everyday',
    season: 'Summer',
    imageUrl: 'https://via.placeholder.com/400x500',
    products: [
      {
        id: '1',
        name: 'White T-Shirt',
        description: 'Classic cotton tee',
        price: 29.99,
        retailerId: '1',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'Tops',
        sizes: ['S', 'M', 'L'],
        colors: ['White'],
        stock: 100,
      },
      {
        id: '2',
        name: 'Blue Jeans',
        description: 'Slim fit denim',
        price: 79.99,
        retailerId: '1',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'Bottoms',
        sizes: ['30', '32', '34'],
        colors: ['Blue'],
        stock: 50,
      },
    ],
  },
  {
    id: '2',
    name: 'Business Professional',
    description: 'Perfect for the office',
    style: 'Business',
    occasion: 'Work',
    season: 'All Season',
    imageUrl: 'https://via.placeholder.com/400x500',
    products: [
      {
        id: '3',
        name: 'Navy Blazer',
        description: 'Classic fit blazer',
        price: 199.99,
        retailerId: '2',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'Outerwear',
        sizes: ['S', 'M', 'L'],
        colors: ['Navy'],
        stock: 30,
      },
      {
        id: '4',
        name: 'Dress Shirt',
        description: 'White cotton dress shirt',
        price: 69.99,
        retailerId: '2',
        imageUrl: 'https://via.placeholder.com/200x200',
        category: 'Tops',
        sizes: ['S', 'M', 'L'],
        colors: ['White'],
        stock: 80,
      },
    ],
  },
];

export default function OutfitsPage() {
  const dispatch = useAppDispatch();
  const filteredOutfits = useAppSelector((state) => state.outfits.filteredOutfits);

  useEffect(() => {
    // Replace with API call in production
    dispatch(setOutfits(mockOutfits));
  }, [dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop Outfits</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <OutfitFilters />
          </div>
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOutfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>
            {filteredOutfits.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No outfits found matching your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 