// shared interface for artist objects
interface Artist {
    id?: number;
    name: string;
    birthday: Date;
    activeSince: number;
    genres: string[];
    labels: string[];
    website: string;
    image: string;
    shortDescription: string;
}

interface Favorite {
    id: number;
    readonly artistId: number;
}