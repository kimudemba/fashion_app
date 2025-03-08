import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  retailerId: string;
  imageUrl: string;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
}

interface Outfit {
  id: string;
  name: string;
  description: string;
  style: string;
  occasion: string;
  season: string;
  imageUrl: string;
  products: Product[];
}

interface OutfitState {
  outfits: Outfit[];
  selectedOutfit: Outfit | null;
  filteredOutfits: Outfit[];
  filters: {
    style: string | null;
    occasion: string | null;
    season: string | null;
    priceRange: {
      min: number | null;
      max: number | null;
    };
  };
  loading: boolean;
  error: string | null;
}

const initialState: OutfitState = {
  outfits: [],
  selectedOutfit: null,
  filteredOutfits: [],
  filters: {
    style: null,
    occasion: null,
    season: null,
    priceRange: {
      min: null,
      max: null,
    },
  },
  loading: false,
  error: null,
};

const outfitSlice = createSlice({
  name: 'outfits',
  initialState,
  reducers: {
    setOutfits: (state, action: PayloadAction<Outfit[]>) => {
      state.outfits = action.payload;
      state.filteredOutfits = action.payload;
    },
    setSelectedOutfit: (state, action: PayloadAction<Outfit>) => {
      state.selectedOutfit = action.payload;
    },
    clearSelectedOutfit: (state) => {
      state.selectedOutfit = null;
    },
    setFilters: (state, action: PayloadAction<{
      style?: string | null;
      occasion?: string | null;
      season?: string | null;
      priceRange?: {
        min: number | null;
        max: number | null;
      };
    }>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };

      // Apply filters
      state.filteredOutfits = state.outfits.filter((outfit) => {
        const styleMatch = !state.filters.style || outfit.style === state.filters.style;
        const occasionMatch = !state.filters.occasion || outfit.occasion === state.filters.occasion;
        const seasonMatch = !state.filters.season || outfit.season === state.filters.season;
        
        let priceMatch = true;
        if (state.filters.priceRange.min !== null || state.filters.priceRange.max !== null) {
          const outfitPrice = outfit.products.reduce((sum, product) => sum + product.price, 0);
          priceMatch = (
            (state.filters.priceRange.min === null || outfitPrice >= state.filters.priceRange.min) &&
            (state.filters.priceRange.max === null || outfitPrice <= state.filters.priceRange.max)
          );
        }

        return styleMatch && occasionMatch && seasonMatch && priceMatch;
      });
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredOutfits = state.outfits;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setOutfits,
  setSelectedOutfit,
  clearSelectedOutfit,
  setFilters,
  clearFilters,
  setLoading,
  setError,
} = outfitSlice.actions;

export default outfitSlice.reducer; 