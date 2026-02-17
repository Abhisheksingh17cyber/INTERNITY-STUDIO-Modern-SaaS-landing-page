'use client';

import { create } from 'zustand';

interface UIStore {
  cursorExpanded: boolean;
  cursorHidden: boolean;
  preloaderComplete: boolean;
  mobileMenuOpen: boolean;
  adminSidebarOpen: boolean;
  quickViewProduct: string | null;
  setCursorExpanded: (expanded: boolean) => void;
  setCursorHidden: (hidden: boolean) => void;
  setPreloaderComplete: (complete: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleAdminSidebar: () => void;
  setQuickViewProduct: (productId: string | null) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  cursorExpanded: false,
  cursorHidden: false,
  preloaderComplete: false,
  mobileMenuOpen: false,
  adminSidebarOpen: true,
  quickViewProduct: null,

  setCursorExpanded: (expanded) => set({ cursorExpanded: expanded }),
  setCursorHidden: (hidden) => set({ cursorHidden: hidden }),
  setPreloaderComplete: (complete) => set({ preloaderComplete: complete }),
  toggleMobileMenu: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  toggleAdminSidebar: () => set({ adminSidebarOpen: !get().adminSidebarOpen }),
  setQuickViewProduct: (productId) => set({ quickViewProduct: productId }),
}));
