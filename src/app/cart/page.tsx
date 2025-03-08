'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { removeItem, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import Layout from '@/components/layout/Layout';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);

  const handleQuantityChange = (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    dispatch(updateQuantity({ productId, size, color, quantity }));
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    dispatch(removeItem({ productId, size, color }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/outfits"
              className="inline-block bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 p-4 border rounded-lg"
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1 mt-1">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p>Price: {formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productId,
                            item.size,
                            item.color,
                            parseInt(e.target.value)
                          )
                        }
                        className="border rounded-md py-1 px-2"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() =>
                          handleRemoveItem(item.productId, item.size, item.color)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 mt-4"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(total * 0.1)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatPrice(total * 1.1)}</span>
                </div>

                <button className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 