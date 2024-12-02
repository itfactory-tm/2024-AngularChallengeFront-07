export interface Artist {
  artistId: string; // UUID (Guid in C#)
  name: string; // Artist name
  mail: string; // Email address
  description?: string; // Description of the artist
  spotifyLink?: string; // Link to Spotify profile
  apiCode?: string; // API code for the artist
  spotifyPhoto?: string; // URL for Spotify photo
  genre?: string; // Optional genre name
}
