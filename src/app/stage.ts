export interface Stage {
  id: number;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  size: number;
  imageUrl: string;
  imageCaption: string;
  description: string;
}
