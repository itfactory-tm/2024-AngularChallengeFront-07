export interface Artist {
    artiestId: string;
    naam: string;
    email: string;
    beschrijving: string;
    spotifyLink: string;
    apiCode: string;
    spotifyPopularity: number | null;
    spotifyFollowers: number | null;
    spotifyPhoto: string;
    genre: string;
    edities: string[];
}