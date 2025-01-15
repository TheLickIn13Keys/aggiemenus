import { Preferences } from '@capacitor/preferences';

const FAVORITES_KEY = 'favorites';

interface FavoriteItem {
    id: string;
    name: string;
    dc?: string;
    section?: string;
    meal?: string;
}

export async function getFavorites(): Promise<FavoriteItem[]> {
    try {
        const { value } = await Preferences.get({ key: FAVORITES_KEY });
        return value ? JSON.parse(value) : [];
    } catch (error) {
        console.error("Error getting favorites:", error);
        return [];
    }
}

export async function setFavorites(favorites: FavoriteItem[]): Promise<void> {
    try {
        await Preferences.set({
            key: FAVORITES_KEY,
            value: JSON.stringify(favorites)
        });
    } catch (error) {
        console.error("Error setting favorites:", error);
    }
}

export async function addFavorite(item: FavoriteItem): Promise<void> {
    try {
        const currentFavorites = await getFavorites();
        const newFavorites = [...currentFavorites, item];
        await setFavorites(newFavorites);
    } catch (error) {
        console.error("Error adding favorite:", error);
    }
}

export async function removeFavorite(item: FavoriteItem): Promise<void> {
    try {
        const currentFavorites = await getFavorites();
        const newFavorites = currentFavorites.filter(fav =>
            !(fav.id === item.id && fav.name === item.name)
        );
        await setFavorites(newFavorites);
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
}
