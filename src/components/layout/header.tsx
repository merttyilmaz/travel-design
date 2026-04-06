"use client";

import { useState } from "react";
import { Search, Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">
              Harmoni<span className="text-sky-500">Travel</span>
            </span>
          </a>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tours, destinations..."
                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white h-9 text-sm"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["Destinations", "Activities", "Deals"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-sky-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-sky-500 text-sky-600 hover:bg-sky-50"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="hidden md:flex bg-sky-500 hover:bg-sky-600 text-white"
            >
              Register
            </Button>
            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search tours..."
              className="pl-9 bg-gray-50 border-gray-200 h-9 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {["Destinations", "Activities", "Deals"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-50 rounded-md"
            >
              {item}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-sky-500 text-sky-600"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
            >
              Register
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
