'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { addItem } from '@/store/slices/cartSlice';
import Layout from '@/components/layout/Layout';
import { Outfit, Product } from '@/types';
import { formatPrice } from '@/lib/utils';

// Temporary mock data - replace with API call
const mockOutfit: Outfit = {
  id: '1',
  name: 'Summer Casual',
  description: 'Perfect for a sunny day out. This outfit combines comfort with style, featuring breathable fabrics and a relaxed fit that\'s ideal for warm weather activities.',
  style: 'Casual',
  occasion: 'Everyday',
  season: 'Summer',
  imageUrl: 'https://via.placeholder.com/800x1000',
  products: [
    {
      id: '1',
      name: 'White T-Shirt',
      description: 'Classic cotton tee with a comfortable fit',
      price: 29.99,
      retailerId: '1',
      imageUrl: 'https://via.placeholder.com/400x400',
      category: 'Tops',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Gray'],
      stock: 100,
    },
    {
      id: '2',
      name: 'Blue Jeans',
      description: 'Slim fit denim with stretch comfort',
      price: 79.99,
      retailerId: '1',
      imageUrl: 'https://via.placeholder.com/400x400',
      category: 'Bottoms',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Blue', 'Dark Blue'],
      stock: 50,
    },
  ],
};

interface ProductSelectionState {
  [key: string]: {
    size: string;
    color: string;
    quantity: number;
  };
}

export default function OutfitDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<ProductSelectionState>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace with API call in production
    setOutfit(mockOutfit);
    setLoading(false);

    // Initialize selected products
    const initialSelection: ProductSelectionState = {};
    mockOutfit.products.forEach((product) => {
      initialSelection[product.id] = {
        size: product.sizes[0],
        color: product.colors[0],
        quantity: 1,
      };
    });
    setSelectedProducts(initialSelection);
  }, []);

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], size },
    }));
  };

  const handleColorChange = (productId: string, color: string) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], color },
    }));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], quantity },
    }));
  };

  const addToCart = (product: Product) => {
    const selection = selectedProducts[product.id];
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: selection.quantity,
        size: selection.size,
        color: selection.color,
        imageUrl: product.imageUrl,
      })
    );
  };

  const addAllToCart = () => {
    outfit?.products.forEach((product) => {
      addToCart(product);
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !outfit) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error || 'Outfit not found'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  const totalPrice = outfit.products.reduce((sum, product) => {
    const quantity = selectedProducts[product.id]?.quantity || 1;
    return sum + product.price * quantity;
  }, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[600px]">
            <Image
              src={outfit.imageUrl}
              alt={outfit.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{outfit.name}</h1>
            <p className="text-gray-600 mb-6">{outfit.description}</p>

            <div className="flex gap-4 mb-6">
              <span className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600">
                {outfit.style}
              </span>
              <span className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600">
                {outfit.occasion}
              </span>
              <span className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600">
                {outfit.season}
              </span>
            </div>

            <div className="space-y-8 mb-8">
              {outfit.products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                      <p className="font-semibold mt-2">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Size
                      </label>
                      <select
                        value={selectedProducts[product.id]?.size}
                        onChange={(e) =>
                          handleSizeChange(product.id, e.target.value)
                        }
                        className="w-full border rounded-md py-2 px-3"
                      >
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <select
                        value={selectedProducts[product.id]?.color}
                        onChange={(e) =>
                          handleColorChange(product.id, e.target.value)
                        }
                        className="w-full border rounded-md py-2 px-3"
                      >
                        {product.colors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <select
                        value={selectedProducts[product.id]?.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full border rounded-md py-2 px-3"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-100 text-gray-900 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={addAllToCart}
                className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Add Entire Outfit to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 