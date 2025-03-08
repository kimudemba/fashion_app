'use client';

import React from 'react';
import Link from 'next/link';
import { useAppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';

interface NavbarProps {
  isAuthenticated: boolean;
  cartItemsCount: number;
}

export default function Navbar({ isAuthenticated, cartItemsCount }: NavbarProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Trending Outfits
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/outfits" className="text-gray-600 hover:text-gray-900">
              Shop Outfits
            </Link>
            <Link href="/trending" className="text-gray-600 hover:text-gray-900">
              Trending
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 