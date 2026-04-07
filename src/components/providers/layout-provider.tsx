"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface LayoutContextValue {
  // Search drawer
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Mobile booking sheet
  bookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function useLayout(): LayoutContextValue {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used inside LayoutProvider");
  return ctx;
}

interface LayoutProviderProps {
  children: React.ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openBooking = useCallback(() => setBookingOpen(true), []);
  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <LayoutContext.Provider
      value={{
        searchOpen,
        openSearch,
        closeSearch,
        bookingOpen,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
