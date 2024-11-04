export interface Spotify {
  id: string;
  name: string;
  email: string;
  image: Array<{ url: string }>;
  followers: { total: number };
  country: string;
}
