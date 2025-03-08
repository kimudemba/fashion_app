'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from '@/types';
import { formatPrice } from '@/lib/utils';

interface OutfitCardProps {
  outfit: Outfit;
}

export default function OutfitCard({ outfit }: OutfitCardProps) {
  const totalPrice = outfit.products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/outfits/${outfit.id}`}>
        <div className="relative h-80">
          <Image
            src={outfit.imageUrl}
            alt={outfit.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate">{outfit.name}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">{outfit.style}</span>
            <span className="text-sm text-gray-600">{outfit.occasion}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{formatPrice(totalPrice)}</span>
            <span className="text-sm text-gray-600">
              {outfit.products.length} items
            </span>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
              {outfit.season}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
} 