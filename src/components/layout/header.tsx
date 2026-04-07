"use client";

import { useRef, useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./logo";
import { useLayout } from "@/components/providers/layout-provider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { searchOpen, openSearch, closeSearch } = useLayout();
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleOpenSearch() {
    openSearch();
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Logo />

            {/* Search — desktop only */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tours, destinations..."
                  className="pl-9 bg-gray-50 border-gray-200 focus:bg-white h-9 text-sm"
                />
              </div>
            </div>

            {/* Nav — desktop only */}
            <nav className="hidden md:flex items-center gap-1">
              {["Destinations", "Activities", "Deals"].map((item) => (
                <span
                  key={item}
                  className="px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed rounded-md"
                  title="Coming soon"
                >
                  {item}
                </span>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex border-violet-500 text-violet-600 hover:bg-violet-50"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="hidden md:flex bg-violet-500 hover:bg-violet-600 text-white"
              >
                Register
              </Button>

              {/* Search icon — mobile only */}
              <button
                className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Open search"
                onClick={handleOpenSearch}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
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
        </div>

      </header>

      {/* Mobile nav backdrop */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[998]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile nav dropdown — absolute, no layout shift */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 z-[999] transition-all duration-200 ease-out origin-top ${
          mobileMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <div className="bg-white border-b border-gray-100 shadow-lg px-4 py-3 space-y-1">
          {["Destinations", "Activities", "Deals"].map((item) => (
            <span
              key={item}
              className="block px-3 py-2 text-sm font-medium text-gray-900 cursor-not-allowed rounded-md"
              title="Coming soon"
            >
              {item}
            </span>
          ))}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-violet-500 text-violet-600"
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-violet-500 hover:bg-violet-600 text-white"
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      {/* Search backdrop */}
      {searchOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeSearch}
        />
      )}

      {/* Search drawer */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out h-[80vh] ${
          searchOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Close button */}
        <button
          onClick={closeSearch}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close search"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {searchOpen && (
          <div className="px-5 pt-3 pb-10 space-y-4">
            <p className="text-sm font-semibold text-gray-900">Search tours & destinations</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                ref={searchInputRef}
                placeholder="Where do you want to go?"
                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white h-11 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Istanbul", "Cappadocia", "Antalya", "Pamukkale", "Ephesus"].map((place) => (
                <button
                  key={place}
                  className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-violet-50 hover:text-violet-700 text-gray-600 rounded-full transition-colors"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
