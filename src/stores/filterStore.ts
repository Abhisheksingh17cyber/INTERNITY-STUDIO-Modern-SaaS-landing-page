'use client';

import { create } from 'zustand';

interface FilterStore {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  sort: 'price-asc' | 'price-desc' | 'newest' | 'name';
  page: number;
  setCategory: (category: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort: 'price-asc' | 'price-desc' | 'newest' | 'name') => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  category: '',
  minPrice: 0,
  maxPrice: 100000,
  search: '',
  sort: 'newest',
  page: 1,

  setCategory: (category) => set({ category, page: 1 }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max, page: 1 }),
  setSearch: (search) => set({ search, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setPage: (page) => set({ page }),
  resetFilters: () =>
    set({ category: '', minPrice: 0, maxPrice: 100000, search: '', sort: 'newest', page: 1 }),
}));
