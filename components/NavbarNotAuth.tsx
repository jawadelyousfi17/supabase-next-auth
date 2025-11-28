'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function NavbarNotAuth() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-semibold text-foreground">
              MyBrand
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Login
            </Link>
            <a
              href="/signup"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Sign up
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-accent text-foreground cursor-pointer"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden mt-2 pb-4">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="px-2 py-2 rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-2 py-2 rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="px-2 py-2 rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Pricing
              </Link>
              <div className="px-2 py-2">
                <Button size="sm" className="w-full">
                  Get started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
