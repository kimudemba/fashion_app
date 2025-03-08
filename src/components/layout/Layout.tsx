'use client';

import React from 'react';
import { useAppSelector } from '@/store';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const cartItemsCount = useAppSelector((state) => state.cart.items.length);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} cartItemsCount={cartItemsCount} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
} 