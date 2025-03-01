import { create } from 'zustand';
import { getFavorites, addFavorite, removeFavorite } from './preferencesUtils';

export interface FavoriteItem {
    common_items: any;
    id: string;
    name: string;
    dc?: string;
    section?: string;
    meal?: string;
}

interface FavoritesStore {
    favorites: FavoriteItem[];
    initialized: boolean;
    initializeFavorites: () => Promise<void>;
    toggleFavorite: (item: FavoriteItem) => Promise<void>;
    isFavorite: (itemId: string, itemName: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    favorites: [],
    initialized: false,

    initializeFavorites: async () => {
        if (!get().initialized) {
            const favorites = await getFavorites() as FavoriteItem[];
            set({ favorites, initialized: true });
        }
    },

    toggleFavorite: async (item) => {
        const { favorites } = get();
        const isCurrentlyFavorited = favorites.some(
            fav => fav.id === item.id && fav.name === item.name
        );

        if (isCurrentlyFavorited) {
            await removeFavorite(item);
            set({
                favorites: favorites.filter(
                    fav => !(fav.id === item.id && fav.name === item.name)
                )
            });
        } else {
            await addFavorite(item);
            set({ favorites: [...favorites, item] });
        }
    },

    isFavorite: (itemId, itemName) => {
        const { favorites } = get();
        return favorites.some(
            item => item.id === itemId && item.name === itemName
        );
    }
}));
