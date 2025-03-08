import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[600px] bg-gray-900">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">
                Discover Your Perfect Style
              </h1>
              <p className="text-xl mb-8">
                Shop complete outfits curated by expert stylists. Find your perfect look with our trending collections.
              </p>
              <Link
                href="/outfits"
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Shop with Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Curated Collections</h3>
                <p className="text-gray-600">
                  Expert stylists handpick every outfit to ensure perfect coordination and style.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Easy Shopping</h3>
                <p className="text-gray-600">
                  Purchase complete outfits with just a few clicks. No more mixing and matching.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality Guaranteed</h3>
                <p className="text-gray-600">
                  We partner with trusted retailers to ensure you receive high-quality products.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to Transform Your Wardrobe?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered their perfect style with our curated outfits.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/register"
                className="bg-black text-white px-8 py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/trending"
                className="bg-white text-gray-900 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                View Trending
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
